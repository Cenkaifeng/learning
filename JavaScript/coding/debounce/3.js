function debounce(fn, wait, immediate) {
    let timer = null

    function debounced(...args) {
        timer && clearTimeout(timer)

        if (immediate) {
            let callNow = !timer

            timer = setTimeout(() => {
                timer = null
            }, wait)

            if (callNow) {
                fn.apply(this, args)
            }
        } else {
            timer = setTimeout(() => {
                fn.apply(this, args)
            }, wait)
        }
    }

    debounced.cancel = function() {
        clearTimeout(timer)
        timer = null
    }

    return debounced
}