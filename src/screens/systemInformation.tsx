import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  ScrollView,
  Button,
  ToastAndroid,
  Platform,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {NetworkInfo} from 'react-native-network-info';
import InformationResult from '../components/informationResult';
import * as reactNativeFs from 'react-native-fs';
import * as Progress from 'react-native-progress';
import {FileSystem} from 'react-native-file-access';

import {GeneralStyles, SystemInformationStyles} from './../styles/general';

interface Result {
  fieldName: string;
  result: any;
}
/**
 *
 * @returns
 */
const SystemInformation = ({navigation, route}) => {
  const [firstLoad, setFirstLoad] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [systemInformation, setSystemInformation] = useState([]);
  const [deviceInformation, setDeviceInformation] = useState([]);
  const [storageInformation, setStorageInformation] = useState([]);
  const [networkInformation, setNetworkInformation] = useState([]);

  const collectDeviceInformation = useCallback(async () => {
    const deviceInformationResults: Result[] = [];
    let callResult: Result = await makeCollectCall(
      'Device',
      DeviceInfo.getDevice,
    );
    deviceInformationResults.push(callResult);

    callResult = await makeCollectCall('Device Brand', DeviceInfo.getBrand);
    deviceInformationResults.push(callResult);

    callResult = await makeCollectCall('Device ID', DeviceInfo.getDeviceId);
    deviceInformationResults.push(callResult);

    callResult = await makeCollectCall('Device Tags', DeviceInfo.getTags);
    deviceInformationResults.push(callResult);

    callResult = await makeCollectCall('Device Type', DeviceInfo.getDeviceType);
    deviceInformationResults.push(callResult);

    callResult = await makeCollectCall(
      'Serial Number',
      DeviceInfo.getSerialNumber,
    );
    deviceInformationResults.push(callResult);

    callResult = await makeCollectCall(
      'Manufacturer',
      DeviceInfo.getManufacturer,
    );
    deviceInformationResults.push(callResult);

    callResult = await makeCollectCall('Product Name', DeviceInfo.getProduct);
    deviceInformationResults.push(callResult);

    callResult = await makeCollectCall('Carrier', DeviceInfo.getCarrier);
    deviceInformationResults.push(callResult);

    callResult = await makeCollectCall('Codename', DeviceInfo.getCodename);
    deviceInformationResults.push(callResult);

    callResult = await makeCollectCall('Display', DeviceInfo.getDisplay);
    deviceInformationResults.push(callResult);

    callResult = await makeCollectCall(
      'Battery Level',
      DeviceInfo.getBatteryLevel,
    );
    deviceInformationResults.push(callResult);
    setDeviceInformation(deviceInformationResults);
  }, []);

  const collectSystemInformation = useCallback(async () => {
    const systemInformationResults: Result[] = [];
    let callResult: Result = await makeCollectCall(
      'Build ID',
      DeviceInfo.getBuildId,
    );
    systemInformationResults.push(callResult);

    callResult = await makeCollectCall('System Name', DeviceInfo.getSystemName);
    systemInformationResults.push(callResult);

    callResult = await makeCollectCall(
      'System Version',
      DeviceInfo.getSystemVersion,
    );
    systemInformationResults.push(callResult);

    callResult = await makeCollectCall(
      'Security Patch',
      DeviceInfo.getSecurityPatch,
    );
    systemInformationResults.push(callResult);

    callResult = await makeCollectCall('Type of Build', DeviceInfo.getType);
    systemInformationResults.push(callResult);

    callResult = await makeCollectCall('API Level', DeviceInfo.getApiLevel);
    systemInformationResults.push(callResult);

    callResult = await makeCollectCall('Bootloader', DeviceInfo.getBootloader);
    systemInformationResults.push(callResult);
    setSystemInformation(systemInformationResults);
  }, []);

  const collectStorageInformation = useCallback(async () => {
    const storageDetails: Result[] = [];
    let callResult: Result = await makeCollectCall(
      'Total Disk Capacity (bytes)',
      DeviceInfo.getTotalDiskCapacity,
    );
    storageDetails.push(callResult);

    callResult = await makeCollectCall(
      'Total Memory (bytes)',
      DeviceInfo.getTotalMemory,
    );
    storageDetails.push(callResult);

    callResult = await makeCollectCall(
      'Used Memory (bytes)',
      DeviceInfo.getUsedMemory,
    );
    storageDetails.push(callResult);

    setStorageInformation(storageDetails);
  }, []);

  const collectNetworkInformation = useCallback(async () => {
    const networkDetails: Result[] = [];
    let callResult: Result = await makeCollectCall('Host', DeviceInfo.getHost);
    networkDetails.push(callResult);

    callResult = await makeCollectCall('IP Address', DeviceInfo.getIpAddress);
    networkDetails.push(callResult);

    callResult = await makeCollectCall('MAC Address', DeviceInfo.getMacAddress);

    networkDetails.push(callResult);
    callResult = await makeCollectCall(
      'Phone Number',
      DeviceInfo.getPhoneNumber,
    );
    networkDetails.push(callResult);

    // callResult = await makeCollectCall('User Agent', DeviceInfo.getUserAgent);
    // systemInformationResults.push(callResult);

    setNetworkInformation(networkDetails);

    // NetworkInfo.getIPAddress().then(ipAddress => {
    //   console.log(ipAddress);
    // });
    // // Get IPv4 IP (priority: WiFi first, cellular second)
    // NetworkInfo.getIPV4Address().then(ipv4Address => {
    //   console.log(ipv4Address);
    // });
    // // Get Broadcast
    // NetworkInfo.getBroadcast().then(broadcast => {
    //   console.log(broadcast);
    // });
    // // Get SSID
    // NetworkInfo.getSSID().then(ssid => {
    //   console.log(ssid);
    // });
    // // Get BSSID
    // NetworkInfo.getBSSID().then(bssid => {
    //   console.log(bssid);
    // });
    // // Get Subnet
    // NetworkInfo.getSubnet().then(subnet => {
    //   console.log(subnet);
    // });
    // // Get Default Gateway IP
    // NetworkInfo.getGatewayIPAddress().then(defaultGateway => {
    //   console.log(defaultGateway);
    // });
    // // Get frequency (supported only for Android)
    // NetworkInfo.getFrequency().then(frequency => {
    //   console.log(frequency);
    // });
  }, []);

  async function collectData() {
    try {
      await collectDeviceInformation();
      setProgress(25);
      await collectNetworkInformation();
      setProgress(50);
      await collectStorageInformation();
      setProgress(75);
      await collectSystemInformation();
      setProgress(100);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    collectData();
    setFirstLoad(false);
  }, [firstLoad]);

  /**
   *
   * @param fieldName Field to be collected
   * @param action - Method called to collect data
   * @returns - Object including field name and collected data or N/A
   */
  const makeCollectCall = async (fieldName: string, action: () => any) => {
    try {
      let actionResult = await action();
      const defaultResult: Result = {
        fieldName: fieldName,
        result: actionResult ? actionResult : 'N/A',
      };
      return defaultResult;
    } catch (error) {
      throw new Error(`${fieldName} retrieval failed`);
    }
  };

  /**
   * Exports all collected information to a HTML document to the root of the user area
   */
  const exportInformationToFile = async () => {
    let htmlString: string =
      '<html><!DOCTYPE html><head><title>Phone Analyser Report</title></head><div><h1>System & Network Information Report</h1></div>';
    htmlString += `<div style="margin-top: 2px; margin-bottom: 5px;"><h5>Generated on ${new Date()}</h5></div>`;

    htmlString += '<h3>Device Information</h3>';
    deviceInformation.map((information: Result) => {
      htmlString += `<div style="margin-top: 2px; margin-bottom: 2px;">${information.fieldName}: ${information.result}</div>`;
    });

    htmlString += '<h3>System Information</h3>';
    systemInformation.map((information: Result) => {
      htmlString += `<div style="margin-top: 2px; margin-bottom: 2px;">${information.fieldName}: ${information.result}</div>`;
    });

    htmlString += '<h3>Storage Information</h3>';
    storageInformation.map((information: Result) => {
      htmlString += `<div style="margin-top: 2px; margin-bottom: 2px;">${information.fieldName}: ${information.result}</div>`;
    });

    htmlString += '<h3>Network Information</h3>';
    networkInformation.map((information: Result) => {
      htmlString += `<div style="margin-top: 2px; margin-bottom: 2px;">${information.fieldName}: ${information.result}</div>`;
    });

    htmlString += '</html>';
    console.log(htmlString);

    saveFileToDevice(htmlString);
  };

  const saveFileToDevice = async (htmlString: string) => {
    const today = new Date();

    try {
      const externalDirs = await reactNativeFs.getAllExternalFilesDirs();
      if (externalDirs.length > 0) {
        const path = `${
          externalDirs[0]
        }/SystemInfoReport-${today.toDateString()}-T${today.getHours()}-${today.getMinutes()}-${today.getSeconds()}.html`;

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

  if (!isLoading) {
    return (
      <ScrollView style={SystemInformationStyles.viewPadding}>
        <Text style={GeneralStyles.h1}>Results page</Text>

        <Text style={SystemInformationStyles.informationHeader}>
          Device Information:
        </Text>
        {deviceInformation.map(information => {
          return (
            <InformationResult
              fieldName={information.fieldName}
              result={information.result}
            />
          );
        })}

        <Text style={SystemInformationStyles.informationHeader}>
          System Information:
        </Text>
        {systemInformation.map(information => {
          return (
            <InformationResult
              fieldName={information.fieldName}
              result={information.result}
            />
          );
        })}

        <Text style={SystemInformationStyles.informationHeader}>
          Storage Information:
        </Text>
        {storageInformation.map(information => {
          return (
            <InformationResult
              fieldName={information.fieldName}
              result={information.result}
            />
          );
        })}

        <Text style={SystemInformationStyles.informationHeader}>
          Network Information:
        </Text>
        {networkInformation.map(information => {
          return (
            <InformationResult
              fieldName={information.fieldName}
              result={information.result}
            />
          );
        })}

        <View style={GeneralStyles.marginVertical14}>
          <Button
            title="Export Information"
            onPress={() => {
              exportInformationToFile();
            }}
          />
        </View>
      </ScrollView>
    );
  } else {
    return (
      <View style={GeneralStyles.fillContainer}>
        <View style={GeneralStyles.loadingView}>
          <Text style={GeneralStyles.paddingCenterAlign}>Loading...</Text>
          <Progress.Bar
            progress={progress}
            width={200}
            style={GeneralStyles.marginCenterAlign}
          />
        </View>
      </View>
    );
  }
};

export default SystemInformation;
