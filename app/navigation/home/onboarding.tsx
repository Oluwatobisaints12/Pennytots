import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from 'app/screens/onboarding/welcome';
import Company from 'app/screens/onboarding/company';
import AreaOfInterests from 'app/screens/onboarding/area-of-interests';
import Personal from 'app/screens/onboarding/personal';

const OnboardingStack = createNativeStackNavigator();

function OnboardingNavigator() {
  return (
    <OnboardingStack.Navigator screenOptions={{ headerShown: false }}>
      {/* <OnboardingStack.Screen name='welcome' component={Welcome} />
      <OnboardingStack.Screen name='personal' component={Personal} />
      <OnboardingStack.Screen name='company' component={Company} /> */}
      <OnboardingStack.Screen name='area-of-interest' component={AreaOfInterests} />
    </OnboardingStack.Navigator>
  );
}

export default OnboardingNavigator;