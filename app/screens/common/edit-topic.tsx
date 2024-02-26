import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  SafeAreaView
} from 'react-native';

import React, {
  FunctionComponent,
  useEffect,
  useState,
  useContext,
} from 'react';

import HeaderTitle from '../../components/HeaderTitle';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { CustomButton, CustomText } from '../../components/elements';
import { topic } from 'app/api';
import { ShowAlert } from 'app/providers/toast';
import { useTranslation } from 'react-i18next';

type PostATopicProps = {
  navigation: any;
  route: any;
};

const EditTopic: FunctionComponent<PostATopicProps> = ({
  navigation,
  route,
}) => {
  const { topicData } = route.params;
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');

  useEffect(() => {
    if (topicData && topicData.content) {
      setContent(topicData.content);
    }
  }, [topicData]);

  const handleSubmitPost = () => {
    if (!content) {
      alert('Topic cannot be empty');
      return;
    }

    if (topicData && topicData._id) {

      //Show Loader    
      setLoading(true);
      topic.editTopic(topicData._id, { content }).then(() => {

        ShowAlert({ type: 'info', className: 'Success', message: "Topic Updated Successfully" })
        navigation.goBack();
      }).finally(() => {
        setLoading(false);
      })
    }
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}
    >
      <SafeAreaView>
      <HeaderTitle title='Edit topic' navigation={navigation} />

      {topicData ? (
        <View
          style={{
            paddingHorizontal: wp('10%'),
            flexDirection: 'column',
          }}
        >
          <TextInput
            multiline={true}
            numberOfLines={10}
            placeholder={'Type your topic'}
            placeholderTextColor='#B5B5B5'
            style={{
              backgroundColor: '#F5F5F5',
              height: hp('23%'),
              textAlignVertical: 'top',
              fontFamily: 'ArialNova',
              fontSize: 16,
              color: 'black',
              lineHeight: 20,
              fontWeight: '800',
              paddingHorizontal: 10,
              borderRadius: 10,
            }}
            underlineColorAndroid='transparent'
            onChangeText={(contents) => setContent(contents)}
            maxLength={200}
            value={content}
          />



          <CustomButton
            label={t('Topics_editTopic')}
            buttonTheme='primary'
            onPress={() => handleSubmitPost()}
            loading={loading}
          />

          {/* <TouchableHighlight
            onPress={() => handleSubmitPost()}
            style={{
              backgroundColor: 'gold',
              height: 60,
              width: '100%',
              marginTop: 15,
              marginBottom: 20,
              borderRadius: 30,
              paddingVertical: 15,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CustomText
              style={{
                color: 'black',
                textAlign: 'center',
                fontSize: 16,
              }}
            >
              Edit Topic
            </CustomText>
          </TouchableHighlight> */}
        </View>
      ) : null}
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  attachmentBox: {
    borderRadius: 40,
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
    fontSize: 25,
    color: '#333333',
    fontWeight: 'bold',
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  signup: {
    height: 60,
    borderColor: '#D0CFD0',
    borderWidth: 1,
    borderRadius: 40,
    paddingLeft: 20,
    backgroundColor: '#ffffff',
    marginBottom: 15,
    borderStyle: 'solid',
    marginTop: 10,
  },
  replycomment: {
    flex: 1,
    flexDirection: 'row',
    height: 45,
    borderColor: '#D0CFD0',
    borderWidth: 1,
    borderRadius: 40,
    paddingLeft: 20,
    backgroundColor: '#D1D1D1',
    marginBottom: 15,
    borderStyle: 'solid',
    marginTop: 10,
    position: 'relative',
  },
  reply: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-around',
    borderColor: '#D0CFD0',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 20,
    backgroundColor: '#ffffff',
    marginBottom: 15,
    borderStyle: 'solid',
    marginTop: 10,
  },
  itemList: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#ffffff',
    paddingTop: hp('2%'),
    borderRadius: 20,
    margin: 20,
  },
  testItems: {
    flex: 1,
    flexDirection: 'row',
    height: 60,
    borderColor: '#C2C2C2',
    borderWidth: 0.5,
    borderRadius: 5,
    paddingLeft: 20,
    backgroundColor: '#FBFBFB',
    marginBottom: 10,
    paddingTop: hp('2%'),
  },
  testItemsTitle: { width: wp('62%'), paddingTop: hp('0.8%') },
  medicalinput: {
    height: 50,
    borderColor: '#f8f8fa',
    borderWidth: 2,
    marginBottom: 20,
    borderRadius: 33,
    paddingLeft: 20,
    backgroundColor: '#f0f0f0',
  },
  medicalinputarea: {
    height: 120,
    borderColor: '#f8f8fa',
    borderWidth: 2,
    marginBottom: 20,
    borderRadius: 33,
    paddingLeft: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'flex-start',
  },
  icontext: {
    paddingTop: 30,
    color: 'gray',
    fontSize: 18,
    fontWeight: '200',
    textAlign: 'center',
    fontFamily: 'Segoe UI',
  },
  profilename: {
    fontFamily: 'Segoe UI',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 27,
  },
  touchbtn: {
    backgroundColor: 'purple',
    height: 50,
    width: 150,
    borderColor: 'purple',
    borderWidth: 2,
    borderRadius: 33,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
  },
  consultview: {
    flex: 1,
    width: 500,
    flexDirection: 'row',
    alignItems: 'stretch',
    borderStyle: 'solid',
    borderBottomColor: '#F8F8F8',
    borderBottomWidth: 2,
    paddingTop: 10,
    marginLeft: 16,
    paddingBottom: 10,
  },
  medicalview: {
    flex: 1,
    flexDirection: 'column',
    borderStyle: 'solid',
    paddingTop: 10,
    marginLeft: 16,
    marginRight: 17,
  },
  scheduleview: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'stretch',
    marginLeft: 16,
    marginRight: 17,
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
  },
  image: {
    width: 400,
    height: 481,
    // marginVertical: 12,
  },
  text: {
    color: '#707070',
    textAlign: 'center',
    fontSize: 18,
    width: '87%',
    fontFamily: 'Helvetica',
  },
  splashbtn: {
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    height: 60,
    width: 250,
    borderColor: 'black',
    borderWidth: 2,
    marginTop: 1,
    marginBottom: 20,
    borderRadius: 30,
    paddingTop: 25,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 14,
    textAlign: 'center',
    color: 'gold',
    display: 'flex',
    marginLeft: 20,
    marginRight: 20,
  },
  titleAccount: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  tabStyle: {},
  scrollStyle: {
    backgroundColor: 'white',
    paddingLeft: 65,
    paddingRight: 65,
    // justifyContent: 'center',
  },
  tabBarTextStyle: {
    fontSize: 14,
    fontWeight: 'normal',
  },
  underlineStyle: {
    height: 3,
    backgroundColor: 'red',
    borderRadius: 3,
    width: 15,
  },
  topbar: {
    flexDirection: 'row',
    backgroundColor: 'dimgray',
    paddingTop: 15,
  },
  trigger: {
    padding: 5,
    margin: 5,
  },
  triggerText: {
    color: 'white',
  },
  disabled: {
    color: '#ccc',
  },
  divider: {
    marginVertical: 5,
    marginHorizontal: 2,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  logView: {
    flex: 1,
    flexDirection: 'column',
  },
  logItem: {
    flexDirection: 'row',
    padding: 8,
  },
  slideInOption: {
    padding: 5,
  },
  bottom: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  touchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
  floatingButtonStyle: {
    resizeMode: 'contain',
    width: '125%',
    height: '125%',
    //backgroundColor:'black'
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  profile: {
    height: 60,
    borderColor: '#C2C2C2',
    borderWidth: 0.5,
    borderRadius: 5,
    paddingLeft: 20,
    backgroundColor: '#FBFBFB',
    marginBottom: 10,
  },
  topicStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#f6f6f6',
    paddingTop: 20,
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 15,
  },
  label: {
    marginVertical: 5,
  },
});

export default EditTopic;
