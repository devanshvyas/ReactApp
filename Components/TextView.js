import React, { Component } from "react"
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";

export default class TextView extends Component {
    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={this.textViewClicked} activeOpacity={1}>
                <Text style={styles.text}>{this.props.title}</Text>
                <TextInput ref="textView" keyboardType={this.props.keyboardType} secureTextEntry={this.props.isSecured} placeholderTextColor='#219199' style={styles.textView} onChangeText={this.props.textChange}></TextInput>
            </TouchableOpacity>
        );
    }

    textViewClicked = () => {
        this.refs.textView.focus()
    }
}

const styles = StyleSheet.create({
    container: {
        width:'80%',
        height: 40,
        flexDirection:'row',
        borderBottomWidth:0.5,
        borderColor:'#219199',
        borderBottomEndRadius:0.5,
    },
    text: {
        flex: 0.4,
        fontSize: 15,
        padding:2,
        alignSelf: 'flex-end',
        color:'#219199'
    },
    textView:{
        flex:0.6,
        fontSize:15,
        padding:2,
        alignSelf: 'flex-end',
        justifyContent:'flex-end',
        textAlign:'right',
        color:'#219199'
    }
})