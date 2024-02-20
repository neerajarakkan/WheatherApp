import { View, Text,SafeAreaView, StyleSheet, ScrollView, Image, ImageBackground } from 'react-native'
import React from 'react'


import LinearGradient from 'react-native-linear-gradient';



export default function Widgets({navigation,route}) {


	const locationData = route["params"][0]

	const ImageRender = (condition) => {
        if(condition === "Rainning") {
            return <Image style={styles.hourImage} source={require('../assets/images/rain.png')} />
        }
        else if (condition === "Thunder Storm") {
            return <Image style={styles.hourImage} source={require('../assets/images/thunder.png')} />
        }
        else if (condition === "lighting") {
            return <Image style={styles.hourImage} source={require('../assets/images/lighting.png')} />
        }
        else if (condition === "Snow") {
            return <Image style={styles.hourImage} source={require('../assets/images/snow.png')} />
        } 
        else if (condition === "Sunny") {
            return <Image style={styles.hourImage} source={require('../assets/images/rainy-cloud.png')} />
        } 
    };

	const widgetRender = () => {
		return locationData.map((item)=> {
			if(item.condition === "Rainning") {
				return (
				<View style={[styles.boxContainer,styles.rainning]} key={item.id}>
					{ImageRender(item.condition)}
						<View style={styles.textContainer}>
							<Text style={[styles.locationText,styles.blackText]}>{item.place}</Text>
							<Text style={[styles.conditionText,styles.blackTextOp]}>{item.condition}</Text>
						</View>
						<Text style={[styles.tempText,styles.blackText]}>{item.temp}{'\u00b0'}</Text>
					</View>)
			}
			else if (item.condition === "Thunder Storm") {
				return (
				<LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#080745','#075B94']}style={styles.boxContainer} key={item.id}>
					{ImageRender(item.condition)}
						<View style={styles.textContainer}>
							<Text style={styles.locationText}>{item.place}</Text>
							<Text style={styles.conditionText}>{item.condition}</Text>
						</View>
						<Text style={styles.tempText}>{item.temp}{'\u00b0'}</Text>
					</LinearGradient>)
			}
			else if (item.condition === "Snow") {
				return (
					<View style={styles.boxContainer} key={item.id}>
					{ImageRender(item.condition)}
						<View style={styles.textContainer}>
							<Text style={styles.locationText}>{item.place}</Text>
							<Text style={styles.conditionText}>{item.condition}</Text>
						</View>
						<Text style={styles.tempText}>{item.temp}{'\u00b0'}</Text>
					</View>
				)
			} 
			else if (item.condition === "Sunny") {
				return (
					
				<ImageBackground imageStyle={{ borderRadius: 24}} source={require('../assets/images/clouds.png')} resizeMode="cover"  style={styles.imageContainer} key={item.id}>
				{ImageRender(item.condition)}
					<View style={styles.textContainer}>
						<Text style={styles.locationText}>{item.place}</Text>
						<Text style={styles.conditionText}>{item.condition}</Text>
					</View>
					<Text style={styles.tempText}>{item.temp}{'\u00b0'}</Text>
				</ImageBackground>
				)
			} 
	})
	}
	


  return (
    <SafeAreaView style={styles.container}>
       <LinearGradient colors={['#075B94','#080745']} style={styles.linearGradient}>
			<View style={styles.topContainer}>
				<Text style={styles.topText}>Widgets</Text>
			</View>
			<ScrollView style={{marginBottom:32,}}>
				{widgetRender()}
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
		height: 90,
        marginHorizontal: 8,
        flexDirection: 'row',
        backgroundColor: '#07072A',
        paddingHorizontal: 24,
        borderRadius: 20,
        marginBottom: 8,
        justifyContent: 'space-between',
        alignItems: 'center'
	},
	hourImage: {
        width: 40,
        height: 40,
        marginRight: 12,
      },
	  textContainer: {
		width: '40%'

	  },
	  locationText: {
		color: "#fff",
		fontFamily:'Gordita-Regular',
		fontSize: 14,
		marginBottom: 8,
	  },
	  conditionText: {
		color: "#fff",
    	opacity: 0.5,
		fontFamily: 'Gordita-Regular'
	  },
	  tempText: {
		color: '#fff',
		fontFamily: 'Gordita-Medium',
		fontSize: 35,
	  },
	  rainning: {
		backgroundColor: '#fff'
	  },
	  blackText: {
		color: '#000'
	  },
	  blackTextOp: {
		color: '#000',
		opacity: 0.5,
	  },
	  imageContainer: {
		height: 90,
        marginHorizontal: 8,
        flexDirection: 'row',
        paddingHorizontal: 24,
        borderRadius: 24,
        marginBottom: 8,
        justifyContent: 'space-between',
        alignItems: 'center'
	  }
  })