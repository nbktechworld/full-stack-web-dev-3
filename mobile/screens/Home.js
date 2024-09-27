import { Button, View, Text } from 'react-native';

function Home(props) {
  function onImageGalleryPress() {
    props.navigation.navigate('ImageGallery');
  }

  return (
    <View>
      <Text>Welcome Home!</Text>
      <Button title="Image Gallery" onPress={onImageGalleryPress} />
      <Button title="Messages" onPress={() => props.navigation.navigate('Messages')} />
    </View>
  )
}

export default Home;
