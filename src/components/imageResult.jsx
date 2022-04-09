import React from 'react';
import {Text, View} from 'react-native';
import {GeneralStyles} from './../styles/general';

const ImageResult = props => {
  return (
    <View style={GeneralStyles.smallPaddingBlack}>
      <Text style={GeneralStyles.smallPaddingBlack}>
        File Name: {props.fileName}
      </Text>
      {props.creationDate ? (
        <Text style={GeneralStyles.smallPaddingBlack}>
          Creation Date: {props.creationDate}
        </Text>
      ) : null}
      {props.gpsLatitude ? (
        <Text style={GeneralStyles.smallPaddingBlack}>
          Latitude: {props.gpsLatitude}
        </Text>
      ) : null}
      {props.gpsLongitude ? (
        <Text style={GeneralStyles.smallPaddingBlack}>
          Longitude: {props.gpsLongitude}
        </Text>
      ) : null}
      <Text style={GeneralStyles.smallPaddingBlack}>
        SHA-256: {props.sha256}
      </Text>
    </View>
  );
};

export default ImageResult;
