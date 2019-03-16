import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { icons } from '../images'


export default class TopWeather extends React.Component {

    render() {
        let { city, date, weatherMain, weatherImage, currentPosition } = this.props


        return (

            <View >
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => currentPosition()}>
                        <Image
                            style={styles.location}
                            source={{ uri: 'https://res.cloudinary.com/tahelena/image/upload/v1551625537/WeatherApp/location-pin.png' }} />
                    </TouchableOpacity>
                    <Text style={styles.textCity}>
                        {city}
                    </Text>
                </View>
                {/* 
                <Text style={styles.textDate}>
                    {date}
                </Text> */}
                <View style={styles.boxImage}>
                    <Image
                        style={styles.image}
                        resizeMode='contain'
                        source={{ uri: icons[weatherImage] }} />
                </View>
                <Text style={styles.textDescription}>
                    {weatherMain}
                </Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 10,
    },
    textCity: {
        fontSize: 40,
        textAlign: 'center',
    },
    textDate: {
        fontSize: 30,
        textAlign: 'center'
    },
    image: {
        width: 180,
        height: 180,
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
    textDescription: {
        fontSize: 20,
        textAlign: 'center',

    },
    boxImage: {
        justifyContent: 'center',
        alignItems: 'center',
    },
})
