function debounce(fun, delay) {
    let timer = null
    return function(...args) {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fun.apply(this, args)
        }, delay)
    }
}

function debounce(func, wait, immediate) {
    var timer
    return function() {
        var context = this
        var args = arguments
        if (timer) {
            clearTimeout(timer)
        }

        if (immediate) {
            var callNow = !timer
            timer = setTimeout(function() {
                timer = null
            }, wait)
            if (callNow) {
                func.apply(context, args)
            }
        } else {
            timer = setTimeout(function() {
                func.apply(context, args)
            }, wait)
        }
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
    let timer
    let result
    
    const debounced = function(...args) {
        if (timer) clearTimeout(timer)

        if (immediate) {
            let callNow = !timer
            timer = setTimeout(() => {
                timer = null
            }, wait)
            if (callNow) {
                result = func.apply(this, args)
            }
        } else {
            timer = setTimeout(() => {
                func.apply(this, args)
            }, wait)
        }
        return result
    }

    debounced.cancel = function() {
        clearTimeout(timer)
        timer = null
    }

    return debounced
}


window.onscroll = debounce(function() {
    console.log('debounce');
}, 1000);