import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {NetworkInfo} from 'react-native-network-info';

interface Result {
  fieldName: string;
  result: any;
}
/**
 *
 * @returns
 */
const SystemInformation = ({navigation, route}) => {
  const [systemInformation, setSystemInformation] = useState([]);
  useEffect(() => {
    collectData();
  }, []);

  // divide up into sections, then makes it easy for output
  const collectData = async () => {
    const systemInformationResults: Result[] = [];
    try {
      //DEVICE
      let callResult: Result = await makeCollectCall('Device', DeviceInfo.getDevice);
      systemInformationResults.push(callResult);

      callResult = await makeCollectCall(
        'Device Brand',
        DeviceInfo.getBrand,
      );
      systemInformationResults.push(callResult);

      callResult = await makeCollectCall('Device ID', DeviceInfo.getDeviceId);
      systemInformationResults.push(callResult);

      callResult = await makeCollectCall('Device Tags', DeviceInfo.getTags);
      systemInformationResults.push(callResult);

      callResult = await makeCollectCall(
        'Device Type',
        DeviceInfo.getDeviceType,
      );
      systemInformationResults.push(callResult);

      callResult = await makeCollectCall('Serial Number', DeviceInfo.getSerialNumber);
      systemInformationResults.push(callResult);

      callResult = await makeCollectCall('Manufacturer', DeviceInfo.getManufacturer);
      systemInformationResults.push(callResult);

      callResult = await makeCollectCall('Product Name', DeviceInfo.getProduct);
      systemInformationResults.push(callResult);

      callResult = await makeCollectCall('Carrier', DeviceInfo.getCarrier);
      systemInformationResults.push(callResult);



      callResult = await makeCollectCall('Codename', DeviceInfo.getCodename);
      systemInformationResults.push(callResult);


      callResult = await makeCollectCall('Display', DeviceInfo.getDisplay);
      systemInformationResults.push(callResult);

      callResult = await makeCollectCall('API Level', DeviceInfo.getApiLevel);
      systemInformationResults.push(callResult);

      callResult = await makeCollectCall(
        'Battery Level',
        DeviceInfo.getBatteryLevel,
      );
      systemInformationResults.push(callResult);

      //
      callResult = await makeCollectCall('Build ID', DeviceInfo.getBuildId);
      systemInformationResults.push(callResult);


      

      callResult = await makeCollectCall('System Name', DeviceInfo.getSystemName);
      systemInformationResults.push(callResult);

      callResult = await makeCollectCall('System Version', DeviceInfo.getSystemVersion);
      systemInformationResults.push(callResult);

      callResult = await makeCollectCall('Security Patch', DeviceInfo.getSecurityPatch);
      systemInformationResults.push(callResult);

      callResult = await makeCollectCall('Type of Build', DeviceInfo.getType);
      systemInformationResults.push(callResult);

      //STORAGE
      callResult = await makeCollectCall('Total Disk Capacity (bytes)', DeviceInfo.getTotalDiskCapacity);
      systemInformationResults.push(callResult);

      callResult = await makeCollectCall('Total Memory (bytes)', DeviceInfo.getTotalMemory);
      systemInformationResults.push(callResult);

      callResult = await makeCollectCall('Used Memory (bytes)', DeviceInfo.getUsedMemory);
      systemInformationResults.push(callResult);
      //END STORAGE
      
      callResult = await makeCollectCall(
        'Bootloader',
        DeviceInfo.getBootloader,
      );
      systemInformationResults.push(callResult);

      //NETWORK
      callResult = await makeCollectCall('Host', DeviceInfo.getHost);
      systemInformationResults.push(callResult);

      callResult = await makeCollectCall('IP Address', DeviceInfo.getIpAddress);
      systemInformationResults.push(callResult);

      callResult = await makeCollectCall(
        'MAC Address',
        DeviceInfo.getMacAddress,
      );


      // callResult = await makeCollectCall('User Agent', DeviceInfo.getUserAgent);
      // systemInformationResults.push(callResult);

      //END NETWORK


      systemInformationResults.push(callResult);
      callResult = await makeCollectCall(
        'Phone Number',
        DeviceInfo.getPhoneNumber,
      );
      systemInformationResults.push(callResult);

      setSystemInformation(systemInformationResults);
    } catch (e) {
      console.log(e);
    }
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

  const collectNetworkInformation = async () => {
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

  if (systemInformation.length > 0) {
    return (
      <View>
        <Text>Results page</Text>
        {systemInformation.map(information => {
          return (
            <>
              <Text>
                {information.fieldName}: {information.result}
              </Text>
            </>
          );
        })}
      </View>
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
