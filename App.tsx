import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Detail from './components/screens/Detail';

import LinearGradient from 'react-native-linear-gradient';

export default function App() {
    const Tab = createBottomTabNavigator();

    return (
            <NavigationContainer>
                <Tab.Navigator initialRouteName='detail' screenOptions={{
                    tabBarStyle : {
                        backgroundColor : '#192f6a',
                        margin : 0,
                        padding : 0,
                        borderWidth : 0,
                        height : 50,
                    }
                }}>
                    <Tab.Screen options={{headerShown:false}} name='detail' component={Detail} />
                </Tab.Navigator>
            </NavigationContainer>
    )
}
const styles = StyleSheet.create({
    linearGradient :{
        flex: 1,
    }
})