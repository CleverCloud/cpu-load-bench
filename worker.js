const {workerData} = require('worker_threads');

const LOAD_FACTOR = workerData.LOAD_FACTOR;

function blockCpu(ms) {
  const now = new Date().getTime();
  let result = 0;
  while(true) {
    result += Math.random() * Math.random();
    if (new Date().getTime() > now  + ms) return;
  }
}

function start() {
  blockCpu(1000*LOAD_FACTOR);
  setTimeout(start, 1000* (1 - LOAD_FACTOR));
}

start();
