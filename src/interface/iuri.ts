interface IURI {

    /**
     * Set protocol to `http:`. This is considered when host is not `/` or `""`.
     * Reset `host` `port` `path` `search` `hash`
     */
    http(): IURI;

    /**
     * Set protocol to `https:`. This is considered when host is not `/` or `""`.
     * Reset `host` `port` `path` `search` `hash`
     */
    https(): IURI;

    /**
     * Set url domain.
     * Reset `port` `path` `search` `hash`
     * @param hostName domain of url to set. e.g, `www.example.com`, `/`, `""`
     */
    host(hostName: string): IURI;

    /**
     * Set or unset url port.
     * Reset `path` `search` `hash`
     * @param portNumber port number to set. This is considered when host is not `/` or `""`.
     */
    port(portNumber?: number): IURI;

    /**
     * Set or unset url path.
     * Reset `search` `hash`
     * @param path string path with `/` delimiter between segments , or string array with path segments.
     */
    path(path?: string | string[]): IURI;

    /**
     * Set or unset url query string.
     * Reset `hash`
     * @param queryObj query string, or object with key value pair { `paramKey`: `paramValue` }.
     */
    search(queryObj?: string | { [key: string]: any }): IURI;

    /**
     * Set or unset url hash.
     * @param hashString hash value to set.
     */
    hash(hashString: string): IURI;

    /**
     * Clear url
     * @param fromLevel defualts to `1`. 1. from protocol, 2. from host, 3. from port, 4. from path, 5. from search, 6. hash.
     */
    clear(fromLevel?: number): IURI;

    /**
     * URI - get url string.
     */
    toString(): string;
}

interface IURLGlobal {
    url(domain: string, https?: boolean): (port?: number) => (path?: string | string[]) => string;
    urlQuery(url?: string): (queryValueObject: { [key: string]: any }) => string;
    urlHash(url?: string): (hash: string) => string;
    encodeURITrimmed(value: string): string;
}

export { IURI, IURLGlobal }
