import React from 'react';
import { Text, StyleSheet } from 'react-native';

const mainText = props => (
  <Text style={[
    styles.mainText,
    props.style
  ]}>{props.children}</Text>
);

const styles = StyleSheet.create({
  mainText: {
    backgroundColor: 'transparent',
    color: 'white'
  }
});

export default mainText;
