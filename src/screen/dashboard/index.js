import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Animated,
} from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Data, SliderImages} from './component/data';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import useInactivityHandler from './component/inactivehook';

const Dashboard = () => {
  const [data, setData] = useState(Data);
  const navigation = useNavigation();
  const {resetTimer} = useInactivityHandler(30000);

  const flatListRefs = {
    daily: useRef(null),
    monthly: useRef(null),
    yearly: useRef(null),
    announcement: useRef(null),
    whats_new: useRef(null),
  };

  const scrollIndex = useRef({
    daily: 0,
    monthly: 0,
    yearly: 0,
    announcement: 0,
    whats_new: 0,
  });

  useEffect(() => {
    const intervals = {};

    const createAutoScroll = (category, length) => {
      intervals[category] = setInterval(() => {
        const flatList = flatListRefs[category].current;
        if (flatList) {
          scrollIndex.current[category] =
            (scrollIndex.current[category] + 1) % length;
          flatList.scrollToIndex({
            index: scrollIndex.current[category],
            animated: true,
          });
        }
      }, 3000);
    };

    Object.keys(flatListRefs).forEach(category => {
      createAutoScroll(
        category,
        data.filter(item => item.category === category).length,
      );
    });

    return () => {
      Object.values(intervals).forEach(clearInterval);
    };
  }, [data]);

  useFocusEffect(
    React.useCallback(() => {
      resetTimer(30000);
    }, []),
  );

  const capitalizeWords = str => {
    return str.replace(/\b\w/g, char => char.toUpperCase());
  };

  const renderCategory = category => {
    const filteredData = data.filter(item => item.category === category);

    return (
      <View style={styles.categoryContainer}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'center',
            marginHorizontal: wp('4%'),
          }}>
          <Text style={styles.categoryTitle}>
            {capitalizeWords(category.replace('_', ' '))}
          </Text>
          <View style={styles.divider} />
        </View>

        <FlatList
          ref={flatListRefs[category]}
          data={filteredData}
          renderItem={({item}) => (
            <AnimatedCard
              item={item}
              navigation={navigation}
              resetTimer={resetTimer}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          contentContainerStyle={{
            paddingHorizontal: wp('2%'),
            paddingVertical: hp('1%'),
            marginHorizontal: wp('2%'),
          }}
          onTouchStart={() => resetTimer(30000)}
          onScrollBeginDrag={() => resetTimer(30000)}
          onMomentumScrollBegin={() => resetTimer(30000)}
        />
      </View>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={() => resetTimer(30000)}>
      <SafeAreaView style={styles.container}>
        <ScrollView
          nestedScrollEnabled={true}
          scrollEnabled={true}
          onScroll={() => resetTimer(30000)}
          scrollEventThrottle={16}>
          <View style={styles.slide}>
            <SwiperFlatList
              autoplay
              autoplayDelay={3}
              autoplayLoop
              showPagination={true}
              paginationActiveColor="#000"
              paginationDefaultColor="#ecf0f1"
              paginationStyleItem={{
                height: 8,
                width: 8,
                borderRadius: 8,
                top: 10,
              }}
              autoplayLoopKeepAnimation={true}
              data={SliderImages}
              renderItem={({item}) => (
                <View style={styles.slideContainer}>
                  <Image source={{uri: item}} style={styles.sliderImage} />
                </View>
              )}
              onTouchStart={() => resetTimer(30000)}
            />
          </View>
          {renderCategory('daily')}
          {renderCategory('monthly')}
          {renderCategory('yearly')}
          {renderCategory('announcement')}
          {renderCategory('whats_new')}
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const AnimatedCard = ({item, navigation, resetTimer}) => {
  const scale = useRef(new Animated.Value(1)).current;
  const elevation = useRef(new Animated.Value(2)).current;

  const onPressIn = () => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1.05,
        useNativeDriver: false,
      }),
      Animated.timing(elevation, {
        toValue: 8,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const onPressOut = () => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: false,
      }),
      Animated.timing(elevation, {
        toValue: 2,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  };

  return (
    <Animated.View
      style={[
        styles.card,
        {
          transform: [{scale}],
          elevation: elevation,
        },
      ]}>
      <TouchableHighlight
        activeOpacity={1}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={() => {
          resetTimer(60000);
          navigation.navigate('detailsScreen', {item: item});
        }}>
        <Image source={{uri: item.image[0]}} style={styles.cardImage} />
      </TouchableHighlight>
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.cardDescription} numberOfLines={2}>
        {item.description}
      </Text>
    </Animated.View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  slide: {
    height: hp('50%'),
    width: wp('100%'),
  },
  slideContainer: {
    height: hp('50%'),
    width: wp('100%'),
  },
  sliderImage: {
    width: wp('100%'),
    height: hp('50%'),
    resizeMode: 'cover',
  },
  categoryContainer: {
    marginVertical: hp('3%'),
  },
  categoryTitle: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
    fontFamily: 'Outfit-Medium',
    paddingRight: wp('2%'),
    // textDecorationLine: 'underline',
  },
  card: {
    width: wp('27%'),
    marginRight: wp('2%'),
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
  },
  cardImage: {
    width: '100%',
    height: hp('20%'),
    resizeMode: 'cover',
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '500',
    fontFamily: 'Outfit-Medium',
    margin: 10,
    color: '#2C3E50',
  },

  cardDescription: {
    fontSize: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    color: '#7F8C8D',
    fontWeight: '400',
    fontFamily: 'Outfit-Regular',
  },
  divider: {
    borderTopWidth: 0.25,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
    flex: 1,
  },
});
