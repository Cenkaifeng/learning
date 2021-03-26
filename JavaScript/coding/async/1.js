function asyncToGenerator(generator) {
    return function () {
        const gen = generator.apply(this, arguments)
        return new Promise((resolve, reject) => {
            function _next(value) {
                step(gen, resolve, reject, _next, _throw, "next", value);
            }

            function _throw(err) {
                step(gen, resolve, reject, _next, _throw, "throw", err);
            }

            _next()
        })
    }
}

function step(gen, resolve, reject, _next, _throw, key, args) {
    let result = null
    try {
        result = gen[key](args)
    } catch (error) {
        reject(error)
        return
    }

    const {
        value,
        done
    } = result
    if (done) {
        resolve(value)
    } else {
        return Promise.resolve(value).then(_next, _throw)
    }
}

const getData = () =>
  new Promise(resolve => setTimeout(() => resolve("data"), 1000))

// async函数会被编译成generator函数 (babel会编译成更本质的形态，这里我们直接用generator)
function* testG() {
  // await被编译成了yield
  const data = yield getData()
  console.log('data: ', data);
  const data2 = yield getData()
  console.log('data2: ', data2);
  return data + '123'
}

const testGAsync = asyncToGenerator(testG)
testGAsync().then(result => {
  console.log(result)
})