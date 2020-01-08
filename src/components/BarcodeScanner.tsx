import * as React from 'react';
import { View, Text, Image } from 'native-base';
import { RNCamera } from 'react-native-camera';
import { styles } from '../styles/CarbScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Alert } from 'react-native';

interface BarcodeScannerProps {
  query: string;
}

export class BarcodeScanner extends React.Component<BarcodeScannerProps> {
  constructor(props: any) {
    super(props);
  }

  state = {
    torchOn: false,
  };

  onBarCodeRead = (e: any) => {
    Alert.alert('Barcode value is' + e.data, 'Barcode type is' + e.type);
  };

  handleTourch(value: any) {
    if (value === true) {
      this.setState({ torchOn: false });
    } else {
      this.setState({ torchOn: true });
    }
  }

  render() {
    return (
      <View>
        <Text> Barcode Scanner </Text>
        <Camera
          style={styles.preview}
          torchMode={
            this.state.torchOn ? RNCamera.Constants.FlashMode.on : RNCamera.Constants.FlashMode.off
          }
          onBarCodeRead={this.onBarCodeRead}
          ref={cam => (this.camera = cam)}
          aspect={Camera.constants.Aspect.fill}
        >
          <Text
            style={{
              backgroundColor: 'white',
            }}
          >
            BARCODE SCANNER
          </Text>
        </Camera>
        <View style={styles.bottomOverlay}>
          <TouchableOpacity onPress={() => this.handleTourch(this.state.torchOn)}>
            <Text>Torch</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
