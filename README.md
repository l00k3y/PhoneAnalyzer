# PhoneAnalyzer
An application that collects and generates reports from Android device system information. Featuring EXIF data parsing from image and video files, with the option to plot any coordinates found on a static Google Maps image and generate a report based on the results. 

Written in React Native as part of my dissertation.

## Setup Instructions
As this product is not production ready, you will need to setup a development environment for Android devices and install React Native to use this product.

Follow the development environment for your operating system here:
https://reactnative.dev/docs/environment-setup

This product uses the React Native CLI

Once you've successfully setup your development environment, clone this repository, navigate to it in a terminal and type

    npx react-native start => this will start a Metro server for you
    npx react-native run-android => this will load an emulated device if one isn't currently running and install the debugging APK for use
