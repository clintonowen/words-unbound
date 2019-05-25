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
                  onPress={() => this.props.onResultPress(word.item)}
                >
                  <MainText style={styles.listItemText}>
                    {word.item}
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
