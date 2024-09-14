import React,{ useEffect, useState } from 'react';
import { Text, StyleSheet, View, Image, ScrollView } from 'react-native';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import LocationSvg from '../../media/Assests/location-gps.svg';
import Thermostat from '../../media/Assests/thermostat.svg';
import WindIcon from '../../media/Assests/wind.svg';
import HumidityIcon from '../../media/Assests/raining.svg';

export default function Home() {

    const [data,setData] = useState([])
    const [loading,setLoading] = useState(true)

    useEffect(() => {
        axios.get('http://api.weatherapi.com/v1/forecast.json?key=a4d4c607bd9141a2b24221046242704&q=Kollam&days=1&aqi=no&alerts=no')
        .then((response) => {
            console.log(response.data)
            setData(response.data)
            setLoading(false)

        })
        .catch((error) => {
            console.log(error)
        })
    },[])

    const formatDateTime = (dateTimeStr) => {
        const [dateStr, timeStr] = dateTimeStr.split(' ');
        const [year, month, day] = dateStr.split('-');
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const monthName = monthNames[parseInt(month) - 1];
        console.log(`https:${data.current.condition.icon}`)
        return `${day} ${monthName} ${year}, ${timeStr}`;
      };


    return (
        <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
            {loading ? 
                (
                    <Text>Hello</Text>
                ) :
                (
                    <View style={styles.TopContainer}>
                        <View style={styles.FlexParent}>
                            <View>
                                <Text style={styles.PlaceDetailText}>{data.location.name},{data.location.region}</Text>
                                <Text style={styles.LocalTime}>{formatDateTime(data.location.localtime)}</Text>
                            </View>
                            <View>
                                <LocationSvg style={styles.LocationSvg} height={30} width={30}/>
                            </View>
                        </View>
                        <View style={styles.ImgContainerLarge}>
                            <Image source={{ uri: `https:${data.current.condition.icon}` }} height={140} width={140}/>
                        </View>
                        <View style={styles.CurrentStatus}>
                            <View style={styles.currentBox}>
                                <View style={styles.statusDescription}>
                                    <Text style={styles.DataTitle}>Temp</Text>
                                    <Thermostat style={styles.dataIcon} height={20} width={20}/>
                                </View>
                                <View>
                                    <Text style={styles.currentData}>{data.current.temp_c}°</Text>
                                </View>
                            </View>
                            <View style={styles.currentBox}>
                                <View style={styles.statusDescription}>
                                    <Text style={styles.DataTitle}>Wind</Text>
                                    <WindIcon style={styles.dataIcon} height={20} width={20}/>
                                </View>
                                <View>
                                    <Text style={styles.currentData}>{data.current.wind_kph}kph</Text>
                                </View>
                            </View>
                            <View style={styles.currentBox}>
                                <View style={styles.statusDescription}>
                                    <Text style={styles.DataTitle}>humidity</Text>
                                    <HumidityIcon style={styles.dataIcon} height={20} width={20}/>
                                </View>
                                <View>
                                    <Text style={styles.currentData}>{data.current.humidity}%</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.TodayAll}>
                            <View>
                                <Text>Today</Text>

                            </View>
                            <ScrollView style={styles.ScrollForeCast} horizontal>
                                {data.forecast.forecastday[0].hour.map((timecard,index) => (
                                    <View style={styles.ForeCastCard} key={index}>
                                        <View style={styles.LeftForecastCard}>
                                            <Image source={{ uri: `https:${timecard.condition.icon}` }} height={140} width={140}/>
                                        </View>
                                        <View>
                                            <Text style={styles.Time}>{timecard.time}</Text>
                                            <Text style={styles.Temp}>{timecard.temp_c}</Text>
                                        </View>
                                    </View>
                                ))}
                            </ScrollView>
                        </View>
                    
                    </View>
                )
            }
        </LinearGradient>
    )
}
const styles = StyleSheet.create({
    linearGradient :{
        flex: 1,
        borderWidth : 0,
    },
    TopContainer : {
        marginTop : '10%',
        marginLeft : '8%',
        marginRight : '8%',

    },
    FlexParent : {
        flexDirection : "row",
        width : '50%',
        alignItems : 'center',
        margin : 'auto',
    },
    LocationSvg : {
        marginLeft : "60%",
    },
    PlaceDetailText : {
        color : "#fff",
        fontSize : 25,
        fontWeight : '500',
        textAlign : 'center',
    },
    LocalTime : {
        color : "#fff",
        fontSize : 15,
        marginTop : 10,
        fontWeight : '500',
        textAlign : 'center',
    },
    CurrentStatus : {
        marginTop : '20%',
        flexDirection : 'row',
        justifyContent : 'space-between',

    },
    currentBox : {

    },
    statusDescription : {
        flexDirection : 'row',
        alignItems : 'center',
        marginBottom : 5,

    },
    currentData : {
        color : '#fff',
        fontWeight : 'bold',
        fontSize : 20,
        textAlign : 'center',

    },
    DataTitle : {
        color : '#9c9c9c',
        fontWeight : 'bold',
        fontSize : 15,
        marginRight : 3,
        textAlign : 'center',

    },
    dataIcon : {
        color : "#9c9c9c",
    },
    ImgContainerLarge : {
        flexDirection : 'row',
        justifyContent : 'center',
        marginTop : "10%",
    }

})