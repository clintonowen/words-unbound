import { Navigation } from 'react-native-navigation';
import { WelcomeScreen, WordsFormScreen, ResultsScreen } from '../screens';
import { WELCOME_SCREEN, WORDS_FORM_SCREEN, RESULTS_SCREEN } from './Screens';

export default function () {
  Navigation.registerComponent(
    WELCOME_SCREEN,
    () => WelcomeScreen
  );
  Navigation.registerComponent(
    WORDS_FORM_SCREEN,
    () => WordsFormScreen
  );
  Navigation.registerComponent(
    RESULTS_SCREEN,
    () => ResultsScreen
  );
  // console.info('All screens have been registered...');
}
