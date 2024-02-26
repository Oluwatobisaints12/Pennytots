// import React, { useState } from 'react';
// import { View, Text, Button, TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import Quiz from './quiz';
// import ChallengeMode from './challengeMode';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import CustomTabBar from './customTab/customTabBar';

// const BottomTab = createBottomTabNavigator();

// const MainNavigation = () => {
//     const [showChallengeMode, setShowChallengeMode] = useState(false);
  
//     return (
//       <BottomTab.Navigator
//         tabBar={(props) => <CustomTabBar {...props} showChallengeMode={showChallengeMode} />}
//       >
//         <BottomTab.Screen
//           name="Quiz"
//           component={Quiz}
//           options={{
//             tabBarLabel: 'Quiz',
//           }}
//         />
//         <BottomTab.Screen
//           name="ChallengeMode"
//           component={ChallengeMode}
//           options={{
//             tabBarLabel: 'Challenge Mode',
//           }}
//         />
//       </BottomTab.Navigator>
//     );
//   };
  
//   export default MainNavigation;