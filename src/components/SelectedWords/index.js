import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { makeId } from '../../utils/utils';

const selectedWords = props => {
  let selected = props.selectedWords.map((wordArray, wordIndex) => {
    let found = true;
    let remove = null;
    let lastWord = false;

    const letters = wordArray.map((letter, letterIndex) => {
      if (letter.color !== 'Green') {
        found = false;
      }
      return (
        <View
          style={[
            styles.letterTile,
            styles[letter.color.toLowerCase()],
            Platform.OS === 'android' ? styles.androidShadow : styles.iosShadow
          ]}
          key={makeId()}
        >
          <Text style={styles.text}>
            {letter.letter.toUpperCase()}
          </Text>
        </View>
      );
    });

    if (found) {
      props.onWordFound();
    }

    if (wordIndex === props.selectedWords.length - 1) {
      lastWord = true;
      remove = (
        <TouchableOpacity onPress={props.onRemoveSelected}>
          <View style={styles.removeButton}>
            <Icon
              name={Platform.OS === 'android'
                ? 'md-remove-circle'
                : 'ios-remove-circle'}
              size={30}
              color='red'
            />
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <View
        style={[
          styles.selectedContainer,
          !lastWord ? styles.notLast : null
        ]}
        key={makeId()}
      >
        <View style={styles.lettersContainer}>
          {letters}
        </View>
        {remove}
      </View>
    );
  });

  return (
    <View style={styles.container}>
      {selected}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 10,
    width: '100%'
  },
  selectedContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: -3,
    width: '100%'
  },
  notLast: {
    marginRight: 33
  },
  lettersContainer: {
    backgroundColor: '#1F5760',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 1
  },
  letterTile: {
    borderRadius: 4,
    flexDirection: 'row',
    height: 30,
    justifyContent: 'center',
    marginHorizontal: 3,
    marginVertical: 4,
    padding: 0,
    width: 30
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
  text: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    lineHeight: 30,
    marginTop: 2.5,
    textAlign: 'center'
  },
  removeButton: {
    marginLeft: 8
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

export default selectedWords;
