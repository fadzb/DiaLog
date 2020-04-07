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

  // activity types
  types: {
    fontWeight: '600',
  },
});

export const PRIMARY = 'rgba(0,106,255,1)';
export const SECONDARY = 'rgba(255,119,0,1)';
export const TERTIARY = 'rgba(244,244,244,1)';
