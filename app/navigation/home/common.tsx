import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FullScreenImage from 'app/screens/common/fullscreen-image';
import ViewTopic from 'app/screens/common/view-topic';
import EditTopic from 'app/screens/common/edit-topic';
import CameraScreen from 'app/screens/common/camera-screen';
import PrivateChat from 'app/screens/common/private-chat';
import GroupChat from 'app/screens/common/group-chat';
import GroupInfo from 'app/screens/common/group-info';
import PreviewCamera from 'app/screens/common/preview-camera';
import PreviewAttachment from 'app/screens/common/preview-attachment';
import ShareAttachment from '../../screens/common/share-attachment';
import EditGroupScreen from 'app/screens/common/edit-group';
import TestScreen from 'app/screens/common/testing';
import ChallengeMode from 'app/screens/bottom/challengeMode';
import GameMode from 'app/screens/bottom/gameMode';

// All Screen that can be access anywhere in the app is listed here...
const CommonStack = createNativeStackNavigator();

function CommonStackNavigator() {
  return (
    <CommonStack.Navigator screenOptions={{ headerShown: false }}>
      
      <CommonStack.Screen name='private-chat' component={PrivateChat} />
      <CommonStack.Screen name='group-chat' component={GroupChat} />
      <CommonStack.Screen name='group-info' component={GroupInfo} />
      <CommonStack.Screen name='edit-group' component={EditGroupScreen} />
      <CommonStack.Screen name='testing' component={TestScreen} />
      <CommonStack.Screen name='fullscreen-image' component={FullScreenImage} />
      <CommonStack.Screen name='gameMode' component={GameMode} />
      <CommonStack.Screen name='challengeMode' component={ChallengeMode} />
      {/* <CommonStack.Screen
        name='preview-attachment'
        component={PreviewAttachment}
      />
      <CommonStack.Screen
        name='share-attachment'
        component={ShareAttachment}
      /> */}
      <CommonStack.Screen name='share-attachment' component={ShareAttachment} />
      <CommonStack.Screen
        name='preview-attachment'
        component={PreviewAttachment}
      />
      <CommonStack.Screen name='preview-camera' component={PreviewCamera} />
      <CommonStack.Screen
        name='view-topic'
        options={{
          title: 'Topic',
          headerShown: false,
          headerTitleStyle: {
            fontFamily: 'regular',
          },
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: 'black',
        }}
        component={ViewTopic}
      />
      <CommonStack.Screen
        name='edit-topic'
        options={{
          title: 'Edit Topic',
          headerShown: false,
          headerTitleStyle: {
            fontFamily: 'regular',
          },
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: 'black',
        }}
        component={EditTopic}
      />
      <CommonStack.Screen
        name='camera-screen'
        options={{
          title: 'Camera Screen',
          headerShown: false,
          headerTitleStyle: {
            fontFamily: 'regular',
          },
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: 'black',
        }}
        component={CameraScreen}
      />
    </CommonStack.Navigator>
  );
}

export default CommonStackNavigator;
