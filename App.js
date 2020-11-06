import React from 'react';
import { ActivityIndicator, IconButton, Provider, Text } from 'react-native-paper'
import { createDrawerNavigator } from 'react-navigation-drawer'
import * as Font from 'expo-font'
import CustomDrawer from './components/CustomDrawer'

import StudentsHomeScreen from './screens/StudentsHomeScreen'
import TeachersHomeScreen from './screens/TeachersHomeScreen'

import LoginScreen from './screens/LoginScreen'
import TestCreator from './screens/TestCreator'
import SettingsScreen from './screens/Settings'

import theme from './components/theme'

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { Icon } from 'react-native-elements';

// console.disableYellowBox = true

export default class App extends React.Component {
  componentDidMount() {
    Font.loadAsync({
      Body: require("./assets/fonts/Montserrat-Regular.ttf"),
      "Body-Bold": require("./assets/fonts/Montserrat-SemiBold.ttf"),
      Head: require("./assets/fonts/Pacifico-Regular.ttf"),
    }).then(() => this.setState({ loaded: true }))
  }
  render() {
    return (
      <Provider theme={theme}>
        {this.state?.loaded ? <AppScreens /> : <ActivityIndicator />}
      </Provider>
    );
  }
}

const StudentNav = createDrawerNavigator({
  home: {
    screen: StudentsHomeScreen,
    navigationOptions: {
      drawerLabel: "Dashboard",
      drawerIcon: ({ focused: f }) => <Icon name="home" color={f ? "green" : "black"} />
    }
  },
  settings: {
    screen: SettingsScreen,
    navigationOptions: {
      drawerLabel: "Settings",
      drawerIcon: ({ focused: f }) => <Icon name="settings" color={f ? "green" : "black"} />
    }
  }
}, {
  contentComponent: CustomDrawer,
  contentOptions: {
    activeTintColor: "green",
  }
})

const TeacherNav = createDrawerNavigator({
  home: {
    screen: TeachersHomeScreen,
    navigationOptions: {
      drawerLabel: "Dashboard",
      drawerIcon: ({ focused: f }) => <Icon name="home" color={f ? "green" : "black"} />
    }
  },
  create: {
    screen: TestCreator,
    navigationOptions: {
      drawerLabel: "Create New Test",
      drawerIcon: ({ focused: f }) => <Icon name="paper" color={f ? "green" : "black"} />
    }
  }
}, {
  contentComponent: CustomDrawer,
  contentOptions: {
    activeTintColor: "green"
  }
})

const AppScreens = createAppContainer(
  createSwitchNavigator({
    Login: { screen: LoginScreen },
    StudentsApp: {
      screen: StudentNav
    },
    TeachersApp: {
      screen: TeacherNav
    }
  })
)