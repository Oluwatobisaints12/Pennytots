import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HelpDesk from 'app/screens/drawer/helpdesk';
import CreateTicket from 'app/screens/drawer/helpdesk/create-tickets';
// import HelpDeskMessagesScreen from '../../../screens/drawerbar/helpdesk/messages';

const HelpdeskStack = createNativeStackNavigator();

function HelpdeskStackNavigator() {
    return (
        <HelpdeskStack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName='settings'
        >
            <HelpdeskStack.Screen name='helpdesk' component={HelpDesk} />

            <HelpdeskStack.Screen
                name='create-ticket'
                component={CreateTicket}
            />

            {/* <HelpdeskStack.Screen
                name='helpdesk-messages'
                component={HelpDeskMessagesScreen}
            /> */}

        </HelpdeskStack.Navigator>
    );
}

export default HelpdeskStackNavigator;
