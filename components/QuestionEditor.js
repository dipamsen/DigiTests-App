import React, { Component } from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import { Card, Icon } from 'react-native-elements';
import { RadioButton } from 'react-native-paper';

const maxOptions = 5;

export default class Question extends Component {
  constructor(props) {
    super(props);
    this.setter = this.props.questionSetter;
  }
  render() {
    return (
      <Card style={styles.container}>
        <View style={{ alignItems: "flex-end", width: "100%" }}>
          {this.props.question.options.length < 5 ?
            <Icon style={{ justifyContent: "flex-end" }} name="add" onPress={() => {
              let q = this.props.question;
              q.options.push("")
              this.setter(q)
            }} />
            : null}
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <TextInput style={styles.question} placeholder={"Question " + (this.props.index + 1)} value={this.props.question.text} onChangeText={text => {
            let q = this.props.question;
            q.text = text;
            this.setter(q)
          }} />
          <TextInput style={styles.mark}
            value={this.props.question.marks.toString()}
            placeholder="Marks"
            keyboardType="numeric"
            onChangeText={text => {
              let q = this.props.question;
              q.marks = +text;
              this.setter(q)
            }} />
        </View>
        {this.props.question.options.map((opt, i) => (
          <View style={{ flexDirection: 'row' }}>
            <RadioButton
              status={this.props.question.correctOption == i ? "checked" : "unchecked"}
              onPress={() => {
                let q = this.props.question;
                q.correctOption = i;
                this.setter(q)
              }} />
            <TextInput
              style={styles.option}
              placeholder={`(${String.fromCharCode(i + 65)}) Option`}
              value={opt}
              onChangeText={text => {
                let q = this.props.question;
                q.options[i] = text
                this.setter(q)
              }}
            />
          </View>
        ))}
      </Card>
    )
  }
}
const styles = StyleSheet.create({
  question: {
    borderBottomWidth: 1,
    fontSize: 20,
    width: '80%',
    fontFamily: 'Body'
  },
  option: {
    fontSize: 16,
    fontFamily: "Body",
    width: "100%"
  },
  mark: {
    fontSize: 18
  },
  container: {
    alignItems: 'center'
  }
})