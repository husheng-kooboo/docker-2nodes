exports.command = function (name, callback) {
    callback = callback || function() {}
    this.execute (function(name){
        return document.querySelectorAll(selector).length
    }, [name], function(result){
        callback.call(this, result)
    })
    return this
}