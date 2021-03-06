exports.command = function (selector, callback) {
    callback = callback || function() {}
    this.execute (function(selector){
        return document.querySelectorAll(selector).length
    }, [selector], function(result){
        callback.call(this, result)
    })
    return this
}