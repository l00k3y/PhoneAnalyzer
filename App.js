/* eslint-disable prettier/prettier */
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.fillContainer}>
        <View style={styles.flexContainer}>
          <View style={styles.flexContainer}>
            <Text style={styles.h1}>Phone Analyser</Text>
          </View>

          <View style={styles.menuButtonContainer}>
            <View style={styles.menuButtonStyle}>
              <Button
                title="Collect System Information"
                style={styles.buttonStyle}
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
      </SafeAreaView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  menuButtonContainer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  menuButtonStyle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flex: 1,
    width: '100%',
  },
  buttonStyle: {
    width: '100%',
  },
  fillContainer: {
    height: '100%',
    width: '100%',
  },
  h1: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
    marginVertical: 14,
  },
});

export default App;
