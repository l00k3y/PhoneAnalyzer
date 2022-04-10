import {StyleSheet} from 'react-native';

export const GeneralStyles = StyleSheet.create({
  flexContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    color: 'black',
  },
  menuButtonContainer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  menuButtonStyle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flex: 1,
    width: '100%',
  },
  buttonStyle: {
    width: '100%',
  },
  fillContainer: {
    height: '100%',
    width: '100%',
  },
  h1: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
    marginVertical: 14,
    color: '#000000',
  },
  h3: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    marginVertical: 6,
    color: '#000000',
  },
  loadingView: {
    display: 'flex',
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  paddingCenterAlign: {padding: 14, textAlign: 'center', color: '#000000'},
  marginCenterAlign: {marginLeft: 'auto', marginRight: 'auto'},
  marginVertical14: {marginVertical: 14},
  smallPaddingBlack: {marginVertical: 2, color: '#000000'},
});

export const SystemInformationStyles = StyleSheet.create({
  informationHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 5,
    color: '#000000',
  },
  viewPadding: {
    color: '#000000',
    paddingHorizontal: '5%',
  },
});

export const ImageResultStyles = StyleSheet.create({
  textStyle: {
    color: '#000000',
  },
  resultPadding: {
    padding: 14,
  },
});
