import React, {
  useState,
  useCallback,
  useEffect,
  useContext,
  useRef,
} from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  BackHandler,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import EmojiPicker from 'rn-emoji-keyboard';
import Clipboard from '@react-native-community/clipboard';

import { CustomText } from 'app/components/elements';

import { default as themeFont } from 'app/assets/themes/fonts.json';
import { useTranslation } from 'react-i18next';

import {
  GiftedChat,
  Bubble,
  Send,
  InputToolbar,
  Time,
  MessageText,
  Composer,
} from 'react-native-gifted-chat';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Button, Menu, Divider, Provider } from 'react-native-paper';
import socketIOClient from 'socket.io-client';
import Loader from 'app/components/elements/Loader';
import { CameraHelper, FileSelectHelper, FileHelper } from 'app/helpers';
import SelectContact from 'app/components/SelectContact';
import SelectAttachment from 'app/components/select-attachment';
import { Axios, MAIN_URL } from 'app/api/axios';
import { useSelector } from 'react-redux';
import { userId, userToken } from 'app/redux/user/reducer';
import { responsiveValue as rv } from 'app/providers/responsive-value';
import MenuSVG from 'app/assets/svg/menu.svg';
import AttachmentSVG from 'app/assets/svg/attachment-icon.svg';
import ChatSendSVG from 'app/assets/svg/chat-send.svg';
import SmileySVG from 'app/assets/svg/smiley.svg';

