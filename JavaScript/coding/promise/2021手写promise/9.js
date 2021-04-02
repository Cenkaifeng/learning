const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

const isFunction = obj => typeof obj === 'function'
const isObject = obj => !!(obj && typeof obj === 'object')
const isPromise = obj => obj instanceof Promise
const isThenable = obj => (isFunction(obj) || isObject(obj)) && 'then' in obj

function Promise(excutor) {
    this.state = PENDING
    this.callbacks = []
    this.result = null

    let onFulfilled = val => transition(this, FULFILLED, val)
    let onRejected = err => transition(this, REJECTED, err)

    let ignore = false
    const resolve = value => {
        if (ignore) return
        ignore = true
        resolvePromise(this, value, onFulfilled, onRejected)
    }
    const reject = error => {
        if (ignore) return
        ignore = true
        onRejected(error)
    }

    try {
        excutor(resolve, reject)
    } catch(error) {
        reject(error)
    }
}

Promise.prototype.then = function(onFulfilled, onRejected) {
    return new Promise((resolve, reject) => {
        const callback = { onFulfilled, onRejected, resolve, reject }

        if (this.state === PENDING) {
            this.callbacks.push(callback)
        } else {
            setTimeout(() => handleCb(callback, this.state, this.result))
        }
    })
}

function transition(promise, state, result) {
    if (promise.state !== PENDING) return
    promise.state = state
    promise.result = result
    setTimeout(() => handleCbs(promise.callbacks, state, result))
}

function resolvePromise(promise, result, resolve, reject) {
    if (promise === result) {
        return reject(new TypeError('Cannot fulfill promise with itself'))
    }

    if (isPromise(result)) {
        return result.then(resolve, reject)
    }

    if (isThenable(result)) {
        try {
            let then = result.then
            if (isFunction(then)) {
                return new Promise(then.bind(result)).then(resolve, reject)
            }
        } catch(err) {
            reject(err)
        }
    }

    resolve(result)
}

function handleCb(callback, state, result) {
    const { onFulfilled, onRejected, resolve, reject } = callback

    try {
        if (state === FULFILLED) {
            isFunction(onFulfilled) ? resolve(onFulfilled(result)) : resolve(result)
        } else if (state === REJECTED) {
            isFunction(onRejected) ? resolve(onRejected(result)) : reject(result)
        }
    } catch(error) {
        reject(error)
    }
}

function handleCbs(callbacks, state, result) {
    while(callbacks.length) {
        handleCb(callbacks.shift(), state, result)
    }
}

Promise.prototype.catch = function(onRejected) {
    return this.then(null, onRejected)
}

Promise.prototype.finally = function(fn) {
    return this.then(
        val => Promise.resolve(fn().then(() => val)),
        err => Promise.resolve(fn().then(() => { throw err }))
    )
}

Promise.resolve = val => new Promise(resolve => resolve(val))
Promise.reject = err => new Promise((null, reject) => reject(err))
Promise.all = function(promises) {
    return new Promise((resolve, reject) => {
        let count = 0
        let result = []
        for (let i = 0; i < promises.length; i++) {
            Promise.resolve(promises[i]).then(value => {
                result[i] = value
                if (++count === promises.length) {
                    resolve(result)
                }
            }, err => {
                reject(err)
            })
        }
    })
}
Promise.race = function(promises) {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < promises.length; i++) {
            Promise.resolve(promises[i]).then(val => resolve(val), err => reject(err))
        }
    })
}
Promise.promisify = function(fn) {
    return function(...args) {
        return new Promise((resolve, reject) => {
            fn.apply(null, args.concat(function(err, value) {
                err ? reject(err) : resolve(value)
            }))
        })
    }
}

Promise.defer = Promise.deferred = function() {
    let dfd = {}
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve
        dfd.reject = reject
    })
    return dfd
}

module.exports = Promise