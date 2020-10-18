# bhyve-api-interval

Run a Bhyve irrigation zone at a set interval. I use this to blow out my irrigation lines with a consumer grade air compressor.

Use at your own risk.

### Setup: config.js

```
module.exports = {
  auth: {
    email: 'do@change.me',
    password: 'changeme'
  },
  device: 0, // Of index - if you only have one device, just leave this zero
  zone: 1,
  runTime: 15,  // Seconds
  delayTime: 60, // Seconds
}
```

You can copy `config.example.js` if you need a starting point.

### Usage

`node index.js`



API library derived from https://github.com/MortJC/homebridge-platform-orbit
