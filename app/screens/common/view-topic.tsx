import React, { useState, useEffect } from 'react';
import {
  TextInput,
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  BackHandler,
  Share,
  SafeAreaView,
  KeyboardAvoidingView
} from 'react-native';
import Loader from 'app/components/elements/Loader';
// import Icon from 'react-native-vector-icons/FontAwesome';
import SelectAttachment from 'app/components/select-attachment';
import ReportDialog from 'app/components/dialogs/report';
import { default as themeFont } from 'app/assets/themes/fonts.json';
import { CustomText } from 'app/components/elements';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { CameraHelper, FileHelper, FileSelectHelper } from 'app/helpers';
import Document from 'app/components/attachments/Document';
import Audio from 'app/components/attachments/Audio';
import Video from 'app/components/attachments/Video';
import { TopicCard } from 'app/components/cards';
import Avatar from 'app/components/elements/Avater';
import { useSelector } from 'react-redux';
import { userAuthInfo } from 'app/redux/user/reducer';
import { useCreateComment, useCreateSubComment, useSingleTopic, useTopicComments } from 'app/redux/topic/hooks';
import { Axios } from 'app/api/axios';
import ThumbSVG from 'app/assets/svg/thumb.svg';
import CommentSVG from 'app/assets/svg/comment.svg';
import { timeAgo } from 'app/helpers/time-ago';
import CommentCard from 'app/components/cards/comment';
import { responsiveValue as rv } from 'app/providers/responsive-value';
import CloseSVG from 'app/assets/svg/close.svg';
import AttachmentSVG from 'app/assets/svg/attachment-icon.svg';
import ChatSendSVG from 'app/assets/svg/chat-send.svg';
import HeaderTitle from 'app/components/HeaderTitle';
import { useTranslation } from 'react-i18next';

