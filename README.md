## App as bt controller for arduino car

### Usage
1. Make sure you have [react-native](https://facebook.github.io/react-native/) installed
2. Run `npm install`, `react-native link`
3. To run on android device, run `react-native run-android`
4. To build apk, run `react-native build-android`, then `app-debug.apk` will be in `android/app/build/outputs/apk/`
5. `testBT.ino` is for testing connection between the app and arduino.

### Known Issues
1. Currently only android is supported, ios maybe malfunctional.
2. Discovering and pairing device is not supoorted yet, so it is needed to pair the device before using the app.
