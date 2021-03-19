const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

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

        excutor(resolve, reject);
    }

    then(onFulfilled, onRejected) {
        if (this.status === PENDING) {
            this.onFulfilledCallbacks.push(onFulfilled);
            this.onRejectedCallbacks.push(onRejected);
        }

        if (this.status === FULFILLED) {
            onFulfilled(this.value);
        }

        if (this.status === REJECTED) {
            onRejected(this.reason);
        }

        return this;
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
