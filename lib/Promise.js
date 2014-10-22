var Q = require('q');

var Promise = (function () {
    function Promise() {
    }
    Promise.createPromise = function (func) {
        var args = [];
        for (var _i = 0; _i < (arguments.length - 1); _i++) {
            args[_i] = arguments[_i + 1];
        }
        var d = Q.defer();
        var a = [d].concat(args);
        console.log(a);
        func.apply(func, a);
        return d.promise;
    };
    return Promise;
})();

module.exports = Promise;
//# sourceMappingURL=Promise.js.map
