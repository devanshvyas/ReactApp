import React, { Component } from 'react'
import { Button, TouchableOpacity, Image, StyleSheet } from 'react-native';

export default class CustomCheckbox extends Component {
    state = {
        showRemembered : this.props.enable
    }
    renderImage() {
        var imageUrl = this.state.showRemembered ? checkboxSelected : checkbox
        return (
            <Image style={styles.image} source={imageUrl} />
        )
    }

    render() {
        return (
            <TouchableOpacity onPress={this.buttonClicked}>
                {this.renderImage()}
            </TouchableOpacity>
        );
    }

    buttonClicked = () => {
        this.setState({showRemembered: !this.state.showRemembered})
    }
}
const checkbox = require('../assets/checkbox.png')
const checkboxSelected = require('../assets/checkboxSelected.png')
const styles = StyleSheet.create({
    image: {
        flex: 1,
        width: 20,
        height: 20,
        padding: 10,
        margin:5,
    },
})