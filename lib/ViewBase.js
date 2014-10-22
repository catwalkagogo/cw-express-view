var Enumerable = require('linq');
var Promise = require('./Promise');
var Q = require('q');
var _ = require('underscore');

var ViewBase = (function () {
    function ViewBase(app, view) {
        if (typeof view === "undefined") { view = null; }
    }
    ViewBase.prototype.render = function (callback) {
        var _this = this;
        var data = this._data;
        var children = Enumerable.from(this._data).where(function (pair) {
            return pair.value.render;
        }).toArray();

        var tasks = [];
        children.forEach(function (pair) {
            var child = pair.value;
            var key = pair.key;
            tasks.push(Promise.createPromise(function (d) {
                _this.onRenderChild(child);
                child.render(function (err, html) {
                    if (err) {
                        console.log(err);
                    }
                    d.resolve({
                        name: key,
                        html: html
                    });
                });
            }));
        });

        Q.all(tasks).then(function (results) {
            results.forEach(function (result) {
                data[result['name']] = result['html'];
            });

            _this.renderContent(data, callback);
        });
    };

    ViewBase.prototype.renderContent = function (data, callback) {
    };

    ViewBase.prototype.onRenderChild = function (view) {
    };

    Object.defineProperty(ViewBase.prototype, "app", {
        get: function () {
            return this._app;
        },
        enumerable: true,
        configurable: true
    });

    ViewBase.prototype.set = function (key, value) {
        if (typeof value === "undefined") { value = null; }
        if (_.isString(key) || _.isNumber(key)) {
            console.log('set ' + key);
            this._data[key] = value;
        } else if (key instanceof Object || key instanceof Array) {
            this._data = _.extend(this._data, key);
        }
        return this;
    };

    ViewBase.prototype.get = function (key) {
        if (typeof key === "undefined") { key = null; }
        if (!key) {
            return this._data;
        } else {
            return this._data[key];
        }
    };
    return ViewBase;
})();

module.exports = ViewBase;
//# sourceMappingURL=ViewBase.js.map
