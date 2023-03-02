const { EventEmitter, errorMonitor, on } = require('node:events')

class MyEmitter extends EventEmitter {};

const myEmitter = new MyEmitter();


// 简单示例
myEmitter.on('event', () => {
    console.log("调用");
})

myEmitter.emit('event')

//传递参数
myEmitter.on('params', (a, b) => {
    console.log(this);
    //    {}
    console.log(a, b);
})
myEmitter.on('paramsTwo', function(a, b) {
    console.log(this);
    // MyEmitter {
    //     _events: [Object: null prototype] {
    //       event: [Function (anonymous)],
    //       params: [Function (anonymous)],
    //       paramsTwo: [Function (anonymous)]
    //     },
    //     _eventsCount: 3,
    //     _maxListeners: undefined,
    //     [Symbol(kCapture)]: false
    //   }
    console.log(a, b);
})

myEmitter.emit('params', 'The is', 'Dog')
myEmitter.emit('paramsTwo', 'The is', 'Dog')


//异步与同步
myEmitter.on('async', () => {
    setImmediate(() => { //相当于 setTimeout(()=>{},0)
        console.log("This is async");
    })
    console.log("fist run");
})

myEmitter.emit('async')

// 处理事件与处理一次的对比
// 1.多次处理
let m = 0
myEmitter.on('sum', () => {
    console.log(++m);
})
for (let i = 0; i < 2; i++) {
    myEmitter.emit('sum')
}
// 2.once只触发一次
let S = 0
myEmitter.once('sumOnce', () => {
    console.log(++S);
})
for (let i = 0; i < 2; i++) {
    myEmitter.emit('sumOnce')
}

//当发生错误时
// myEmitter.emit('error', new Error("出错了")) //最佳做法是添加侦听器
// 列
myEmitter.on('error', (err) => { //防止节点崩溃 js用域模块的进行
    console.error(err, "出错了");
})
myEmitter.emit('error', new Error('提示错误'))


//抛出错误的 errorMonitor
myEmitter.on(errorMonitor, (err) => { //有点特殊 打印是两次 第一次不带下面的err参数
    console.log(err);
})
myEmitter.emit('error', new Error('提示错误2'))


//异步处理报错
myEmitter.on('asyncError', async(err) => {
    console.log(err, '运行了');
})
myEmitter.emit('asyncError', new Error('提示错误3'))

// 构造函数中的选项或全局设置更改此行为，在 上安装一个处理程序。如果存在异常，则此处理程序将异常异步路由到 Symbol.for（'nodejs.rejection'） 方法，如果没有，则路由到“错误”事件处理程序。
// captureRejectionsEventEmitter.then(undefined, handler)Promise
// const ee1 = new EventEmitter({ captureRejections: true });
const ee1 = new MyEmitter({ captureRejections: true });
ee1.on('something', async(value) => {
    throw new Error('kaboom');
});

ee1.on('error', console.log);

// const ee2 = new EventEmitter({ captureRejections: true });
const ee2 = new MyEmitter({ captureRejections: true });
ee2.on('something', async(value) => {
    throw new Error('kaboom');
});

ee2[Symbol.for('nodejs.rejection')] = console.log;