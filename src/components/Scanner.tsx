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

interface ScannerProps {}

export class Scanner extends React.Component<ScannerProps> {
  camera: RNCamera | null;

  constructor(props: any) {
    super(props);
    this.camera = null;
  }

  state = {
    show: false,
    torchOn: false,
  };

  // TODO: Need to move to new screen issuieing nutrional info about item
  onBarCodeRead = (e: any) => {
    console.log('should read barcode');
    Alert.alert('Barcode value is' + e.data, 'Barcode type is' + e.type);
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
  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      try {
        const data = await this.camera.takePictureAsync(options);
        console.log(data.uri);
      } catch (error) {
        console.log(`Error Taking pic: ${error}`);
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
              ref={cam => {
                this.camera = cam;
              }}
              onBarCodeRead={this.onBarCodeRead}
              captureAudio={false}
              type={RNCamera.Constants.Type.back}
              flashMode={RNCamera.Constants.FlashMode.on}
              androidCameraPermissionOptions={ANDROID_CAMERA_PERMISSION_OPTIONS}
              androidRecordAudioPermissionOptions={ANDROID_RECORD_AUDIO_PERMISSION_OPTIONS}
              onGoogleVisionBarcodesDetected={({ barcodes }) => {
                console.log(barcodes);
              }}
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
    } else {
      return (
        <View style={[styles.bottom, { marginBottom: 40 }]}>
          <Button vertical onPress={this.openCamera}>
            <Icon name={IconNames.camera} />
            <Text>Camera</Text>
          </Button>
        </View>
      );
    }
  }
}
