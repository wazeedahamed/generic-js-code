declare global {
    interface Window {
        isNull(value: any): boolean;
        isNullOrEmpty(value: any): boolean;
        isNullOrWhitespace(value: any): boolean;
        isValid(value: any): boolean;
        isInvalid(value: any): boolean;
        tryGetValue<T1, T2 = null>(value: T1, _default: T2): T1 | T2;
    }
}

const extend = (o: Window & typeof globalThis) => {

    const validator = new class {
        isNull = (value: any): boolean => [null, undefined].indexOf(value) != -1;
        isNullOrEmpty = (value: any): boolean => this.isNull(value) || String(value) == "";
        isNullOrWhitespace = (value: any): boolean => this.isNull(value) || String(value).trim() == "";
        isValid = (value: any): boolean => !this.isNull(value) && (function () {
            switch (value.constructor) {
                case String: return (value as String).trim() != "";
                case Number: return isFinite(value);
                case Object: return Object.keys(value).length > 0;
                case Array: return (value as any[]).filter(v => v).length > 0;
                case Date: return isFinite((value as Date).getTime());
                //case Boolean: return value;
            }
            return true;
        }());
        isInvalid = (value: any) => !this.isValid(value);
        tryGetValue<T1, T2 = null>(value: T1, _default: T2) { return (this.isValid(value) ? value : _default) };
    };

    o.isNull = validator.isNull;
    o.isNullOrEmpty = validator.isNullOrEmpty;
    o.isNullOrWhitespace = validator.isNullOrWhitespace;
    o.isValid = validator.isValid;
    o.isInvalid = validator.isInvalid;
    o.tryGetValue = validator.tryGetValue;
    return true;
}

export { extend }