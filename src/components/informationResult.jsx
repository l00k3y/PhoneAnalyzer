import React from 'react';
import {Text, View} from 'react-native';
import {GeneralStyles} from '../styles/general';

const InformationResult = props => {
  return (
    <View id={`InformationResult${Math.random()}`}>
      <Text style={GeneralStyles.smallPaddingBlack}>
        {props.fieldName}: {props.result}
      </Text>
    </View>
  );
};

export default InformationResult;
