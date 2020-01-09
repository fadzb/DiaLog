import * as React from 'react';
import { View, Text, Image, Icon, Container, Button } from 'native-base';
import { RNCamera } from 'react-native-camera';
import { styles } from '../styles/CarbScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Alert } from 'react-native';
import { red100 } from 'react-native-paper/lib/typescript/src/styles/colors';

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
        <View style={{ borderColor: 'yellow', borderWidth: 5, height: 400 }}>
          <Container style={{ borderWidth: 5, borderColor: 'red' }}>
            <View style={{ backgroundColor: 'black' }}>
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
                onBarCodeRead={this.onBarCodeRead}
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
          </Container>
          {/* <Button style={{ marginTop: 100 }} vertical onPress={this.closeCamera}>
            <Icon name="camera" />
            <Text>Close Camera</Text>
          </Button> */}
        </View>
      );
    } else {
      return (
        <View>
          <Button vertical onPress={this.openCamera}>
            <Icon name="camera" />
            <Text>Camera</Text>
          </Button>
        </View>
      );
    }
  }
}
