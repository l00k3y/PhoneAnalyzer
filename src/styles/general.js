import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
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

export default styles;
