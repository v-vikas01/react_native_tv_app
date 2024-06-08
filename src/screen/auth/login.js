import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';
import showSnackbar, {LoadingIndicator} from '../../component/helper';
import axios from 'axios';
import {useNetInfo} from '@react-native-community/netinfo';

const AuthScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const {isConnected} = useNetInfo();

  const handleSubmit = async () => {
    if (validateInputs()) {
      if (isConnected) {
        setLoading(true);
        try {
          const response = await axios.post(
            `https://ea42-45-112-136-250.ngrok-free.app/api/login`,
            {
              email: username,
              password: password,
            },
          );

          const result = response.data;
          if (result.status === 200) {
            await AsyncStorage.setItem(
              'outletlocation',
              result.outletlocation.toString(),
            );
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'home'}],
              }),
            );
          } else {
            showSnackbar({text: result.message});
            setLoading(false);
          }
        } catch (error) {
          console.error(error);
          showSnackbar({
            text: 'An error occurred. Please try again.',
          });
        } finally {
          setLoading(false);
        }
      } else {
        showSnackbar({text: 'No internet connection. Please try again later.'});
      }
    }
  };

  const validateInputs = () => {
    if (username.trim() === '' || password.trim() === '') {
      showSnackbar({text: 'All fields are required.'});
      return false;
    }
    return true;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={username}
        onChangeText={setUsername}
        placeholderTextColor="grey"
      />
      <Text style={styles.title}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="grey"
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      <LoadingIndicator visible={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 80,
    backgroundColor: '#FFFFFF',
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 10,
    borderRadius: 12,
    color: '#000',
    fontSize: 15,
    fontFamily: 'Outfit-Regular',
    backgroundColor: '#FFFFFF',
  },
  button: {
    backgroundColor: '#6060EF',
    height: 50,
    paddingHorizontal: 5,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    elevation: 2,
    marginTop: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '500',
    fontFamily: 'Outfit-Medium',
    fontSize: 18,
  },
  title: {
    fontFamily: 'Outfit-Medium',
    fontWeight: '500',
    fontSize: 15,
    color: '#000000',
    padding: 5,
  },
});

export default AuthScreen;
