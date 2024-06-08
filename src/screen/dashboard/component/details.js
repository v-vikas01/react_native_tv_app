import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import useInactivityHandler from './inactivehook';
import {useFocusEffect} from '@react-navigation/native';

const DetailsScreen = ({route}) => {
  const {item} = route.params;
  const infoList = item.related_info;
  const {resetTimer, clearTimer} = useInactivityHandler(60000);

  // useEffect(() => {
  //   resetTimer(60000);

  //   return () => {
  //     clearTimer();
  //   };
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      resetTimer(60000);
    }, []),
  );

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        resetTimer(60000);
      }}>
      <ScrollView
        style={styles.container}
        onScrollBeginDrag={() => {
          resetTimer(60000);
        }}
        onScrollEndDrag={() => {
          resetTimer(60000);
        }}
        onTouchStart={() => {
          resetTimer(60000);
        }}
        onTouchEnd={() => {
          resetTimer(60000);
        }}
        nestedScrollEnabled={true}
        scrollEnabled={true}
        scrollEventThrottle={16}>
        <Image source={{uri: item.image[0]}} style={styles.image} />
        <View style={styles.contentContainer}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignContent: 'center',
              justifyContent: 'center',
            }}>
            <Text style={styles.title}>{item.name}</Text>
            <View style={styles.divider1} />
          </View>

          <Text style={styles.description}>{item.description}</Text>
          <View style={styles.divider} />
          {infoList.map((info, index) => (
            <View key={index} style={styles.infoContainer}>
              <Text style={styles.sectionTitle}>{info.header}</Text>
              <Text style={styles.sectionContent}>
                {info.related_description}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  image: {
    width: wp('100%'),
    height: hp('80%'),
    objectFit: 'fill',
  },
  contentContainer: {
    padding: wp('4%'),
    paddingBottom: hp('5%'),
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginTop: -hp('4%'),
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Outfit-SemiBold',
    color: '#333',
    marginBottom: hp('1%'),
  },
  description: {
    fontSize: 13,
    color: '#666',
    marginBottom: hp('1%'),
    fontWeight: '400',
    fontFamily: 'Outfit-Regular',
  },
  infoContainer: {
    marginBottom: hp('2%'),
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Outfit-Medium',
    color: '#444',
    marginTop: 20,
    marginBottom: hp('1%'),
  },
  sectionContent: {
    fontSize: 12,
    color: '#555',
    marginBottom: 10,
    fontWeight: '400',
    fontFamily: 'Outfit-Regular',
  },
  divider: {
    marginTop: hp('1%'),
    borderTopWidth: 0.3,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
  divider1: {
    borderTopWidth: 0.25,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
    flex: 1,
    marginLeft: wp('2%'),
  },
  footerText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
});
