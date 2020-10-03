import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import UploadImage from './src/components/UploadImage'

export default function App() {
  return (
    <View style={styles.container}>
      <UploadImage
          payloadKey='file' // Field name
          endpoint='http://jpc.asia/api/images' // url is fake replace with your own

      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
