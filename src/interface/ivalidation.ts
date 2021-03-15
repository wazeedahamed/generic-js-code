interface IValidationGlobal {
    /**
     * Checks the value is `null` or `undefined`
     * @param value value to check
     */
    isNull(value: any): boolean,

    /**
     * Checks the value is `null` or `undefined` or `empty`
     * @param value value to check
     */
    isNullOrEmpty(value: any): boolean,

    /**
     * Checks the value is `null` or `undefined` or `empty` or `whitespace`
     * @param value value to check
     */
    isNullOrWhitespace(value: any): boolean,

    /**
     * Validate a value, return `true` for valid
     * @param value value to check
     */
    isValid(value: any): boolean,

    /**
     * Validate a value, return `true` for invalid
     * @param value value to check
     */
    isInvalid(value: any): boolean,

    /**
     * Grt `default` value when `value` is invalid
     * @param value value to check
     * @param _default default value
     */
    tryGetValue<T1, T2 = null>(value: T1, _default: T2): T1 | T2;
}

export { IValidationGlobal }
