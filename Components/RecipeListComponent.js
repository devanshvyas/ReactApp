import React, { Component } from 'react'
import { StyleSheet, View, Alert, FlatList, Text, SafeAreaView, Image, TouchableWithoutFeedback, ScrollView, TouchableOpacity, Dimensions, ImageBackground } from 'react-native'
import LoadingIndicator from './LoadingIndicator'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { onGetRecipes } from "../Actions/actions"


class RecipeListComponent extends Component {
    constructor() {
        super()
        this.state = {
            isLoading: false,
            recipeList: []
        }
    }

    componentDidMount() {
        this.getRecipes()
    }

    getRecipes() {
        this.setState({ isLoading: true })
        console.log('props', this.props);
        
        console.log(this.props.accessToken);
        fetch('http://35.160.197.175:3006/api/v1/recipe/cooking-list',
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + this.props.accessToken
                }
            }).then((response) => { return response.json() })
            .then((responseJSON) => {
                this.setState({ isLoading: false })
                if (responseJSON.error == null) {
                    this.setState({ recipeList: responseJSON })
                    this.props.onGetRecipes(responseJSON);
                } else {
                    Alert.alert('Error', responseJSON.error)
                }
            }).catch((error) => {
                this.setState({ isLoading: false })
                Alert.alert('Error', error)
            })
    }

    getImageUrl(url) {
        console.log(url);

        if (url == null) {
            return require('../assets/noData.png')
        } else {
            return { uri: url }
        }
    }

    render() {
        return (
            <ImageBackground source={require('../assets/BG.jpeg')} style={styles.container} blurRadius={5}>
                <LoadingIndicator isLoading={this.state.isLoading} />
                <SafeAreaView>
                    <ScrollView>
                        <Text style={[styles.commonText, styles.mainTitle, styles.shadow]}>Recipe List</Text>
                        <FlatList
                            data={this.state.recipeList}
                            renderItem={({ item }) => {
                                return <View style={[styles.recipeCell, styles.shadow]}>
                                    <TouchableWithoutFeedback style={styles.container}>
                                        <ImageBackground source={this.getImageUrl(item.photo)} style={styles.recipeImage} imageStyle={{ borderRadius: 10 }}>
                                            <View style={styles.recipeBottomContainer}>
                                            </View>
                                            <View style={styles.recipeUpperContainer}>
                                                <Text style={[styles.commonText, styles.recipeMadeBy]}>Made with ❤️ by 👨🏻‍🍳 {item.firstName + ' ' + item.lastName}</Text>
                                                <Text style={[styles.commonText, styles.recipeMadeBy, { fontSize: 15 }]}>Serves: {item.serves}</Text>
                                                <Text style={[styles.commonText, styles.recipeMadeBy]}>Complexcity level: {item.complexity}</Text>
                                            </View>
                                            <View style={styles.recipeTopContainer}>
                                                <Text style={[styles.commonText, styles.recipeTitle, styles.shadow]}>{item.name}</Text>
                                            </View>
                                        </ImageBackground>
                                    </TouchableWithoutFeedback>
                                </View>
                            }}
                            keyExtractor={(item) => item.recipeId}
                        />
                    </ScrollView>
                </SafeAreaView>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    recipeTopContainer: {
        flex: 0.7
    },
    recipeBottomContainer: {
        backgroundColor: '#219199',
        opacity: 0.4,
        flex: 0.3
    },
    recipeUpperContainer: {
        position: 'absolute',
        // backgroundColor:'green',
        width: '100%',
        height: 85
    },
    recipeCell: {
        margin: 10,
        backgroundColor: '#219199',
        height: 300,
        borderRadius: 10
    },
    recipeTitle: {
        position: 'absolute',
        margin: 10,
        fontSize: 25,
        fontWeight: '400'
    },
    recipeMadeBy: {
        fontSize: 17,
        marginLeft: 10,
        marginTop: 5,
        color: 'white',
        alignSelf: 'flex-start',
        fontWeight: '500'
    },
    recipeImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        opacity: 0.9,
        flexDirection: 'column-reverse',
    },
    recipe: {

    },
    commonText: {
        textAlign: 'center',
        color: 'white',
        shadowColor: 'black',
    },
    mainTitle: {
        fontSize: 30,
        marginBottom: 30,
        marginTop: 15
    },
    shadow: {
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.75,
        shadowRadius: 2,
    }

})

const mapStateToProps = (state) => {
    return { accessToken: state.userReducer.token, recipes: state.userReducer.recipes }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        onGetRecipes
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeListComponent)