import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet ,SafeAreaView} from 'react-native';


const PreviewScreen = ({ route, navigation }) => {
  const { capturedImage } = route.params;

  const handleRetake = () => {
    navigation.goBack(); // Go back to the camera screen
  };

  const handleSelect = () => {
    navigation.navigate('Home', { screen: 'PostTopic',params: { selectedImage: capturedImage }})

  };


  return (
    <SafeAreaView style={styles.container}>
      <Image source={{ uri: capturedImage.uri }} style={styles.image} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleRetake}>
          <Text style={styles.buttonText}>Retake</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSelect}>
          <Text style={styles.buttonText}>Select</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black', // Adjust the background color
  },
  image: {
    flex: 1,
    resizeMode: 'contain', // Fit the image within the screen
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  button: {
    backgroundColor: 'white', // Button background color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: 'black', // Button text color
    fontSize: 16,
  },
});

export default PreviewScreen;
