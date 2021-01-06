/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RandomNumber from './RandomNumber';

class Game extends React.Component {
  
  numbers = Array.from({ length: this.props.numberCount })
    .map(() => 1 + Math.floor(10 * Math.random()));
  
  target = this.numbers.slice(0, this.props.numberCount - 2)
    .reduce((acc, curr) => acc + curr, 0);

  state = {
    selectedIndex: []
  };

  isSelected = (i) => {
    return this.state.selectedIndex.indexOf(i) >= 0;
  };

  selectNumber = (i) => {
    this.setState((prevState) => {
      return {
        selectedIndex: [...prevState.selectedIndex, i]
      }
    })
  };

  gameStatus = () => {
    const sumSelected = this.state.selectedIndex.reduce((acc, curr) => {
      return acc + this.numbers[curr];
    }, 0);
    if (sumSelected < this.target) {
      return 'PLAYING';
    }
    if (sumSelected === this.target) {
      return 'WON';
    }
    if (sumSelected > this.target) {
      return 'LOST';
    }
  }

  render() {
    const gameStatus = this.gameStatus();
    return (
      <>
        <View style={styles.container}>
          <Text style={styles.target}>{this.target}</Text>
          <View style={styles.randomContainer}>
            {this.numbers.map((n, i) =>
              <RandomNumber
                key={i}
                id={i}
                number={n}
                isDisabled={ this.isSelected(i) }
                onPress={ this.selectNumber } />
            )}
          </View>
          <Text>{ gameStatus }</Text>
        </View>
      </>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
    flex: 1,
    paddingTop: 60
  },

  target: {
      fontSize: 40,
      backgroundColor: 'white',
      marginHorizontal: 24,
      lineHeight: 100,
      textAlign: 'center'
  },
  randomContainer: {
    marginTop: 32,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  }
});

export default Game;
