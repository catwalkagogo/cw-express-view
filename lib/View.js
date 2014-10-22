var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Core = require('cw-core');
var Class = Core.Class;
var ViewBase = require('./ViewBase');

var View = (function (_super) {
    __extends(View, _super);
    function View(app, view) {
        if (typeof view === "undefined") { view = null; }
        _super.call(this, app);
        if (view == null) {
            view = Class.getClassName(this).toLocaleLowerCase();
        }

        this._view = view;
    }
    View.forge = function (app, view) {
        var viewClass = require('views/' + view);
        return new viewClass(app);
    };

    View.prototype.response = function (res) {
        this.render(function (error, html) {
            if (error) {
                console.log(error);
            }
            res.send(html);
        });
    };

    View.prototype.renderContent = function (data, callback) {
        this.app.render(this._view, data, function (err, html) {
            if (err) {
                console.log(err);
            }
            console.log('html:' + html);
            if (callback) {
                callback(err, html);
            }
        });
    };


    Object.defineProperty(View.prototype, "view", {
        get: function () {
            return this.view;
        },
        set: function (view) {
            this._view = view;
        },
        enumerable: true,
        configurable: true
    });
    return View;
})(ViewBase);

module.exports = View;
//# sourceMappingURL=View.js.map
