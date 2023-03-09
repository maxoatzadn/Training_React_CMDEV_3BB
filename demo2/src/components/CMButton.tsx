/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

type CMButtonProps = {
  varaint?: 'contained' | 'outline';
  title: string;
  onPressed: () => void;
};

const CMButton = (props: CMButtonProps) => {
  if (props.varaint === 'outline') {
    return (
      <TouchableOpacity onPress={props.onPressed}>
        <Text
          style={{
            borderWidth: 1,
            borderColor: '#D1D1D1',
            color: 'black',
            borderRadius: 10,
            height: 40,
            textAlign: 'center',
            textAlignVertical: 'center',
            textTransform: 'uppercase',
            fontWeight: 'bold',
          }}>
          {props.title}
        </Text>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity onPress={props.onPressed}>
        <Text
          style={{
            textAlign: 'center',
            textAlignVertical: 'center',
            textTransform: 'uppercase',
            backgroundColor: '#21005d',
            color: 'white',
            borderRadius: 10,
            fontWeight: 'bold',
            height: 40,
          }}>
          {props.title}
        </Text>
      </TouchableOpacity>
    );
  }
};

export default CMButton;
