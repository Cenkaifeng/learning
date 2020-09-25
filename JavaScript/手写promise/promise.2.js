const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

class MyPromise {
    constructor(executor) {
        // executor会立即执行
        this.status = PENDING;
        this.value = undefined; // 成功的值
        this.reason = undefined; // 失败的原因
        // 使用箭头函数，保证this指向
        let resolve = value => {
            // 不把 resolve reject 放到原型上是因为每个 promise 都有自己的成功和失败
            if (this.status === PENDING) {
                this.status = FULFILLED;
                this.value = value;
            }
        };

        let reject = reason => {
            if (this.status === PENDING) {
                this.status = REJECTED;
                this.reason = reason;
            }
        };

        // 如果executor出错 会一样跳到reject
        try {
            executor(resolve, reject);
        } catch (e) {
            reject(e);
        }
    }

    then(onFulfilled, onRejected) {
        if (this.status === FULFILLED) {
            return onFulfilled(this.value);
        }

        if (this.status === REJECTED) {
            return onRejected(this.reason);
        }
    }
}

// commonjs规范
module.exports = MyPromise;
