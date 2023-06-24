import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ToastAndroid, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons' 

/*Ecranele aplicației */
import HomeScreen from './HomeScreen'
import SettingsScreen from './SettingsScreen'
import AddSpeciesScreen from './AddSpeciesScreen'
import CurrentConditionsScreen from './CurrentConditionsScreen'

/*Numele ecranelor */
const homeName = 'Acasă';
const settingsName = 'Setări';
const addSpeciesName = 'Acvariul Meu';
const currentConditionsName = 'Condiții';

/*Crearea navigatorului */
const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
    return(
        <Tab.Navigator
          initialRouteName={homeName}
          screenOptions={({route}) => ({
            tabBarIcon: ({ focused, color, size}) => {
              let iconName;
              let rn = route.name;
  
              if(rn === homeName){
                iconName = focused ? 'home' : 'home-outline';
              } else if (rn === settingsName) {
                iconName = focused ? 'settings' : 'settings-outline';
              } else if (rn === addSpeciesName) {
                iconName = focused ? 'add-circle' : 'add-circle-outline';
              } else if (rn === currentConditionsName) {
                iconName = focused ? 'stats-chart' : 'stats-chart-outline';
              }
              return <Ionicons name={iconName} size ={size} color={color}/>
            }
          })}
          tabBarOptions={{
            activeTintColor: '#0782F9',
            inactiveTintColor: '#386FBF',
            labelStyle: {paddingBottom: 10, fontSize: 10},
            style: {padding: 10, height: 70}
          }}
        >
  
        <Tab.Screen name = {homeName} component={HomeScreen} />
        <Tab.Screen name = {addSpeciesName} component={AddSpeciesScreen} />
        <Tab.Screen name = {currentConditionsName} component={CurrentConditionsScreen} />
        <Tab.Screen name = {settingsName} component={SettingsScreen} />
  
        </Tab.Navigator>
    );
}