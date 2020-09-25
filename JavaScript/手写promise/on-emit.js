// 订阅发布模式的好处：解耦

// 订阅者 和 发布者 没有关系
let school = {};

let event = {
    arr: [],
    on(fn) {
        this.arr.push(fn);
    },
    emit() {
        this.arr.forEach(fn => fn());
    }
}

event.on(function() {
    if (Object.keys(school).length === 2) {
        console.log(school)
    }
});

// 订阅发布模式 和 观察者模式(基于订阅发布) 的区别 
