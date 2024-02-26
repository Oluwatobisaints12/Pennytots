import React, { useState, useContext, useEffect } from 'react';
import { View, TextInput, ScrollView, SafeAreaView } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Loader from 'app/components/elements/Loader';
import { CustomButton, CustomText } from 'app/components/elements';
import HeaderTitle from 'app/components/HeaderTitle';
import SelectInterests from 'app/components/elements/SelectInterests';
import { Axios } from 'app/api/axios';
import { useSelector } from 'react-redux';
import { userAuthInfo } from 'app/redux/user/reducer';
import { ShowAlert } from 'app/providers/toast';
import { useTranslation } from 'react-i18next';

type SelectAreaOfInterestScreenProps = {
  navigation: any;
};

const AreaOfInterest: React.FC<SelectAreaOfInterestScreenProps> = ({
  navigation,
}) => {
  const profile = useSelector(userAuthInfo);
  const { t } = useTranslation();

  const [interests, setInterests] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      setInterests(profile.interests!);
    }

    load();
  }, []);

  function updateAreaOfInterests() {
    setLoading(true);

    Axios({
      method: 'post',
      url: '/tags/set-user-tags',
      data: interests,
    })
      .then(() => {
        ShowAlert({
          type: 'info',
          className: 'Success',
          message: 'Your interest have been updated',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}
    >
      <ScrollView style={{ backgroundColor: '#ffffff' }}>
        <HeaderTitle title={t('Signup_areas_of_interest')} navigation={navigation} />
        <Loader loading={loading} />
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              width: '85%',
              height: hp('80'),
              marginTop: 20,
            }}
          >
            <View
              style={{
                flexDirection: 'column',
              }}
            >
              <CustomText
                style={{
                  color: '#797978',
                  fontSize: 16,
                  marginBottom: 20,
                }}
                textType='semi-bold'
              >
                {t('AreasOfInterest_text')}
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
              }}
            >
              <CustomButton
                label={'AreasOfInterest_button'}
                onPress={() => updateAreaOfInterests()}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AreaOfInterest;
