import { View } from 'react-native';
import React from 'react';
import QRCode, { QRCodeProps } from 'react-native-qrcode-svg';


type Props = {
    url: string;

};

const MyQRCode = ({ url, ...rest }: Props & QRCodeProps) => {
    return (
        <View style={{ margin: 10 }}>
            <QRCode key={url} value={url} {...rest} />
        </View>
    );
};

export default MyQRCode;