import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


export default class SearchLocation extends React.Component {


    render() {
        return (
            <GooglePlacesAutocomplete
                placeholder='Search'
                minLength={2} // minimum length of text to search
                autoFocus={false}
                returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                listViewDisplayed='auto'    // true/false/undefined
                fetchDetails={true}
                renderDescription={row => row.description} // custom description render
                onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                    let offset = details.utc_offset
                    let geoLoc = details.geometry.location
                    let city = details.vicinity
                    this.props.getData(geoLoc, city, offset)
                    this.props._toggleModal()
                }}
                query={{
                    // available options: https://developers.google.com/places/web-service/autocomplete
                    key: 'AIzaSyAYbCJWxydjPZHHg2KNXoOnr8osUqARAaw',
                    language: 'en', // language of the results
                    types: '(cities)' // default: 'geocode'
                }}
                styles={{
                    textInputContainer: {
                        borderRadius: 10
                    },
                    description: {
                        color: 'black',
                        fontWeight: 'bold'
                    },
                    textInput: {
                        backgroundColor: 'lightgray',
                        height: 28,
                        fontSize: 15,
                    }
                }}
                enablePoweredByContainer={false}
                // currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                // currentLocationLabel="Current location"
                // nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                // GoogleReverseGeocodingQuery={{
                //     // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                // }}
                // GooglePlacesSearchQuery={{
                //     // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                //     rankby: 'distance',
                //     types: 'food'
                // }}

                filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities


                debounce={0} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
            // renderLeftButton={() => <Image source={{ uri: 'https://res.cloudinary.com/tahelena/image/upload/v1551625538/WeatherApp/loupe.png' }} />}
            // renderRightButton={() => <Text>Custom text after the input</Text>}
            />
        );
    }
}