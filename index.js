'use strict'

const http = require('http');
const {Worker} = require('worker_threads');
const url = require('url');

const PFACTOR = process.env.LOAD_FACTOR || 0.5;
const PINSTANCES = process.env.INSTANCES || 1;
const LOAD_FACTOR = (PFACTOR > 0 &&  PFACTOR <= 1) ? PFACTOR : 0.5;
const INSTANCES = (PINSTANCES >= 1) ? PINSTANCES : 1;
const PORT = process.env.PORT || 8080;
let workers = [];

let shouldRun = false;

const server = http.createServer((req, res) => {
  if(req.url === '/start') {
    if(shouldRun) return res.end('already started, use /stop if you want to stop the process.');
    shouldRun = true;
    for(let i = 0; i < INSTANCES; i++) workers.push(new Worker('./worker.js', {workerData: {LOAD_FACTOR}}));
    res.end(`Process started with: ${INSTANCES} threads and a ${LOAD_FACTOR*100}% LOAD FACTOR.`);
  }
  else if (req.url === '/stop') {
    if(!shouldRun) res.end('not started, use /start if you want to start the process.');
    shouldRun = false;
    workers.forEach((worker) => worker.terminate());
    // Reset workers array
    workers = [];
    res.end(`Process stopped that ran on: ${INSTANCES} threads and a ${LOAD_FACTOR*100}% LOAD FACTOR.`)
  } else {
    res.end('Use either /start or /stop to start/stop the process.');
  }
});

server.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
