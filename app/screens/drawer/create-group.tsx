import {
  View,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React, { FunctionComponent, useState, useContext } from 'react';
import HeaderTitle from 'app/components/HeaderTitle';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SelectImageDialog from 'app/components/dialogs/select-image';
import Loader from 'app/components/elements/Loader';
import { CustomButton, CustomText } from 'app/components/elements';
import SelectInterests from 'app/components/elements/SelectInterests';
import { CreateGroupSVG, WarnInfoSVG } from 'app/providers/svg/loader';
import { default as themeFont } from 'app/assets/themes/fonts.json';
import { Axios } from 'app/api/axios';
import { useTranslation } from 'react-i18next';

type PostATopicProps = {
  navigation: any;
};

const CreateGroup: FunctionComponent<PostATopicProps> = ({ navigation }) => {
  const [showSelectImage, setShowSelectImage] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [groupName, setGroupName] = useState<string>('');
  const [groupDesc, setGroupDesc] = useState<string>('');
  const [interest, setInterest] = useState<string>('');
  const { t } = useTranslation();

  async function createGroup() {
    if (interest.length === 0) {
      alert('Please select an interest');
      return;
    }
    if (groupName.length === 0) {
      alert('Group name is required');
      return;
    }
    if (groupDesc.length == 0) {
      alert('Group Description is required');
      return;
    }

    const formData = new FormData();
    formData.append('name', groupName);
    formData.append('description', groupDesc);
    formData.append('tag', interest);
    if (imageFile) {
      formData.append('file', imageFile);
    }

    setLoading(true);
    await Axios({
      method: 'POST',
      url: '/group/create',
      data: formData,
    })
      .then((response: any) => {
        //showToast(response.data.message);
        navigation.goBack();
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
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: 'white',
          flexDirection: 'column',
        }}
      >
        <HeaderTitle title={t('CreateGroup_title')} navigation={navigation} />

        <Loader loading={loading} />
        <SelectImageDialog
          show={showSelectImage}
          setShow={setShowSelectImage}
          setImage={setImageFile}
        />

        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            paddingHorizontal: wp('8%'),
          }}
        >
          <View
            style={{
              alignItems: 'center',
              marginTop: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => setShowSelectImage(true)}
              activeOpacity={0.7}
              style={{
                borderRadius: 35,
                height: 70,
                width: 70,
                alignItems: 'center',
                flexDirection: 'row',
                marginLeft: -30,
              }}
            >
              {imageFile ? (
                <Image
                  source={{ uri: imageFile }}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                  }}
                />
              ) : (
                <View
                  style={{
                    backgroundColor: '#E7E7E7',
                    padding: 30,
                    borderRadius: 80,
                  }}
                >
                  <CreateGroupSVG width={50} height={50} />
                </View>
              )}
            </TouchableOpacity>
          </View>

          <View
            style={{
              marginTop: 40,
              flexDirection: 'column',
            }}
          >
            <CustomText
              style={{
                color: '#797978',
                marginBottom: 5,
              }}
            >
              {t('CreateGroup_groupName')}{' '}
            </CustomText>

            <TextInput
              style={styles.signup}
              maxLength={20}
              onChangeText={(text) => {
                setGroupName(text);
              }}
              placeholder={t('CreateGroup_groupName')}
              inlineImagePadding={20}
              value={groupName}
            />
          </View>

          <View
            style={{
              flexDirection: 'column',
            }}
          >
            <CustomText
              style={{
                color: '#797978',
                marginBottom: 5,
              }}
            >
              {t('CreateGroup_Description')}{' '}
            </CustomText>

            <TextInput
              style={styles.signup}
              maxLength={70}
              onChangeText={(text) => {
                setGroupDesc(text);
              }}
              placeholder={t('CreateGroup_Description')}
              inlineImagePadding={20}
              value={groupDesc}
            />
          </View>

          <View
            style={{
              marginTop: 20,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <CustomText
              style={{
                fontSize: 14,
                marginRight: 10,
                marginTop: 5,
                color: '#696969',
              }}
              textType='bold'
            >
              Select a tag relevant to this group
            </CustomText>

            <WarnInfoSVG />
          </View>
          <SelectInterests interest={interest} setInterest={setInterest} />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginBottom: 50,
            }}
          >
            <CustomButton
              label={t('CreateGroup_title')}
              onPress={() => createGroup()}
              buttonTheme='primary'
              loading={loading}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
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
    fontFamily: themeFont.regular,
  },
});

export default CreateGroup;
