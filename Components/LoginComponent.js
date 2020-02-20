import React, { Component } from "react";
import { View, Text, StyleSheet, Animated, ImageBackground, Easing, Alert } from "react-native";
import CustomButton from './CustomButton';
import TextView from "./TextView";
import CustomCheckbox from "./CustomCheckbox";
import LoadingIndicator from "./LoadingIndicator";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { onGetToken } from "../Actions/actions";


// jm1@example.com
// jay@123
class LoginComponent extends Component {

    constructor() {
        super()
        this.RotateValueHolder = new Animated.Value(0);
        this.state = {
            isRemembered: true,
            email: 'jm1@example.com',
            password: 'jay@123',
            isLoading: false,
            accessToken: null
        }
    }

    componentDidMount() {
        this.StartImageRotateFunction();
    }

    StartImageRotateFunction() {
        this.RotateValueHolder.setValue(0);
        Animated.timing(this.RotateValueHolder, {
            toValue: 1,
            duration: 5000,
            easing: Easing.linear,
        }).start(() => this.StartImageRotateFunction());
    }

    loginPressed = () => {
        const mail = this.state.email;
        const pass = this.state.password;
        if (mail != '') {
            if (pass != '') {
                this.setState({ isLoading: true });
                fetch('http://35.160.197.175:3006/api/v1/user/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        'email': mail,
                        'password': pass
                    })
                }).then((response) => {
                    return response.json()
                }).then((responseJson) => {
                    this.setState({ isLoading: false });
                    if (responseJson.error == null) {
                        this.setState({ accessToken: responseJson.token })
                        this.props.onGetToken(responseJson.token);
                        this.props.navigation.navigate('List')
                    } else {
                        Alert.alert('Error', responseJson.error)
                    }
                }).catch((error) => {
                    this.setState({ isLoading: false });
                })
            } else {
                this.showOKAlert('password')
            }
        } else {
            this.showOKAlert('email')
        }
    }

    showOKAlert(value) {
        Alert.alert('Alert', 'Please enter ' + value)
    }

    render() {
        const RotateData = this.RotateValueHolder.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg'],
        });
        return <ImageBackground source={require('../assets/BG.jpeg')} style={styles.mainContainer}>
            <View style={styles.topContainer}>
                <View style={styles.welcomeTextContainer}>
                    <Text style={[styles.welcomeText, styles.commonText]}>Welcome back!</Text>
                </View>
                <View style={styles.onusTextContainer}>
                    <Animated.Image source={require('../assets/reactLogo.png')} style={[styles.onusLogo, { transform: [{ rotate: RotateData }] }]} />
                    <Text style={[styles.promoText, styles.commonText]}>React App</Text>
                </View>
            </View>

            <View style={styles.middleContainer}>
                <View style={{ marginBottom: 20 }}>
                    <TextView title="Email:" keyboardType="email-address" isSecured={false} textChange={(email) => this.setState({ email })}></TextView>
                </View>

                <View style={styles.passwordContainer}>
                    <TextView title="Password:" isSecured={true} textChange={(password) => { this.setState({ password }) }}></TextView>
                </View>

                <View style={styles.rememberMeContainer}>
                    <CustomCheckbox enable={this.state.isRemembered}></CustomCheckbox>
                    <Text style={styles.rememberMeText}>REMEMBER ME</Text>
                    <View style={{ flex: 0.8 }}></View>
                </View>
            </View>
            <LoadingIndicator isLoading={this.state.isLoading} style={{ flex: 1, zIndex: 1 }}></LoadingIndicator>

            <View style={styles.bottomContainer}>
                <CustomButton title="Login" width="60%" onPressEvent={this.loginPressed}></CustomButton>
            </View>
        </ImageBackground>
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'black',
    },
    topContainer: {
        flex: 0.45,
        marginTop: 30,
    },
    middleContainer: {
        flex: 0.3,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
    bottomContainer: {
        flex: 0.35,
        marginTop: 20,
        alignItems: 'center'
    },
    textView: {
        flex: 0.5,
        flexDirection: 'row',
        width: 50,
    },
    welcomeTextContainer: {
        flex: 0.3,
        justifyContent: 'center'
    },
    onusTextContainer: {
        flex: 0.7,
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: 20
    },
    commonText: {
        textAlign: 'center',
        color: 'white',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.75,
        shadowRadius: 2
    },
    welcomeText: {
        fontSize: 25,
        fontWeight: '300'
    },
    onusLogo: {
        width: 75,
        height: 75,
    },
    promoText: {
        marginTop: 20,
        width: '70%',
        fontSize: 30,
        fontWeight: '300'
    },
    passwordContainer: {
        marginBottom: 25,
    },
    rememberMeContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        width: '80%',
        justifyContent: 'center'
    },
    rememberMeText: {
        flex: 0.5,
        alignSelf: 'center',
        fontSize: 11,
        fontWeight: '500',
        color: 'white',
        marginLeft: 5
    },
    shadow: {
        shadowOffset: { width: 0.5, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
    }
});

const mapStateToProps = (state) => {
    return { token: state.token }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        onGetToken
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent)