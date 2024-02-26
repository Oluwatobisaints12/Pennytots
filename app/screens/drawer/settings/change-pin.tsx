import React, { useState, useContext } from 'react';
import { View, TextInput, ScrollView, SafeAreaView } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Loader from 'app/components/elements/Loader';
import { CustomButton, CustomText } from 'app/components/elements';
import HeaderTitle from 'app/components/HeaderTitle';
import { CommonStyles } from 'app/assets/styles';
import { Axios } from 'app/api/axios';
import { ShowAlert } from 'app/providers/toast';
import { useTranslation } from 'react-i18next';

type ChangePINScreenProps = {
  navigation: any;
};

const ChangePin: React.FC<ChangePINScreenProps> = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [currentPIN, setCurrentPIN] = useState('');
  const [newPIN, setNewPIN] = useState('');
  const { t } = useTranslation();

  async function changePIN() {
    if (!currentPIN.trim()) {
      ShowAlert({
        type: 'error',
        className: 'Error',
        message: 'Current PIN is required',
      });
      return;
    }

    if (!newPIN.trim()) {
      ShowAlert({
        type: 'error',
        className: 'Error',
        message: 'New PIN is required',
      });
      return;
    }

    setLoading(true);
    await Axios({
      method: 'patch',
      url: '/user/reset-password',
      data: {
        password: currentPIN,
        newPassword: newPIN,
      },
    })
      .then((response: any) => {
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

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}
    >
      <ScrollView style={{ backgroundColor: '#ffffff' }}>
        <HeaderTitle title={t('Settings_pin')} navigation={navigation} />
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
                }}
              >
                {t('ChangePin_currentPin')}
              </CustomText>
              <TextInput
                style={CommonStyles.inputField}
                onChangeText={(text) => setCurrentPIN(text)}
                inlineImageLeft='key'
                placeholder={t('ChangePin_currrentPinPlaceholder')}
                inlineImagePadding={20}
                textContentType='password'
                secureTextEntry={true}
                keyboardType='numeric'
                maxLength={4}
                value={currentPIN}
              />
            </View>
            <View
              style={{
                flexDirection: 'column',
                marginTop: 30,
              }}
            >
              <CustomText
                style={{
                  color: '#797978',
                }}
              >
                {t('ChangePin_newPin')}
              </CustomText>
              <TextInput
                style={CommonStyles.inputField}
                onChangeText={(text) => setNewPIN(text)}
                inlineImageLeft='key'
                placeholder={'ChangePin_newPinPlaceholder'}
                inlineImagePadding={20}
                textContentType='password'
                secureTextEntry={true}
                keyboardType='numeric'
                maxLength={4}
                value={newPIN}
              />
            </View>
            <View
              style={{
                marginTop: 'auto',
              }}
            >
              <CustomButton
                label={t('ChangePin_title')}
                onPress={() => changePIN()}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChangePin;
