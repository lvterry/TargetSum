import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

class RandomNumber extends React.Component {

  handlePress = () =>
    this.props.onPress(this.props.id)

  render() {
    return (
        <TouchableOpacity onPress={this.handlePress}>
            <Text style={[styles.random, this.props.isDisabled && styles.disabled]}>{this.props.number}</Text>
        </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  random: {
    fontSize: 24,
    backgroundColor: 'white',
    lineHeight: 60,
    margin: 24,
    width: 140,
    textAlign: 'center'
  },
  disabled: {
    opacity: 0.3
  }
});

export default RandomNumber;