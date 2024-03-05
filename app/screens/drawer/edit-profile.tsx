import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { CustomButton, CustomText } from 'app/components/elements';
import Loader from 'app/components/elements/Loader';
import { UploadPhotoSVG } from 'app/providers/svg/loader';
import SelectImageDialog from 'app/components/dialogs/select-image';
import { CommonStyles } from 'app/assets/styles';
import { Axios } from 'app/api/axios';
import { ShowAlert } from 'app/providers/toast';
import { updateUserInfo } from 'app/redux/user/hooks';
import { useSelector } from 'react-redux';
import { userAuthInfo } from 'app/redux/user/reducer';
import { userConstants } from '../../constants/user';
import Select from '../../components/elements/Select';
import AgeSVG from 'app/assets/svg/age.svg';
import UserSVG from 'app/assets/svg/user.svg';
import LocationSVG from 'app/assets/svg/location.svg';
import LinkSVG from 'app/assets/svg/link.svg';
import FBSVG from 'app/assets/svg/fb.svg';
import LinkedInSVG from 'app/assets/svg/linkedin.svg';
import HeaderTitle from 'app/components/HeaderTitle';
import { useTranslation } from 'react-i18next';

export type AccountProfileScreenProps = {
  navigation?: any;
  route: any;
};

const EditProfile: React.FC<AccountProfileScreenProps> = ({
  navigation,
  route,
}) => {
  const profile = useSelector(userAuthInfo);

  const [loading, setLoading] = useState(false);
  const [bio, setBio] = useState('');
  const [website, setWebsite] = useState('');
  const [facebook, setFacebook] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [company, setCompany] = useState('');
  const [company_position, setCompanyPosition] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [showSelectProfileImage, setShowSelectProfileImage] =
    useState<boolean>(false);
  const [showSelectHeaderImage, setShowSelectHeaderImage] =
    useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<Blob | null>(null);
  const [headerImage, setHeaderImage] = useState<Blob | null>(null);
  const { t } = useTranslation();

  const validateURL = (link: string) => {
    const regex = new RegExp(
      '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'
    );
    return regex.test(link);
  };

  useEffect(() => {
    async function load() {
      if (profile) {
        setBio(profile.bio ? profile.bio : '');
        setWebsite(profile.website ? profile.website : '');
        setFacebook(profile.facebook ? profile.facebook : '');
        setLinkedin(profile.linkedin ? profile.linkedin : '');
        setCompany(profile.company ? profile.company : '');
        setCompanyPosition(
          profile.company_position ? profile.company_position : ''
        );
        setGender(profile.gender);
        setAge(profile.age);
        setCity(profile.city);
        setState(profile.city);
      }
    }

    load();
  }, []);

  useEffect(() => {
    if (profileImage) {
      const pic = new FormData();

      pic.append('file', profileImage!);

      setLoading(true);
      Axios({
        method: 'PATCH',
        url: '/user/update-profile-picture',
        data: pic,
      })
        .then((response: any) => {
          updateUserInfo();
          ShowAlert({
            type: 'success',
            className: 'Success',
            message: response.data.message,
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [profileImage]);

  useEffect(() => {
    if (headerImage) {
      const pic = new FormData();
      pic.append('file', headerImage!);

      setLoading(true);

      Axios({
        method: 'PATCH',
        url: '/user/update-header-image',
        data: pic,
      })
        .then((response: any) => {
          updateUserInfo();
          ShowAlert({
            type: 'success',
            className: 'Success',
            message: response.data.message,
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [headerImage]);

  const updateProfile = () => {
    if (website && !validateURL(website)) {
      ShowAlert({
        type: 'error',
        className: 'Error',
        message: 'Invalid website url',
      });
      return;
    }
    if (linkedin && !validateURL(linkedin)) {
      ShowAlert({
        type: 'error',
        className: 'Error',
        message: 'Invalid linkedin url',
      });
      return;
    }
    if (facebook && !validateURL(facebook)) {
      ShowAlert({
        type: 'error',
        className: 'Error',
        message: 'Invalid facebook url',
      });
      return;
    }

    //Show Loader
    setLoading(true);

    Axios({
      method: 'POST',
      url: '/user/update-profile',
      data: {
        // first_name: firstName,
        // last_name: lastName,
        // email: email,
        gender,
        age,
        bio,
        website,
        company,
        company_position,
        facebook,
        linkedin,
        state,
        city,
      },
    })
      .then((response: any) => {
        if (response.data) {
          updateUserInfo();
          ShowAlert({
            type: 'success',
            className: 'Success',
            message: response.data.message,
          });
        } else {
          console.log(response);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}
    >
      <HeaderTitle title={t("PersonalProfile_edit")} navigation={navigation} />
     
        <ScrollView
          style={{
            flex: 1,
            backgroundColor: 'white',
          }}
          showsVerticalScrollIndicator={false}
        >
          <Loader loading={loading} />
          {profile ? (
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                paddingHorizontal: 25,
              }}
            >
              <SelectImageDialog
                show={showSelectProfileImage}
                setShow={setShowSelectProfileImage}
                setImage={setProfileImage}
              />

              <SelectImageDialog
                show={showSelectHeaderImage}
                setShow={setShowSelectHeaderImage}
                setImage={setHeaderImage}
              />

              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    alignItems: 'flex-start',
                    width: '100%',
                  }}
                >
                  <ImageBackground
                    source={
                      profile.header_image
                        ? { uri: profile.header_image }
                        : require('app/assets/default_profile_header.png')
                    }
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      width: '100%',
                      height: hp('25%'),
                    }}
                    imageStyle={styles.headerImageContainer}
                  >
                    <TouchableOpacity
                      onPress={() => setShowSelectHeaderImage(true)}
                      style={{
                        ...styles.headerImageContainer,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                      }}
                    >
                      <UploadPhotoSVG width={wp('15')} height={wp('15')} />
                    </TouchableOpacity>
                  </ImageBackground>

                  {/* <FastImage
                source={require('../assets/default_profile_header.png')}
                style={{
              ,
                }}
                resizeMode={FastImage.resizeMode.cover}
              /> */}

                  <ImageBackground
                    source={
                      profile.profile_picture
                        ? { uri: profile.profile_picture }
                        : require('app/assets/user.jpg')
                    }
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      marginTop: -hp('10.6%'),
                      alignItems: 'center',
                    }}
                    imageStyle={styles.profileImageContainer}
                  >
                    <TouchableOpacity
                      onPress={() => setShowSelectProfileImage(true)}
                      style={{
                        ...styles.profileImageContainer,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                      }}
                    >
                      <UploadPhotoSVG width={wp('8')} height={wp('8')} />
                    </TouchableOpacity>
                  </ImageBackground>
                </View>
              </View>

              {/* Profile Details */}

              <View
                style={{
                  flex: 1,
                  marginVertical: 20,
                  flexDirection: 'column',
                }}
              >
                {/* About me */}
                <View
                  style={{
                    marginTop: 20,
                    flexDirection: 'row',
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingRight: 7,
                      width: '8%',
                    }}
                  >
                    <UserSVG />
                  </View>
                  <View
                    style={{
                      flexDirection: 'column',
                      width: '92%',
                    }}
                  >
                    <CustomText style={styles.title} textType='semi-bold'>
                      Bio:
                    </CustomText>
                    <View
                      style={{
                        width: '95%',
                      }}
                    >
                      <TextInput
                        style={{
                          ...CommonStyles.editInputField,
                          ...CommonStyles.editInputColor,
                        }}
                        placeholder={t('"profile_bio"')}
                        onChangeText={(text) => setBio(text)}
                        value={bio}
                        multiline={true}
                      />
                    </View>
                  </View>
                </View>

                {/* Age */}
                <View
                  style={{
                    marginTop: 10,
                    flexDirection: 'row',
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingRight: 7,
                      width: '8%',
                    }}
                  >
                    <AgeSVG />
                  </View>
                  <View
                    style={{
                      flexDirection: 'column',
                      width: '92%',
                    }}
                  >
                    <CustomText style={styles.title} textType='semi-bold'>
                      {t("Signup_age")}:
                    </CustomText>
                    <View>
                      <Select
                        data={userConstants.ageRange}
                        value={age}
                        onSelect={(value: string, index: number) => {
                          setAge(value);
                        }}
                        style={{
                          height: 50,
                        }}
                      />
                    </View>
                  </View>
                </View>

                {/* Gender */}
                <View
                  style={{
                    marginTop: 10,
                    flexDirection: 'row',
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingRight: 7,
                      width: '8%',
                    }}
                  >
                    <UserSVG />
                  </View>
                  <View
                    style={{
                      flexDirection: 'column',
                      width: '92%',
                    }}
                  >
                    <CustomText style={styles.title} textType='semi-bold'>
                      {t("Signup_gender")}:
                    </CustomText>
                    <View>
                      <Select
                        data={userConstants.genders}
                        value={gender}
                        onSelect={(value: string, index: number) => {
                          setGender(value);
                        }}
                        style={{
                          height: 50,
                        }}
                      />
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  {/* Town / City */}
                  <View
                    style={{
                      marginTop: 10,
                      flexDirection: 'row',
                      width: '45%',
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        paddingRight: 7,
                        width: '15%',
                      }}
                    >
                      <LocationSVG />
                    </View>
                    <View
                      style={{
                        flexDirection: 'column',
                        width: '85%',
                      }}
                    >
                      <CustomText style={styles.title} textType='semi-bold'>
                        {t("EditProfile_town")}
                      </CustomText>
                      <View>
                        <TextInput
                          style={{
                            ...CommonStyles.editInputField,
                            ...CommonStyles.editInputColor,
                          }}
                          onChangeText={(text) => setCity(text)}
                          value={city}
                        />
                      </View>
                    </View>
                  </View>

                  {/* State */}
                  <View
                    style={{
                      marginTop: 10,
                      flexDirection: 'row',
                      width: '45%',
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        paddingRight: 7,
                        width: '15%',
                      }}
                    >
                      <LocationSVG />
                    </View>
                    <View
                      style={{
                        flexDirection: 'column',
                        width: '85%',
                      }}
                    >
                      <CustomText style={styles.title} textType='semi-bold'>
                        {t("EditProfile_State")}
                      </CustomText>
                      <View>
                        <TextInput
                          style={{
                            ...CommonStyles.editInputField,
                            ...CommonStyles.editInputColor,
                          }}
                          onChangeText={(text) => setState(text)}
                          value={state}
                        />
                      </View>
                    </View>
                  </View>
                </View>

                {/* Website */}
                <View
                  style={{
                    marginTop: 10,
                    flexDirection: 'row',
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingRight: 7,
                      width: '8%',
                    }}
                  >
                    <LinkSVG />
                  </View>
                  <View
                    style={{
                      flexDirection: 'column',
                      width: '92%',
                    }}
                  >
                    <CustomText style={styles.title} textType='semi-bold'>
                      {t("profile_website")}:
                    </CustomText>
                    <View>
                      <TextInput
                        style={{
                          ...CommonStyles.editInputField,
                          ...CommonStyles.editInputColor,
                        }}
                        placeholder={t("EditProfile_Placeholder_website")}
                        onChangeText={(text) => setWebsite(text)}
                        value={website}
                        multiline={true}
                      />
                    </View>
                  </View>
                </View>

                {/* Facebook */}
                <View
                  style={{
                    marginTop: 10,
                    flexDirection: 'row',
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingRight: 7,
                      width: '8%',
                    }}
                  >
                    <FBSVG />
                  </View>
                  <View
                    style={{
                      flexDirection: 'column',
                      width: '92%',
                    }}
                  >
                    <CustomText style={styles.title} textType='semi-bold'>
                      {t("profile_facebook")}:
                    </CustomText>
                    <View>
                      <TextInput
                        style={{
                          ...CommonStyles.editInputField,
                          ...CommonStyles.editInputColor,
                        }}
                        placeholder={t('EditProfile_Placeholder_facebook')}
                        onChangeText={(text) => setFacebook(text)}
                        value={facebook}
                        multiline={true}
                      />
                    </View>
                  </View>
                </View>

                {/* LinkedIn */}
                <View
                  style={{
                    marginTop: 10,
                    flexDirection: 'row',
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingRight: 7,
                      width: '8%',
                    }}
                  >
                    <LinkedInSVG />
                  </View>
                  <View
                    style={{
                      flexDirection: 'column',
                      width: '92%',
                    }}
                  >
                    <CustomText style={styles.title} textType='semi-bold'>
                      {t("profile_linkedIn")}:
                    </CustomText>
                    <View>
                      <TextInput
                        style={{
                          ...CommonStyles.editInputField,
                          ...CommonStyles.editInputColor,
                        }}
                        placeholder={t('EditProfile_Placeholder_linkedIn')}
                        onChangeText={(text) => setLinkedin(text)}
                        value={linkedin}
                        multiline={true}
                      />
                    </View>
                  </View>
                </View>

                {/* Company */}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}
                >
                  {/* Company */}
                  <View
                    style={{
                      flex: 1,
                      marginTop: 10,
                      flexDirection: 'row',
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        paddingRight: 7,
                        width: '15%',
                      }}
                    >
                      <UserSVG />
                    </View>
                    <View
                      style={{
                        flexDirection: 'column',
                        width: '85%',
                      }}
                    >
                      <CustomText style={styles.title} textType='semi-bold'>
                       {t("profile_company")}:
                      </CustomText>
                      <View>
                        <TextInput
                          style={{
                            ...CommonStyles.editInputField,
                            ...CommonStyles.editInputColor,
                          }}
                          placeholder={t("EditProfile_Placeholder_company")}
                          onChangeText={(text) => setCompany(text)}
                          value={company}
                          multiline={true}
                        />
                      </View>
                    </View>
                  </View>
                  {/* Company Position */}
                  <View
                    style={{
                      flex: 1,
                      marginTop: 10,
                      flexDirection: 'row',
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        paddingRight: 7,
                        width: '15%',
                      }}
                    >
                      <UserSVG />
                    </View>
                    <View
                      style={{
                        flexDirection: 'column',
                        width: '85%',
                      }}
                    >
                      <CustomText style={styles.title} textType='semi-bold'>
                        {t("profile_position")}:
                      </CustomText>
                      <View>
                        <TextInput
                          style={{
                            ...CommonStyles.editInputField,
                            ...CommonStyles.editInputColor,
                          }}
                          placeholder={t('EditProfile_Placeholder_company')}
                          onChangeText={(text) => setCompanyPosition(text)}
                          value={company_position}
                          multiline={true}
                        />
                      </View>
                    </View>
                  </View>
                </View>

                <CustomButton
                  label={t('EditProfile_Btn')}
                  onPress={() => updateProfile()}
                  loading={loading}
                />
              </View>
            </View>
          ) : null}
        </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    color: '#696969',
  },
  headerImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    borderTopLeftRadius: wp('4%'),
    borderTopRightRadius: wp('4%'),
    borderBottomRightRadius: wp('4%'),
    borderBottomLeftRadius: wp('13%'),
  },
  profileImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('18%'),
    height: wp('18%'),
    borderRadius: wp('18%'),
    borderColor: 'white',
    borderWidth: wp('0.7%'),
  },
});
