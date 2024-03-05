import { View, Text, ImageBackground } from 'react-native';
import React, { useEffect, useState } from 'react';
import HeaderTitle from 'app/components/HeaderTitle';
import { TouchableOpacity } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { UploadPhotoSVG } from 'app/providers/svg/loader';
import { responsiveValue as rv } from 'app/providers/responsive-value';
import { CustomButton, CustomText } from 'app/components/elements';
import { TextInput } from 'react-native';
import { CommonStyles } from 'app/assets/styles';
import { CreateGroupSVG, WarnInfoSVG } from 'app/providers/svg/loader';
import SelectInterests from 'app/components/elements/SelectInterests';
import { useUpdateGroup, useUpdateGroupPicture } from 'app/redux/group/hooks';
import { ScrollView } from 'react-native';
import SelectImageDialog from 'app/components/dialogs/select-image';
import { useTranslation } from 'react-i18next';

const EditGroupScreen = ({ navigation, route }: any) => {
  const { group } = route.params;
  const [showSelectGroupImage, setShowSelectGroupImage] = useState(false);
  const [groupDesc, setGroupDesc] = useState('');
  const [groupName, setGroupName] = useState('');
  const [interest, setInterest] = useState('');
  const { mutateAsync: update, isLoading: loading } = useUpdateGroup();
  const [imageFile, setImageFile] = useState<any>(null);
  const { mutateAsync: updateProfilePicture, isLoading: imageLoading } =
    useUpdateGroupPicture();
  const { t } = useTranslation();

  useEffect(() => {
    if (group) {
      setGroupDesc(group.description);
      setGroupName(group.name);
      setInterest(group.tag._id);
    }
  }, [group]);

  async function updateGroup() {
    let payload = {
      id: group._id,
      data: {
        name: groupName,
        description: groupDesc,
        tag: interest,
      },
    };

    update(payload).then(() => {
      navigation.goBack();
    });
  }

  useEffect(() => {
    if (imageFile && imageFile.uri) {
      const pic = new FormData();

      pic.append('file', imageFile);
      let payload = {
        id: group._id,
        data: pic,
      };

      updateProfilePicture(payload).then(() => {
        navigation.goBack();
      });
    }
  }, [imageFile]);

  if (!group) {
    return null;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
      }}
    >
      <SelectImageDialog
        show={showSelectGroupImage}
        setShow={setShowSelectGroupImage}
        setImage={setImageFile}
      />

      <HeaderTitle title={t('Edit Group')} navigation={navigation} />
      <ScrollView
        style={{
          flex: 1,
          flexDirection: 'column',
          paddingHorizontal: wp('8%'),
        }}
      >
        <View
          style={{
            height: rv(150),
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: 'red'
          }}
        >
          <ImageBackground
            source={
              group.image
                ? { uri: group.image }
                : require('app/assets/group.jpg')
            }
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: rv(120),
              height: rv(120),
            }}
            imageStyle={{
              justifyContent: 'center',
              alignItems: 'center',
              height: rv(120),
              width: rv(120),
              borderRadius: rv(100),
            }}
          >
            <TouchableOpacity
              onPress={() => setShowSelectGroupImage(true)}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                width: '100%',
                borderRadius: rv(100),
                backgroundColor: 'rgba(0,0,0,0.5)',
              }}
            >
              <UploadPhotoSVG width={wp('12')} height={wp('12')} />
            </TouchableOpacity>
          </ImageBackground>
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
            style={CommonStyles.inputField}
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
            style={CommonStyles.inputField}
            maxLength={70}
            onChangeText={(text) => {
              setGroupDesc(text);
            }}
            placeholder={t('GroupDesc_description')}
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
            label={'Update Group'}
            onPress={() => updateGroup()}
            buttonTheme='primary'
            loading={loading}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default EditGroupScreen;
