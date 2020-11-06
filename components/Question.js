import React from 'react';
import { View } from 'react-native'
import { Card } from 'react-native-elements'
import { Text, RadioButton } from 'react-native-paper'

export default class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: -1
    }
  }
  render() {
    return (
      <Card>
        <Text style={{
          fontWeight: "bold"
        }}>{this.props.question}</Text>
        <Text style={{ textAlign: "right" }}>{this.props.marks}</Text>
        {this.props.options.map((val, i) => (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <RadioButton onPress={() => this.setState({ selected: i })} value={i} status={this.state.selected == i ? "checked" : "unchecked"} />
            <Text>{val}</Text>
          </View>
        ))}
      </Card>
    )
  }
}