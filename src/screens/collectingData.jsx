import * as React from 'react';
import {Text, View} from 'react-native';
// import {  } from '@react-navigation/native';

const CollectingData = ({navigation, route}) => {
  return (
    <View>
      <Text>Testing 123</Text>
      {navigateToSysInfo()}
    </View>
  );

  function navigateToSysInfo() {
    setTimeout(() => {
      navigation.navigate('SystemInformation');
    }, 1000);
  }
};

export default CollectingData;
