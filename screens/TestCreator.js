import React from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { Button, TextInput, Text, Checkbox } from 'react-native-paper';
import db from '../config'
import firebase from 'firebase'
import Question from '../components/QuestionEditor'
import Clipboard from '@react-native-community/clipboard'

export default class TestCreator extends React.Component {
  constructor() {
    super();
    this.state = {
      testName: "",
      class: "",
      subject: "",
      questions: [{
        text: "",
        options: ["", ""],
        marks: 1,
        correctOption: -1
      }],
      publicTest: false
    }
  }
  componentDidMount() {
    this.getUserData()
  }
  getUserData = () => {
    db.collection("users").where("emailID", "==", firebase.auth().currentUser.email).get().then(snapshot => {
      snapshot.forEach(doc => {
        this.setState({
          class: doc.data().class,
        })
      })
    })
  }
  render() {
    const setter = (index) => {
      return (newQuestion) => {
        let questions = this.state.questions;
        questions[index] = newQuestion
        return this.setState({
          questions: questions
        })
      }
    }

    return (
      <ScrollView contentContainerStyle={{
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 100
      }} style={styles.container}>
        <Text style={styles.heading}>Creating New Test!</Text>
        <TextInput label="Test Name" value={this.state.testName}
          onChangeText={text => this.setState({ testName: text })}
        />
        <TextInput label="Class" value={this.state.class} keyboardType="numeric"
          onChangeText={text => this.setState({ class: text })}
        />
        <TextInput label="Subject" value={this.state.subject}
          onChangeText={text => this.setState({ subject: text })}
        />
        <Text style={styles.qm}>Questions: {this.state.questions.length} {"\t\t\t"} Marks: {this.getMarks()}</Text>
        <Checkbox onPress={() => this.setState({ publicTest: !this.state.publicTest })} status={this.state.publicTest ? 'checked' : 'unchecked'} /><Text>Make this test public</Text>
        {this.state.questions.map((elt, i) => (
          <Question index={i} question={this.state.questions[i]} questionSetter={setter(i)} />
        ))}
        <Button mode="outlined" onPress={this.addNewQuestion}>
          Add another Question
        </Button>
        <Button mode="contained" onPress={this.submit} >
          SUBMIT
        </Button>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
      </ScrollView>
    )
  }
  submit = () => {
    let questions = this.state.questions;
    let totalMarks = this.getMarks();
    let subject = this.state.subject;
    let grade = this.state.class;
    let testName = this.state.testName
    let email = firebase.auth().currentUser.email
    let testType = this.state.publicTest ? "public" : "private"
    db.collection("tests").add({
      questions: questions,
      totalMarks: totalMarks,
      subject: subject,
      grade: +grade,
      teacher: email,
      testName: testName,
      testType: testType
    }).then((doc) => {
      Alert.alert("Test has been created!",
        `Test has been created with ID ${doc.id}`,
        [{
          text: "Copy to Clipboard",
          onPress: () => Clipboard.setString(doc.id)
        }],
        { cancelable: false }
      );
      this.props.navigation.navigate("home")
    })
  }
  addNewQuestion = () => {
    this.setState({
      questions: [...this.state.questions, {
        text: "",
        options: ["", ""],
        marks: 1,
        correctOption: -1
      }]
    })
  }
  getMarks = () => {
    let questions = this.state.questions
    let total = 0;
    for (let q of questions) {
      total += q.marks
    }
    return total
  }
}

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    flex: 1,
    // marginBottom: 30
  },
  heading: {
    fontSize: 24,
    fontFamily: "Head",
    textAlign: "center",
    margin: 10
  },
  qm: {
    fontSize: 18,
    textAlign: "center"
  }
})
