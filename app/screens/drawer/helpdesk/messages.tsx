import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  useGetHelpdeskMessages,
  useReplyHelpDeskMessage,
} from '../../../redux/helpdesk/hooks';
import { CustomText } from '../../../components/elements/Text';
import HeaderTitle from 'app/components/HeaderTitle';
import moment from 'moment';
import { userId } from 'app/redux/user/reducer';
import { useSelector } from 'react-redux';
import { userAuthInfo } from '../../../redux/user/reducer';
import { CustomButton } from '../../../components/elements/Button';
import { default as themeFont } from 'app/assets/themes/fonts.json';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';
import SelectImageDialog from 'app/components/dialogs/select-image';
import AttachmentSVG from 'app/assets/svg/attachment.svg';
import ImageIconSVG from 'app/assets/svg/image-icon.svg';
import CloseSVG from 'app/assets/svg/close.svg';
import { timeAgo } from 'app/helpers/time-ago';
import { useTranslation } from 'react-i18next';

const HelpDeskMessagesScreen = ({ navigation, route }: any) => {
  let { helpdeskId, helpdesk } = route.params;

  const { data: helpdeskMessages } = useGetHelpdeskMessages(helpdeskId);
  const { mutateAsync: replyMessage, isLoading } = useReplyHelpDeskMessage();

  const [content, setContent] = useState('');
  const { t } = useTranslation();

  const [showReply, setShowReply] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showSelectImage, setShowSelectImage] = useState(false);

  const myId = useSelector(userId);
  const user = useSelector(userAuthInfo);

  useEffect(() => {
    console.log(helpdeskMessages, '=messages');
  }, [helpdeskMessages]);

  async function submit() {
    let formData = new FormData();

    formData.append('message', content);

    if (selectedImage) {
      formData.append('file', selectedImage);
    }

    let payload = {
      helpdeskId,
      data: formData,
    };

    replyMessage(payload).then(() => {
      setShowReply(false);
      setContent('');
      setSelectedImage(null);
    });
  }

  useEffect(() => {
    console.log(selectedImage, 'select image');
  }, [selectedImage]);

  return (
    <View style={{ backgroundColor: '#ffffff', flex: 1 }}>
      <StatusBar barStyle='dark-content' backgroundColor='white' />
      <HeaderTitle title={t('HelpDesk_')} navigation={navigation} />

      <SelectImageDialog
        show={showSelectImage}
        setShow={setShowSelectImage}
        setImage={setSelectedImage}
      />

      <ScrollView
        contentContainerStyle={{
          flexDirection: 'column',
          justifyContent: 'center',
          paddingHorizontal: wp(10),
        }}
      >
        {helpdesk && helpdeskMessages ? (
          <>
            <CustomText
              style={{
                fontSize: 15,
                marginBottom: 20,
              }}
              textType='bold'
            >
              {helpdesk.title}
            </CustomText>

            {showReply ? (
              <View
                style={{
                  width: '100%',
                  flexDirection: 'column',
                }}
              >
                <TextInput
                  multiline={true}
                  numberOfLines={10}
                  placeholder={t('HelpDesk_messageBox')}
                  placeholderTextColor='grey'
                  value={content!}
                  style={{
                    backgroundColor: '#F5F5F5',
                    height: hp('25%'),
                    textAlignVertical: 'top',
                    fontFamily: themeFont.regular,
                    fontSize: 16,
                    color: '#636363',
                    lineHeight: 20,
                    fontWeight: '800',
                    paddingHorizontal: 10,
                    borderRadius: 10,
                  }}
                  underlineColorAndroid='transparent'
                  onChangeText={(contents) => setContent(contents)}
                  maxLength={200}
                />

                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    alignItems: 'center',
                  }}
                >
                  <CustomButton
                    label={t('HelpDesk_sendBtn')}
                    style={{
                      width: 120,
                      height: 50,
                    }}
                    textSize={14}
                    buttonTheme='secondary'
                    onPress={() => submit()}
                    loading={isLoading}
                  />

                  <TouchableOpacity
                    onPress={() => setShowSelectImage(true)}
                    style={{
                      flexDirection: 'column',
                      margin: 5,
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingTop: 15,
                    }}
                  >
                    <AttachmentSVG width={20} height={20} />

                    <CustomText
                      style={{
                        paddingTop: 4,
                        fontSize: 13,
                        color: '#B5B5B5',
                      }}
                    >
                      Select Image
                    </CustomText>
                  </TouchableOpacity>
                </View>

                {selectedImage ? (
                  <View
                    style={{
                      height: 50,
                      backgroundColor: '#F2F2F2',
                      borderRadius: 6,
                      paddingHorizontal: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginVertical: 0,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      <ImageIconSVG />
                      <CustomText
                        style={{
                          marginLeft: 10,
                        }}
                      >
                        Image-{new Date().getTime()}.png
                      </CustomText>
                    </View>

                    <TouchableOpacity
                      style={{
                        justifyContent: 'flex-end',
                        padding: 5,
                      }}
                      onPress={() => setSelectedImage(null)}
                    >
                      <CloseSVG width={13} height={13} />
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
            ) : null}
            <View style={{ flex: 1, flexDirection: 'column' }}>
              {helpdeskMessages.map((message: any, index: number) => (
                <View
                  style={{
                    flexDirection: 'row',
                    marginVertical: 20,
                  }}
                >
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 40,
                      backgroundColor: 'gold',
                      marginRight: 20,
                    }}
                  ></View>

                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'column',
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}
                    >
                      <CustomText
                        style={{
                          fontSize: 14,
                          color: '#000000',
                          flexWrap: 'nowrap',
                        }}
                        textType='bold'
                      >
                        {message.senderId !== user._id
                          ? 'Pennytots Admin'
                          : `${user.first_name} ${user.last_name}`}
                      </CustomText>

                      <CustomText
                        style={{
                          fontSize: 12,
                          color: '#9D9D9D',
                          flexWrap: 'nowrap',
                        }}
                      >
                        {timeAgo(message.createdAt)}
                      </CustomText>
                    </View>
                    <View>
                      <CustomText
                        style={{
                          fontSize: 14,
                          color: '#000000',
                          // flexWrap: 'nowrap',
                          marginTop: 5,
                        }}
                      >
                        {' '}
                        {message.message}
                      </CustomText>

                      {message.image ? (
                        <TouchableOpacity
                          style={{
                            flex: 1,
                            width: '100%',
                          }}
                          onPress={() =>
                            navigation.push('Common', {
                              screen: 'fullscreen-image',
                              params: {
                                image: message.image,
                              },
                            })
                          }
                        >
                          <FastImage
                            source={{
                              uri: message.image,
                            }}
                            style={{
                              width: '100%',
                              height: hp('30%'),
                              borderRadius: wp('2%'),
                              borderColor: 'white',
                              borderWidth: wp('0.6%'),
                              marginTop: 8,
                            }}
                            resizeMode={FastImage.resizeMode.cover}
                          />
                        </TouchableOpacity>
                      ) : null}

                      {/* Divider */}
                      <View
                        style={{
                          height: 0.8,
                          width: '100%',
                          backgroundColor: 'gray',
                          marginTop: 10,
                          opacity: 0.5,
                        }}
                      ></View>
                    </View>

                    <View></View>
                  </View>
                </View>
              ))}
            </View>
          </>
        ) : null}
      </ScrollView>

      <View style={styles.touchableOpacityStyle}>
        <CustomButton
          label='Show Reply'
          textSize={13}
          style={{
            height: 50,
          }}
          onPress={() => setShowReply(!showReply)}
          // loading={isLoading}
        />
      </View>
    </View>
  );
};

export default HelpDeskMessagesScreen;

const styles = StyleSheet.create({
  floatingbuttonStyle: {
    resizeMode: 'contain',
    width: '125%',
    height: '125%',
  },
  touchableOpacityStyle: {
    position: 'absolute',
    width: 130,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 50,
  },
});
