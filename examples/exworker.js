importScripts('../lib/workerman.js');

var worker = new Workerman();

setInterval( function() {
    worker.send('result', Math.random());
}, 1000 );

worker.start();
