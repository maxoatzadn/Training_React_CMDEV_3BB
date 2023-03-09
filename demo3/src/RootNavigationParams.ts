export type ScannerParamProp = {message:string};

export type RootStackParamList = {
  MainTab: undefined;
  Scanner: undefined | {message:string};
};

export type RootTabParamList = {
  QRCodeTab: undefined;
  ScannerTab: undefined;
};
