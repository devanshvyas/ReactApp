import React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'

export default function LoadingIndicator(props) {
    if (props.isLoading) {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.container}>
                    <ActivityIndicator size='large' style={{ flex: 1, width: '100%', height: '100%' }} />
                </View>
            </View>
        );
    } else {
        return (<View></View>)
    }
}

const styles = StyleSheet.create({
    container: {
        width: 70,
        height: 70,
        backgroundColor: 'white',
        zIndex: 1,
        opacity: 0.75,
        borderRadius: 15,
        alignSelf: 'center',
    },
    mainContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 1,
        flex: 1,
        justifyContent: 'center'
    }
})