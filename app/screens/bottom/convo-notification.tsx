import { View, TouchableOpacity, Dimensions } from 'react-native';
import React, { FunctionComponent, useEffect, useState } from 'react';
import ConvoNotificationIcon from 'app/components/convo-icon';
import { useGetUnreadNotifications } from 'app/redux/main/hooks';
import { useIsFocused } from '@react-navigation/native';


type HeaderTitleProps = {
  navigation: any;
};

const ConvoNotification: FunctionComponent<HeaderTitleProps> = ({
  navigation,
}) => {


  const isVisible = useIsFocused();

  //only call data when its visible

  const { data, isFetching } = useGetUnreadNotifications(isVisible);




  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate('convos', { count: data?.convos.length })}
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <ConvoNotificationIcon count={data?.convos.length} />
      </TouchableOpacity>
    </View>
  );
};

export default ConvoNotification;
