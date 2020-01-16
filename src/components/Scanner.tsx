import * as React from 'react';
import { View, Text, Icon, Button } from 'native-base';
import { RNCamera } from 'react-native-camera';
import { styles } from '../styles/CarbScreen';
import { Alert } from 'react-native';
import {
  ANDROID_CAMERA_PERMISSION_OPTIONS,
  ANDROID_RECORD_AUDIO_PERMISSION_OPTIONS,
} from '../utils/CameraUtils';
import { IconNames } from '../utils/IconUtils';
import { requestFoodDetailsFromBarcode, parseFoodItemFromBarcode } from '../api/FoodAPI';
import { FoodItemModal } from './FoodItemModal';

interface ScannerProps {
  navigation: any;
}

export class Scanner extends React.Component<ScannerProps> {
  camera: RNCamera | null;

  constructor(props: any) {
    super(props);
    this.camera = null;
  }

  state = {
    show: false,
    torchOn: false,
    item: null,
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
          <View style={styles.torch}>
            <Button light onPress={() => this.handleTorch(this.state.torchOn)}>
              <Icon name={IconNames.flashlight} />
            </Button>
          </View>
          <View style={styles.cameraContainer}>
            <RNCamera
              ref={ref => {
                this.camera = ref;
              }}
              style={styles.preview}
              type={RNCamera.Constants.Type.back}
              flashMode={RNCamera.Constants.FlashMode.on}
              androidCameraPermissionOptions={ANDROID_CAMERA_PERMISSION_OPTIONS}
              androidRecordAudioPermissionOptions={ANDROID_RECORD_AUDIO_PERMISSION_OPTIONS}
              onGoogleVisionBarcodesDetected={({ barcodes }) => {
                console.log(barcodes);
              }}
              captureAudio={false}
              onBarCodeRead={this.onBarCodeRead.bind(this)}
            />
            <View style={styles.capture}>
              <Button light onPress={this.takePicture.bind(this)}>
                <Icon name={IconNames.camera} />
              </Button>
            </View>
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
        <FoodItemModal
          navigation={this.props.navigation}
          item={this.state.item}
          handleModalClose={() => {}}
        />
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
