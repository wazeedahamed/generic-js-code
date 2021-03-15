var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
define("interface/iarray", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
define("extend/array", ["require", "exports"], function (require, exports) {
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
define("interface/istring", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
define("extend/string", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.extend = void 0;
    var extend = function (o) {
        o.prototype.format = function (replacement) {
            return String(this).replace(/({[^}]+})/g, function (match) {
                return replacement[match.replace(/^{|}$/g, "")] || match;
            });
        };
        return true;
    };
    exports.extend = extend;
});
define("interface/ivalidation", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
define("class/validation", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.Validation = void 0;
    /**
     * Validate a value in different scenarios
     * @param value value to check
     * @returns `true` when value is valid
     */
    function _validate(value) {
        switch (value.constructor) {
            case String: return value.trim() != "";
            case Number: return isFinite(value);
            case Object: return Object.keys(value).length > 0 && (function () {
                for (var prop in value) {
                    if (window.isValid(value[prop])) {
                        return true;
                    }
                }
                return false;
            })();
            case Array: return value.filter(function (v) { return window.isValid(v); }).length > 0;
            case Date: return isFinite(value.getTime());
            //case Boolean: return value;
        }
        return true;
    }
    /**
     * Do not use `this` in this class as this will be regisered with window
     */
    var Validation = /** @class */ (function () {
        function Validation() {
        }
        Validation.prototype.isNull = function (value) {
            return [null, undefined].indexOf(value) != -1;
        };
        Validation.prototype.isNullOrEmpty = function (value) {
            return window.isNull(value) || String(value) == "";
        };
        Validation.prototype.isNullOrWhitespace = function (value) {
            return window.isNull(value) || String(value).trim() == "";
        };
        Validation.prototype.isValid = function (value) {
            return !window.isNull(value) && _validate(value);
        };
        Validation.prototype.isInvalid = function (value) {
            return !window.isValid(value);
        };
        Validation.prototype.tryGetValue = function (value, _default) {
            return window.isValid(value) ? value : _default;
        };
        return Validation;
    }());
    exports.Validation = Validation;
});
define("method/validation", ["require", "exports", "class/validation"], function (require, exports, validation_1) {
    "use strict";
    exports.__esModule = true;
    exports.define = void 0;
    var define = function (o) {
        var validator = new validation_1.Validation();
        o.isNull = validator.isNull;
        o.isNullOrEmpty = validator.isNullOrEmpty;
        o.isNullOrWhitespace = validator.isNullOrWhitespace;
        o.isValid = validator.isValid;
        o.isInvalid = validator.isInvalid;
        o.tryGetValue = validator.tryGetValue;
        return true;
    };
    exports.define = define;
});
define("interface/iuri", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
define("class/uri", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.URLMethods = exports.URI = void 0;
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
    exports.URI = URI;
    var URLMethods = /** @class */ (function () {
        function URLMethods() {
        }
        URLMethods.prototype.url = function (domain, https) {
            if (https === void 0) { https = false; }
            return function (port) {
                var _urlNoPort = (https ? new window.URI().https() : new window.URI().http()).host(domain).port(port);
                return function (path) {
                    if (path === void 0) { path = []; }
                    return _urlNoPort.path(path).toString();
                };
            };
        };
        URLMethods.prototype.urlQuery = function (url) {
            if (url === void 0) { url = ""; }
            url = url.replace(/\?+$/g, "");
            return function (queryValueObject) {
                if (queryValueObject === void 0) { queryValueObject = {}; }
                return "" + url + new window.URI().search(queryValueObject);
            };
        };
        URLMethods.prototype.urlHash = function (url) {
            if (url === void 0) { url = ""; }
            url = url.replace(/#+$/g, "");
            return function (hash) {
                if (hash === void 0) { hash = ""; }
                return "" + url + new window.URI().hash(hash);
            };
        };
        URLMethods.prototype.encodeURITrimmed = function (value) {
            return encodeURIComponent(String(value).trim());
        };
        return URLMethods;
    }());
    exports.URLMethods = URLMethods;
});
define("method/url", ["require", "exports", "class/uri"], function (require, exports, uri_1) {
    "use strict";
    exports.__esModule = true;
    exports.define = void 0;
    var define = function (o) {
        var buildURL = new uri_1.URLMethods();
        o.url = buildURL.url;
        o.urlQuery = buildURL.urlQuery;
        o.urlHash = buildURL.urlHash;
        o.encodeURITrimmed = buildURL.encodeURITrimmed;
        o.URI = uri_1.URI;
        return true;
    };
    exports.define = define;
});
define("interface/ixml", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
define("class/xml-tag", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.XMLTag = void 0;
    var XMLTag = /** @class */ (function () {
        function XMLTag(tagName, parent) {
            if (parent === void 0) { parent = {
                name: "root",
                data: {
                    text: {},
                    html: {},
                    child: {},
                    attr: {},
                    prop: {},
                    meta: {
                        parts: 0
                    }
                }
            }; }
            var data = parent.data, meta = data.meta;
            this.parent = parent;
            this.info = this.newData();
            this.tag = { name: tagName, data: this.info };
            data.child[++meta.parts] = this.tag;
        }
        XMLTag.prototype.text = function (text) {
            var info = this.info, meta = info.meta;
            info.text[++meta.parts] = text;
            return this;
        };
        XMLTag.prototype.html = function (html) {
            var info = this.info, meta = info.meta;
            info.html[++meta.parts] = html;
            return this;
        };
        XMLTag.prototype.prop = function (prop) {
            if (prop === void 0) { prop = {}; }
            var info = this.info;
            info.prop = __assign(__assign({}, info.prop), prop);
            return this;
        };
        XMLTag.prototype.attr = function (attr) {
            if (attr === void 0) { attr = {}; }
            var info = this.info;
            info.attr = __assign(__assign({}, info.attr), attr);
            return this;
        };
        XMLTag.prototype.another = function () {
            var _a = this, info = _a.info, tag = _a.tag, newData = _a.newData;
            info.meta.parts > 0 && (this.info = newData(),
                tag.data.another = this.info);
            return this;
        };
        XMLTag.prototype.child = function (tagName) {
            return new XMLTag(tagName, this.tag);
        };
        XMLTag.prototype.sibling = function (tagName) {
            return new XMLTag(tagName, this.parent);
        };
        XMLTag.prototype.toString = function () {
            throw Error("Not Implemented: toString");
            return "";
        };
        XMLTag.prototype.newData = function () {
            return {
                text: {},
                html: {},
                child: {},
                attr: {},
                prop: {},
                meta: {
                    parts: 0
                }
            };
        };
        return XMLTag;
    }());
    exports.XMLTag = XMLTag;
});
define("class/xml", ["require", "exports", "class/xml-tag"], function (require, exports, xml_tag_1) {
    "use strict";
    exports.__esModule = true;
    exports.XML = void 0;
    var XML = /** @class */ (function () {
        function XML() {
        }
        XML.prototype.root = function (tagName) {
            return new xml_tag_1.XMLTag(tagName);
        };
        return XML;
    }());
    exports.XML = XML;
});
define("method/xml", ["require", "exports", "class/xml", "class/xml-tag"], function (require, exports, xml_1, xml_tag_2) {
    "use strict";
    exports.__esModule = true;
    exports.define = void 0;
    var define = function (o) {
        function toXMLString(xmlObj) {
            var xml = new window.XML().root('root');
            throw Error('Method Not Implemented: toXMLString');
            return "";
        }
        o.XML = xml_1.XML;
        o.XMLTag = xml_tag_2.XMLTag;
        o.toXMLString = toXMLString;
        return true;
    };
    exports.define = define;
});
define("index", ["require", "exports", "extend/array", "extend/string", "method/validation", "method/url", "method/xml"], function (require, exports, array, string, validation, url, xml) {
    "use strict";
    exports.__esModule = true;
    exports.process = void 0;
    var process = function () {
        return array.extend(Array) &&
            string.extend(String) &&
            validation.define(window) &&
            url.define(window) &&
            xml.define(window);
    };
    exports.process = process;
});
