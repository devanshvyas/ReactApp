import React, { Component } from 'react';
import { ImageBackground, Image, Text, StyleSheet, View, Alert } from "react-native";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import * as ImagePicker from 'expo-image-picker'
import TextView from './TextView';
import CustomButton from './CustomButton';
import { connect } from "react-redux";
import LoadingIndicator from "./LoadingIndicator";


class AddRecipeComponent extends Component {
    constructor() {
        super()
        this.state = {
            image: null,
            isLoading: false,
            recipeName: '',
            preparationTime: '',
            serves: 1,
            complexity: 'medium',
            youtubeURL: 'https://youtube.com'
        }
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

    renderImage() {
        var imageUrl = this.state.image ?? require('../assets/profile.png')
        return (
            <Image style={styles.image} source={imageUrl} />
        )
    }

    addRecipe = () => {
        this.setState({ isLoading: true });
        fetch('http://35.160.197.175:3006/api/v1/recipe/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            },
            body: JSON.stringify({
                'name': this.state.recipeName,
                'preparationTime': this.state.preparationTime,
                'serves': this.state.serves,
                'complexity': this.state.complexity,
                'ytUrl': this.state.youtubeURL,
            })
        }).then((response) => {
            return response.json()
        }).then((responseJson) => {
            console.log(responseJson);
            if (responseJson.error == null) {
                this.uploadImage(responseJson.id)
            } else {
                this.setState({ isLoading: false });
                Alert.alert('Error', responseJson.error)
            }
        }).catch((error) => {
            this.setState({ isLoading: false });
        })
    }

    uploadImage = (recipeId) => {
        const photo = {
            uri: this.state.image.uri,
            type: 'image/jpeg',
            name: 'photo.jpg',
        };
        let formData = new FormData();
        formData.append('photo', photo);
        formData.append('recipeId', recipeId)

        fetch('http://35.160.197.175:3006/api/v1/recipe/add-update-recipe-photo', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.props.token}`,
                'Content-Type': 'application/json',
            },
            body: formData
        }).then((responseJson) => {
            this.setState({ isLoading: false });
            Alert.alert('Success', 'Recipe Added!', [
                {
                    text: 'Okay',
                    style: 'cancel',
                    onPress: () => {
                        this.props.navigation.navigate('Home');
                    }
                }
            ])
        }).catch((error) => {
            this.setState({ isLoading: false })
        });
    }

    render() {
        return <ImageBackground source={require('../assets/BG.jpeg')} style={styles.mainContainer} blurRadius={5}>
            <View style={styles.imageContainer}>
                {this.renderImage()}
                <TouchableOpacity onPress={this.onEditPress}>
                    <Text style={styles.editText}>Add Image</Text>
                </TouchableOpacity>
            </View>
            <LoadingIndicator isLoading={this.state.isLoading} style={{ flex: 1, zIndex: 1 }}></LoadingIndicator>
            <ScrollView style={styles.mainContainer}>
                <View style={styles.textViewContainer}>
                    <TextView style={styles.textView} title="Recipe Name:" textChange={(recipeName) => { this.setState({ recipeName }) }} />
                </View>
                <View style={styles.textViewContainer}>
                    <TextView style={styles.textView} title="Preparation Time:" textChange={(preparationTime) => { this.setState({ preparationTime }) }} />
                </View>
                <View style={styles.textViewContainer}>
                    <TextView style={styles.textView} title="Serves:" textChange={(serves) => { this.setState({ serves }) }} />
                </View>
                <View style={styles.textViewContainer}>
                    <TextView style={styles.textView} title="Complexity:" textChange={(complexity) => { this.setState({ complexity }) }} />
                </View>
                <View style={styles.textViewContainer}>
                    <TextView style={styles.textView} title="Youtube URL:" textChange={(youtubeURL) => { this.setState({ youtubeURL }) }} />
                </View>
                <View style={{ alignItems: 'center', top: 50 }}>
                    <CustomButton title="Add Recipe" width="60%" onPressEvent={this.addRecipe}></CustomButton>
                </View>
            </ScrollView>
        </ImageBackground>
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    editText: {
        top: 20,
        flex: 1,
        fontSize: 20,
        fontStyle: "normal",
        textDecorationLine: "underline",
        textAlign: "center",
        color: '#219199'
    },
    imageContainer: {
        top: 70,
        flex: 0.5,
        alignItems: 'center',
    },
    image: {
        top: 10,
        height: 100,
        width: 100,
        borderRadius: 50,
        borderWidth: 1,
    },
    textViewContainer: {
        alignItems: 'center',
        marginBottom: 20
    },
    textView: {
        paddingBottom: 50
    }

})

const mapStateToProps = (state) => {
    return { token: state.userReducer.token }
}

export default connect(mapStateToProps)(AddRecipeComponent)