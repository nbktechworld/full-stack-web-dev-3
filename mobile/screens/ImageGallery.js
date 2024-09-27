import { StatusBar } from 'expo-status-bar';
import { Button, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Constants from 'expo-constants';

export default function ImageGallery() {
  const [showMessage, setShowMessage] = useState(false);
  const [images, setImages] = useState([]);

  function retrieveData() {
    fetch('https://picsum.photos/v2/list').then(function(response) {
      // check if response is ok.... I leave that as TODO

      return response.json();
    }).then(function(imageList) {
      setImages(imageList);
    })
  }

  React.useEffect(function() {
    retrieveData();
  }, []);

  function onButtonPress() {
    setShowMessage(true);
  }

  return (
    <ScrollView>
      <View style={{ paddingTop: Constants.statusBarHeight }}>
        <Text style={{ color: 'red' }}>Hello World</Text>
        <StatusBar style="auto" />
        <Button title="Retrieve Images" onPress={function() { retrieveData() }} />
        <Button title="Click me" onPress={onButtonPress} />
        {showMessage && <Text>Hidden Message!!!</Text>}
        {images.map(function(image) {
          return (
            <View style={{ marginBottom: 16 }} key={image.id}>
              <Image source={{ uri: image.download_url }} style={{ width: 200, height: 200, marginBottom: 8 }} />
              <Text style={{ fontSize: 16 }}>{image.author}</Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  )
}
