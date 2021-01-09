/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import RandomNumber from './RandomNumber';
import shuffle from 'lodash.shuffle';

class Game extends React.Component {
  
  numbers = Array.from({ length: this.props.numberCount }).map(() => {
    return 1 + Math.floor(10 * Math.random())
  });
  
  target = this.numbers
    .slice(0, this.props.numberCount - 2)
    .reduce((acc, curr) => acc + curr, 0);
  
  shuffledNumbers = shuffle(this.numbers);

  state = {
    selectedIndex: [],
    remainingSeconds: this.props.initialSeconds,
  };

  isSelected = (i) => {
    return this.state.selectedIndex.indexOf(i) >= 0;
  };

  selectNumber = (i) => {
    this.setState((prevState) => {
      return {
        selectedIndex: [...prevState.selectedIndex, i],
      };
    });
  };

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState((prevState) => {
        return { remainingSeconds: prevState.remainingSeconds - 1 };
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  gameStatus = () => {
    const sumSelected = this.state.selectedIndex.reduce((acc, curr) => {
      return acc + this.shuffledNumbers[curr];
    }, 0);
    let status = 'PLAYING';

    if (this.state.remainingSeconds === 0 || sumSelected > this.target) {
      status = 'LOST';
    }
    if (sumSelected === this.target) {
      status = 'WON';
    }

    if (status !== 'PLAYING') {
      clearInterval(this.timer);
    }

    return status;
  }

  render() {
    const gameStatus = this.gameStatus();
    return (
      <>
        <View style={styles.container}>
          <Text style={[styles.target, styles[`status${gameStatus}`]]}>
            {this.target}
          </Text>
          <Text>{ this.state.remainingSeconds }</Text>
          <View style={styles.randomContainer}>
            {this.shuffledNumbers.map((n, i) =>
              <RandomNumber
                key={i}
                id={i}
                number={n}
                isDisabled={ this.isSelected(i) || gameStatus != 'PLAYING' }
                onPress={ this.selectNumber } />
            )}
          </View>
          <Button style={styles.button} title="Play Again" onPress={() => {}} />
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
  },
  statusWON: {
    backgroundColor: '#73d13d'
  },
  statusLOST: {
    backgroundColor: '#ff4d4f'
  },
  button: {
    marginBottom: 100,
  }
});

export default Game;
