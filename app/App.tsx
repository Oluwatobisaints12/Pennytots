import {registerRootComponent} from 'expo'
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppStack from './navigation';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from 'app/redux';
import { MenuProvider } from 'react-native-popup-menu';
import { Provider } from 'react-redux';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { GlobalProvider } from './GlobalProvider';
import { queryClient } from 'app/redux/user/hooks';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import useFonts from './hooks/useFont';
import { useState, useRef, useEffect } from 'react';
import { RootSiblingParent } from 'react-native-root-siblings';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import enTranslations from 'app/translation/en.json';
import frTranslations from 'app/translation/fr.json';
import arTranslations from 'app/translation/ar.json';
import esTranslations from 'app/translation/es.json';
import ptTranslations from 'app/translation/pt.json';
import * as Notifications from 'expo-notifications';
import { PROJECT_ID } from './constants/expo';
import { registerDeviceToken } from 'app/helpers/queries';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

i18n
  .use(initReactI18next) // Initialize i18next for React
  .init({
    resources: {
      en: {
        translation: enTranslations,
      },
      ar: {
        translation: arTranslations,
      },
      es: {
        translation: esTranslations,
      },
      fr: {
        translation: frTranslations,
      },
      pt: {
        translation: ptTranslations,
      },
      // Add other languages and their translations here
    },
    lng: 'en', // Set the default language
    fallbackLng: 'en', // Fallback to English if a translation is missing
    interpolation: {
      escapeValue: false, // React already escapes text
    },
  });

export { i18n };

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function App() {
  const [IsReady, SetIsReady] = useState(false);
  useEffect(() => {
    const registerForPushNotificationsAsync = async () => {
      
      try {
        
        let token;
        if (Device.isDevice) {
         
          const { status: existingStatus } =
            await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;

          if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }

          if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
          }
          
          token = (await Notifications.getExpoPushTokenAsync({
            'projectId': PROJECT_ID,
          })).data;
          
          

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
    const notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log('Received notification:', notification);
        // Handle notification logic when the app is open
      }
    );

    // Listener for when a user taps on or interacts with a notification
    const responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        // Handle response logic based on notification data
        console.log('User interacted with notification:', response);
      });

    // Register for push notifications
    console.log("test5");
    registerForPushNotificationsAsync();

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  const LoadFonts = async () => {
    await useFonts();
  };

  if (!IsReady) {
    return (
      <AppLoading
        startAsync={LoadFonts}
        onFinish={() => SetIsReady(true)}
        onError={() => {}}
      />
    );
  }

  const persister = createAsyncStoragePersister({
    storage: AsyncStorage,
  });

  persistQueryClient({
    queryClient,
    persister,
  });

  const menuProviderStyles = {
    menuProviderWrapper: {
      flexDirection: 'column',
    },
    backdrop: {
      backgroundColor: 'black',
      opacity: 0.2,
    },
  };

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
      onSuccess={() => {
        console.log('rehydrated');
      }}
    >
      <Provider store={store}>
        <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
          <GlobalProvider>
            <MenuProvider customStyles={menuProviderStyles}>
              <RootSiblingParent>
                <AppStack />
              </RootSiblingParent>
              <Toast />
            </MenuProvider>
          </GlobalProvider>
        </PersistGate>
      </Provider>
    </PersistQueryClientProvider>
  );
}

export default registerRootComponent(App);