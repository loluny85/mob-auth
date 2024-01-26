import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AccessScreen from './screens/Access';
import ProfileScreen from './screens/Profile';
import registerNNPushToken from 'native-notify';
import 'intl-pluralrules'

const Stack = createStackNavigator();

const App = () => {
  registerNNPushToken(19079, 'f4jEGAy0H2W7Q3ZAl2LffM');
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Access" screenOptions={{
    headerShown: false
  }}>
        <Stack.Screen name="Access" component={AccessScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
