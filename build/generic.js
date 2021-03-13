define("extend/method_validation", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.extend = void 0;
    var extend = function (o) {
        var isNull = function (value) { return [null, undefined].indexOf(value) != -1; }, isNullOrEmpty = function (value) { return isNull(value) || String(value) == ""; }, isNullOrWhitespace = function (value) { return isNull(value) || String(value).trim() == ""; }, isValid = function (value) { return !isNull(value) && (function () {
            switch (value.constructor) {
                case String: return value.trim() != "";
                case Number: return !isFinite(value);
                case Object: return Object.keys(value).length > 0;
                case Array: return value.filter(function (v) { return v; }).length > 0;
                case Date: return !isNaN(value.getTime());
                //case Boolean: return value;
            }
            return true;
        }()); };
        o.isNull = isNull;
        o.isNullOrEmpty = isNullOrEmpty;
        o.isNullOrWhitespace = isNullOrWhitespace;
        o.isValid = isValid;
        return true;
    };
    exports.extend = extend;
});
define("extend/method_url", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.extend = void 0;
    var extend = function (o) {
        var url = function (domain, https) {
            if (https === void 0) { https = false; }
            var _urlNoPort = (https ? "https" : "http") + "://" + encodeURIComponent(domain);
            return function (port) {
                if (port === void 0) { port = 0; }
                var _url = "" + _urlNoPort + (port === 0 ? "" : ":" + port);
                return function (path) {
                    if (path === void 0) { path = []; }
                    path.constructor == String && (path = path.split("/"));
                    var _path = path
                        .filter(function (s) { return s.trim(); })
                        .map(function (s) { return encodeURIComponent(s); })
                        .join("/");
                    _path !== "" && (_path += "/");
                    return _url + "/" + _path;
                };
            };
        }, urlQuery = function (url) {
            if (url === void 0) { url = ""; }
            url = url.replace(/\?+$/g, "");
            return function (queryValueObject) {
                if (queryValueObject === void 0) { queryValueObject = {}; }
                var queryVals = Object.keys(queryValueObject)
                    .map(function (key) { return encodeURIComponent(key) + "=" + encodeURIComponent(queryValueObject[key]); });
                return queryVals.length === 0 ? url : url + "?" + queryVals.join('&');
            };
        }, urlHash = function (url) {
            if (url === void 0) { url = ""; }
            url = url.replace(/#+$/g, "");
            return function (hash) {
                if (hash === void 0) { hash = ""; }
                return (hash === "" ? url : url + "#" + encodeURIComponent(hash));
            };
        };
        o.url = url;
        o.urlQuery = urlQuery;
        o.urlHash = urlHash;
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
