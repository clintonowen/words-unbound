import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Dimensions
} from 'react-native';

export class WelcomeScreen extends Component {
  render () {
    return (
      <View style={[
        styles.container,
        Platform.OS === 'ios'
          ? styles.iosContainer
          : null
      ]
      }>
        <Text style={styles.heading}>
          WORDS
        </Text>
        <View style={styles.tileContainer}>
          <View style={[
            styles.tile,
            styles.orange,
            Platform.OS === 'ios'
              ? styles.iosShadow
              : styles.androidShadow
          ]}>
            <Text style={styles.tileText}>U</Text>
          </View>
          <View style={[
            styles.tile,
            styles.green,
            Platform.OS === 'ios'
              ? styles.iosShadow
              : styles.androidShadow
          ]}>
            <Text style={styles.tileText}>N</Text>
          </View>
          <View style={[
            styles.tile,
            styles.pink,
            Platform.OS === 'ios'
              ? styles.iosShadow
              : styles.androidShadow
          ]}>
            <Text style={styles.tileText}>B</Text>
          </View>
          <View style={[
            styles.tile,
            styles.blue,
            Platform.OS === 'ios'
              ? styles.iosShadow
              : styles.androidShadow
          ]}>
            <Text style={styles.tileText}>O</Text>
          </View>
          <View style={[
            styles.tile,
            styles.orange,
            Platform.OS === 'ios'
              ? styles.iosShadow
              : styles.androidShadow
          ]}>
            <Text style={styles.tileText}>U</Text>
          </View>
          <View style={[
            styles.tile,
            styles.green,
            Platform.OS === 'ios'
              ? styles.iosShadow
              : styles.androidShadow
          ]}>
            <Text style={styles.tileText}>N</Text>
          </View>
          <View style={[
            styles.tile,
            styles.pink,
            Platform.OS === 'ios'
              ? styles.iosShadow
              : styles.androidShadow
          ]}>
            <Text style={styles.tileText}>D</Text>
          </View>
        </View>
      </View>
    );
  }
}

const winWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1
  },
  iosContainer: {
    marginTop: 20
  },
  heading: {
    color: 'white',
    fontSize: winWidth / 4.5,
    fontWeight: 'bold',
    lineHeight: winWidth / 4.5,
    margin: 0,
    marginTop: 40,
    textShadowColor: 'rgb(40, 40, 40)',
    textShadowOffset: {
      width: 2,
      height: 2
    },
    textShadowRadius: 2
  },
  tileContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    width: winWidth / 1.2
  },
  tile: {
    borderRadius: 4,
    flex: 1,
    flexDirection: 'row',
    height: (winWidth / (1.2 * 7)) - 4,
    justifyContent: 'center',
    marginHorizontal: 2
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
  },
  tileText: {
    color: 'white',
    fontSize: (winWidth / (1.2 * 7)) - 4,
    fontWeight: 'bold',
    lineHeight: (winWidth / (1.2 * 7)) - 4,
    marginTop: winWidth / 100,
    textAlign: 'center'
  }
});

export default WelcomeScreen;
