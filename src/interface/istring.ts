interface IStringGlobal {
    /**
     * Format string with key value pair. e.g, "{0} {1}".format(["one", "two"]) = "one two"
     * @param replacement Array or Key Value pair for replacement
     */
    format(replacement: Array<any> | Object): string;
}

export { IStringGlobal }
