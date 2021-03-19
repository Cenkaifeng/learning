// 延迟对象

// let fs = require('fs');
// let Promise = require('./promise.7');

new Promise((resolve, reject) => {
    // resolve 中如果放了一个 promise 那么会等待这个 promise 执行完成
    // resolve(new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         resolve('hello');
    //     }, 1000);
    // }));

    reject('失败');
}) // 等价于 Promise.reject('失败’)

Promise.reject('err').then(data => {
        return data;
    })
    .catch(err => {
        // catch 没有终止功能, 其实它是 then 的 reject 的简写
        console.log('catch', err);
        return 1;
    })
    .then(data => {
        return 2;
        // throw 'error';
    })
    .finally(fin => {
        console.log('finally', fin);
    })
    // .then(data => {
    //     console.log(data)
    // }, err => {
    //     console.log(err, '失败');
    // });

// defer 的实现
// function read() {
//     let defer = Promise.defer();
//     fs.readFile('./name.txt', 'utf8', function(err, data) {
//         if (err) {
//             defer.reject(err);
//         } else {
//             defer.resolve(data);
//         }
//     });
//     return defer.promise;
// }

// read().then(data => {
//     console.log(data);
// });
