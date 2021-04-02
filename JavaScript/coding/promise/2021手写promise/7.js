const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

const isFunction = obj => typeof obj === 'function'
const isObject = obj => !!(obj && typeof obj === 'object')
const isPromise = obj => obj instanceof Promise
const isThenable = obj => (isFunction(obj) || isObject(obj)) && 'then' in obj

function transition(promise, state, x) {
    if (promise.state !== PENDING) return
    promise.state = state
    promise.result = x
    setTimeout(() => handleCbs(promise.callbacks, state, x))
}

function Promise(excutor) {
    this.state = PENDING
    this.result = null
    this.callbacks = []

    const onFulfilled = val => transition(this, FULFILLED, val)
    const onRejected = err => transition(this, REJECTED, err)

    let ignore = false
    const resolve = (val) => {
        if (ignore) return
        ignore = true
        resolvePromise(this, val, onFulfilled, onRejected)
    }
    const reject = (err) => {
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


Promise.defer = Promise.deferred = function() {
    let dfd = {}
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve
        dfd.reject = reject
    })
    return dfd
}

module.exports = Promise