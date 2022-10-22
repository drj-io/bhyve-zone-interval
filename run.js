let orbitapi = require('./lib/orbitapi.js')
let config = require('./config.js')
let timer = require('./lib/countdown.js')
let count = 0;
let zoneCount = 0;

// Remove verbose logging.  Otherwise replace with console.log
let log = {
  debug: function(l){}
}

go();

async function  go(){
      let devices = undefined;
      try{
        const O = await new orbitapi(log, config.auth.email, config.auth.password);
        await O.getToken();
        devices = await O.getDevices();
      } catch(e){
        console.log("ERROR", e)
        process.exit(1)
      }

      if(devices == undefined || devices.length == 0){
        console.log('no devices found. Is your username and password correct?');
        process.exit(1);
      }

      if (process.argv.includes('-l')){
        // list devices & zones
        devices.forEach(function(e,i){
          console.log(`Device #${i} - ${e._name}`)
          e._zones.forEach(function(z,zi){
            console.log(` - Zone ${z.station}: ${z.name}`);
          })
        })
        process.exit(0);
      }

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
        let zoneName = device._zones.find(obj => {
          return obj.station === zone;
        }).name;

        if(typeof zoneName != 'string'){
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

  let zoneName = device._zones.find(obj => {
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
