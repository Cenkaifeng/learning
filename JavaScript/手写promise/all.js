let fs = require('fs');
let Promise1 = require('./promise.7');

function read(filename) {
    let dfd = Promise1.defer();
    fs.readFile(filename, 'utf8', (err, data) => {
        if (err) {
            dfd.reject(err);
        } else {
            dfd.resolve(data);
        }
    });
    return dfd.promise;
}

// read('./name.txt').then(data => {
//     console.log('read name', data);
// });

// read('./age.txt').then(data => {
//     console.log(data);
// });

function isPromise(value) {
    if (
        (typeof value === 'object' && value !== null) ||
        typeof value === 'function'
    ) {
        if (typeof value.then === 'function') {
            return true;
        }
    }
    return false;
}

Promise.all = function(promises) {
    return new Promise((resolve, reject) => {
        let arr = [];
        let index = 0;
        let processData = function(i, y) {
            arr[i] = y;
            if (++index === promises.length) {
                resolve(arr);
            }
        };
        for (let i = 0; i < promises.length; i++) {
            let value = promises[i];
            if (isPromise(value)) {
                value.then(function(y) {
                    // i 对应的结果 就是 y
                    processData(i, y);
                }, reject);
            } else {
                processData(i, value);
            }
        }
    });
};

// 都成功才算成功  有一个失败才算失败
Promise.all([read('./name.txt'), read('./age.txt'), 100]).then(data => {
    console.log(data);
});
