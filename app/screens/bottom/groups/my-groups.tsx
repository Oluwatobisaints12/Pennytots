import { useIsFocused, useFocusEffect } from '@react-navigation/native';

import React, {
  Component,
  useState,
  useCallback,
  useEffect,
  useContext,
  useRef,
} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ListRenderItemInfo
} from 'react-native';
import { useMyGroups } from 'app/redux/group/hooks';
import { Axios } from 'app/api/axios';
// import { showMessage } from 'app/reuseables/toast-message';
import Group from 'app/components/cards/group';
import { useRefetchOnFocus } from 'app/custom-hooks/usefetchonfocus';

function MyGroups({ navigation }: any) {

  const { data, error, isFetching, refetch } = useMyGroups();
  // useRefetchOnFocus(refetch); //refresh on focus

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}
    >
      <View
        style={{
          alignItems: 'center',
          marginVertical: 4,
        }}
      >

      </View>

      <FlatList
        data={data}
        // refreshing={isFetching}
        // onRefresh={() => refetch()}
        style={{
          paddingHorizontal: 20
        }}
        keyExtractor={(item: GroupProps) => item._id}
        renderItem={({ item }: ListRenderItemInfo<GroupProps>) => (
          <Group item={item} navigation={navigation} refreshFunction={() => refetch()} />
        )}
      />
    </View>
  );
}


export default MyGroups;
