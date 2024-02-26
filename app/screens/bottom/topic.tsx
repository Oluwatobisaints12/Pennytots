import { useTopics } from 'app/redux/topic/hooks';
import React from 'react';

import {
  View,
  StatusBar,
  FlatList,
  Text, TouchableOpacity, StyleSheet, Image
} from 'react-native';

import { TopicCard } from 'app/components/cards';
import FloatingAddSVG from 'app/assets/svg/floating-add.svg';
import { responsiveValue as rv } from 'app/providers/responsive-value';

function Topic({ navigation }: any) {
  const { status, data, error, isFetching, refetch } = useTopics();

  return (
    <View style={{ flexDirection: 'column', flex: 1 }}>
      <StatusBar barStyle='dark-content' backgroundColor='white' />
      {/* <View>
        <Text>
          status: {status} { '\n'}
          isFetching: {isFetching.toString()} { '\n'}  
          error: {error}
        </Text>
       </View> */}
      <View>
        <FlatList
          data={data}
          keyExtractor={(item: any, index) => item._id}
          refreshing={false}
          onRefresh={() => refetch()}
          renderItem={({ item }) => {
            return <TopicCard item={item} navigation={navigation} convo={false} refreshFunction={() => refetch()} />;
          }}
        />
      </View>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() =>
          navigation.push('Home', { screen: 'PostTopic' })
        }
        style={styles.touchableOpacityStyle}
      >
        <FloatingAddSVG
          width={rv(55)}
          height={rv(55)}
        />


      </TouchableOpacity>
    </View>

  );
}


const styles = StyleSheet.create({
  touchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
})
export default Topic;
