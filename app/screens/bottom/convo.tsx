import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  StatusBar,
  FlatList,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { TopicCard } from '../../components/cards/topics';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import ConvoNotificationIcon from 'app/components/convo-icon';
import { ITopic } from 'app/redux/topic/types';
import { useConvos } from 'app/redux/topic/hooks';
import { useGetUnreadNotifications } from 'app/redux/main/hooks';
import {main}  from "app/api/main";


interface IConvoScreen {
  navigation: any;
  route: any;
}

interface IConvos {
  _id: string;
  topicId: ITopic;
}

const ConvoScreen: React.FC<IConvoScreen> = ({ navigation, route }) => {

  const {  data, isFetching, refetch } = useConvos();
  const {  data: unread } = useGetUnreadNotifications(false);

  const { count } = route.params;

  useEffect(() => {
    if (unread && unread.convos.length > 0) { 
   
      main.clearUnReadNotifications({source: "convos"}).then((response) => { 
        console.log(response);
      })
    }
  }, [unread])


  return (
    <SafeAreaView style={{ flexDirection: 'column', backgroundColor: 'white' }}>
      <StatusBar barStyle='dark-content' backgroundColor='white' />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            marginLeft: 15,
            marginBottom: 5,
          }}
        >
          <FontAwesome
            name='arrow-left'
            size={22}
            color='black'
            style={{
              marginRight: 15,
            }}
          />
        </TouchableOpacity>
        <ConvoNotificationIcon count={count} />
      </View>
      <View>
        <FlatList
          data={data}
          keyExtractor={(item: IConvos, index) => item._id}
          refreshing={isFetching}
          onRefresh={() => refetch()}
          renderItem={({ item }) => {
            return (
              <TopicCard
                item={item.topicId}
                navigation={navigation}
                convo={true}
                refreshFunction={() => refetch()}
              />
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default ConvoScreen;
