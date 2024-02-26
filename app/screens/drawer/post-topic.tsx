import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import React, {
  FunctionComponent,
  useEffect,
  useState,
  useContext,
} from 'react';

import HeaderTitle from 'app/components/HeaderTitle';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// import { useTranslation } from 'react-i18next';
import Ionicons from '@expo/vector-icons/Ionicons';
import SelectImageDialog from 'app/components/dialogs/select-image';
import { CameraHelper, FileSelectHelper, FileHelper } from 'app/helpers';
import Loader from 'app/components/elements/Loader';
import { CustomButton, CustomText } from 'app/components/elements';
import SelectInterests from 'app/components/elements/SelectInterests';
import { WarnInfoSVG } from 'app/providers/svg/loader';
import CloseSVG from 'app/assets/svg/close.svg';
import GallerySVG from 'app/assets/svg/media/gallery.svg';
import GallerySVG2 from 'app/assets/svg/media/gallery3.svg';
import CameraSVG from 'app/assets/svg/media/camera.svg';
import DocumentSVG from 'app/assets/svg/media/document.svg';
import AudioSVG from 'app/assets/svg/media/audio.svg';
import { ShowAlert } from 'app/providers/toast';
import { Camera } from 'expo-camera';
import { useTranslation } from 'react-i18next';

type PostATopicProps = {
  route: any;
  navigation: any;
};

import { Axios } from 'app/api/axios';
import { responsiveValue as rv } from 'app/providers/responsive-value';
import { SafeAreaView } from 'react-navigation';

