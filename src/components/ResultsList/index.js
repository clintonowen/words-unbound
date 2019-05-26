import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  FlatList,
  TouchableOpacity,
  Platform,
  StyleSheet
} from 'react-native';
import MainText from '../UI/MainText';
import { makeId } from '../../utils/utils';

export class ResultsList extends Component {
  constructor (props) {
    super(props);
    this.state = {
      wordList: [],
      offset: 0
    };

    this.handleLoadMore = this.handleLoadMore.bind(this);
  }

  componentDidMount () {
    this.handleLoadMore();
  }

  componentDidUpdate (prevProps) {
    if (prevProps.words !== this.props.words) {
      this.handleLoadMore();
    }
  }

  handleResultsPress (word) {
    this.setState({
      wordList: [],
      offset: 0
    });
    this.props.onResultPress(word);
  }

  handleLoadMore () {
    if (this.state.offset + 29 > this.props.words.length) {
      this.setState({
        wordList: [
          ...this.state.wordList,
          ...this.props.words.slice(this.state.offset)
        ]
      });
    } else {
      this.setState({
        wordList: [
          ...this.state.wordList,
          ...this.props.words.slice(this.state.offset, this.state.offset + 29)
        ],
        offset: this.state.offset + 30
      });
    }
  }

  render () {
    let results;

    if (this.props.loading) {
      results = (
        <MainText>
          Loading words...
        </MainText>
      );
    } else if (this.props.words && this.props.words.length > 0) {
      const plural = this.props.words.length > 1 ? 's' : null;
      results = (
        <React.Fragment>
          <MainText style={styles.text}>
            <MainText style={{ color: '#FFA141' }}>
              {this.props.words.length}
            </MainText>
            &nbsp;possible solution{plural}
          </MainText>
          <MainText style={styles.subText}>
            <MainText style={styles.boldText}>
              Note:
            </MainText>
            &nbsp;Results are sorted by the number of unique letters in each word, so words near the top are better for narrowing down the solution.
          </MainText>
          <MainText style={styles.text}>
            Select a word:
          </MainText>
          <FlatList
            style={styles.flatListContainer}
            contentContainerStyle={styles.listContainer}
            data={this.state.wordList}
            keyExtractor={() => makeId()}
            initialNumToRender={15}
            viewabilityConfig={{ waitForInteraction: false }}
            renderItem={word => {
              return (
                <TouchableOpacity
                  style={[
                    styles.listItem,
                    Platform.OS === 'ios'
                      ? styles.iosShadow
                      : styles.androidShadow
                  ]}
                  onPress={() => this.handleResultsPress(word.item)}
                >
                  <MainText style={styles.listItemText}>
                    {word.item}
                  </MainText>
                </TouchableOpacity>
              );
            }}
            ListFooterComponent={() => {
              return (
                <TouchableOpacity
                  style={[
                    styles.listFooter,
                    Platform.OS === 'ios'
                      ? styles.iosShadow
                      : styles.androidShadow
                  ]}
                  onPress={this.handleLoadMore}
                >
                  <MainText style={styles.listItemText}>
                    Load More
                  </MainText>
                </TouchableOpacity>
              );
            }}
          />
        </React.Fragment>
      );
    } else {
      results = (
        <React.Fragment>
          <MainText style={[
            styles.text,
            styles.centeredText
          ]}>
            Uh oh! No words found!
          </MainText>
          <MainText style={[
            styles.text,
            styles.centeredText
          ]}>
            Make sure everything is correct and try again.
          </MainText>
        </React.Fragment>
      );
    }

    return results;
  }
}

const styles = StyleSheet.create({
  flatListContainer: {
    backgroundColor: '#5F5B71',
    width: '100%'
  },
  listContainer: {
    alignItems: 'center',
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
  listFooter: {
    backgroundColor: '#00C183',
    borderColor: 'white',
    borderRadius: 4,
    borderStyle: 'solid',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 8,
    width: '75%'
  },
  text: {
    fontSize: 24,
    marginBottom: 4
  },
  subText: {
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 4
  },
  boldText: {
    fontWeight: 'bold'
  },
  centeredText: {
    marginVertical: 8,
    textAlign: 'center'
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
  }
});

const mapStateToProps = state => {
  return {
    loading: state.words.loading,
    words: state.words.words
  };
};

export default connect(mapStateToProps)(ResultsList);
