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
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { SignUpHeaderSVG } from 'app/providers/svg/loader';
import { CustomText, CustomButton } from 'app/components/elements';
import Loader from 'app/components/elements/Loader';
// import { GlobalContext } from '../../app/GlobalProvider';
import { CommonStyles } from 'app/assets/styles';
import { Axios } from 'app/api/axios';
import { ShowAlert } from 'app/providers/toast';
import { useTranslation } from 'react-i18next';

const Company: FunctionComponent<{
  navigation: any;
}> = ({ navigation }) => {
  // const { AXIOS, showToast, appToken } = useContext(GlobalContext);

  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState('');
  const [company_position, setCompanyPosition] = useState('');
  const { t } = useTranslation();

  const validateURL = (link: string) => {
    const regex = new RegExp(
      '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?',
    );
    return regex.test(link);
  };

  const updateProfile = () => {
    //Show Loader
    setLoading(true);
    var formData = {
      company_position,
      company,
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
          message: 'Company Information Updated Successfully',
        });

        navigation.replace('area-of-interest');
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
      <Loader loading={loading} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Image
          source={require('../../assets/logo.png')}
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
          {t("Signup_beProfessional")}
        </CustomText>

        <CustomText
          style={{
            fontSize: 14,
            marginTop: 5,
            marginBottom: 20,
            color: '#696969',
          }}
        >
          {t("Signup_page4text")}
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
            {t("Signup_placeOfWork")}
          </CustomText>

          <TextInput
            style={CommonStyles.inputField}
            onChangeText={(text: string) => {
              setCompany(text);
            }}
            inlineImageLeft='callplain'
            placeholder={t("profile_company")}
            inlineImagePadding={20}
            value={company}
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
            {t("Signup_jobTitle")}
          </CustomText>

          <TextInput
            style={CommonStyles.inputField}
            onChangeText={(text: string) => {
              setCompanyPosition(text);
            }}
            inlineImageLeft='callplain'
            placeholder={t("Signup_jobTitle")}
            inlineImagePadding={20}
            value={company_position}
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
    </ScrollView>
  );
};

export default Company;
