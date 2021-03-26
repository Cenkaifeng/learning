const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function Promise(fn) {
    this.state = PENDING
    this.result = null
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
        let callback = { onFulfilled, onRejected, resolve, reject }

        if (this.state === PENDING) {
            this.callbacks.push(callback)
        } else {
            setTimeout(() => handleCb(callback, this.state, this.result))
        }
    })
}

function resolvePromise(promise, result, resolve, reject) {
    if (result === promise) {
        return reject(new TypeError('Can not fufill promise with itself'))
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
        } catch(error) {
            return reject(error)
        }
    }

    resolve(result)
}


function handleCb(callback, state, result) {
    const { onFulfilled, onRejected, resolve, reject } = callback
    try {
        if (state === FULFILLED) {
            isFunction(onFulfilled) ? resolve(onFulfilled(result)) : resolve(result)
        } else if (state === REJECTED)  {
            isFunction(onRejected) ? resolve(onRejected(result)) : reject(result)
        }
    } catch(error) {
        reject(error)
    }

}

function transition(promise, state, result) {
    if (promise.state !== PENDING) return
    promise.state = state
    promise.result = result
    setTimeout(() => handleCbs(promise.callbacks, state, result))
}

function handleCbs(callbacks, state, result) {
    while(callbacks.length) {
        handleCb(callbacks.shift(), state, result)
    }
}

function isObject(obj) {
    return !!(obj && typeof obj === 'object')
}

function isFunction(obj) {
    return typeof obj === 'function';
}

function isPromise(obj) {
    return obj instanceof Promise
}

function isThenable(obj) {
    return (isObject(obj) || isFunction(obj)) && 'then' in obj
}

Promise.defer = Promise.deferred = function() {
    let dfd = {};
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    return dfd;
};


module.exports = Promise