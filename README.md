# Workerman
A JS lib for web workers

## How to use
Take a look at the [example](#example) to see how it works.

1. Import front script
```html
<script src="workerman.js"></script>
```
or worker script
```javascript
importScripts('workerman.js')
```
   
2. Create new Workerman instance(s) (Obviously, 'YOUR_WORKER_FILE.js' is not needed when creating a new Workerman instance from the worker)
```javascript
var my_worker = new Workerman('YOUR_WORKER_FILE.js')
```
3. Set listeners
```javascript
my_worker.on( 'info', function(data) {
    alert('data');
})
```
4. Start Workerman
```javascript
my_worker.start();
```
5. Send data
```javascript
var action_data = [0, 1, 2, 3, 4];
my_worker.send('an_action', action_data);
```

## Example
In this example, two workers are spawn (in the example, they use the same file but you can load different workers).
Those workers generate a random number every second and they send it to the frontend with an action "result".
On "result", the front-end logs the number in a div.

#### index.html:
```html
<div id="log1">
    <strong>First Worker</strong><br />
</div>

<div id="log2">
    <strong>Second Worker</strong><br />
</div>

<script src="../lib/workerman.js"></script>
<script>
    var first_worker  = new Workerman('exworker.js');
    var second_worker = new Workerman('exworker.js');
    
    first_worker.on('result', function(data) {
        
        document.getElementById('log1').innerHTML += data + '<br />';
    
    }).start();
    
    second_worker.on('result', function(data) {
        
        document.getElementById('log2').innerHTML += data + '<br />';
    
    }).start();
    
</script>
```

### exworker.js
```javascript
importScripts('../lib/workerman.js');

var worker = new Workerman();

setInterval( function() {
    worker.send('result', Math.random());
}, 1000 );

workerman.start();
```

## Debugging helpers
In the worker, you can use the log(), warn() or error() functions. Data will be logged in the browser console (because of workers restrictions, you can't log non-atomic data).
