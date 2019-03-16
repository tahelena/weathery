import React from 'react';
import { BarChart } from './BarChart';
import { icons } from '../images'

import { View } from 'react-native';

export default class BottomWeather extends React.Component {

    render() {
        let { weatherList } = this.props

        return (
            <View>
                <BarChart
                    data={weatherList}
                    Images={icons}
                    margin={15}
                    width={20}
                    color={'gray'}
                />

            </View>
        )
    }
}
