import { Camera, CameraType } from 'expo-camera';
// import * as ImagePicker from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';

// import RNFetchBlob from 'rn-fetch-blob';
import {
  IMAGE_SIZE_LIMIT,
  VIDEO_DURATION_LIMIT,
  VIDEO_SIZE_LIMIT,
} from '../Data/constants';
import { FileHelper } from '.';
// import { Video as VideoCompressor } from 'react-native-compressor';
// import { ProcessingManager } from 'react-native-video-processing';
import { ShowAlert } from 'app/providers/toast';

export const CameraHelper = {
  openCamera: async function () {
    try {
      const permission = await Camera.requestCameraPermissionsAsync();
      if (!permission.granted) {
        alert('Permissions not granted to access camera');
        return null;
      }

      const options = {
        quality: 0.8, // 80% quality
        allowsEditing: true, // Enable this if you want to allow users to edit the captured image
      };
      console.log(Camera)
      await Camera.takePictureAsync(options).then((item)=>{console.log(item)}).catch(err=>{console.log("an error occured")});
      console.log("i have happened")
      // if (result.cancelled) {
      //   console.log('User cancelled image picker');
      //   return null;
      // } else if (result.error) {
      //   console.log('Camera Error: ', result.error);
      //   return null;
      // } else {
      //   const data = {
      //     name: result.uri.split('/').pop(),
      //     type: 'image/jpeg', // Change this as needed based on the result's type
      //     uri: result.uri,
      //   };
      //   return data;
      // }
    } catch (error) {
      console.log('Error:', error);
      return null;
    }
  },
  selectVideoFromGallery: async function(setProcessingFile) {
    setProcessingFile(true)
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        alert('Permissions not granted to access media library');
        return null;
      }
  
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: false,
        quality: 1,
      });

      if (result.canceled) {
        console.log('User cancelled video picker');
        setProcessingFile(false)
        return null;
      }
      if (result.assets[0].fileSize > VIDEO_SIZE_LIMIT){
        alert('Video size exceeds the limit.');
        setProcessingFile(false)
         return null;
      }


        
      
      // const videoInfo = await ImagePicker.getFileInfoAsync(result.uri, {
      //   size: true,
      // });
      
      // if (videoInfo.size > VIDEO_SIZE_LIMIT) {
      //   alert('Video size exceeds the limit.');
      //   return null;
      // }
  
      // const videoDuration = await getDurationAsync(result.uri);
  
      if (result.assets[0].duration / 1000 > VIDEO_DURATION_LIMIT) {
        setProcessingFile(false)
        console.log(result.assets[0].duration)
        alert('Video duration exceeds the limit.');
        return null;
      }
      setProcessingFile(false)
      const data = {
        name: result.assets[0].uri.split('/').pop(),
        type: 'video', // Change this as needed based on the result's type
        uri: result.assets[0].uri,
      };
      return data;
    } catch (error) {
      console.log('Error:', error);
      setProcessingFile(false)
      return null;
      
    }
  },
  selectImageFromGallery: async function () {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        alert('Permissions not granted to access media library');
        return null;
      }
  
      const options = {
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8, // 80% quality
        maxFileSize: 1000 * 1024,
      };
  
      const result = await ImagePicker.launchImageLibraryAsync(options);
      console.log(result.assets[0].uri)
      if (result.canceled) {
        console.log('User cancelled image picker');
        return null;
      } else if (result.error) {
        console.log('ImagePicker Error: ', result.error);
        return null;
      } else {
        const data = {
          name: result.assets[0].uri.split('/').pop(),
          type: 'image/jpeg', // Change this as needed based on the result's type
          uri: result.assets[0].uri,
        };
        return data;
      }
    } catch (error) {
      console.log('Error:', error);
      return null;
    }
  }
}
