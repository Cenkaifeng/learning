let Promise = require('./promise.5');
let fs = require('fs');

let promise = new Promise((resolve, reject) => {
    fs.readFile('age.txt', 'utf8', function(err, data) {
        err ? reject(err) : resolve(data);
    });
});
let f1 = function(data) {
    // console.log(data);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            fs.readFile('name.txt', 'utf8', function(err, data) {
                err ? reject(err) : resolve(data);
            });
        }, 5000);
    });
};
let f2 = function(data) {
    // console.log(data);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            fs.readFile('male.txt', 'utf8', function(err, data) {
                err ? reject(err) : resolve(data);
            });
        }, 2000);
    });
};
let f3 = function(data) {
    // console.log(data);
    return 'f3';
};
let errorLog = function(error) {
    console.log(error);
};

// promise
//     .then(f1)
//     .then(f2)
//     .then(f3)
//     // .catch(errorLog);

// promise.then(() => {
//     throw 'error1';
// }).then(null, (err) => {
//     console.log(err);
// })

// promise.then(() => {
//     console.log(2);
// }).then(() => {
//     console.log(2.2);
// })

Promise.race([f1(), f2(), f3()]).then(value => {
    console.log('race', value);
});
