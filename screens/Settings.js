import React from 'react'
import { View, Text } from 'react-native'
import firebase from 'firebase'
import Header from '../components/Header'
import { TextInput, RadioButton } from 'react-native-paper';
import db from '../config'
import { Button } from 'react-native';
import { unmountComponentAtNode } from 'react-dom';

export default class Settings extends React.Component {
  constructor() {
    super();
    this.state = {
      user: firebase.auth().currentUser.email
    }
  }

  componentDidMount() {
    db.collection('users').where('emailID', '==', this.state.user).get().then(snapshot => {
      snapshot.forEach(doc => {
        let user = doc.data()
        this.setState({
          name: user.name,
          type: user.type,
          grade: user.grade
        })
      })
    })
  }

  render() {
    return (
      <View>
        <Header title='Settings' navigation={this.props.navigation} />
        <Text>Settings</Text>
        <TextInput
          label="Name"
          value={this.state.name}
          onChangeText={text => this.setState({ name: text })}
        />

        <TextInput
          label="Class"
          value={this.state.grade}
          onChangeText={text => this.setState({ grade: text })}
        />
        <TextInput
          label="Email ID"
          value={this.state.user}
          onChangeText={text => this.setState({ user: text })}
        />

        <RadioButton value="notification" status={this.state.notification ? "checked" : "unchecked"}>
          I will get Notifications
        </RadioButton>

        <TextInput
          label="PassWord"
          value={this.state.password}
          onChangeText={text => this.setState({ password: text })}
        />
        <Button onPress={this.save}>
          SAVE CHANGES
        </Button>
      </View>

    )
  }
  save = () => {
    console.log("SAVE")
    const { user, password, name, email, notification } = this.state
    console.log("")
  }
}