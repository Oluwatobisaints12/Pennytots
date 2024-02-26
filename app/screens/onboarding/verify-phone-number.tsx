import React, {
  FunctionComponent,
  useState,
  useRef,
  useEffect,
  useContext,
} from 'react';
import {
  View,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,

} from 'react-native-responsive-screen';
import { SignUpHeaderSVG } from 'app/providers/svg/loader';
import { CustomText, CustomButton } from 'app/components/elements';
import Loader from 'app/components/elements/Loader';
// import { OTPInput } from 'app/components/elements/otp-input';
import { logout, useSendPhoneVerificationCode, useValidatePhoneCode } from 'app/redux/user/hooks';
import { useSelector } from 'react-redux';
import { userAuthInfo } from '../../redux/user/reducer';
// import Select from 'app/components/elements/select';
// import { toHHMMSS } from 'app/helpers';

const VerifyPhoneNumberScreen: FunctionComponent<{
  navigation: any;
}> = ({ navigation }) => {

  const [codeSent, setCodeSent] = useState(false);
  const [type, setType] = useState('sms');
  const [countdown, setCountdown] = useState(0);
  const [otp, setOtp] = useState('');

  const { mutateAsync: sendOTP, isLoading: loadingSentCode } = useSendPhoneVerificationCode();
  const { mutateAsync: verifyToken, isLoading: loadingVerifyCode } = useValidatePhoneCode();
  const user = useSelector(userAuthInfo);
  const [isReady, setIsReady] = useState(false);


  useEffect(() => {

      if (user && user.phone_number_verified) {
          navigation.replace('Onboarding');
      }
      else {
          setIsReady(true);
      }
  }, [user])

  useEffect(() => {
      const timer = setInterval(() => {
          if (countdown > 0) {
              setCountdown(countdown - 1);
          }
      }, 1000);
      return () => clearInterval(timer);
  }, [countdown]);


  function SendOTP() {

      let payload = {
          type
      }
      sendOTP(payload).then((response) => {
          setCodeSent(true);
          setCountdown(response.secLeft);

      }).catch((error) => {
          if (error.message == 'Phone number has already been verified') {
              navigation.replace('Onboarding');
          }
      })
  }


  function validateOTP() {
      if (otp && otp.length === 4) {
          verifyToken({ token: otp }).then((response) => {
              navigation.navigate('Onboarding');
          });
      }
  }

  useEffect(() => {
      validateOTP();
  }, [otp])


  const data = [
      { label: "Whatsapp", value: "whatsapp" },
      { label: "SMS", value: "sms" },
  ]

  if (!isReady) {
      return null
  }

  return (
      <ScrollView
          style={{
              flex: 1,
              backgroundColor: 'white',
              flexDirection: 'column',
              paddingHorizontal: wp('5'),
          }}
      >
          <Loader loading={loadingSentCode} />



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
                  marginTop: 30,
              }}
          >
              <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between'
              }}>
                  <CustomText

                      style={{
                          color: '#696969',
                          fontSize: 21,
                      }}
                  >
                      Phone Number Verification
                  </CustomText>


              </View>


              {!codeSent ? (
                  <>
                      <CustomText
                          style={{
                              fontSize: 15,
                              color: '#696969',
                          }}
                      >
                          {'\n'}Verify your phone number
                          {user && (
                              <CustomText
                                  style={{
                                      fontSize: 16,
                                      marginTop: 5,

                                      color: '#696969',
                                  }}
                                  textType='bold'
                              >
                                  {` ${user.phone_number.code}${user.phone_number.number} `}

                              </CustomText>
                          )}

                      </CustomText>

                      <View style={{ width: wp('90%'), marginTop: 10 }}>
                          <CustomButton
                              label={`Send OTP`}
                              onPress={() => {
                                  SendOTP();
                              }}
                              buttonTheme="primary"
                              style={{
                                  borderRadius: 14,
                              }}

                              loading={loadingSentCode}
                          />

                          <TouchableOpacity
                              onPress={() => {
                                  logout();
                              }}
                              style={{
                                  alignSelf: 'center',
                                  marginLeft: 5,
                                  marginTop: 15
                              }}>
                              <CustomText
                                  style={{
                                      fontSize: 16,
                                      color: 'red',
                                  }}
                                  textType='bold'
                              >
                                  Logout
                              </CustomText>
                          </TouchableOpacity>
                      </View>
                  </>

              ) : (
                  <>
                      <CustomText
                          style={{
                              fontSize: 14,
                              marginTop: 10,
                              marginBottom: 20,
                              color: '#696969',
                              // alignSelf: 'center'
                          }}
                      >
                          Enter 4 digit code sent to

                          {user && (
                              <CustomText
                                  style={{
                                      fontSize: 16,
                                      marginTop: 10,

                                      color: '#696969',
                                  }}
                                  textType='bold'
                              >
                                  {` ${user.phone_number.code}${user.phone_number.number} `}

                              </CustomText>

                          )}



                          {`via ${type.toUpperCase()}`}
                      </CustomText>

                      <View
                          style={{
                              flexDirection: 'column',
                              flex: 1,
                              justifyContent: 'center',

                          }}
                      >


                          <View style={{}}>
                              {/* <OTPInput otpCodeChanged={(code: string) => setOtp(code)} /> */}
                              {/* <Text>hey</Text> */}
                          </View>


                          <View style={{
                              flexDirection: 'row',
                              justifyContent: 'center',
                              alignItems: 'center',
                              marginTop: 20,
                          }}>
                              <CustomText
                                  style={{
                                      fontSize: 14,

                                      color: '#696969',
                                  }}
                              >
                                  Didn't receive code?
                              </CustomText>
                              <TouchableOpacity
                                  onPress={() => {
                                      if (countdown === 0) {
                                          SendOTP()
                                      }
                                  }
                                  }
                                  style={{
                                      marginLeft: 5
                                  }}>
                                  <CustomText
                                      style={{
                                          fontSize: 16,
                                          color: '#696969',
                                      }}
                                      textType='bold'
                                  >
                                      Resend OTP
                                  </CustomText>
                              </TouchableOpacity>
                          </View>

                          {countdown > 0 && <CustomText
                              style={{
                                  alignSelf: 'center',
                                  color: '#696969',
                              }}
                          >
                            {/* {`Retry in ${toHHMMSS(countdown)}`} */}
                            </CustomText>}


                          <View style={{
                              width: wp('90%'),
                              marginTop: 30,
                              flexDirection: 'column'
                          }}>

                              <CustomButton
                                  label={'Verify'}
                                  onPress={() => {
                                      //   handleSubmitPress();
                                      validateOTP();
                                  }}
                                  buttonTheme="primary"
                                  style={{
                                      borderRadius: 14,
                                      marginTop: 0
                                  }}

                                  loading={loadingVerifyCode}
                              />

                              <TouchableOpacity
                                  onPress={() => {
                                      logout();
                                  }}
                                  style={{
                                      alignSelf: 'center',
                                      marginLeft: 5,
                                      marginTop: 15
                                  }}>
                                  <CustomText
                                      style={{

                                          fontSize: 16,
                                          color: 'red',
                                      }}
                                      textType='bold'
                                  >
                                      Logout
                                  </CustomText>
                              </TouchableOpacity>
                          </View>
                      </View>

                      {loadingSentCode ? (
                          <View style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                          }}>
                              <ActivityIndicator size={50} color={'gold'} />
                          </View>
                      ) : null}
                  </>

              )}
          </View>






      </ScrollView>
  );
};

export default VerifyPhoneNumberScreen;
