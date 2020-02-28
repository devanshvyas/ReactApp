import React, { Component } from "react";
import { SafeAreaView, Image, Text, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";


export default class ProfileComponent extends Component {
    render() {
        return <SafeAreaView style={styles.main}>
            <View style={styles.imageContainer}>
            <Image source={require('../assets/avatar.png')} style={styles.image}></Image>
            <TouchableOpacity>
                <Image source={require('../assets/edit.png')}/>
            </TouchableOpacity>
            </View>
            <Text>Name</Text>
            <Text>Email</Text>

        </SafeAreaView>
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        flexDirection:'column'
    },
    imageContainer: {
        flex: 0.3,
        alignItems:'center',
        backgroundColor: 'red'
    },
    image: {
        top:10,
        height: 100,
        width: 100,
    }
})