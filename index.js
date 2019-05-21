import { Navigation } from 'react-native-navigation';
import { loadWelcomeScreen } from './src/navigation';

Navigation.events().registerAppLaunchedListener(() => loadWelcomeScreen());
