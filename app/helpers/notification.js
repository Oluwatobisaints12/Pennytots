import React from 'react';
import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import * as navigation from 'app/navigation/root';
import { registerDeviceToken } from './queries';
import * as Device from 'expo-device';


export default function useNotification() {
  useEffect(() => {
    const registerForPushNotificationsAsync = async () => {
      try {
        let token;
        if (Device.isDevice) {
          const { status: existingStatus } = await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;

          if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }

          if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
          }

          token = (await Notifications.getExpoPushTokenAsync()).data;
          console.log('Token:', token);

          // Call the function to register the device token with your backend
          if (token) {
            registerDeviceToken(token);
          }

          // Additional configuration for Android
          if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
              name: 'default',
              importance: Notifications.AndroidImportance.MAX,
              vibrationPattern: [0, 250, 250, 250],
              lightColor: '#FF231F7C',
            });
          }
        } else {
          alert('Must use a physical device for Push Notifications');
        }
      } catch (error) {
        console.error('Error during push notification setup:', error);
        // You can add additional error handling logic here
      }
    };
    // Listener for when notifications are received while the app is foregrounded
    const notificationListener = Notifications.addNotificationReceivedListener(notification => {
      console.log('Received notification:', notification);
      // You can add logic here to handle the notification when the app is open
      // For example, updating a notification center or alerting the user
    });

    // Listener for when a user taps on or interacts with a notification
    const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
      const data = response.notification.request.content.data;

      // Example navigation based on notification data
      if (data.type === 'chat') {
        navigation.navigate('Common', {
          screen: 'private-chat',
          params: { userDetails: data.userDetails },
        });
      }
      if (data.type === 'topic') {
        navigation.navigate('Common', {
          screen: 'view-topic',
          params: { postid: screenData?.topicId },
        });
      }

      if (data.type === 'group') {
        navigation.navigate('Common', {
          screen: 'group-chat',
          params: {
            groupDetails: screenData?.groupDetails,
          },
        })}
      // ... handle other notification types ...
    });

    // Register for push notifications
    registerForPushNotificationsAsync();

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);
}
