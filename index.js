'use strict'

const http = require('http');
const {Worker} = require('worker_threads');
const url = require('url');

const LOAD_FACTOR = process.env.LOAD_FACTOR || 0.5;
const INSTANCES = process.env.INSTANCES || 1;
const PORT = process.env.PORT || 8080;
let workers = [];

let shouldRun = false;
let loadFactor;
let instances;

function validLoadFactor(value) {
  return (value > 0 && value <= 1) ? value : 0.5;
}
function validInstances(value) {
  return (value >= 1) ? value : 1;
}

const server = http.createServer((req, res) => {
  const currentUrl = url.parse(req.url,true)
  if(currentUrl.pathname === '/start') {
    if(shouldRun) return res.end('already started, use /stop if you want to stop the process.');

    loadFactor = validLoadFactor(currentUrl.query.load_factor ?? LOAD_FACTOR);
    instances = validInstances(currentUrl.query.instances ?? INSTANCES);

    shouldRun = true;
    for(let i = 0; i < instances; i++) workers.push(new Worker('./worker.js', {workerData: {loadFactor}}));
    res.end(`Process started with: ${instances} threads and a ${loadFactor*100}% LOAD FACTOR.`);
  }
  else if (currentUrl.pathname === '/stop') {
    if(!shouldRun) res.end('not started, use /start if you want to start the process.');
    shouldRun = false;
    workers.forEach((worker) => worker.terminate());
    // Reset workers array
    workers = [];
    res.end(`Process stopped that ran on: ${instances} threads and a ${loadFactor*100}% LOAD FACTOR.`)
  } else {
    res.end('Use either /start or /stop to start/stop the process.');
  }
});

server.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
