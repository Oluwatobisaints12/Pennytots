import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from 'app/screens/guests/login';
import Register from 'app/screens/guests/register';
import ForgotPasswordScreen from 'app/screens/guests/forgot-password';


// Auth Stack includes screens presented to non authenticated user
const AuthStack = createNativeStackNavigator();

function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
        <AuthStack.Screen name='login' component={Login} />
        <AuthStack.Screen name='register' component={Register} />
        <AuthStack.Screen name='forgot-password' component={ForgotPasswordScreen} />
        
    </AuthStack.Navigator>
  );
}

export default AuthNavigator;
