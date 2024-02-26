import React, { useState, useEffect, useContext } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// import { useTranslation } from 'react-i18next';
// import Loader from 'app/components/elements/Loader';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { default as themeFont } from 'app/assets/themes/fonts.json';
import { CustomText, CustomButton } from 'app/components/elements';
import { Axios } from 'app/api/axios';
import HeaderTitle from 'app/components/HeaderTitle';
import { useGetHelpDeskTickets } from '../../../redux/helpdesk/hooks';
import { StyleSheet } from 'react-native';
import { timeAgo } from 'app/helpers/time-ago';
import { useTranslation } from 'react-i18next';

type HelpDeskScreenProps = {
  navigation: any;
};

const HelpDesk: React.FC<HelpDeskScreenProps> = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const { data: helpDeskTickets } = useGetHelpDeskTickets();
  const { t } = useTranslation();

  useEffect(() => {
    console.log(helpDeskTickets, 'tickets');
  }, [helpDeskTickets]);

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <StatusBar barStyle='dark-content' backgroundColor='white' />
      <HeaderTitle title={t('HelpDesk_')} navigation={navigation} />
      <ScrollView
        contentContainerStyle={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View style={{ width: '90%', flex: 1, flexDirection: 'column' }}>
          {helpDeskTickets ? (
            <>
              {helpDeskTickets.map((item: any, index: number) => (
                <TouchableOpacity
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    marginVertical: 10,
                    alignItems: 'center',
                  }}
                  onPress={() =>
                    navigation.navigate('helpdesk-messages', {
                      helpdeskId: item._id,
                      helpdesk: item,
                    })
                  }
                >
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 40,
                      backgroundColor: 'gold',
                      marginRight: 20,
                    }}
                  ></View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'column',
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <CustomText
                        style={{
                          fontSize: 14,
                          color: '#000000',
                          maxWidth: '70%',
                        }}
                        textType='bold'
                      >
                        {item.title}
                      </CustomText>

                      <CustomText
                        style={{
                          fontSize: 10,
                          color: '#9D9D9D',
                          marginLeft: 5,
                        }}
                      >
                        {timeAgo(item.createdAt)}
                      </CustomText>
                    </View>
                    <View>
                      <CustomText
                        style={{
                          fontSize: 12,
                          color: '#9D9D9D',
                          flexWrap: 'nowrap',
                          marginTop: 5,
                        }}
                      >
                        {' '}
                        {t('HelpDesk_category')}: {item.category}
                      </CustomText>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </>
          ) : null}
        </View>
      </ScrollView>

      <View style={styles.touchableOpacityStyle}>
        <CustomButton
          label={t('HelpDesk_compose')}
          textSize={14}
          style={{
            height: 50,
          }}
          onPress={() => navigation.navigate('create-ticket')}
        />
      </View>
    </View>
  );
};

export default HelpDesk;

const styles = StyleSheet.create({
  floatingbuttonStyle: {
    resizeMode: 'contain',
    width: '125%',
    height: '125%',
  },
  touchableOpacityStyle: {
    position: 'absolute',
    width: 130,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 50,
  },
});
