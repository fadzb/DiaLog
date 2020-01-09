import colors from '../colors';
import { StyleSheet } from 'react-native';

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
    width: '90%',
    padding: 10,
    marginVertical: 1,
    marginHorizontal: 1,
    borderColor: colors.GRAY_LIGHT,
    borderWidth: 3,
  },
  foodListContainer: {
    flex: 0,
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

  //Camera styles
  scannerContainer: {
    flex: 1,
    backgroundColor: 'black',
    marginBottom: 40,
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
    margin: 20,
  },
});
