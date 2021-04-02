const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

const isFunction = obj => typeof obj === 'function'
const isObject = obj => !!(obj && typeof obj === 'object')
const isPromise = obj => obj instanceof Promise
const isThenable = obj => (isFunction(obj) || isObject(obj)) && 'then' in obj

function Promise(excutor) {
    this.state = PENDING
    this.result = null
    this.callbacks = []

    const onFulfilled = val => transition(this, FULFILLED, val)
    const onRejected = err => transition(this, REJECTED, err)

    let ignore = false
    const resolve = val => {
        if (ignore) return
        ignore = true
        resolvePromise(this, val, onFulfilled, onRejected)
    }

    const reject = err => {
        if (ignore) return
        ignore = true
        onRejected(err)
    }

    try {
        excutor(resolve, reject)
    } catch(err) {
        reject(err)
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

function transition(promise, state, res) {
    if (promise.state !== PENDING) return
    promise.state = state
    promise.result = res
    setTimeout(() => handleCbs(promise.callbacks, state, res))
}

function resolvePromise(promise, x, resolve, reject) {
    if (promise === x) {
        return reject(new TypeError('Cannot fulfill promise with itself'))
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
        } catch(err) {
            return reject(err)
        }
    }

    resolve(x)
}

function handleCb(callback, state, result) {
    const { onFulfilled, onRejected, resolve, reject } = callback

    try {
        if (state === FULFILLED) {
            isFunction(onFulfilled) ? resolve(onFulfilled(result)) : resolve(result)
        } else if (state === REJECTED) {
            isFunction(onRejected) ? resolve(onRejected(result)) : reject(result)
        }
    } catch(err) {
        reject(err)
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
Promise.prototype.finally = function(cb) {
    return this.then(
        val => Promise.resolve(cb()).then(() => val),
        err => Promise.resolve(cb()).then(() => { throw err })
    )
}

Promise.resolve = function(value) {
    return new Promise((resolve) => resolve(value))
}
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
            }, err => reject(err))
        }
    })
}
Promise.race = function(promises) {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < promises.length; i++) {
            Promise.resolve(promises[i]).then(value => resolve(value), err => reject(err))
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