import React, { useEffect } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  InteractionManager,
  ScrollView
} from 'react-native';

import { CustomText } from '../../components/elements';
import useMyChat from 'app/redux/chat/hooks';
import { ChatCard } from 'app/components/cards/chats';
import { CommonStyles } from 'app/assets/styles';
import { useFocusEffect } from '@react-navigation/native';

interface IChat {
  navigation: any;
}

function Chat({ navigation }: IChat) {
  const { status, data, error, isFetching, refetch, isLoading } = useMyChat();

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('tabPress', async () => {
  //     // Unsubscribe to event listener when component unmount
  //     refetch();
  //   });
  //   return () => unsubscribe();
  // }, [navigation]);

  useEffect(() => {
    console.log('reddy', data)
  }, [data])

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      const fetchChats = async () => {
        try {
          if (isActive) {
            if (!isFetching || !isLoading) {
              refetch();
            }

          }
        } catch (e) {
          // Handle error
        }
      };

      fetchChats();
      return () => {
        isActive = false;
      };
    }, []),
  );

  let botDetails = {
    __v: 0,
    _id: 'bot',
    country: 'Nigeria',
    createdAt: '2021-12-16T15:53:56.071Z',
    email: 'bot@gmail.com',
    first_name: '',
    profile_picture:
      'https://storage.googleapis.com/pennytots.appspot.com/app%20files/logobanner.png',
    interests: [],
    last_name: 'Updates',
    middle_name: '',
    mobile_phone_number: '00000000000',
    roles: [],
    status: 'ACTIVE',
    suspended: false,
    updatedAt: '2022-02-17T18:37:11.976Z',
    verified: false,
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
      }}
    >
      <TouchableOpacity
        style={{
          ...CommonStyles.topicStyle,
          flex: 0,
          marginTop: 10,
        }}
        onPress={() =>
          navigation.push('Common', {
            screen: 'private-chat',
            params: {
              bot: true,
              userDetails: botDetails,
            },
          })
        }
      >
        <View style={{ width: '20%' }}>
          <View>
            <Image
              source={require('app/assets/logo_new.png')}
              style={{
                width: 55,
                height: 55,
                borderRadius: 27.5,
                borderColor: 'white',
                paddingHorizontal: 8,
              }}
            />
          </View>
        </View>
        <View style={{ width: '80%', height: '100%' }}>
          <View
            style={{
              flexDirection: 'row',
            }}
          >
            <View style={{ width: '100%', height: '100%' }}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  height: 60,
                }}
                onPress={() =>
                  navigation.push('Common', {
                    screen: 'private-chat',
                    params: {
                      bot: true,
                      userDetails: botDetails,
                    },
                  })
                }
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <CustomText
                    style={{
                      color: 'black',
                      fontSize: 16,
                      paddingRight: 4,
                      marginTop: 3,
                    }}
                    textType='bold'
                  >
                    Updates
                  </CustomText>

                  <Image
                    source={require('app/assets/verified.png')}
                    style={{
                      width: 13,
                      height: 13,
                    }}
                  />
                </View>
                {/* <CustomText>System</CustomText> */}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>


      <View style={{
        flexDirection: 'column',
      }}>
        {data && data.length > 0 ? (
          data.map((item: any, index: number) => (
            <ChatCard
              key={index}
              item={item}
              navigation={navigation}
              refreshFunction={() => refetch()}
            />
          ))) : null}

      </View>


    </ScrollView>
  );
}

export default Chat;
