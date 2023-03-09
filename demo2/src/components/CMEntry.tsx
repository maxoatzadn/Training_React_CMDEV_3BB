/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

type CMEntryProps = {
  icon?: string;
  color: string;
  hint: string;
  isPassword?: boolean;
  onChanged: (text: string) => void;
};

const CMEntry = ({icon, color, hint, onChanged, isPassword}: CMEntryProps) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: 16,
        alignItems: 'center',
      }}>
      {/* Icon */}
      {icon && <Icon name={icon} size={35} />}
      {!icon && (
        <View
          style={{
            backgroundColor: color,
            height: 40,
            width: 40,
            borderRadius: 20,
          }}
        />
      )}

      {/* Text input */}
      <TextInput
        onChangeText={onChanged}
        placeholder={hint}
        autoCapitalize="none"
        secureTextEntry={isPassword}
        style={{
          flex: 1,
          marginHorizontal: 8,
          borderColor: '#0003',
          borderWidth: 1,
          borderRadius: 20,
          paddingHorizontal: 16,
        }}
      />
    </View>
  );
};

export default CMEntry;
