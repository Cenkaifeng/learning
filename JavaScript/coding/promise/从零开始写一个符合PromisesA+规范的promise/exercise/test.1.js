let fs = require('fs')
let Promise = require('./promise.2');

let promise = new Promise((resovle, reject) => {
    fs.readFile('age.txt', 'utf8', function(err, data) {
        err ? reject(err) : resovle(data);
    })
})

function success(data) {
    console.log(data)
}

function error(err) {
    console.log(err)
}

promise.then(success, error);