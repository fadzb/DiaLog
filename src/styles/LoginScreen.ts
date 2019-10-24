import { css } from '@emotion/native';
import colors from '../colors';
import { Component } from 'react';

export class Styles {
  static container = css`
    flex: 1;
    background-color: ${colors.GRAY_ULTRA_LIGHT};
    justify-content: space-between;
    align-items: center;
    paddingtop: 50;
  `;

  static form = css`
    flex: 1;
    justifycontent: center;
    width: 80%;
  `;
}
