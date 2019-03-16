import React from 'react';
import { View, ImageBackground, StyleSheet, Image, StatusBar, ScrollView, Button } from 'react-native';
import TopBar from './components/TopBar'
import axios from 'axios'
import TopWeather from './components/TopWeather';
import MiddleWeather from './components/MiddleWeather';
import { backImage } from './images'
import BottomWeather from './components/BottomWeather';
import moment from 'moment-timezone'


export default class App extends React.Component {
  state = {
    isReady: false,
    geoLoc: '', city: '',
    temp: '', tempMax: '', tempMin: '',
    windSpeed: '', humidity: '',
    date: '', dateNow: '',
    weatherImage: '', weatherDescription: '', weatherMain: '', weatherList: [],
    background: backImage['light'], value: false,
    isModalVisible: false,
    offset: ''
  }

  componentDidMount() {
    this.currentPosition()
  }

  // ====================================================================================================================================
  //===================================================== SEARCH MODAL ==================================================================
  // ====================================================================================================================================

  _toggleModal = () => {
    this.state.isModalVisible === false ? this.listView.scrollTo({ y: 0 }) : null;
    this.setState({ isModalVisible: !this.state.isModalVisible })
  }


  // ====================================================================================================================================
  //======================================================= CURRENT POSITION ============================================================
  // ====================================================================================================================================


  currentPosition = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      let geoLoc = { 'latitude': pos.coords.latitude, 'longitude': pos.coords.longitude }
      this.geoCurrent(geoLoc);
    })
  }

  // ====================================================================================================================================
  //======================================================= CURRENT WEATHER =============================================================
  // ====================================================================================================================================

  geoCurrent = geoLoc => {
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${geoLoc.latitude}&lon=${geoLoc.longitude}&units=metric&APPID=16909a97489bed275d13dbdea4e01f59`
    const currentCity = axios(url)
      .then((res) => {
        // debugger
        this.setState({
          city: res.data.name,
          weatherImage: res.data.weather[0].icon,
          weatherMain: res.data.weather[0].main,
          weatherDescription: res.data.weather[0].description,
          dateNow: new Date(res.data.dt * 1000),
          temp: Math.round(res.data.main.temp),
          windSpeed: res.data.wind.speed,
          humidity: res.data.main.humidity,
          tempMax: Math.round(res.data.main.temp_max),
          tempMin: Math.round(res.data.main.temp_min),
        })
        this.dateInfo();
        this.setState({ isReady: true })
        this.geoCurrentForecast(geoLoc)
      }).catch((error) => { debugger })
  }

  // ====================================================================================================================================
  //======================================================= SEARCH WEATHER ==============================================================
  // ====================================================================================================================================

  geoSearch = (geoLoc, city) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${geoLoc.lat}&lon=${geoLoc.lng}&units=metric&APPID=16909a97489bed275d13dbdea4e01f59`
    const citySearch = axios(url)
      .then((res) => {
        // debugger
        this.setState({
          weatherImage: res.data.weather[0].icon,
          weatherMain: res.data.weather[0].main,
          weatherDescription: res.data.weather[0].description,
          dateNow: new Date(res.data.dt * 1000),
          temp: Math.round(res.data.main.temp),
          windSpeed: res.data.wind.speed,
          humidity: res.data.main.humidity,
          tempMax: Math.round(res.data.main.temp_max),
          tempMin: Math.round(res.data.main.temp_min),
          city: city
        })
        this.dateInfo();
        this.geoSearchForecast(geoLoc)
      }).catch((error) => { debugger })
  }

  // ====================================================================================================================================
  //======================================================= CURRENT FORECAST ============================================================
  // ====================================================================================================================================
  geoCurrentForecast = (geoLoc) => {
    // debugger
    const url = `http://api.openweathermap.org/data/2.5/forecast/daily?lat=${geoLoc.latitude}&lon=${geoLoc.longitude}&units=metric&cnt=8&APPID=16909a97489bed275d13dbdea4e01f59`
    const currentCity = fetch(url)
      .then((res) => {
        res.json().then((resJson) => {
          this.setState({
            weatherList: resJson.list,
          })
          this.dateInfo();
        }).catch((error) => { debugger })
      }).catch((error) => { debugger })
  }

  // ====================================================================================================================================
  //======================================================= SEARCH FORECAST =============================================================
  // ====================================================================================================================================

  geoSearchForecast = (geoLoc) => {
    const url = `http://api.openweathermap.org/data/2.5/forecast/daily?lat=${geoLoc.lat}&lon=${geoLoc.lng}&units=metric&cnt=8&APPID=16909a97489bed275d13dbdea4e01f59`
    const citySearch = fetch(url)
      .then((res) => {
        res.json().then((resJson) => {
          this.setState({
            weatherList: resJson.list,
          })
          this.dateInfo();
        }).catch((error) => { debugger })
      }).catch((error) => { debugger })
  }

  // ====================================================================================================================================
  //======================================================= DATE INFO ===================================================================
  // ====================================================================================================================================

  dateInfo = () => {

    let { dateNow } = this.state
    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let date = (`${weekDays[dateNow.getDay()]}, ${dateNow.getDate()} ${monthNames[dateNow.getMonth()]}`)
    this.setState({ date })
  }

  // ====================================================================================================================================
  //======================================================= GET GEOLOCATION AND CITY ====================================================
  // ====================================================================================================================================

  getData = (geoLoc, city, offset) => {
    this.setState({ offset })
    this.geoSearch(geoLoc, city)
  }

  // ====================================================================================================================================
  //======================================================= CHANGE THEME ================================================================
  // ====================================================================================================================================

  changeColor = () => {
    let { value } = this.state;

    !value ? this.setState({ value: true, background: backImage['dark'] }) :
      this.setState({ value: false, background: backImage['light'] });
    this.setState({ value: !this.state.value });
  }

  render() {
    let { background, value } = this.state

    if (!this.state.isReady) {

      return <Image
        style={styles.loading}
        source={{ uri: 'https://res.cloudinary.com/tahelena/image/upload/e_improve,w_300,h_600,c_thumb,g_auto/v1551784717/WeatherApp/icon-gif-16.gif' }} />
    }

    return (
      <View >
        <StatusBar hidden />
        <ImageBackground
          style={styles.image}
          source={{ uri: background }}
        >
          <TopBar
            value={value}
            changeColor={this.changeColor}
            getData={this.getData}
            _toggleModal={this._toggleModal}
            isModalVisible={this.state.isModalVisible}
          />

          <ScrollView ref={ref => this.listView = ref}>
            <TopWeather
              city={this.state.city}
              date={this.state.date}
              weatherMain={this.state.weatherMain}
              weatherImage={this.state.weatherImage}
              currentPosition={this.currentPosition}
            />
            <MiddleWeather
              windSpeed={this.state.windSpeed}
              humidity={this.state.humidity}
              tempMax={this.state.tempMax}
              tempMin={this.state.tempMin}
              temp={this.state.temp}
            />
            <BottomWeather
              weatherList={this.state.weatherList}
            />
          </ScrollView>

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
    fontSize: 50,
  },
})