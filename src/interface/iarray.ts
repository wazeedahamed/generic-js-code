interface IArrayGlobal<T> {
    /**
     * Get Array unique items
     * @param uniqueIDKey optional unique id key when dealing with array of objects
     */
    unique(uniqueIDKey?: string): Array<T>,

    /**
     * Get only valid elements
     */
    valid(): Array<T>,

    /**
     * Get first element
     */
    first(): T, 
    
    /**
     * Get last element
     */
    last(): T;
}

export { IArrayGlobal }
