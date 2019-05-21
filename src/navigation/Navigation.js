import { Navigation } from 'react-native-navigation';
import { WELCOME_SCREEN } from './Screens';
import registerScreens from './registerScreens';

// Register all screens on launch
registerScreens();

export function loadWelcomeScreen () {
  Navigation.setDefaultOptions({
    topBar: {
      background: {
        color: '#EEE'
      },
      title: {
        color: '#666'
      },
      backButton: {
        // title: '', // Remove previous screen name from back button
        color: '#2196F3'
      },
      leftButtonColor: '#2196F3',
      rightButtonColor: '#2196F3'
    },
    statusBar: {
      style: 'light'
    },
    layout: {
      orientation: ['portrait']
    },
    bottomTabs: {
      backgroundColor: '#EEE',
      titleDisplayMode: 'alwaysShow'
    },
    bottomTab: {
      textColor: 'gray',
      selectedTextColor: '#2196F3',
      iconColor: 'gray',
      selectedIconColor: '#2196F3'
    }
  });

  Navigation.setRoot({
    root: {
      stack: {
        children: [{
          component: {
            name: WELCOME_SCREEN,
            options: {
              topBar: {
                title: {
                  text: 'Welcome'
                }
              }
            }
          }
        }]
      }
    }
  });
}
