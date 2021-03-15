import { Validation } from "../class/validation";
import { IValidationGlobal } from "../interface/ivalidation";

declare global {
    interface Window extends IValidationGlobal { }
}

const define = (o: Window & typeof globalThis) => {
    const validator = new Validation();
    o.isNull = validator.isNull;
    o.isNullOrEmpty = validator.isNullOrEmpty;
    o.isNullOrWhitespace = validator.isNullOrWhitespace;
    o.isValid = validator.isValid;
    o.isInvalid = validator.isInvalid;
    o.tryGetValue = validator.tryGetValue;
    return true;
}

export { define }