import React from 'react';
import { View, ImageBackground, StyleSheet, Image, Text, StatusBar } from 'react-native';
import TopBar from './components/TopBar'
import axios from 'axios'
import TopWeather from './components/TopWeather';
import MiddleWeather from './components/MiddleWeather';


export default class App extends React.Component {
  state = {
    isReady: false,
    geoLoc: '',
    temp: '',
    windSpeed: '',
    city: '',
    weatherList: [],
    date: '',
    humidity: '',
    tempMax: '',
    tempMin: '',
    dateNow: '',
    weatherImage: '',
    weatherDescription: ''
  }

  componentDidMount() {
    this.geoCurrent()
  }

  // ====================================================================================================================================
  //======================================================= CURRENT WEATHER =============================================================
  // ====================================================================================================================================

  geoCurrent = () => {

    navigator.geolocation.getCurrentPosition((pos) => {

      const url = `http://api.openweathermap.org/data/2.5/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&units=metric&APPID=16909a97489bed275d13dbdea4e01f59`
      const currentCity = axios(url)
        .then((res) => {
          // debugger
          this.setState({
            city: res.data.name,
            weatherImage: res.data.weather[0].icon,
            weatherDescription: res.data.weather[0].main,
            dateNow: new Date(res.data.dt * 1000),
            temp: Math.round(res.data.main.temp),
            windSpeed: res.data.wind.speed,
            humidity: res.data.main.humidity,
            tempMax: Math.round(res.data.main.temp_max),
            tempMin: Math.round(res.data.main.temp_min),
          })
          this.dateInfo();
          this.setState({ isReady: true })
        }).catch((error) => {
          debugger
        })
    })
  }

  // ====================================================================================================================================
  //======================================================= SEARCH WEATHER ==============================================================
  // ====================================================================================================================================

  geoSearch = () => {

    let { geoLoc } = this.state
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${geoLoc.lat}&lon=${geoLoc.lng}&units=metric&APPID=16909a97489bed275d13dbdea4e01f59`
    const citySearch = axios(url)
      .then((res) => {
        // debugger
        this.setState({

          weatherImage: res.data.weather[0].icon,
          weatherDescription: res.data.weather[0].main,
          dateNow: new Date(res.data.dt * 1000),
          temp: Math.round(res.data.main.temp),
          windSpeed: res.data.wind.speed,
          humidity: res.data.main.humidity,
          tempMax: Math.round(res.data.main.temp_max),
          tempMin: Math.round(res.data.main.temp_min),
        })
        this.dateInfo();

      }).catch((error) => {
        debugger
      })
  }

  // ====================================================================================================================================
  //======================================================= CURRENT FORECAST ============================================================
  // ====================================================================================================================================
  geoCurrentForecast = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const url = `http://api.openweathermap.org/data/2.5/forecast/daily?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&units=metric&cnt=8&APPID=16909a97489bed275d13dbdea4e01f59`
      const currentCity = fetch(url)
        .then((res) => {
          res.json().then((resJson) => {
            this.setState({
              city: resJson.city.name,
              weatherList: resJson.list,
              dateNow: new Date(resJson.list[0].dt * 1000)
            })
            this.dateInfo();
          }).catch((error) => {
            debugger
          })

        }).catch((error) => {
          debugger
        })
    })
  }

  // ====================================================================================================================================
  //======================================================= SEARCH FORECAST =============================================================
  // ====================================================================================================================================

  geoSearchForecast = () => {
    let { geoLoc } = this.state
    const url = `http://api.openweathermap.org/data/2.5/forecast/daily?lat=${geoLoc.lat}&lon=${geoLoc.lng}&units=metric&cnt=8&APPID=16909a97489bed275d13dbdea4e01f59`
    const citySearch = fetch(url)
      .then((res) => {
        res.json().then((resJson) => {
          this.setState({
            city: resJson.city.name,
            weatherList: res.list,
            dateNow: new Date(resJson.list[0].dt * 1000)
          })
          this.dateInfo();
        }).catch((error) => {
          debugger
        })
        this.setState({ isReady: true })
      }).catch((error) => {
        debugger
      })
  }

  dateInfo() {
    let { dateNow } = this.state

    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ];
    let date = (`${weekDays[dateNow.getDay()]}, ${dateNow.getDate()} ${monthNames[dateNow.getMonth()]}`)
    this.setState({ date })
  }

  getData = (geoLoc, city) => {
    this.setState({ geoLoc, city })
    this.geoSearch()
  }

  render() {

    if (!this.state.isReady) {
      return <Image
        style={styles.loading}
        source={{ uri: 'https://res.cloudinary.com/tahelena/image/upload/e_improve,w_300,h_600,c_thumb,g_auto/v1551784717/WeatherApp/icon-gif-16.gif' }} />
    }
    return (
      <View  >
        <StatusBar hidden />
        <ImageBackground
          style={styles.image}
          source={{ uri: 'https://res.cloudinary.com/tahelena/image/upload/v1551701859/WeatherApp/background_img.jpg' }}
        >
          <TopBar
            getData={this.getData}
          />
          <TopWeather
            {...this.state}
            geoCurrent={this.geoCurrent}
          />
          <MiddleWeather
            {...this.state}
          />
        </ImageBackground>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
  loading: {
    width: '100%',
    height: '100%',
  },
  text: {
    fontSize: 50
  },
})