import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AreaOfInterest from 'app/screens/drawer/settings/area-of-interests';
import Profile from 'app/screens/drawer/profile';
import Settings from 'app/screens/drawer/settings';
import ChangeLanguage from 'app/screens/drawer/settings/change-language';
import ChangePin from 'app/screens/drawer/settings/change-pin';
import BlockedChats from 'app/screens/drawer/settings/blocked-chats';
import UserTerms from 'app/screens/drawer/settings/user-terms';
import About from 'app/screens/drawer/settings/about';
import { useTranslation } from 'react-i18next';

const SettingsStack = createNativeStackNavigator();

function SettingsStackNavigator() {
  const { t } = useTranslation();
  return (
    <SettingsStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={t('SideNav_settings')}
    >
      <SettingsStack.Screen name='settings' component={Settings} />
      <SettingsStack.Screen
        name='area-of-interest'
        component={AreaOfInterest}
      />
      <SettingsStack.Screen name='change-language' component={ChangeLanguage} />
      <SettingsStack.Screen name='change-pin' component={ChangePin} />
      <SettingsStack.Screen name='blocked-chats' component={BlockedChats} />
      <SettingsStack.Screen name='user-terms' component={UserTerms} />
      <SettingsStack.Screen name='about' component={About} />
    </SettingsStack.Navigator>
  );
}

export default SettingsStackNavigator;
