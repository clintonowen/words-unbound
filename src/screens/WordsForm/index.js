import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  TextInput,
  ActivityIndicator,
  Dimensions,
  StyleSheet
} from 'react-native';
import MainText from '../../components/UI/MainText';
import NavButton from '../../components/UI/NavButton';
import TileButton from '../../components/UI/TileButton';

import {
  setWordLength,
  setPossLetters,
  fetchWords,
  clearWords
} from '../../store/actions';
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

  componentDidUpdate (prevProps) {
    if (prevProps.loading && !this.props.loading) {
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
  }

  onNavBack () {
    Navigation.pop(this.props.componentId);
    this.props.onClearWords();
  }

  onSubmit () {
    const { wordLength, possLetters } = this.props;
    this.props.onFetchWords({ wordLength, possLetters });
  }

  handleLengthClick (wordLength) {
    this.props.onSetWordLength(wordLength);
  }

  handleChangeText (possLetters) {
    this.props.onSetPossLetters(possLetters);
  }

  render () {
    let numbers = [];
    let submitMessage = (
      <View style={styles.submitMessage} />
    );
    let submitButton = (
      <NavButton
        style={styles.submitButton}
        color='#00C183'
        onPress={this.onSubmit}
        disabled={!this.props.wordLength || !this.props.possLetters}
      >
        Submit
      </NavButton>
    );

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

    if (!this.props.wordLength || !this.props.possLetters) {
      submitMessage = (
        <MainText style={styles.submitMessage}>
          Please select a word length and enter the available letters before clicking submit.
        </MainText>
      );
    }

    if (this.props.loading) {
      submitButton = (<ActivityIndicator />);
    }

    return (
      <View style={styles.container}>
        <MainText style={styles.inputText}>
          Select word length:
        </MainText>
        <View style={styles.numbersContainer}>
          {numbers}
        </View>
        <MainText style={styles.inputText}>
          Enter available letters:
        </MainText>
        <TextInput
          style={styles.input}
          placeholder='Available Letters'
          onChangeText={this.handleChangeText}
          value={this.props.possLetters}
          autoCapitalize='characters'
          underlineColorAndroid='transparent'
        />
        <View style={styles.navContainer}>
          <NavButton
            style={styles.backButton}
            color='#F96E88'
            onPress={this.onNavBack}
          >
            Back
          </NavButton>
          {submitButton}
        </View>
        {submitMessage}
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
  inputText: {
    fontSize: 20,
    marginTop: 20
  },
  numbersContainer: {
    flexDirection: 'row'
  },
  input: {
    backgroundColor: 'white',
    fontSize: 20,
    padding: 8,
    marginVertical: 8,
    width: Dimensions.get('window').width - 40
  },
  blue: {
    backgroundColor: '#58BBC9'
  },
  orange: {
    backgroundColor: '#FFA141'
  },
  navContainer: {
    flexDirection: 'row',
    marginTop: 20
  },
  backButton: {
    marginRight: 20
  },
  submitButton: {
    marginLeft: 20
  },
  submitMessage: {
    color: '#23212B',
    fontStyle: 'italic',
    height: 40,
    marginTop: 10,
    textAlign: 'center',
    width: 300
  }
});

const mapStateToProps = state => {
  return {
    loading: state.words.loading,
    wordLength: state.words.query.wordLength,
    possLetters: state.words.query.possLetters
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetWordLength: (wordLength) => dispatch(setWordLength(wordLength)),
    onSetPossLetters: (possLetters) => dispatch(setPossLetters(possLetters)),
    onFetchWords: (query) => dispatch(fetchWords(query)),
    onClearWords: () => dispatch(clearWords())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WordsFormScreen);
