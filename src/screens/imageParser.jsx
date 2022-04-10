import React, {useState, useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import ExifReader from './../../node_modules/exifreader/src/exif-reader.js';
import RNFS from 'react-native-fs';
import {decode} from 'base64-arraybuffer';

import {GeneralStyles, SystemInformationStyles} from './../styles/general';
import LoadingScreen from './loadingScreen.jsx';

/**
 *
 *
 * @returns
 */
const EXIFParser = ({navigation, route}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagesFailedProcessing, setImagesFailedProcessing] = useState([]);
  const [disabledExamine, setDisabledExamine] = useState(true);
  const [processedFilesCompleted, setProcessedFilesCompleted] = useState(false);
  const [processedFileDetails, setProcessedFileDetails] = useState([]);

  useEffect(() => {
    setDisabledExamine(true);
    setProcessedFilesCompleted(false);
    setSelectedImages([]);
    setProcessedFileDetails([]);
    setIsProcessing(false);
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
    setIsProcessing(true);
    const processedDetails = [];
    return new Promise(async (resolve, reject) => {
      const selectedImagesCount = selectedImages.length;
      const failedFiles = [];
      for (let i = 0; i < selectedImagesCount; i++) {
        let imageFile = null;
        try {
          imageFile = selectedImages[i];

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
            let gpsLatitude = 0;
            if (tags.exif.GPSLatitude.description) {
              gpsLatitude = tags.exif.GPSLatitude.description;
              if (tags.exif.GPSLatitudeRef.value[0] === 'S') {
                gpsLatitude = 0 - Number(tags.exif.GPSLatitude.description);
              }
            }

            let gpsLongitude = 0;
            if (tags.exif.GPSLongitude.description) {
              gpsLongitude = tags.exif.GPSLongitude.description;
              if (tags.exif.GPSLongitudeRef.value[0] === 'W') {
                gpsLongitude = 0 - Number(tags.exif.GPSLongitude.description);
              }
            }

            if (tags.exif.DateTimeOriginal.description) {
              fileDetails.creationDate = tags.exif.DateTimeOriginal.description;
            }
            fileDetails.gpsLatitude = gpsLatitude;
            fileDetails.gpsLongitude = gpsLongitude;
          }

          fileDetails.fileName = imageFile.uri;
          const fileHash = await RNFS.hash(imageFile.uri, 'sha256');
          fileDetails.sha256 = fileHash;

          processedDetails.push(fileDetails);
          setProgress(Math.round((i / selectedImagesCount) * 100));
        } catch (e) {
          failedFiles.push(imageFile);
          continue;
        }
      }
      setImagesFailedProcessing(failedFiles);
      resolve();
      setProcessedFilesCompleted(true);
      setIsProcessing(false);
      setProcessedFileDetails(processedDetails);
    });
  };

  if (isProcessing) {
    return <LoadingScreen action={'Processing...'} progress={progress} />;
  } else {
    return (
      <View style={SystemInformationStyles.viewPadding}>
        <Text style={GeneralStyles.h1}>Examine Images</Text>

        <Button
          title="Select Images"
          onPress={async () => {
            await selectImages();
          }}
        />

        {disabledExamine ? null : (
          <>
            <View style={GeneralStyles.marginVertical14}>
              <Text style={GeneralStyles.paddingCenterAlign}>
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
          <View style={GeneralStyles.marginVertical14}>
            {imagesFailedProcessing ? (
              <Text style={GeneralStyles.paddingCenterAlign}>
                {imagesFailedProcessing.length} files failed to process
              </Text>
            ) : null}
            <Button
              title="Build Report"
              style={GeneralStyles.marginVertical14}
              onPress={() => {
                navigation.navigate('EXIFParseResult', {
                  details: processedFileDetails,
                  failedImages: imagesFailedProcessing,
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
