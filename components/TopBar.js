import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, Switch } from 'react-native';
import Modal from "react-native-modal";
import SearchLocation from './SearchLocation';

export default class TopBar extends React.Component {

    render() {
        let { _toggleModal, isModalVisible } = this.props
        return (
            <View
                style={styles.container}>

                <View style={{ flex: 1 }}>
                    <TouchableOpacity onPress={_toggleModal}>
                        <Image
                            style={styles.image}
                            source={{ uri: 'https://res.cloudinary.com/tahelena/image/upload/v1551625538/WeatherApp/loupe.png' }} />
                    </TouchableOpacity>

                    <Modal isVisible={isModalVisible}>

                        <View style={{ flex: 0.5, backgroundColor: 'lightgray', borderRadius: 10 }}>

                            <SearchLocation
                                _toggleModal={_toggleModal}
                                getData={this.props.getData} />

                            <TouchableOpacity onPress={_toggleModal} >
                                <Text style={{ color: 'gray', fontSize: 20, margin: 10, textAlign: 'right' }}>Hide me!</Text>
                            </TouchableOpacity>

                        </View>
                    </Modal>
                </View>

                <Switch
                    onValueChange={() => this.props.changeColor()}
                    value={this.props.value}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        marginTop: '2%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',

    },
    image: {
        width: 32,
        height: 32,
        marginLeft: 20,
        marginRight: 20,
        overflow: 'visible',

    }

})
