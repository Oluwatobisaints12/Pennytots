import React, { FunctionComponent, useState, useContext } from 'react';
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
// import { useTranslation } from 'react-i18next';
import { SignUpHeaderSVG } from 'app/providers/svg/loader';
import { CustomText, CustomButton } from 'app/components/elements';
import Loader from 'app/components/elements/Loader';
import SelectInterests from 'app/components/elements/SelectInterests';
import { Axios } from 'app/api/axios';
import { updateUserInfo } from 'app/redux/user/hooks';
import { useTranslation } from 'react-i18next';


const AreaOfInterests: FunctionComponent<{
  navigation: any;
}> = ({ navigation }) => {

  const [interests, setInterests] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  // const { t, i18n } = useTranslation();

  function updateAreaOfInterests() {
    setLoading(false);

    Axios({
      method: 'post',
      url: '/tags/set-user-tags',
      data: interests,
    })
      .then((response) => {
        updateUserInfo();
        navigation.replace('Home');
      })
      .finally(() => {
        setLoading(false);
      });
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
          {t("Signup_areas_of_interest")}
        </CustomText>

        <CustomText
          style={{
            fontSize: 14,
            marginTop: 5,
            marginBottom: 20,
            color: '#696969',
          }}
        >
          {t("Signup_page5text")}
        </CustomText>

        <SelectInterests
          interests={interests}
          setInterests={setInterests}
          multiple={true}
        />
      </View>

      <View
        style={{
          marginTop: 'auto',
          width: '100%',
        }}
      >
        <View>
          <CustomButton
            label={t("Signup_allDone_btn")}
            onPress={() => updateAreaOfInterests()}
            loading={loading}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default AreaOfInterests;
