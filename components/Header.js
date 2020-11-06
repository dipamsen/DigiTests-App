import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { Appbar, Menu } from 'react-native-paper'

export default class MyHeader extends Component {
  constructor() {
    super()
    this.state = {

    }
  }

  render() {
    return (
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={this.props.navigation.openDrawer} />
        <Appbar.Content title={this.props.title} titleStyle={{ fontFamily: "Head", fontSize: 28, textAlign: 'center' }} />
        <Menu anchor={
          <Appbar.Action icon="dots-vertical" />
        } />
      </Appbar.Header>
    )
  }
}

const styles = StyleSheet.create({})
