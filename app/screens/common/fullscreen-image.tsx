import { ShowAlert } from 'app/providers/toast';
import React, { useState, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity, PermissionsAndroid,SafeAreaView } from 'react-native';
import { Provider, Menu } from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as FileSystem from 'expo-file-system';

function FullScreenImage({ navigation, route }: any) {
  const [image, setImage] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [loading, setLoading] = useState(false);


  const openMenu = () => setShowMenu(true);
  const closeMenu = () => setShowMenu(false);


  useEffect(() => {
    setImage(route.params.image);
  }, []);

  // useEffect(() => {
  //   function removeImage() {
  //     setImage('');
  //   }
  //   return () => removeImage;
  // }, []);

  const callback = (downloadProgress:any) => {
    const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
    // Update your UI with the download progress if needed
  };

  async function downloadAttachment() {
    closeMenu();
  
    const getFileExtension = (fileUrl: string) => {
      const match = /[.]/.exec(fileUrl);
      if (match) {
        return fileUrl.substring(match.index);
      }
      return null;
    };
    
    const FILE_URL = image;
    const fileExt = getFileExtension(image);
    const RootDir = FileSystem.documentDirectory;
    const subdirectory = 'var'; // Specify the subdirectory name
    const fileUri = `${RootDir}${subdirectory}`;
    console.log(fileUri,fileExt, "Here");
  
    try {
      const downloadOptions = {};
      const downloadResumable = FileSystem.createDownloadResumable(
        FILE_URL,
        fileUri,
        downloadOptions,
        callback
      );
  
      const downloadResult = await downloadResumable.downloadAsync();
      console.log('Finished downloading to ', downloadResult?.uri);
      ShowAlert({
        type: 'info',
        className: 'Success',
        message: 'File Downloaded Successfully',
      });
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Provider>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: 'black',
        }}
      >
        <View
          style={{
            flexDirection: 'column',
          }}
        >
          <View
            style={{

              margin: 13,
              marginTop: 20,
              marginBottom: hp('0.5%'),
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.goBack(null);
              }}
              style={{
                width: 25,
                height: 25,
              }}
            >
              <Ionicons name="arrow-back" size={20} color='gold' />
            </TouchableOpacity>

            <Menu
              visible={showMenu}
              onDismiss={closeMenu}
              anchor={
                <TouchableOpacity
                  onPress={() => {
                    openMenu()
                  }}
                >
                  <Image
                    source={require('app/assets/moredots.png')}
                    style={{
                      width: 4,
                      height: 16,
                      marginTop: 5,
                      marginLeft: 10,
                      marginRight: wp('4%'),
                    }}
                  />
                </TouchableOpacity>
              }
            >

              <Menu.Item onPress={downloadAttachment} title='Download' />
            </Menu>
          </View>
        </View>
        {image != '' ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >

            <Image
              style={{
                width: wp('90%'),
                height: '100%',
                maxHeight: hp('65')
              }}
              source={{
                uri: image,
                headers: { 'Cache-Control': 'max-age=7884000' },
                
              }}
              resizeMode="contain"
            />

          </View>
        ) : null}
      </SafeAreaView>
    </Provider>
  );
}

export default FullScreenImage;
