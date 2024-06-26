import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthScreen from './screen/auth/login';
import SliderScreen from './screen/slider/home';
import {LoadingIndicator} from './component/helper';
import DashBoard from './screen/dashboard';
import DetailsScreen from './screen/dashboard/component/details';

const Stack = createNativeStackNavigator();

const Routes = () => {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const checkLogin = async () => {
      const outletlocation = await AsyncStorage.getItem('outletlocation');
      console.log(outletlocation);
      if (outletlocation) {
        setInitialRoute('dashboard');
      } else {
        setInitialRoute('dashboard');
      }
    };
    checkLogin();
  }, []);

  if (initialRoute === null) {
    return (
      <View>
        <LoadingIndicator />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen
          name="login"
          component={AuthScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="home"
          component={SliderScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="dashboard"
          component={DashBoard}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="detailsScreen"
          component={DetailsScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
