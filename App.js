import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import LoginComponent from './Components/LoginComponent';
import { createAppContainer, getActiveChildNavigationOptions } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import RecipeListComponent from './Components/RecipeListComponent'
import ProfileComponent from './Components/ProfileComponent'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Provider } from 'react-redux';
import store from './Store'
import RecipeDetailComponent from './Components/RecipeDetailComponent';
import MapViewComponent from './Components/MapViewComponent';
import WebViewComponent from './Components/WebViewComponent';
import AddRecipeComponent from './Components/AddRecipeComponent';

const TabBarNav = createBottomTabNavigator(
  {
    List: {
      screen: RecipeListComponent,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Image style={{ height: 20, width: 20, tintColor: tintColor }} source={require('./assets/home.png')}></Image>
        ),
        title: 'Home',

      }
    },
    AddRecipe: {
      screen: AddRecipeComponent,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Image style={{ height: 20, width: 20, tintColor: tintColor }} source={require('./assets/plus.png')}></Image>
        ),
        title: 'Add Recipe'
      }
    },
    Profile: {
      screen: ProfileComponent,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Image style={{ height: 20, width: 20, tintColor: tintColor }} source={require('./assets/user.png')}></Image>
        ),
        title: 'Profile'
      }
    }
  },
  {
    navigationOptions: {
      headerShown: false,
    },
    tabBarOptions: {
      activeTintColor: '#219199',
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
    RecipeDetail: {
      screen: RecipeDetailComponent,
      navigationOptions: {
        title: 'Recipe Detail',
        headerBackTitle:'Home',
        headerTintColor: '#219199'
      }
    },
    MapView: {
      screen: MapViewComponent,
      navigationOptions: {
        headerBackTitle:'Recipe Detail',
        headerTintColor: '#219199'
      }
    },
    WebView: {
      screen: WebViewComponent,
      navigationOptions: {
        title:'Web View',
        headerBackTitle:'Recipe Detail',
        headerTintColor: '#219199'
      }
    }
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
