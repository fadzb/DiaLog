import { StyleSheet } from 'react-native';
import { colors } from '../colors';

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
  row: { flex: 0, flexDirection: 'row', justifyContent: 'space-between' },

  //Modals
  modalContent: {
    flex: 0,
    top: 100,
    backgroundColor: 'white',
    padding: 22,
    // justifyContent: 'center',
    // alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
});
