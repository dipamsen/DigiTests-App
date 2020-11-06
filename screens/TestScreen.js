import React, { Component } from 'react'
import { Text, StyleSheet, View, FlatList, Alert } from 'react-native'
import Header from '../components/Header'
import Question from '../components/Question'
import db from '../config';
import firebase from 'firebase'
import { ProgressBar, Button } from 'react-native-paper';

export default class TestScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      testID: this.props.navigation.getParam("id"),
      test: null,
      started: false
    }
  }
  componentDidMount() {
    let id = this.state.testID;
    db.collection('tests').doc(id).get().then(doc => {
      this.setState({
        test: doc.data(),
      })
    })
  }
  renderQuestion = ({ item }) => (
    <Question
      question={item.text}
      options={item.options}
      marks={item.marks}
    />
  )
  render() {
    if (this.state.test && !this.state.started) {
      const test = this.state.test;
      return (
        <View>
          <Header navigation={this.props.navigation} title="Attempt Test" />
          <Text> Test </Text>
          <Text>{test.testName}</Text>
          <Text>Grade: {test.grade}</Text>
          <Text>Subject: {test.subject}</Text>
          <Text>Total Marks: {test.totalMarks}</Text>
          <Button mode="contained" onPress={() => this.setState({ started: true })}>Start Test</Button>
        </View>
      )
    } else if (this.state.started) {
      const test = this.state.test;
      return (
        <View>
          <Header navigation={this.props.navigation} title={test.testName} />
          <FlatList
            data={test.questions}
            keyExtractor={(q, i) => i}
            renderItem={this.renderQuestion}
          />
          <Button onPress={this.submitTest}>Submit Test</Button>
        </View>
      )
    } else {
      return <ProgressBar indeterminate />
    }
  }
  submitTest = () => {
    Alert.alert("Alert", "Do you want to submit the test?")
  }
}

const styles = StyleSheet.create({})
