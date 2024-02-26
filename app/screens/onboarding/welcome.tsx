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
  SafeAreaView,
  Text
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
import SelectDropdown from 'react-native-select-dropdown';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { default as themeFont } from 'app/assets/themes/fonts.json';
import { userConstants } from '../../constants/user';
import { useSelector } from 'react-redux';
import { userAuthInfo } from 'app/redux/user/reducer';
import Select from '../../components/elements/Select';
import { useTranslation } from 'react-i18next';

const Welcome: FunctionComponent<{
  navigation: any;
}> = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const { t } = useTranslation();

  const [isReady, setIsReady] = useState(false);

  const user = useSelector(userAuthInfo);

  useEffect(() => {

    if (user && user.interests && user.interests?.length > 0) {
      navigation.replace('Home');
    }
    else {
      setIsReady(true);
    }
  }, [user])

  if (!isReady) {
    return null
  }


  const updateProfile = () => {

    if (!gender) {
      ShowAlert({
        type: 'error',
        className: 'Error',
        message: 'Gender is required',
      });
      return;
    }

    if (!age) {
      ShowAlert({
        type: 'error',
        className: 'Error',
        message: 'Gender is required',
      });
      return;
    }


    setLoading(true)

    const formData = {
      city,
      state,
      age,
      gender
    }

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

        navigation.replace('personal');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
        paddingHorizontal: wp('5'),
      }}
    >
      <SafeAreaView>
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
          {t('Signup_tellUsMore')}
        </CustomText>

        <CustomText
          style={{
            fontSize: 14,
            marginTop: 5,
            marginBottom: 20,
            color: '#696969',
          }}
        >
          Provide more details about you
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
            {t("Signup_age")}
          </CustomText>

          <Select
            data={userConstants.ageRange}
            value={age}
            onSelect={(value: string, index: number) => {
              setAge(value);
            }}

          />

          <CustomText
            style={{
              color: 'black',
            }}
          >
            {t("Signup_gender")}
          </CustomText>

          <Select
            data={userConstants.genders}
            value={gender}
            onSelect={(value: string, index: number) => {
              setGender(value);
            }}

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
            {t("Signup_town")}
          </CustomText>

          <TextInput
            style={CommonStyles.inputField}
            onChangeText={(text: string) => {
              setCity(text);
            }}
            inlineImageLeft='callplain'
            placeholder={t("Signup_town")}
            inlineImagePadding={20}
            value={city}
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
            {t("Signup_State")}
          </CustomText>

          <TextInput
            style={CommonStyles.inputField}
            onChangeText={(text: string) => {
              setState(text);
            }}
            inlineImageLeft='callplain'
            placeholder={t("Signup_State")}
            inlineImagePadding={20}
            value={state}
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
            onPress={() => navigation.navigate('area-of-interest')}
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
      </SafeAreaView>
    </ScrollView>
  );
};

export default Welcome;
