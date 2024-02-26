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
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,Platform
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { SignUpHeaderSVG } from 'app/providers/svg/loader';
import { CustomText, CustomButton } from 'app/components/elements';
import Loader from 'app/components/elements/Loader';
import { GlobalContext } from 'app/GlobalProvider';
import { CommonStyles } from 'app/assets/styles';
import { Axios } from 'app/api/axios';
import { ShowAlert } from 'app/providers/toast';
import { useTranslation } from 'react-i18next';



const Personal: FunctionComponent<{
  navigation: any;
}> = ({ navigation }) => {

  const [loading, setLoading] = useState(false);
  const [bio, setBio] = useState('');
  const [facebook, setFacebook] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [website, setWebsite] = useState('');
  const { t } = useTranslation();


  const validateURL = (link: string) => {
    const regex = new RegExp(
      '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?',
    );
    return regex.test(link);
  };

  const updateProfile = () => {
    if (facebook && !validateURL(facebook)) {
      ShowAlert({
        type: 'error',
        className: 'Error',
        message: 'Invalid facebook link',
      });

      return;
    }

    if (linkedin && !validateURL(linkedin)) {
      ShowAlert({
        type: 'error',
        className: 'Error',
        message: 'Invalid linkedin link',
      });
      return;
    }

    if (website && !validateURL(website)) {
      ShowAlert({
        type: 'error',
        className: 'Error',
        message: 'Invalid web link',
      });

      return;
    }

    //Show Loader
    setLoading(true);
    var formData = {
      bio,
      website,
      facebook,
      linkedin,
    };

    Axios({
      method: 'POST',
      url: '/user/update-profile',
      data: formData,
    })
      .then(async (response: any) => {
        ShowAlert({
          type: 'success',
          className: 'Success',
          message: 'Updated Successfully',
        });

        navigation.replace('company');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
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
            {t("Signup_beFound")}
          </CustomText>

          <CustomText
            style={{
              fontSize: 14,
              marginTop: 5,
              marginBottom: 20,
              color: '#696969',
            }}
          >
            {t("Signup_page3text")}
          </CustomText>

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
              {t("EditProfile_Bio")}
            </CustomText>

            <TextInput
              style={CommonStyles.inputField}
              onChangeText={(text: string) => {
                setBio(text);
              }}
              inlineImageLeft='callplain'
              placeholder={t("EditProfile_Bio")}
              inlineImagePadding={20}
              value={bio}
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
              {t("Signup_facebook")}
            </CustomText>

            <TextInput
              style={CommonStyles.inputField}
              onChangeText={(text: string) => {
                setFacebook(text);
              }}
              inlineImageLeft='callplain'
              placeholder='Facebook'
              inlineImagePadding={20}
              value={facebook}
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
              {t("profile_linkedIn")}
            </CustomText>

            <TextInput
              style={CommonStyles.inputField}
              onChangeText={(text: string) => {
                setLinkedin(text);
              }}
              inlineImageLeft='callplain'
              placeholder='Linkedin'
              inlineImagePadding={20}
              value={linkedin}
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
              {t("Signup_website")}
            </CustomText>

            <TextInput
              style={CommonStyles.inputField}
              onChangeText={(text: string) => {
                setWebsite(text);
              }}
              inlineImageLeft='callplain'
              placeholder='Website'
              inlineImagePadding={20}
              value={website}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate('company')}
              style={{
                paddingLeft: 7,
              }}
            >
              <CustomText
                style={{
                  color: 'gold',
                }}
                textType='bold'
              >
                {t("Signup_Do_Laterbtn")}
              </CustomText>
            </TouchableOpacity>
          </View>

          <View
            style={{
              width: wp('30'),
            }}
          >
            <CustomButton
              label={t("Signup_nextbtn")}
              buttonTheme='secondary'
              onPress={() => updateProfile()}
              // icon='long-arrow-right'
              style={{
                borderRadius: 20,
              }}
              loading={loading}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const styles:any = StyleSheet.create({
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

export default Personal;
