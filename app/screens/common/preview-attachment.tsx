import React, { useState, useEffect, useRef, useContext } from 'react';
import * as FileSystem from 'expo-file-system';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
} from 'react-native';

import { Provider, Menu } from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Loader from 'app/components/elements/Loader';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

// import { GlobalContext } from '../app/GlobalProvider';
// import RNFetchBlob from 'rn-fetch-blob';
import PreviewAudio from 'app/components/media/preview-audio';
import PreviewVideo from 'app/components/media/preview-video';
import { ContactHelper } from 'app/helpers';
import { Axios } from 'app/api/axios';
import { useSelector } from 'react-redux';
import { userId } from 'app/redux/user/reducer';
import { ShowAlert } from 'app/providers/toast';

function PreviewAttachment({ navigation, route }: any) {
  const attachment = route.params;

  //const { appToken, myId, showToast, AXIOS } = useContext(GlobalContext);

  const myId = useSelector(userId);

  const [loading, setLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [contacts, setContacts] = useState<any>(null)
  

  // console.log(attachment.attachment, 'trpo');

  const openMenu = () => setShowMenu(true);
  const closeMenu = () => setShowMenu(false);

  async function saveContact(contact: any) {
    await ContactHelper.saveContacts(contact);
  }

  async function deleteAttachment() {
    let URL = '';

    if (attachment.groupId) {
      URL = '/group/delete-message/' + attachment._id;
    } else if (attachment.chatId) {
      URL = '/chats/delete-message/' + attachment._id;
    }

    setLoading(true);

    await Axios({
      method: 'delete',
      url: URL,
    })
      .then((response) => {
        ShowAlert({
          type: 'info',
          className: 'Success',
          message: response.data.message,
        });

        navigation.goBack();
      })
      .finally(() => {
        setLoading(false);
      });
  }

  async function downloadAttachment() {
    closeMenu();
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        );
        
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          alert('Permissions not granted to access Storage');
          return;
        }
      } catch (error) {
        console.error(error);
        return;
      }
    }
  
    const FILE_URL = attachment.attachment;
    console.log(attachment)
  
    const callback = downloadProgress => {
      const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
      // Update your download progress state here if needed
    };
    const getFileExtention = (fileUrl: string) => {
      // To get the file extension
      return /[.]/.exec(fileUrl) ? /[^.]+$/.exec(fileUrl) : undefined;
    };
    let file_ext: any = getFileExtention(FILE_URL);

    file_ext = '.' + file_ext[0];

    const downloadPath = FileSystem.documentDirectory + 'PennyTots_' + Date.now() + file_ext;
  
    // const downloadResumable = FileSystem.createDownloadResumable(
    //   FILE_URL,
    //   downloadPath,
    //   {},
    //   callback
    // );
    // console.log("This is here")
    const fileUri = 'URL_OF_YOUR_FILE';
    const fileExtension = fileUri.split('.').pop(); // Get the file extension
    const localUri = `${FileSystem.documentDirectory}downloaded_file.${fileExtension}`;

    const options = {
      fromUrl: FILE_URL,
      toFile: downloadPath,
    };
  

    try {
      const response = await FileSystem.downloadAsync(FILE_URL, downloadPath);
      console.log('Download response:', response);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
    try {
      const { uri:any } = await downloadResumable.downloadAsync();

      ShowAlert({
        type: 'info',
        className: 'Success',
        message: 'File Downloaded Successfully',
      });
      console.log(uri)
      // Handle the downloaded file URI (uri) here
    } catch (error) {
      console.error(error);
    }
  }
  
  useEffect(() => {
    if (attachment && attachment.attachment && attachment.type === 'contact') {
      setContacts(JSON.parse(attachment.attachment));
    }
  }, [attachment]);


  return (
    <Provider>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: 'black',
        }}
      >
        <Loader loading={loading} />
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
              <Ionicons name='arrow-back' size={20} color='gold' />
            </TouchableOpacity>

            {attachment.type != 'contact' ? (
              <Menu
                visible={showMenu}
                onDismiss={closeMenu}
                anchor={
                  <TouchableOpacity onPress={openMenu}>
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
                {attachment.senderId && attachment.senderId._id == myId ? (
                  <Menu.Item onPress={deleteAttachment} title='Delete' />
                ) : null}

                <Menu.Item onPress={downloadAttachment} title='Download' />
              </Menu>
            ) : (
              <View
                style={{
                  flex: 1,
                  marginTop: -5,
                  marginLeft: 30,
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{
                    color: 'gold',
                    fontSize: 23,
                    fontWeight: 'bold',
                  }}
                >
                  Contact
                </Text>
              </View>
            )}
          </View>
        </View>
        {attachment.type == ('image' || 'camera') ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}
          >
            <Image
              source={{
                uri: attachment.attachment,
              }}
              style={{
                width: wp('100%'),
                height: hp('50%'),
              }}
              resizeMode="cover"
            />
          </View>
        ) 
        : attachment.type == 'video' ? (
          <View
            style={{
              height: '85%',
            }}
          >
            <PreviewVideo videoLink={attachment.attachment} />
          </View>
        ) 
        : attachment.type == 'audio' ? (
          <PreviewAudio navigation={navigation} audioLink={attachment.attachment} />
        ) 
        : attachment.type == 'contact' ? (
          <View style={{ flex: 1 }}>
          {contacts ? (
            <View style={{ flex: 1, marginTop: -40, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <FontAwesome name='address-book' size={100} style={{ marginRight: 5 }} color='grey' />
              <Text
  style={{
    paddingTop: 20,
    fontSize: 30,
    color: 'grey',
    fontWeight: 'bold',
  }}
>
  {contacts && contacts.displayName ? contacts.displayName : 'Unknown Contact'}
</Text>
              {contacts.phoneNumbers.map((item, index) => (
                <View key={index}>
                  <Text style={{ fontSize: 20, color: 'grey' }}>{item.number}</Text>
                </View>
              ))}
              <View style={{ marginTop: 14 }}>
                <TouchableOpacity onPress={() => saveContact(contacts)} style={{ backgroundColor: 'gold', padding: 18, paddingHorizontal: 25, borderRadius: 10 }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Save Contact</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}
        </View>
        
        ) 
        : attachment.type == 'document' ? (
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Ionicons
              name='document'
              size={80}
              style={{ marginRight: 5 }}
              color='grey'
            />

            <Text
              style={{
                paddingTop: 20,
                fontSize: 30,
                color: 'grey',
                fontWeight: 'bold',
              }}
            >
              Download to view
            </Text>
          </View>
        ) : null}
      </SafeAreaView>
    </Provider>
  );
}

export default PreviewAttachment;
