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
import { GLOBAL } from '../styles/global';

const zebra = require('../utils/zebra.js');

const ML_ENABLED = true;
const NUM_LABELS = 5;

interface ScannerProps {
  navigation: any;
  updateLabels: (labels: string[]) => void;
  choRatio: number;
  insulinSuggestions: boolean;
  clearSearch: () => void;
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
    torchOn: RNCamera.Constants.FlashMode.off,
    item: FoodItemInstance,
    modalVisible: false,
    showSpinner: false,
  };

  // TODO: Handle EAN-13 Barcodes (need to use different API)
  // Currently only works for UPC-A barcodes (USA & Canada) UK Barcodes are EAN-13 starting with country code 50 instead of 0
  onBarCodeRead = (barcodeScan: any) => {
    // Render Spinner and Close camera
    this.setState({ showSpinner: true, show: false });

    let upc: any = {};

    // Hard-coding a UPC-A of Coco-Cola
    try {
      upc = zebra('049000006346');
    } catch (error) {
      Alert.alert('Error', error);
      console.log(error);
      this.setState({ showSpinner: false, show: true });
      return;
    }

    try {
      if (upc.type !== 'UPC-A') {
        upc = upc.toUPCA();
      }
    } catch (error) {
      Alert.alert('Error', error);
      console.log(error);
      this.setState({ showSpinner: false, show: true });
      return;
    }

    try {
      const promise = requestFoodDetailsFromBarcode(upc.code);

      promise
        .then(responseJson => {
          const foodItem = parseFoodItemFromBarcode(responseJson);
          console.log(foodItem);
          this.setState({ showSpinner: false, item: foodItem, modalVisible: true });
        })
        .catch(error => Alert.alert('Error', error));
    } catch (error) {
      console.log(error);
      this.setState({ showSpinner: false, show: true });
      Alert.alert('Error', error);
    }
  };

  toggleTorch() {
    if (this.state.torchOn == RNCamera.Constants.FlashMode.off) {
      this.setState({ torchOn: RNCamera.Constants.FlashMode.torch });
    } else {
      this.setState({ torchOn: RNCamera.Constants.FlashMode.off });
    }
  }

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      try {
        // Take pic
        const data = await this.camera.takePictureAsync(options);

        // Perfrom Image Recognition
        if (ML_ENABLED) {
          getLabels(data.uri).then(labels => this.setLabels(filterLabels(labels, NUM_LABELS)));
        } else {
          this.setLabels(filterLabels(getFakeLabels(), NUM_LABELS));
        }

        // Render Spinner and Close camera
        this.setState({ showSpinner: true, show: false });

        // Clear (Text) Search results
        this.props.clearSearch();
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
            style={[
              {
                backgroundColor: 'black',
                marginBottom: 10,
                width: '95%',
                alignSelf: 'center',
              },
              GLOBAL.shadowBox,
            ]}
          >
            <View style={{ flexDirection: 'column' }}>
              <RNCamera
                style={{ justifyContent: 'flex-end', height: 250 }}
                type={RNCamera.Constants.Type.back}
                ref={ref => {
                  this.camera = ref;
                }}
                flashMode={this.state.torchOn || RNCamera.Constants.FlashMode.off}
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
                        <Button light onPress={() => this.toggleTorch()}>
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
                            backgroundColor: 'rgba(0,106,255,1)',

                            borderRadius: 50,
                          }}
                          onPress={this.takePicture.bind(this)}
                        >
                          <Icon
                            name={'food'}
                            style={{ fontSize: 30, color: 'white' }}
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
            style={[
              styles.bottom,
              {
                marginBottom: 10,
                width: '95%',
                alignSelf: 'center',
                justifyContent: 'center',
                borderRadius: 15,
                backgroundColor: 'orange',
              },
              GLOBAL.shadowBox,
            ]}
            onPress={this.closeCamera}
          >
            {getIcon('camera', 'white')}
            <Text style={{ fontWeight: 'bold', fontSize: 23, right: 10 }}>CLOSE</Text>
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
        {this.state.showSpinner && (
          <Spinner
            style={{ alignSelf: 'center', marginBottom: 'auto' }}
            size={'large'}
            color="blue"
          />
        )}
        <View style={[styles.bottom, { marginBottom: 10, alignItems: 'center' }, GLOBAL.shadowBox]}>
          <Button
            style={{ width: '95%', justifyContent: 'center', borderRadius: 15 }}
            onPress={this.openCamera}
          >
            {getIcon('camera', 'white')}
            <Text style={{ fontWeight: 'bold', fontSize: 23, right: 10 }}>FOOD SCANNER</Text>
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
