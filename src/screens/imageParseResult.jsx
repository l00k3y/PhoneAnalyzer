import React, {useState, useEffect} from 'react';
import {ScrollView, View, Text} from 'react-native';
import {GeneralStyles} from '../styles/general';
import ImageResult from './../components/imageResult';

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
        <Text style={GeneralStyles.h1}>File Scan Result</Text>
        <View>
          {imageDetails.map(element => {
            return (
              <ImageResult
                fileName={element.fileName}
                creationDate={element.creationDate}
                gpsLatitude={element.gpsLatitude}
                gpsLongitude={element.gpsLongitude}
                sha256={element.sha256}
              />
            );
          })}
        </View>
      </ScrollView>
    );
  }
};
// //key={element.fileName} style={{padding: 14}}>
export default EXIFParseResult;
