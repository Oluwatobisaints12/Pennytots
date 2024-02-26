/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import {
  TextInput,
  View,
  Image,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { default as themeFont } from 'app/assets/themes/fonts.json';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { CustomButton, CustomText } from 'app/components/elements';
import SVG from 'app/providers/svg';
import { useSendResetPasswordToken } from 'app/redux/user/hooks';
import { useTranslation } from 'react-i18next';

type SignInScreenProps = {
  navigation: any;
};

function ForgotPasswordScreen({ navigation }: SignInScreenProps) {
  const [email, setEmail] = useState('');

  const { mutate, isLoading } = useSendResetPasswordToken();
  const { t } = useTranslation();

  const handleSubmitPress = () => {
    if (!email) {
      alert('Email is not allowed to empty');
      return;
    }

    mutate({
      email,
    });
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}
    >
      <SafeAreaView>
      <StatusBar barStyle='dark-content' backgroundColor='white' />

      <View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              flex: 1,
              alignItems: 'center',
            }}
          >
            <SVG name='forgot-password' />
            <View>
              <Image
                source={require('app/assets/logo.png')}
                style={{ width: 200, height: 50 }}
              />
              <View
                style={{
                  alignItems: 'center',
                  marginTop: 5,
                  marginBottom: 40,
                }}
              >
                <CustomText
                  style={{
                    fontSize: 16,
                  }}
                  textType='semi-bold'
                >
                  Forgot Password
                </CustomText>
              </View>
            </View>

            <View style={{ width: 350 }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                }}
              >
                <View
                  style={{
                    flex: 1,
                    marginLeft: 1,
                  }}
                >
                  <TextInput
                    style={styles.signup}
                    onChangeText={(text: any) => {
                      setEmail(text);
                    }}
                    placeholder='Enter Your Email To Reset Password'
                    value={email}
                  />
                </View>
              </View>
            </View>

            <View style={{ width: wp('90%') }}>
              <CustomButton
                label={t('ForgotPin_btn')}
                onPress={() => {
                  handleSubmitPress();
                }}
                buttonTheme='secondary'
                style={{
                  borderRadius: 14,
                }}
                loading={isLoading}
              />
            </View>

            <View style={{ paddingTop: 20 }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('login')}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <CustomText style={{ fontSize: 16 }}>
                  {' '}
                  Remembered your pin?{' '}
                </CustomText>
                <CustomText
                  style={{ color: 'black', fontSize: 16 }}
                  textType='bold'
                >
                  {t('LoginPage_loginBtn')}
                </CustomText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  signup: {
    height: 60,
    borderRadius: 14,
    paddingLeft: 20,
    backgroundColor: '#f4f4f4',
    marginBottom: 15,
    borderStyle: 'solid',
    marginTop: 10,
    fontSize: 16,
    // fontFamily: 'regular',
  },
});

export default ForgotPasswordScreen;
