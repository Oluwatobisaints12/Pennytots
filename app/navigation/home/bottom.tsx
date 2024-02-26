import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, TouchableOpacity, SafeAreaView } from 'react-native';
import { CustomText } from 'app/components/elements';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from 'react-native';
import Topic from 'app/screens/bottom/topic';
import Search from 'app/screens/bottom/search';
import Chat from 'app/screens/bottom/chats';
import Group from 'app/screens/bottom/groups';
import Quiz from 'app/screens/bottom/quiz';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import SVG from 'app/providers/svg';
import ConvoNotification from 'app/screens/bottom/convo-notification';
import Convo from 'app/screens/bottom/convo';
import ChatSVG from 'app/assets/svg/chat.svg';
import { useTranslation } from 'react-i18next';
import ChallengeMode from 'app/screens/bottom/challengeMode';
import { Ionicons } from '@expo/vector-icons';
import GameMode from 'app/screens/bottom/gameMode';


// import { SafeAreaView } from 'react-native-safe-area-context';

const BottomTab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeNavigationDrawerStructure = (props: any) => {
  const toggleDrawer = () => {
    props.navigationProps.toggleDrawer();
  };

  return (
    <SafeAreaView style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={() => toggleDrawer()}>
        <View
          style={{
            marginHorizontal: 10,
          }}
        >
          <FontAwesome name="bars" size={30} color='black' />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};


function BottomTabNavigator() {
  const { t } = useTranslation();``
  function MyTabBar({ state, descriptors, navigation }) {
    return (
      <View
      style ={{
        backgroundColor: 'black',
        paddingTop: 20

      }}
      >
        <SafeAreaView
          style={{
            flexDirection: 'row',

            paddingHorizontal: 30,
            paddingVertical: 20,
          }}
        >
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = state.index === index;

            const TabIcon: React.ReactNode = options.tabBarIcon;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                // The `merge: true` option makes sure that the params inside the tab screen are preserved
                navigation.navigate({ name: route.name, merge: true });
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };

            return (
              <TouchableOpacity
                accessibilityRole='button'
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={{
                  flex: 1,
                  backgroundColor: 'black',
                  paddingVertical: 5,
                  paddingHorizontal: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {isFocused ? (
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%',
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'column',
                        backgroundColor: '#2e2e2e',
                        paddingVertical: 15,
                        
                        borderRadius: 15,
                        alignItems: 'center',
                        width: '100%',
                      }}
                    >
                      <TabIcon />

                      <CustomText
                        style={{
                          color: 'white',
                          paddingLeft: 7,
                          paddingBottom: 5,
                          fontSize: 13,
                        }}
                        textType='bold'
                      >
                        {label}
                      </CustomText>
                    </View>
                  </View>
                ) : (
                  <SafeAreaView
                    style={{
                      padding: 10,
                    }}
                  >
                    <TabIcon />
                  </SafeAreaView>
                )}
              </TouchableOpacity>
            );
          })}
        </SafeAreaView>
      </View>
    );
  }

  return (
    <BottomTab.Navigator
      tabBar={(props) => <MyTabBar {...props} />}
      initialRouteName='QuizScreen'
      screenOptions={
        {
          // activeTintColor: '#D3AAE2',
          // activeBackgroundColor: 'white',
          // inactiveBackgroundColor: 'white',
        }
      }
    >
      <BottomTab.Screen
        name={'TopicScreen'}
        options={{
          tabBarLabel: t("BottomNav_topic"),
          tabBarIcon: () => <SVG name='home-tab' size={20} />,
          title: 'Topics',
          headerShown: false,
        }}
        component={Topic}
      />
      <BottomTab.Screen
        name={'GroupsScreen'}
        options={{
          tabBarLabel: t("BottomNav_groups"),
          tabBarIcon: () => <SVG name='group' size={20} />,
          title: 'Groups',
          headerShown: false
        }}
        component={Group}
      />
     <BottomTab.Screen
  name={'QuizScreen'}
  component={Quiz}
  
  options={{
    tabBarLabel: "Quiz",
    tabBarIcon: () => <SVG name='quiz' size={20} />,
    title: 'Quiz',
    headerShown: false
  }}

  
/>



      <BottomTab.Screen
        name={'ChatsScreen'}
        options={{
          tabBarLabel: t("BottomNav_chats"),
          tabBarIcon: () => <ChatSVG width={20} color={'gold'} />,
          title: 'Chats',
          headerShown: false
        }}
        component={Chat}
      />

      <BottomTab.Screen
        name={'SearchScreen'}
        options={{
          tabBarLabel: t("BottomNav_search"),
          tabBarIcon: () => <SVG name='search' size={20} />,
          title: 'Search',
          headerShown: false
        }}
        component={Search}
      />
      
    </BottomTab.Navigator>
  );
}

export function BottomTabStack({ navigation }: any) {
  return (
    <Stack.Navigator>
    <Stack.Screen
      options={{
        headerTitle: () => (
          <Image
            source={require('app/assets/logohorizontal.png')}
            style={{ width: 120, height: 48, margin: 2 }}
          />
        ),
        headerShown: true,
        headerTitleAlign: 'center',
        headerLeft: () => (
          <HomeNavigationDrawerStructure navigationProps={navigation} />
        ),
        headerRight: () => (
          <SafeAreaView
            style={{
              paddingRight: 15,
            }}
          >
            <ConvoNotification navigation={navigation} />
          </SafeAreaView>
        ),
        headerStyle: { backgroundColor: '#fff' },
        headerShadowVisible: false,
      }}
      name='home-landing'
      component={BottomTabNavigator}
    />

    <Stack.Screen
      options={{
        headerShown: false,
      }}
      name='convos'
      component={Convo}
    />

<Stack.Screen
    
      name='ChallengeMode'
      component={ChallengeMode}
    />
    
<Stack.Screen
    
    name='GameMode'
    component={GameMode}
  />
  {/* <Stack.Screen
  options={{
    headerTitle: () => (
      <Image
        source={require('app/assets/logohorizontal.png')}
        style={{ width: 120, height: 48, margin: 2 }}
      />
    ),
    headerShown: true,
    headerTitleAlign: 'center',
    headerLeft: () => (
      <HomeNavigationDrawerStructure navigationProps={navigation} />
    ),
    headerRight: () => (
      <SafeAreaView
        style={{
          paddingRight: 15,
        }}
      >
        <ConvoNotification navigation={navigation} />
      </SafeAreaView>
    ),
    headerStyle: { backgroundColor: '#fff' },
    headerShadowVisible: false,
  }}
  name='Quiz'
  component={Quiz}
/> */}




 
  </Stack.Navigator>
  
  );
}
