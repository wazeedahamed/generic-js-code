define("extend/method_validation", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.extend = void 0;
    var extend = function (o) {
        var validator = new /** @class */ (function () {
            function class_1() {
                var _this = this;
                this.isNull = function (value) { return [null, undefined].indexOf(value) != -1; };
                this.isNullOrEmpty = function (value) { return _this.isNull(value) || String(value) == ""; };
                this.isNullOrWhitespace = function (value) { return _this.isNull(value) || String(value).trim() == ""; };
                this.isValid = function (value) { return !_this.isNull(value) && (function () {
                    switch (value.constructor) {
                        case String: return value.trim() != "";
                        case Number: return isFinite(value);
                        case Object: return Object.keys(value).length > 0;
                        case Array: return value.filter(function (v) { return v; }).length > 0;
                        case Date: return isFinite(value.getTime());
                        //case Boolean: return value;
                    }
                    return true;
                }()); };
                this.isInvalid = function (value) { return !_this.isValid(value); };
            }
            class_1.prototype.tryGetValue = function (value, _default) { return (this.isValid(value) ? value : _default); };
            ;
            return class_1;
        }());
        o.isNull = validator.isNull;
        o.isNullOrEmpty = validator.isNullOrEmpty;
        o.isNullOrWhitespace = validator.isNullOrWhitespace;
        o.isValid = validator.isValid;
        o.isInvalid = validator.isInvalid;
        o.tryGetValue = validator.tryGetValue;
        return true;
    };
    exports.extend = extend;
});
define("extend/method_url", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.extend = void 0;
    var extend = function (o) {
        var URI = /** @class */ (function () {
            function URI() {
                this._protocol = "";
                this._hostname = "";
                this._port = undefined;
                this._pathname = "";
                this._search = "";
                this._hash = "";
            }
            URI.prototype.toString = function () {
                var url = "";
                window.isValid(this._hostname) && (decodeURIComponent(this._hostname) === "/" ?
                    (url = "/") :
                    (window.isValid(this._protocol) && (url += this._protocol + "//"),
                        url += "" + this._hostname,
                        window.isValid(this._port) && (url += ":" + this._port),
                        url += "/"));
                window.isValid(this._pathname) && (url += this._pathname + "/");
                window.isValid(this._search) && (url += "" + this._search);
                window.isValid(this._hash) && (url += "#" + this._hash);
                return url;
            };
            URI.prototype.http = function () { return this._protocol = "http:", this.clear(2); };
            URI.prototype.https = function () { return this._protocol = "https:", this.clear(2); };
            URI.prototype.host = function (hostName) { return this._hostname = encodeURIComponent(window.tryGetValue(hostName, "").trim()), this.clear(3); };
            URI.prototype.port = function (portNumber) { return this._port = window.tryGetValue(Math.floor(Math.abs(+portNumber)), undefined) || undefined, this.clear(4); };
            URI.prototype.path = function (path) {
                if (path === void 0) { path = []; }
                switch (true) {
                    case path.constructor === String:
                        {
                            this._pathname = path.trim().split(/[\/\\]/g).valid().map(window.encodeURITrimmed).join("/");
                        }
                        break;
                    case path.constructor === Array:
                        {
                            this._pathname = path.valid().map(window.encodeURITrimmed).join("/");
                        }
                        break;
                    default: {
                        this._pathname = "";
                    }
                }
                return this.clear(5);
            };
            URI.prototype.search = function (queryObj) {
                if (queryObj === void 0) { queryObj = {}; }
                switch (true) {
                    case queryObj.constructor === String && window.isValid(queryObj):
                        {
                            this._search = ("?" + encodeURI(queryObj.trim())).replace(/^\?+/g, "?");
                        }
                        break;
                    case queryObj.constructor === Object && window.isValid(queryObj):
                        {
                            var queryVals = Object.keys(queryObj)
                                .map(function (key) { return window.encodeURITrimmed(key) + "=" + encodeURIComponent(queryObj[key]); });
                            this._search = "?" + queryVals.join('&');
                        }
                        break;
                    default: {
                        this._search = "";
                    }
                }
                return this.clear(6);
            };
            URI.prototype.hash = function (hashString) { return this._hash = encodeURIComponent(window.tryGetValue(hashString, "")), this.clear(7); };
            URI.prototype.clear = function (fromLevel) {
                if (fromLevel === void 0) { fromLevel = 1; }
                // 1 - protocol, 2 - host, 3 - port, 4 - path, 5 - search, 6 - hash
                fromLevel < 2 && (this._protocol = "");
                fromLevel < 3 && (this._hostname = "");
                fromLevel < 4 && (this._port = undefined);
                fromLevel < 5 && (this._pathname = "");
                fromLevel < 6 && (this._search = "");
                fromLevel < 7 && (this._hash = "");
                return this;
            };
            return URI;
        }());
        var buildURL = new /** @class */ (function () {
            function class_2() {
                var _this = this;
                this.__uri = null;
                this.url = function (host, https) {
                    if (https === void 0) { https = false; }
                    return function (port) {
                        var _urlNoPort = (https ? new URI().https() : new URI().http()).host(host).port(port);
                        return function (path) {
                            if (path === void 0) { path = []; }
                            return _urlNoPort.path(path).toString();
                        };
                    };
                };
                this.urlQuery = function (url) {
                    if (url === void 0) { url = ""; }
                    url = url.replace(/\?+$/g, "");
                    return function (queryValueObject) {
                        if (queryValueObject === void 0) { queryValueObject = {}; }
                        return "" + url + _this._uri().clear().search(queryValueObject);
                    };
                };
                this.urlHash = function (url) {
                    if (url === void 0) { url = ""; }
                    url = url.replace(/#+$/g, "");
                    return function (hash) {
                        if (hash === void 0) { hash = ""; }
                        return "" + url + _this._uri().clear().hash(hash);
                    };
                };
                this.encodeURITrimmed = function (value) { return encodeURIComponent(String(value).trim()); };
            }
            class_2.prototype._uri = function () {
                return (this.__uri || (this.__uri = new URI(), this.__uri));
            };
            return class_2;
        }());
        o.url = buildURL.url;
        o.urlQuery = buildURL.urlQuery;
        o.urlHash = buildURL.urlHash;
        o.encodeURITrimmed = buildURL.encodeURITrimmed;
        o.URI = URI;
        return true;
    };
    exports.extend = extend;
});
define("extend/extend_string", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.extend = void 0;
    var extend = function (o) {
        // Extend format prototype to JS String
        o.prototype.format = function (replacement) {
            return String(this).replace(/({[^}]+})/g, function (match) {
                return replacement[match.replace(/^{|}$/g, "")] || match;
            });
        };
        return true;
    };
    exports.extend = extend;
});
define("extend/extend_array", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.extend = void 0;
    var extend = function (o) {
        var nulls = [null, undefined];
        // Extend unique prototype to JS String
        o.prototype.unique = function (uniqueIDKey) {
            // For Array of Objects
            if (uniqueIDKey) {
                return this.reduce(function (result, entry) { return (result.unids.indexOf(entry[uniqueIDKey]) == -1 && (result.unids.push(entry[uniqueIDKey]), result.uobjs.push(entry)),
                    result); }, { unids: [], uobjs: [] }).uobjs;
            }
            // For primitive types
            return this.reduce(function (result, entry) { return (result.indexOf(entry) == -1 && (result.push(entry)),
                result); }, []);
        };
        o.prototype.valid = function () {
            return this.reduce(function (result, entry) { return (window.isValid(entry) && result.push(entry),
                result); }, []);
        };
        // Extend first, last
        o.prototype.first = function () { return this[0]; };
        o.prototype.last = function () { return this[this.length - 1]; };
        return true;
    };
    exports.extend = extend;
});
define("index", ["require", "exports", "extend/method_validation", "extend/method_url", "extend/extend_string", "extend/extend_array"], function (require, exports, Method_Validation, Method_Url, Extend_String, Extend_Array) {
    "use strict";
    exports.__esModule = true;
    exports.extend = void 0;
    var extend = function () {
        Method_Validation.extend(window);
        Method_Url.extend(window);
        Extend_String.extend(String);
        Extend_Array.extend(Array);
    };
    exports.extend = extend;
});
