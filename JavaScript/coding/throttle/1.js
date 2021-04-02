function throttle(func, wait) {
    let previous = 0
    return function(...args) {
        let now = +new Date()
        if (now - previous > wait) {
            func.apply(this, args)
            previous = now
        }
    }
}

function throttle(func, wait) {
    let timer = null
    return function(...args) {
        if (!timer) {
            timer = setTimeout(() => {
                timer = null
                func.apply(this, args)
            }, wait)
        }
    }
}

function throttle(func, wait, options = {}) {
    var timer, ctx, args, result
    var previous = 0

    const later = function() {
        previous = +new Date()
        timer = null
        func.apply(ctx, args)
    }

    const throttled = function() {
        previous = +new Date()
        let remain = wait - (now - previous)
        ctx = this
        args = arguments
        if (remain <= 0 || remain > wait) {
            if (timer) {
                clearTimeout(timer)
                timer = null
            }
            previous = now
            func.apply(ctx, args)
        } else if (!timer) {
            timer = setTimeout(later, remain)
        }
    }

    return throttled
}

function throttle(func, wait, options = {}) {
    let timer, context, args, result
    let previous = 0

    const later = function() {
        previous = options.leading === false
            ? 0
            : +new Date()
        timer = null
        func.apply(context, args)
        if (!timer) context = args = null
    }

    const throttled = function() {
        const now = +new Date()
        if (!previous && options.leading === false)
            previous = now
        const remain = wait - (now - previous)
        context = this
        args = arguments
        if (remain <= 0 || remain > wait) {
            if (timer) {
                clearTimeout(timer)
                timer = null
            }
            previous = now
            func.apply(context, args)
            if (!timer) context = args = null
        } else if (!timer && options.trailing !== false) {
            timer = setTimeout(later, remain)
        }
    }

    throttled.cancel = function() {
        clearTimeout(timer)
        previous = 0
        timer = null
    }

    return throttled
}