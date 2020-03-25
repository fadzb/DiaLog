import { StyleSheet } from 'react-native';

export const GLOBAL = StyleSheet.create({
  container: {},
  contentContainer: {},

  //VERY USEFUL Shadow box : https://stackoverflow.com/a/48602602/10610784
  shadowBox: {
    elevation: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
});
