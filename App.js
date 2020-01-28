import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import LoginComponent from './Components/LoginComponent';

export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.backgroundImage} source={require('./assets/animatedBG.gif')}>
        <LoginComponent style={styles.container}></LoginComponent>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex:1,
    width: '100%',
    height: '100%'
  }

});
