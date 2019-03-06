import { View, Text, StyleSheet, ImageBackground, Switch } from 'react-native'

const Main = ({ image, changeColor, value }) => (
    <ImageBackground source={{ uri: image }} style={{ width: '100%', height: '100%' }}>
        <View>
            <Text style={styles.title}> SWIPE !!</Text>
            <Switch
                onValueChange={() => changeColor()}
                value={value}
            />
        </View>
    </ImageBackground>
)
const images = {
    one: 'https://res.cloudinary.com/tahelena/image/upload/v1551701859/WeatherApp/background_img.jpg',
    two: 'https://res.cloudinary.com/tahelena/image/upload/v1551716076/WeatherApp/dark_background_img.jpg'
}

export default class App extends React.Component {
    state = {
        image: images.one, value: false
    }
    changeColor = () => {
        let { value } = this.state;
        if (!value) {
            this.setState({ value: true, image: images['two'] })
        } else {
            this.setState({ value: false, image: images['one'] })
        }
        this.setState({ value: !this.state.value });
    }
    render() {
        return (
            <Sidebar
                leftSidebar={<LeftSidebar />}
                style={{ flex: 1, backgroundColor: 'white' }}>
                <Main
                    image={this.state.image}
                    changeColor={this.changeColor}
                    value={this.state.value}
                />
                <Text>Inside</Text>
            </Sidebar>
        )
    }
}
