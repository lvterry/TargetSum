/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import Game from './src/components/Game';

class App extends React.Component {
  state = {
    gameId: 1
  },

  resetGame = () {
    this.setState((prevState) => {
      return {
        gameId: prevState.gameId + 1
      }
    });
  }

  render() {
    return <Game onPlayAgain="" numberCount="6" initialSeconds={10} />;
  }
}

export default App;
