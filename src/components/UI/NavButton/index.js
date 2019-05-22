import React from 'react';
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  View,
  Text,
  StyleSheet,
  Platform
} from 'react-native';

const navButton = props => {
  const content = (
    <View style={[
      styles.button,
      props.style,
      { backgroundColor: props.color },
      Platform.OS === 'ios' ? styles.iosShadow : styles.androidShadow,
      props.disabled ? styles.disabledButton : null
    ]}>
      <Text style={[
        styles.text,
        props.style && props.style.fontSize
          ? { fontSize: props.style.fontSize }
          : null,
        props.disabled ? styles.disabledText : null
      ]}>
        {props.children}
      </Text>
    </View>
  );

  if (props.disabled) {
    return content;
  } else if (Platform.OS === 'android') {
    return (
      <TouchableNativeFeedback onPress={props.onPress}>
        {content}
      </TouchableNativeFeedback>
    );
  } else {
    // Platform.OS === 'ios'
    return (
      <TouchableOpacity onPress={props.onPress}>
        {content}
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  button: {
    borderColor: 'white',
    borderRadius: 30,
    borderStyle: 'solid',
    borderWidth: 2,
    paddingHorizontal: 10,
    margin: 8
  },
  disabledButton: {
    backgroundColor: '#AAA',
    borderColor: '#AAA',
    elevation: 0,
    shadowOpacity: 0
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
    fontWeight: 'bold'
  },
  disabledText: {
    color: '#CCC'
  }
});

export default navButton;
