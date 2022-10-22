# bhyve-api-interval

This program uses the Orbit B-Hyve API to open sprinkler valves individually for a given amount of time (in seconds) and then wait for a given amount of time (in seconds) on a single Orbit B-Hyve device. You can provide a list of zones and it will run through each zone for a given number of intervals.

I use this to blow out my sprinkler system using a 2½ horsepower compressor.

Use at your own risk.

### Setup: config.js

```
module.exports = {
  auth: {
    email: 'your_orbit_email',
    password: 'your_pw'
  },
  device: 2, // Of index
  zoneList: [1, 2, 3, 4, 5, 6, 7],
  repeatsPerZone: 15, // number of times to open each zone
  runTime: 3,  // Seconds
  delayTime: 2, // Seconds
}
```

You can copy `config.example.js` if you need a starting point.

`cp config.example.js config.js`

### Usage

`node run.js`

API library derived from https://github.com/MortJC/homebridge-platform-orbit
