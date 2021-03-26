const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

const isFunction = obj => typeof obj === 'function'
const isObject = obj => !!(obj && typeof obj === 'object')
const isPromise = promise => promise instanceof Promise
const isThenable = obj => (isFunction(obj) || isObject(obj)) && 'then' in obj

const transition = (promise, state, result) => {
    if (promise.state !== PENDING) return
    promise.state = state
    promise.result = result
    setTimeout(() => handleCBS(promise.callbacks, state, result))
}

const resolvePromise = (promise, x, resolve, reject) => {
    if (promise === x) {
        return reject(new TypeError('Can not fulfill promise with itsself'))
    }

    if (isPromise(x)) {
        return x.then(resolve, reject)
    }

    if (isThenable(x)) {
        try {
            let then = x.then
            if (isFunction(then)) {
                return new Promise(then.bind(x)).then(resolve, reject)
            }
        } catch(error) {
            reject(error)
        }
    }

    resolve(x)
}

function Promise(fn) {
    this.result = null
    this.state = PENDING
    this.callbacks = []

    let onFulfilled = value => transition(this, FULFILLED, value)
    let onRejected = reason => transition(this, REJECTED, reason)

    let ignore = false
    const resolve = value => {
        if (ignore) return
        ignore = true
        resolvePromise(this, value, onFulfilled, onRejected)
    }

    const reject = reason => {
        if (ignore) return
        ignore = true
        onRejected(reason)
    }

    try {
        fn(resolve, reject)
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
            setTimeout(() => handleCB(callback, this.state, this.result))
        }
    })
}

function handleCB(callback, state, result) {
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

function handleCBS(callbacks, state, result) {
    while(callbacks.length) {
        handleCB(callbacks.shift(), state, result)
    }
}

Promise.resolve = value => new Promise((resolve) => resolve(value))
Promise.reject = reason => new Promise((null, reject) => reject(reason))

Promise.prototype.catch = function(onRejected) {
    return this.then(null, onRejected)
}

Promise.prototype.finally = function(cb) {
    return this.then(
        value => Promise.reaolve(cb()).then(() => value),
        reason => Promise.resolve(cb()).then(() => { throw reason })
    )
}

Promise.race = function(promises) {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < promies.length; i++) {
            Promise.resolve(promies[i]).then(value => {
                resolve(value)
            }, reason => {
                reject(reason)
            })
        }
    })
}

Promise.all = function(promises) {
    return new Promise((resolve, reject) => {
        let count = 0
        let result = []
        for (let i = 0; i < promises.length; i++) {
            Promise.resolve(promise[i]).then(value => {
                result[i] = value
                if (++count === promises.length) {
                    resolve(result)
                }
            }, reason => {
                reject(reason)
            })
        }
    })
}

Promise.promisify = function(fn) {
    return function() {
        const args = [...arguments]
        return new Promise((resolve, reject) => {
            fn.apply(null, args.concat(function(err, result) => {
                err ? reject(err) : resolve(result)
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