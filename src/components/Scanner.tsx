import * as React from 'react';
import { View, Text, Button } from 'native-base';
import { RNCamera } from 'react-native-camera';
import { styles } from '../styles/CarbScreen';
import {
  ANDROID_CAMERA_PERMISSION_OPTIONS,
  ANDROID_RECORD_AUDIO_PERMISSION_OPTIONS,
} from '../utils/CameraUtils';
import { getIcon } from '../utils/IconUtils';
import { requestFoodDetailsFromBarcode, parseFoodItemFromBarcode } from '../api/FoodAPI';
import { FoodItemModal } from './FoodItemModal';
import { FoodItemInstance } from '../typings/FoodItem';
const zebra = require('../utils/zebra.js');

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

  // TODO: Handle EAN-13 Barcodes (need to use different API)
  // Currently only works for UPC-A barcodes (USA & Canada) UK Barcodes are EAN-13 starting with country code 50 instead of 0
  onBarCodeRead = () => {
    this.closeCamera();

    // Hard-coding a UPC-A
    let upc = zebra('038000000102');

    try {
      if (upc.type !== 'UPC-A') {
        upc = upc.toUPCA();
      }
    } catch (e) {
      console.error('[zebra] error:', e);
    }

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
  // TODO: Test on Android
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
              {({ status }) => {
                if (status !== 'READY') {
                  return <PendingView />;
                }
                return (
                  <View>
                    <View style={styles.torch}>
                      <Button light onPress={() => this.handleTorch(this.state.torchOn)}>
                        {getIcon('flashlight')}
                      </Button>
                    </View>
                    <View style={styles.ncapture}>
                      <Button light onPress={this.takePicture.bind(this)}>
                        {getIcon('camera')}
                      </Button>
                    </View>
                  </View>
                );
              }}
            </RNCamera>
          </View>
          <Button style={styles.bottom} vertical onPress={this.closeCamera}>
            {getIcon('camera')}
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
            {getIcon('camera')}
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
