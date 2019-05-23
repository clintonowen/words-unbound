import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  FlatList,
  TouchableOpacity,
  Platform,
  StyleSheet
} from 'react-native';
import MainText from '../../components/UI/MainText';
import NavButton from '../../components/UI/NavButton';
import TileButton from '../../components/UI/TileButton';
import { Navigation } from 'react-native-navigation';
import { fetchWords, clearWords } from '../../store/actions';
import { makeId } from '../../utils/utils';

export class ResultsScreen extends Component {
  constructor (props) {
    super(props);
    this.state = {
      editingWord: null,
      selectedWords: [],
      startingIndex: 0
    };

    this.onNavBack = this.onNavBack.bind(this);
    this.onRestart = this.onRestart.bind(this);
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

  render () {
    let results;
    let count;
    let editing;

    if (this.props.loading) {
      results = (
        <MainText>
          Loading words...
        </MainText>
      );
    } else if (this.state.editingWord) {
      results = (
        <React.Fragment>
          <MainText>
            1. Click the letters in the word above to set their color.
          </MainText>
          <MainText>
            2. Click the plus sign to add the word to your list of guesses.
          </MainText>
        </React.Fragment>
      );
    } else if (this.props.words && this.props.words.length > 0) {
      results = (
        <FlatList
          style={styles.flatListContainer}
          contentContainerStyle={styles.listContainer}
          data={this.props.words}
          keyExtractor={() => makeId()}
          renderItem={word => {
            return (
              <TouchableOpacity
                style={[
                  styles.listItem,
                  Platform.OS === 'ios'
                    ? styles.iosShadow
                    : styles.androidShadow
                ]}
                onPress={() => this.handleSelectEditing(word.item)}
              >
                <MainText style={styles.listItemText}>
                  {word.item}
                </MainText>
              </TouchableOpacity>
            );
          }}
        />
      );

      const plural = this.props.words.length !== 1 ? 's' : null;
      count = (
        <React.Fragment>
          <MainText style={styles.text}>
            <MainText style={{ color: '#FFA141' }}>
              {this.props.words.length}
            </MainText>
            <MainText>
              &nbsp;possible solution{plural}
            </MainText>
          </MainText>
          <MainText style={styles.text}>
            Select a word:
          </MainText>
          <MainText style={styles.subText}>
            Note: Results are sorted by the number of unique letters in each word, so words near the top are better for narrowing down the solution.
          </MainText>
        </React.Fragment>
      );
    } else {
      results = (
        <MainText>
          Uh oh! No words found!
        </MainText>
      );
    }

    if (this.state.editingWord) {
      const editingButtons = this.state.editingWord.map((letter, letterIndex) => {
        return (
          <TileButton
            key={makeId()}
            onPress={() => this.handleCycleColor(letter.color, letterIndex)}
            style={[
              styles.editingLetter,
              styles[letter.color.toLowerCase()]
            ]}
          >
            {letter.letter.toUpperCase()}
          </TileButton>
        );
      });

      editing = (
        <View style={styles.editingContainer}>
          {editingButtons}
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <NavButton
          color='#F96E88'
          onPress={this.onNavBack}
        >
          Back
        </NavButton>
        {editing}
        {count}
        {results}
        <NavButton
          color='#00C183'
          onPress={this.onRestart}
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
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: Platform.OS === 'ios' ? 20 : 0
  },
  flatListContainer: {
    width: '100%'
  },
  listContainer: {
    alignItems: 'center',
    backgroundColor: '#5F5B71',
    padding: 8,
    width: '100%'
  },
  listItem: {
    backgroundColor: '#58BBC9',
    borderColor: 'white',
    borderRadius: 4,
    borderStyle: 'solid',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 8,
    width: '75%'
  },
  listItemText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  editingContainer: {
    flexDirection: 'row'
  },
  editingLetter: {
    // flex: 1
  },
  text: {
    fontSize: 24,
    marginBottom: 2
  },
  subText: {
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 8
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

const mapStateToProps = state => {
  return {
    loading: state.words.loading,
    query: state.words.query,
    words: state.words.words
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchWords: (query) => dispatch(fetchWords(query)),
    onClearWords: () => dispatch(clearWords())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultsScreen);
