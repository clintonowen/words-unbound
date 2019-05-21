import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import MainText from '../../components/UI/MainText';
import NavButton from '../../components/UI/NavButton';
import { Navigation } from 'react-native-navigation';

export class ResultsScreen extends Component {
  constructor (props) {
    super(props);
    this.handleGoBack = this.handleGoBack.bind(this);
    this.handleRestart = this.handleRestart.bind(this);
  }

  handleGoBack () {
    Navigation.pop(this.props.componentId);
  }

  handleRestart () {
    Navigation.popToRoot(this.props.componentId);
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
        <MainText>Results</MainText>
        <NavButton
          color='#00C183'
          onPress={this.handleRestart}
        >
          Start Over
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

export default ResultsScreen;
