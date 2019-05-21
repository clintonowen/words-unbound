import { Navigation } from 'react-native-navigation';
import { WelcomeScreen } from '../screens';
import { WELCOME_SCREEN } from './Screens';

export default function () {
  Navigation.registerComponent(
    WELCOME_SCREEN,
    () => WelcomeScreen
  );
  // console.info('All screens have been registered...');
}
