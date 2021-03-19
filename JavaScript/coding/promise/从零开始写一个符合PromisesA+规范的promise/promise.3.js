const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
    constructor(executor) {
        // executor会立即执行
        this.status = PENDING;
        this.value = undefined; // 成功的值
        this.reason = undefined; // 失败的原因
        this.resolveCallbacks = []; // 存放所有 then 中的成功回调
        this.rejectCallbacks = []; // 存放所有 then 中的失败回调
        // 使用箭头函数，保证this指向
        let resolve = value => {
            // 不把 resolve reject 放到原型上是因为每个 promise 都有自己的成功和失败
            if (this.status === PENDING) {
                this.status = FULFILLED;
                this.value = value;
                this.resolveCallbacks.forEach(fn => fn()); // 如果逻辑是异步的 让数组里订阅的回调执行
            }
        };
        
        let reject = reason => {
            if (this.status === PENDING) {
                this.status = REJECTED;
                this.reason = reason;
                this.rejectCallbacks.forEach(fn => fn());
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

        if (this.status === PENDING) { // executor 中的逻辑可能是异步的
            // 订阅成功的回调和失败的回调
            // this.resolveCallbacks.push(onFulfilled); // 不想破坏原函数 并扩展
            this.resolveCallbacks.push(() => {
                onFulfilled(this.value);
            });
            this.rejectCallbacks.push(() => {
                onRejected(this.reason);
            });
        }
    }
}

// commonjs规范
module.exports = MyPromise;
