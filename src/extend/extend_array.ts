declare global {
    interface Array<T> {
        unique(uniqueIDKey?: string): Array<T>;
        first(): T, last(): T;
    }
}

const extend = (o: typeof Array) => {
    // Extend unique prototype to JS String
    o.prototype.unique = function (uniqueIDKey?: string) {
        // For Array of Objects
        if (uniqueIDKey) {
            return this.reduce(
                (result, entry) => (
                    result.unids.indexOf(entry[uniqueIDKey]) == -1 && (result.unids.push(entry[uniqueIDKey]), result.uobjs.push(entry)),
                    result
                ),
                { unids: [], uobjs: [] }
            ).uobjs;
        }
        // For primitive types
        return this.reduce(
            (result, entry) => (
                result.indexOf(entry) == -1 && (result.push(entry)),
                result
            ),
            []
        );
    }
    // Extend first, last
    o.prototype.first = function () { return this[0]; }
    o.prototype.last = function () { return this[this.length - 1]; }
    return true;
}

export { extend };
