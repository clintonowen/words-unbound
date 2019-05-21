// import { Dimensions } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { WELCOME_SCREEN } from './Screens';
import registerScreens from './registerScreens';

// Register all screens on launch
registerScreens();

export function loadWelcomeScreen () {
  // const screenWidth = Dimensions.get('window').width;

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
      backgroundColor: '#766E8E',
      style: 'light'
    },
    layout: {
      backgroundColor: '#766E8E',
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
    // animations: {
    //   push: {
    //     enabled: true,
    //     topBar: {
    //       x: {
    //         from: screenWidth,
    //         to: 0,
    //         duration: 300,
    //         startDelay: 0,
    //         interpolation: 'decelerate',
    //         waitForRender: true
    //       }
    //     },
    //     content: {
    //       x: {
    //         from: screenWidth,
    //         to: 0,
    //         duration: 300,
    //         startDelay: 0,
    //         interpolation: 'decelerate',
    //         waitForRender: true
    //       }
    //     },
    //     bottomTabs: {
    //       x: {
    //         from: screenWidth,
    //         to: 0,
    //         duration: 300,
    //         startDelay: 0,
    //         interpolation: 'decelerate',
    //         waitForRender: true
    //       }
    //     }
    //   },
    //   pop: {
    //     enabled: true,
    //     topBar: {
    //       x: {
    //         from: 0,
    //         to: screenWidth,
    //         duration: 300,
    //         startDelay: 0,
    //         interpolation: 'decelerate',
    //         waitForRender: true
    //       }
    //     },
    //     content: {
    //       x: {
    //         from: 0,
    //         to: screenWidth,
    //         duration: 300,
    //         startDelay: 0,
    //         interpolation: 'decelerate',
    //         waitForRender: true
    //       }
    //     },
    //     bottomTabs: {
    //       x: {
    //         from: 0,
    //         to: screenWidth,
    //         duration: 300,
    //         startDelay: 0,
    //         interpolation: 'decelerate',
    //         waitForRender: true
    //       }
    //     }
    //   }
    // }
  });

  Navigation.setRoot({
    root: {
      stack: {
        children: [{
          component: {
            name: WELCOME_SCREEN,
            options: {
              topBar: {
                visible: false,
                drawBehind: true
              }
            }
          }
        }]
      }
    }
  });
}
