// 有一个观察者 被观察者
// vue数据更新是观察者模式，EventBus 是订阅发布模式
class Subject { // 被观察者
    constructor() {
        this.arr = []; // 数组中存放的是观察者的实例
        this.state = 'happy';
    }

    setState(newState) {
        this.state = newState;
        this.arr.forEach(o => o.update(this));
    }

    attach(ob) { // 挂载观察者
        this.arr.push(ob);
    }
}

class Observer { // 观察者
    constructor(name) {
        this.name = name;
    }

    update(s) { // 当前被观察者的状态发生了变化，需要更新状态
        console.log(this.name + '：' + s.state);
    }
}
// 1) 创建被观察者
// 2) 创建观察者
// 3) 将观察者挂载到被观察者上
let s = new Subject('小宝宝');
let o1 = new Observer('me');
let o2 = new Observer('she');
s.attach(o1);
s.attach(o2);

s.setState('sad');