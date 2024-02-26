import React, { useState, FunctionComponent } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { Camera } from 'expo-camera'; // Assuming you're using this library
import Ionicons from '@expo/vector-icons/Ionicons';

type CameraScreenProps = {
  navigation: any;
};

const CameraScreen: FunctionComponent<CameraScreenProps> = ({ navigation }) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState<any>(null);
  const [cameraType, setCameraType] = React.useState('back');
  const [flashMode, setFlashMode] = React.useState('off');

  let camera: Camera;

  const __takePicture = async () => {
    if (!camera) return
    const photo = await camera.takePictureAsync()
    setPreviewVisible(true);
    setCapturedImage(photo);

    navigation.navigate('preview-camera', { capturedImage: photo });
  };
  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        ref={(r: any) => {
          camera = r;
        }}
        // Other camera configurations
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ position: 'absolute', top: 40, left: 20 }}
        >
          <SafeAreaView>
            <Ionicons name='chevron-back' size={44} color='black' />
          </SafeAreaView>
        </TouchableOpacity>

        <View
          style={{
            position: 'absolute',
            bottom: 0,
            flexDirection: 'row',
            flex: 1,
            width: '100%',
            padding: 20,
            justifyContent: 'space-between',
          }}
        >
          <View
            style={{
              alignSelf: 'center',
              flex: 1,
              alignItems: 'center',
            }}
          >
            <TouchableOpacity
              onPress={()=>__takePicture()}
              style={{
                width: 70,
                height: 70,
                bottom: 0,
                borderRadius: 50,
                backgroundColor: '#fff',
              }}
            />
          </View>
        </View>
      </Camera>
    </View>
  );
};

export default CameraScreen;
