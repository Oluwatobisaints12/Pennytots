import React, {
  Component,
  useState,
  useEffect,
  useRef,
  useContext,
} from 'react';
// import { useIsFocused } from '@react-navigation/native';
import {
  TextInput,
  Text,
  View,
  Image,
  Button,
  StyleSheet,
  Alert,
  TouchableHighlight,
  ScrollView,
  StatusBar,
  Linking,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,Platform,TouchableWithoutFeedback,Keyboard
} from 'react-native';
import { default as themeFont } from 'app/assets/themes/fonts.json';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { CustomButton, CustomText } from 'app/components/elements';
import SVG from 'app/providers/svg';
import RNPickerSelect from 'react-native-picker-select';
import { Flag } from 'react-native-svg-flagkit';
import countryAndCode from 'app/Data/countryAndCode';
import { PickerSelectStyle } from 'app/assets/styles';
import { accountLogin } from 'app/redux/user/hooks';
import useNotification from 'app/helpers/notification';
import { useDispatch, useSelector } from 'react-redux';
import { appLoading, setLoading } from 'app/redux/main/reducer';
import CustomCountryPicker from 'app/components/CountryPicker';
import { Country as CountryType } from '../../types/types';
import CountryPicker, { Country } from 'react-native-country-picker-modal';
import { useTranslation } from 'react-i18next';
import * as Notifications from 'expo-notifications';

type SignInScreenProps = {
  navigation: any;
};

interface CustomCountryPickerProps {
  onCountrySelect: (countryCode: string) => void;
}

function Login({ navigation }: SignInScreenProps) {
  useNotification();
  const loading = useSelector(appLoading);
  const dispatch = useDispatch();
  const [userPassword, setUserPassword] = useState('');
  const [phone, setPhone] = useState();
  const [country, setCountry] = useState('+234');
  const [selectedCountry, setSelectedCountry] = useState<CountryType | null>(null);
  const [countryFlag, setCountryFlag] = useState('NG');
  const { t } = useTranslation();

  type CountryProps = {
    label: string;
    value: string;
    name: string;
    flag: string;
  };

  function getCountryFlag(): string {
    let countryData = countryAndCode.find((item: CountryProps) => {
      return item.value == country;
    });
    if (countryData) {
      return countryData.flag;
    } else {
      return '';
    }
  }

  useEffect(() => {
    setCountryFlag(getCountryFlag());
    console.log(country)
  }, [country]);


  const handleCountryChange = (country: Country) => {
    setSelectedCountry(country);
    setCountry(`+${country.callingCode[0]}`);
  };

  const handleSubmitPress = async () => {
    if (!phone) {
      alert('Please fill phone number');
      return;
    }
    if (!userPassword) {
      alert('Please fill your PIN');
      return;
    }

    await accountLogin({
      phone_number: {
        code: country,
        number: phone,
      },
      password: userPassword,
    }).then(() => {
      Notifications.scheduleNotificationAsync({
        content: {
          title: "Login Successful",
          body: "You are now logged in",
          // ... other notification properties ...
        },
        trigger: null, // immediately show the notification
      });
    });
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <StatusBar barStyle='dark-content' backgroundColor='white' />

        {/* Your existing components */}
        <SVG name='login-header' />
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
              {t('LoginPage_loginText')}
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
                ...styles.signup,
                padding: 5,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 10,
                flexDirection: 'row',
              }}
            >
              <View style={styles.container2}>
                <Text style={styles.countryCodeText}>
                  +{selectedCountry ? selectedCountry.callingCode[0] : '234'}
                </Text>
                {selectedCountry && (
                  <Image
                    style={styles.flagImage}
                    source={{ uri: selectedCountry.flag }}
                  />
                )}
                <CountryPicker
                  withCallingCode
                  withFilter
                  withFlag
                  onSelect={handleCountryChange}
                  countryCode={selectedCountry ? selectedCountry.cca2 : 'NG'}
                  containerButtonStyle={styles.countryPickerContainer}
                />
              </View>
            </View>
            <View
              style={{
                flex: 1,
                marginLeft: 1,
              }}
            >
              <TextInput
                style={styles.signup}
                maxLength={10}
                onChangeText={(text: any) => {
                  setPhone(text);
                }}
                inlineImageLeft='callplain'
                placeholder={t('LoginPage_PhoneNumber')}
                inlineImagePadding={20}
                keyboardType='phone-pad'
                value={phone}
              />
            </View>
          </View>

          <TextInput
            style={styles.signup}
            onChangeText={(userPassword) => setUserPassword(userPassword)}
            inlineImageLeft='key'
            placeholder={t('LoginPage_pin')}
            inlineImagePadding={20}
            textContentType='password'
            secureTextEntry={true}
            keyboardType='numeric'
            maxLength={4}
            value={userPassword}
          />
        </View>
        <View style={{ width: wp('90%') }}>
          <CustomButton
            label={t('LoginPage_loginBtn')}
            onPress={() => {
              handleSubmitPress();
            }}
            buttonTheme='secondary'
            style={{
              borderRadius: 14,
            }}
            loading={loading}
          />
        </View>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            marginTop: 15,
          }}
        >
          <View
            style={{
              width: '50%',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <TouchableOpacity
              onPress={() => {
                return navigation.navigate('register');
              }}
            >
              <CustomText style={{ color: 'black',fontSize: 16  }} textType='bold'>
                {t("LoginPage_signUp")}
              </CustomText>
            </TouchableOpacity>
            <CustomText
              textType='bold'
              style={{
                paddingHorizontal: 20,
              }}
            >
              |
            </CustomText>
            <View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('forgot-password');
                }}
              >
                <CustomText
                  style={{ color: 'black', fontSize: 16 }}
                  textType='bold'
                >
                  {t("LoginPage_forgotPin")}
                </CustomText>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={{ paddingTop: 10 }}>
          <TouchableOpacity
            onPress={() => Linking.openURL('https://pennytots.com/contact-us')}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <CustomText style={{ fontSize: 16 }}>
              {' '}
              {t("LoginPage_reportIssue")}{' '}
            </CustomText>
            <CustomText
              style={{ color: 'black', fontSize: 16 }}
              textType='bold'
            >
              Click here
            </CustomText>
          </TouchableOpacity>
        </View>

        {/* ... */}

        {/* Your other components */}
        {/* ... */}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles:any = StyleSheet.create({
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryCodeText: {
    marginLeft: 7,
    fontSize: 17,
  },
  flagImage: {
    width: 30,
    height: 20,
    marginLeft: -30,
  },
  countryPickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  
  signup: {
    height: 60,
    borderRadius: 14,
    paddingLeft: 20,
    backgroundColor: '#f4f4f4',
    marginBottom: 15,
    borderStyle: 'solid',
    marginTop: 10,
    fontSize: 16,
    fontFamily: "regular",
  },
  // ... other styles
});


export default Login;
