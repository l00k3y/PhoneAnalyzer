import React from 'react';
import {Text, View} from 'react-native';
import {ImageResultStyles} from './../styles/general';

const ImageResult = props => {
  return (
    <View style={ImageResultStyles.resultPadding}>
      <Text style={ImageResultStyles.textStyle}>
        File Name: {props.fileName}
      </Text>
      {props.creationDate ? (
        <Text style={ImageResultStyles.textStyle}>
          Creation Date: {props.creationDate}
        </Text>
      ) : null}
      {props.gpsLatitude ? (
        <Text style={ImageResultStyles.textStyle}>
          Latitude: {props.gpsLatitude}
        </Text>
      ) : null}
      {props.gpsLongitude ? (
        <Text style={ImageResultStyles.textStyle}>
          Longitude: {props.gpsLongitude}
        </Text>
      ) : null}
      <Text style={ImageResultStyles.textStyle}>SHA-256: {props.sha256}</Text>
    </View>
  );
};

export default ImageResult;
