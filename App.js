import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import * as Location from 'expo-location';

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  });

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
//https://docs.expo.io/versions/latest/sdk/location/

  return (
    <View style={{flex: 1}}>
        <StatusBar hidden={true}/>
        <WebView
          source={{ uri: 'https://wesd724.github.io/kbMap/map.html' }}
          style={{ flex: 1 }}
        />
      </View>
  );
}
