module.exports = {
  auth: {
    email: 'your_orbitz@email.com',
    password: 'your_pw'
  },
  device: 1, // Of index
  zoneList: [1, 2, 3, 4, 5, 6, 7], // Which zones to run through. If the zone doesn't exist, you'll get an error
  repeatsPerZone: 15, // Number of runs per zone
  runTime: 15,  // Seconds
  delayTime: 70, // Seconds
}
