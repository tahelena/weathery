import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';


export default class MiddleWeather extends React.Component {

    render() {
        let { windSpeed, humidity, tempMax, tempMin, temp } = this.props

        return (
            <View style={styles.bigBox}>
                <View style={styles.container}>
                    <View style={styles.smallBox}>
                        <Text style={styles.tempText}> {temp}</Text>
                        <Text style={{ fontSize: 30, marginBottom: 10 }}>°C</Text>
                    </View>
                    <View style={styles.maxMinBox}>
                        <View style={styles.smallBox}>
                            <Image style={styles.maxMinIcon} source={{ uri: 'https://res.cloudinary.com/tahelena/image/upload/v1552748538/WeatherApp/new/2682808_-_high_hot_summer_temperature_termometer_weather.png' }} />
                            <Text style={styles.maxMinText}> {tempMax} </Text>
                            <Text style={styles.celsius}>°C</Text>
                        </View>
                        <View style={styles.smallBox} >
                            <Image style={styles.maxMinIcon} source={{ uri: 'https://res.cloudinary.com/tahelena/image/upload/v1552748538/WeatherApp/new/2682809_-_cold_freezing_low_temperature_termometer_weather_winter.png' }} />
                            <Text style={styles.maxMinText}> {tempMin} </Text>
                            <Text style={styles.celsius}>°C</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.boxExtras}>

                    <View style={styles.smallBox}>
                        <Image
                            style={styles.extrasIcon}
                            source={{ uri: 'https://res.cloudinary.com/tahelena/image/upload/v1552748537/WeatherApp/new/2682807_-_drop_high_humidity_percentage_precipitation_rain_weather.png' }}
                        />
                        <Text style={styles.extrasText}>
                            {humidity}%
                        </Text>
                    </View>
                    <View style={styles.smallBox}>
                        <Image
                            style={styles.extrasIcon}
                            source={{ uri: 'https://res.cloudinary.com/tahelena/image/upload/v1552748538/WeatherApp/new/2682810_-_catcher_direction_flag_weather_wind_windy.png' }}
                        />
                        <Text style={styles.extrasText}>
                            {windSpeed}  </Text>
                        <Text style={styles.extrasUnitText}>m/s</Text>
                    </View>

                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    bigBox: {
        marginLeft: 50,
        marginRight: 50,
        marginBottom: 10,
    },
    container: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 20,
    },
    smallBox: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    //================  TEMP 
    tempText: {
        fontSize: 40,
        marginRight: 0,
    },
    tempIcon: {
        marginTop: 8,
        width: 40,
        height: 40,
    },

    //================  MAX MIN 
    maxMinBox: {
        marginRight: 45,
    },
    maxMinIcon: {
        marginTop: 5,
        width: 15,
        height: 15,
    },
    maxMinText: {
        fontSize: 18,
        textAlign: 'right',
    },
    celsius: {
        fontSize: 10,
        textAlign: 'left',
        marginBottom: 5
    },
    //================  EXTRAS 
    boxExtras: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 20,
        // marginRight: 30,
    },
    extrasText: {
        fontSize: 20,
        // textAlign: 'left',
    },
    extrasUnitText: {
        fontSize: 15,
        // textAlign: 'left',
        textAlignVertical: 'top',
    },
    extrasIcon: {
        width: 25,
        height: 25,
        overflow: 'visible',

    },

})
