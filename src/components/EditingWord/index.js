import React from 'react';
import {
  View,
  TouchableOpacity,
  Platform,
  StyleSheet
} from 'react-native';
import MainText from '../../components/UI/MainText';
import TileButton from '../../components/UI/TileButton';
import { makeId } from '../../utils/utils';
import Icon from 'react-native-vector-icons/Ionicons';

const editingWord = props => {
  let found = true;
  const editingLetters = props.editingWord.map((letter, index) => {
    if (letter.color !== 'Green') {
      found = false;
    }
    return (
      <TileButton
        key={makeId()}
        onPress={() => props.onCycleColor(letter.color, index)}
        style={[
          styles.editingLetter,
          styles[letter.color.toLowerCase()]
        ]}
      >
        {letter.letter.toUpperCase()}
      </TileButton>
    );
  });

  return (
    <React.Fragment>
      <View style={styles.editingContainer}>
        <View style={styles.editingLetterContainer}>
          {editingLetters}
        </View>
        <View style={styles.editingButtons}>
          <TouchableOpacity onPress={() => props.onAddEdit(found)}>
            <View>
              <Icon
                name={Platform.OS === 'android'
                  ? 'md-add-circle'
                  : 'ios-add-circle'}
                size={30}
                color='#00C183'
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={props.onRemoveEdit}>
            <View>
              <Icon
                name={Platform.OS === 'android'
                  ? 'md-remove-circle'
                  : 'ios-remove-circle'}
                size={30}
                color='red'
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.editingInstructions}>
        <MainText style={[
          styles.subText,
          styles.leftText
        ]}>
          1. Enter the word into your game and note the color of each letter.
        </MainText>
        <MainText style={[
          styles.subText,
          styles.leftText
        ]}>
          2. Click the letters in the word above to set their color.
        </MainText>
        <MainText style={[
          styles.subText,
          styles.leftText
        ]}>
          3. Click the plus sign to add the word to your list of guesses.
        </MainText>
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  editingContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
    width: '100%'
  },
  editingLetterContainer: {
    backgroundColor: '#1F5760',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 1
  },
  editingLetter: {
    marginTop: 4,
    marginBottom: 4
  },
  editingButtons: {
    marginLeft: 6
  },
  editingInstructions: {
    width: '100%'
  },
  subText: {
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 4
  },
  leftText: {
    textAlign: 'left'
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

export default editingWord;
