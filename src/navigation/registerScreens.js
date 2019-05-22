import React from 'react';
import { Provider } from 'react-redux';
import store from '../store/store';

import { Navigation } from 'react-native-navigation';
import { WelcomeScreen, WordsFormScreen, ResultsScreen } from '../screens';
import { WELCOME_SCREEN, WORDS_FORM_SCREEN, RESULTS_SCREEN } from './Screens';

function WrappedComponent (Component) {
  return function inject (props) {
    const EnhancedComponent = () => (
      <Provider store={store}>
        <Component
          {...props}
        />
      </Provider>
    );

    return <EnhancedComponent />;
  };
}

export default function () {
  Navigation.registerComponent(
    WELCOME_SCREEN,
    () => WelcomeScreen
  );
  Navigation.registerComponent(
    WORDS_FORM_SCREEN,
    () => WrappedComponent(WordsFormScreen)
  );
  Navigation.registerComponent(
    RESULTS_SCREEN,
    () => WrappedComponent(ResultsScreen)
  );
  // console.info('All screens have been registered...');
}
