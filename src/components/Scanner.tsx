import * as React from 'react';
import { View, Text, Button, Spinner, Icon } from 'native-base';
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
import { getLabels, filterLabels, getFakeLabels } from '../utils/FirebaseML/FirebaseVisionUtils';
import { Alert } from 'react-native';

const zebra = require('../utils/zebra.js');

const ML_ENABLED = true;
const NUM_LABELS = 5;

interface ScannerProps {
  navigation: any;
  updateLabels: (labels: string[]) => void;
  choRatio: number;
  insulinSuggestions: boolean;
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
    showSpinner: false,
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

    try {
      const promise = requestFoodDetailsFromBarcode(upc);

      promise
        .then(responseJson => {
          const foodItem = parseFoodItemFromBarcode(responseJson);
          this.setState({ item: foodItem, modalVisible: true });
        })
        .catch(error => Alert.alert(error));
    } catch (error) {
      Alert.alert(error);
    }
  };

  // TODO: Sets state but doesn't actually change torch
  handleTorch(value: any) {
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
        // Render Spinner
        this.setState({ showSpinner: true });

        const data = await this.camera.takePictureAsync(options);

        // Perfrom Image Recognition
        if (ML_ENABLED) {
          getLabels(data.uri).then(labels => this.setLabels(filterLabels(labels, NUM_LABELS)));
        } else {
          this.setLabels(filterLabels(getFakeLabels(), NUM_LABELS));
        }
      } catch (error) {
        console.log(JSON.stringify(error, null, 2));
      }
    }
  };

  setLabels = (labels: any) => {
    // No labels
    if (!labels || labels.length < 1) {
      Alert.alert('No Food Recognised. Please Try Again');
      this.setState({ showSpinner: false });
      return;
    }

    // ML async process finished: disable spinner and close camera
    this.setState({ show: false, showSpinner: false });

    // Callback fn which updates labels and renders them as options
    this.props.updateLabels(labels);
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
        <View style={{}}>
          <View
            style={{
              backgroundColor: 'black',
              marginBottom: 10,
              width: '95%',
              alignSelf: 'center',
            }}
          >
            <View style={{ flexDirection: 'column' }}>
              <RNCamera
                style={{ justifyContent: 'flex-end', height: 250 }}
                type={RNCamera.Constants.Type.back}
                ref={ref => {
                  this.camera = ref;
                }}
                flashMode={RNCamera.Constants.FlashMode.off}
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
                      {this.state.showSpinner && (
                        <Spinner
                          style={{ alignSelf: 'center', marginBottom: 'auto' }}
                          size={'large'}
                          color="blue"
                        />
                      )}
                      <View
                        style={{
                          alignSelf: 'flex-start',
                          marginBottom: 70,
                          marginLeft: 10,
                        }}
                      >
                        <Button light onPress={() => this.handleTorch(this.state.torchOn)}>
                          {getIcon('flashlight')}
                        </Button>
                      </View>
                      <View
                        style={{
                          alignSelf: 'center',
                          margin: 20,
                        }}
                      >
                        <Button
                          light
                          style={{
                            borderColor: '#fff',
                            borderWidth: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 70,
                            height: 70,
                            backgroundColor: 'rgba(249,173,45,1)',

                            borderRadius: 50,
                          }}
                          onPress={this.takePicture.bind(this)}
                        >
                          <Icon
                            name={'food'}
                            style={{ fontSize: 30 }}
                            type={'MaterialCommunityIcons'}
                          />
                        </Button>
                      </View>
                    </View>
                  );
                }}
              </RNCamera>
            </View>
          </View>
          <Button
            style={[styles.bottom, { marginBottom: 5, width: '95%', alignSelf: 'center' }]}
            vertical
            onPress={this.closeCamera}
          >
            {getIcon('camera')}
            <Text>Close</Text>
          </Button>
        </View>
      );
    }
    return (
      <View style={{ justifyContent: 'flex-end' }}>
        {this.state.modalVisible && (
          <FoodItemModal
            navigation={this.props.navigation}
            item={this.state.item}
            handleModalClose={() => {}}
            ref={ref => (this.modalRef = ref)}
            choRatio={this.props.choRatio}
            insulinSuggestions={this.props.insulinSuggestions}
          />
        )}
        <View style={[styles.bottom, { marginBottom: 5, alignItems: 'center' }]}>
          <Button vertical style={{ width: '95%' }} onPress={this.openCamera}>
            {getIcon('camera')}
            <Text>Food Scanner</Text>
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
