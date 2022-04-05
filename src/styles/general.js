import {StyleSheet} from 'react-native';

export const GeneralStyles = StyleSheet.create({
  flexContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
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
  },
});

export const SystemInformationStyles = StyleSheet.create({
  informationHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  viewPadding: {
    paddingHorizontal: '5%',
  },
});