function ViewTopic({ navigation, route }: any) {
  const profile = useSelector(userAuthInfo);



  const { postid } = route.params;
  const { t } = useTranslation();

  const { data, refetch, isFetching } = useSingleTopic(postid);
  const {
    data: comments,
    refetch: refetchComment,
    isFetching: isFetchingComments,
  } = useTopicComments(postid);
  const { mutateAsync: comment, isLoading: loadingCreateSubComment } = useCreateComment();
  const { mutateAsync: subComment, isLoading: loadingCreateComment } = useCreateSubComment();

  let [loading, setLoading] = useState(false);
  const [userComment, setUserComment] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [inputHeight, setInputHeight] = useState(0);
  const [showAttachmentDialog, setShowAttachmentDialog] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [reportDetails, setReportDetails] = useState({});
  const [processingFile, setProcessingFile] = useState(false)


  const [subCommentData, setSubCommentData] = useState<any>(null);

  let numOfLines = 0;

  const _handleTextChange = (inputValue: string) => {
    setInputValue(inputValue);
    setUserComment(inputValue);
  };

  const _handleSizeChange = (event: any) => {
    console.log(
      '_handleSizeChange ---->',
      event.nativeEvent.contentSize.height,
    );

    setInputHeight(event.nativeEvent.contentSize.height);
  };

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
      backAction,
    );

    return () => backHandler.remove();
  }, [showAttachmentDialog]);

  useEffect(() => {

    if (comments) {
      console.log("🚀 - comments:", comments)
    }
  }, [comments])

  // const onShare = async (message, image) => {
  //   try {
  //     const result = await Share.share({
  //       message: message,
  //       url: image,
  //     });
  //     if (result.action === Share.sharedAction) {
  //       if (result.activityType) {
  //         // shared with activity type of result.activityType
  //       } else {
  //         // shared
  //       }
  //     } else if (result.action === Share.dismissedAction) {
  //       // dismissed
  //     }
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // };

  const openShareAttachment = async (attachmentType: string) => {
    try {

      let file = null;
      if (attachmentType == 'camera') {
        file = await CameraHelper.openCamera();
        attachmentType = 'image';
      }
      else if (attachmentType == 'image') {
        file = await CameraHelper.selectImageFromGallery();
      }
      else if (attachmentType == 'video') {
        file = await CameraHelper.selectVideoFromGallery(setProcessingFile);
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
          name: 'Share Comment Attachment',
          post: data,
          chatType: 'topic-comment',
        }
      })


    } catch (err) {
      alert(err);
    }
  };


  function createComment() {
    //Show Loader
    setLoading(true);

    const commentData = new FormData();
    commentData.append('comment', userComment);

    let payload = {
      postId: postid,
      data: commentData
    }

    comment(payload).then(() => {
      setInputValue('');
      setUserComment('');
      // refetchComment();
    })
  }

  function createSubComment() {
    if (subCommentData && subCommentData.id) {
      //Show Loader
      // setLoading(true);

      let payload = {
        commentId: subCommentData.id,
        data: {
          comment: userComment,
        }
      }

      subComment(payload).then(() => {
        setInputValue('');
        setUserComment('');
        setSubCommentData(null);
        refetchComment();
      })

    }
  }

  const submitComment = () => {
    if (!userComment) {
      alert('Please type something in the comment box');
      return;
    }

    if (subCommentData && subCommentData.id) {
      createSubComment();
    } else {
      createComment();
    }
  };



  return (
    <KeyboardAvoidingView
      style={{
        flex: 1, backgroundColor: 'white', flexDirection: 'column' ,
      }}
      behavior='padding'
    >
       <SafeAreaView style={{}}>
        {/* Your top section content */}
        <HeaderTitle title={t('comments_title')} navigation={navigation} />
      </SafeAreaView>


      {/* <Loader loading={isFetching || isFetchingComments || loadingCreateComment} /> */}

      <ReportDialog
        show={showReportDialog}
        setShow={setShowReportDialog}
        reportDetails={reportDetails}
      />
      <View style={{ flex: 1 }}>
        <ScrollView style={{ backgroundColor: '#ffffff', paddingBottom: 70 }}>
          <StatusBar barStyle='dark-content' backgroundColor='white' />

          {data ? (
            <TopicCard
              item={data}
              navigation={navigation}
              refreshFunction={() => refetch()}
            />
          ) : null}
          <View
            style={{
              paddingBottom: 50,
            }}
          >
            {comments && comments.length > 0 ? (
              comments.map((item: any, index: number) => (
                <CommentCard
                  key={index}
                  item={item}
                  navigation={navigation}
                  setSubCommentData={setSubCommentData}
                  refreshFunction={() => refetchComment()}
                />
              ))
            ) : (
              <Text></Text>
            )}
          </View>
        </ScrollView>
      </View>



      {/* Reply Comment */}

      <View
        style={{
          flexDirection: 'column',
          backgroundColor: 'black',
          borderTopLeftRadius: rv(10),
          borderTopRightRadius: rv(10),
        }}
      >
        {subCommentData ? (
          <View
            style={{
              margin: rv(10),
              flexDirection: 'column',
              padding: rv(10),
              borderLeftWidth: rv(7),
              borderLeftColor: '#F19C4A',
              backgroundColor: '#3D3C39',
              borderRadius: rv(10)
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
                  color: '#F19C4A',
                }}
                textType='semi-bold'
              >
                Replying to
              </CustomText>

              <TouchableOpacity
                onPress={() => {
                  setSubCommentData(null);
                }}
              >

                <CloseSVG
                  width={rv(13)}
                  height={rv(13)}
                  color={'#F19C4A'}
                />

              </TouchableOpacity>
            </View>

            <View>
              <CustomText
                style={{
                  color: 'white',
                }}
              >
                {subCommentData.comment}
              </CustomText>
            </View>
          </View>
        ) : null}

        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            paddingHorizontal: 10,
            paddingVertical: 7,
            paddingBottom:30,
          }}
        >
          <View
            style={{
              // justifyContent: 'center',
              // alignItems: 'center',
            }}
          >
            <View
              style={{
                marginHorizontal: 10,
              }}
            >
              <Avatar source={profile.profile_picture} size={45} />
            </View>
          </View>
          <View
            style={{
              flex: 1,
              width: 'auto',
              // marginTop: 'auto',
              flexDirection: 'row',
              // alignItems: 'center',
              // justifyContent: 'center',
            }}
          >
            <View
              style={[
                {
                  flex: 1,
                  // justifyContent: 'center',
                  // paddingBottom: Math.max(hp('6%'), inputHeight - 5),
                },
              ]}
            >
              <View
                style={{
                  maxHeight: hp('20'),
                }}
              >
                <TextInput
                  value={inputValue}
                  placeholder={t('comments_typeMessage')}
                  placeholderTextColor="#F4F5FA"
                  autoCapitalize='sentences'
                  maxLength={150}
                  multiline={true}
                  // enablesReturnKeyAutomatically={true}
                  blurOnSubmit={true}
                  onChangeText={_handleTextChange}
                  numberOfLines={numOfLines}
                  onContentSizeChange={(event) => _handleSizeChange(event)}
                  style={[
                    {
                      minHeight: 45,
                      height: inputHeight,
                      fontFamily: 'regular',
                      fontSize: 16,
                      color: 'white',
                      lineHeight: 20,
                      borderRadius: 30,
                      padding: 10,
                      paddingTop: 12,
                      backgroundColor: '#3D3C39',
                    },
                  ]}
                />
              </View>
            </View>

            <View style={{
              marginHorizontal: 5,
              justifyContent: 'center'
            }}>
              <TouchableOpacity
                onPress={() => {
                  setShowAttachmentDialog(!showAttachmentDialog);
                }}
                style={{
                  display: subCommentData ? 'none' : 'flex'
                }}
              >
                <AttachmentSVG
                  width={rv(20)}
                  height={rv(20)}
                />
              </TouchableOpacity>
            </View>


            <TouchableOpacity activeOpacity={0.5} onPress={submitComment}>

              <ChatSendSVG
                width={rv(43)}
              />

            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={{ width: wp('100%') }}>
        <SelectAttachment
          show={showAttachmentDialog}
          openShareAttachment={openShareAttachment}
          source={'topic-comment'}
        />
      </View>
    </KeyboardAvoidingView>
  );
}



export default ViewTopic;
