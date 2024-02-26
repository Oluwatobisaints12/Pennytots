import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Image } from 'expo-image';
// import FastImage from 'react-native-fast-image';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
import Ionicons from '@expo/vector-icons/Ionicons';
import ReportDialog from 'app/components/dialogs/report';
import Document from 'app/components/attachments/Document';
import Audio from 'app/components/attachments/Audio';
import Video from 'app/components/attachments/Video';
import { CustomText } from '../elements/Text';
import { useSelector } from 'react-redux';
import { userId, userToken } from 'app/redux/user/reducer';
import Avatar from 'app/components/elements/Avater';
import { main, topic } from 'app/api';
import { ShowAlert } from 'app/providers/toast';
import { triggerStyles } from 'app/assets/styles/MenuStyles';
import ThumbSVG from 'app/assets/svg/thumb.svg';
import CommentSVG from 'app/assets/svg/comment.svg';
import { timeAgo } from 'app/helpers/time-ago';
import MenuSVG from 'app/assets/svg/menu.svg';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  FunctionComponent,
} from 'react';
import FollowButton from '../elements/FollowButton';
import { IsLoggedIn, userAuthInfo } from 'app/redux/user/reducer';
import { logout } from 'app/redux/user/hooks';
import { useTranslation } from 'react-i18next';

export type TopicProps = {
  navigation: any;
  item?: any;
  convo?: boolean;
  refreshFunction?: () => void;
};

