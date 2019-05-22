import React, { Component } from 'react';
import { View, TextInput, Dimensions, StyleSheet } from 'react-native';
import MainText from '../../components/UI/MainText';
import NavButton from '../../components/UI/NavButton';
import TileButton from '../../components/UI/TileButton';

import { makeId } from '../../utils/utils';

import { Navigation } from 'react-native-navigation';
import { RESULTS_SCREEN } from '../../navigation/Screens';

export class WordsFormScreen extends Component {
  constructor (props) {
    super(props);
    this.onNavBack = this.onNavBack.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleLengthClick = this.handleLengthClick.bind(this);
    this.handleChangeText = this.handleChangeText.bind(this);
  }

  onNavBack () {
    Navigation.pop(this.props.componentId);
  }

  onSubmit () {
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

  handleLengthClick (wordLength) {
    // this.props.dispatch(setWordLength(wordLength));
  }

  handleChangeText (possLetters) {
    // this.props.dispatch(setPossLetters(possLetters));
  }

  render () {
    let numbers = [];

    for (let i = 3; i <= 7; i++) {
      const id = makeId();
      const color = i === this.props.wordLength ? 'Orange' : 'Blue';

      numbers.push((
        <TileButton
          key={id}
          style={styles[color.toLowerCase()]}
          onPress={() => this.handleLengthClick(i)}
        >
          {i}
        </TileButton>
      ));
    }

    return (
      <View style={styles.container}>
        <NavButton
          style={styles.backButton}
          color='#F96E88'
          onPress={this.onNavBack}
        >
          Back
        </NavButton>
        <MainText style={styles.text}>
          Select word length:
        </MainText>
        <View style={styles.numbersContainer}>
          {numbers}
        </View>
        <MainText style={styles.text}>
          Enter available letters:
        </MainText>
        <TextInput
          style={styles.input}
          placeholder='Available Letters'
          onChangeText={this.handleChangeText}
          value={this.state.possLetters}
          underlineColorAndroid='transparent'
        />
        <NavButton
          style={styles.submitButton}
          color='#00C183'
          onPress={this.onSubmit}
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
  text: {
    fontSize: 20,
    marginTop: 20
  },
  numbersContainer: {
    flexDirection: 'row'
  },
  input: {
    backgroundColor: 'white',
    padding: 5,
    marginVertical: 8,
    width: Dimensions.get('window').width - 40
  },
  blue: {
    backgroundColor: '#58BBC9'
  },
  orange: {
    backgroundColor: '#FFA141'
  },
  backButton: {

  },
  submitButton: {
    marginTop: 20
  }
});

export default WordsFormScreen;
