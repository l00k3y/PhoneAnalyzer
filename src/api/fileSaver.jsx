import * as reactNativeFs from 'react-native-fs';
import {FileSystem} from 'react-native-file-access';
import {ToastAndroid, Platform} from 'react-native';

const SaveFileToDevice = async (htmlString, action) => {
  const today = new Date();

  try {
    const externalDirs = await reactNativeFs.getAllExternalFilesDirs();
    if (externalDirs.length > 0) {
      const path = `${
        externalDirs[0]
      }/${action}-${today.toDateString()}-T${today.getHours()}-${today.getMinutes()}-${today.getSeconds()}.html`;

      await FileSystem.writeFile(path, htmlString, 'utf8');
      if (Platform.OS === 'android') {
        ToastAndroid.show(`File output to ${path}`, ToastAndroid.LONG);
      }
    } else {
      throw new Error('No output directories found');
    }
    // console.log(Dirs.DocumentDir);
  } catch (e) {
    throw new Error('Save file to device failed');
  }
};

export default SaveFileToDevice;
