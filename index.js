var orbitapi = require('./lib/orbitapi.js')
var config = require('./config.js')
var timer = require('./lib/countdown.js')

// Remove verbose logging.  Otherwise replace with console.log
var log = {
  debug: function(l){}
}

go()

async function  go(){
  try{
      let O = await new orbitapi(log, config.auth.email, config.auth.password)
      await O.getToken()
      var devices = await O.getDevices()

      var dstring = ""

      devices.forEach((e,i) => dstring += i + ":" +  e._name + " ")
      console.log(devices.length, 'devices available: ', dstring)

      var i = 0;
      while (1==1){
        i++
        console.log(i, "running zone", config.zone, "on device", config.device)
        await devices[config.device].startZone(config.zone,1)
        await timer(config.runTime);
        console.log('stop!')
        await devices[config.device].stopZone()
        await timer(config.delayTime);

      }

  } catch(e){
    console.log('error', e)
  }

}
