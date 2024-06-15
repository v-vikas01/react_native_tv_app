// import {Directions, SpatialNavigation} from 'react-tv-space-navigation';

// export const configureRemoteControl = () => {
//   const subscribeToRemoteControl = callback => {
//     const handleKeyPress = configureRemoteControl();
//     eventEmitter.on('keyDown', callback);
//     return handleKeyPress;
//   };

//   const unsubscribeFromRemoteControl = handleKeyPress => {
//     KeyEvent.removeEventListener(handleKeyPress);
//   };

//   SpatialNavigation.configureRemoteControl({
//     remoteControlSubscriber: subscribeToRemoteControl,
//     remoteControlUnsubscriber: unsubscribeFromRemoteControl,
//   });
//   SpatialNavigation.configureRemoteControl({
//     remoteControlSubscriber: callback => {
//       const mapping = {
//         ArrowRight: Directions.RIGHT,
//         ArrowLeft: Directions.LEFT,
//         ArrowUp: Directions.UP,
//         ArrowDown: Directions.DOWN,
//         Enter: Directions.ENTER,
//       };
//       const eventId = window.addEventListener('keydown', keyEvent => {
//         callback(mapping[keyEvent.code]);
//       });
//       return eventId;
//     },
//     remoteControlUnsubscriber: eventId => {
//       window.removeEventListener('keydown', eventId);
//     },
//   });
//   // SpatialNavigation.configureRemoteControl({
//   //   remoteControlSubscriber: callback => {
//   //     const mapping = {
//   //       ArrowRight: Directions.RIGHT,
//   //       ArrowLeft: Directions.LEFT,
//   //       ArrowUp: Directions.UP,
//   //       ArrowDown: Directions.DOWN,
//   //       Enter: Directions.ENTER,
//   //     };

//   //     const eventId = window.addEventListener('keydown', keyEvent => {
//   //       callback(mapping[keyEvent.code]);
//   //     });

//   //     return eventId;
//   //   },
//   //   remoteControlUnsubscriber: eventId => {
//   //     window.removeEventListener('keydown', eventId);
//   //   },
//   // });
// };

import {Directions, SpatialNavigation} from 'react-tv-space-navigation';
import KeyEvent from 'react-native-keyevent'; // Import KeyEvent
import EventEmitter from 'eventemitter3'; // Import EventEmitter

const eventEmitter = new EventEmitter();

export const configureRemoteControl = () => {
  const subscribeToRemoteControl = callback => {
    const handleKeyPress = keyEvent => {
      const mapping = {
        22: Directions.RIGHT, // ArrowRight
        21: Directions.LEFT, // ArrowLeft
        19: Directions.UP, // ArrowUp
        20: Directions.DOWN, // ArrowDown
        23: Directions.ENTER, // Enter
      };

      callback(mapping[keyEvent.keyCode]);
    };

    KeyEvent.onKeyDownListener(handleKeyPress);
    eventEmitter.on('keyDown', handleKeyPress);
    return handleKeyPress;
  };

  const unsubscribeFromRemoteControl = handleKeyPress => {
    KeyEvent.removeKeyDownListener(handleKeyPress);
    eventEmitter.removeListener('keyDown', handleKeyPress);
  };

  SpatialNavigation.configureRemoteControl({
    remoteControlSubscriber: subscribeToRemoteControl,
    remoteControlUnsubscriber: unsubscribeFromRemoteControl,
  });
};
