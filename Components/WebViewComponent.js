import React, { Component } from 'react';
import { View } from 'react-native';
import WebView from 'react-native-webview';


export default class WebViewComponent extends Component {
    webUrl = "https://www.youtube.com"
    render() {
        console.log('web', this.props.navigation.state.params);
        return <View style={{ flex: 1 }}>
            <WebView style={{flex: 1}} source={{ uri: this.props.navigation.state.params.WebUrl ?? this.webUrl}}></WebView>
        </View>
    }
}