import React from 'react';
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  View,
  Text,
  StyleSheet,
  Platform
} from 'react-native';

const tileButton = props => {
  const content = (
    <View style={[
      styles.button,
      props.style,
      Platform.OS === 'ios' ? styles.iosShadow : styles.androidShadow
    ]}>
      <Text style={styles.text}>
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
    borderRadius: 4,
    flexDirection: 'row',
    height: 30,
    justifyContent: 'center',
    marginHorizontal: 3,
    marginTop: 10,
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
  }
});

export default tileButton;
