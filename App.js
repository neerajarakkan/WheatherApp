import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Home from './src/components/Home'



export default function App() {
    const [hours,setHours] = useState([
        {
            time:1,
            temp: 32,
            rain:"lighting",
        },
        {
            time:2,
            temp: 28,
            rain:"rainy-cloud",
        },
        {
            time:3,
            temp: 30,
            rain:"rain_sun",
        },
        {
            time:4,
            temp: 27,
            rain:"snow",
        },
        {
            time:5,
            temp: 32,
            rain:"thunder",
        },
        {
            time:6,
            temp: 32,
            rain:"lighting",
        },
        {
            time:7,
            temp: 32,
            rain:"thunder",
        },
        {
            time:8,
            temp: 15,
            rain:"thunder",
        },
        {
            time:9,
            temp: 34,
            rain:"thunder",
        },
        {
            time:10,
            temp: 22,
            rain:"thunder",
        },
        {
            time:11,
            temp: 29,
            rain:"thunder",
        },
        {
            time:12,
            temp: 30,
            rain:"thunder",
        },
        {
            time:13,
            temp: 29,
            rain:"thunder",
        }, 
    ]) 

    const [data,setData] = useState([
            {
                temp: 28,
                wind: 7.90,
                humidity: 84,
                condition: "thunder",
            },
            {
                temp: 30,
                wind: 8.56,
                humidity: 72,
                condition: "rain",
            },
            {
                temp: 28,
                wind: 7.90,
                humidity: 84,
                condition: "lighting",
            },
            {
                temp: 18,
                wind: 6.50,
                humidity: 20,
                condition: "snow",
            },
            {
                temp: 28,
                wind: 7.90,
                humidity: 84,
                condition: "rainy-cloud",
            },
            {
                temp: 28,
                wind: 7.90,
                humidity: 84,
                condition: "rain_sun",
            },
            {
                temp: 25,
                wind: 7.90,
                humidity: 84,
                condition: "rain",
            },
            
        ])
    const [locationData,setLocationData] = useState(
        [
            {
                place: "Kochi,Kerala",
                condition: "Thunder Storm",
                temp: "29",
            },
            {
                place: "Wayanand,Kerala",
                condition: "Snow",
                temp: "02",
            },
            {
                place: "Kozikode,Kerala",
                condition: "Rainning",
                temp: "21",
            },
            {
                place: "Kollam,Kerala",
                condition: "Sunny",
                temp: "30",
            },
        ]
    )
  return (
    <Home />
  )
}

