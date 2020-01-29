import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";


export default class CustomButton extends Component {

    styles = StyleSheet.create({
        mainContainer: {
            margin: 10,
            backgroundColor: '#219199',
            height: 50,
            borderRadius: 25,
            borderWidth: 0.5,
            borderColor: '#228cb3',
            flexDirection: 'row',
            width: this.props.width,
            alignContent: 'center',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.5,
            shadowRadius: 2,
            shadowColor: 'white'
        },
        button: {
            flex: 1,
            fontSize: 20,
            fontWeight: '400',
            color: 'white',
            alignSelf: 'center',
            textAlign: 'center'
        }

    });


    render() {
        return <TouchableOpacity style={this.styles.mainContainer} activeOpacity={0.7} onPress={this.props.onPressEvent}>
            <Text style={this.styles.button}>{this.props.title}</Text>
        </TouchableOpacity>
    }
}

