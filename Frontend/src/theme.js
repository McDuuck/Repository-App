import Constants from 'expo-constants';
import { Platform } from 'react-native';

const theme = {
    colors: {
      textPrimary: '#24292e',
      textSecondary: '#586069',
      primary: '#0366d6',
      backgroundColor: '#24292e',
    },
    fontSizes: {
      body: 14,
      subheading: 16,
    },
    fonts: {
      main: Platform.select({
        android: 'Roboto',
        ios: 'Futura',
        default: 'System',
      }),
    },
    fontWeights: {
      normal: '400',
      bold: '700',
    },
    barContainer: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#24292e',
        flexDirection: 'row',
    },
    barTest: {
      color: '#ffffff',
      fontSize: 20,
      fontWeight: 'bold',
      padding: 20,
    },
    signInForm: {
      backgroundColor: '#ffffff',
      padding: 20,
      border: '1px solid black',
    },
  };
  
  export default theme;