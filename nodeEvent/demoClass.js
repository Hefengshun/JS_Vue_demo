const EventEmitter = require('node:events');
class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
// Only do this once so we don't loop forever
// myEmitter.once('newListener', (event, listener) => { //事件：'newListener'
//     if (event === 'event') {
//         // Insert a new listener in front
//         myEmitter.on('event', () => { //在将侦听器添加到其内部侦听器数组之前，实例将发出自己的事件。EventEmitter'newListener'
//             console.log('B'); //为事件注册的侦听器将传递事件名称和对正在添加的侦听器的引用。'newListener'
//         });
//     }
// });
// myEmitter.on('event', () => {
//     console.log('A');
// });
// myEmitter.emit('event');
// Prints:
//   B
//   A

myEmitter.once('newListener', (event, listener) => { //事件：'newListener'  因为once所以执行一次
    console.log(event, listener);
    if (event === 'eventTwo') {
        // Insert a new listener in front
        myEmitter.on('eventTwo', () => { //在将侦听器添加到其内部侦听器数组之前，实例将发出自己的事件。EventEmitter'newListener'
            console.log('TwoOne'); //为事件注册的侦听器将传递事件名称和对正在添加的侦听器的引用。'newListener'
        });
    } else if (event === 'event') {
        myEmitter.on('event', () => { //在将侦听器添加到其内部侦听器数组之前，实例将发出自己的事件。EventEmitter'newListener'
            console.log('B'); //为事件注册的侦听器将传递事件名称和对正在添加的侦听器的引用。'newListener'
        });
    }
});
myEmitter.on('event', () => {
    console.log('A');
});
myEmitter.emit('event');

myEmitter.on('eventTwo', () => {
    console.log('Two');
});
myEmitter.emit('eventTwo'); //先执行newListener
// event [Function (anonymous)]
// B
// A
// Two       //因为newListener 是once所以执行一次 newListener里的TwoOne的打印没打印出来