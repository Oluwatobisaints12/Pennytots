import React,{useEffect} from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import { default as themeFont } from 'app/assets/themes/fonts.json';
import { IsLoggedIn } from 'app/redux/user/reducer';
import { useSelector } from 'react-redux';
import { BottomTabStack } from 'app/navigation/home/bottom';
import Sidebar from './sidebar';
import Profile from 'app/screens/drawer/profile';
import PostTopic from 'app/screens/drawer/post-topic';
import CreateGroup from 'app/screens/drawer/create-group';
import SettingsStackNavigator from './settings';
import HelpDesk from 'app/screens/drawer/helpdesk';
import EditProfile from 'app/screens/drawer/edit-profile';
import HelpdeskStackNavigator from './helpdesk';
import CreditScreen from 'app/screens/drawer/credit';
import { useTranslation } from 'react-i18next';



export default function DrawerNavigator() {
  const { t } = useTranslation();
  const Drawer = createDrawerNavigator();
  const isLoggedIn = useSelector(IsLoggedIn);
  return (
    <Drawer.Navigator
      initialRouteName={'home'}
      defaultStatus='closed'
      screenOptions={{
        drawerStyle: {
          backgroundColor: 'white',
          width: 300,
        },
        // activeTintColor: '#0088DD',
        // activeBackgroundColor: 'rgba(255, 255, 255, 0)',
        // inactiveTintColor: 'green',
        // itemStyle: { marginVertical: 5 },
        // labelStyle: {
        //   fontFamily: 'extraBold',
        //   fontSize: 16,
        //   color: '#636363',
        //   lineHeight: 20,
        // },
      }}
      
      drawerContent={(props) => {
        const filteredProps = {
          state: {
            ...props.state,
            // You can add any additional properties here
          },
          navigation: props.navigation, // Pass navigation prop explicitly
          // Add other filtered props based on your conventions
        
        };
        return <Sidebar props={filteredProps}/>;
      }}
    >
      <Drawer.Screen
        name='Home'
        options={{
          title: 'Topics',
          headerShown:false,
          drawerIcon: ({ focused, size }) => (
            <Image
              source={require('app/assets/person-outline.png')}
              style={{ width: 18, height: 20 }}
            />
          ),
        }}
        component={BottomTabStack}
      />

      <Drawer.Screen
        name="Profile"
        options={{
          title: "Profile",
          headerShown:false,
        }}
        component={Profile}
      />

      <Drawer.Screen
        name='EditProfile'
        options={{
          title: 'EditProfile',
          headerShown:false,
        }}
        component={EditProfile}
      />

       <Drawer.Screen
        name='PostTopic'
        options={{
          title: 'PostTopic',
          headerShown: false
        }}
        component={PostTopic}
       
      />
  
      <Drawer.Screen
        name='CreateGroup'
        options={{
          title: 'CreateGroup',
          headerShown:false,
        }}
        component={CreateGroup}
      />

      <Drawer.Screen
        name='Settings'
        
        options={{
          title: t('SideNav_settings'),
          headerShown:false,
        }}
        component={SettingsStackNavigator}
      />


      <Drawer.Screen
        name='Credits'
        options={{
          title: t('Credits_Title'),
        }}
        component={CreditScreen}
      />

      <Drawer.Screen
        name='Helpdesk'
        options={{
          title: 'Helpdesk',
        }}

        component={HelpdeskStackNavigator}
      />

      {/* <Drawer.Screen
        name='Donate'
        options={{
          title: 'Donate',
        }}
        component={Donate}
      />  */}
    </Drawer.Navigator>
  );
}
