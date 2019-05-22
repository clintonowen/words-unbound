import loadLocalResource from 'react-native-local-resource';
import dict3 from '../assets/dictionaries/3-letter.txt';
import dict4 from '../assets/dictionaries/4-letter.txt';
import dict5 from '../assets/dictionaries/5-letter.txt';
import dict6 from '../assets/dictionaries/6-letter.txt';
import dict7 from '../assets/dictionaries/7-letter.txt';

export const makeId = () => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < 24; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export const loadDictionary = (wordLength) => {
  let dictResource;

  switch (wordLength) {
    case 3:
      dictResource = dict3;
      break;
    case 4:
      dictResource = dict4;
      break;
    case 5:
      dictResource = dict5;
      break;
    case 6:
      dictResource = dict6;
      break;
    case 7:
      dictResource = dict7;
      break;
    default:
      break;
  }

  return new Promise((resolve, reject) => {
    loadLocalResource(dictResource)
      .then((text) => {
        let dictionary = [];
        text.toString().split('\n').forEach(word => {
          dictionary.push(word);
        });
        resolve(dictionary);
      })
      .catch(err => reject(err));
  });
};

export const hasOnlyPossLetters = (word, letters) => {
  for (let i = 0; i < word.length; i++) {
    if (!letters.includes(word[i])) {
      return false;
    }
  }
  return true;
};

export const includesLetters = (word, letters) => {
  if (letters.length === 0) {
    return true;
  }
  for (let i = 0; i < letters.length; i++) {
    let index = word.indexOf(letters[i]);
    if (index === -1) {
      return false;
    } else {
      word = word.slice(0, index) + word.slice(index + 1);
    }
  }
  return true;
};

export const hasLettersInPosition = (word, letters) => {
  if (letters.length === 0) {
    return true;
  }
  for (let i = 0; i < letters.length; i++) {
    if (letters[i] !== '*' && word[i] !== letters[i]) {
      return false;
    }
  }
  return true;
};

export const hasNoWrongLetters = (word, letters) => {
  if (letters.length === 0) {
    return true;
  }
  let result = true;
  letters.forEach(letterSet => {
    for (let i = 0; i < letterSet.length; i++) {
      if (letterSet[i] !== '*' && word[i] === letterSet[i]) {
        result = false;
      }
    }
  });
  return result;
};

export const rankWords = (words) => {
  let wordRanks = [];
  let sortedWords = [];
  words.forEach(word => {
    let letterCount = {};
    for (let i = 0; i < word.length; i++) {
      if (letterCount[word[i]]) {
        letterCount[word[i]]++;
      } else {
        letterCount[word[i]] = 1;
      }
    }
    let rank = 1;
    Object.values(letterCount).forEach(count => {
      rank *= count;
    });
    wordRanks.push({ 'word': word, 'rank': rank });
  });
  wordRanks.sort((a, b) => a['rank'] - b['rank']);
  wordRanks.forEach(rankedWord => {
    sortedWords.push(rankedWord['word']);
  });
  return sortedWords;
};
