## BT controller app for arduino car (Android)


### Usage for interacting with arduino
* Download and install [`app-debug.apk`](https://github.com/stationaryfront/xue-ru-workshop/blob/master/android/app/build/outputs/apk/app-debug.apk)
* Sliders
  * Slider0 (左馬達） sends `'a[value]\n'` on sliding. Ex: `'a100\n'`, `'a255\n'`
  * Slider1 (右馬達） sends `'c[value]\n'` on sliding. Ex: `'c100\n'`, `'c255\n'`
* Buttons
  * forward, backward, left, right buttons send `'f\n'`, `'b\n'`, `'l\n'`, `'r\n'` respectively **on press in**
  * Each button sends `'s\n'` **on press out**
* You can parse data from app messages for arduino use based on the description above
  
### Usage for developers
1. Make sure you have [react-native](https://facebook.github.io/react-native/) installed
2. Run `npm install`, `react-native link`
3. To run on android device, run `react-native run-android`
4. To build apk, run `react-native build-android`, then `app-debug.apk` will be in `android/app/build/outputs/apk/`
5. `testBT.ino` is for testing connection between the app and arduino.

### Known Issues
1. Currently only android is supported, ios maybe malfunctional.
2. Discovering and pairing device is not supoorted yet, so it is needed to pair the device before opening the app. (If app is opened before pairing, **kill and restart the app after pairing**)
