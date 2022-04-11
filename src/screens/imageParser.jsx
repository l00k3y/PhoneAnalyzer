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
  const [plottedMapURL, setPlottedMapURL] = useState('');
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
      setPlottedMapURL(await getStaticMapImage(processedDetails));
      setImagesFailedProcessing(failedFiles);
      resolve();
      setProcessedFilesCompleted(true);
      setIsProcessing(false);
      setProcessedFileDetails(processedDetails);
    });
  };

  async function getStaticMapImage(locations) {
    try {
      const finalURL = buildStaticURL(locations);
      const response = await fetch(finalURL);
      if (response.status === 200) {
        console.log(response.url);
        return response.url;
      }
    } catch (e) {
      console.log(e);
    }
  }

  function buildStaticURL(locations) {
    const staticMapsURL = 'https://maps.googleapis.com/maps/api/staticmap?';
    const size = 'size=300x200';
    const format = 'format=png';
    // const zoom = 'zoom=3';
    const key = 'key=AIzaSyB3m8qH0IA5oRaM_oRgmweAn7LbBL6uwPg';
    let markers = 'markers=';
    for (let i = 0; i < locations.length; i++) {
      const currentLocation = locations[i];
      markers += `${currentLocation.gpsLatitude},${currentLocation.gpsLongitude}|`;
    }
    return encodeURI(`${staticMapsURL}${size}&${format}&${markers}&${key}`);
  }

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
                  plottedMapURL: plottedMapURL,
                });
              }}
            />
            {/* <WebView
              source={{
                uri: 'https://maps.googleapis.com/maps/api/staticmap?size=300x200&format=png&markers=43.46715666666389,11.885394999997223%7C43.46715666666389,11.885394999997223%7C43.467081666663894,11.884538333330555%7C43.468365,11.881634999972222%7C43.468243333330555,11.880171666638889%7C43.46601166663889,11.87911166663889%7C0,0%7C&key=AIzaSyB3m8qH0IA5oRaM_oRgmweAn7LbBL6uwPg',
              }}
            /> */}
          </View>
        ) : null}
      </View>
    );
  }
};

export default EXIFParser;
