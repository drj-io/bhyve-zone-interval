let orbitapi = require('./lib/orbitapi.js')
let config = require('./config.js')
let timer = require('./lib/countdown.js')
let count = 0;
let zoneCount = 0;

// Remove verbose logging.  Otherwise replace with console.log
let log = {
  debug: function(l){};
}

go();

async function  go(){

      const O = await new orbitapi(log, config.auth.email, config.auth.password);
      await O.getToken();
      const devices = await O.getDevices();
      let dstring = "";

      const device = devices[config.device];
      devices.forEach((e,i) => dstring += i + ":" +  e._name + " ");
      console.log(`${devices.length} devices available: ${dstring}`);


      if (typeof device == "undefined"){
        console.log(`Error: Device ${config.device} not found`);
        process.exit(1);
      }
      console.log(`using ${config.device}:${device._name}`);
      if (typeof config.zoneList === "number") config.zoneList = [config.zoneList];



      for(zoneIndex in config.zoneList){
        let zone = config.zoneList[zoneIndex];
        zoneCount = 0;
        if(typeof device._zones[zone].name != 'string'){
          console.log(`zone ${zone} not found`);
        } else {
          for(j = 0; j < config.repeatsPerZone; j++){
              zoneCount ++ ;
              await runZone(zone, device, config.runTime);
              await wait(config.delayTime);
          }
        }
      }
      console.log('done, have a great day!');
}


async function runZone(zone, device, timeInSeconds){
  count++;

  var zoneName = device._zones.find(obj => {
    return obj.station === zone;
  }).name;
  console.log(`${count}:${zoneCount} - running zone "${zoneName}" (${zone}) on device ${device._name}`)
  try{
    await device.startZone(zone,1)
    await timer(config.runTime);
    console.log('stop!')
    await device.stopZone()
  } catch(e){
    console.log('error', e);
  }
}

async function wait(timeInSeconds){
  await timer(config.delayTime);
}
