import React, {useState, useEffect} from 'react';
import {ScrollView, View, Text, Button} from 'react-native';
import {GeneralStyles, SystemInformationStyles} from '../styles/general';
import ImageResult from './../components/imageResult';
import SaveFileToDevice from './../api/fileSaver';

const EXIFParseResult = ({navigation, route}) => {
  const [imageDetails, setImageDetails] = useState([]);
  const [failedImages, setFailedImages] = useState([]);

  async function exportImageResults() {
    let htmlString =
      '<html><!DOCTYPE html><head><title>Phone Analyser Image Report</title></head><div><h1>Image Parsing Report</h1></div>';
    htmlString += `<div style="margin-top: 2px; margin-bottom: 5px;"><h5>Generated on ${new Date()}</h5></div>`;
    htmlString += `<div><h7>Number of files successfully processed: ${imageDetails.length}</h7></div>`;
    htmlString += `<div><h7>Number of files failed processing: ${failedImages.length}</h7></div>`;

    htmlString += '<h3 style="margin-bottom:20px;">Image report</h3>';
    imageDetails.map(details => {
      htmlString += '<div style="margin-top: 5px; margin-bottom: 5px;>';
      htmlString += `<div style="margin-top: 2px; margin-bottom: 2px;">File Name: ${details.fileName}</div>`;
      htmlString += details.creationDate
        ? `<div style="margin-top: 2px; margin-bottom: 2px;">Creation Date  : ${details.creationDate}</div>`
        : '';
      htmlString += details.gpsLatitude
        ? `<div style="margin-top: 2px; margin-bottom: 2px;">Latitude  : ${details.gpsLatitude}</div>`
        : '';
      htmlString += details.gpsLatitude
        ? `<div style="margin-top: 2px; margin-bottom: 2px;">Longitude  : ${details.gpsLongitude}</div>`
        : '';
      htmlString += `<div style="margin-top: 2px; margin-bottom: 2px;">SHA-256: ${details.sha256}</div>`;
      htmlString += '</div>';
    });

    htmlString += '</html>';

    await SaveFileToDevice(htmlString, 'ImageParse');
    console.log(htmlString);
  }

  useEffect(() => {
    setImageDetails(route.params.details);
    setFailedImages(route.params.failedImages);

    console.log(imageDetails);
  }, [route.params.details, route.params.failedImages, imageDetails]);

  return (
    <ScrollView style={SystemInformationStyles.viewPadding}>
      <Text style={GeneralStyles.h1}>File Scan Result</Text>
      <Text style={GeneralStyles.h3}>
        Number of files successfully processed: {imageDetails.length}
      </Text>
      <Text style={GeneralStyles.h3}>
        Number of files failed processing: {failedImages.length}
      </Text>
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
      <View style={GeneralStyles.marginVertical14}>
        <Button
          onPress={() => {
            exportImageResults();
          }}
          title="Export Results to File"
        />
      </View>
    </ScrollView>
  );
};
export default EXIFParseResult;
