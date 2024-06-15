// import React, {useState} from 'react';
// import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
// import {TVEventHandler, useTVEventHandler} from 'react-native-tvos';

// const DashboardTVController = () => {
//   const [lastEventType, setLastEventType] = useState('');
//   const [items, setItems] = useState([
//     {id: '1', title: 'Item 1'},
//     {id: '2', title: 'Item 2'},
//     {id: '3', title: 'Item 3'},
//     {id: '4', title: 'Item 4'},
//     {id: '5', title: 'Item 5'},
//     {id: '11', title: 'Item 1'},
//     {id: '21', title: 'Item 2'},
//     {id: '31', title: 'Item 3'},
//     {id: '41', title: 'Item 4'},
//     {id: '51', title: 'Item 5'},
//     {id: '111', title: 'Item 1'},
//     {id: '12', title: 'Item 2'},
//     {id: '13', title: 'Item 3'},
//     {id: '14', title: 'Item 4'},
//     {id: '15', title: 'Item 5'},
//   ]);

//   const handleTVEvent = evt => {
//     setLastEventType(evt.eventType);
//     console.log(evt.eventType);
//     console.log('ffff');
//   };

//   useTVEventHandler(handleTVEvent);

//   const renderItem = ({item}) => (
//     <TouchableOpacity style={styles.card}>
//       <Text>{item.title}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={items}
//         renderItem={renderItem}
//         keyExtractor={item => item.id}
//         contentContainerStyle={styles.list}
//       />
//       <Text style={styles.lastEventText}>Last Event Type: {lastEventType}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   list: {
//     paddingHorizontal: 16,
//   },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     padding: 20,
//     marginVertical: 10,
//     elevation: 4,
//   },
//   lastEventText: {
//     color: 'blue',
//     marginTop: 20,
//   },
// });

// export default DashboardTVController;
