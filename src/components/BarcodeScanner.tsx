import * as React from 'react';
import { View, Text, Image, Icon } from 'native-base';
import { RNCamera } from 'react-native-camera';
import { styles } from '../styles/CarbScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Alert } from 'react-native';

interface BarcodeScannerProps {
  query: string;
}

export class BarcodeScanner extends React.Component<BarcodeScannerProps> {
  camera: RNCamera | null;

  constructor(props: any) {
    super(props);
    this.camera = null;
  }

  state = {
    torchOn: false,
  };

  onBarCodeRead = (e: any) => {
    console.log('should read barcode');
    Alert.alert('Barcode value is' + e.data, 'Barcode type is' + e.type);
  };

  handleTourch(value: any) {
    if (value === true) {
      this.setState({ torchOn: false });
    } else {
      this.setState({ torchOn: true });
    }
  }

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

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'black' }}>
        <Text> Barcode Scanner </Text>
        <RNCamera
          ref={cam => {
            this.camera = cam;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.log(barcodes);
          }}
        />
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> SNAP </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomOverlay}>
          <TouchableOpacity onPress={() => this.handleTourch(this.state.torchOn)}>
            <Text>Torch</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
