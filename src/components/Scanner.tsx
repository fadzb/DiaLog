import * as React from 'react';
import { View, Text, Icon, Button } from 'native-base';
import { RNCamera } from 'react-native-camera';
import { styles } from '../styles/CarbScreen';
import {
  ANDROID_CAMERA_PERMISSION_OPTIONS,
  ANDROID_RECORD_AUDIO_PERMISSION_OPTIONS,
} from '../utils/CameraUtils';
import { IconNames } from '../utils/IconUtils';
import { requestFoodDetailsFromBarcode, parseFoodItemFromBarcode } from '../api/FoodAPI';
import { FoodItemModal } from './FoodItemModal';
import { FoodItemInstance } from '../typings/FoodItem';
import { TouchableOpacity } from 'react-native';

interface ScannerProps {
  navigation: any;
}

export class Scanner extends React.PureComponent<ScannerProps> {
  camera: RNCamera | null;
  modalRef: FoodItemModal | null | undefined;

  constructor(props: any) {
    super(props);
    this.camera = null;
  }

  state = {
    show: false,
    torchOn: false,
    item: FoodItemInstance,
    modalVisible: false,
  };

  onBarCodeRead = (e: any) => {
    // Alert.alert('Barcode value is' + e.data, 'Barcode type is' + e.type);
    // const upc = '038000000102';
    const upc = e.data;
    console.log(e.data + '    ' + e.type);
    return;
    const promise = requestFoodDetailsFromBarcode(upc);

    promise
      .then(responseJson => {
        const foodItem = parseFoodItemFromBarcode(responseJson);
        this.setState({ item: foodItem, modalVisible: true });
      })
      .catch(error => console.log('error', error));
  };

  // TODO: Sets state but doesn't actually change torch
  handleTorch(value: any) {
    if (value === true) {
      this.setState({ torchOn: false });
    } else {
      this.setState({ torchOn: true });
    }
  }

  // TODO: Need to store the image correctly and procees (Image Recognition Feature)
  // TODO: Currently not working for android
  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      try {
        const data = await this.camera.takePictureAsync(options);
        console.log(data.uri);
      } catch (error) {
        console.log(JSON.stringify(error, null, 2));
      }
    }
  };

  // takePicture = async function(camera: any) {
  //   const options = { quality: 0.5, base64: true };
  //   const data = await camera.takePictureAsync(options);
  //   //  eslint-disable-next-line
  //   console.log(data.uri);
  // };

  openCamera = () => {
    this.setState({
      show: true,
    });
  };

  closeCamera = () => {
    this.setState({
      show: false,
    });
  };

  render() {
    if (this.state.show) {
      return (
        <View style={styles.scannerContainer}>
          <View style={styles.ncontainer}>
            <RNCamera
              style={styles.npreview}
              type={RNCamera.Constants.Type.back}
              ref={ref => {
                this.camera = ref;
              }}
              flashMode={RNCamera.Constants.FlashMode.on}
              androidCameraPermissionOptions={ANDROID_CAMERA_PERMISSION_OPTIONS}
              androidRecordAudioPermissionOptions={ANDROID_RECORD_AUDIO_PERMISSION_OPTIONS}
              captureAudio={false}
              onBarCodeRead={this.onBarCodeRead.bind(this)}
            >
              {({ camera, status, recordAudioPermissionStatus }) => {
                if (status !== 'READY') return <PendingView />;
                return (
                  <View>
                    <View style={styles.torch}>
                      <Button light onPress={() => this.handleTorch(this.state.torchOn)}>
                        <Icon name={IconNames.flashlight} />
                      </Button>
                    </View>
                    <View style={styles.ncapture}>
                      <Button light onPress={this.takePicture.bind(this)}>
                        <Icon name={IconNames.camera} />
                      </Button>
                    </View>
                  </View>
                );
              }}
            </RNCamera>
          </View>
          <Button style={styles.bottom} vertical onPress={this.closeCamera}>
            <Icon name={IconNames.camera} />
            <Text>Close Camera</Text>
          </Button>
        </View>
      );
    }
    return (
      <View>
        {this.state.modalVisible && (
          <FoodItemModal
            navigation={this.props.navigation}
            item={this.state.item}
            handleModalClose={() => {}}
            ref={ref => (this.modalRef = ref)}
          />
        )}
        <View style={[styles.bottom, { marginBottom: 40 }]}>
          <Button vertical onPress={this.openCamera}>
            <Icon name={IconNames.camera} />
            <Text>Camera</Text>
          </Button>
        </View>
      </View>
    );
  }
}

const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'lightgreen',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Text>Waiting</Text>
  </View>
);
