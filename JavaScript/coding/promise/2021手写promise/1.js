const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function Promise(fn) {
    let self = this;
    self.state = PENDING
    self.value = null
    self.reason = null
    self.onFulfilledCbs = []
    self.onRejectedCbs = []

    function resolve(value) {
        if (self.state === PENDING) { 
            setTimeout(function() {
                self.state = FULFILLED
                self.value = value
                self.onFulfilledCbs.forEach(cb => cb(self.value))
            })
        }
    }

    function reject(reason) {
        if (self.state === PENDING) {
            setTimeout(function() {
                self.state = REJECTED
                self.reason = reason
                self.onRejectedCbs.forEach(cb => cb(self.reason))
            })
        }
    }

    fn(resolve, reject)
}

Promise.prototype.then = function(onFulfilled, onRejected) {
    if (this.state === PENDING) {
        this.onFulfilledCbs.push(onFulfilled)
        this.onRejectedCbs.push(onRejected)
    } else if (this.state === FULFILLED) {
        onFulfilled(this.value)
    } else if (this.state === REJECTED) {
        onRejected(this.reason)
    }
    return this
}

function isFunction(x) {
    return typeof x === 'function';
}