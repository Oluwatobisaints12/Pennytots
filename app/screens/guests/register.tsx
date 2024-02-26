import React, {
  FunctionComponent,
  useState,
  useEffect,
  useContext,
} from 'react';
import { View, Image,Text, TextInput, ScrollView,SafeAreaView,StyleSheet,KeyboardAvoidingView,Platform } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { SignUpHeaderSVG } from 'app/providers/svg/loader';
import { CustomText, CustomButton } from 'app/components/elements';
import RNPickerSelect from 'react-native-picker-select';
import { Flag } from 'react-native-svg-flagkit';
import countryAndCode from 'app/Data/countryAndCode';
import { CommonStyles, PickerSelectStyle } from 'app/assets/styles';
import Loader from 'app/components/elements/Loader';
import { accountRegister } from 'app/redux/user/hooks';
import { useSelector } from 'react-redux';
import { appLoading } from '../../redux/main/reducer';
import { Country as CountryType } from '../../types/types';
import CountryPicker, { Country } from 'react-native-country-picker-modal';
import { useTranslation } from 'react-i18next';
interface CustomCountryPickerProps {
  onCountrySelect: (countryCode: string) => void;
}
const Register: FunctionComponent<{
  navigation: any;
}> = ({ navigation }) => {

  const loading = useSelector(appLoading);

  const [phone, setPhone] = useState('');

  const [password, setPassword] = useState('');
  const [countryFlag, setCountryFlag] = useState('NG');
  const [selectedCountry, setSelectedCountry] = useState<CountryType | null>(null);
  const [countryCode, setCountryCode] = useState('+234');
  let [firstName, setFirstName] = useState('');
  let [lastName, setLastName] = useState('');
  let [email, setEmail] = useState('');
  const { t } = useTranslation();


  type CountryProps = {
    label: string;
    value: string;
    name: string;
    flag: string;
  };

  function getCountryFlag(): string {
    let countryData = countryAndCode.find((item: CountryProps) => {
      return item.value == countryCode;
    });
    if (countryData) {
      return countryData.flag;
    } else {
      return '';
    }
  }

  function getCountryName(): string {
    let countryData = countryAndCode.find((item: CountryProps) => {
      return item.value == countryCode;
    });
    if (countryData) {
      return countryData.name;
    } else {
      return '';
    }
  }

  const handleCountryChange = (country: Country) => {
    setSelectedCountry(country);
    setCountryCode(`+${country.callingCode[0]}`);
  };


  const signUp = () => {
    if (!firstName) {
      alert('Please fill First Name');
      return;
    }
    if (!lastName) {
      alert('Please fill Last Name');
      return;
    }
    if (!email) {
      alert('Please fill the Email');
      return;
    }
    if (!password) {
      alert('Please fill the Pin');
      return;
    }

    if (!phone) {
      alert('Please fill the phone number');
      return;
    }

    if (!validateEmail(email)) {
      alert('Email invalid');
      return;
    }

    if (!countryCode) {
      alert('Please select a countryCode');
      return;
    }

    const formData = {
      first_name: firstName,
      last_name: lastName,
      email,
      phone_number: {
        code: countryCode,
        number: phone
      },
      country: getCountryName(),
      password: password,
    };

    accountRegister(formData);

  };

  const validateEmail = (email: string): boolean => {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  useEffect(() => {
    setCountryFlag(getCountryFlag());
  }, [countryCode]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        style={{
          flexGrow: 1,
          backgroundColor: 'white',
          flexDirection: 'column',
          paddingHorizontal: wp('5'),
        }}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {/* <SafeAreaView> */}
        <Loader loading={loading} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Image
            source={require('app/assets/logo.png')}
            style={{ width: 200, height: 50 }}
          />
          <View
            style={{
              width: '50%',
            }}
          >
            <SignUpHeaderSVG />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'column',
          }}
        >
          <CustomText
            style={{
              color: '#696969',
              fontSize: 21,
            }}
          >
            {t("Signup_OpeningText")}
          </CustomText>

          <CustomText
            style={{
              fontSize: 14,
              marginTop: 5,
              color: '#696969',
            }}
          >
            {t('Signup_page1text')}
          </CustomText>

          <View
            style={{
              marginTop: 6,
              flexDirection: 'column',
            }}
          >
            <CustomText>{t('LoginPage_PhoneNumber')}</CustomText>

            <View
              style={{
                flexDirection: 'row',
              }}
            >
              <View
                style={{
                  ...CommonStyles.inputField,
                  padding: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 10,
                  flexDirection: 'row',
                }}
              >
                {/* <Flag id={countryFlag} width={25} height={25} /> */}
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
                  style={CommonStyles.inputField}
                  maxLength={10}
                  onChangeText={(text: string) => {
                    setPhone(text);
                  }}
                  inlineImageLeft='callplain'
                  placeholder={t("Signup_phoneNumber")}
                  inlineImagePadding={20}
                  keyboardType='phone-pad'
                  value={phone}
                />
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'column',
            }}
          >
            <CustomText
              style={{
                color: 'black',
              }}
            >
              First Name
            </CustomText>

            <TextInput
              style={CommonStyles.inputField}
              onChangeText={(text: string) => {
                setFirstName(text);
              }}
              inlineImageLeft='callplain'
              placeholder={t("Signup_firstName")}
              inlineImagePadding={20}
              value={firstName}
            />
          </View>

          <View
            style={{
              marginTop: 6,
              flexDirection: 'column',
            }}
          >
            <CustomText
              style={{
                color: 'black',
              }}
            >
              Last Name
            </CustomText>

            <TextInput
              style={CommonStyles.inputField}
              onChangeText={(text: string) => {
                setLastName(text);
              }}
              inlineImageLeft='callplain'
              placeholder={t("Signup_lastName")}
              inlineImagePadding={20}
              value={lastName}
            />
          </View>

          <View
            style={{
              flexDirection: 'column',
            }}
          >
            <CustomText
              style={{
                color: 'black',
              }}
            >
              {t("Signup_email")}
            </CustomText>

            <TextInput
              style={CommonStyles.inputField}
              onChangeText={(text: string) => {
                setEmail(text);
              }}
              inlineImageLeft='callplain'
              placeholder='Email'
              inlineImagePadding={20}
              value={email}
            />
          </View>

          <View style={{}}>
            <CustomText
              style={{
                color: 'black',
              }}
            >
              {t("Signup_pin")}
            </CustomText>

            <TextInput
              style={CommonStyles.inputField}
              onChangeText={(text) => setPassword(text)}
              inlineImageLeft='key'
              placeholder={t('LoginPage_pin')}
              inlineImagePadding={20}
              textContentType='password'
              secureTextEntry={true}
              keyboardType='numeric'
              maxLength={4}
              value={password}
            />
          </View>
        </View>

        <View
          style={{
            alignItems: 'flex-end',
          }}
        >
          <CustomButton
            label={t('Sign Up')}
            onPress={() => signUp()}
            loading={loading}
          />
        </View>
        {/* </SafeAreaView> */}
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
    paddingHorizontal: 16,
  },
  // ... Other styles
});


export default Register;
