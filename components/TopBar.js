import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import Modal from "react-native-modal";
import SearchLocation from './SearchLocation';

export default class TopBar extends React.Component {

    state = {
        isModalVisible: false,
    };

    _toggleModal = () =>
        this.setState({ isModalVisible: !this.state.isModalVisible });


    render() {
        return (
            <View style={styles.container}>

                <View style={styles.modal}>
                    <TouchableOpacity onPress={this._toggleModal}>
                        <Image
                            style={styles.image}
                            source={{ uri: 'https://res.cloudinary.com/tahelena/image/upload/v1551625538/WeatherApp/loupe.png' }} />
                    </TouchableOpacity>
                    <Modal isVisible={this.state.isModalVisible}>
                        <View style={{ flex: 1 }}>
                            <SearchLocation
                                _toggleModal={this._toggleModal}
                                getData={this.props.getData} />
                            <TouchableOpacity onPress={this._toggleModal}>
                                <Text>Hide me!</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                </View>

                <Image
                    style={styles.image}
                    source={{ uri: 'https://res.cloudinary.com/tahelena/image/upload/v1551625538/WeatherApp/settings.png' }} />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        marginTop: '2%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%'
    },
    image: {
        width: 32,
        height: 32,
        marginLeft: 20,
        marginRight: 20,
        overflow: 'visible',

    },
    modal: {
        flex: 1,
    }

})
