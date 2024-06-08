import {useEffect, useRef} from 'react';
import {AppState} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const useInactivityHandler = (initialTimeout = 30000) => {
  const navigation = useNavigation();
  const timer = useRef(null);
  const timeoutRef = useRef(initialTimeout);

  const resetTimer = newTimeout => {
    console.log('----User active----');
    if (newTimeout) {
      timeoutRef.current = newTimeout;
    }
    if (timer.current) {
      clearTimeout(timer.current);
      console.log('----Timer cleared inside resetTimer----', timer.current);
    }
    timer.current = setTimeout(() => {
      navigation.navigate('home');
    }, timeoutRef.current);
    console.log('----Timer set in resetTimer----', timer.current);
  };

  const clearTimer = () => {
    console.log('----Clear Timer called----');
    clearTimeout(timer.current);
    console.log('----Timer cleared inside clearTimer----', timer.current);
    timer.current = null;
  };

  const handleAppStateChange = nextAppState => {
    if (nextAppState === 'active') {
      resetTimer();
    } else if (nextAppState === 'background') {
      clearTimer();
    }
  };

  useEffect(() => {
    resetTimer();
    const appStateListener = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      clearTimer();
      appStateListener.remove();
    };
  }, []);

  return {resetTimer, clearTimer};
};

export default useInactivityHandler;
