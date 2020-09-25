const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function resolvePromise(promise2, x, resolve, reject) {
    // x 来取决 promise 是成功还是失败
    if (promise2 === x) {
        return reject(
            new TypeError('chaining cycle detected for promise #<Promise>')
        );
    }

    let called = false;
    if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
        // 有可能是 promise, x.then 有可能定义了 then 方法 Oject.defineProperty
        try {
            let then = x.then; // then 可能发生异常, 报错
            if (typeof then === 'function') {
                // 只能认为他是 promise
                then.call(
                    x,
                    y => {
                        if (called) return; // 调用成功后, 就不能再调失败
                        called = true;
                        // resolve(y);
                        // 递归解析当前 x 的 promise 的返回结果, 因为可能 promise 成功后还返回一个 promise
                        resolvePromise(promise2, y, resolve, reject);
                    },
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
            if (called) return; // 如果调用了失败, 就把值改成 true, 如果再次调用, 就忽略
            called = true;
            reject(e);
        }
    } else {
        // 原始类型的 x
        resolve(x);
    }
}

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

    // x 是当前 then 成功或者失败的返回结果
    // x 是不是普通值 如果普通值 把值直接传递到下一个 then 中
    // x 是一个 promise ? 需要采用这个 x 的状态
    // 如果 执行函数出错, 直接调用 promise2 的失败
    then(onFulfilled, onRejected) {
        /* promise2 要等待当前这次 new 的 promise 执行完后 才能获取到, 所以 在执行 onFulfilled 和 onRejected 加 setTimeout 定时器
           onFulfilled or onRejected must not be called until the execution context stack contains only platform code
        */
        let promise2 = new MyPromise((resolve, reject) => {
            // 函数立即执行
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

            if (this.status === PENDING) {
                // executor 中的逻辑可能是异步的
                // 订阅成功的回调和失败的回调
                // this.resolveCallbacks.push(onFulfilled); // 不破坏原函数 并扩展
                this.resolveCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    });
                });
                this.rejectCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    });
                });
            }
        });

        return promise2; // 链式调用
    }
}

// commonjs规范
module.exports = MyPromise;
