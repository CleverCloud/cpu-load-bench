const {workerData} = require('worker_threads');

function blockCpu(ms) {
  const now = new Date().getTime();
  let result = 0;
  while(true) {
    result += Math.random() * Math.random();
    if (new Date().getTime() > now  + ms) return;
  }
}

function start(loadFactor) {
  const cycle = () => {
    blockCpu(1000*loadFactor);
    setTimeout(cycle, 1000* (1 - loadFactor));
  }

  cycle();
}

start(workerData.loadFactor);
