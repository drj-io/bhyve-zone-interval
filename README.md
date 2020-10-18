# bhyve-api

### Setup: config.js

```
module.exports = {
  auth: {
    email: 'do@change.me',
    password: 'changeme'
  },
  device: 1, // Of index
  zone: 1,
  runTime: 15,  // Seconds
  delayTime: 60, // Seconds
}
```

You can copy `config.example.js` if you need a starting point.

### Usage

`node index.js`
