function asyncToGenerator(generator) {
    return function(...args) {
        const gen = generator.apply(this, args)
        return new Promise((resolve, reject) => {
            
            function step(key, val) {
                let result = null
                try {
                    result = gen[key](val)
                } catch(err) {
                    return reject(err)
                }

                const { done, value } = result
                if (done) {
                    return resolve(value)
                } else {
                    return Promise.resolve(value).then(
                        val => step('next', val),
                        err => step('throw', err)
                    )
                }
            }

            step('next')
        })
    }
}