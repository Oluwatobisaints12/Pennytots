// Create react native functional component
import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Linking,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { CustomText } from 'app/components/elements';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { TopicCard } from 'app/components/cards';
import Group from 'app/components/cards/group';
import { userAuthInfo, userToken } from 'app/redux/user/reducer';
import { useSelector } from 'react-redux';
import { Axios } from 'app/api/axios';
import { default as themeFont } from 'app/assets/themes/fonts.json';
import AgeSVG from 'app/assets/svg/age.svg';
import UserSVG from 'app/assets/svg/user.svg';
import LocationSVG from 'app/assets/svg/location.svg';
import LinkSVG from 'app/assets/svg/link.svg';
import FBSVG from 'app/assets/svg/fb.svg';
import LinkedInSVG from 'app/assets/svg/linkedin.svg';
import CompanySVG from 'app/assets/svg/company.svg';
import { responsiveValue as rv } from 'app/providers/responsive-value';
import { SafeAreaView } from 'react-native-safe-area-context';
import FollowButton from '../../components/elements/FollowButton';
import HeaderTitle from 'app/components/HeaderTitle';
import { useTranslation } from 'react-i18next';

export type AccountProfileScreenProps = {
  navigation?: any;
  route: any;
};

const Profile: React.FC<AccountProfileScreenProps> = ({
  navigation,
  route,
}) => {
  const profile = useSelector(userAuthInfo);
  const { t } = useTranslation();

  console.log('render');

  let { userDetails } = route.params;
  const [loading, setLoading] = useState(true);
  const [accountProfile, setAccountProfile] =
    useState<AccountProfileProp | null>(null);

  const [groups, setGroups] = useState<any>([]);
  const [topics, setTopics] = useState<any>([]);
  const [tabIndex, setTabIndex] = useState(0);

  function HandleTabChange(index: number) {
    setTabIndex(index);
  }

  function LoadUserDetails() {
    if (userDetails && userDetails._id) {
      setLoading(true);
      Axios({
        method: 'GET',
        url: '/user/' + userDetails._id,
      })
        .then((response: any) => {
          setAccountProfile(response.data);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }

  function LoadUserGroups() {
    Axios({
      method: 'GET',
      url: '/group/user-groups/' + userDetails._id,
    }).then((response: any) => {
      setGroups(response.data.groups.docs);
    });
  }

  function LoadUserTopics() {
    Axios({
      method: 'GET',
      url: '/topics/get-user-topics/' + userDetails._id + '?page=1&limit=50',
    }).then((response: any) => {
      setTopics(response.data.topics.docs);
    });
  }

  useEffect(() => {
    async function load() {
      if (userDetails.profile) {
        setAccountProfile(profile);
        userDetails = profile;
      } else {
        LoadUserDetails();
      }

      if (userDetails && userDetails._id) {
        LoadUserTopics();
        LoadUserGroups();
      }
    }

    load();
  }, [userDetails, profile]);

  useEffect(() => {
    console.log(accountProfile, '== account');
  }, [accountProfile]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <HeaderTitle title={t('SideNav_profile')} navigation={navigation} />
      {accountProfile ? (
        <ScrollView
          style={{
            flex: 1,
            backgroundColor: 'white',
            flexDirection: 'column',
            paddingHorizontal: 22,
          }}
        >
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity
              style={{
                alignItems: 'flex-start',
                width: '100%',
              }}
              onPress={() => {
                if (accountProfile.header_image) {
                  navigation.push('Common', {
                    screen: 'fullscreen-image',
                    params: {
                      image: accountProfile.header_image,
                    },
                  });
                }
              }}
            >
              <Image
                source={
                  accountProfile.header_image
                    ? { uri: accountProfile.header_image }
                    : require('app/assets/default_profile_header.png')
                }
                style={{
                  width: '100%',
                  height: hp('25%'),
                  borderTopLeftRadius: wp('4%'),
                  borderTopRightRadius: wp('4%'),
                  borderBottomRightRadius: wp('4%'),
                  borderBottomLeftRadius: wp('13%'),
                }}
                resizeMode='cover'
              />

              <TouchableOpacity
                onPress={() => {
                  if (accountProfile.profile_picture) {
                    navigation.push('Common', {
                      screen: 'fullscreen-image',
                      params: {
                        image: accountProfile.profile_picture,
                      },
                    });
                  }
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    if (accountProfile.profile_picture) {
                      navigation.push('Common', {
                        screen: 'fullscreen-image',
                        params: {
                          image: accountProfile.profile_picture,
                        },
                      });
                    }
                  }}
                >
                  <Image
                    source={
                      accountProfile.profile_picture &&
                      accountProfile.profile_picture.length > 0
                        ? { uri: accountProfile.profile_picture }
                        : require('app/assets/user.jpg')
                    }
                    style={{
                      width: wp('18%'),
                      height: wp('18%'),
                      borderRadius: wp('18%'),
                      borderColor: 'white',
                      borderWidth: wp('0.7%'),
                      marginTop: -hp('10.6%'),
                    }}
                    resizeMode='cover'
                  />
                </TouchableOpacity>
              
                  
              </TouchableOpacity>
            </TouchableOpacity>
          </View>

          {/* Profile Details */}
          <View
            style={{
              flex: 1,
              marginVertical: 35,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
              }}
            >
              <View
                style={{
                  flexDirection: 'column',
                  width: '70%',
                }}
              >
                <CustomText
                  style={{
                    fontSize: rv(15),
                  }}
                  textType='bold'
                >
                  {accountProfile.first_name} {accountProfile.last_name}
                </CustomText>

                <CustomText
                  style={{
                    marginHorizontal: 5,
                    color: 'gray',
                    marginLeft: 0,
                  }}
                >
                  {accountProfile.gender ? accountProfile.gender + ' | ' : ''}

                  {accountProfile.age ? accountProfile.age : ''}
                </CustomText>
              </View>

              {userDetails && userDetails.profile ? (
                <View
                  style={{
                    width: '30%',
                  }}
                >
                  <TouchableOpacity
                    onPress={() => navigation.navigate('EditProfile')}
                    style={{
                      borderColor: 'gold',
                      borderWidth: rv(1),
                      borderRadius: rv(20),
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: rv(7),
                      paddingHorizontal: rv(10),
                    }}
                  >
                    <CustomText
                      adjustsFontSizeToFit={true}
                      numberOfLines={1}
                      textType='semi-bold'
                      style={{
                        fontSize: rv(13),
                      }}
                    >
                      {t('PersonalProfile_edit')}
                    </CustomText>
                  </TouchableOpacity>
                </View>
              ) : 
              <View>
                <TouchableOpacity
              style={{
            }}
            >
              
              <FollowButton userId={userDetails._id}/>
              
            </TouchableOpacity>
              </View>}
            </View>

            {accountProfile.bio ? (
              <View
                style={{
                  marginTop: 5,
                  flexDirection: 'row',
                }}
              >
                <UserSVG />

                <CustomText
                  style={{
                    marginHorizontal: 5,
                  }}
                >
                  <CustomText textType='semi-bold'>Bio</CustomText>{' '}
                  {accountProfile.bio}
                </CustomText>
              </View>
            ) : null}

            {accountProfile.website ? (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  alignItems: 'center',
                }}
                onPress={() => {
                  if (accountProfile.website) {
                    let url = accountProfile.website
                      .toLowerCase()
                      .includes('https://')
                      ? accountProfile.website
                      : 'https://' + accountProfile.website;

                    Linking.openURL(url);
                  }
                }}
              >
                <LinkSVG />

                <CustomText
                  style={{
                    marginHorizontal: 5,
                  }}
                >
                  <CustomText textType='semi-bold'>Website:</CustomText>{' '}
                  {accountProfile.website}
                </CustomText>
              </TouchableOpacity>
            ) : null}

            {accountProfile.linkedin ? (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  alignItems: 'center',
                }}
                onPress={() => {
                  if (accountProfile.linkedin) {
                    let url = accountProfile.linkedin
                      .toLowerCase()
                      .includes('https://')
                      ? accountProfile.linkedin
                      : 'https://' + accountProfile.linkedin;

                    Linking.openURL(url);
                  }
                }}
              >
                <LinkedInSVG />

                <CustomText
                  style={{
                    marginHorizontal: 5,
                  }}
                >
                  <CustomText textType='bold'>Linkedin:</CustomText>{' '}
                  {accountProfile.linkedin}
                </CustomText>
              </TouchableOpacity>
            ) : null}

            {accountProfile.facebook ? (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  alignItems: 'center',
                }}
                onPress={() => {
                  if (accountProfile.facebook) {
                    let url = accountProfile.facebook
                      .toLowerCase()
                      .includes('https://')
                      ? accountProfile.facebook
                      : 'https://' + accountProfile.facebook;

                    Linking.openURL(url);
                  }
                }}
              >
                <FBSVG />

                <CustomText
                  style={{
                    marginHorizontal: 5,
                  }}
                >
                  <CustomText textType='semi-bold'>Facebook:</CustomText>{' '}
                  {accountProfile.facebook}
                </CustomText>
              </TouchableOpacity>
            ) : null}

            {accountProfile.company ? (
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  alignItems: 'center',
                }}
              >
                <CompanySVG />

                <CustomText
                  style={{
                    paddingTop: 2,
                    marginHorizontal: 5,
                    fontSize: 13,
                  }}
                >
                  <CustomText textType='semi-bold'> Company: </CustomText>{' '}
                  <CustomText>{accountProfile.company}</CustomText>
                </CustomText>
              </View>
            ) : null}

            {accountProfile.company_position ? (
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  alignItems: 'center',
                }}
              >
                <CompanySVG />

                <CustomText
                  style={{
                    paddingTop: 2,
                    marginHorizontal: 5,
                    fontSize: 13,
                  }}
                >
                  <CustomText textType='semi-bold'> Position: </CustomText>{' '}
                  <CustomText>{accountProfile.company_position}</CustomText>
                </CustomText>
              </View>
            ) : null}

            {accountProfile.city ? (
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  alignItems: 'center',
                }}
              >
                <LocationSVG />

                <CustomText
                  style={{
                    paddingTop: 2,
                    marginHorizontal: 5,
                    fontSize: 13,
                  }}
                >
                  <CustomText textType='semi-bold'> {t("Signup_town")}: </CustomText>{' '}
                  <CustomText>{accountProfile.city}</CustomText>
                </CustomText>
              </View>
            ) : null}

            {accountProfile.state ? (
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  alignItems: 'center',
                }}
              >
                <LocationSVG />

                <CustomText
                  style={{
                    paddingTop: 2,
                    marginHorizontal: 5,
                    fontSize: 13,
                  }}
                >
                  <CustomText textType='semi-bold'> {t("Signup_State")}: </CustomText>{' '}
                  <CustomText>{accountProfile.state}</CustomText>
                </CustomText>
              </View>
            ) : null}

            <View
              style={{
                alignItems: 'center',
                marginTop: 13,
              }}
            >
              <View
                style={{
                  width: wp('90%'),
                }}
              >
                <SegmentedControlTab
                  activeTabStyle={{
                    backgroundColor: 'white',
                    borderBottomWidth: 2,
                    borderBottomColor: '#FFCB05',
                  }}
                  activeTabTextStyle={{
                    color: 'black',
                    fontSize: 13,
                    fontFamily: "bold",
                    paddingVertical: 8,
                  }}
                  tabTextStyle={{
                    color: 'black',
                    fontSize: 13,
                    paddingVertical: 8,
                    fontFamily: "regular",
                  }}
                  tabStyle={{
                    backgroundColor: 'white',
                    borderColor: 'white',
                    color: 'yellow',
                    borderBottomWidth: 0.5,
                    borderBottomColor: 'grey',
                  }}
                  values={[t('profile_topics'), t('profile_groups')]}
                  selectedIndex={tabIndex}
                  onTabPress={HandleTabChange}
                />

                <FlatList
                  data={
                    tabIndex === 0 ? topics : tabIndex === 1 ? groups : null
                  }
                  keyExtractor={(item, index) => item._id}
                  style={{
                    marginTop: 6,
                  }}
                  renderItem={({ item }) => {
                    return (
                      <View
                        style={{
                          flex: 1,
                          marginVertical: 3,
                        }}
                      >
                        {tabIndex === 0 ? (
                          <TopicCard item={item} navigation={navigation} />
                        ) : tabIndex === 1 ? (
                          <Group
                            item={item}
                            navigation={navigation}
                            menu={false}
                          />
                        ) : null}
                      </View>
                    );
                  }}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      ) : null}
    </SafeAreaView>
  );
};

export default Profile;
