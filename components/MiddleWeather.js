import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { icons } from '../images'


export default class MiddleWeather extends React.Component {

    render() {
        let { windSpeed, humidity, tempMax, tempMin, temp } = this.props


        return (

            <View >
                <View style={styles.container}>
                    <View style={styles.smallBox}>
                        <Text style={styles.tempText}>
                            {temp}
                        </Text>
                        <Image
                            style={styles.tempIcon}
                            source={{ uri: 'https://res.cloudinary.com/tahelena/image/upload/v1551701858/WeatherApp/celsius.png' }}
                        />
                    </View>
                    <View style={styles.smallBoxMaxMin}>
                        <View style={styles.smallBox}>
                            <Image
                                style={styles.maxMinIcon}
                                source={{ uri: 'https://res.cloudinary.com/tahelena/image/upload/v1551701861/WeatherApp/up-arrow.png' }}
                            />
                            <Text style={styles.text}>
                                {tempMax}
                            </Text>
                            <Image
                                style={styles.maxMinIcon}
                                source={{ uri: 'https://res.cloudinary.com/tahelena/image/upload/v1551701858/WeatherApp/celsius.png' }}
                            />
                        </View>
                        <View style={styles.smallBox}>
                            <Image
                                style={styles.maxMinIcon}
                                source={{ uri: 'https://res.cloudinary.com/tahelena/image/upload/v1551701859/WeatherApp/download-arrow.png' }}
                            />
                            <Text style={styles.text}>
                                {tempMin}
                            </Text>
                            <Image
                                style={styles.maxMinIcon}
                                source={{ uri: 'https://res.cloudinary.com/tahelena/image/upload/v1551701858/WeatherApp/celsius.png' }}
                            />
                        </View>
                    </View>


                </View>

                <View style={styles.container}>

                    <View style={styles.smallBox}>
                        <Image
                            style={styles.location}
                            source={{ uri: 'https://res.cloudinary.com/tahelena/image/upload/v1551701859/WeatherApp/humidity.png' }}
                        />
                        <Text style={styles.text}>
                            {humidity}%
                        </Text>
                    </View>
                    <View style={styles.smallBox}>
                        <Image
                            style={styles.location}
                            source={{ uri: 'https://res.cloudinary.com/tahelena/image/upload/v1551625539/WeatherApp/wind.png' }}
                        />
                        <Text style={styles.text}>
                            {windSpeed} m/s
                            </Text>
                    </View>

                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        // width: '100%'
        marginTop: 20,
    },

    smallBox: {
        flexDirection: 'row',
    },
    smallBoxMaxMin: {

    },
    tempText: {
        fontSize: 45,
    },
    tempIcon: {
        marginTop: 8,
        width: 40,
        height: 40,
    },
    maxMinIcon: {
        marginTop: 8,
        width: 20,
        height: 20,
    },

    text: {

        fontSize: 25,
        textAlign: 'center',
    },
    date: {
        fontSize: 30,
        textAlign: 'center'
    },
    image: {
        width: 200,
        height: 200,
        marginTop: 25,
        marginBottom: 10,
        overflow: 'visible',
    },
    location: {
        marginTop: 5,
        width: 32,
        height: 32,
        overflow: 'visible',
        padding: 20,
    },
    description: {
        fontSize: 20,
        textAlign: 'center'
    },
    boxImage: {
        justifyContent: 'center',
        alignItems: 'center',
    },
})
