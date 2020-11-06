import React, { Component } from 'react'
import { View, StyleSheet, FlatList, TouchableNativeFeedback, TouchableOpacity, Alert } from 'react-native'
import { Text, List, Divider, TextInput } from 'react-native-paper'
import firebase from 'firebase'
import Header from '../components/Header'
import db from '../config'
import { createStackNavigator } from 'react-navigation-stack'

import TestScreen from './TestScreen'
import { Icon } from 'react-native-elements'
class StudentsHomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      allTests: [],
      grade: 0,
      typedTestID: ""
    }
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData = () => {
    let grd;
    db.collection("users").where("emailID", "==", firebase.auth().currentUser.email).get().then(snapshot => {
      snapshot.forEach(doc => {
        grd = doc.data().grade;
        this.setState({
          grade: grd
        })
        db.collection("tests").where("grade", "==", grd).where("testType", "==", "public").get().then(snapshot => {
          let allTests = snapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
          }))
          this.setState({
            allTests: allTests
          })
        })
      })
    })

  }
  renderTest = ({ item }) => {
    console.log(item)
    return (
      <List.Item
        title={item.testName}
        description={"Grade " + item.grade + ", Subject: " + item.subject}
        right={(props) => <List.Icon {...props} icon="chevron-right" />}
        onPress={() => { this.goToTest(item.id) }}
      />
    )
  }
  goToTest = (id) => {
    if (!id.trim()) return alert("Enter ID")
    db.collection("tests").doc(id).get().then(doc => {
      if (doc.exists) {
        this.props.navigation.navigate("AttemptTest", { id: id })
      } else {
        Alert.alert("Test Not Found")
        console.log("Test Not Found")
      }
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <Header navigation={this.props.navigation} title="Attempt Tests" />
        <Text style={styles.head}>
          Enter Test ID
        </Text>
        <TextInput value={this.state.typedTestID} onChangeText={text => this.setState({ typedTestID: text })} label="Test ID" mode="outlined" style={{ margin: 10 }} />
        <TouchableOpacity onPress={() => {
          this.goToTest(this.state.typedTestID)
        }}>
          <Text>GO</Text>
        </TouchableOpacity>
        <Divider />
        <Text style={styles.head}>
          All Tests
        </Text>
        <FlatList
          data={this.state.allTests}
          keyExtractor={(item, i) => item.id}
          renderItem={this.renderTest}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  head: {
    fontFamily: "Head",
    fontSize: 26,
    textAlign: "center"
  }
})


export default createStackNavigator({
  HomeScreen: StudentsHomeScreen,
  AttemptTest: TestScreen
}, {
  headerMode: "none"
})