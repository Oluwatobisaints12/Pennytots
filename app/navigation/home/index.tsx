import React, { useMemo } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigator from './drawer';
import CommonStackNavigator from './common';
import { useSelector } from 'react-redux';
import { userAuthInfo } from 'app/redux/user/reducer';
import OnboardingNavigator from './onboarding';
import VerifyPhoneNumberScreen from '../../screens/onboarding/verify-phone-number';


// Home stack includes authenticated stacks for logged users
const HomeStack = createNativeStackNavigator();

function HomeNavigator() {
  const user: AccountProfileProp = useSelector(userAuthInfo);


  const initialRoute = useMemo(() => {
    // if (user && !user.phone_number_verified) {
    //   return 'Verify-Phone-Number'
    // }
   if (user && user.interests && user.interests?.length === 0) {

      return 'Onboarding'
    }
    else {
      return 'Home'
    }

  }, [user]);

  if (!initialRoute) {
    return null
  }

  return (

    <HomeStack.Navigator
      initialRouteName={
        initialRoute
      }
    >

      <HomeStack.Screen
        name='Home'
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />


      <HomeStack.Screen
        name='Onboarding'
        component={OnboardingNavigator}
        options={{ headerShown: false }}
      />




      <HomeStack.Screen
        name='Verify-Phone-Number'
        component={VerifyPhoneNumberScreen}
        options={{ headerShown: false }}
      />

      <HomeStack.Screen
        name='Common'
        component={CommonStackNavigator}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>

  );
}

export default HomeNavigator;
