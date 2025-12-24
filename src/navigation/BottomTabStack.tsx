import React, { FC } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EventListingScreen from '../screens/BottomTabScreens/eventListingScreen/EventListingScreen';
import ProfileScreen from '../screens/BottomTabScreens/profileScreen/ProfileScreen';
import SearchScreen from '../screens/BottomTabScreens/searchScreen/SearchScreen';
import FavouriteScreen from '../screens/BottomTabScreens/favouriteScreen/FavouriteScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const BottomTabStack: FC = () => {
    return (
    <Tab.Navigator screenOptions={{headerShown:false}}>

        <Tab.Screen name="EventListingScreen" component={EventListingScreen} 
        options={{tabBarIcon:({ focused, color, size }) => (
            <Ionicons name={focused ? 'calendar' : 'calendar-outline'} size={size} color={color} />
            )}}
        />

        <Tab.Screen name="SearchScreen" component={SearchScreen} 
        options={{tabBarIcon:({ focused, color, size }) => (
            <Ionicons name={focused ? 'search' : 'search-outline'} size={size} color={color} />
            )}}
        />

        <Tab.Screen name="FavouriteScreen" component={FavouriteScreen} 
        options={{tabBarIcon:({ focused, color, size }) => (
            <Ionicons name={focused ? 'heart' : 'heart-outline'} size={size} color={color} />
            )}}
        />

        <Tab.Screen name="ProfileScreen" component={ProfileScreen} 
        options={{tabBarIcon:({ focused, color, size }) => (
            <Ionicons name={focused ? 'person' : 'person-outline'} size={size} color={color} />
            )}}
        />

    </Tab.Navigator>
    )
}

export default BottomTabStack
