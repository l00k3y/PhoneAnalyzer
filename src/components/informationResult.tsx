import React from 'react';
import {Text} from 'react-native';

const InformationResult = (props: any) => {
  return (
    <Text style={{marginVertical: 2}}>
      {props.fieldName}: {props.result}
    </Text>
  );
};

export default InformationResult;
