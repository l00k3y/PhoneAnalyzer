import React, {useState, useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import ExifReader from './../../node_modules/exifreader/src/exif-reader.js';
import RNFS from 'react-native-fs';
import {decode} from 'base64-arraybuffer';

import {SystemInformationStyles} from './../styles/general';

/**
 *
 *
 * @returns
 */
const EXIFParser = ({navigation, route}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [disabledExamine, setDisabledExamine] = useState(true);
  const [processedFilesCompleted, setProcessedFilesCompleted] = useState(false);
  const [processedFileDetails, setProcessedFileDetails] = useState([]);

  useEffect(() => {
    setDisabledExamine(true);
    setProcessedFilesCompleted(false);
    setSelectedImages([]);
    setProcessedFileDetails([]);
  }, []);

  const selectImages = async () => {
    const chosenImages = await launchImageLibrary({
      selectionLimit: 50,
      mediaType: 'mixed',
    });

    if (chosenImages.assets) {
      setSelectedImages(chosenImages.assets);
      setDisabledExamine(false);
    }
  };

  const processSelectedImages = async => {
    const processedDetails = [];
    return new Promise(async (resolve, reject) => {
      selectedImages.forEach(async imageFile => {
        const b64Buffer = await RNFS.readFile(imageFile.uri, 'base64');
        const fileBuffer = decode(b64Buffer);
        const tags = ExifReader.load(fileBuffer, {expanded: true});

        let fileDetails = {
          fileName: '',
          creationDate: null,
          gpsLatitude: 0,
          gpsLongitude: 0,
          sha256: '',
        };

        if (tags.exif) {
          // console.log(tags.exif.DateTimeOriginal.description);

          let gpsLatitude = tags.exif.GPSLatitude.description;
          if (tags.exif.GPSLatitudeRef.value[0] === 'S') {
            gpsLatitude = -tags.exif.GPSLatitude.description;
          }
          // console.log(`GPS Latitude = ${gpsLatitude}`);

          let gpsLongitude = tags.exif.GPSLongitude.description;
          if (tags.exif.GPSLongitudeRef.value[0] === 'W') {
            gpsLongitude = -tags.exif.GPSLongitude.description;
          }
          // console.log(`GPS Longitude = ${gpsLongitude}`);

          fileDetails.creationDate = tags.exif.DateTimeOriginal.description;
          fileDetails.gpsLatitude = gpsLatitude;
          fileDetails.gpsLongitude = gpsLongitude;
        } else {
          // console.log('No EXIF data found');
        }

        fileDetails.fileName = imageFile.uri;
        const fileHash = await RNFS.hash(imageFile.uri, 'sha256');
        fileDetails.sha256 = fileHash;
        // console.log(`filehash = ${fileHash}`);

        processedDetails.push(fileDetails);
      });
      resolve();
      setProcessedFilesCompleted(true);
      setProcessedFileDetails(processedDetails);
    });
  };

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  } else {
    return (
      <View style={SystemInformationStyles.viewPadding}>
        <Text style={SystemInformationStyles.informationHeader}>
          Examine Images
        </Text>

        <Button
          title="Select Images"
          onPress={async () => {
            await selectImages();
          }}
        />

        {disabledExamine ? null : (
          <>
            <View style={{paddingVertical: 14}}>
              <Text style={{textAlign: 'center', padding: 14}}>
                Selected ({selectedImages.length}) File(s)
              </Text>
            </View>
            <Button
              title="Examine File(s)"
              onPress={async () => {
                await processSelectedImages();
              }}
              disabled={disabledExamine}
            />
          </>
        )}

        {processedFilesCompleted ? (
          <View style={{paddingVertical: 14}}>
            <Button
              title="Build Report"
              style={{paddingVertical: 14}}
              onPress={() => {
                navigation.navigate('EXIFParseResult', {
                  details: processedFileDetails,
                });
              }}
            />
          </View>
        ) : null}
      </View>
    );
  }
};

export default EXIFParser;
