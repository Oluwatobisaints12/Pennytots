import {
  DarkAboutSVG,
  DarkBlockedChatSVG,
  DarkChangePinSVG,
  DarkGroupSVG,
  DarkLikeSVG,
  DarkUserTermSVG,
  EmptySearchSVG,
} from 'app/providers/svg/loader';
import React, {
  Component,
  useContext,
  useState,
  useEffect,
  useRef,
  FunctionComponent,
} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
  ScrollView,
  TextInput,
  SafeAreaView
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { CustomText } from 'app/components/elements';
import HeaderTitle from 'app/components/HeaderTitle';
import Avatar from 'app/components/elements/Avater';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import { userAuthInfo } from 'app/redux/user/reducer';
import InterestSVG from 'app/assets/svg/interest.svg';

import { useTranslation } from 'react-i18next';


type SettingsScreenProps = {
  navigation: any;
};

const Settings: FunctionComponent<SettingsScreenProps> = ({ navigation }) => {
  const profile = useSelector(userAuthInfo);
  const { t } = useTranslation();

  interface ISettingsData {
    [key: string]: {
      name: string;
      items: Array<{
        id: number;
        name: string;
        icon: () => JSX.Element;
        route: string;
      }>;
    };
  }

  let SettingsData: ISettingsData = {
    preference: {
      name: t('Settings_preferences'),
      items: [
        {
          id: 1,
          name: t('Settings_interest'),
          icon: () => {
            return <InterestSVG width={29} />;
          },
          route: 'area-of-interest',
        },
        {
          id: 2,
          name: t('Settings_language'),
          icon: () => {
            return <DarkGroupSVG />;
          },
          route: 'change-language',
        },
      ],
    },
    account: {
      name: t("Settings_account"),
      items: [
        {
          id: 1,
          name: t('Settings_pin'),
          icon: () => {
            return <DarkChangePinSVG />;
          },
          route: 'change-pin',
        },
        {
          id: 2,
          name: t('Settings_blockedChats'),
          icon: () => {
            return <DarkBlockedChatSVG />;
          },
          route: 'blocked-chats',
        },
      ],
    },
    help: {
      name: 'Help',
      items: [
        {
          id: 1,
          name: t('Settings_userTerms'),
          icon: () => {
            return <DarkUserTermSVG />;
          },
          route: 'user-terms',
        },
        // {
        //   id: 2,
        //   name: t('Settings_About'),
        //   icon: () => {
        //     return <DarkAboutSVG />;
        //   },
        //   route: 'about',
        // },
      ],
    },
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}
    >
      <HeaderTitle title={t('SideNav_settings')} navigation={navigation} />
      <ScrollView>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 24,
          }}
        >
          {profile ? (
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                paddingBottom: 10,
              }}
            >
              <Avatar source={profile.profile_picture} size={hp('12%')} />
              <CustomText
                style={{
                  color: 'black',
                  fontSize: 18,
                  marginTop: 10,
                }}
                textType='bold'
              >
                {profile.first_name} {profile.last_name}
              </CustomText>
            </View>
          ) : null}

          <TouchableOpacity
            onPress={() => navigation.navigate('EditProfile')}
            style={{
              borderColor: '#FED830',
              borderWidth: 1,
              borderRadius: 20,
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 5,
              paddingHorizontal: 15,
              flexDirection: 'row',
            }}
          >
            <CustomText
              style={{
                marginRight: 5,
              }}
            >
             {t("PersonalProfile_edit")}
            </CustomText>

            <FontAwesome
              name='chevron-right'
              size={11}
              color='#FED830'
              style={{
                marginRight: 5,
              }}
            />
          </TouchableOpacity>
        </View>

        {Object.keys(SettingsData).map((key, index) => (
          <View
            style={{
              flexDirection: 'column',
            }}
          >
            <View
              style={{
                backgroundColor: '#F7F4F4',
                padding: 15,
              }}
            >
              <CustomText
                style={{
                  color: '#797978',
                }}
                textType='semi-bold'
              >
                {SettingsData[key].name}
              </CustomText>
            </View>
            <View
              style={{
                flexDirection: 'column',
                padding: 15,
              }}
            >
              {SettingsData[key].items.map((item) => (
                <TouchableOpacity
                  onPress={() => navigation.navigate(item.route)}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 11,
                  }}
                >
                  <item.icon />
                  <CustomText
                    style={{
                      paddingLeft: 10,
                      color: '#48463E',
                    }}
                  >
                    {item.name}
                  </CustomText>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
