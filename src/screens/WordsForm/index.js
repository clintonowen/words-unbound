import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import MainText from '../../components/UI/MainText';
import NavButton from '../../components/UI/NavButton';

import { Navigation } from 'react-native-navigation';
import { RESULTS_SCREEN } from '../../navigation/Screens';

export class WordsFormScreen extends Component {
  constructor (props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGoBack = this.handleGoBack.bind(this);
  }

  handleSubmit () {
    Navigation.push(this.props.componentId, {
      component: {
        name: RESULTS_SCREEN,
        options: {
          topBar: {
            visible: false,
            drawBehind: true
          }
        }
      }
    });
  }

  handleGoBack () {
    Navigation.pop(this.props.componentId);
  }

  render () {
    return (
      <View style={styles.container}>
        <NavButton
          color='#F96E88'
          onPress={this.handleGoBack}
        >
          Back
        </NavButton>
        <MainText>Words Form</MainText>
        <NavButton
          color='#00C183'
          onPress={this.handleSubmit}
        >
          Submit
        </NavButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
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
  }
});

export default WordsFormScreen;
