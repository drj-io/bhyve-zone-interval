module.exports = async function(sec){
  return new Promise((resolve, reject) => {
    let startTime = Math.floor(+new Date() / 1000)
    loop()
    function loop(){
      let currentTime = Math.floor(+new Date() / 1000)
      let progressed =  currentTime - startTime
      let left = sec - progressed
      if(left <0) {
        process.stdout.write('\r');
        return resolve()
      }
      process.stdout.write(`\r${left} `);
      setTimeout(loop, 500)
    }

  })
}
