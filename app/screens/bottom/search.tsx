import { useFocusEffect } from '@react-navigation/native';

import { BackHandler } from 'react-native';
import React, { useState, useEffect } from 'react';
import {
  TextInput,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Share,
  FlatList,
} from 'react-native';
// import AppIntroSlider from 'react-native-app-intro-slider';
// import AsyncStorage from '@react-native-community/async-storage';
// import { SearchBar, BottomSheet } from 'react-native-elements';
// import ActionButton from 'react-native-action-button';
// import PhoneInput from 'react-native-phone-number-input';
import Loader from 'app/components/elements/Loader';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { CustomText } from 'app/components/elements';
import { default as themeFont } from 'app/assets/themes/fonts.json';
import { TopicCard } from 'app/components/cards/topics';
import Group from 'app/components/cards/group';
import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
import moment from 'moment';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ReportDialog from 'app/components/dialogs/report';
//import EmptySearchScreen from 'app/co/EmptySearchScreen';
import SelectDropdown from 'react-native-select-dropdown';
import { useSelector } from 'react-redux';
import { Axios } from 'app/api/axios';
import { userId, userToken } from 'app/redux/user/reducer';
import { SearchCommentCard } from '../../components/cards/search-comments';
import MenuSVG from 'app/assets/svg/menu.svg';
import { useTranslation } from 'react-i18next';

