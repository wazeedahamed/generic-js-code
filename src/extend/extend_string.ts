declare global {
    interface String {
        format(replacement: Array<any> | Object): string;
    }
}

const extend = (o: typeof String) => {
    // Extend format prototype to JS String
    o.prototype.format = function (replacement: any): string {
        return String(this).replace(/({[^}]+})/g, function (match) {
            return replacement[match.replace(/^{|}$/g, "")] || match;
        });
    }
    return true;
}

export { extend };
