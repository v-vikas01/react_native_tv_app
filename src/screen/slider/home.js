// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Image,
//   StyleSheet,
//   Text,
//   SafeAreaView,
//   ActivityIndicator,
//   BackHandler,
// } from 'react-native';
// import SwiperFlatList from 'react-native-swiper-flatlist';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import showSnackbar from '../../component/helper';
// import {useNetInfo} from '@react-native-community/netinfo';
// import {useFocusEffect, useNavigation} from '@react-navigation/native';
// import useInactivityHandler from '../dashboard/component/inactivehook';
// import {SliderImages} from '../dashboard/component/data';

// const SliderScreen = () => {
//   const [data, setData] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const {isConnected} = useNetInfo();

//   const navigation = useNavigation();
//   const {resetTimer} = useInactivityHandler();

//   useFocusEffect(
//     React.useCallback(() => {
//       const onBackPress = () => {
//         resetTimer(60000);
//         return false;
//       };

//       BackHandler.addEventListener('hardwareBackPress', onBackPress);

//       return () => {
//         return BackHandler.removeEventListener(
//           'hardwareBackPress',
//           onBackPress,
//         );
//       };
//     }, []),
//   );

//   useEffect(() => {
//     const fetchData = async () => {
//       if (isConnected) {
//         setError(null);
//         setLoading(true);
//         try {
//           const outletlocation = await AsyncStorage.getItem('outletlocation');
//           if (outletlocation) {
//             const response = await axios.get(
//               `https://ea42-45-112-136-250.ngrok-free.app/api/outletlocation/${outletlocation}`,
//             );
//             const result = response.data;
//             console.log(result);
//             if (response.status === 200) {
//               setData(result.outletlocation);
//               setLoading(false);
//             } else {
//               setError('Failed to fetch data');
//               showSnackbar({text: result.message});
//               setLoading(false);
//             }
//           } else {
//             setError('No outlet location found');
//             showSnackbar({text: 'No outlet location found'});
//             setLoading(false);
//           }
//         } catch (error) {
//           console.error(error);
//           showSnackbar({text: `An error occurred ${error}`});
//           setLoading(false);
//         }
//         return;
//       } else {
//         setError('No internet connection. Please try again later.');
//         // showSnackbar({
//         //   text: 'No internet connection. Please try again later.',
//         // });
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [isConnected]);

//   if (loading) {
//     return (
//       <SafeAreaView style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </SafeAreaView>
//     );
//   }

//   if (error) {
//     return (
//       <SafeAreaView style={styles.errorContainer}>
//         <Text style={styles.errorText}>{error}</Text>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView>
//       <View style={styles.slide}>
//         <SwiperFlatList
//           autoplay
//           autoplayDelay={3}
//           autoplayLoop
//           showPagination={false}
//           autoplayLoopKeepAnimation={true}
//           isTVSelectable
//           centerContent
//           windowSize={100}
//           hasTVPreferredFocus
//           data={SliderImages}
//           renderItem={({item}) => (
//             <View style={styles.slideContainer}>
//               <Image source={{uri: item}} style={styles.sliderImage} />
//             </View>
//           )}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   slide: {
//     height: hp('100%'),
//     width: wp('100%'),
//   },
//   slideContainer: {
//     height: hp('100%'),
//     width: wp('100%'),
//   },
//   sliderImage: {
//     width: wp('100%'),
//     height: hp('100%'),
//     objectFit: 'fill',
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#FFFFFF',
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#FFFFFF',
//   },
//   errorText: {
//     fontSize: 18,
//     color: '#FF0000',
//     textAlign: 'center',
//     margin: 20,
//   },
// });

// export default SliderScreen;

import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  SafeAreaView,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import showSnackbar from '../../component/helper';
import {useNetInfo} from '@react-native-community/netinfo';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import useInactivityHandler from '../dashboard/component/inactivehook';
import {SliderImages} from '../dashboard/component/data';

const SlideItem = React.memo(({item}) => (
  <View style={styles.slideContainer}>
    <Image source={{uri: item}} style={styles.sliderImage} />
  </View>
));

const SliderScreen = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const {isConnected} = useNetInfo();

  const navigation = useNavigation();
  const {resetTimer} = useInactivityHandler();

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        resetTimer(60000);
        return false;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [resetTimer]),
  );

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (isConnected) {
  //       setError(null);
  //       setLoading(true);
  //       try {
  //         const outletlocation = await AsyncStorage.getItem('outletlocation');
  //         if (outletlocation) {
  //           const response = await axios.get(
  //             `https://ea42-45-112-136-250.ngrok-free.app/api/outletlocation/${outletlocation}`,
  //           );
  //           const result = response.data;
  //           console.log(result);
  //           if (response.status === 200) {
  //             setData(result.outletlocation);
  //             setLoading(false);
  //           } else {
  //             setError('Failed to fetch data');
  //             showSnackbar({text: result.message});
  //             setLoading(false);
  //           }
  //         } else {
  //           setError('No outlet location found');
  //           showSnackbar({text: 'No outlet location found'});
  //           setLoading(false);
  //         }
  //       } catch (error) {
  //         console.error(error);
  //         showSnackbar({text: `An error occurred ${error}`});
  //         setLoading(false);
  //       }
  //     } else {
  //       setError('No internet connection. Please try again later.');
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [isConnected]);

  // if (loading) {
  //   return (
  //     <SafeAreaView style={styles.loadingContainer}>
  //       <ActivityIndicator size="large" color="#0000ff" />
  //     </SafeAreaView>
  //   );
  // }

  if (error) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <View style={styles.slide}>
        <SwiperFlatList
          autoplay
          autoplayDelay={3}
          autoplayLoop
          showPagination={false}
          autoplayLoopKeepAnimation={true}
          isTVSelectable
          centerContent
          windowSize={100}
          hasTVPreferredFocus
          data={SliderImages}
          renderItem={({item}) => <SlideItem item={item} />}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  slide: {
    height: hp('100%'),
    width: wp('100%'),
  },
  slideContainer: {
    height: hp('100%'),
    width: wp('100%'),
  },
  sliderImage: {
    width: wp('100%'),
    height: hp('100%'),
    objectFit: 'fill',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  errorText: {
    fontSize: 18,
    color: '#FF0000',
    textAlign: 'center',
    margin: 20,
  },
});

export default SliderScreen;
