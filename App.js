import { View, Text, StyleSheet } from 'react-native';


import React, { useState } from 'react';


import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Home from './src/components/Home';
import Forecast from './src/components/Forecast';
import Widgets from './src/components/Widgets';
import Notification from './src/components/Notification';


import HomeLight from "./src/assets/images/home-light.svg";
import HomeDark from "./src/assets/images/home-dark.svg";
import NotficationLight from "./src/assets/images/notifications-light.svg";
import NotficationDark from "./src/assets/images/notifications-dark.svg";
import WidgetDark from "./src/assets/images/widget-dark.svg";
import WidgetLight from "./src/assets/images/widget-light.svg";


export default function App() {

    
    const Tab = createBottomTabNavigator();
    const HomeStack = createNativeStackNavigator();

   
    const  HomeTabs = () => (
        <Tab.Navigator
            screenOptions={({route}) =>({
                tabBarStyle: { 
                    backgroundColor: 'transparent',
                     position: 'absolute',
                     borderTopWidth: 0,
                     elevation: 0 },
                     tabBarShowLabel: false,
                tabBarIcon: ({focused}) => {

                    if(route.name === 'Home') {
                       
                        if(focused == true) {
                            return <HomeLight />
                        }
                        else {
                            return <HomeDark />
                        }
                       
                    }
                    else if (route.name === 'Widgets'){
                       
                        if(focused == true) {
                            return <WidgetLight />
                        }
                        else {
                            return <WidgetDark />
                        }
                       
                    }
                    else if (route.name === 'Notification'){
                       
                        if(focused == true) {
                            return <NotficationLight />
                        }
                        else {
                            return <NotficationDark />
                        }
                       
                    }
                }
            }) } > 
            <Tab.Screen  
                name="Home"                                       
                component={Home} 
                initialParams={[currentWheather,hours]} 
                options={{headerShown:false,}} 
                />
            <Tab.Screen 
                name="Widgets" 
                component={Widgets}  
                initialParams={[locationData]} 
                options={{headerShown:false,}}  
                />
            <Tab.Screen 
                initialParams={[notificationData]}
                name="Notification" 
                component={Notification} 
                options={{headerShown:false,}} 
                />
        </Tab.Navigator>
    )

    const [hours,setHours] = useState([
        {
            time:1,
            temp: 32,
            condition:"lighting",
            current: true,
        },
        {
            time:2,
            temp: 28,
            condition:"rainy-cloud",
            current: false,
        },
        {
            time:3,
            temp: 30,
            condition:"rainy-cloud",
            current: false,
        },
        {
            time:4,
            temp: 27,
            condition:"snow",
            current: false, 
       },
        {
            time:5,
            temp: 32,
            condition:"thunder",
            current: false,
        },
        {
            time:6,
            temp: 32,
            condition:"lighting",
            current: false,
        },
        {
            time:7,
            temp: 32,
            condition:"snow",
            current: false,
        },
        {
            time:8,
            temp: 15,
            condition:"thunder",
            current: false,
        },
        {
            time:9,
            temp: 34,
            condition:"lighting",
            current: false,
        },
        {
            time:10,
            temp: 22,
            condition:"thunder",
            current: false,
        },
        {
            time:11,
            temp: 29,
            condition:"rainy-cloud",
            current: false,
        },
        {
            time:12,
            temp: 30,
            condition:"thunder",
            current: false,
        },
        {
            time:13,
            temp: 29,
            condition:"lighting",
            current: false,
        }, 
    ]) 

    const [data,setData] = useState([
            {
                day: 1,
                temp: 28,
                wind: 7.90,
                humidity: 84,
                condition: "thunder",
            },
            {
                day: 2,
                temp: 30,
                wind: 8.56,
                humidity: 72,
                condition: "rain",
                 
            },
            {
                day: 3,
                temp: 28,
                wind: 7.90,
                humidity: 84,
                condition: "lighting",
                 
            },
            {
                day: 4,
                temp: 18,
                wind: 6.50,
                humidity: 20,
                condition: "snow",
                 
            },
            {
                day: 5,
                temp: 28,
                wind: 7.90,
                humidity: 84,
                condition: "rainy-cloud",
                 
            },
            {
                day: 6,
                temp: 28,
                wind: 7.90,
                humidity: 84,
                condition: "rain",
                 
            },
            {
                day: 7,
                temp: 25,
                wind: 7.90,
                humidity: 84,
                condition: "rain",
                 
            },
            {
                day: 8,
                temp: 28,
                wind: 7.90,
                humidity: 84,
                condition: "thunder",
            },
            {
                day: 9,
                temp: 28,
                wind: 7.90,
                humidity: 84,
                condition: "thunder",
            },
            
        ])
    const [locationData,setLocationData] = useState(
        [
            {
                id:1,
                place: "Kochi,Kerala",
                condition: "Thunder Storm",
                temp: "29",
            },
            {
                id:2,
                place: "Wayanand,Kerala",
                condition: "Snow",
                temp: "02",
            },
            {
                id:3,
                place: "Kozikode,Kerala",
                condition: "Rainning",
                temp: "21",
            },
            {
                id:4,
                place: "Kollam,Kerala",
                condition: "Sunny",
                temp: "30",
            },
        ]
    )

    const [notificationData,setNotificationData] = useState([
        {
            id: 1,
            condition:'rain',
            title: 'A Storm is approaching',
            descrption: "A high frequency storm is likely to approach your city with a magnitude of  6.0. it is likely to deal damage to weak structures. Please stay safe indoor or under shelter"
        },
        {
            id: 2,
            condition:'thunder',
            title: 'There will be snow tommaorrow',
            descrption: "A high frequency storm is likely to approach your city with a magnitude of  6.0. it is likely to deal damage to weak structures. Please stay safe indoor or under shelter"
        },
        {
            id: 3,
            condition:'lighting',
            title: "it's a sunny day",
            descrption: "A high frequency storm is likely to approach your city with a magnitude of  6.0. it is likely to deal damage to weak structures. Please stay safe indoor or under shelter"
        },
        {
            id: 4,
            condition:'snow',
            title: 'A Storm is approaching',
            descrption: "A high frequency storm is likely to approach your city with a magnitude of  6.0. it is likely to deal damage to weak structures. Please stay safe indoor or under shelter"
        },
        {
            id: 5,
            condition:'snow',
            title: 'A Storm is approaching',
            descrption: "A high frequency storm is likely to approach your city with a magnitude of  6.0. it is likely to deal damage to weak structures. Please stay safe indoor or under shelter"
        },
        {
            id: 6,
            condition:'snow',
            title: 'A Storm is approaching',
            descrption: "A high frequency storm is likely to approach your city with a magnitude of  6.0. it is likely to deal damage to weak structures. Please stay safe indoor or under shelter"
        }
    ])    

    const [currentWheather,setCurrentWheather] = useState(data[0])
        
  return (
    <NavigationContainer>
        <HomeStack.Navigator>
            <HomeStack.Screen 
                name="HomeScreen" 
                initialParams={[currentWheather,hours]} 
                options={{headerShown:false,}} 
                component={HomeTabs} 
                />
            <HomeStack.Screen 
                initialParams={[hours,data]} 
                name="ForecastScreen" 
                component={Forecast}
                options={{headerShown:false,}}  
                />
        </HomeStack.Navigator>
    </NavigationContainer>
    
  )
}

//<Home currentWheather={currentWheather} hours={hours} />
//
