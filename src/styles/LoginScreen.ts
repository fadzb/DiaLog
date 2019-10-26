// import { css } from '@emotion/native';
import colors from '../colors';
import { Component } from 'react';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.GRAY_ULTRA_LIGHT,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
  },
  form: {
    bottom: 300,
    justifyContent: 'center',
    width: '80%',
  },
  text: {
    height: 40,
    borderColor: colors.BLACK,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 20,
  },
});
