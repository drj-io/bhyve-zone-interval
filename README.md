# bhyve-api-interval

Run through a list of Bhyve irrigation zone at a set interval and turn them on for a given time (in seconds) and off for a given time (in seconds) and wait for a given time (in seconds). I use this to blow out my irrigation lines with a consumer grade air compressor.

Use at your own risk.

### Setup: config.js

```
module.exports = {
  auth: {
    email: 'your_orbitz_email',
    password: 'your_pw'
  },
  device: 2, // Of index
  zoneList: [1, 2, 3, 4, 5, 6, 7],
  repeatsPerZone: 15, // times
  runTime: 3,  // Seconds
  delayTime: 2, // Seconds
}
```

You can copy `config.example.js` if you need a starting point.

`cp config.example.js config.js`

### Usage

`node run.js`

API library derived from https://github.com/MortJC/homebridge-platform-orbit
