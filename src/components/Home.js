import { View, Text, ImageBackground, StyleSheet, Image, SafeAreaView, Button, TouchableOpacity, ScrollView } from 'react-native'


import React, { useEffect, useState } from 'react'


import LinearGradient from 'react-native-linear-gradient';


import LocationGps from "../assets/images/location-gps.svg";
import TempIcon from "../assets/images/thermostat.svg"
import WindIcon from "../assets/images/wind.svg"
import HumidityIcon from "../assets/images/humidity.svg"


export default function Home({navigation,route}) {
    const Months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    const [currentDate,setCurrentDate] = useState()

    const currentWheather = route["params"][0]
    const hoursWheater = route["params"][1]

    const apiKey = '7ee3668b95174ccab3961309241302'; 
    const city = 'Kochi';
    const days = 1;
    const aqi = false; 
    const alerts = false; 
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

        
            
        

      }, []);


    const date = new Date().getDate(); 

    const mainImage = () => {

            if(currentWheather.condition === "rain") {
                return <Image style={styles.centerImage} source={require('../assets/images/rain.png')} />
            }
            else if (currentWheather.condition === "thunder") {
                return <Image style={styles.centerImage} source={require('../assets/images/thunder.png')} />
            }
            else if (currentWheather.condition === "lighting") {
                return <Image style={styles.centerImage} source={require('../assets/images/lighting.png')} />
            }
            else if (currentWheather.condition === "snow") {
                return <Image style={styles.centerImage} source={require('../assets/images/snow.png')} />
            } 
            else if (currentWheather.condition === "rainy-cloud") {
                return <Image style={styles.centerImage} source={require('../assets/images/rainy-cloud.png')} />
            } 
           
    };
    const ImageRender = (condition) => {
        if(condition === "rain") {
            return <Image style={styles.hourImage} source={require('../assets/images/rain.png')} />
        }
        else if (condition === "thunder") {
            return <Image style={styles.hourImage} source={require('../assets/images/thunder.png')} />
        }
        else if (condition === "lighting") {
            return <Image style={styles.hourImage} source={require('../assets/images/lighting.png')} />
        }
        else if (condition === "snow") {
            return <Image style={styles.hourImage} source={require('../assets/images/snow.png')} />
        } 
        else if (condition === "rainy-cloud") {
            return <Image style={styles.hourImage} source={require('../assets/images/rainy-cloud.png')} />
        } 
    }
    const hoursRender = () => {
        return hoursWheater.map((item) => {
            if(item.current === true) {
                return (
                    <View key={item.time} style={[styles.hourContainer,styles.hourContainerCurrent]} >
                    {ImageRender(item.condition)}
                    <View style={styles.hourTextContainer} >
                        <Text style={styles.hourTime}>{item.time}.00</Text>
                        <Text style={styles.hourTemp}>{item.temp}{'\u00b0'}</Text>
                    </View>
                    </View>
                )
            }
            else {
                return (
                <View key={item.time} style={styles.hourContainer} >
                    {ImageRender(item.condition)}
                    <View style={styles.hourTextContainer} >
                        <Text style={styles.hourTime}>{item.time}.00</Text>
                        <Text style={styles.hourTemp}>{item.temp}{'\u00b0'}</Text>
                    </View>
                    </View>
                )
            }
            
        })
    }

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
            <View style={styles.imageContainer}>
             {mainImage()}
            </View>
            <View style={styles.centerThreeMain}>
                <View style={styles.threeItems}>
                    <View style={styles.icontextConatiner}>
                        <Text style={styles.mainThreeText}>Temp</Text>
                        <TempIcon style={styles.threeIcons} width={20} />
                    </View>
                    <Text style={styles.threeSmallTexts}>{currentWheather.temp}{'\u00b0'}</Text>
                </View>
                <View style={styles.threeItems}>
                    <View style={styles.icontextConatiner}>
                        <Text style={styles.mainThreeText}>Wind </Text>
                        <WindIcon width={18} />
                    </View>
                    <Text style={styles.threeSmallTexts}>{currentWheather.wind} km/h</Text>
                </View>
                <View style={styles.threeItems}>
                    <View style={styles.icontextConatiner}>
                        <Text style={styles.mainThreeText}>Humidity </Text>
                        <HumidityIcon width={18}/>
                    </View>
                    <Text style={styles.threeSmallTexts}>{currentWheather.humidity}%</Text>
                </View>
            </View>
            <View>
                <View style={styles.listTopContainer} >
                    <Text style={styles.todayText} >Today</Text>
                    <TouchableOpacity onPress={()=> navigation.navigate('ForecastScreen')}>
                        <Text style={styles.buttonText}  >view all</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView horizontal={true} style={{marginHorizontal:10,marginTop:18,marginBottom:22,}} showsHorizontalScrollIndicator={false}>
                    {hoursRender()}
                </ScrollView>
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
  },
  imageContainer: {
    marginTop: 12,
    alignItems:'center'
  },
  centerImage: {
    height:150,
    width: 150,
  },
  centerThreeMain: {
    flexDirection: 'row',
    justifyContent: "space-between",
    margin: 32,
  },
  threeItems: {

  },
  icontextConatiner: {
    flexDirection:'row'
  },
  mainThreeText: {
    color: "#fff",
    opacity: 0.5,
    fontSize: 14,
    fontFamily: 'Gordita-Regular',
  },
  threeIcons: {
    opacity: 0.8,
  },
  threeSmallTexts: {
    color:"#fff",
    fontSize: 16,
    textAlign: "center",
    fontFamily: 'Gordita-Regular',
  },
  listTopContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 18,
  },
  todayText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Gordita-Medium',
  },
  buttonText: {
    color: '#07072A',
    fontSize: 12,
    fontFamily:'Gordita-Regular'
  },
  hourContainer: {
    marginHorizontal: 8,
    flexDirection: 'row',
    backgroundColor: '#07072A',
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 14,
  },
  hourImage: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  hourTime: {
    color: '#fff',
    fontFamily: 'Gordita-Regular',
  },
  hourTemp: {
    color: '#fff',
    fontFamily: 'Gordita-Medium',
    fontSize: 18,
  },
  hourContainerCurrent: {
    backgroundColor:'#075B94'
  }

})