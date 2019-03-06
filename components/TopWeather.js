import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { icons } from '../images'


export default class TopWeather extends React.Component {

    render() {
        let { city, date, weatherDescription, weatherImage, geoCurrent } = this.props


        return (

            <View >
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => geoCurrent()}>
                        <Image
                            style={styles.location}
                            source={{ uri: 'https://res.cloudinary.com/tahelena/image/upload/v1551625537/WeatherApp/location-pin.png' }} />
                    </TouchableOpacity>
                    <Text style={styles.city}>
                        {city}
                    </Text>
                </View>

                <Text style={styles.date}>
                    {date}
                </Text>
                <View style={styles.boxImage}>
                    <Image
                        style={styles.image}
                        resizeMode='contain'
                        source={{ uri: icons[weatherImage] }} />
                </View>
                <Text style={styles.description}>
                    {weatherDescription}
                </Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flexDirection: 'row',
        // width: '100%'
        marginTop: 20,
    },
    city: {

        fontSize: 40,
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
