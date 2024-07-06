import React,{ useEffect, useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import LocationSvg from '../../media/Assests/location-gps.svg';
import Thermostat from '../../media/Assests/thermostat.svg';
import WindIcon from '../../media/Assests/wind.svg';

export default function Home() {

    const [data,setData] = useState([])
    const [loading,setLoading] = useState(true)

    useEffect(() => {
        axios.get('http://api.weatherapi.com/v1/current.json?key=a4d4c607bd9141a2b24221046242704&q=Kollam&aqi=no')
        .then((response) => {
            console.log(response.data)
            setData(response.data)
            setLoading(false)

        })
        .catch((error) => {
            console.log(error)
        })
    },[])


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
                                <Text style={styles.PlaceDetailText}>{data.location.localtime}</Text>
                            </View>
                            <View>
                                <LocationSvg height={30} width={30}/>
                            </View>
                        </View>
                        <View style={styles.CurrentStatus}>
                            <View style={styles.currentBox}>
                                <View style={styles.statusDescription}>
                                    <Text>Temp</Text>
                                    <Thermostat style={styles.dataIcon} height={20} width={20}/>
                                </View>
                                <View>
                                    <Text style={styles.currentData}>{data.current.temp_c}</Text>
                                </View>
                            </View>
                            <View style={styles.currentBox}>
                                <View style={styles.statusDescription}>
                                    <Text>Wind</Text>
                                    <WindIcon style={styles.dataIcon} height={20} width={20}/>
                                </View>
                                <View>
                                    <Text style={styles.currentData}>{data.current.wind_kph}kph</Text>
                                </View>
                            </View>
                            <View style={styles.currentBox}>
                                <View style={styles.statusDescription}>
                                    <Text>Temp</Text>
                                    <Thermostat style={styles.dataIcon} height={20} width={20}/>
                                </View>
                                <View>
                                    <Text style={styles.currentData}>{data.current.temp_c}</Text>
                                </View>
                            </View>
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
        marginLeft : '20%',
        marginRight : '5%',

    },
    FlexParent : {
        flexDirection : "row",
        justifyContent : 'space-between',
        alignItems : 'center',
    },
    PlaceDetailText : {
        color : "#fff",
        fontSize : 28,
        fontWeight : 'bold',
        textAlign : 'center',
    },
    CurrentStatus : {

    },
    currentBox : {

    },
    statusDescription : {

    },
    currentData : {

    },
    dataIcon : {

    }

})