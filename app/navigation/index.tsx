import React,{useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { IsLoggedIn } from 'app/redux/user/reducer';
import { Linking } from 'react-native';
import * as Notifications from 'expo-notifications';
import AuthNavigator from './guest';
import HomeNavigator from './home';
import { navigationRef, isReadyRef } from 'app/navigation/root';


// Root Stack
const Stack = createNativeStackNavigator();

export function AppStack() {
  const isLoggedIn = useSelector(IsLoggedIn)
  return (
   <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true;
      }}
      linking={{
        prefixes: ['https://pennytots-admin.netlify.app', 'example://'],
        config: {
          screens: {
            Home: 'home',
            About: 'about',
            HelpDeskScreenStack: 'helpdesk',
            // Add other screens and nested navigator structures here
          },
        },
        async getInitialURL() {
          // First, you may want to do the default deep link handling
          // Check if app was opened from a deep link
          const url = await Linking.getInitialURL();

          if (url != null) {
            return url;
          }

          // Handle URL from expo push notifications
          const response = await Notifications.getLastNotificationResponseAsync();

          return response?.notification.request.content.data.url;
        },
        subscribe(listener) {
          const onReceiveURL = ({ url }: { url: string }) => listener(url);

          // Listen to incoming links from deep linking
          const eventListenerSubscription = Linking.addEventListener('url', onReceiveURL);

          // Listen to expo push notifications
          const subscription = Notifications.addNotificationResponseReceivedListener(response => {
            const url = response.notification.request.content.data.url;

            // Any custom logic to see whether the URL needs to be handled
            //...

            // Let React Navigation handle the URL
            listener(url);
          });

          return () => {
            // Clean up the event listeners
            eventListenerSubscription.remove();
            subscription.remove();
          };
        },
      }}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <Stack.Screen name='Home' component={HomeNavigator} options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name='Auth' component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
  // const isLoggedIn = useSelector(IsLoggedIn);


  // //deep linking 
  // const linking = {
  //   prefixes: ['https://pennytots-admin.netlify.app'],
  //   config: {
  //     /* configuration for matching screens with paths */
  //     screens: {
  //       About: 'about',
  //       HelpDeskScreenStack: 'helpdesk',
  //       patientscreen: {
  //         screens: {
  //           otherscreens: {
  //             screens: {
  //               questionpage: 'topic/:postid',
  //             },
  //           },
  //         },
  //       },
  //     },
  //   },
  // };

  


export default AppStack;
