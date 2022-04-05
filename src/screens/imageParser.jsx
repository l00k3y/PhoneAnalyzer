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
  const [selectedImages, setSelectedImages] = useState();

  useEffect(() => {
    // console.log('loaded');
    // collectData();
  }, []);

  const selectImages = async () => {
    const chosenImages = launchImageLibrary({
      selectionLimit: 50,
      mediaType: 'mixed',
    }).then(imageSelected => {
      setSelectedImages(imageSelected);
      console.log(imageSelected);
      return imageSelected;
    });

    const imageDetails = [];
    (await chosenImages).assets.forEach(async imageFile => {
      const b64Buffer = await RNFS.readFile(imageFile.uri, 'base64'); // Where the URI looks like this: "file:///path/to/image/IMG_0123.HEIC"
      const fileBuffer = decode(b64Buffer);
      const tags = ExifReader.load(fileBuffer, {expanded: true});

      console.log(Object.keys(tags));

      let gpsLatitude = tags.exif.GPSLatitude.description;
      if (tags.exif.GPSLatitudeRef.value[0] === 'S') {
        gpsLatitude = -tags.exif.GPSLatitude.description;
      }
      console.log(`GPS Latitude = ${gpsLatitude}`);

      let gpsLongitude = tags.exif.GPSLongitude.description;
      if (tags.exif.GPSLongitudeRef.value[0] === 'W') {
        gpsLongitude = -tags.exif.GPSLongitude.description;
      }

      console.log(`GPS Longitude = ${gpsLongitude}`);

      const fileDetails = {
        fileName: imageFile.uri,
        // creationDate: ,
        gpsLatitude: gpsLatitude,
        gpsLongitude: gpsLongitude,
      };

      imageDetails.push(fileDetails);
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
          onPress={() => {
            selectImages();
          }}
        />
      </View>
    );
  }
};

export default EXIFParser;
