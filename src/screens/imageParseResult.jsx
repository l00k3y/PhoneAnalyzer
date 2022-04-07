import React, {useState, useEffect} from 'react';
import {ScrollView, View, Text, Button} from 'react-native';

const EXIFParseResult = ({navigation, route}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageDetails, setImageDetails] = useState([]);

  useEffect(() => {
    setIsLoading(false);
    // console.log(route.params.details);
    setImageDetails(route.params.details);

    console.log(imageDetails);
  }, [route.params.details, imageDetails]);

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  } else {
    return (
      <ScrollView>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 24,
            fontWeight: 'bold',
            padding: 14,
          }}>
          File Scan Result
        </Text>
        <View>
          {imageDetails.map(element => {
            return (
              <View style={{padding: 14}}>
                <Text>File Name: {element.fileName}</Text>
                <Text>Creation Date: {element.creationDate}</Text>
                <Text>Latitude: {element.gpsLatitude}</Text>
                <Text>Longitude: {element.gpsLongitude}</Text>
                <Text>SHA-256: {element.sha256}</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  }
};

export default EXIFParseResult;
