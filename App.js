import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Routes from './src/routes';
import {configureRemoteControl} from './src/component/controler';

configureRemoteControl();

const App = () => {
  return <Routes />;
};

export default App;
