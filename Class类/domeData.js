// const EventEmitter = require('node:events');
// class MyEmitter extends EventEmitter {}

// const myEmitter = new MyEmitter();


var UpData = require('./UpData.class.js')

console.log(UpData);
let dataClass = new UpData(12)
console.log(dataClass);
let num = dataClass.getData()
console.log(num);
dataClass.setData(15);
console.log(dataClass);
// class UpData {
//     constructor(params) {
//         this.num = params;
//     }
//     setData(num) {
//         this.num = num
//     }
//     getData() {
//         return this.num
//     }
// }

// let upData = new UpData()
// console.log(new UpData());

// function Emp(x, y, z) {
//     this.empno = x;
//     this.ename = y;
//     this.sal = z;
//     this.work = function() {
//         conction.log(this.ename + "is working")

//     }
// }
// //创建对象
// var a = new Emp();
// var b = new Emp(1);
// var c = new Emp(1, "KING");
// var d = new Emp(2, "yyy", 777);
// Emp.prototype.getsal = function() {
//         return this.sal;
//     }
//     //调用
// c.getsal();