import React, { Component } from 'react'
import { Image, View } from 'react-native'
import { Text, Button } from 'react-native-paper'
import { DrawerItems } from 'react-navigation-drawer'
import firebase from 'firebase'
import db from '../config'
export default class CustomDrawer extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      type: ""
    }
  }
  componentDidMount() {
    this.getUserData()
  }
  getUserData = () => {
    db.collection("users").where("emailID", "==", firebase.auth().currentUser.email).get().then(snapshot => {
      snapshot.forEach(doc => {
        this.setState({
          name: doc.data().name,
          type: doc.data().type
        })
      })
    })
  }
  render() {
    return (
      <View {...{ style }}>
        <Image style={{
          width: 140, height: 140, margin: 10,
          alignSelf: "center"
        }} source={require("../assets/logo.png")} />
        <Text style={{ fontFamily: 'Head', fontSize: 32, textAlign: "center" }}>DigiTests</Text>
        <Text style={{ textAlign: 'center', fontSize: 20 }}>{this.state.name}</Text>
        <DrawerItems {...this.props} />
        <Button
          mode="contained"
          onPress={() => {
            firebase.auth().signOut();
            this.props.navigation.navigate("Login")
          }}>Sign Out</Button>
      </View>
    )
  }
}
const style = {
  marginVertical: 20,
}