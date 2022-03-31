import React from 'react';
import {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import DeviceInfo from 'react-native-device-info';
/**
 *
 * @returns
 */
const SystemInformation = ({navigation, route}) => {
  function collectData() {
    const result = DeviceInfo.getApplicationName();
    return <Text>Application Name: {result}</Text>;
  }
  useEffect(() => {
    collectData();
    return () => {
      console.log('test');
    };
  });

  return (
    <View>
      <Text>Results page</Text>
      {/* {collectData()} */}
    </View>
  );
};

export default SystemInformation;