function GroupChat({ navigation, route }: any) {
  const appToken = useSelector(userToken);
  const myId = useSelector(userId);

  // console.log('render');

  const { groupDetails } = route.params;
  //console.log('groupDetails-11', groupDetails);

  let [loading, setLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showAttachmentDialog, setShowAttachmentDialog] = useState(false);
  const [messages, setMessages] = useState<any>([]);
  const [message, setMessage] = useState('');
  const [showJoinGroup, setShowJoinGroup] = useState(true);
  const [showSelectContact, setShowSelectContact] = useState(false);
  const [contactDetails, setContactDetails] = useState(null);
  const [isLoadingOlderMessages, setIsLoadingOlderMessages] = useState(true);
  const [openSearch, setOpenSearch] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPageNumber, setTotalPageNumber] = useState(0);
  const [quotedData, setQuotedData] = useState<any>(null);
  const [processingFile, setProcessingFile] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [text, setTextInputValue] = useState(''); // State for text input value
  const { t } = useTranslation();

  const handleComposerTextChanged = (text: string) => {
    setTextInputValue(text); // Update the text input value in the state
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  let socket = useRef<any>(null);

  const openMenu = () => setShowMenu(true);
  const closeMenu = () => setShowMenu(false);

  const backAction = () => {
    if (showAttachmentDialog == true) {
      setShowAttachmentDialog(!showAttachmentDialog);
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [showAttachmentDialog]);

  useEffect(() => {
    if (groupDetails && groupDetails._id && myId) {
      // console.log('bbbb', groupDetails);
      //   console.log('goes-well-', myAccount._id, groupDetails.participants);
      let checkParticipants = groupDetails.participants.find((id: string) => {
        return id == myId;
      });

      if (checkParticipants) {
        setShowJoinGroup(false);
      } else {
        setShowJoinGroup(true);
      }
    }
  }, [groupDetails]);

  useEffect(() => {
    if (searchInput != '') {
      searchChat();
    }
  }, [searchInput]);

  useEffect(() => {
    function setupSocket() {
      if (
        appToken &&
        groupDetails &&
        groupDetails._id &&
        socket.current === null
      ) {
        let connectionOptions: any = {
          'force new connection': true,
          reconnectionAttempts: 'Infinity',
          timeout: 100000,
          transports: ['websocket'],
          auth: {
            token: appToken,
          },
        };

        socket.current = socketIOClient(MAIN_URL, connectionOptions);

        // socket.current.on('connect_error', (err) => {
        //   console.log(err);
        // });

        socket.current.emit('join-group', groupDetails._id, (response: any) => {
          // showMessage({
          //   type: 'success',
          //   title: 'Success',
          //   message: response.message,
          // });
          // showToast(response.message);
          // if (!response.success) {
          //   showToast(response.message);
          // }
        });

        socket.current.on('group-messages', (data: any) => {
          if (data.deletedMessage) {
            setMessages((messages: any) =>
              messages.filter((message: any) => message._id != data.messageId)
            );
          } else {
            //console.log('rtes==', data);
            let newMessage = formatMessage(data);

            setMessages((messages: any) => [newMessage, ...messages]);
          }
        });
      }
    }
    setupSocket();
  }, [appToken, groupDetails]);

  useEffect(() => {
    if (contactDetails) {
      openShareAttachment('contact');
    }
  }, [contactDetails]);

  function toggleOpenSearch() {
    if (openSearch) {
      setMessages([]);
      loadData();
    }
    setOpenSearch(!openSearch);
  }
  async function searchChat() {
    if (searchInput != '' && groupDetails && groupDetails._id) {
      await Axios({
        method: 'POST',
        url: '/group/search/' + groupDetails._id,
        data: {
          search: searchInput,
        },
      }).then((response) => {
        setTotalPageNumber(response.data.totalPages);
        let formattedMessages = JSON.parse(JSON.stringify(response.data.docs));
        formattedMessages.forEach((message: any) => {
          message = formatMessage(message);
        });

        setMessages(formattedMessages);
      });
    }
  }

  async function loadData() {
    if (appToken && groupDetails && groupDetails._id) {
      setIsLoadingOlderMessages(true);
      await Axios({
        method: 'GET',
        url: '/group/chats/' + groupDetails._id + `?page=${pageNumber}&limit=5`,
      })
        .then((response) => {
          console.log(JSON.stringify(response.data), ' == compare');
          //  console.log('top', response.data.groupChats.docs);
          setTotalPageNumber(response.data.groupChats.totalPages);
          let formattedMessages = JSON.parse(
            JSON.stringify(response.data.groupChats.docs)
          );

          formattedMessages.forEach((message: any) => {
            message = formatMessage(message);
          });

          setMessages((messages: any) => [...messages, ...formattedMessages]);
          //setMessages(formattedMessages);
        })
        .finally(() => {
          setIsLoadingOlderMessages(false);
        });
    }
  }

  function loadNewerMessages() {
    setPageNumber(pageNumber + 1);
  }

  useEffect(() => {
    loadData();
  }, [groupDetails, pageNumber]);

  function formatMessage(chatMessage: any) {
    let message = chatMessage;

    if (message.message) {
      message.text = message.message;
    } else {
      message.text = 'NO_MESSAGE';
      message.emptyText = true;
    }

    if (message.type == 'contact') {
      message.contact = JSON.parse(message.attachment);
    }

    if (!message.system) {
      message.user = {
        _id: message.senderId._id,
        name: message.senderId.first_name + ' ' + message.senderId.last_name,
      };
      if (message.senderId.profile_picture) {
        message.user.avatar = message.senderId.profile_picture;
      } else {
        message.user.avatar = require('app/assets/user.jpg');
      }
    }
    return message;
  }

  const openShareAttachment = async (attachmentType: any) => {
    try {
      let file = null;
      if (attachmentType == 'camera') {
        file = await CameraHelper.openCamera();
        attachmentType = 'image';
      } else if (attachmentType == 'image') {
        file = await CameraHelper.selectImageFromGallery();
      } else if (attachmentType == 'video') {
        file = await CameraHelper.selectVideoFromGallery(setProcessingFile);
      } else if (attachmentType == 'contact') {
        if (contactDetails) {
          file = contactDetails;
        } else {
          return;
        }
      } else {
        file = await FileSelectHelper(attachmentType);
      }

      if (!file) {
        return;
      }

      navigation.push('Common', {
        screen: 'share-attachment',
        params: {
          attachmentType,
          attachment: file,
          name: `Share to ${groupDetails.name}`,
          chatType: 'group',
          chatId: groupDetails._id,
        },
      });
    } catch (err) {
      alert(err);
    }
  };

  async function joinGroup() {
    setLoading(true);
    await Axios({
      method: 'patch',
      url: '/group/join/' + groupDetails._id,
      data: {},
    })
      .then(async (response) => {
        setShowJoinGroup(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  async function deleteMessage(messageId: string) {
    await Axios({
      method: 'delete',
      url: '/group/delete-message/' + messageId,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + appToken,
      },
    }).then((response) => {
      console.log('success');
    });
  }

  async function leaveGroup() {
    setLoading(true);
    await Axios({
      method: 'delete',
      url: '/group/leave/' + groupDetails._id,
      data: {},
    })
      .then(async (response) => {
        setShowJoinGroup(true);

        navigation.goBack();
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function onSend(messages: any) {
    let message: any = {
      groupId: groupDetails._id,
      message: messages[0].text,
      type: 'message',
      token: appToken,
    };

    if (quotedData) {
      message.quotedData = quotedData;
    }

    socket.current.emit('Group Chat', message, (response: any) => {
      console.log('sent successfully', response);
    });

    setQuotedData(null);
  }

  const renderTime = (props: any) => {
    return (
      <Time
        {...props}
        timeTextStyle={{
          left: {
            color: 'white',
            margin: 3,
            fontFamily: 'regular',
          },
          right: {
            color: 'black',
            fontFamily: 'regular',
          },
        }}
      />
    );
  };

  function renderBubble(props: any) {
    // console.log('red', props);
    return (
      // Step 3: return the component
      <View
        style={{
          flexDirection: 'column',
          marginBottom: 22,
        }}
      >
        <View
          style={{
            padding: 3,

            alignItems: props.position === 'right' ? 'flex-end' : 'flex-start',
          }}
        >
          {/* 
          <Text>Delivered</Text> */}
        </View>

        <Bubble
          {...props}
          wrapperStyle={{
            right: {
              backgroundColor: '#E5E5E5',
              // backgroundColor: 'red',
              padding: rv(3),
              borderTopLeftRadius: rv(20),
              borderBottomLeftRadius: rv(20),
              borderTopRightRadius: rv(20),
              borderBottomRightRadius: 0,
            },
            left: {
              // Here is the color change
              backgroundColor: '#4F4F4F',
              padding: rv(3),
              color: 'white',
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: rv(20),
              borderTopRightRadius: rv(20),
              borderBottomRightRadius: rv(20),
            },
          }}
          renderMessageText={(props: any) => {
            return (
              <View>
                {props.currentMessage.quotedReply ? (
                  <View
                    style={{
                      margin: 5,
                      backgroundColor: '#696969',
                      padding: 10,
                      borderTopLeftRadius: 30,
                      borderTopRightRadius: 30,
                      borderBottomLeftRadius: 30,
                      borderBottomRightRadius: 0,
                      flexDirection: 'column',
                    }}
                  >
                    <CustomText
                      style={{
                        color: '#9FD0D0',
                      }}
                      textType='bold'
                    >
                      {props.currentMessage.quotedReply.name}
                    </CustomText>

                    <CustomText
                      style={{
                        color: 'white',
                        marginTop: 4,
                      }}
                    >
                      {props.currentMessage.quotedReply.message}
                    </CustomText>
                  </View>
                ) : (
                  <View
                    style={{
                      marginLeft: props.position === 'right' ? 11 : 10,
                      marginTop: 3,
                    }}
                  >
                    <CustomText
                      textType='bold'
                      style={{
                        color:
                          props.position === 'right' ? '#FC8C78' : '#D0C69F',
                      }}
                    >
                      {props.position === 'right'
                        ? 'You'
                        : props.currentMessage.senderId.first_name}
                    </CustomText>
                  </View>
                )}

                <TouchableOpacity
                  style={{
                    paddingHorizontal: 6,
                  }}
                  onPress={() =>
                    navigation.push('Common', {
                      screen: 'preview-attachment',
                      params: props.currentMessage,
                    })
                  }
                >
                  {props.currentMessage.type == 'image' ? (
                    <View
                      style={{
                        height: hp('30%'),
                        width: wp('45%'),
                      }}
                    >
                      <Image
                        source={{
                          uri: props.currentMessage.attachment,
                        }}
                        style={{
                          width: '100%',
                          height: '100%',
                        }}
                        resizeMode={'cover'}
                      />
                    </View>
                  ) : props.currentMessage.type == 'video' ? (
                    <View
                      style={{
                        height: hp('30%'),
                        width: wp('45%'),
                        backgroundColor: 'black',
                        paddingTop: hp('12%'),
                      }}
                    >
                      <View
                        style={{
                          marginBottom: -hp('17.5%'),
                          justifyContent: 'center',
                          alignItems: 'center',
                          zIndex: 999,
                          flexDirection: 'column',
                        }}
                      >
                        <FontAwesome
                          name='play-circle'
                          size={35}
                          color='white'
                        />
                        <CustomText
                          style={{
                            color: 'white',
                          }}
                          textType='bold'
                        >
                          {FileHelper.byteToFileSize(
                            props.currentMessage.attachmentSize
                          )}
                        </CustomText>
                      </View>
                      <View
                        style={{
                          backgroundColor: 'black',
                        }}
                      >
                        <Image
                          source={{
                            uri: props.currentMessage.attachment,
                          }}
                          style={{
                            height: hp('30%'),
                            width: wp('45%'),
                          }}
                          resizeMode={'cover'}
                        />
                      </View>
                    </View>
                  ) : props.currentMessage.type == 'contact' ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 15,
                        paddingHorizontal: 20,
                        borderRadius: 5,
                        backgroundColor: 'white',
                      }}
                    >
                      <FontAwesome
                        name='address-card'
                        size={23}
                        style={{ marginRight: 5 }}
                        color='#FFCB05'
                      />
                      <CustomText
                        style={{
                          fontSize: 17,

                          marginLeft: 4,
                        }}
                        textType='bold'
                      >
                        {props.currentMessage.contact
                          ? props.currentMessage.contact.displayName
                          : ''}
                      </CustomText>
                    </View>
                  ) : props.currentMessage.type == 'document' ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: 15,
                        borderRadius: 5,
                        backgroundColor: 'white',
                      }}
                    >
                      <FontAwesome
                        name='file'
                        size={20}
                        color='#FFCB05'
                        style={{
                          paddingRight: 5,
                        }}
                      />
                      <CustomText
                        style={{
                          fontSize: 17,
                          paddingRight: 15,
                        }}
                        textType='bold'
                      >
                        Document File
                      </CustomText>
                      <CustomText
                        style={{
                          fontSize: 12,
                        }}
                      >
                        {FileHelper.byteToFileSize(
                          props.currentMessage.attachmentSize
                        )}
                      </CustomText>
                    </View>
                  ) : props.currentMessage.type == 'audio' ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: 15,
                        borderRadius: 5,
                        backgroundColor: 'white',
                      }}
                    >
                      <FontAwesome
                        name='play-circle'
                        size={21}
                        style={{ marginRight: 5 }}
                        color='#FFCB05'
                      />
                      <CustomText
                        style={{
                          fontSize: 17,
                          paddingRight: 15,
                        }}
                        textType='bold'
                      >
                        Audio File
                      </CustomText>
                      <CustomText
                        style={{
                          fontSize: 12,
                        }}
                      >
                        {FileHelper.byteToFileSize(
                          props.currentMessage.attachmentSize
                        )}
                      </CustomText>
                    </View>
                  ) : null}
                </TouchableOpacity>

                {props.currentMessage.text == 'NO_MESSAGE' &&
                props.currentMessage.emptyText === true ? null : (
                  <MessageText {...props} />
                )}
              </View>
            );
          }}
          textStyle={{
            right: {
              color: '#000000',
              fontFamily: 'regular',
              fontSize: rv(14),
            },
            left: {
              color: 'white',
              fontFamily: 'regular',
              fontSize: rv(14),
            },
          }}
        />
      </View>
    );
  }

  function renderSend(props: any) {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          width: wp('24%'),
          height: rv(65),
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setShowAttachmentDialog(!showAttachmentDialog);
          }}
          style={{
            marginRight: rv(10),
          }}
        >
          <AttachmentSVG width={rv(20)} height={rv(20)} />
        </TouchableOpacity>

        {/* Send Button */}

        <View
          style={{
            height: rv(40),
            width: rv(40),
          }}
        >
          <Send
            style={{
              width: rv(40),
              height: rv(40),
            }}
            {...props}
          >
            <View
              style={{
                width: rv(40),
              }}
            >
              <ChatSendSVG width={rv(40)} height={rv(40)} />
            </View>
          </Send>
        </View>
      </View>
    );
  }

  const renderComposer = (props: any) => {
    const handleEmojiSelected = (emoji: any) => {
      const updatedText = `${text} ${emoji.emoji}`;
      setTextInputValue(updatedText);
    };
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
        }}
      >
        <View
          style={{
            flex: 1,
            width: wp('100%'),
            backgroundColor: 'transparent',
          }}
        >
          {quotedData ? (
            <View
              style={{
                flex: 1,
                backgroundColor: 'black',
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                paddingVertical: 20,
                flexDirection: 'column',
                paddingLeft: 12,
                borderLeftWidth: 10,
                borderLeftColor: '#9FD0D0',
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
                    color: '#9FD0D0',
                  }}
                  textType='bold'
                >
                  Replying to
                </CustomText>
                <TouchableOpacity
                  onPress={() => {
                    setQuotedData(null);
                  }}
                >
                  <FontAwesome
                    name='times'
                    color={'grey'}
                    size={20}
                    style={{
                      paddingHorizontal: 17,
                    }}
                  />
                </TouchableOpacity>
              </View>

              <View>
                <CustomText
                  style={{
                    color: 'white',
                  }}
                >
                  {quotedData.message}
                </CustomText>
              </View>
            </View>
          ) : null}
        </View>
        <View
          style={{
            width: wp('75%'),
            flexDirection: 'row',
            paddingVertical: 10,
            paddingLeft: 10,
          }}
        >
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              padding: 5,
              paddingHorizontal: 8,
              paddingBottom: 18,
            }}
            onPress={toggleEmojiPicker}
          >
            <SmileySVG width={rv(25)} height={rv(25)} />
          </TouchableOpacity>

          <Composer
            {...props}
            style={{
              width: '100%',
              flex: 1,
            }}
            textInputStyle={{
              backgroundColor: '#3D3C39',
              padding: 10,
              borderRadius: 20,
              color: 'white',
              flex: 1,
            }}
            text={text}
            onTextChanged={(text: any) => setTextInputValue(text)}
          />
          {showEmojiPicker && (
            <EmojiPicker
              onEmojiSelected={handleEmojiSelected}
              open={showEmojiPicker}
              onClose={toggleEmojiPicker}
            />
          )}
        </View>
      </View>
    );
  };

  const CustomInputToolbar = (props: any) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}
      >
        {showJoinGroup ? (
          <TouchableOpacity
            onPress={joinGroup}
            style={{
              flex: 1,
              height: 80,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
            }}
          >
            <CustomText style={{ fontSize: rv(15) }}>{t("Groups_TaptoJoin")} </CustomText>
          </TouchableOpacity>
        ) : (
          <KeyboardAvoidingView
            behavior='padding'
            style={{
              flex: 1,
              backgroundColor: 'white',
            }}
          >
            <InputToolbar
              {...props}
              containerStyle={{
                backgroundColor: 'black',
                flex: 1,
              }}
              renderComposer={(composerProps: any) => {
                // Pass the text input value and the handler to the composer
                return renderComposer({
                  ...composerProps,
                  text,
                  onTextChanged: handleComposerTextChanged,
                });
              }}
              renderSend={(sendProps: any) => {
                // Pass the text input value and the handler to the send button
                return renderSend({
                  ...sendProps,
                  text,
                  onTextChanged: handleComposerTextChanged,
                });
              }}
            />
          </KeyboardAvoidingView>
        )}
      </View>
    );
  };

  function onLongPress(context: any, message: any) {
    if (message.senderId._id == myId) {
      const options = ['Quote Reply', 'Delete Message', 'Copy Text', 'Cancel'];
      const cancelButtonIndex = options.length - 1;
      context.actionSheet().showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex,
        },
        (buttonIndex: number) => {
          switch (buttonIndex) {
            case 0:
              // showToast('quoted');
              setQuotedData({
                name:
                  message.senderId.first_name + '' + message.senderId.last_name,
                chatId: message.chatId,
                message: message.text,
              });
              break;
            case 1:
              deleteMessage(message._id);
              break;
            case 2:
              Clipboard.setString(message.text);
              //showToast('Copied to clipboard');
              break;
          }
        }
      );
    } else {
      const options = ['Quote Reply', 'Copy Text', 'Cancel'];
      const cancelButtonIndex = options.length - 1;
      context.actionSheet().showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex,
        },
        (buttonIndex: number) => {
          switch (buttonIndex) {
            case 0:
              // showToast('quoted');
              setQuotedData({
                name:
                  message.senderId.first_name + '' + message.senderId.last_name,
                chatId: message.chatId,
                message: message.text,
              });
              break;
            case 1:
              Clipboard.setString(message.text);
              // showToast('Copied to clipboard');
              break;
          }
        }
      );
    }
  }

  function showAttachmentDialogs() {
    return <View style={{ flex: 0 }}></View>;
  }

  return (
    <Provider>
      <SafeAreaView style={{ flex: 1 }}>
        <Loader loading={loading} />
        <SelectContact
          show={showSelectContact}
          setShow={setShowSelectContact}
          setContact={setContactDetails}
        />

        <View
          style={{
            backgroundColor: 'white',
            minHeight: 70,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              minHeight: 70,
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 20,
              width: '80%',
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <FontAwesome
                name='arrow-left'
                size={25}
                style={{ marginRight: 5 }}
                color='black'
              />
            </TouchableOpacity>
            {openSearch ? (
              <TextInput
                placeholderTextColor={'grey'}
                style={{
                  width: '70%',
                  marginTop: 5,
                  paddingHorizontal: 10,
                  fontSize: 17,
                  color: 'black',
                  fontFamily: 'regular',
                }}
                onChangeText={(text) => {
                  setSearchInput(text);
                }}
                placeholder={t('Groups_SearchGroup')}
                value={searchInput}
              />
            ) : (
              <TouchableOpacity
                onPress={() => {
                  if (groupDetails) {
                    navigation.navigate('group-info', { groupDetails });
                  }
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  flex: 1,
                }}
              >
                <Image
                  //defaultSource= {require('../assets/user.jpg')}
                  source={
                    groupDetails.image && groupDetails.image.length > 0
                      ? { uri: groupDetails.image }
                      : require('app/assets/group.jpg')
                  }
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 25,
                    borderColor: 'white',
                    marginHorizontal: 7,
                  }}
                />

                <CustomText
                  ellipsizeMode='tail'
                  adjustsFontSizeToFit={true}
                  style={{
                    color: 'black',
                    fontSize: rv(15),
                    flex: 1,
                  }}
                  textType='bold'
                >
                  {groupDetails.name}
                </CustomText>
              </TouchableOpacity>
            )}
          </View>

          <View
            style={{
              flexDirection: 'row',
              width: '20%',
            }}
          >
            <TouchableOpacity
              onPress={() => {
                toggleOpenSearch();
              }}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <FontAwesome
                name={openSearch ? 'times' : 'search'}
                size={20}
                style={{ marginHorizontal: 5 }}
                color='black'
              />
            </TouchableOpacity>
            <Menu
              visible={showMenu}
              onDismiss={closeMenu}
              anchor={
                <TouchableOpacity onPress={openMenu}>
                  <MenuSVG
                    style={{
                      marginHorizontal: 5,
                      width: 23,
                      height: 23,
                      marginTop: 5,
                      marginLeft: 10,
                      marginRight: wp('4%'),
                    }}
                  />
                </TouchableOpacity>
              }
            >
              <Menu.Item
                onPress={() => {
                  if (groupDetails) {
                    navigation.navigate('group-info', { groupDetails });
                  }
                }}
                title={t('Groups_opt_groupInfo')}
              />
              {/* <Menu.Item
                onPress={() => {
                  navigation.navigate('searchchat', {
                    source: 'group',
                    groupDetails,
                  });
                }}
                title='Search Chat'
              /> */}

              {showJoinGroup ? (
                <Menu.Item onPress={joinGroup} title={t('Groups_joinGroups')} />
              ) : (
                <Menu.Item
                  onPress={leaveGroup}
                  title={t('Groups_opt_exitGroup')}
                />
              )}
            </Menu>
          </View>
        </View>

        {myId ? (
          <KeyboardAvoidingView
            behavior={'padding'}
            style={{
              flex: 1,
              backgroundColor: 'white',
            }}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={{ flex: 1 }}>
                <GiftedChat
                  isAnimated
                  alwaysShowSend
                  scrollToBottom
                  isKeyboardInternallyHandled={false}
                  // minComposerHeight={60}
                  // renderSend={renderSend}
                  renderBubble={renderBubble}
                  alignTop={false}
                  placeholder={t('profile_message')}
                  messages={messages}
                  loadEarlier={pageNumber >= totalPageNumber ? false : true}
                  onSend={(messages: any) => onSend(messages)}
                  onLongPress={onLongPress}
                  renderTime={renderTime}
                  renderAccessory={showAttachmentDialogs}
                  onLoadEarlier={loadNewerMessages}
                  isLoadingEarlier={isLoadingOlderMessages}
                  renderInputToolbar={(props: any) => CustomInputToolbar(props)}
                  user={{
                    _id: myId,
                  }}
                />
                {showAttachmentDialog && (
                  <SelectAttachment
                    show={showAttachmentDialog}
                    openShareAttachment={openShareAttachment}
                    setShowSelectContact={setShowSelectContact}
                    source={'group'}
                  />
                )}
                {/* Your other components */}
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        ) : null}
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  // rest remains same
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  systemMessageText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  headerContainer: {
    marginTop: 25,
    margin: 15,
    height: 65,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  sendingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  listTitle: {
    fontSize: 22,
  },
  listDescription: {
    fontSize: 16,
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
  },
  imageThumbnail: {
    resizeMode: 'cover',
    height: 22,
    width: 22,
  },
  scrollToBottomContainer: {
    height: 40,
    width: 40,
    backgroundColor: 'white',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GroupChat;
