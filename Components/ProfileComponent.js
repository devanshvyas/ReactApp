import React, { Component } from "react";
import { ImageBackground, Image, Text, StyleSheet, View, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import * as Permission from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import MapViewComponent from "./MapViewComponent";

class ProfileComponent extends Component {

    constructor(){
        super()
        this.state = {
           image: null,
           latitude: 0.0,
           longitude: 0.0,
        }

        Permission.askAsync(Permission.CAMERA)
        Permission.askAsync(Permission.CAMERA_ROLL)
        Permission.askAsync(Permission.LOCATION)
        navigator.geolocation.watchPosition(this.onLocationSuccess, this.onLocationError)
    }

    onLocationSuccess = (position) => {
        console.log('position',position.coords.latitude);
        this.setState({latitude: position.coords.latitude, longitude: position.coords.longitude})
    }

    onLocationError = () => {

    }

    renderImage() {
        var imageUrl = this.state.image ?? require('../assets/profile.png')
        return (
            <Image style={styles.image} source={imageUrl} />
        )
    }

    onCameraPress = () => {
        ImagePicker.launchCameraAsync().then((result) => {
            this.setState({ image: result })
        })
    }

    onGalleryPress = () => {
        ImagePicker.launchImageLibraryAsync().then((result) => {
            this.setState({ image: result })
        })
    }
    
    onEditPress = () => {
        Alert.alert('Edit Profile', 'Please select to update image...', [
            {
                text: 'Camera',
                onPress: this.onCameraPress
            },
            {
                text: 'Gallery',
                onPress: this.onGalleryPress
            }
        ])
    }

    render() {
        return <ImageBackground source={require('../assets/BG.jpeg')} style={styles.main} blurRadius={5}>
            <View style={styles.imageContainer}>
                {this.renderImage()}
            <TouchableOpacity onPress={this.onEditPress}>
                <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
            <Text style={styles.nameEmail}>{this.props.fullName}</Text>
            <Text style={styles.nameEmail}>{this.props.email}</Text>
            </View>
            <Text style={styles.location}>Current Location</Text>
            {/* <MapView 
                showsUserLocation={true}
                style={{flex: 0.2}}
            >
                </MapView> */}
            <MapViewComponent  style></MapViewComponent>
        </ImageBackground>
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        flexDirection:'column'
    },
    imageContainer: {
        top:70,
        flex: 0.9,
        alignItems:'center',
    },
    image: {
        top:10,
        height: 100,
        width: 100,
        borderRadius: 50,
        borderWidth: 1,
    },
    editText: {
        top: 20,
        flex: 1,
        fontSize: 20,
        fontStyle: "normal",
        textDecorationLine:"underline",
        textAlign: "center",
        color: '#219199'
    },
    nameEmail: {
        bottom: 300,
        fontSize: 20,
        paddingBottom:20,
        color: '#219199'
    },
    location: {
        fontSize: 20,
        alignSelf: 'center',
        paddingBottom: 20,
        color: '#219199'
    }
})

const mapStateToProps = (state) => {
    return { fullName: state.userReducer.fullName, email: state.userReducer.email }
}

export default connect(mapStateToProps)(ProfileComponent)