// function add(a, b, c, d, e) {
//     return a + b + c + d + e;
// }

// 柯里化
// function curring(fn, arr = []) {
//     let len = fn.length; // 获取fn函数的参数
//     return function(...args) { // [1, 2]
//         arr = arr.concat(args);
//         console.log(arr, arr.length, len);
//         if (arr.length < len) { // 传入的参数 不够，不执行
//             return curring(fn, arr);
//         } else { // 执行
//             return fn(...arr);
//         }
//     }
// }

// var a = curring(add)(1, 2)(3)(4, 5);

// function curring(fn, ...arg) {
//     const _this = this;
//     return function(...args) {
//         arg = [...arg, ...args];
//         if (args.length) {
//             return curring.call(_this, fn, ...arg);
//         }
//         return fn.apply(null, arg);
//     };
// }

const reduce = function(...args) {
    return args.reduce((total, current) => total + current, 0);
};

// let add = curring(reduce);

function add1(x, y, z) {
    return x + y + z;
}
function curry1(fn, arg) {
    const len = fn.length;
    const _this = this;
    let arr = arg || [];
    return function() {
        const args = [].slice.call(arguments);
        arr = arr.concat(args);
        if (arr.length < len) {
            return curry1.call(_this, fn, arr);
        }
        return fn.apply(null, arr);
    };
}
function curry2(fn, ...arg) {
    const _this = this;
    return function(...args) {
        arg = [...arg, ...args];
        if (args.length) {
            return curry2.call(_this, fn, ...arg);
        }
        return fn.apply(null, arg);
    };
}
const add2 = curry1(add1);
const add3 = curry2(reduce)
console.log(add1(1, 2, 3));
console.log(add2(1, 2)(3));
console.log(add3(1)(2)(3)());
