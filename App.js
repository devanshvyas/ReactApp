import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import LoginComponent from './Components/LoginComponent';
import { createAppContainer, getActiveChildNavigationOptions } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import RecipeListComponent from './Components/RecipeListComponent'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Provider } from 'react-redux';
import store from './Store'

const TabBarNav = createBottomTabNavigator(
  {
    List: {
      screen: RecipeListComponent,
      navigationOptions: {
        // tabBarIcon: ({ tintColor }) => (
        //   <Image style={{ height: 20, width: 20, tintColor: tintColor }} source={require('./assets/home-icon2.png')}></Image>
        // ),
        title: 'Recipe List',

      }
    },
  },
  {
    navigationOptions: {
      headerShown: false,
    },
    tabBarOptions: {
      activeTintColor: '#521751',
      inactiveTintColor: '#dbacf2f5',
      activeBackgroundColor: '#219199'
    }
  }
)

const Navigator = createAppContainer(
  createStackNavigator({
    TabBarNav,
    Login: {
      screen: LoginComponent,
      navigationOptions: {
        headerShown: false,
      },
    },
    Home: {
      screen: RecipeListComponent,
      navigationOptions: {
        headerLeft: null,
        headerShown: false,
      }
    },
  },
    {
      initialRouteName: 'Login'
    }
  )
)

export default function App() {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'black'
  }
});
