import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import BottomTabNavigator from './screens/BottomTabNavigator';
import AddSpeciesScreen from './screens/AddSpeciesScreen';



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options= {{headerShown: false }} name ="HomeScreen" component = {BottomTabNavigator} />
        <Stack.Screen options= {{headerShown: false }} name ="AddSpeciesScreen" component = {AddSpeciesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

