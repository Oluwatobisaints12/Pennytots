import React, { useState, useEffect, useContext, useRef } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import SelectAttachment from 'app/components/select-attachment';
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
import SocketIOClient from 'socket.io-client';
import { GlobalContext } from 'app/GlobalProvider';
import ReportDialog from 'app/components/dialogs/report';
import Avatar from 'app/components/elements/Avater';
import { CustomText } from 'app/components/elements';
import { default as themeFont } from 'app/assets/themes/fonts.json';
import { Axios } from 'app/api/axios';
import { useSelector } from 'react-redux';
import { userId, userToken } from 'app/redux/user/reducer';
import { MAIN_URL } from 'app/api/axios';
import { ShowAlert } from 'app/providers/toast';
import useMyChat from 'app/redux/chat/hooks';
import { FileSelectHelper } from '../../helpers/FileSelectHelper';
import { CameraHelper, FileHelper } from 'app/helpers';
import SelectContact from 'app/components/SelectContact';
import FastImage from 'react-native-fast-image';
import GallerySVG from 'app/assets/svg/media/gallery2.svg';
import GallerySVG2 from 'app/assets/svg/media/gallery3.svg';
import CameraSVG from 'app/assets/svg/media/camera.svg';
import DocumentSVG from 'app/assets/svg/media/document.svg';
import ContactSVG from 'app/assets/svg/media/contact.svg';
import AudioSVG from 'app/assets/svg/media/audio.svg';
import { responsiveValue as rv } from 'app/providers/responsive-value';
import MenuSVG from 'app/assets/svg/menu.svg';
import AttachmentSVG from 'app/assets/svg/attachment-icon.svg';
import ChatSendSVG from 'app/assets/svg/chat-send.svg';
import SmileySVG from 'app/assets/svg/smiley.svg';
import EmojiPicker from 'rn-emoji-keyboard';
import { useTranslation } from 'react-i18next';

