import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Platform,
  Dimensions
} from 'react-native';
import MainText from '../../components/UI/MainText';
import NavButton from '../../components/UI/NavButton';

import { makeId } from '../../utils/utils';

import { Navigation } from 'react-native-navigation';
import { WORDS_FORM_SCREEN } from '../../navigation/Screens';

export class WelcomeScreen extends Component {
  constructor (props) {
    super(props);
    this.handleNewLevel = this.handleNewLevel.bind(this);
  }

  handleNewLevel () {
    Navigation.push(this.props.componentId, {
      component: {
        name: WORDS_FORM_SCREEN,
        options: {
          topBar: {
            visible: false,
            drawBehind: true
          }
        }
      }
    });
  }

  render () {
    const colors = ['orange', 'green', 'pink', 'blue'];
    let colorIndex = 0;
    const unbound = ['U', 'N', 'B', 'O', 'U', 'N', 'D'].map((letter, index) => {
      const tile = (
        <View
          key={makeId()}
          style={[
            styles.tile,
            styles[colors[colorIndex]],
            Platform.OS === 'ios'
              ? styles.iosShadow
              : styles.androidShadow
          ]}
        >
          <MainText style={styles.tileText}>{letter}</MainText>
        </View>
      );
      if (colorIndex < colors.length - 1) {
        colorIndex++;
      } else {
        colorIndex = 0;
      }
      return tile;
    });

    return (
      <View style={[
        styles.container,
        Platform.OS === 'ios'
          ? styles.iosContainer
          : null
      ]
      }>
        <MainText style={styles.heading}>
          WORDS
        </MainText>
        <View style={styles.tileContainer}>
          {unbound}
        </View>
        <NavButton
          color='#00C183'
          onPress={this.handleNewLevel}
          style={styles.button}
        >
          New Level
        </NavButton>
      </View>
    );
  }
}

const winWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  iosContainer: {
    marginTop: 20
  },
  heading: {
    fontSize: winWidth / 4.5,
    fontWeight: 'bold',
    lineHeight: winWidth / 4.5,
    margin: 0,
    textShadowColor: 'rgb(40, 40, 40)',
    textShadowOffset: {
      width: 2,
      height: 2
    },
    textShadowRadius: 2
  },
  tileContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    width: winWidth / 1.2
  },
  tile: {
    borderRadius: 4,
    flex: 1,
    flexDirection: 'row',
    height: (winWidth / (1.2 * 7)) - 4,
    justifyContent: 'center',
    marginHorizontal: 2
  },
  iosShadow: {
    shadowColor: 'rgb(40, 40, 40)',
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowOpacity: 1,
    shadowRadius: 1
  },
  androidShadow: {
    elevation: 6
  },
  pink: {
    backgroundColor: '#F96E88'
  },
  blue: {
    backgroundColor: '#58BBC9'
  },
  orange: {
    backgroundColor: '#FFA141'
  },
  green: {
    backgroundColor: '#00C183'
  },
  tileText: {
    fontSize: (winWidth / (1.2 * 7)) - 4,
    fontWeight: 'bold',
    lineHeight: (winWidth / (1.2 * 7)) - 4,
    marginTop: winWidth / 100,
    textAlign: 'center'
  },
  button: {
    borderWidth: 3,
    fontSize: 40,
    marginTop: 100,
    paddingHorizontal: 20
  }
});

export default WelcomeScreen;
