declare global {
    interface Window {
        isNull(value: any): boolean;
        isNullOrEmpty(value: any): boolean;
        isNullOrWhitespace(value: any): boolean;
        isValid(value: any): boolean;
    }
}

const extend = (o: Window & typeof globalThis) => {

    const
        isNull = (value: any): boolean => [null, undefined].indexOf(value) != -1,

        isNullOrEmpty = (value: any): boolean => isNull(value) || String(value) == "",

        isNullOrWhitespace = (value: any): boolean => isNull(value) || String(value).trim() == "",

        isValid = (value: any): boolean => !isNull(value) && (function () {
            switch (value.constructor) {
                case String: return (value as String).trim() != "";
                case Number: return !isFinite(value);
                case Object: return Object.keys(value).length > 0;
                case Array: return (value as any[]).filter(v => v).length > 0;
                case Date: return !isNaN((value as Date).getTime());
                //case Boolean: return value;
            }
            return true;
        }());

    o.isNull = isNull;
    o.isNullOrEmpty = isNullOrEmpty;
    o.isNullOrWhitespace = isNullOrWhitespace;
    o.isValid = isValid;
    return true;
}

export { extend }