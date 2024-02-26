import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import React from 'react';

import { useSelector } from 'react-redux';
import {
  IsLoggedIn,
  userId,
  userToken,
  userAuthInfo,
} from 'app/redux/user/reducer';
import { logout } from 'app/redux/user/hooks';

const Homes = () => {
  const isLoggedIn = useSelector(IsLoggedIn);
  const Id = useSelector(userId);
  const token = useSelector(userToken);
  const userAuth = useSelector(userAuthInfo);

  return (
    <SafeAreaView>
      {userAuth ? (
        <>
          <Text>Home</Text>
          <Text>Token: {token}</Text>
          <Text>isLoggedIn: {isLoggedIn.toString()}</Text>
          <Text>ID: {Id}</Text>
          <Text>user auth: {JSON.stringify(userAuth)}</Text>
          <TouchableOpacity
            onPress={() => logout()}
            style={{
              marginTop: 10,
              padding: 50,
            }}
          >
            <Text>Logout</Text>
          </TouchableOpacity>
        </>
      ) : null}
    </SafeAreaView>
  );
};

export default Homes;
