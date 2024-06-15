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
  Animated,
  TouchableHighlight,
} from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Data, SliderImages} from './component/data';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import useInactivityHandler from './component/inactivehook';
import {
  SpatialNavigation,
  SpatialNavigationFocusableView,
  SpatialNavigationNode,
  SpatialNavigationRoot,
  SpatialNavigationScrollView,
  SpatialNavigationVirtualizedGrid,
} from 'react-tv-space-navigation';
import KeyEvent from 'react-native-keyevent';

const Dashboard = () => {
  const [data, setData] = useState(Data);
  const navigation = useNavigation();
  const {resetTimer} = useInactivityHandler(30000);
  const [focusedCard, setFocusedCard] = useState(null);

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

  // useEffect(() => {
  //   const intervals = {};

  //   const createAutoScroll = (category, length) => {
  //     intervals[category] = setInterval(() => {
  //       const flatList = flatListRefs[category].current;
  //       if (flatList) {
  //         scrollIndex.current[category] =
  //           (scrollIndex.current[category] + 1) % length;
  //         flatList.scrollToIndex({
  //           index: scrollIndex.current[category],
  //           animated: true,
  //         });
  //       }
  //     }, 3000);
  //   };

  //   Object.keys(flatListRefs).forEach(category => {
  //     createAutoScroll(
  //       category,
  //       data.filter(item => item.category === category).length,
  //     );
  //   });

  //   return () => {
  //     Object.values(intervals).forEach(clearInterval);
  //   };
  // }, [data]);

  useFocusEffect(
    React.useCallback(() => {
      resetTimer(30000);
    }, []),
  );

  // useEffect(() => {
  //   KeyEvent.onKeyDownListener(keyEvent => {
  //     handleKeyEvent(keyEvent.keyCode);
  //     console.log('red');
  //   });

  //   return () => {
  //     KeyEvent.removeKeyDownListener();
  //   };
  // }, []);

  // const handleKeyEvent = keyCode => {
  //   switch (keyCode) {
  //     case 22:
  //       SpatialNavigation.moveRight();
  //       break;
  //     case 21:
  //       SpatialNavigation.moveLeft();
  //       break;
  //     case 19:
  //       SpatialNavigation.moveUp();
  //       break;
  //     case 20:
  //       SpatialNavigation.moveDown();
  //       break;
  //     case 23:
  //       SpatialNavigation.enter();
  //       break;
  //     default:
  //       break;
  //   }
  // };

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
          renderItem={({item, index}) => (
            <AnimatedCard
              item={item}
              navigation={navigation}
              resetTimer={resetTimer}
              isFocused={focusedCard === `${category}-${index}`}
              onFocus={() => setFocusedCard(`${category}-${index}`)}
              onBlur={() => setFocusedCard(null)}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          contentContainerStyle={{
            paddingHorizontal: wp('2%'),
            paddingVertical: hp('2%'),
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
    <SafeAreaView style={styles.container}>
      <ScrollView
        nestedScrollEnabled={true}
        scrollEnabled={true}
        onScroll={() => resetTimer(30000)}
        hasTVPreferredFocus={true}
        isTVSelectable={true}
        scrollEventThrottle={16}>
        <SpatialNavigationRoot>
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
        </SpatialNavigationRoot>
      </ScrollView>
    </SafeAreaView>
  );
};

// const AnimatedCard = ({
//   item,
//   navigation,
//   resetTimer,
//   isFocused,
//   onFocus,
//   onBlur,
// }) => {
//   const scale = useRef(new Animated.Value(1)).current;

//   useEffect(() => {
//     if (isFocused) {
//       Animated.spring(scale, {
//         toValue: 1.05,
//         useNativeDriver: true,
//       }).start();
//     } else {
//       Animated.spring(scale, {
//         toValue: 1,
//         useNativeDriver: true,
//       }).start();
//     }
//   }, [isFocused]);

//   return (
//     <SpatialNavigationNode isFocusable={true}>
//       {({isFocused}) => (
//         <TouchableOpacity
//           activeOpacity={1}
//           onFocus={onFocus}
//           onBlur={onBlur}
//           onPress={() => {
//             resetTimer(60000);
//             navigation.navigate('detailsScreen', {item: item});
//             console.log('press');
//           }}>
//           <Animated.View
//             style={[
//               styles.card,
//               {
//                 transform: [{scale}],
//                 borderColor: isFocused ? 'red' : '#FFFFFF',
//                 borderWidth: isFocused ? 2 : 1, // Adjust border width as needed
//               },
//             ]}>
//             <Image source={{uri: item.image[0]}} style={styles.cardImage} />
//             <Text style={styles.cardTitle}>{item.name}</Text>
//             <Text style={styles.cardDescription} numberOfLines={2}>
//               {item.description}
//             </Text>
//           </Animated.View>
//         </TouchableOpacity>
//       )}
//     </SpatialNavigationNode>
//   );
// };

const AnimatedCard = ({item, navigation, resetTimer}) => {
  const scale = useRef(new Animated.Value(1)).current;
  const elevation = useRef(new Animated.Value(1)).current;

  const touchableHighlightRef = useRef(null);

  const onPressIn = () => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1.05,
        useNativeDriver: false,
      }),
      Animated.timing(elevation, {
        toValue: 3,
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
      <TouchableOpacity
        ref={touchableHighlightRef}
        activeOpacity={1}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        // isFocused={focusedCard === `${category}-${index}`}
        // onFocus={() => setFocusedCard(`${category}-${index}`)}
        // onBlur={() => setFocusedCard(null)}
        onFocus={onPressIn}
        onBlur={onPressIn}
        onPress={() => {
          resetTimer(60000);
          navigation.navigate('detailsScreen', {item: item});
        }}>
        <Image source={{uri: item.image[0]}} style={styles.cardImage} />
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardDescription} numberOfLines={2}>
          {item.description}
        </Text>
      </TouchableOpacity>
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
  },
  card: {
    width: wp('27%'),
    marginRight: wp('2%'),
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
    borderColor: '#FFFFFF',
    borderWidth: 1,
  },
  cardImage: {
    width: '100%',
    height: hp('20%'),
    resizeMode: 'cover',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
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

// import React, {useRef, useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   Image,
//   ScrollView,
//   FlatList,
//   TouchableHighlight,
//   Animated,
// } from 'react-native';
// import SwiperFlatList from 'react-native-swiper-flatlist';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import {Data, SliderImages} from './component/data';
// import {useNavigation, useFocusEffect} from '@react-navigation/native';
// import useInactivityHandler from './component/inactivehook';

// const Dashboard = () => {
//   const [data, setData] = useState(Data);
//   const navigation = useNavigation();
//   const {resetTimer} = useInactivityHandler(30000);
//   const [focusedCard, setFocusedCard] = useState(null);

//   const flatListRefs = {
//     daily: useRef(null),
//     monthly: useRef(null),
//     yearly: useRef(null),
//     announcement: useRef(null),
//     whats_new: useRef(null),
//   };

//   const scrollIndex = useRef({
//     daily: 0,
//     monthly: 0,
//     yearly: 0,
//     announcement: 0,
//     whats_new: 0,
//   });

//   useEffect(() => {
//     const intervals = {};

//     const createAutoScroll = (category, length) => {
//       intervals[category] = setInterval(() => {
//         const flatList = flatListRefs[category].current;
//         if (flatList) {
//           scrollIndex.current[category] =
//             (scrollIndex.current[category] + 1) % length;
//           flatList.scrollToIndex({
//             index: scrollIndex.current[category],
//             animated: true,
//           });
//         }
//       }, 3000);
//     };

//     Object.keys(flatListRefs).forEach(category => {
//       createAutoScroll(
//         category,
//         data.filter(item => item.category === category).length,
//       );
//     });

//     return () => {
//       Object.values(intervals).forEach(clearInterval);
//     };
//   }, [data]);

//   useFocusEffect(
//     React.useCallback(() => {
//       resetTimer(30000);
//     }, []),
//   );

//   const capitalizeWords = str => {
//     return str.replace(/\b\w/g, char => char.toUpperCase());
//   };

//   const renderCategory = (category, nextCategoryUp, nextCategoryDown) => {
//     const filteredData = data.filter(item => item.category === category);

//     return (
//       <View style={styles.categoryContainer}>
//         <View
//           style={{
//             flexDirection: 'row',
//             alignItems: 'center',
//             alignContent: 'center',
//             justifyContent: 'center',
//             marginHorizontal: wp('4%'),
//           }}>
//           <Text style={styles.categoryTitle}>
//             {capitalizeWords(category.replace('_', ' '))}
//           </Text>
//           <View style={styles.divider} />
//         </View>

//         <FlatList
//           ref={flatListRefs[category]}
//           data={filteredData}
//           renderItem={({item, index}) => (
//             <AnimatedCard
//               item={item}
//               navigation={navigation}
//               resetTimer={resetTimer}
//               isFocused={focusedCard === `${category}-${index}`}
//               onFocus={() => setFocusedCard(`${category}-${index}`)}
//               onBlur={() => setFocusedCard(null)}
//               // nextFocusUp={nextCategoryUp}
//               // nextFocusDown={nextCategoryDown}
//               // nextFocusLeft={
//               //   index === 0
//               //     ? 'daily-0' // Assume the first card of 'daily' is always the initial focus
//               //     : `${category}-${index - 1}`
//               // }
//               // nextFocusRight={
//               //   index === filteredData.length - 1
//               //     ? null
//               //     : `${category}-${index + 1}`
//               // }
//             />
//           )}
//           keyExtractor={(item, index) => index.toString()}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           pagingEnabled
//           contentContainerStyle={{
//             paddingHorizontal: wp('2%'),
//             paddingVertical: hp('1%'),
//             marginHorizontal: wp('2%'),
//           }}
//           onTouchStart={() => resetTimer(30000)}
//           onScrollBeginDrag={() => resetTimer(30000)}
//           onMomentumScrollBegin={() => resetTimer(30000)}
//         />
//       </View>
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView
//         nestedScrollEnabled={true}
//         scrollEnabled={true}
//         onScroll={() => resetTimer(30000)}
//         scrollEventThrottle={16}>
//         <View style={styles.slide}>
//           <SwiperFlatList
//             autoplay
//             autoplayDelay={3}
//             autoplayLoop
//             showPagination={true}
//             paginationActiveColor="#000"
//             paginationDefaultColor="#ecf0f1"
//             paginationStyleItem={{
//               height: 8,
//               width: 8,
//               borderRadius: 8,
//               top: 10,
//             }}
//             autoplayLoopKeepAnimation={true}
//             data={SliderImages}
//             renderItem={({item}) => (
//               <View style={styles.slideContainer}>
//                 <Image source={{uri: item}} style={styles.sliderImage} />
//               </View>
//             )}
//             onTouchStart={() => resetTimer(30000)}
//           />
//         </View>
//         {renderCategory('daily', null, 'monthly-0')}
//         {renderCategory('monthly', 'daily-0', 'yearly-0')}
//         {renderCategory('yearly', 'monthly-0', 'announcement-0')}
//         {renderCategory('announcement', 'yearly-0', 'whats_new-0')}
//         {renderCategory('whats_new', 'announcement-0', null)}
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const AnimatedCard = ({
//   item,
//   navigation,
//   resetTimer,
//   isFocused,
//   onFocus,
//   onBlur,
//   nextFocusUp,
//   nextFocusDown,
//   nextFocusLeft,
//   nextFocusRight,
// }) => {
//   const scale = useRef(new Animated.Value(1)).current;
//   const elevation = useRef(new Animated.Value(1)).current;

//   useEffect(() => {
//     if (isFocused) {
//       Animated.spring(scale, {
//         toValue: 1.05,
//         useNativeDriver: false,
//       }).start();
//       Animated.timing(elevation, {
//         toValue: 3,
//         duration: 200,
//         useNativeDriver: false,
//       }).start();
//     } else {
//       Animated.spring(scale, {
//         toValue: 1,
//         useNativeDriver: false,
//       }).start();
//       Animated.timing(elevation, {
//         toValue: 1,
//         duration: 200,
//         useNativeDriver: false,
//       }).start();
//     }
//   }, [isFocused]);

//   return (
//     <TouchableHighlight
//       style={{borderRadius: 10}}
//       underlayColor="#DDDDDD"
//       onFocus={onFocus}
//       onBlur={onBlur}
//       onPress={() => {
//         resetTimer(60000);
//         navigation.navigate('detailsScreen', {item: item});
//       }}
//       nextFocusUp={nextFocusUp}
//       nextFocusDown={nextFocusDown}
//       nextFocusLeft={nextFocusLeft}
//       nextFocusRight={nextFocusRight}>
//       <Animated.View
//         style={[
//           styles.card,
//           {
//             transform: [{scale}],
//             elevation: elevation,
//             borderColor: isFocused ? 'red' : '#FFFFFF',
//             borderWidth: isFocused ? 2 : 1,
//           },
//         ]}>
//         <Image source={{uri: item.image[0]}} style={styles.cardImage} />
//         <Text style={styles.cardTitle}>{item.name}</Text>
//         <Text style={styles.cardDescription} numberOfLines={2}>
//           {item.description}
//         </Text>
//       </Animated.View>
//     </TouchableHighlight>
//   );
// };

// export default Dashboard;

// const styles = StyleSheet.create({
//   container: {
//     width: wp('100%'),
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   slide: {
//     height: hp('50%'),
//     width: wp('100%'),
//   },
//   slideContainer: {
//     height: hp('50%'),
//     width: wp('100%'),
//   },
//   sliderImage: {
//     width: wp('100%'),
//     height: hp('50%'),
//     resizeMode: 'cover',
//   },
//   categoryContainer: {
//     marginVertical: hp('3%'),
//   },
//   categoryTitle: {
//     fontSize: 16,
//     color: '#000',
//     fontWeight: '600',
//     fontFamily: 'Outfit-Medium',
//     paddingRight: wp('2%'),
//   },
//   card: {
//     width: wp('27%'),
//     marginRight: wp('2%'),
//     backgroundColor: '#FFFFFF',
//     borderRadius: 10,
//     overflow: 'hidden',
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.8,
//     shadowRadius: 2,
//     elevation: 2,
//     borderColor: '#FFFFFF',
//     borderWidth: 1,
//   },
//   cardImage: {
//     width: '100%',
//     height: hp('20%'),
//     resizeMode: 'cover',
//     borderTopLeftRadius: 10,
//     borderTopRightRadius: 10,
//   },
//   cardTitle: {
//     fontSize: 13,
//     fontWeight: '500',
//     fontFamily: 'Outfit-Medium',
//     margin: 10,
//     color: '#2C3E50',
//   },
//   cardDescription: {
//     fontSize: 10,
//     marginHorizontal: 10,
//     marginBottom: 10,
//     color: '#7F8C8D',
//     fontWeight: '400',
//     fontFamily: 'Outfit-Regular',
//   },
//   divider: {
//     borderTopWidth: 0.25,
//     borderTopColor: '#ddd',
//     backgroundColor: '#fff',
//     flex: 1,
//   },
// });
