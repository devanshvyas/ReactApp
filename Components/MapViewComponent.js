import React, { Component } from "react";
import MapView, { Polyline, Marker } from "react-native-maps";
import { View } from "react-native";

export default class MapViewComponent extends Component {
    constructor() {
        super()
        this.state = {
            image: null,
            latitude: 0.0,
            longitude: 0.0,
        }
    }

    componentDidMount() {
        navigator.geolocation.watchPosition(this.onLocationSuccess, this.onLocationError)
    }

    onLocationSuccess = (position) => {
        console.log('position', position.coords.latitude);
        this.setState({ latitude: position.coords.latitude, longitude: position.coords.longitude })
    }

    onLocationError = () => {

    }

    render() {
        return <View style={{ height:300}}>
            <MapView
                initialRegion={{
                    latitude: 23.0588416,
                    longitude: 72.5225,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1
                }}
                style={{ height: 300 }}
            >
                <Polyline
                    strokeWidth={5}
                    strokeColor='#219199'
                    coordinates={
                        [
                            {
                                latitude: 23.0588416,
                                longitude: 72.5225,
                            },
                            {
                                latitude: 23.027387,
                                longitude: 72.507136
                            },
                            {
                                latitude: 23.027712,
                                longitude: 72.502839
                            },
                            {
                                latitude: 23.025802,
                                longitude: 72.502587
                            },
                            {
                                latitude: 23.025836,
                                longitude: 72.503349,
                            }
                        ]
                    }
                />
                <Marker
                    coordinate={{
                        latitude: 23.025836,
                        longitude: 72.503349,
                    }}
                    title='Solution Analysts'
                    description='ઉકેલ વિશ્લેષકો'
                    identifier='1'
                />
            </MapView>
        </View>
    }
}