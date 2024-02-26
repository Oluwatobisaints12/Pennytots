import { View, TouchableOpacity, StyleSheet } from 'react-native';
import React, { FunctionComponent, useEffect, useState } from 'react';
import Avatar from 'app/components/elements/Avater';
import { CustomText } from 'app/components/elements/Text';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import { userId } from 'app/redux/user/reducer';
import ReportDialog from 'app/components/dialogs/report';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Axios } from 'app/api/axios';
import { ShowAlert } from 'app/providers/toast';
import { timeAgo } from 'app/helpers/time-ago';
import { responsiveValue as rv } from 'app/providers/responsive-value';
import MenuSVG from 'app/assets/svg/menu.svg';
import { useTranslation } from 'react-i18next';
interface ChatProps {
  item: any;
  navigation: any;
  refreshFunction?: () => {};
}

export const ChatCard: FunctionComponent<ChatProps> = ({
  item,
  navigation,
  refreshFunction,
}) => {
  const { SlideInMenu } = renderers;

  const myId = useSelector(userId);

  const [showReportDialog, setShowReportDialog] = useState(false);
  const [reportDetails, setReportDetails] = useState({});
  const { t } = useTranslation();

  function openReportDetails(item: any) {
    setReportDetails({ data: item, type: 'user' });
    setShowReportDialog(true);
  }

  async function removeFromList(accountId: string) {
    await Axios({
      method: 'patch',
      url: '/chats/remove-from-chat/' + accountId,
      data: {},
    }).then((response: any) => {
      ShowAlert({
        type: 'success',
        className: 'Success',
        message: response.data.message,
      });
      refreshFunction!();
    });
  }

  async function blockUser(accountId: string) {
    await Axios({
      method: 'patch',
      url: '/chats/block/' + accountId,
      data: {},
    }).then((response: any) => {
      ShowAlert({
        type: 'success',
        className: 'Success',
        message: response.data.message,
      });
      refreshFunction!();
    });
  }

  async function unBlockUser(accountId: string) {
    await Axios({
      method: 'patch',
      url: '/chats/unblock/' + accountId,
      data: {},
    }).then((response: any) => {
      ShowAlert({
        type: 'success',
        className: 'Success',
        message: response.data.message,
      });
      refreshFunction!();
    });
  }

  function muteNotification(item: {
    _id: string;
    muted?: boolean;
    accountId: AccountProfileProp;
  }) {
    Axios({
      method: 'post',
      url: '/app/mute-notifications/',
      data: {
        contentId: item.accountId._id,
        type: 'user',
        action: item.muted ? 'unmute' : 'mute',
      },
    }).then((response: any) => {
      ShowAlert({
        type: 'success',
        className: 'Success',
        message: 'User has been muted successfully',
      });
      refreshFunction!();
    });
  }




  useEffect(() => {
    console.log('item', item);
  }, [item]);


  return (
    <TouchableOpacity
      style={styles.topicStyle}
      onPress={() =>
        navigation.push('Common', {
          screen: 'private-chat',
          params: {
            userDetails: item.accountId,
          },
        })
      }
    >
      <ReportDialog
        show={showReportDialog}
        setShow={setShowReportDialog}
        reportDetails={reportDetails}
      />
      <View style={{ width: '20%' }}>
        <View style={{ paddingHorizontal: 8 }}>
          <Avatar source={item?.accountId?.profile_picture} size={rv(35)} />
        </View>
      </View>
      <View style={{ width: '80%' }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            marginBottom: 5,
          }}
        >
          <View style={{ width: '60%' }}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Common', {
                  screen: 'private-chat',
                  params: {
                    userDetails: item.accountId,
                  },
                })
              }
            >
              {item &&
                item.accountId &&
                item.accountId.first_name + item.accountId.last_name.length >
                12 ? (
                <CustomText
                  style={{
                    color: 'black',
                    fontSize: rv(15),
                  }}
                  textType='bold'
                >
                  {item.accountId.first_name +
                    ' ' +
                    item.accountId.last_name.slice(0, 12)}
                  ...
                </CustomText>
              ) : (
                <CustomText
                  style={{
                    color: 'black',
                    fontSize: rv(16),
                  }}
                  textType='bold'
                >
                  {item.accountId
                    ? item.accountId.first_name + ' ' + item.accountId.last_name
                    : null}
                </CustomText>
              )}
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '35%',
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              flexWrap: 'nowrap',
              flexDirection: 'row',
              paddingLeft: rv(10),
            }}
          >
            {item.lastMessageDate ? (
              <CustomText
                style={{
                  fontSize: hp('1.5%'),
                  color: '#9D9D9D',
                  marginTop: 5,
                  flexWrap: 'nowrap',
                }}
              >

                {timeAgo(item.lastMessageDate)}
              </CustomText>
            ) : null}
          </View>
          <Menu
            renderer={SlideInMenu}
            // onSelect={(value) => {
            //   //onMenuClicked(value)
            // }}
          >
            <MenuTrigger>
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

            </MenuTrigger>

            <MenuOptions
              customStyles={{
                optionText: [styles.text],
                optionsContainer: [
                  {
                    borderRadius: 15,
                  },
                ],
              }}
            >
              <View
                style={{
                  margin: 5,
                  flexDirection: 'column',
                  marginVertical: 10,
                  padding: 15,
                }}
              >
                <MenuOption
                  onSelect={() => {
                    removeFromList(item.accountId._id);
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
                      {/* <Icon name='flag' size={20} /> */}
                    </View>
                    <CustomText style={{ color: 'black' }}>
                      {t("convos_SubMenu")}
                    </CustomText>
                  </View>
                </MenuOption>

                <MenuOption
                  onSelect={() => {
                    if (item.blocked && item.blocked.includes(myId)) {
                      unBlockUser(item.accountId._id);
                    } else {
                      blockUser(item.accountId._id);
                    }
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
                      {/* <Icon name='flag' size={20} /> */}
                    </View>

                    <CustomText style={{ fontSize: 14 }}>
                      {item.blocked && item.blocked.includes(myId)
                        ? t('BlockedChats_opt1')
                        : t('Chats_blockUser')}
                    </CustomText>
                  </View>
                </MenuOption>

                <MenuOption
                  onSelect={() => {
                    muteNotification(item);
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
                      {/* <Icon name='flag' size={20} /> */}
                    </View>

                    <CustomText style={{ fontSize: 14 }}>
                      {item.muted ? 'Unmute User' : 'Mute User'}
                    </CustomText>
                  </View>
                </MenuOption>

                <MenuOption
                  onSelect={() => {
                    openReportDetails(item.accountId._id);
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
                      {/* <Icon name='flag' size={20} /> */}
                    </View>
                    <CustomText style={{ fontSize: 14 }}>
                      {t("Chats_reportUser")}
                    </CustomText>
                  </View>
                </MenuOption>
              </View>
            </MenuOptions>
          </Menu>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
          }}
        >
          <View
            style={{
              width: '100%',
              height: 20,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <CustomText
              ellipsizeMode='tail'
              style={{
                color: '#636363',
                fontSize: rv(12.5),
              }}
            >
              {item?.lastMessage?.slice(0, 17)}{item?.lastMessage?.length > 17 ? '...' : ''}

            </CustomText>
            {item.unreadMessages ? (
              <View
                style={{
                  width: 20,
                  height: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'black',
                  marginRight: 10,
                  borderRadius: 20,
                }}
              >
                <CustomText style={{ color: '#FCCB1F', fontWeight: 'bold' }}>
                  {item.unreadMessages}
                </CustomText>
              </View>
            ) : null}
          </View>
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
    fontSize: 16,
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
    fontSize: 16,
    width: '87%',
    fontFamily: 'Helvetica',
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
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    paddingTop: 5,
    padding: 20,
  },
});
