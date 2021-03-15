import { IValidationGlobal } from "../interface/ivalidation";

/**
 * Validate a value in different scenarios
 * @param value value to check
 * @returns `true` when value is valid
 */
function _validate(value: any): boolean {
    switch (value.constructor) {
        case String: return (value as String).trim() != "";
        case Number: return isFinite(value);
        case Object: return Object.keys(value).length > 0 && (() => {
            for (const prop in value) {
                if (window.isValid(value[prop])) {
                    return true;
                }
            }
            return false;
        })();
        case Array: return (value as any[]).filter(v => window.isValid(v)).length > 0;
        case Date: return isFinite((value as Date).getTime());
        //case Boolean: return value;
    }
    return true;
}

/**
 * Do not use `this` in this class as this will be regisered with window
 */
class Validation implements IValidationGlobal {
    
    isNull(value: any): boolean {
        return [null, undefined].indexOf(value) != -1
    }
    isNullOrEmpty(value: any): boolean {
        return window.isNull(value) || String(value) == "";
    }
    isNullOrWhitespace(value: any): boolean {
        return window.isNull(value) || String(value).trim() == ""
    }
    isValid(value: any): boolean {
        return !window.isNull(value) && _validate(value);
    }
    isInvalid(value: any): boolean {
        return !window.isValid(value)
    }
    tryGetValue<T1, T2 = null>(value: T1, _default: T2): T1 | T2 {
        return window.isValid(value) ? value : _default;
    }
}

export { Validation }