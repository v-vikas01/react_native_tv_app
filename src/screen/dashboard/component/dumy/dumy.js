// src/screens/HomeScreen.js
import React, {useState} from 'react';
import {View, StyleSheet, TouchableHighlight, FlatList} from 'react-native';
import Card from './card';

const CardsScreen = () => {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const data = ['Card 1', 'Card 2', 'Card 3', 'Card 4'];

  const handleFocus = index => {
    setFocusedIndex(index);
  };

  const renderItem = ({item, index}) => (
    <TouchableHighlight
      onFocus={() => handleFocus(index)}
      onPress={() => handleFocus(index)}
      style={styles.touchable}
      underlayColor="transparent">
      <Card title={item} isFocused={focusedIndex === index} />
    </TouchableHighlight>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        extraData={focusedIndex}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchable: {
    borderRadius: 10,
  },
});

export default CardsScreen;