function PrivateChat({ navigation, route }: any) {
  const myId = useSelector(userId);
  const appToken = useSelector(userToken);

  const { refetch: refreshMyChat } = useMyChat();

  const { userDetails, bot } = route.params;
  const [showMenu, setShowMenu] = useState(false);
  const [showAttachmentDialog, setShowAttachmentDialog] = useState(false);
  const [singleFile, setSingleFile] = useState([]);
  const [messages, setMessages] = useState<any>([]);
  const [chatDetails, setChatDetails] = useState<any>(null);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [reportDetails, setReportDetails] = useState({});
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoadingOlderMessages, setIsLoadingOlderMessages] = useState(true);
  const [totalPageNumber, setTotalPageNumber] = useState(0);
  const [quotedData, setQuotedData] = useState<any>(null);
  const [contactDetails, setContactDetails] = useState(null);
  const [showSelectContact, setShowSelectContact] = useState(false);
  const [processingFile, setProcessingFile] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [text, setTextInputValue] = useState(''); // State for text input value
  const { t } = useTranslation();

  const handleComposerTextChanged = (text: string) => {
    setTextInputValue(text); // Update the text input value in the state
  };

  let socket = useRef<any>(null);

  const openMenu = () => setShowMenu(true);
  const closeMenu = () => setShowMenu(false);

  useEffect(() => {
    if (
      chatDetails &&
      chatDetails._id &&
      userDetails &&
      userDetails._id &&
      !bot &&
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

      socket.current = SocketIOClient(MAIN_URL, connectionOptions);

      socket.current.emit(
        'join-chat',
        { chatId: chatDetails._id, accountId: userDetails._id },
        (response: any) => {
          if (!response.success) {
            if (response && response.message) {
              0;
              ShowAlert({
                type: 'success',
                className: 'Success',
                message: response.message,
              });
              // showToast(response.message);
            }
          }
        }
      );

      socket.current.on('chat-messages', (data: any) => {
        if (data.deletedMessage) {
          setMessages((messages: any) =>
            messages.filter((message: any) => message._id != data.messageId)
          );
        } else {
          let newMessage = formatMessage(data);

          setMessages((messages: any) => [newMessage, ...messages]);
        }
      });
    }
  }, [chatDetails, userDetails]);

  // async function loadData() {
  //   if (appToken && userDetails && userDetails._id) {
  //     await AXIOS({
  //       method: "GET",
  //       url: "/chats/" + userDetails._id + "?page=1&limit=500",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "Bearer " + appToken,
  //       },
  //     }).then((response) => {
  //       setChatDetails(response.data.chats.chatDetails);
  //       let formattedMessages = JSON.parse(
  //         JSON.stringify(response.data.chats.docs)
  //       );
  //       formattedMessages.forEach((message) => {
  //         message = formatMessage(message);
  //       });
  //       setMessages(formattedMessages);
  //       //  console.log('gos');
  //     });
  //   }
  // }

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  async function loadData() {
    if (appToken && userDetails && userDetails._id) {
      if (bot) {
        loadBotMessages();
        return;
      }
      await Axios.get(
        '/chats/' + userDetails._id + `?page=${pageNumber}&limit=5`
      )
        .then((response) => {
          setTotalPageNumber(response.data.chats.totalPages);
          setChatDetails(response.data.chats.chatDetails);
          let formattedMessages = JSON.parse(
            JSON.stringify(response.data.chats.docs)
          );
          formattedMessages.forEach((message: any) => {
            message = formatMessage(message);
          });
          // setMessages(formattedMessages);

          // if (messages && messages.length > 0) {
          //   setMessages((messages: any) => [...messages, ...formattedMessages]);
          // }

          setMessages((messages: any) => [...messages, ...formattedMessages]);

          // console.log('gos');
        })
        .catch((error) => {
          console.log('error =====', error);
        })
        .finally(() => {
          setIsLoadingOlderMessages(false);
        });
    }
  }

  async function loadBotMessages() {
    setIsLoadingOlderMessages(true);

    await Axios.get('/chats/bot-chats' + `?page=${pageNumber}&limit=5`)
      .then((response) => {
        setTotalPageNumber(response.data.chats.totalPages);
        setChatDetails(response.data.chats.chatDetails);
        let formattedMessages = JSON.parse(
          JSON.stringify(response.data.chats.docs)
        );
        formattedMessages.forEach((message: any) => {
          message = formatMessage(message);
        });
        // setMessages(formattedMessages);
        setMessages((messages: any) => [...messages, ...formattedMessages]);
        // console.log('gos');
      })
      .finally(() => {
        setIsLoadingOlderMessages(false);
      });
  }

  function loadNewerMessages() {
    setPageNumber(pageNumber + 1);
  }

  function toggleOpenSearch() {
    if (openSearch) {
      setMessages([]);
      loadData();
    }
    setOpenSearch(!openSearch);
  }

  async function searchChat() {
    if (appToken && searchInput != '' && chatDetails && chatDetails._id) {
      await Axios({
        method: 'POST',
        url: '/chats/search/' + chatDetails._id,
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

  useEffect(() => {
    if (searchInput != '') {
      searchChat();
    }
  }, [searchInput]);

  useEffect(() => {
    loadData();
  }, [userDetails, pageNumber]);

  function formatMessage(chatMessage: any) {
    let message = chatMessage;

    if (message.message) {
      message.text = message.message;
    } else {
      message.text = 'NO_MESSAGE';
      message.emptyText = true;
    }

    message.user = {
      _id: message.senderId,
    };

    return message;
  }

  function openReportDetails(item: any) {
    setReportDetails({ data: item, type: 'user' });
    closeMenu();
    setShowReportDialog(true);
  }

  async function blockUser() {
    if (appToken && userDetails && userDetails._id) {
      await Axios({
        method: 'patch',
        url: '/chats/block/' + userDetails._id,
        data: {},
      }).then((response) => {
        refreshMyChat();
        ShowAlert({
          type: 'success',
          className: 'Success',
          message: response.data.message,
        });
        navigation.goBack();
      });
    }
  }

  async function unblockUser() {
    closeMenu();
    if (appToken && userDetails && userDetails._id) {
      await Axios({
        method: 'patch',
        url: '/chats/unblock/' + userDetails._id,
        data: {},
      }).then((response) => {
        socket.current = null;
        ShowAlert({
          type: 'success',
          className: 'Success',
          message: response.data.message,
        });
        loadData();
      });
    }
  }

  async function reportUser() {
    if (appToken && userDetails && userDetails._id) {
      await Axios({
        method: 'patch',
        url: '/user/report/' + userDetails._id,
        data: {},
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${appToken}`,
        },
      }).then((response) => {
        ShowAlert({
          type: 'success',
          className: 'Success',
          message: response.data.message,
        });
        navigation.goBack();
      });
    }
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
          name: `Share to ${userDetails.first_name} ${userDetails.last_name}`,
          chatType: 'chat',
          chatId: chatDetails._id,
        },
      });
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    if (contactDetails) {
      openShareAttachment('contact');
    }
  }, [contactDetails]);

  async function deleteMessage(messageId: string) {
    if (appToken) {
      await Axios({
        method: 'delete',
        url: '/chats/delete-message/' + messageId,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + appToken,
        },
      }).then((response) => {
        console.log('success');
      });
    }
  }

  function onSend(messages: any) {
    let message: any = {
      chatId: chatDetails._id,
      accountId: userDetails._id,
      message: messages[0].text,
      type: 'message',
      token: appToken,
    };

    if (quotedData) {
      message.quotedData = quotedData;
    }

    socket.current.emit('Private Chat', message, (response: any) => {
      console.log(response, 'here two');
      if (response.message == 'no-subscription') {
        navigation.navigate('Home', { screen: 'Donate' });
      } else if (!response.success) {
        console.log(response, 'here');
        ShowAlert({
          type: 'error',
          className: 'Oops',
          message: response.message,
        });
      }
    });

    setQuotedData(null);

    // setMessages((previousMessages) =>
    //   GiftedChat.append(previousMessages, messages),
    // );
  }

  const renderTime = (props: any) => {
    return (
      <Time
        {...props}
        timeTextStyle={{
          left: {
            color: 'black',
          },
          right: {
            color: 'black',
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
            // padding: 3,
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
              padding: rv(3),
              borderTopLeftRadius: rv(20),
              borderBottomLeftRadius: rv(20),
              borderTopRightRadius: rv(20),
              borderBottomRightRadius: 0,
            },
            left: {
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
              <View
                style={{
                  paddingTop: 4,
                }}
              >
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
                        color: 'white',
                        marginTop: 4,
                      }}
                    >
                      {props.currentMessage.quotedReply.message}
                    </CustomText>
                  </View>
                ) : null}

                <TouchableOpacity
                  style={{
                    padding: 3,
                  }}
                  onPress={() =>
                    navigation.push('Common', {
                      screen: 'preview-attachment',
                      params: props.currentMessage,
                    })
                  }
                >
                  {props.currentMessage.type == 'image' ? (
                    <TouchableOpacity
                      style={{
                        padding: 6,
                      }}
                      onPress={() =>
                        navigation.push('Common', {
                          screen: 'fullscreen-image',
                          params: {
                            image: props.currentMessage.attachment,
                          },
                        })
                      }
                    >
                      <Image
                        source={{
                          uri: props.currentMessage.attachment,
                        }}
                        resizeMode={'cover'}
                        style={{
                          width: wp('30%'),
                          height: hp('30%'),
                        }}
                      />
                    </TouchableOpacity>
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
    console.log(props,"talking about here")
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

        {/* Send button */}

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

    console.log(props, 'Here is where i am talking about');
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
            }}
            textInputStyle={{
              backgroundColor: '#3D3C39',
              paddingLeft: 10,
              borderRadius: 20,
              color: 'white',
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

  const customInputToolbar = (props: any) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'black',
        }}
      >
        {chatDetails &&
        !bot &&
        chatDetails.blocked &&
        chatDetails.blocked.length == 0 ? (
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
              });}}
          />
        ) : null}
      </View>
    );
  };

  function showAttachmentDialogs() {
    return <View style={{ flex: 0 }}></View>;
  }

  const CustomInputToolbar = (props: any) => {
    
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}
      >
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
              });}}
          />
        </KeyboardAvoidingView>
      </View>
    );
  };

  function onLongPress(context: any, message: any) {
    if (message.senderId == myId) {
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
              setQuotedData({
                chatId: message.chatId,
                message: message.text,
              });
              break;
            case 1:
              deleteMessage(message._id);
              break;
            case 2:
              Clipboard.setString(message.text);
              // showToast('Copied to clipboard');
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
  return (
    <Provider>
      <SafeAreaView style={{ flex: 1 }}>
          <SelectContact
            show={showSelectContact}
            setShow={setShowSelectContact}
            setContact={setContactDetails}
          />
          <ReportDialog
            show={showReportDialog}
            setShow={setShowReportDialog}
            reportDetails={reportDetails}
          />
          <View
            style={{
              backgroundColor: 'white',
              minHeight: 70,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View
              style={{
                backgroundColor: 'white',
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
                    marginTop: 5,
                    paddingHorizontal: 10,
                    fontSize: 17,
                    color: 'black',
                  }}
                  onChangeText={(text) => {
                    setSearchInput(text);
                  }}
                  placeholder='Search Chats'
                  value={searchInput}
                />
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    if (userDetails && userDetails._id !== 'bot') {
                      navigation.push('Home', {
                        screen: 'Profile',
                        params: { userDetails },
                      });
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
                      userDetails &&
                      userDetails.profile_picture &&
                      userDetails.profile_picture.length > 0
                        ? { uri: userDetails.profile_picture }
                        : require('app/assets/user.jpg')
                    }
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 25,
                      borderColor: 'white',
                      marginHorizontal: 7,
                    }}
                  />
                  <View
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flex: 1,
                    }}
                  >
                    <CustomText
                      ellipsizeMode='tail'
                      adjustsFontSizeToFit={true}
                      style={{
                        color: 'black',
                        fontSize: rv(15),
                      }}
                      textType='bold'
                    >
                      {userDetails.first_name} {userDetails.last_name}
                    </CustomText>

                    {chatDetails &&
                    chatDetails.blocked &&
                    chatDetails.blocked.length > 0 ? (
                      <CustomText
                        style={{
                          marginTop: rv(3),
                          color: 'black',
                          fontSize: rv(13),
                          fontStyle: 'italic',
                        }}
                      >
                        Chat has been blocked
                      </CustomText>
                    ) : null}
                  </View>
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
                        height: 23,
                        marginTop: 3,
                        marginLeft: 10,
                        marginRight: wp('4%'),
                      }}
                    />
                  </TouchableOpacity>
                }
              >
                <Menu.Item
                  onPress={() => {
                    if (userDetails) {
                      navigation.push('Home', {
                        screen: 'Profile',
                        params: { userDetails },
                      });
                    }
                  }}
                  title={t('View Profile')}
                />

                {chatDetails && chatDetails.blocked.includes(myId) ? (
                  <Menu.Item
                    onPress={() => {
                      unblockUser();
                    }}
                    title={t("BlockedChats_opt1")}
                  />
                ) : (
                  <Menu.Item
                    onPress={() => {
                      blockUser();
                    }}
                    title={t('Chats_blockUser')}
                  />
                )}

                <Menu.Item
                  onPress={() => {
                    if (userDetails && userDetails._id) {
                      openReportDetails(userDetails._id);
                    }
                  }}
                  title={t("Chats_reportUser")}
                />
                <Menu.Item
                  onPress={() => {
                    navigation.goBack();
                  }}
                  title={t('Chats_closeChat')}
                />
              </Menu>
            </View>
          </View>
        <KeyboardAvoidingView
          behavior='padding'
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
                placeholder={t("profile_message")}
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

export default PrivateChat;
