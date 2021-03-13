declare global {
    interface Window {
        url(domain: string, https?: boolean): (port?: number) => (path?: string | string[]) => string;
        urlQuery(url?: string): (queryValueObject: { [key: string]: any }) => string;
        urlHash(url?: string): (hash: string) => string;
    }
}

const extend = (o: Window & typeof globalThis) => {

    const
        url = (domain: string, https: boolean = false) => {
            const _urlNoPort: string = `${https ? "https" : "http"}://${encodeURIComponent(domain)}`;
            return (port: number = 0) => {
                const _url: string = `${_urlNoPort}${port === 0 ? "" : `:${port}`}`
                return (path: string | string[] = []): string => {
                    path.constructor == String && (path = path.split("/"));
                    let _path =
                        (path as string[])
                            .filter(s => s.trim())
                            .map(s => encodeURIComponent(s))
                            .join("/");
                    _path !== "" && (_path += "/");
                    return `${_url}/${_path}`
                };
            }
        },

        urlQuery = (url: string = "") => {
            url = url.replace(/\?+$/g, "");
            return (queryValueObject: { [key: string]: any } = {}): string => {
                const queryVals = Object.keys(queryValueObject)
                    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queryValueObject[key])}`);
                return queryVals.length === 0 ? url : `${url}?${queryVals.join('&')}`;
            }
        },

        urlHash = (url: string = "") => {
            url = url.replace(/#+$/g, "");
            return (hash: string = ""): string => (hash === "" ? url : `${url}#${encodeURIComponent(hash)}`);
        };

    o.url = url;
    o.urlQuery = urlQuery;
    o.urlHash = urlHash;
    return true;
}

export { extend }