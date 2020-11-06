import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, Text } from 'react-native-paper'


export default class TeachersHomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>
          Teachers
        </Text>
        <Button onPress={() => {
          this.props.navigation.toggleDrawer()
        }}>Hello</Button>
      </View>
    )
  }
}
// DyTSvu103sF2DInDZNqN


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "center"
  }
})
