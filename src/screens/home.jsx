import * as React from 'react';
import styles from '../styles/general.js';
import {Text, View, Button} from 'react-native';

const HomeScreen = ({navigation, route}) => {
  return (
    <View style={styles.flexContainer}>
      <View style={styles.flexContainer}>
        <Text style={styles.h1}>Phone Analyser</Text>
      </View>

      <View style={styles.menuButtonContainer}>
        <View style={styles.menuButtonStyle}>
          <Button
            title="Collect System Information"
            style={styles.buttonStyle}
            onPress={() => navigation.navigate('CollectingData')}
          />
        </View>

        <View style={styles.menuButtonStyle}>
          <Button
            title="Scan Installed Applications"
            style={styles.buttonStyle}
          />
        </View>

        <View style={styles.menuButtonStyle}>
          <Button title="Scan Images" style={styles.buttonStyle} />
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
