/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import Game from './src/components/Game';

const App: () => React$Node = () => {
  return (
    <Game numberCount="6" />
  );
};

export default App;
