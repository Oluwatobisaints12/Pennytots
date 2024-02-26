import React, { useState, useEffect, useContext } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from '@expo/vector-icons/Ionicons';
import { default as themeFont } from 'app/assets/themes/fonts.json';
import { CustomText, CustomButton } from 'app/components/elements';
import { CommonStyles } from 'app/assets/styles';
import HeaderTitle from 'app/components/HeaderTitle';
import {
  useGetHelpDeskCategories,
  useCreateTicket,
} from '../../../redux/helpdesk/hooks';
import SelectDropdown from 'react-native-select-dropdown';
import { useTranslation } from 'react-i18next';

type HelpDeskScreenProps = {
  navigation: any;
};

const CreateHelpDeskTicket: React.FC<HelpDeskScreenProps> = ({
  navigation,
}) => {
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { data: categories } = useGetHelpDeskCategories();
  const { mutateAsync: createTicket, isLoading } = useCreateTicket();
  const { t } = useTranslation();

  async function submit() {
    let payload = {
      title,
      category,
      message: content,
    };
    createTicket(payload).then((response: any) => {
      alert(response.message);
      setContent('');
      setTitle('');
      navigation.goBack();
    });
  }

  return (
    <ScrollView style={{ backgroundColor: '#ffffff' }}>
      <StatusBar barStyle='dark-content' backgroundColor='white' />
      <HeaderTitle title={t('HelpDesk_')} navigation={navigation} />
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View style={{ width: '87%' }}>
          <CustomText
            style={{
              fontSize: 15,
            }}
          >
            {t('HelpDesk_helpText')}
          </CustomText>

          <CustomText
            style={{
              marginTop: 20,
              fontSize: 15,
            }}
            textType='semi-bold'
          >
            {t('HelpDesk_category')}
          </CustomText>

          {categories ? (
            <View>
              <SelectDropdown
                data={categories}
                onSelect={(selectedItem: any, index: any) => {
                  console.log(selectedItem, index);
                  setCategory(selectedItem);
                }}
                renderDropdownIcon={(isOpened: any) => {
                  return (
                    <Ionicons
                      name={isOpened ? 'chevron-up' : 'chevron-down'}
                      size={15}
                      color='gray'
                    />
                  );
                }}
                dropdownIconPosition={'right'}
                buttonStyle={{
                  ...CommonStyles.inputField,
                  width: '100%',
                }}
                buttonTextStyle={{
                  fontFamily: 'regular',
                  fontSize: 14,
                  color: '#696969',
                }}
                rowTextStyle={{
                  fontFamily: 'regular',
                  fontSize: 13,
                }}
                defaultButtonText={t('HelpDesk_categroryDrop')}
                buttonTextAfterSelection={(selectedItem: any, index: any) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem;
                }}
                search={true}
                rowTextForSelection={(item: any, index: any) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item;
                }}
              />
            </View>
          ) : null}

          <CustomText
            style={{
              marginTop: 10,
              fontSize: 15,
            }}
            textType='semi-bold'
          >
            {t('HelpDesk_messageTitle')}
          </CustomText>

          <TextInput
            style={styles.signup}
            maxLength={50}
            onChangeText={(text: any) => {
              setTitle(text);
            }}
            value={title}
          />

          <CustomText
            style={{
              marginTop: 10,
              fontSize: 15,
            }}
            textType='semi-bold'
          >
            {t('HelpDesk_details')}
          </CustomText>

          <TextInput
            multiline={true}
            numberOfLines={10}
            placeholder={t('HelpDesk_messageBox')}
            placeholderTextColor='grey'
            value={content!}
            style={{
              backgroundColor: '#F5F5F5',
              height: hp('35%'),
              textAlignVertical: 'top',
              fontFamily: 'regular',
              fontSize: 16,
              color: '#636363',
              lineHeight: 20,
              fontWeight: '800',
              paddingHorizontal: 10,
              borderRadius: 10,
            }}
            underlineColorAndroid='transparent'
            onChangeText={(contents) => setContent(contents)}
            maxLength={200}
          />

          <View
            style={{
              width: wp('90'),
              marginTop: 30,
            }}
          >
            <CustomButton
              label={t('HelpDesk_sendBtn')}
              onPress={() => submit()}
              loading={isLoading}
              buttonTheme='secondary'
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  signup: {
    height: 60,
    borderRadius: 14,
    paddingLeft: 20,
    backgroundColor: '#f4f4f4',
    marginBottom: 15,
    borderStyle: 'solid',
    marginTop: 10,
    fontSize: 16,
    fontFamily: 'regular',
  },
});

export default CreateHelpDeskTicket;
