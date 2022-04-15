# cpu-load-bench

This is a simple node.js web app to simulate CPU activity. 

By default the simulation will opts for one instance (thread) at 50% of CPU load.

If you want to change them you can set two environement variables:
* LOAD_FACTOR => allows you to set the CPU load you want (between 0 and 1).
* INSTANCES => allows you to set the number of threads that should be impacted.

ℹ️ If you set LOAD_FACTOR to a number that is not between 0 and 1, the load factor will be automatically set to 0.5 (50%).

ℹ️ If you set INSTANCES to a number below 1 it will be set to 1 by default.

# How to run it?

## Locally 

Clone the project and then run `node index.js` on your terminal.

If you want to change the default cpu load and the number of threads with for example 80% load and 3 threads simply run: `LOAD_FACTOR=0.8 INSTANCES=3 node index.js`.

In order to start simulating CPU activity go to `http://localhost:8080/start` to start the process.

If you want to stop the CPU simulation process go to `http://localhost:8080/stop`.

## On Clever Cloud Console

In order to deploy the app on the [Clever Cloud Console](https://console.clever-cloud.com), you can follow the steps from our [documentation](https://www.clever-cloud.com/doc/deploy/application/javascript/by-framework/nodejs/).
