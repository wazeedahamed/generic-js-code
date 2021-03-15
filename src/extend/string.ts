import { IStringGlobal } from "../interface/istring";

declare global {
    interface String extends IStringGlobal { }
}

const extend = (o: typeof String) => {
    o.prototype.format = function (replacement: any): string {
        return String(this).replace(/({[^}]+})/g, function (match) {
            return replacement[match.replace(/^{|}$/g, "")] || match;
        });
    }
    return true;
}

export { extend };
