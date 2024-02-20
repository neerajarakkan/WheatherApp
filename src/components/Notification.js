import { View, Text,SafeAreaView,StyleSheet, ScrollView,Image } from 'react-native'
import React from 'react'


import LinearGradient from 'react-native-linear-gradient';


export default function Notification({navigation,route}) {


    const ImageRender = (condition) => {
        if(condition === "rain") {
            return <Image style={styles.imageStyle} source={require('../assets/images/rain.png')} />
        }
        else if (condition === "thunder") {
            return <Image style={styles.imageStyle} source={require('../assets/images/thunder.png')} />
        }
        else if (condition === "lighting") {
            return <Image style={styles.imageStyle} source={require('../assets/images/lighting.png')} />
        }
        else if (condition === "snow") {
            return <Image style={styles.imageStyle} source={require('../assets/images/snow.png')} />
        } 
        else if (condition === "rainy-cloud") {
            return <Image style={styles.imageStyle} source={require('../assets/images/rainy-cloud.png')} />
        } 
    };

    const notificationRender = () => {
        return notificationData.map((item)=> (
            <View key={item.id} style={styles.boxContainer}>
                    <View style={styles.secondContainer} >
                        <View style={styles.imageContainer} >
                            {ImageRender(item.condition)}
                        </View>
                    <Text style={styles.titleText}>{item.title}</Text>
                    </View>
                    <Text style={styles.descriptionText} >{item.descrption}</Text>  
                </View>
            
        ))
    }

    const notificationData = route["params"][0]
    console.log(notificationData)

  return (
    <SafeAreaView style={styles.container}>
        <LinearGradient colors={['#075B94','#080745']} style={styles.linearGradient}>
            <View style={styles.topContainer}>
                <Text style={styles.topText}>Notification</Text>
            </View>  
            <ScrollView  style={{marginBottom:32,}}>
                {notificationRender()}
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
    topContainer: {
		alignItems: 'center',
		marginTop: 26,
		marginBottom: 18,
	},
	topText: {
		fontFamily: 'Gordita-Medium',
		fontSize: 20,
		color: '#fff'
	},
    boxContainer: {
        height: 180,
        backgroundColor: '#075B94',
        marginHorizontal:16,
        borderRadius: 16,
        padding:12,
        marginBottom: 16,
    },
    secondContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    imageContainer: {
        width: 44,
        height: 44,
        backgroundColor: "#080745",
        justifyContent: 'center',
        alignItems:'center',
        borderRadius: 22,
        marginRight: 24,
    },
    imageStyle: {
        width: 25,
        height: 25,
    },
    titleText: {
        fontFamily:'Gordita-Medium',
        color:'#fff'
    },
    descriptionText: {
        color: '#fff',
        fontFamily:'Gordita-Regular',
        lineHeight: 20,
    }
})