export const TopicCard: FunctionComponent<TopicProps> = ({
  item,
  navigation,
  convo = false,
  refreshFunction,
}) => {
  const isLoggedIn = useSelector(IsLoggedIn);
  const Id = useSelector(userId);
  const token = useSelector(userToken);
  const userAuth = useSelector(userAuthInfo);
  const { t } = useTranslation();

  //

  const myId = useSelector(userId);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [reportDetails, setReportDetails] = useState({});
  const { SlideInMenu } = renderers;
  const [isLiked, setIsLiked] = useState(false);
  const [numLikes, setNumLikes] = useState(0);
  const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

  //
  useEffect(() => {
    if (item.isLiked && item.likes) {
      setIsLiked(item.isLiked);
      setNumLikes(item.likes);
    }

    console.log(JSON.stringify(item.image), '==see topic content');
  }, [item]);

  function handleLike() {
    setIsLiked(!isLiked);
    setNumLikes(isLiked ? numLikes - 1 : numLikes + 1);

    topic
      .likeTopic(item._id)
      .then((data) => {
        refreshFunction!();
      })
      .catch((err) => {
        setIsLiked(!isLiked);
        setNumLikes(isLiked ? numLikes + 1 : numLikes - 1);
      });
  }

  async function removeFromConversation() {
    topic.removeFromConvos(item._id).then((data) => {
      console.log(data);
      ShowAlert({
        type: 'info',
        className: 'Success',
        message: 'Removed Successfully',
      });
      refreshFunction!();
    });
  }

  function muteNotification() {
    let payload = {
      contentId: item._id,
      type: 'topic',
      action: item.muted ? 'unmute' : 'mute',
    };

    main.muteNotifications(payload).then((data) => {
      console.log(data);
      ShowAlert({
        type: 'info',
        className: 'Success',
        message: 'Muted Successfully',
      });
      refreshFunction!();
    });
  }

  function openReportDetails(item: any, type: string) {
    setReportDetails({ data: item, type });
    setShowReportDialog(true);
  }

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Common', {
          screen: 'view-topic',
          params: {
            postid: item._id,
          },
        })
      }
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: 'white',
        paddingVertical: 20,
        borderBottomColor: '#EBEBEB',
        borderBottomWidth: 1,
      }}
    >
      <ReportDialog
        show={showReportDialog}
        setShow={setShowReportDialog}
        reportDetails={reportDetails}
      />

      <View style={{ width: '20%', justifyContent: 'flex-end' }}>
        <TouchableOpacity
          style={{
            alignItems: 'flex-end',
          }}
          onPress={() => {
            if (item?.userId?._id != myId) {
              navigation.navigate('Common', {
                screen: 'private-chat',
                params: {
                  userDetails: item?.userId,
                },
              });
            }
          }}
        >
          <View style={{ marginBottom: 10, marginLeft: 10, marginRight: 15 }}>
            <Avatar source={item?.userId?.profile_picture} size={50} />
          </View>
        </TouchableOpacity>
      </View>

      <View style={{ width: '80%', flexDirection: 'column' }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginRight: wp('5%'),
          }}
        >
          <View
            style={{
              flexDirection: 'row',
            }}
          >
            <TouchableOpacity
              style={{
                width: '50%',
                
                justifyContent: 'center'
              }}
              onPress={() => {
                if (item?.userId?._id != myId) {
                  navigation.navigate('Common', {
                    screen: 'private-chat',
                    params: {
                      userDetails: item?.userId,
                    },
                  });
                }
              }}
            >
              <CustomText
                adjustsFontSizeToFit={true}
                numberOfLines={1}
                ellipsizeMode='tail'
                style={{
                  color: '#000000',
                  fontSize: 13,
                  flexWrap: 'nowrap'
                }}
                textType='bold'
              >
                {`${item?.userId?.first_name} ${item?.userId?.last_name}`.slice(
                  0,
                  12
                ) +
                  (item?.userId?.first_name?.length +
                    item?.userId?.last_name?.length >
                  12
                    ? '...'
                    : '')}
              </CustomText>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={{
            }}
            >
              {myId !== item?.userId?._id && (
                <FollowButton userId={item.userId?._id}/>
              )}
            </TouchableOpacity>
              
        
          </View>

          <View
            style={{
              alignItems: 'center',
              justifyContent: 'flex-end',
              flexWrap: 'nowrap',
              flexDirection: 'row',
            }}
          >
            <Menu
              renderer={SlideInMenu}
              // onSelect={(value) => {
              //   //onMenuClicked(value)
              // }}
            >
              <MenuTrigger
              // customStyles={triggerStyles}
              >
                <View
                  style={{
                    alignItems: 'flex-end',
                    flexDirection: 'row',
                    
                  }}
                >
                  <MenuSVG
                    width={20}
                    style={{
                      width: 20,
                      height: 25,
                    }}
                  />
                </View>
              </MenuTrigger>
              <MenuOptions
                customStyles={{
                  optionText: [styles.text],
                  optionsContainer: [
                    {
                      borderTopLeftRadius: 15,
                      borderTopRightRadius: 15,
                    },
                  ],
                }}
              >
                <View
                  style={{
                    margin: 5,
                    flexDirection: 'column',
                    marginVertical: 10,
                    padding: 10,
                  }}
                >
                  {myId == item?.userId?._id ? (
                    <MenuOption
                      onSelect={() => {
                        navigation.navigate('Common', {
                          screen: 'edit-topic',
                          params: {
                            topicData: item,
                          },
                        });
                      }}
                    >
                      <View
                        style={{
                          flexDirection: 'row',
                          width: '100%',
                          alignItems: 'center',
                          marginHorizontal: 10,
                        }}
                      >
                        <View
                          style={{
                            marginRight: 10,
                          }}
                        >
                          {/* Possibly an icon or content here */}
                        </View>
                        <CustomText style={{ color: 'black', fontSize: 15 }}>
                          {t('Topics_editTopic')}
                        </CustomText>
                      </View>
                    </MenuOption>
                  ) : null}

                  <MenuOption
                    onSelect={() => {
                      muteNotification();
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '100%',
                        alignItems: 'center',
                        marginHorizontal: 10,
                      }}
                    >
                      <View
                        style={{
                          marginRight: 10,
                        }}
                      >
                        {/* Possibly an icon or content here */}
                      </View>
                      <CustomText style={{ color: 'black', fontSize: 15 }}>
                        {item.muted ? 'Unmute Topic' : t("Topics_muteTopic")}
                      </CustomText>
                    </View>
                  </MenuOption>
                  {convo ? (
                    <MenuOption
                      onSelect={() => {
                        removeFromConversation();
                      }}
                    >
                      <View
                        style={{
                          flexDirection: 'row',
                          width: '100%',
                          alignItems: 'center',
                          marginHorizontal: 10,
                        }}
                      >
                        <View
                          style={{
                            marginRight: 10,
                          }}
                        >
                          <Ionicons name='flag' size={20} />
                        </View>
                        <CustomText style={{ color: 'black', fontSize: 15 }}>
                          {t("convos_SubMenu")}
                        </CustomText>
                      </View>
                    </MenuOption>
                  ) : null}

                  <MenuOption
                    onSelect={() => {
                      openReportDetails(item, 'topic');
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '100%',
                        alignItems: 'center',
                        marginHorizontal: 10,
                      }}
                    >
                      <View
                        style={{
                          marginRight: 10,
                        }}
                      >
                        <Ionicons name='flag' size={20} />
                      </View>
                      <CustomText style={{ color: 'black', fontSize: 15 }}>
                        {t("Topics_flag")}
                      </CustomText>
                    </View>
                  </MenuOption>
                </View>
              </MenuOptions>
            </Menu>
          </View>
        </View>
        <View
          style={{
            alignItems: 'flex-start',
          }}
        >
          <CustomText
            adjustsFontSizeToFit={true}
            numberOfLines={1}
            style={{
              fontSize: 14,
              color: '#9D9D9D',
              flexWrap: 'nowrap',
            }}
          >
            {timeAgo(item.createdAt)}
          </CustomText>
        </View>
        <View
          style={{
            marginRight: wp('5%'),
      
          }}
        >
          <View
            style={{
              flexDirection: 'column',
        
            }}
          >
            <CustomText
              style={{
                color: '#636363',
                lineHeight: 20,
              }}
            >
              {item.content}
            </CustomText>

            {item.image ? (
              <TouchableOpacity
                style={{
                  
                  flex: 1,
                  width: '100%',
                }}
                onPress={() =>
                  navigation.push('Common', {
                    screen: 'fullscreen-image',
                    params: {
                      image: item.image,
                    },
                  })
                }
              >
                <Image
                  style={{
                    width: '100%',
                    height: hp('30%'),
                    borderRadius: wp('2%'),
                    borderColor: 'white',
                    borderWidth: wp('0.6%'),
                    marginTop: 8,
                  }}
                  source={item.image}
                  placeholder={blurhash}
                  contentFit='cover'
                  transition={1000}
                />
              </TouchableOpacity>
            ) : null}
            {item.audio ? (
              <View style={styles.attachment}>
                <Audio
                  attachmentSize={item.attachmentSize}
                  link={item.audio}
                  navigation={navigation}
                />
              </View>
            ) : null}

            {item.video ? (
              <View style={styles.attachment}>
                <Video
                  attachmentSize={item.attachmentSize}
                  link={item.video}
                  navigation={navigation}
                />
              </View>
            ) : null}

            {item.document ? (
              <View style={styles.attachment}>
                <Document
                  attachmentSize={item.attachmentSize}
                  link={item.document}
                  navigation={navigation}
                />
              </View>
            ) : null}
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            marginRight: wp('5%'),
            justifyContent: 'space-between',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CommentSVG
              width={20}
              color={'#9D9D9D'}
              style={{
                marginRight: 5,
              }}
            />

            <CustomText
              style={{
                color: '#9D9D9D',
                marginLeft: 3,
                fontSize: 13,
                paddingTop: 6,
              }}
            >
              {item.noOfComments} {t('Topic_Comments')}
              {item.noOfComments > 1 ? 's' : ''}
            </CustomText>
          </View>

          <TouchableOpacity
            onPress={() => handleLike()}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ThumbSVG width={20} color={isLiked ? '#E64028' : '#9D9D9D'} />

            <CustomText
              style={{
                fontSize: 13,
                marginLeft: 5,
                marginRight: 40,
                marginTop: 4,
                color: isLiked ? '#E64028' : '#9D9D9D',
              }}
            >
              {numLikes} {t('comments_likes')}{numLikes > 1 ? 's' : ''}
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  attachment: {
    marginVertical: 5,
    width: wp('68%'),
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
    width: 300,
    height: 481,
    // marginVertical: 12,
  },
  text: {
    color: '#707070',
    // textAlign: 'center',
    fontSize: wp('4%'),
    width: '87%',
    fontFamily: 'Helvetica',
    marginLeft: wp('4%'),
  },
  wrapperText: {
    color: '#707070',
    // textAlign: 'center',
    fontSize: wp('4%'),
    width: '87%',
    fontFamily: 'Helvetica',
    // marginVertical: hp('1%')
    // marginLeft: wp('1%')
  },
  splashbtn: {
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    height: 60,
    width: 300,
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
    paddingLeft: 10,
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 15,
  },
});

export default TopicCard;
