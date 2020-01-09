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
    // alignSelf: 'center',
  },
  scrollViewContainer: {
    // borderWidth: 1,
    // height: '50%',
    flex: 1,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: '100%',
  },

  //Camera styles
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  cameraIcon: {
    margin: 5,
    height: 40,
    width: 40,
  },
  bottomOverlay: {
    position: 'absolute',
    width: '100%',
    flex: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  captureContainer: {},
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  iconCamera: {},
});
