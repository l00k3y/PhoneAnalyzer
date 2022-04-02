import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { NetworkInfo } from 'react-native-network-info';
import InformationResult from '../components/informationResult';

interface Result {
  fieldName: string;
  result: any;
}
/**
 *
 * @returns
 */
const SystemInformation = ({ navigation, route }) => {
  const [systemInformation, setSystemInformation] = useState([]);
  const [deviceInformation, setDeviceInformation] = useState([]);
  const [storageInformation, setStorageInformation] = useState([]);
  const [networkInformation, setNetworkInformation] = useState([]);

  useEffect(() => {
    collectData();
  }, []);

  const collectData = async () => {
    try {
      await collectDeviceInformation();
      await collectSystemInformation();
      await collectStorageInformation();
      await collectNetworkInformation();
    } catch (e) {
      console.log(e);
    }
  };

  const collectDeviceInformation = async () => {
    const deviceInformationResults: Result[] = [];
    let callResult: Result = await makeCollectCall('Device', DeviceInfo.getDevice);
    deviceInformationResults.push(callResult);

    callResult = await makeCollectCall(
      'Device Brand',
      DeviceInfo.getBrand,
    );
    deviceInformationResults.push(callResult);

    callResult = await makeCollectCall('Device ID', DeviceInfo.getDeviceId);
    deviceInformationResults.push(callResult);

    callResult = await makeCollectCall('Device Tags', DeviceInfo.getTags);
    deviceInformationResults.push(callResult);

    callResult = await makeCollectCall(
      'Device Type',
      DeviceInfo.getDeviceType,
    );
    deviceInformationResults.push(callResult);

    callResult = await makeCollectCall('Serial Number', DeviceInfo.getSerialNumber);
    deviceInformationResults.push(callResult);

    callResult = await makeCollectCall('Manufacturer', DeviceInfo.getManufacturer);
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
  }

  const collectSystemInformation = async () => {
    const systemInformationResults: Result[] = [];
    let callResult: Result = await makeCollectCall('Build ID', DeviceInfo.getBuildId);
    systemInformationResults.push(callResult);

    callResult = await makeCollectCall('System Name', DeviceInfo.getSystemName);
    systemInformationResults.push(callResult);

    callResult = await makeCollectCall('System Version', DeviceInfo.getSystemVersion);
    systemInformationResults.push(callResult);

    callResult = await makeCollectCall('Security Patch', DeviceInfo.getSecurityPatch);
    systemInformationResults.push(callResult);

    callResult = await makeCollectCall('Type of Build', DeviceInfo.getType);
    systemInformationResults.push(callResult);

    callResult = await makeCollectCall('API Level', DeviceInfo.getApiLevel);
    systemInformationResults.push(callResult);

    callResult = await makeCollectCall(
      'Bootloader',
      DeviceInfo.getBootloader,
    );
    systemInformationResults.push(callResult);
    setSystemInformation(systemInformationResults);
  }

  const collectStorageInformation = async () => {
    const storageInformation: Result[] = [];
    let callResult: Result = await makeCollectCall('Total Disk Capacity (bytes)', DeviceInfo.getTotalDiskCapacity);
    storageInformation.push(callResult);

    callResult = await makeCollectCall('Total Memory (bytes)', DeviceInfo.getTotalMemory);
    storageInformation.push(callResult);

    callResult = await makeCollectCall('Used Memory (bytes)', DeviceInfo.getUsedMemory);
    storageInformation.push(callResult);

    setStorageInformation(storageInformation);
  }

  const collectNetworkInformation = async () => {
    const networkInformation: Result[] = [];
    let callResult: Result = await makeCollectCall('Host', DeviceInfo.getHost);
    networkInformation.push(callResult);

    callResult = await makeCollectCall('IP Address', DeviceInfo.getIpAddress);
    networkInformation.push(callResult);

    callResult = await makeCollectCall(
      'MAC Address',
      DeviceInfo.getMacAddress,
    );

    networkInformation.push(callResult);
    callResult = await makeCollectCall(
      'Phone Number',
      DeviceInfo.getPhoneNumber,
    );
    networkInformation.push(callResult);

    // callResult = await makeCollectCall('User Agent', DeviceInfo.getUserAgent);
    // systemInformationResults.push(callResult);

    setNetworkInformation(networkInformation);

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
  };

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
    } catch (error: any) {
      throw new Error(`${fieldName} retrieval failed`);
    }
  };

  if (systemInformation.length > 0 || deviceInformation.length > 0) {
    return (
      <ScrollView style={{ paddingHorizontal: '5%' }}>
        <Text style={{ fontSize: 25, fontWeight: 'bold', textAlign: 'center', marginVertical: 5 }}>Results page</Text>
        
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginVertical: 5 }}>Device Information:</Text>
        {deviceInformation.map(information => {
            return (<InformationResult fieldName={information.fieldName} result={information.result} />);
        })}
        
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginVertical: 5 }}>System Information:</Text>
        {systemInformation.map(information => {
          return (<InformationResult fieldName={information.fieldName} result={information.result} />);
        })}

        <Text style={{ fontSize: 20, fontWeight: 'bold', marginVertical: 5 }}>Storage Information:</Text>
        {storageInformation.map(information => {
          return (<InformationResult fieldName={information.fieldName} result={information.result} />);
        })}

        <Text style={{ fontSize: 20, fontWeight: 'bold', marginVertical: 5 }}>Network Information:</Text>
        {networkInformation.map(information => {
          return (<InformationResult fieldName={information.fieldName} result={information.result} />);
        })}
      </ScrollView>
    );
  } else {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
};

export default SystemInformation;