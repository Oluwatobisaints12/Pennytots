import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  TextInput,
  ScrollView,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { CustomButton, CustomText } from 'app/components/elements';
import HeaderTitle from 'app/components/HeaderTitle';
import Avatar from 'app/components/elements/Avater';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
import { Axios } from 'app/api/axios';
import { useSelector } from 'react-redux';
import { userId } from 'app/redux/user/reducer';
import { ShowAlert } from 'app/providers/toast';
import { timeAgo } from 'app/helpers/time-ago';
import { useTranslation } from 'react-i18next';

type BlockedScreenProps = {
  navigation: any;
};

const BlockChats: React.FC<BlockedScreenProps> = ({ navigation }) => {
  const [chatList, setChatList] = useState([]);
  const { SlideInMenu } = renderers;
  const { t } = useTranslation();

  const myId = useSelector(userId);

  useEffect(() => {
    getChats();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      function onfocus() {
        getChats();
      }

      onfocus();
    }, [])
  );

  async function blockUser(accountId: string) {
    await Axios({
      method: 'patch',
      url: '/chats/block/' + accountId,
      data: {},
    }).then((response) => {
      ShowAlert({
        type: 'success',
        className: 'Success',
        message: response.data.message,
      });
      getChats();
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
      getChats();
    });
  }

  async function getChats() {
    await Axios({
      method: 'get',
      url: '/chats/my-chats/?blocked=true',
    }).then((response: any) => {
      setChatList(response.data.chats.docs);
    });
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}
    >
      <ScrollView style={{ backgroundColor: '#ffffff' }}>
        <HeaderTitle title={t('Settings_blockedChats')} navigation={navigation} />

        <FlatList
          data={chatList}
          keyExtractor={({ _id }, index) => _id}
          renderItem={({ item }: any) => {
            return (
              <TouchableOpacity
                style={styles.topicStyle}
                onPress={() =>
                  navigation.navigate('otherscreens', {
                    screen: 'chatpage',
                    params: {
                      userDetails: item.accountId,
                    },
                  })
                }
              >
                <View style={{ width: '20%' }}>
                  <View>
                    <Avatar
                      source={item.accountId.profile_picture}
                      size={hp('6%')}
                    />
                  </View>
                </View>
                <View style={{ width: '80%' }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      marginBottom: 10,
                    }}
                  >
                    <View style={{ width: '60%' }}>
                      <Text
                        onPress={() =>
                          navigation.navigate('otherscreens', {
                            screen: 'chatpage',
                            params: {
                              userDetails: item.accountId,
                            },
                          })
                        }
                        style={{
                          color: 'black',
                          fontWeight: 'bold',
                          fontSize: 19,
                        }}
                      >
                        {item &&
                        item.accountId &&
                        item.accountId.first_name +
                          item.accountId.last_name.length >
                          12 ? (
                          <CustomText>
                            {item.accountId.first_name +
                              ' ' +
                              item.accountId.last_name.slice(0, 12)}
                            ...
                          </CustomText>
                        ) : (
                          <CustomText>
                            {item.accountId
                              ? item.accountId.first_name +
                                ' ' +
                                item.accountId.last_name
                              : null}
                          </CustomText>
                        )}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: '35%',
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                        flexWrap: 'nowrap',
                        flexDirection: 'row',
                        paddingLeft: 20,
                      }}
                    >
                      {item.lastMessageDate ? (
                        <CustomText
                          style={{
                            fontSize: hp('1.5%'),
                            color: '#9D9D9D',
                            marginTop: 7,
                            flexWrap: 'nowrap',
                          }}
                        >
                          {timeAgo(item.lastMessageDate)}
                        </CustomText>
                      ) : null}
                    </View>
                    <Menu
                      renderer={SlideInMenu}
                      // onSelect={(value) => onMenuClicked(value)}
                    >
                      <MenuTrigger>
                        <FontAwesome
                          name={'ellipsis-v'}
                          size={22}
                          style={{
                            marginHorizontal: 5,
                            width: 4,
                            height: 23,
                            marginTop: 3,
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
                              }}
                            >
                              <View
                                style={{
                                  marginRight: 10,
                                }}
                              >
                                <FontAwesome name='flag' size={20} />
                              </View>

                              <CustomText
                                style={{ color: 'red', fontSize: 20 }}
                              >
                                {item.blocked && item.blocked.includes(myId)
                                  ? t('BlockedChats_opt1')
                                  : t('Chats_blockUser')}
                              </CustomText>
                            </View>
                          </MenuOption>

                          <MenuOption
                            onSelect={() => {
                              // openReportDetails(item.accountId._id);
                            }}
                          >
                            <View
                              style={{
                                flexDirection: 'row',
                                width: '100%',
                                alignItems: 'center',
                              }}
                            >
                              <View
                                style={{
                                  marginRight: 10,
                                }}
                              >
                                <FontAwesome name='flag' size={20} />
                              </View>
                              <CustomText
                                style={{ color: 'red', fontSize: 20 }}
                              >
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
                        numberOfLines={10}
                        ellipsizeMode='tail'
                        style={{
                          fontSize: 16,
                          color: '#636363',
                          lineHeight: 20,
                          fontWeight: '800',
                        }}
                      >
                        {item.lastMessage}
                      </CustomText>
                      {item.unreadMessages ? (
                        <View
                          style={{
                            width: 25,
                            height: 25,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'black',
                            borderRadius: 25,
                          }}
                        >
                          <CustomText
                            style={{ color: '#FCCB1F', fontWeight: 'bold' }}
                          >
                            {item.unreadMessages}
                          </CustomText>
                        </View>
                      ) : null}
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
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
    paddingTop: 30,
    fontWeight: '200',
    fontFamily: 'Segoe UI',
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
  title: {
    textAlign: 'center',
    marginVertical: 8,
    fontSize: 25,
    color: '#333333',
    fontWeight: 'bold',
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
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 20,
    padding: 20,
  },
});
export default BlockChats;
