import { View, Text,ScrollView,StyleSheet,Image, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'



import moment from 'moment';

import LinearGradient from 'react-native-linear-gradient';

export default function Forecast({navigation,route}) {

    

    const hoursWheater = route["params"][0]
    const data = route["params"][1]

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
    };
    const weekRender = ()=> {
        return data.map((item)=> (   
            <View key={item.day} style={styles.weekContainer} >
            <View style={styles.weekTextContainer} >
                <Text style={styles.daynameText}>{moment().add(item.day-1,'days').format("dddd")}</Text>
                <Text style={styles.dateText}>{moment().add(item.day-1,'days').format("D MMM")}</Text>
            </View>
            <Text style={styles.tempText}>{item.temp}{'\u00b0'}</Text>
            {ImageRender(item.condition)}
            </View>
            
        ))
    }

  return (
    <SafeAreaView style={styles.container}>
        <LinearGradient colors={['#075B94','#080745']} style={styles.linearGradient}>
        <View style={styles.headingContainer} >
            <Text style={styles.headingText}>Forecast report</Text>
        </View>
        <View style={styles.listTopContainer} >
            <Text style={styles.todayText} >Today</Text>
            <TouchableOpacity >
                <Text style={styles.buttonText}  >view all</Text>
            </TouchableOpacity>
         </View>
        <ScrollView horizontal={true} style={{marginHorizontal:10,marginTop:18,marginBottom:22,height: 120,}} showsHorizontalScrollIndicator={false}>
            {hoursRender()}
        </ScrollView>
        <View style={styles.nextForecastTopContainer}>
            <Text  style={styles.nextForecastText}>Next forecast</Text>
            <TouchableOpacity style={styles.dayButton}>
                <Text style={styles.dayButtonText}>5 day</Text>
            </TouchableOpacity>
        </View>
        <ScrollView>
                {weekRender()}
        </ScrollView>
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
    headingContainer: {
        marginVertical: 26,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headingText: {
        color: '#fff',
        fontFamily: 'Gordita-Medium',
        fontSize: 20,
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
        maxHeight: 70,
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
      },
      nextForecastTopContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 8,
        marginBottom: 16,
      },
      nextForecastText: {
        fontSize: 18,
        fontFamily: 'Gordita-Regular',
        color: '#fff',
      },
      dayButton: {
        paddingHorizontal: 16,
        paddingVertical: 2,
        backgroundColor:"#071946",
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center'
      },
      dayButtonText: {
        color:'#fff',
        fontSize: 10,
      },
      weekContainer: {
        height: 80,
        marginHorizontal: 8,
        flexDirection: 'row',
        backgroundColor: '#07072A',
        paddingHorizontal: 24,
        borderRadius: 20,
        marginBottom: 8,
        justifyContent: 'space-between',
        alignItems: 'center'
        
      },
      weekTextContainer: {
        width: "25%"
      },
      daynameText: {
        fontFamily: 'Gordita-Regular',
        fontSize: 16,
        color: '#fff',
        marginBottom: 8,
      },
      dateText: {
        fontFamily: 'Gordita-Regular',
        fontSize: 12,
        color: '#fff'
      },
      tempText: {
        color: "#fff",
        fontSize: 35,
      }
    
  })