const PostTopic: FunctionComponent<PostATopicProps> = ({
  route,
  navigation,
}) => {
  // const { t } = useTranslation();
  let [loading, setLoading] = useState(false);
  const [contents, setContent] = useState('');

  const [interest, setInterest] = useState<string>('');
  const [showSelectImage, setShowSelectImage] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [attachmentType, setAttachmentType] = useState('');
  const [showAttachment, setShowAttachment] = useState(false);
  const [processingFile, setProcessingFile] = useState(false);
  const [startCamera, setStartCamera] = React.useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState<any>(null);
  const [cameraType, setCameraType] = React.useState('back');
  const [flashMode, setFlashMode] = React.useState('off');
  const { t } = useTranslation();

  let camera: Camera;

  useEffect(() => {
    // Check if 'selectedImage' is present in route params
    if (route.params?.selectedImage) {
      setSelectedFile(route.params.selectedImage);
      setAttachmentType('image');
    }
  }, [route.params]);

  const openShareAttachment = async (AttachmentType: string) => {
    try {
      let file = null;
      if (AttachmentType == 'camera') {
        file = await CameraHelper.openCamera();
        AttachmentType = 'image';
      } else if (AttachmentType == 'image') {
        file = await CameraHelper.selectImageFromGallery();
      }
      else if (AttachmentType == 'video') {

        file = await CameraHelper.selectVideoFromGallery(setProcessingFile);

      }
      //  else {
      //   file = await FileSelectHelper(AttachmentType);
      //   console.log('FILE ==', file);
      // }
      else {
        file = await FileSelectHelper(AttachmentType);
        console.log('FILE ==', file);
      }

      setAttachmentType(AttachmentType);
      setSelectedFile(file);

      // navigation.push('shareAttachment', {
      //   attachmentType,
      //   attachment: file,
      //   name: `Share to ${groupDetails.name}`,
      //   chatType: 'group',
      //   chatId: groupDetails._id,
      // });
    } catch (err) {
      alert(err);
    }
  };

  const openPreview = async () => {
    navigation.push('Common', {
      screen: 'preview-attachment',
      params: {
        type: attachmentType,
        attachment: selectedFile.uri,
      }
    });
  };

  const handleSubmitPost = async () => {
    if (interest === '') {
      ShowAlert({
        type: 'error',
        message: 'Select an interest',
      });
      return;
    }
    if (!contents) {
      ShowAlert({
        type: 'error',
        className: 'Can not submit',
        message: 'Enter your topic',
      });
      return;
    }
    if (processingFile) {
      ShowAlert({
        type: 'info',
        className: 'Processing',
        message: 'File is Processing Please wait',
      });

      return;
    }

    //Show Loader
    setLoading(true);

    const topicData = new FormData();

    if (selectedFile) {
      topicData.append('content', contents);
      topicData.append('tags', JSON.stringify([interest]));
      topicData.append('attachmentType', attachmentType);
      topicData.append('file', selectedFile, 'video.mp4');
    } else {
      topicData.append('content', contents);
      topicData.append('tags', JSON.stringify([interest]));
    }

    try {
      // Show Loader
      setLoading(true);
      console.log('topicData', topicData);
      const response = await Axios.post('/topics/create', topicData,{
        headers: {
          'Content-Type': 'multipart/form-data',
        }})
      console.log('topicData', topicData);
      setContent('');
      setSelectedFile(null);
      setInterest('');

      navigation.navigate('Common', {
        screen: 'view-topic',
        params: {
          postid: response.data.topic._id,
        },
      });
    } catch (error: any) {
      // Show error toast using the ShowAlert function
      ShowAlert({
        type: 'error',
        className: 'Oops',
        message: `${error.message}`,
      });
    } finally {
      // Hide Loader (whether there was an error or not)
      setLoading(false);
    }
  };

  const CameraPreview = ({ photo }: any) => {
    console.log('sdsfds', photo);
    return (
      <View
        style={{
          backgroundColor: 'transparent',
          flex: 1,
          width: '100%',
          height: '100%',
        }}
      >
        <Image
          source={{ uri: photo && photo.uri }}
          style={{
            flex: 1,
          }}
        />
      </View>
    );
  };

  const __startCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === 'granted') {
      // start the camera
      navigation.push('Common', {
        screen: 'camera-screen',
      });
    } else {
      alert('Access denied');
    }
  };

  const __takePicture = async () => {
    if (!camera) return;
    const photo = await camera.takePictureAsync();
    console.log(photo);
    setPreviewVisible(true);
    setCapturedImage(photo);
  };
  const __savePhoto = () => {};

  const __retakePicture = () => {
    setCapturedImage(null);
    setPreviewVisible(false);
    __startCamera();
  };
  const __handleFlashMode = () => {
    if (flashMode === 'on') {
      setFlashMode('off');
    } else if (flashMode === 'off') {
      setFlashMode('on');
    } else {
      setFlashMode('auto');
    }
  };
  const __switchCamera = () => {
    if (cameraType === 'back') {
      setCameraType('front');
    } else {
      setCameraType('back');
    }
  };

  return (
   
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}
        showsVerticalScrollIndicator={false}
      >
         <SafeAreaView>     
        <HeaderTitle title='Share a topic' navigation={navigation} />
        <Loader loading={loading} />

        <SelectImageDialog
          show={showSelectImage}
          setShow={setShowSelectImage}
          setImage={setImageFile}
        />

        <View
          style={{
            paddingHorizontal: wp('10%'),
            flexDirection: 'column',
            paddingBottom: 30,
          }}
        >
          <TextInput
            multiline={true}
            numberOfLines={10}
            placeholder={t('PostTopic_typeMessage')}
            placeholderTextColor='#B5B5B5'
            style={{
              backgroundColor: '#F5F5F5',
              height: hp('23%'),
              textAlignVertical: 'top',
              fontSize: 16,
              color: 'black',
              lineHeight: 20,
              fontWeight: '800',
              paddingHorizontal: 10,
              borderRadius: 10,
            }}
            underlineColorAndroid='transparent'
            onChangeText={(contents) => setContent(contents)}
            maxLength={200}
            value={contents}
          />

          <View
            style={{
              flexDirection: 'row',
              marginLeft: -10,
              marginTop: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => setShowAttachment(!showAttachment)}
              style={{
                flexDirection: 'column',
                margin: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  ...styles.attachmentBox,
                  backgroundColor: 'gold',
                }}
              >
                <Ionicons name='md-add' size={15} color='grey' />
              </View>

              <CustomText
                style={{
                  paddingTop: 6,
                  fontSize: 13,
                  color: '#B5B5B5',
                }}
              >
                {t("PostTopic_attachFile")}
              </CustomText>
            </TouchableOpacity>
            {showAttachment ? (
              <View
                style={{
                  flexDirection: 'row',
                }}
              >
                <TouchableOpacity
                  onPress={() => __startCamera()}
                  style={{
                    flexDirection: 'column',
                    margin: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <CameraSVG width={60} />

                  <CustomText
                    style={{
                      paddingTop: 4,
                      fontSize: 13,
                      color: '#B5B5B5',
                    }}
                  >
                    {t("PostTopic_camera")}
                  </CustomText>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => openShareAttachment('image')}
                  style={{
                    flexDirection: 'column',
                    margin: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <GallerySVG width={60} />

                  <CustomText
                    style={{
                      paddingTop: 4,
                      fontSize: 13,
                      color: '#B5B5B5',
                    }}
                  >
                    Image
                  </CustomText>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => openShareAttachment('video')}
                  style={{
                    flexDirection: 'column',
                    margin: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <GallerySVG2 width={60} />
                  <CustomText
                    style={{
                      paddingTop: 4,
                      fontSize: 13,
                      color: '#B5B5B5',
                    }}
                  >
                    {t("PostTopic_video")}
                  </CustomText>
                </TouchableOpacity>

                <TouchableOpacity
                onPress={() => openShareAttachment('audio')}
                style={{
                  flexDirection: 'column',
                  margin: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >

                <AudioSVG
                  width={60}
                />

                <CustomText
                  style={{
                    paddingTop: 4,
                    fontSize: 13,
                    color: '#B5B5B5',
                  }}
                >
                  {t("PostTopic_audio")}
                </CustomText>
              </TouchableOpacity>
              </View>
            ) : null}
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginLeft: -10,
              marginTop: 10,
            }}
          >
            {showAttachment ? (
              <View
                style={{
                  flexDirection: 'row',
                }}
              >
                <TouchableOpacity
                  onPress={() => openShareAttachment('document')}
                  style={{
                    flexDirection: 'column',
                    margin: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <DocumentSVG width={60} />

                  <CustomText
                    style={{
                      paddingTop: 4,
                      fontSize: 13,
                      color: '#B5B5B5',
                    }}
                  >
                    {t("PostTopic_document")}
                  </CustomText>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>

          {selectedFile ? (
            <TouchableOpacity
              style={{
                flexDirection: 'column',
                width: wp('50'),
              }}
              onPress={() => setSelectedFile(null)}
            >
              <View
                style={{
                  // padding: 10,
                  height: 20,
                  width: 20,
                  borderRadius: 20,
                  backgroundColor: '#4F4F4F',
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'flex-end',
                  zIndex: 3,
                }}
              >
                <CloseSVG width={10} color={'white'} />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: -15,
                  padding: 15,
                  borderRadius: 10,
                  alignItems: 'center',
                  backgroundColor: '#F5F5F5',
                }}
              >
                <Ionicons
                  name='document'
                  size={20}
                  color='#FFD700'
                  style={{
                    marginRight: 7,
                  }}
                />
                <CustomText
                  style={{
                    textTransform: 'capitalize',
                    fontSize: 15,
                    marginTop: 4,
                  }}
                  textType='bold'
                >
                  {attachmentType}
                </CustomText>

                {/* <Icon
              name='close'
              size={15}
              style={{
                marginLeft: 20,
              }}
              color='#FFD700'
            /> */}
              </View>
            </TouchableOpacity>
          ) : null}

          {processingFile ? (
            <TouchableOpacity
              style={{
                flexDirection: 'column',
                width: wp('80'),
              }}
              onPress={() => setSelectedFile(null)}
            >
              <View
                style={{
                  flexDirection: 'row',
                  padding: 15,
                  borderRadius: 10,
                  alignItems: 'center',
                }}
              >
                <ActivityIndicator color={'gold'} size={rv(20)} />

                <CustomText
                  style={{
                    fontSize: 15,
                    marginTop: 4,
                    marginLeft: 5,
                    color: 'grey',
                  }}
                  textType='semi-bold'
                >
                  Processing file... Please wait
                </CustomText>

                {/* <Icon
              name='close'
              size={15}
              style={{
                marginLeft: 20,
              }}
              color='#FFD700'
            /> */}
              </View>
            </TouchableOpacity>
          ) : null}

          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <CustomText
              style={{
                fontSize: 14,
                marginRight: 10,
                marginTop: 5,
                color: '#696969',
              }}
              textType='bold'
            >
              {t("PostTopic_relatedTopics")}
            </CustomText>

            <WarnInfoSVG />
          </View>
          <SelectInterests interest={interest} setInterest={setInterest} />

          {selectedFile && (
            <CustomButton
              label={t("PostTopic_prevbtn")}
              buttonTheme='secondary'
              onPress={() => openPreview()}
            />
          )}

          <CustomButton
            label={t("PostTopic_postbtn")}
            buttonTheme='primary'
            onPress={() => handleSubmitPost()}
            loading={loading}
          />
        </View>
        </SafeAreaView>
      </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  attachmentBox: {
    borderRadius: 40,
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
    fontSize: 25,
    color: '#333333',
    fontWeight: 'bold',
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  signup: {
    height: 60,
    borderColor: '#D0CFD0',
    borderWidth: 1,
    borderRadius: 40,
    paddingLeft: 20,
    backgroundColor: '#ffffff',
    marginBottom: 15,
    borderStyle: 'solid',
    marginTop: 10,
  },
  replycomment: {
    flex: 1,
    flexDirection: 'row',
    height: 45,
    borderColor: '#D0CFD0',
    borderWidth: 1,
    borderRadius: 40,
    paddingLeft: 20,
    backgroundColor: '#D1D1D1',
    marginBottom: 15,
    borderStyle: 'solid',
    marginTop: 10,
    position: 'relative',
  },
  reply: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-around',
    borderColor: '#D0CFD0',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 20,
    backgroundColor: '#ffffff',
    marginBottom: 15,
    borderStyle: 'solid',
    marginTop: 10,
  },
  itemList: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#ffffff',
    paddingTop: hp('2%'),
    borderRadius: 20,
    margin: 20,
  },
  testItems: {
    flex: 1,
    flexDirection: 'row',
    height: 60,
    borderColor: '#C2C2C2',
    borderWidth: 0.5,
    borderRadius: 5,
    paddingLeft: 20,
    backgroundColor: '#FBFBFB',
    marginBottom: 10,
    paddingTop: hp('2%'),
  },
  testItemsTitle: { width: wp('62%'), paddingTop: hp('0.8%') },
  medicalinput: {
    height: 50,
    borderColor: '#f8f8fa',
    borderWidth: 2,
    marginBottom: 20,
    borderRadius: 33,
    paddingLeft: 20,
    backgroundColor: '#f0f0f0',
  },
  medicalinputarea: {
    height: 120,
    borderColor: '#f8f8fa',
    borderWidth: 2,
    marginBottom: 20,
    borderRadius: 33,
    paddingLeft: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'flex-start',
  },
  icontext: {
    paddingTop: 30,
    color: 'gray',
    fontSize: 18,
    fontWeight: '200',
    textAlign: 'center',
    fontFamily: 'Segoe UI',
  },
  profilename: {
    fontFamily: 'Segoe UI',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 27,
  },
  touchbtn: {
    backgroundColor: 'purple',
    height: 50,
    width: 150,
    borderColor: 'purple',
    borderWidth: 2,
    borderRadius: 33,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
  },
  consultview: {
    flex: 1,
    width: 500,
    flexDirection: 'row',
    alignItems: 'stretch',
    borderStyle: 'solid',
    borderBottomColor: '#F8F8F8',
    borderBottomWidth: 2,
    paddingTop: 10,
    marginLeft: 16,
    paddingBottom: 10,
  },
  medicalview: {
    flex: 1,
    flexDirection: 'column',
    borderStyle: 'solid',
    paddingTop: 10,
    marginLeft: 16,
    marginRight: 17,
  },
  scheduleview: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'stretch',
    marginLeft: 16,
    marginRight: 17,
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
  },
  image: {
    width: 400,
    height: 481,
    // marginVertical: 12,
  },
  text: {
    color: '#707070',
    textAlign: 'center',
    fontSize: 18,
    width: '87%',
    fontFamily: 'Helvetica',
  },
  splashbtn: {
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    height: 60,
    width: 250,
    borderColor: 'black',
    borderWidth: 2,
    marginTop: 1,
    marginBottom: 20,
    borderRadius: 30,
    paddingTop: 25,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 14,
    textAlign: 'center',
    color: 'gold',
    display: 'flex',
    marginLeft: 20,
    marginRight: 20,
  },
  titleAccount: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  tabStyle: {},
  scrollStyle: {
    backgroundColor: 'white',
    paddingLeft: 65,
    paddingRight: 65,
    // justifyContent: 'center',
  },
  tabBarTextStyle: {
    fontSize: 14,
    fontWeight: 'normal',
  },
  underlineStyle: {
    height: 3,
    backgroundColor: 'red',
    borderRadius: 3,
    width: 15,
  },
  topbar: {
    flexDirection: 'row',
    backgroundColor: 'dimgray',
    paddingTop: 15,
  },
  trigger: {
    padding: 5,
    margin: 5,
  },
  triggerText: {
    color: 'white',
  },
  disabled: {
    color: '#ccc',
  },
  divider: {
    marginVertical: 5,
    marginHorizontal: 2,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  logView: {
    flex: 1,
    flexDirection: 'column',
  },
  logItem: {
    flexDirection: 'row',
    padding: 8,
  },
  slideInOption: {
    padding: 5,
  },
  bottom: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  touchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
  floatingButtonStyle: {
    resizeMode: 'contain',
    width: '125%',
    height: '125%',
    //backgroundColor:'black'
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  profile: {
    height: 60,
    borderColor: '#C2C2C2',
    borderWidth: 0.5,
    borderRadius: 5,
    paddingLeft: 20,
    backgroundColor: '#FBFBFB',
    marginBottom: 10,
  },
  topicStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#f6f6f6',
    paddingTop: 20,
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 15,
  },
  label: {
    marginVertical: 5,
  },
});

export default PostTopic;
