/* eslint-disable react-native/no-inline-styles */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

export function Feed() {
  const { t } = useTranslation();

  return (
    <View style={{flex: 1, width:227}}>
        <TouchableHighlight
        onPress={() => Alert.alert('Simple Button pressed')}
          style={{
          height: 50,
          
          marginTop: 30,
          marginBottom: 50,
          borderRadius: 33,
          
          }}>
      <Image
          source={{uri: 'talktodoc'}}
          style={{width: 227, height: 53}}
      />
        </TouchableHighlight>
       <Image
          source={{uri: 'talktodoc'}}
          style={{width: 227, height: 53, marginBottom:20}}
      />
      </View>
    <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly',}}>
        
      <View style={{paddingBottom: 30}}>
      
        <Image
          source={{uri: 'heartbeat'}}
          style={{width: 150, height: 158}}
      /><Text  style={styles.icontext}>
      Medical History
    </Text>
      </View>
        <View>
        <Image
          source={{uri: 'stethoscope'}}
          style={{width: 150, height: 158}}
      />
      <Text style={styles.icontext}>
      Consulting Group
    </Text>
      </View>
      <View>
        <Image
          source={{uri: 'medmail'}}
          style={{width: 150, height: 158}}
      />
      <Text  style={styles.icontext}>
      {t(Chats_message)}
    </Text>
      </View>
      <View>
        <Image
          source={{uri: 'medcase'}}
          style={{width: 150, height: 158}}
      />
      <Text  style={styles.icontext}>
      Case File
    </Text>
    </View>
      </View>
  );
}

export function Profile() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile!</Text>
    </View>
  );
}

export function Notifications() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Notifications!</Text>
    </View>
  );
}

export const Tab = createBottomTabNavigator();

export function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      tabBarOptions={{
        activeTintColor: '#e91e63',
      }}
    >
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ activeTintColor}) => (
            <Image
          source={{uri: 'logo'}}
          style={{width: 30, height: 30}}
      />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <Image
          source={{uri: 'calldocicon'}}
          style={{width: 74, height: 74, marginBottom:20}}
      />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Image
            source={{uri: 'logo'}}
            style={{width: 50, height: 50}}
        />
          ),
        }}
      />
    </Tab.Navigator>
    
  );
}

export default function App() {
    return (
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
    );
  }
  