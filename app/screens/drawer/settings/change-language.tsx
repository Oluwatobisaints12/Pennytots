import React, { useState, useContext } from 'react';
import { View, TextInput, ScrollView, SafeAreaView } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Loader from 'app/components/elements/Loader';
import { GlobalContext } from 'app/GlobalProvider';
import { CustomButton, CustomText } from 'app/components/elements';
import HeaderTitle from 'app/components/HeaderTitle';
import { CommonStyles, PickerSelectStyle } from 'app/assets/styles';
import RNPickerSelect from 'react-native-picker-select';
import { default as themeFont } from 'app/assets/themes/fonts.json';
import Select from '../../../components/elements/Select';
import { useTranslation } from 'react-i18next';
import {i18n} from 'app/App';


type SelectLanguageScreenProps = {
  navigation: any;
};

const ChangeLanguage: React.FC<SelectLanguageScreenProps> = ({
  navigation,
}) => {
  const [language, setLanguage] = useState('');
  const { t } = useTranslation();
  

  async function changeLanguage() {
    await i18n.changeLanguage(language);
  }

  let languages = [
    { label: 'English', value: 'en' },
    { label: 'French', value: 'fr' },
    { label: 'Spanish', value: 'es' },
    { label: 'Portuguese', value: 'pt' },
    { label: 'Arabic', value: 'ar' },
  ];

  return (
    <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}
    >
      <ScrollView style={{ backgroundColor: '#ffffff' }}>
        <HeaderTitle title={t("Language")} navigation={navigation} />

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
                {t('Language')}
              </CustomText>

              <View>
                <Select
                  data={languages}
                  value={language}
                  onSelect={(value: string, index: number) => {
                    setLanguage(value);
                  }}
                />
              </View>

              {/* 
            <View style={CommonStyles.inputField}>
              <RNPickerSelect
                useNativeAndroidPickerStyle={false}
                value={language}
                onValueChange={(value: string) => [setLanguage(value)]}
                placeholder={{
                  label: 'Please select a language',
                  value: null,
                  color: '#000000',
                }}
                style={PickerSelectStyle}
                items={languages}
                Icon={() => {
                  return <Icon name='chevron-down' size={15} color='gray' />;
                }}
              />
            </View> */}
            </View>
            <View
              style={{
                marginTop: 'auto',
              }}
            >
              <CustomButton
                label={t('Settings_language')}
                onPress={() => changeLanguage()}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChangeLanguage;
