import React from 'react';
import { Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './detail/Home';
import ForeCast from './detail/Forecast';

export default function Detail() {

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator initialRouteName='home' screenOptions={{
            headerShown : false,
        }}>
            <Stack.Screen name='home' component={Home} />
            <Stack.Screen name='forecast' component={ForeCast} />
        </Stack.Navigator>
    )
}