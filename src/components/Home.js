import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    Image,
    SafeAreaView,
    Button,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';


import LinearGradient from 'react-native-linear-gradient';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';


import {API_HOST, API_KEY, URL} from '../../axiosConfig';


import LocationGps from '../assets/images/location-gps.svg';
import TempIcon from '../assets/images/thermostat.svg';
import WindIcon from '../assets/images/wind.svg';
import HumidityIcon from '../assets/images/humidity.svg';


export default function Home({navigation, route}) {

    const Months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];

    const [currentDate, setCurrentDate] = useState();
    const [locationDetails, setLocationDetails] = useState(null);
    const [myLocation, setMyLocation] = useState(null);
    const [hoursData, setHoursData] = useState(null);
    const [data, setData] = useState();


    const fetchData = async () => {
        try {
            const response = await axios.request(options);

            setData(response.data);
            setHoursData(response.data.forecast.forecastday[0].hour);
        } catch (error) {
            console.error(error);
        }
    };
    const options = {
        method: 'GET',
        url: URL,
        params: {
            q: myLocation,
            days: '1',
        },
        headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': API_HOST,
        },
    };

    useEffect(() => {
        Geolocation.getCurrentPosition(info => setLocationDetails(info.coords));
        var year = new Date().getFullYear();
        var date = new Date().getDate();
        var monthNumber = new Date().getMonth();
        var month = Months[monthNumber];
        var hours = new Date().getHours();
        var min = new Date().getMinutes();
        var sec = new Date().getSeconds();
        var d = new Date().toLocaleString();
        var am_pm = d.slice(19, 22);
        setCurrentDate(month + ' ' + date + ',' + ' ' + hours + ':' + min + am_pm);
    }, []);

    useEffect(() => {
        if (locationDetails) {
            setMyLocation(`${locationDetails.latitude},${locationDetails.longitude}`);
        }
    }, [locationDetails]);

    useEffect(() => {
        if (myLocation) {
            console.log(myLocation);
            fetchData();
        }
    }, [myLocation]);

    const date = new Date().getDate();

    
    const hoursRender = () => {
        let renderOr = false;
        if (hoursData) {
            return hoursData.map(item => {
                if (item.time.slice(11, 13) == new Date().getHours()) {
                    renderOr = true;
                    return (
                        <View key={item.time.slice(11, 13)} style={styles.hourContainer}>
                            <Image
                                style={styles.hourImage}
                                source={{uri: `https:${item.condition.icon}`}}
                            />
                            <View style={styles.hourTextContainer}>
                                <Text style={styles.hourTime}>
                                    {item.time.slice(11, 13)}.00
                                </Text>
                                <Text style={styles.hourTemp}>
                                    {item.temp_c}
                                    {'\u00b0'}
                                </Text>
                            </View>
                        </View>
                    );
                } else {
                    if (renderOr) {
                        return (
                            <View
                                key={item.time.slice(11, 13)}
                                style={[styles.hourContainer, styles.hourContainerCurrent]}>
                                <Image
                                    style={styles.hourImage}
                                    source={{uri: `https:${item.condition.icon}`}}
                                />
                                <View style={styles.hourTextContainer}>
                                    <Text style={styles.hourTime}>
                                        {item.time.slice(11, 13)}.00
                                    </Text>
                                    <Text style={styles.hourTemp}>
                                        {item.temp_c}
                                        {'\u00b0'}
                                    </Text>
                                </View>
                            </View>
                        );
                    }
                }
            });
        }
    };


    
    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={['#075B94', '#080745']}
                style={styles.linearGradient}>
                <View style={styles.topSection}>
                    <View style={styles.placeSection}>
                        <Text style={styles.placeText}>
                            {data ? data.location.name : null}
                        </Text>
                        <Text style={styles.dateText}>{currentDate}</Text>
                    </View>
                    <LocationGps width={18} style={styles.locationIcon} />
                </View>
                <View style={styles.imageContainer}>
                    {data ? (
                        <Image
                            style={styles.centerImage}
                            source={{uri: `https:${data.current.condition.icon}`}}
                        />
                    ) : null}
                </View>
                <View style={styles.centerThreeMain}>
                    <View style={styles.threeItems}>
                        <View style={styles.icontextConatiner}>
                            <Text style={styles.mainThreeText}>Temp</Text>
                            <TempIcon style={styles.threeIcons} width={20} />
                        </View>
                        <Text style={styles.threeSmallTexts}>
                            {data ? data.current.temp_c : null}
                            {'\u00b0'}
                        </Text>
                    </View>
                    <View style={styles.threeItems}>
                        <View style={styles.icontextConatiner}>
                            <Text style={styles.mainThreeText}>Wind </Text>
                            <WindIcon width={18} />
                        </View>
                        <Text style={styles.threeSmallTexts}>
                            {data ? data.current.wind_kph : null} km/h
                        </Text>
                    </View>
                    <View style={styles.threeItems}>
                        <View style={styles.icontextConatiner}>
                            <Text style={styles.mainThreeText}>Humidity </Text>
                            <HumidityIcon width={18} />
                        </View>
                        <Text style={styles.threeSmallTexts}>
                            {data ? data.current.humidity : null}%
                        </Text>
                    </View>
                </View>
                <View>
                    <View style={styles.listTopContainer}>
                        <Text style={styles.todayText}>Today</Text>
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('ForecastScreen', {hourData: hoursData})
                            }>
                            <Text style={styles.buttonText}>view all</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView
                        horizontal={true}
                        style={{marginHorizontal: 10, marginTop: 18, marginBottom: 22}}
                        showsHorizontalScrollIndicator={false}>
                        {hoursRender()}
                    </ScrollView>
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    topSection: {
        paddingTop: 56,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    placeSection: {
        alignItems: 'center',
    },
    locationIcon: {
        position: 'absolute',
        top: 54,
        right: 14,
    },
    placeText: {
        color: '#fff',
        fontSize: 20,
        fontFamily: 'Gordita-Medium',
        marginBottom: 14,
    },
    dateText: {
        fontSize: 12,
        color: '#ffffff',
        fontFamily: 'Gordita-Regular',
    },
    imageContainer: {
        marginTop: 12,
        alignItems: 'center',
    },
    centerImage: {
        height: 150,
        width: 150,
    },
    centerThreeMain: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 32,
    },
    threeItems: {},
    icontextConatiner: {
        flexDirection: 'row',
    },
    mainThreeText: {
        color: '#fff',
        opacity: 0.5,
        fontSize: 14,
        fontFamily: 'Gordita-Regular',
    },
    threeIcons: {
        opacity: 0.8,
    },
    threeSmallTexts: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
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
        fontFamily: 'Gordita-Regular',
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
        backgroundColor: '#075B94',
    },
});