function Search({ navigation }: any) {
  const myId = useSelector(userId);

  const { SlideInMenu } = renderers;
  // const { ContextMenu, SlideInMenu, Popover } = renderers;
  const onShare = async (message: string, image: string) => {
    try {
      const result = await Share.share({
        message: message,
        url: image,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      //  alert(error.message);
    }
  };

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [chats, setChats] = useState([]);
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [comments, setComments] = useState([]);
  const [subComments, setSubComments] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [tabIndex, setTabIndex] = useState(0);

  const [showReportDialog, setShowReportDialog] = useState(false);
  const [reportDetails, setReportDetails] = useState({});
  const [totalResults, setTotalResults] = useState(0);
  const { t } = useTranslation();
  const filterTypes = [
    t('Search_users'),
    t('Search_chats'),
    t('Search_groups'),
    t('Search_topics'),
    t('Search_comments'),
    t('Search_subComments'),
  ];
  const wait = (timeout: number) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    const backAction = () => {
      navigation.navigate('Home');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      function reloadPage() {
        LoadTopics(true);
      }

      reloadPage();
    }, [])
  );

  function LoadTopics(loader: boolean) {
    if (searchInput !== '') {
      if (loader) {
        setLoading(true);
      }
      let searchType = '';
      if (tabIndex === 0) {
        searchType = 'users';
      } else if (tabIndex === 1) {
        searchType = 'chats';
      } else if (tabIndex === 2) {
        searchType = 'groups';
      } else if (tabIndex === 3) {
        searchType = 'topics';
      } else if (tabIndex === 4) {
        searchType = 'topic-comments';
      } else if (tabIndex === 5) {
        searchType = 'topic-sub-comments';
      }

      Axios({
        method: 'POST',
        url: '/app/search?page=1&limit=50',
        data: {
          search: searchInput,
          searchType: searchType,
        },
      })
        .then((response: any) => {
          if (tabIndex === 0) {
            setUsers(response.data.users.docs);
            setTotalResults(response.data.users.totalDocs);
          } else if (tabIndex === 1) {
            setChats(response.data);
            setTotalResults(response.data.length);
          } else if (tabIndex === 2) {
            setGroups(response.data.groups.docs);
            setTotalResults(response.data.groups.totalDocs);
          } else if (tabIndex === 3) {
            setData(response.data.topics.docs);
            setTotalResults(response.data.topics.totalDocs);
          } else if (tabIndex === 4) {
            setComments(response.data.topicComments.docs);
            setTotalResults(response.data.topicComments.totalDocs);
          } else if (tabIndex === 5) {
            setSubComments(response.data.topicComments.docs);
            setTotalResults(response.data.topicComments.totalDocs);
          }
        })
        .finally(() => {
          if (loader) {
            setLoading(false);
          }
        });
    }

    // }, 10000);

    // return () => clearInterval(interval);
  }

  //DISPLAY POSTS
  useEffect(() => {
    LoadTopics(true);
  }, [refreshing, tabIndex, searchInput]);

  function openReportDetails(item: any, type: string) {
    setReportDetails({ data: item, type });
    setShowReportDialog(true);
  }

  return (
    <View
      style={{
        paddingHorizontal: 10,
        backgroundColor: 'white',
        width: '96%',
        flex: 1,
      }}
    >
      <ReportDialog
        show={showReportDialog}
        setShow={setShowReportDialog}
        reportDetails={reportDetails}
      />

      <View
        style={{
          paddingHorizontal: 4,
        }}
      >
        <View
          style={{
            marginVertical: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            paddingBottom: 5,
          }}
        >
          <View style={styles.searchSection}>
            <FontAwesome
              style={styles.searchIcon}
              name='search'
              size={20}
              color='#A9B5C0'
            />
            <TextInput
              style={styles.input}
              placeholder={t('Search_searchText')}
              onChangeText={(text) => {
                setSearchInput(text);
              }}
              value={searchInput}
              underlineColorAndroid='transparent'
            />
          </View>

          <SelectDropdown
            data={filterTypes}
            onSelect={(selectedItem: any, index: number) => {
              setTabIndex(index);
            }}
            renderDropdownIcon={(isOpened: boolean) => {
              return <FontAwesome name='sliders' size={20} color='gray' />;
            }}
            dropdownIconPosition={'left'}
            buttonStyle={{
              width: '30%',
              borderRadius: 2,
              height: '100%',
              backgroundColor: 'white',
              borderColor: 'grey',
              borderWidth: 0.2,
            }}
            buttonTextStyle={{
              fontFamily: 'regular',
              fontSize: 12,
              marginTop: 4,
              color: '#696969',
            }}
            rowTextStyle={{
              fontFamily: 'regular',
              fontSize: 12,
            }}
            defaultButtonText='Filter'
            buttonTextAfterSelection={(selectedItem: any, index: number) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem;
            }}
            dropdownStyle={{
              backgroundColor: 'white',
              borderRadius: 3,
            }}
            rowStyle={{
              height: 37,
              borderBottomColor: 'white',
            }}
            rowTextForSelection={(item: any, index: number) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item;
            }}
          />
        </View>

        {searchInput.trim() ? (
          <View
            style={{
              paddingHorizontal: 5,
              flexDirection: 'row',
              paddingBottom: 8,
            }}
          >
            <CustomText
              style={{
                fontSize: 18,
                color: '#4C5B68',
              }}
              textType='bold'
            >
              {totalResults} {totalResults > 1 ? 'Results' : 'Result'}
            </CustomText>
            <CustomText
              style={{
                fontSize: 18,
                marginLeft: 5,
                color: '#C5CDD9',
              }}
              textType='bold'
            >
              in {filterTypes[tabIndex]}
            </CustomText>
          </View>
        ) : null}

        <FlatList
          data={
            tabIndex === 0
              ? users
              : tabIndex === 1
              ? chats
              : tabIndex === 2
              ? groups
              : tabIndex === 3
              ? data
              : tabIndex === 4
              ? comments
              : tabIndex === 5
              ? subComments
              : null
          }
          keyExtractor={(item: any, index: number) => item._id}
          refreshing={refreshing}
          onRefresh={() => LoadTopics(true)}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  flex: 1,
                }}
              >
                {tabIndex === 0 ? (
                  <TouchableOpacity
                    onPress={() => {
                      if (item._id != myId) {
                        navigation.navigate('Common', {
                          screen: 'private-chat',
                          params: {
                            postid: item.first_name + ' ' + item.last_name,
                            chatuser: item._id,
                            loggedUser: myId,
                            userDetails: item,
                          },
                        });
                      }
                    }}
                    style={{
                      ...styles.topicStyle,
                      padding: 6,
                      // justifyContent: 'center',
                      // alignItems: 'center',
                    }}
                  >
                    <View style={{ width: '20%' }}>
                      <TouchableOpacity
                        onPress={() => {
                          if (
                            item.profile_picture &&
                            item.profile_picture.length > 0
                          ) {
                            navigation.push('Common', {
                              screen: 'fullscreen-image',
                              params: {
                                image: item.profile_picture,
                              },
                            });
                          }
                        }}
                      >
                        <Image
                          //defaultSource= {require('../assets/user.jpg')}
                          source={
                            item.profile_picture &&
                            item.profile_picture.length > 0
                              ? { uri: item.profile_picture }
                              : require('app/assets/user.jpg')
                          }
                          style={{
                            width: wp('15%'),
                            height: hp('7.5%'),
                            borderRadius: wp('7%'),
                            borderColor: 'white',
                            borderWidth: wp('0.6%'),
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                    <View style={{ width: '80%' }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          alignItems: 'flex-start',
                          marginBottom: 10,
                        }}
                      >
                        <View style={{ width: '100%' }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              marginBottom: 4,
                            }}
                          >
                            <CustomText
                              textType='bold'
                              style={{
                                color: 'black',
                                fontSize: 17,
                              }}
                            >
                              {item.last_name.length + item.first_name.length >
                              12 ? (
                                <CustomText>
                                  {item.first_name +
                                    ' ' +
                                    item.last_name.slice(0, 12)}
                                  ...
                                </CustomText>
                              ) : (
                                <CustomText>
                                  {item.first_name + ' ' + item.last_name}
                                </CustomText>
                              )}
                            </CustomText>

                            <Menu
                              renderer={SlideInMenu}
                              // onSelect={(value:any) => onMenuClicked(value)}
                            >
                              <MenuTrigger>
                                <MenuSVG
                                  width={20}
                                  style={{
                                    width: 20,
                                    height: 20,
                                    // marginRight: 15,
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
                                      openReportDetails(item._id, 'user');
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
                                        style={{
                                          color: 'black',
                                        }}
                                      >
                                        {t('Chats_reportUser')}
                                      </CustomText>
                                    </View>
                                  </MenuOption>
                                </View>
                              </MenuOptions>
                            </Menu>
                          </View>

                          {item.bio ? (
                            <CustomText>
                              {t("EditProfile_Bio")}:{' '}
                              {item.bio.length > 18
                                ? item.bio.substring(0, 18) + '...'
                                : item.bio}
                            </CustomText>
                          ) : null}

                          {/* {item.company_position ? (
                            <Text>
                              Company:{' '}
                              {item.company_position.length > 18
                                ? item.company_position.substring(0, 18) +
                                  '...'
                                : item.company_position}
                            </Text>
                          ) : null} */}
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                ) : tabIndex === 1 ? (
                  <TouchableOpacity
                    onPress={() => {
                      if (item._id != myId) {
                        navigation.navigate('Common', {
                          screen: 'private-chat',
                          params: {
                            postid:
                              item.user.first_name + ' ' + item.user.last_name,
                            chatuser: item._id,
                            loggedUser: myId,
                            userDetails: {
                              _id: item._id,
                              first_name: item.user.first_name,
                              last_name: item.user.last_name,
                              profile_picture: item.user?.profile_picture,
                            },
                          },
                        });
                      }
                    }}
                    style={{
                      ...styles.topicStyle,
                      padding: 6,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <View style={{ width: '20%' }}>
                      <TouchableOpacity>
                        <Image
                          //defaultSource= {require('../assets/user.jpg')}
                          source={
                            item.user.profile_picture &&
                            item.user.profile_picture.length > 0
                              ? { uri: item.user.profile_picture }
                              : require('app/assets/user.jpg')
                          }
                          style={{
                            width: wp('15%'),
                            height: hp('7.5%'),
                            borderRadius: wp('7%'),
                            borderColor: 'white',
                            borderWidth: wp('0.6%'),
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                    <View style={{ width: '80%' }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          alignItems: 'flex-start',
                          marginBottom: 10,
                        }}
                      >
                        <View style={{ width: '100%' }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              marginBottom: 4,
                            }}
                          >
                            <CustomText
                              textType='bold'
                              style={{
                                color: 'black',
                                fontSize: 15,
                              }}
                            >
                              {item.user.last_name.length +
                                item.user.first_name.length >
                              12 ? (
                                <CustomText>
                                  {item.user.first_name +
                                    ' ' +
                                    item.user.last_name.slice(0, 12)}
                                  ...
                                </CustomText>
                              ) : (
                                <CustomText>
                                  {item.user.first_name +
                                    ' ' +
                                    item.user.last_name}
                                </CustomText>
                              )}
                            </CustomText>

                            <Menu
                              renderer={SlideInMenu}
                              // onSelect={(value) => onMenuClicked(value)}
                            >
                              <MenuTrigger>
                                <MenuSVG
                                  width={20}
                                  style={{
                                    width: 20,
                                    height: 20,
                                    // marginRight: 15
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
                                      openReportDetails(item._id, 'user');
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
                                        style={{
                                          color: 'black',
                                          fontSize: 15,
                                        }}
                                      >
                                       {t("Chats_reportUser")}
                                      </CustomText>
                                    </View>
                                  </MenuOption>
                                </View>
                              </MenuOptions>
                            </Menu>
                          </View>

                          {/* {item.bio ? (
                        <Text>
                          Bio:{' '}
                          {item.bio.length > 18
                            ? item.bio.substring(0, 18) + '...'
                            : item.bio}
                        </Text>
                      ) : null}

                      {item.company_position ? (
                        <Text>
                          Company:{' '}
                          {item.company_position.length > 18
                            ? item.company_position.substring(0, 18) + '...'
                            : item.company_position}
                        </Text>
                      ) : null} */}
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                ) : tabIndex === 2 ? (
                  <Group item={item} navigation={navigation} />
                ) : tabIndex === 3 ? (
                  <TopicCard item={item} navigation={navigation} />
                ) : tabIndex === 4 ? (
                  <SearchCommentCard item={item} navigation={navigation} />
                ) : tabIndex === 5 ? (
                  <View
                    style={{
                      flex: 1,
                    }}
                  >
                    <SearchCommentCard item={item} navigation={navigation} />
                  </View>
                ) : null}
              </View>
            );
          }}
        />
      </View>

      {/* <TouchableOpacity
        activeOpacity={0.7}
        onPress={() =>
          navigation.push('Home', { screen: 'PostTopic' })
        }
        style={styles.touchableOpacityStyle}
      >

        <Image
          source={require('app/assets/floating.png')}
          style={styles.floatingButtonStyle}
        />
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1F3F6',
    padding: 5,
    marginHorizontal: 5,
    borderRadius: 7,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 3,
    paddingRight: 10,
    paddingLeft: 0,
    backgroundColor: 'transparent',
    color: '#424242',
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
    fontFamily: 'regular',
  },
  profilename: {
    fontFamily: 'regular',
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
    // textAlign: 'center',
    fontSize: wp('4%'),
    width: '87%',
    fontFamily: 'regular',
    marginLeft: wp('4%'),
  },
  wrapperText: {
    color: '#707070',
    // textAlign: 'center',
    fontSize: wp('4%'),
    width: '87%',
    fontFamily: 'regular',
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
  topicStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    paddingTop: 20,
    padding: 20,
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
  },
});

export default Search;
