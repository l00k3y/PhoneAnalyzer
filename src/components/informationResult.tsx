import React from 'react';
import {Text} from 'react-native';
import {GeneralStyles} from '../styles/general';

const InformationResult = (props: any) => {
  return (
    <Text style={GeneralStyles.smallPaddingBlack}>
      {props.fieldName}: {props.result}
    </Text>
  );
};

export default InformationResult;
