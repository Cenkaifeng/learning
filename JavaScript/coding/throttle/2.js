function throttle(fn, wait, options = {}) {
    let timer, ctx, result, args
    let previous = 0

    const later = function () {
        previous = options.leading === false ? 0 : +new Date()
        timer = null
        result = fn.apply(ctx, args)
        if (!timer) context = args = null
    }

    const throttled = function () {
        const now = +new Date()
        if (!previous && options.leading !== false) {
            previous = now
        }
        const remain = wait - (now - previous)
        context = this
        args = arguments

        if (remain <= 0 || remain > wait) {
            if (timer) {
                clearTimeout(timer)
                timer = null
            }
            previous = now
            result = fn.apply(ctx, args)
            if (!timer) context = args = null
        } else if (!timer && options.trailing !== false) {
            timer = setTimeout(later, wait)
        }

        return result
    }

    throttled.cancel = function () {
        clearTimeout(timer)
        previous = 0
        timer = null
    }

    return throttled
}

function throttle(fn, wait, options = {}) {
    let timer

    const throttled = function (...args) {
        const now = +new Date()
        let result
        if (!previous && options.leading !== false) {
            previous = now
        }
        const remain = wait - (now - previous)

        if (remain <= 0 || remain > wait) {
            if (timer) {
                clearTimeout(timer)
                timer = null
            }
            previous = now
            result = fn.apply(this, args)
        } else if (!timer && options.trailing !== false) {
            timer = setTimeout(() => {
                previous = options.leading === false ? 0 : +new Date()
                timer = null
                result = fn.apply(this, args)
            }, wait)
        }

        return result
    }

    throttled.cancel = function () {
        clearTimeout(timer)
        timer = null
        previous = 0
    }

    return throttled
}

function throttle(fn, wait, options = {}) {
    let timer

    const throttled = function (...args) {
        const now = +new Date()
        let result

        if (!previous && options.leading !== false) {
            previous = now
        }

        const remain = wait - (now - previous)
        if (remain <= 0 || remain > wait) {
            if (timer) {
                clearTimeout(timer)
                timer = null
            }
            previous = now
            result = fn.apply(this, args)
        } else if (!timer && options.trailing !== false) {
            timer = setTimeout(() => {
                timer = null
                previous = options.leading === false ? 0 : +new Date()
                result = fn.apply(this, args)
            }, wait)
        }

        return result
    }

    throttled.cancel = function () {
        clearTimeout(timer)
        timer = null
        previous = 0
    }

    return throttled
}

function throttle(fn, wait, options = {}) {
    let timer

    const cancel = () => {
        clearTimeout(timer)
        timer = null
    }

    const throttled = function(...args) {
        const now = +new Date()
        let result

        if (!previous && options.leading === false) {
            previous = now
        }

        const remain = wait - (now - previous)
        if (remain <= 0 || remain > wait) {
            if (timer) {
                cancel()
            }
            previous = now
            result = fn.apply(this, args)
        } else if (!timer && options.leading !== trailing) {
            timer = setTimeout(() => {
                timer = null
                previous = options.leading === false ? 0 : +new Date()
                result = fn.apply(this, args)
            }, wait)
        }

        return result
    }

    throttled.cancel = function() {
        cancel()
        previous = 0
    }

    return throttled
}

function throttle(fn, wait, options = {}) {
    let timer

    const throttled = function(...args) {
        const now = +new Date()
        let result
        if (!previous && options.leading === false) {
            previous = now
        }

        const remain = wait - (now - previous)
        if (remain <= 0 || remain > wait) {
            if (timer) {
                clearTimeout(timer)
                timer = null
            }
            previous = now
            result = fn.apply(this, args)
        } else if (!timer && options.trailing !== false) {
            timer = setTimeout(() => {
                previous = options.leading === false ? 0 : +new Date()
                timer = null
                result = fn.apply(this, args)
            }, wait)
        }

        return result
    }

    throttled.cancel = function() {
        clearTimeout(timer)
        timer = null
        previous = 0
    }

    return 
}