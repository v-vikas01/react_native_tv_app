import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import Snackbar from 'react-native-snackbar';

const showSnackbar = ({
  text,
  duration = Snackbar.LENGTH_SHORT,
  backgroundColor = '#FF0000',
  textColor = '#FFFFFF',
}) => {
  Snackbar.show({
    text,
    duration,
    backgroundColor,
    textColor,
  });
};

export default showSnackbar;

export const LoadingIndicator = ({visible}) => {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#6060EF" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
});
