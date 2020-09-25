const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class Promise {
    constructor(excutor) {
        this.value = undefined;
        this.reason = undefined;
        this.onFulfilled = null;
        this.onRejected = null;
        this.status = PENDING;

        const resolve = value => {
            if (this.status === PENDING) {
                setTimeout(() => {
                    this.status = FULFILLED;
                    this.value = value;
                    this.onFulfilled(this.value);
                });
            }
        };

        const reject = reason => {
            if (this.status === PENDING) {
                setTimeout(() => {
                    this.status = REJECTED;
                    this.reason = reason;
                    this.onRejected(this.reason);
                });
            }
        };

        excutor(resolve, reject);
    }

    then(onFulfilled, onRejected) {
        if (this.status === PENDING) {
            this.onFulfilled = onFulfilled;
            this.onRejected = onRejected;
        }

        if (this.status === FULFILLED) {
            onFulfilled(this.value);
        }

        if (this.status === REJECTED) {
            onRejected(this.reason);
        }
    }
}

module.exports = Promise;
