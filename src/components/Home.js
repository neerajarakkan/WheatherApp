import { View, Text, ImageBackground, StyleSheet, Image, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'

import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';


import LocationGps from "../assets/images/location-gps.svg";

export default function Home() {
    const Months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    const [currentDate,setCurrentDate] = useState()


    const apiKey = '7ee3668b95174ccab3961309241302'; // Replace with your actual API key
    const city = 'Kochi';
    const days = 1;
    const aqi = false; // Set to 'no' to exclude air quality index
    const alerts = false; // Set to 'no' to exclude alerts
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=${days}&aqi=${aqi}&alerts=${alerts}`;


    useEffect(() => {

        var year = new Date().getFullYear();
        var date = new Date().getDate(); 
        var monthNumber = new Date().getMonth();
        var month = Months[monthNumber]
        var hours = new Date().getHours(); 
        var min = new Date().getMinutes(); 
        var sec = new Date().getSeconds(); 
        var d = new Date().toLocaleString();
        var am_pm = d.slice(19, 22)
        setCurrentDate(
          month + ' '+ date+','+' '+ hours+':'+min+am_pm
        );



        axios.get(url)
        .then(response => {
            const data = response["data"]["forecast"]
        })
        .catch(error => {
            console.error(error); // Handle any errors
        });

      }, []);


    const date = new Date().getDate(); 


  return (
    <SafeAreaView style={styles.container}>
        <LinearGradient colors={['#075B94','#080745']} style={styles.linearGradient}>
            <View style={styles.topSection}>
                <View style={styles.placeSection}>
                    <Text style={styles.placeText}>Kochi, kerala</Text>
                    <Text style={styles.dateText}>{currentDate}</Text>
                </View>
                <LocationGps  width={18} style={styles.locationIcon} />
            </View>
            <View>
                
            </View>
            </LinearGradient>
   </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    
  },
  container: {
    flex: 1,
  },
  topSection: {
    paddingTop:56,
    justifyContent:'center',
    flexDirection: 'row'

  },
  placeSection: {
    alignItems: 'center'
  },
  locationIcon: {
    position:'absolute',
    top:54,
    right:14,

  },
  placeText: {
    color:"#fff",
    fontSize: 20,
    fontFamily: 'Gordita-Medium',
    marginBottom: 14,
  },
  dateText: {
    fontSize: 12,
    color: "#ffffff",
    fontFamily: 'Gordita-Regular',
  }
})