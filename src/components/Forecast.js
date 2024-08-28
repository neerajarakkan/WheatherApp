import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Image,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import Geolocation from '@react-native-community/geolocation';

import {API_HOST, API_KEY, URL} from '../../axiosConfig';

export default function Forecast({navigation, route}) {


    const [locationDetails, setLocationDetails] = useState(null);
    const [myLocation, setMyLocation] = useState(null);
    var days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];
    const [data, setData] = useState(null);
    const {hourData} = route.params;
    console.log(hourData);
    const fetchData = async () => {
        try {
            const response = await axios.request(options);
            console.log(response.data.forecast.forecastday);
            setData(response.data.forecast.forecastday);
        } catch (error) {
            console.error(error);
        }
    };
    const options = {
        method: 'GET',
        url: URL,
        params: {
            q: myLocation,
            days: '7',
        },
        headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': API_HOST,
        },
    };

    useEffect(() => {
        Geolocation.getCurrentPosition(info => setLocationDetails(info.coords));
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

    const dayNameCalc = dateif => {
        let d = new Date(dateif);
        let dayName = days[d.getDay()];
        return dayName;
    };

 

    const hoursRender = () => {
        let renderOr = false;
        if (hourData) {
            return hourData.map(item => {
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

    const weekRender = () => {
        if (data) {
            return data.map(item => (
                <View key={item.date} style={styles.weekContainer}>
                    <View style={styles.weekTextContainer}>
                        <Text style={styles.daynameText}>{dayNameCalc(item.date)}</Text>
                        <Text style={styles.dateText}>{item.date}</Text>
                    </View>
                    <Text style={styles.tempText}>
                        {item.day.avgtemp_c}
                        {'\u00b0'}
                    </Text>
                    <Image
                        style={styles.hourImage}
                        source={{uri: `http:${item.day.condition.icon}`}}
                    />
                </View>
            ));
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={['#075B94', '#080745']}
                style={styles.linearGradient}>
                <View style={styles.headingContainer}>
                    <Text style={styles.headingText}>Forecast report</Text>
                </View>
                <View style={styles.listTopContainer}>
                    <Text style={styles.todayText}>Today</Text>
                    <TouchableOpacity>
                        <Text style={styles.buttonText}>view all</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView
                    horizontal={true}
                    style={{
                        marginHorizontal: 10,
                        marginTop: 18,
                        marginBottom: 22,
                        height: 120,
                    }}
                    showsHorizontalScrollIndicator={false}>
                    {hoursRender()}
                </ScrollView>
                <View style={styles.nextForecastTopContainer}>
                    <Text style={styles.nextForecastText}>Next forecast</Text>
                    <TouchableOpacity style={styles.dayButton}>
                        <Text style={styles.dayButtonText}>3 day</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView>{weekRender()}</ScrollView>
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
    headingContainer: {
        marginVertical: 26,
        justifyContent: 'center',
        alignItems: 'center',
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
        fontFamily: 'Gordita-Regular',
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
        backgroundColor: '#075B94',
    },
    nextForecastTopContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 8,
        marginBottom: 16,
        marginTop: '-90%',
    },
    nextForecastText: {
        fontSize: 18,
        fontFamily: 'Gordita-Regular',
        color: '#fff',
    },
    dayButton: {
        paddingHorizontal: 16,
        paddingVertical: 2,
        backgroundColor: '#071946',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dayButtonText: {
        color: '#fff',
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
        alignItems: 'center',
    },
    weekTextContainer: {
        width: '25%',
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
        color: '#fff',
    },
    tempText: {
        color: '#fff',
        fontSize: 35,
    },
});
