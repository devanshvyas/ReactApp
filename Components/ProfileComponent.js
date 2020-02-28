import React, { Component } from "react";
import { SafeAreaView, Image, Text } from "react-native";


export default class ProfileComponent extends Component {
    render() {
        return <SafeAreaView>
            <Image source={require('../assets/avatar.png')}></Image>
            
            <Text>Name</Text>
            <Text>Email</Text>

        </SafeAreaView>
    }
}

