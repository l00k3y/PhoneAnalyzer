import * as React from 'react';
import {GeneralStyles} from './../styles/general';
import {Text, View, Button} from 'react-native';

const HomeScreen = ({navigation, route}) => {
  return (
    <View style={GeneralStyles.flexContainer}>
      <View style={GeneralStyles.flexContainer}>
        <Text style={GeneralStyles.h1}>Phone Analyser</Text>
      </View>

      <View style={GeneralStyles.menuButtonContainer}>
        <View style={GeneralStyles.menuButtonStyle}>
          <Button
            title="Collect System Information"
            style={GeneralStyles.buttonStyle}
            onPress={() => navigation.navigate('SystemInformation')}
          />
        </View>

        <View style={GeneralStyles.menuButtonStyle}>
          <Button
            title="Scan Installed Applications"
            style={GeneralStyles.buttonStyle}
            onPress={() => navigation.navigate('ImageParser')}
          />
        </View>

        <View style={GeneralStyles.menuButtonStyle}>
          <Button
            title="Scan Images"
            style={GeneralStyles.buttonStyle}
            onPress={() => navigation.navigate('ImageParser')}
          />
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
