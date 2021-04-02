function debounce(func, wait) {
    let timer = null
    return function(...args) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(this, args)
        }, wait)
    }
}

function debounce(func, wait, immediate) {
    let timer = null
    return function(...args) {
        if (timer) clearTimeout(timer)

        if (immediate) {
            let callNow = !timer
            timer = setTimeout(() => {
                timer = null
            }, wait)
            if (callNow) {
                return func.apply(this, args)
            }
        } else {
            timer = setTimeout(() => {
                func.apply(this, args)
            }, wait)
        }
    }
}

function debounce(func, wait, immediate) {
    let timer = null

    var debounced = function(...args) {
        if (timer) clearTimeout(timer)

        if (immediate) {
            let callNow = !timer
            timer = setTimeout(() => {
                timer = null
            }, wait)
            if (callNow) {
                return func.apply(this, args)
            }
        } else {
            timer = setTimeout(() => {
                func.apply(this, args)
            }, wait)
        }
    }

    debounced.cancel = function() {
        clearTimeout(timer)
        timer = null
    }

    return debounced
}