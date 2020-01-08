import * as React from 'react';
import { View } from 'react-native';

interface BarcodeScannerProps {
  query: string;
}

export class BarcodeScanner extends React.Component<BarcodeScannerProps> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return <View></View>;
  }
}
