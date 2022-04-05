import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './../screens/home';
import CollectingData from './../screens/collectingData';
import SystemInformation from './../screens/systemInformation';
import EXIFParser from './../screens/imageParser';

const Stack = createNativeStackNavigator();

const HomeNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Home'}}
        />
        <Stack.Screen
          name="CollectingData"
          component={CollectingData}
          options={{}}
        />
        <Stack.Screen
          name="SystemInformation"
          component={SystemInformation}
          options={{}}
        />
        <Stack.Screen name="ImageParser" component={EXIFParser} options={{}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default HomeNavigation;