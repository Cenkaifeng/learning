class Promise {
    constructor(excutor) {
        this.value = undefined;
        this.reason = undefined;
        this.onFulfilled = null;
        this.onRejected = null;

        const resolve = value => {
            setTimeout(() => {
                this.value = value;
                this.onFulfilled(this.value);
            });
        };

        const reject = () => {
            setTimeout(() => {
                this.reason = reason;
                this.onRejected(this.reason);
            })
        };

        excutor(resolve, reject);
    }

    then(onFulfilled, onRejected) {
        this.onFulfilled = onFulfilled;
        this.onRejected = onRejected;
    }
}

module.exports = Promise;
