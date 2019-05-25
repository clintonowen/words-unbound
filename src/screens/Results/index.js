import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Platform,
  StyleSheet
} from 'react-native';
import ResultsList from '../../components/ResultsList';
import EditingWord from '../../components/EditingWord';
import NavButton from '../../components/UI/NavButton';
import { Navigation } from 'react-native-navigation';
import { fetchWords, clearWords } from '../../store/actions';

export class ResultsScreen extends Component {
  constructor (props) {
    super(props);
    this.state = {
      editingWord: null,
      selectedWords: [],
      foundWord: false
    };

    this.onNavBack = this.onNavBack.bind(this);
    this.onRestart = this.onRestart.bind(this);
    this.handleEditAdd = this.handleEditAdd.bind(this);
    this.handleEditRemove = this.handleEditRemove.bind(this);
  }

  onNavBack () {
    Navigation.pop(this.props.componentId);
  }

  onRestart () {
    Navigation.popToRoot(this.props.componentId);
  }

  handleSelectEditing (word) {
    let wordArray = word.split('').map((letter, index) => {
      let color = 'Blue';
      if (this.state.selectedWords.length > 0) {
        const lastColor = this.state.selectedWords[this.state.selectedWords.length - 1][index].color;
        if (lastColor === 'Green') {
          color = 'Green';
        }
      }
      return {
        letter,
        color
      };
    });
    this.setState({
      editingWord: wordArray
    });
  }

  handleCycleColor (color, index) {
    let newColor;
    switch (color) {
      case 'Blue':
        newColor = 'Orange';
        break;
      case 'Orange':
        newColor = 'Green';
        break;
      default:
        newColor = 'Blue';
    }
    // Set new letter color
    const letter = Object.assign({}, this.state.editingWord[index], {
      color: newColor
    });
    // Reinsert letter into `editingWord`
    const editingWord = (index > 0)
      ? this.state.editingWord.slice(0, index).concat(letter).concat(this.state.editingWord.slice(index + 1))
      : [letter].concat(this.state.editingWord.slice(1));
    // Assign updated `editingWord` to state
    this.setState({
      editingWord
    });
  }

  handleEditAdd () {
    const selectedWords = [...this.state.selectedWords, this.state.editingWord];
    this.setState({
      editingWord: null,
      selectedWords
    });
    // Fetch an updated list of words
    this.props.onFetchWords(this.props.query, selectedWords);
  }

  handleEditRemove () {
    this.setState({
      editingWord: null
    });
  }

  render () {
    let navButton;
    let results;
    let editingContent;

    if (!this.state.foundWord) {
      navButton = (
        <NavButton
          color='#F96E88'
          onPress={this.onNavBack}
        >
          Back
        </NavButton>
      );
    } else {
      navButton = (
        <NavButton
          color='#00C183'
          onPress={this.onRestart}
        >
          Start Over
        </NavButton>
      );
    }

    if (!this.state.editingWord) {
      results = (
        <ResultsList
          onResultPress={(word) => this.handleSelectEditing(word)}
        />
      );
    } else {
      editingContent = (
        <EditingWord
          editingWord={this.state.editingWord}
          onCycleColor={(color, index) => this.handleCycleColor(color, index)}
          onEditAdd={this.handleEditAdd}
          onEditRemove={this.handleEditRemove}
        />
      );
    }

    return (
      <View style={styles.container}>
        {navButton}
        {editingContent}
        {results}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-start',
    marginHorizontal: 20,
    marginBottom: 20,
    marginTop: Platform.OS === 'ios' ? 20 : 0
  }
});

const mapStateToProps = state => {
  return {
    query: state.words.query
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchWords: (query, selectedWords) => dispatch(fetchWords(query, selectedWords)),
    onClearWords: () => dispatch(clearWords())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultsScreen);
