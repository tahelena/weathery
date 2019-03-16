import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';


export const BarChart = ({ data, width, color, margin, Images }) => {
    const convertDate = (dt) => {
        let today = new Date(dt * 1000);
        let dateStr = today.toDateString().split(' ');
        let day = dateStr[0];
        let month = today.getMonth() + 1;
        let dayNumber = dateStr[2];
        return { day, month, dayNumber }
    }
    function calcRatio(arr) {
        let findMax = function (arr) {
            var biggest = 0;
            arr.forEach(ele => {
                ele.temp.day > biggest ? biggest = ele.temp.day : null;
            });
            return biggest;
        }
        let findMin = function (arr) {
            var smallest = 0;
            arr.forEach(ele => {
                ele.temp.day < smallest ? smallest = ele.temp.day : null;
            });
            return smallest;
        }
        let max = findMax(arr)
        let min = findMin(arr)
        let arr2 = [];
        let range = max - min;
        arr.forEach(ele => {
            let num = Math.abs(min) + ele.temp.day;
            let height = (100 / range) * num;
            arr2.push({ height, ...ele })
        })
        return arr2;
    }

    return (
        <View style={styles.container}>
            {
                calcRatio(data).map((ele, i) => {
                    if (i > 0 && i < 7) {
                        return (
                            <View key={i}>
                                <Text style={styles.text}>{Math.round(ele.temp.day)}°C</Text>

                                <View style={{ ...styles.graph, width: width, height: ele.height + 2, backgroundColor: color, marginLeft: margin }}></View>

                                <View style={{ marginTop: 5 }}>
                                    <Text style={styles.text}> {convertDate(ele.dt).day} </Text>
                                    <Text style={styles.text}> {convertDate(ele.dt).dayNumber}.{convertDate(ele.dt).month} </Text>

                                    <Image source={{ uri: Images[ele.weather[0].icon] }} style={{ width: 40, height: 40, marginTop: 7 }} />
                                    <View style={{ ...styles.smallBox, marginTop: 5 }}>
                                        <Image style={styles.maxMinIcon}
                                            source={{ uri: 'https://res.cloudinary.com/tahelena/image/upload/v1551701861/WeatherApp/up-arrow.png' }} />
                                        <Text style={styles.text}>{Math.round(ele.temp.max)}°C</Text>
                                    </View>
                                    <View style={styles.smallBox}>
                                        <Image style={styles.maxMinIcon}
                                            source={{ uri: 'https://res.cloudinary.com/tahelena/image/upload/v1551701859/WeatherApp/download-arrow.png' }} />
                                        <Text style={styles.text}>{Math.round(ele.temp.min)}°C</Text>
                                    </View>
                                </View>
                            </View>
                        )
                    }
                })
            }
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 2,
        alignItems: 'flex-end',
        justifyContent: 'center',
        width: '90%',
        flexDirection: 'row',
        padding: 15,
        textAlign: 'center',
        marginLeft: '5%',
    },
    text: {
        textAlign: 'center',
        alignItems: 'center',
        marginRight: 6,
    },
    maxMinIcon: {
        marginTop: 5,
        width: 10,
        height: 10,
    },
    smallBox: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    graph: {
        borderColor: 'black',
        borderWidth: 0.5,
        borderRadius: 5,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0
    },
});
BarChart.defaultProps = {
    data: [],
    width: 40,
    color: 'black',
    margin: 5
}