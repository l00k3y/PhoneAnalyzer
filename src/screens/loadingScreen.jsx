import React from 'react';
import {View, Text} from 'react-native';
import {GeneralStyles} from '../styles/general';
import * as Progress from 'react-native-progress';

const LoadingScreen = props => {
  return (
    <View style={GeneralStyles.fillContainer}>
      <View style={GeneralStyles.loadingView}>
        <Text style={GeneralStyles.paddingCenterAlign}>{props.action}</Text>
        <Progress.Bar
          progress={props.progress}
          width={200}
          style={GeneralStyles.marginCenterAlign}
        />
      </View>
    </View>
  );
};

export default LoadingScreen;
