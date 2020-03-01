import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleSheet, ImageBackground, Image, View, Text } from "react-native";
import { WebView } from "react-native-webview"
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

class RecipeDetailComponent extends Component {

    recipe = this.props.navigation.state.params.selectedRecipe;

    componentDidMount() {

    }

    render() {
        return <ImageBackground source={require('../assets/BG.jpeg')} style={styles.container} blurRadius={5}>
            <Image blurRadius={2} source={{ uri: this.recipe.photo }} style={{ height: 200 }} />
            <ScrollView>
                <View style={styles.views}>
                    <Text style={styles.texts}>Recipe Name: {this.recipe.name}</Text>
                </View>
                <View style={styles.views}>
                    <Text style={styles.texts}>Chef: {this.recipe.firstName + ' ' + this.recipe.lastName}</Text>
                </View>
                <View style={styles.views}>
                    <Text style={styles.texts}>Serves: {this.recipe.serves}</Text>
                </View>
                <View style={styles.views}>
                    <Text style={styles.texts}>Preparation Time: {this.recipe.preparationTime}</Text>
                </View>
                <TouchableOpacity style={styles.views} onPress={() => { this.props.navigation.navigate('WebView', {WebUrl: this.recipe.ytUrl}) }}>
                    <Text style={styles.texts}>View Video</Text>
                </TouchableOpacity>
            </ScrollView>
        </ImageBackground>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    youtube: {
        flex: 0.3
    },
    loading: {
        alignSelf: 'center',
        fontSize: 20,
        justifyContent: 'center',
        flex: 1,
        top: 70
    },
    views: {
        margin: 15,
        backgroundColor: 'white',
        borderRadius: 15,
        height: 50,
        justifyContent: 'center'
    },
    texts: {
        left: 20,
        fontSize: 20,
        color: '#219199'
    }
})
const mapStateToProps = (state) => {
    return { recipes: state.recipeReducer.recipes }
}

export default connect(mapStateToProps)(RecipeDetailComponent)