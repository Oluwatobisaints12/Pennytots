import React, { FunctionComponent } from 'react';
import { View, StyleSheet, ImageBackground,SafeAreaView } from 'react-native';
import { DrawerItem } from '@react-navigation/drawer';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { CustomText } from 'app/components/elements';
import Avatar from 'app/components/elements/Avater';
import {
  CreateGroupSVG,
  HelpdeskSVG,
  LogoutSVG,
  PostATopicSVG,
  ProfileSVG,
  SettingsSVG,
  UpgradeSVG,
} from 'app/providers/svg/loader';

import { useSelector } from 'react-redux';
import { userAuthInfo } from 'app/redux/user/reducer';
import { logout } from 'app/redux/user/hooks';
import { useTranslation } from 'react-i18next';

type CustomSidebarMenuProps = {
  navigation?: any;
  props: any;
};

const Sidebar: FunctionComponent<CustomSidebarMenuProps> = ({props}) => {
  const profile = useSelector(userAuthInfo);
  const { t } = useTranslation();
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={
          profile && profile.header_image
            ? { uri: profile.header_image }
            : require('app/assets/navbar-bg.png')
        }
        style={{
          width: '100%',
          height: hp('12%'),
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {profile ? (
          <SafeAreaView
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Avatar source={profile.profile_picture} size={hp('6%')} />
            <CustomText
              style={{
                color: 'white',
                fontSize: 16,
                marginLeft: 20,
              }}
              textType='bold'
            >
              {profile.first_name} {profile.last_name}
            </CustomText>
          </SafeAreaView>
        ) : null}
      </ImageBackground>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          paddingHorizontal: wp('5%'),
          marginVertical: 10,
        }}
      >
        <DrawerItem
          label={t("SideNav_profile")}
          labelStyle={{
            fontFamily: 'regular',
            fontSize: 16,
            color: '#696969',
            lineHeight: 20,
            marginVertical: 5,
          }}
          onPress={() =>
            props.navigation.navigate('Profile', {
              userDetails: { profile: true },
            })
          }
          icon={() => <ProfileSVG width={'20'} height={'20'} />}
        />

        <DrawerItem
          label={t("SideNav_postTopic")}
          labelStyle={{
            fontFamily: 'regular',
            fontSize: 16,
            color: '#696969',
            lineHeight: 20,
            marginVertical: 5,
          }}
          onPress={() => props.navigation.navigate('PostTopic')}
          icon={() => <PostATopicSVG width={'20'} height={'20'} />}
        />

        <DrawerItem
          label={t("SideNav_createGroup")}
          labelStyle={{
            fontFamily: 'regular',
            fontSize: 16,
            color: '#696969',
            lineHeight: 20,
            marginVertical: 5,
          }}
          onPress={() => props.navigation.navigate('CreateGroup')}
          icon={() => <CreateGroupSVG width={'20'} height={'20'} />}
        />

        <DrawerItem
          label={t("SideNav_settings")}
          labelStyle={{
            fontFamily: 'regular',
            fontSize: 16,
            color: '#696969',
            lineHeight: 20,
            marginVertical: 5,
          }}
          onPress={() => props.navigation.navigate('Settings')}
          icon={() => <SettingsSVG width={'20'} height={'20'} />}
        />

        <DrawerItem
          label={t("SideNav_Credit")}
          labelStyle={{
            fontFamily: 'regular',
            fontSize: 16,
            color: '#696969',
            lineHeight: 20,
            marginVertical: 5,
          }}
          onPress={() => props.navigation.navigate('Credits')}
          icon={() => <UpgradeSVG width={'20'} height={'20'} />}
        />
        {/* 
        <DrawerItem
          label='Donate'
          labelStyle={{
            fontFamily: 'regular',
            fontSize: 16,
            color: '#696969',
            lineHeight: 20,
            marginVertical: 5,
          }}
          onPress={() => props.navigation.navigate('Donate')}
          icon={() => <UpgradeSVG width={'20'} height={'20'} />}
        /> */}

        <DrawerItem
          label={t("SideNav_helpDesk")}
          labelStyle={{
            fontFamily: 'regular',
            fontSize: 16,
            color: '#696969',
            lineHeight: 20,
            marginVertical: 5,
          }}
          onPress={() => props.navigation.navigate('Helpdesk')}
          icon={() => <HelpdeskSVG width={'20'} height={'20'} />}
        />

        <DrawerItem
          label={t("SideNav_logout")}
          labelStyle={{
            fontFamily: 'regular',
            fontSize: 16,
            color: '#696969',
            lineHeight: 20,
            marginVertical: 5,
          }}
          onPress={() => logout()}
          icon={() => <LogoutSVG width={'20'} height={'20'} />}
        />

        {/* <DrawerItemList {...props} /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: 'contain',
    width: wp('30%'),
    height: hp('10%'),
    marginLeft: 20,
    // borderRadius: 100 / 2,
    alignSelf: 'flex-start',
    // marginTop: 20,
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Sidebar;
