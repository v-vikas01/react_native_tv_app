// src/components/Card.js
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Card = ({title, isFocused}) => {
  return (
    <View style={[styles.card, isFocused && styles.focusedCard]}>
      <Text style={styles.cardText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 200,
    height: 100,
    margin: 10,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  focusedCard: {
    backgroundColor: '#ff0',
  },
  cardText: {
    fontSize: 18,
  },
});

export default Card;
