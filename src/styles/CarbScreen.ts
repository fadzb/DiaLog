import { colors } from '../colors';
import { StyleSheet } from 'react-native';
import { TERTIARY } from './global';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.GRAY_ULTRA_LIGHT,
    alignItems: 'flex-start',
  },
  text: {
    borderColor: colors.BLACK,
    borderBottomWidth: StyleSheet.hairlineWidth,
    fontSize: 20,
  },
  item: {
    padding: 10,
    marginVertical: 1,
    marginHorizontal: 1,
    borderColor: colors.GRAY_LIGHT,
    borderWidth: 3,
  },
  listItemContainer: {
    height: 60,
    width: '96%',
    padding: 10,
    marginVertical: 1,
    marginHorizontal: 1,
    borderColor: TERTIARY,
    borderWidth: 5,
    borderRadius: 15,
    backgroundColor: 'white',
  },
  foodListContainer: {
    flex: 1,
  },
  scrollViewContainer: {
    borderWidth: 1,
    height: '50%',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: '100%',
  },
  bottom: {
    flex: 0,
    justifyContent: 'flex-end',
    marginBottom: 0,
  },

  //Modals
  modalContent: {
    flex: 0,
    top: 100,
    backgroundColor: 'white',
    padding: 22,
    // justifyContent: 'center',
    // alignItems: 'center',
    borderRadius: 10,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },

  // Utility
  row: { flex: 0, flexDirection: 'row' },
  rowSpaced: { flex: 0, flexDirection: 'row', justifyContent: 'space-between' },

  //Camera styles
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  scannerContainer: {
    flex: 1,
    backgroundColor: 'black',
    marginBottom: 5,
    width: '95%',
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    bottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  torch: {
    flex: 0,
    alignSelf: 'flex-start',
    marginBottom: 100,
    marginLeft: 10,
  },

  //New FaCC Camera Styles
  ncontainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  npreview: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  ncapture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    alignSelf: 'center',
    margin: 20,
  },
});
