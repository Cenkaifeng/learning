function debounce(fn, wait, immediate) {
    let timer

    const debounced = function(...args) {
        timer && clearTimeout(timer)

        if (immediate) {
            let callNow = !timer
            timer = setTimeout(() => {
                timer = null
            }, wait)
            if (callNow) {
                return fn.apply(this, args)
            }
        } else {
            timer = setTimeout(() => {
                fn.apply(this, args)
            }, wait)
        }
    }

    debounced.cancel = function() {
        clearTimeout(timer)
        timer = false
    }

    return debounced
}