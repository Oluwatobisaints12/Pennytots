import React, { useState, useEffect, useContext, useRef } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Loader from 'app/components/elements/Loader';
import PreviewAudio from 'app/components/media/preview-audio';
import PreviewVideo from 'app/components/media/preview-video';
import { CustomText } from 'app/components/elements';
import { default as themeFont } from 'app/assets/themes/fonts.json';
import { Axios } from 'app/api/axios';
import { ShowAlert } from 'app/providers/toast';
import { useCreateComment } from 'app/redux/topic/hooks';
import { useTranslation } from 'react-i18next';

function ShareAttachment({ navigation, route }: any) {
  const { t } = useTranslation();

  const { mutateAsync: createComment, isLoading: isLoadingCreateComment } =
    useCreateComment();

  const sharedData = route.params;

  let contact: any = null;

  if (sharedData && sharedData.attachmentType == 'contact') {
    //  console.log(sharedData.attachment);
    contact = JSON.parse(sharedData.attachment);
  }

  let [loading, setLoading] = useState(false);
  const [caption, setCaption] = useState<any>(null);

  async function uploadAttachment() {
    if (sharedData.chatType == 'group' || sharedData.chatType == 'chat') {
      uploadChatAttachments();
    }

    if (sharedData.chatType == 'topic-comment') {
      uploadTopicCommentAttachments();
    }
  }

  async function uploadChatAttachments() {
    let URL = null;

    if (sharedData.attachmentType == 'image') {
      URL = '/chats/upload-image-attachment/' + sharedData.chatId;
    } else if (sharedData.attachmentType == 'video') {
      URL = '/chats/upload-video-attachment/' + sharedData.chatId;
    } else if (sharedData.attachmentType == 'audio') {
      URL = '/chats/upload-audio-attachment/' + sharedData.chatId;
    } else if (sharedData.attachmentType == 'document') {
      URL = '/chats/upload-document-attachment/' + sharedData.chatId;
    } else if (sharedData.attachmentType == 'contact') {
      URL = '/chats/upload-contact-attachment/' + sharedData.chatId;
    } else {
      return;
    }

    let formData = new FormData();

    if (sharedData.attachmentType == 'contact') {
      formData.append('contact', sharedData.attachment);
    } else {
      formData.append('file', sharedData.attachment);
    }

    formData.append('type', sharedData.chatType);
    if (caption) {
      formData.append('message', caption);
    }
    setLoading(true);

    await Axios({
      method: 'post',
      url: URL,
      data: formData,
    })
      .then((response) => {
        ShowAlert({
          type: 'info',
          className: 'Success',
          message: response.data.message,
        });

        navigation.goBack(null);
      })
      .catch((err) => {
        ShowAlert({
          type: 'error',
          className: 'Oops',
          message: err.message,
        });
        navigation.goBack(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  async function uploadTopicCommentAttachments() {
    if (!sharedData.post) {
      return;
    }

    let formData = new FormData();

    formData.append('file', sharedData.attachment);

    formData.append('attachmentType', sharedData.attachmentType);
    if (caption) {
      formData.append('comment', caption);
    }

    let payload = {
      postId: sharedData.post._id,
      data: formData,
    };

    try {
      const response = await createComment(payload);
      if (response.success) {
        ShowAlert({
          type: 'info',
          className: 'Success',
          message: response.message,
        });

        navigation.goBack(null);
      } else {
        ShowAlert({
          type: 'error',
          className: 'Oops',
          message: response.message,
        });
      }
    } catch (error: any) {
      ShowAlert({
        type: 'error',
        className: 'Oops',
        message: error.response.data.message, // Use the error message from the server response
      });
    }
  }

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: 'black',
      }}
    >
      <Loader loading={loading || isLoadingCreateComment} />
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
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.goBack(null);
            }}
            style={{
              width: 25,
              height: 25,
              justifyContent: 'center',
            }}
          >
            <FontAwesome name='arrow-left' size={20} color='gold' />
          </TouchableOpacity>
          {/* <CustomText
            style={{
              color: 'gold',
              fontSize: 18,
              maxWidth: wp('70%'),
              marginLeft: 10,
              paddingTop: 5,
            }}
            textType='bold'
          >
            {sharedData.name}
          </CustomText>
          <View></View> */}
        </View>
      </View>

      <View
        style={{
          flex: 1,
          paddingHorizontal: wp('10%'),
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: hp('10'),
        }}
      >
        {sharedData.attachmentType == 'image' ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}
          >
            <Image
              source={sharedData.attachment}
              resizeMode={'cover'}
              style={{
                width: wp('80%'),
                height: hp('50%'),
              }}
            />
          </View>
        ) : sharedData.attachmentType == 'video' ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: '80%',
              width: '100%',
              backgroundColor: 'white',
            }}
          >
            <PreviewVideo videoLink={sharedData.attachment.uri} />
          </View>
        ) : sharedData.attachmentType == 'audio' ? (
          <View
            style={{
              height: '50%',
              width: '100%',
            }}
          >
            <PreviewAudio audioLink={sharedData.attachment.path} />
          </View>
        ) : sharedData.attachmentType == 'contact' ? (
          <View>
            {contact ? (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <FontAwesome
                  name='address-card'
                  size={100}
                  style={{ marginRight: 5 }}
                  color='grey'
                />

                <CustomText
                  style={{
                    paddingTop: 20,
                    fontSize: 20,
                    color: 'grey',
                  }}
                  textType='bold'
                >
                  {contact.displayName}
                </CustomText>
                {contact.phoneNumbers.map((item: any) => (
                  <View>
                    <CustomText
                      style={{
                        fontSize: 20,
                        color: 'grey',
                      }}
                    >
                      {item.number}
                    </CustomText>
                  </View>
                ))}
              </View>
            ) : null}
          </View>
        ) : sharedData.attachmentType == 'document' ? (
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FontAwesome
              name='paperclip'
              size={100}
              style={{ marginRight: 5 }}
              color='grey'
            />

            <CustomText
              style={{
                paddingTop: 20,
                fontSize: 20,
                color: 'grey',
              }}
              textType='bold'
            >
              Document Attached
            </CustomText>
          </View>
        ) : null}

        <View
          style={{
            marginTop: hp('8'),
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <TextInput
            style={{
              width: '80%',
              height: 'auto',
              color: 'white',
              fontFamily: 'regular',
            }}
            multiline={true}
            placeholderTextColor='grey'
            placeholder={t('profile_message')}
            onChangeText={(text) => setCaption(text)}
            value={caption}
          />

          <TouchableOpacity
            onPress={uploadAttachment}
            style={{
              width: '20%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
              source={require('app/assets/floating.png')}
              style={{ width: 50, height: 50, marginLeft: 10 }}
              resizeMethod='resize'
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export default ShareAttachment;
