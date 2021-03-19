// promise (promise 有三个状态 等待/成功/失败态)

// 默认新版本现代浏览器 默认支持 promise (es6-promise)

// Promise 是一个类，默认new的时候，是等待态
// resolve 是 成功态
// reject 是 失败态
// 返回的是一个 promise 的实例，每个实例都有一个 then 方法

// executor 是立即执行的，如果内部出错了 就变成失败态
// let p = new Promise((resolve, reject) => {
//     console.log(1);
//     throw new Error('失败了');
//     resolve('发工资了'); // 只有成功或者失败态，并且互相不能改变，只有等待态可以改变状态
// });
// console.log(2);
// p.then(
//     data => {
//         console.log('成功', data);
//     },
//     reason => {
//         console.log('失败', reason);
//     }
// );

// let MyPromise = require('./promise.2');
// let p = new MyPromise((resolve, reject) => {
//     console.log(1);
//     // throw new Error('失败了');
//     // resolve('发工资了'); // 只有成功或者失败态，并且互相不能改变，只有等待态可以改变状态
//     reject('失败了');
// });
// console.log(2);
// p.then(
//     data => {
//         console.log('成功', data);
//     },
//     reason => {
//         console.log('失败', reason);
//     }
// );

// let MyPromise = require('./promise.3');
// let p = new MyPromise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('有钱了');
//     }, 1000);
// });
// p.then(
//     data => {
//         console.log('成功', data);
//     },
//     reason => {
//         console.log('失败', reason);
//     }
// );

// p.then(
//     data => {
//         console.log('成功1', data);
//     },
//     reason => {
//         console.log('失败1', reason);
//     }
// );

// 如果想链式调用 第一种就是返回 this, 第二种就是返回一个新的实例
// let p = new Promise((resolve, reject) => {
//     reject(); // p 失败了
// })

// p.then(() => {}, () => {
//     return undefined; // 有返回了成功, 如果返回的是同一个实例, 那这个p的状态就变了
// }).then(() => { // 每次调用then都需要返回一个新的 promise 状态， 保证状态不影响

// })

// let fs = require('fs');
// let MyPromise = require('./promise.4');

// function read(filename, encoding) {
//     return new MyPromise((resolve, reject) => {
//         // 读取文件不存在 就执行失败的逻辑
//         fs.readFile(filename, encoding, function(err, data) {
//             if (err) reject(err);
//             reject(data);
//         });
//     });
// }

// 1) 如果 then 成功或失败的结果中 返回的还是一个 promise, 会等待这个 promise 的执行结果， 并将结果向外层的 then 的下一个 then 中，并将结果传递到参数中
// 2) 如果 then (成功方法、失败方法) 抛出异常的时候 会走下一次 then 的失败
// 失败有两种情况 1) 返回一个失败的promise; 2) 抛出异常
// read('./name.txt', 'utf8')
//     .then(
//         data => {
//             // console.log(data);
//             // throw new Error('1234');
//             // return read(data, 'utf8');
//             // return 123;
//         },
//         err => {
//             console.log('err1', err);
//             // return new Promise(() => {}); // 返回一个 不成功也不失败的 promise 就可以终止链式调用
//         }
//     )
//     .then(
//         data => {
//             console.log('success', data);
//         },
//         err => {
//             console.log('err2', err);
//         }
//     );

// let MyPromise = require('./promise.4');
// let p = new MyPromise((resolve, reject) => {
//     resolve();
// });

// let p2 = p.then(() => {
//     return p2; // 自己等待自己完成 那永远不会完成, 直接抛出错误 TypeError: Chaining cycle detected for promise #<Promise>
// });

// p2.then(() => {}, (err) => {
//     console.log(err);
// })

// let Promise = require('./promise.6');
// let p = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('呵呵');
//         reject('失败');
//     }, 1000);
// });
// p.then(1, undefined)
//     .then()
//     .then(
//         data => {
//             console.log('data', data);
//         },
//         err => {
//             console.log('err', err);
//         }
//     );