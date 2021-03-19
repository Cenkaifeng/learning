const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function isPromise(x) {
    return (typeof x === 'object' && x !== null) || typeof x === 'function';
}

function resolvePromise(promise, x, resolve, reject) {
    if (promise === x) {
        return reject(
            new TypeError('chaining cycle detected for promise #<Promise>')
        );
    }

    let called = false;
    if (isPromise(x)) {
        try {
            // 2.3.3.1
            let then = x.then;
            if (typeof then === 'function') {
                // 2.3.3.3
                then.call(
                    x,
                    // 2.3.3.3.1
                    y => {
                        // 2.3.3.3.3
                        if (called) return;
                        called = true;
                        resolvePromise(promise, y, resolve, reject);
                    },
                    // 2.3.3.3.2
                    r => {
                        if (called) return;
                        called = true;
                        reject(r);
                    }
                );
            } else {
                resolve(x);
            }
        } catch (e) {
            // 2.3.3.2
            if (called) return;
            called = true;
            reject(e);
        }
    } else {
        resolve(x);
    }
}

class Promise {
    constructor(excutor) {
        this.status = PENDING;
        this.value = undefined;
        this.reason = undefined;
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];

        const resolve = value => {
            if (this.status === PENDING) {
                setTimeout(() => {
                    this.status = FULFILLED;
                    this.value = value;
                    this.onFulfilledCallbacks.forEach(callback =>
                        callback(this.value)
                    );
                });
            }
        };

        const reject = reason => {
            if (this.status === PENDING) {
                setTimeout(() => {
                    this.status = REJECTED;
                    this.reason = reason;
                    this.onRejectedCallbacks.forEach(callback =>
                        callback(this.reason)
                    );
                });
            }
        };
        try {
            excutor(resolve, reject);
        } catch (e) {
            reject(e);
        }
    }

    then(onFulfilled, onRejected) {
        onFulfilled =
            typeof onFulfilled === 'function' ? onFulfilled : value => value;
        onRejected =
            typeof onRejected === 'function'
                ? onRejected
                : error => {
                      throw error;
                  };

        let promise2 = new Promise((resolve, reject) => {
            if (this.status === PENDING) {
                this.onFulfilledCallbacks.push(() => {
                    try {
                        let x = onFulfilled(this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                });
                this.onRejectedCallbacks.push(() => {
                    try {
                        let x = onRejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                });
            }

            if (this.status === FULFILLED) {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                });
            }

            if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                });
            }
        });

        return promise2;
    }

    catch(onRejected) {
        return this.then(null, onRejected);
    }

    finally(callback) {
        let P = this.constructor();
        return this.then(
            value => P.resolve(callback()).then(() => value),
            reason =>
                P.resolve(callback()).then(() => {
                    throw reason;
                })
        );
    }

    static all(promises) {
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
    }

    static race(promises) {
        return new Promise((resolve, reject) => {
            for (let i = 0; i < promises.length; i++) {
                let value = promises[i];
                if (isPromise(value)) {
                    value.then(resolve, reject);
                } else {
                    resolve(value);
                }
            }
        });
    }

    static resolve(value) {
        return new Promise(resolve => {
            return resolve(value);
        });
    }

    static reject(reason) {
        return new Promise((resolve, reject) => {
            return reject(reason);
        });
    }
}

Promise.defer = Promise.deferred = function() {
    let dfd = {};
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    return dfd;
};

module.exports = Promise;
