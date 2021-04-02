function asyncToGenerator(generator) {
    return function(...args) {
        const gen = generator(this, args)
        
        return new Promise((resolve, reject) => {
            function step(key, val) {
                let result
                try {
                    result = gen[key](val)
                } catch(err) {
                    reject(err)
                }
                const {done, value} = result
                if (done) {
                    return resolve(value)
                } else {
                    return Promise.resolve(value).then(v => {
                        step('next', v)
                    }, err => {
                        step('throw', err)
                    })
                }
            }
    
            step('next')
        })
    }
}