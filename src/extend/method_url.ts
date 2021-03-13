declare global {
    interface Window {
        url(domain: string, https?: boolean): (port?: number) => (path?: string | string[]) => string;
        urlQuery(url?: string): (queryValueObject: { [key: string]: any }) => string;
        urlHash(url?: string): (hash: string) => string;
        encodeURITrimmed(value: string): string;
        URI: any;
    }
}

const extend = (o: Window & typeof globalThis) => {

    class URI {
        private _protocol: string = "";
        private _hostname: string = "";
        private _port?: number = undefined;
        private _pathname: string = "";
        private _search: string = "";
        private _hash: string = "";

        toString(): string {
            let url: string = "";
            window.isValid(this._hostname) && (
                decodeURIComponent(this._hostname) === "/" ?
                    (url = "/") :
                    (
                        window.isValid(this._protocol) && (url += `${this._protocol}//`),
                        url += `${this._hostname}`,
                        window.isValid(this._port) && (url += `:${this._port}`),
                        url += "/"
                    )
            );
            window.isValid(this._pathname) && (url += `${this._pathname}/`);
            window.isValid(this._search) && (url += `${this._search}`);
            window.isValid(this._hash) && (url += `#${this._hash}`);
            return url;
        }
        http() { return this._protocol = "http:", this.clear(2); }
        https() { return this._protocol = "https:", this.clear(2); }
        host(hostName: string) { return this._hostname = encodeURIComponent(window.tryGetValue(hostName, "").trim()), this.clear(3); }
        port(portNumber?: number) { return this._port = window.tryGetValue(Math.floor(Math.abs(+(portNumber as any))), undefined) || undefined, this.clear(4); }
        path(path: string | string[] = []) {
            switch (true) {
                case path.constructor === String: {
                    this._pathname = (path as string).trim().split(/[\/\\]/g).valid().map(window.encodeURITrimmed).join("/");
                } break;
                case path.constructor === Array: {
                    this._pathname = (path as string[]).valid().map(window.encodeURITrimmed).join("/");
                } break;
                default: {
                    this._pathname = "";
                }
            }
            return this.clear(5);
        }
        search(queryObj: string | { [key: string]: any } = {}) {
            switch (true) {
                case queryObj.constructor === String && window.isValid(queryObj): {
                    this._search = `?${encodeURI(queryObj.trim())}`.replace(/^\?+/g, "?");
                } break;
                case queryObj.constructor === Object && window.isValid(queryObj): {
                    const queryVals = Object.keys(queryObj)
                        .map(key => `${window.encodeURITrimmed(key)}=${encodeURIComponent((queryObj as { [key: string]: any })[key])}`);
                    this._search = `?${queryVals.join('&')}`;
                } break;
                default: {
                    this._search = "";
                }
            }
            return this.clear(6);
        }
        hash(hashString: string) { return this._hash = encodeURIComponent(window.tryGetValue(hashString, "")), this.clear(7); }
        clear(fromLevel: number = 1) {
            // 1 - protocol, 2 - host, 3 - port, 4 - path, 5 - search, 6 - hash
            fromLevel < 2 && (this._protocol = "");
            fromLevel < 3 && (this._hostname = "");
            fromLevel < 4 && (this._port = undefined);
            fromLevel < 5 && (this._pathname = "");
            fromLevel < 6 && (this._search = "");
            fromLevel < 7 && (this._hash = "");
            return this;
        }
    }

    const buildURL = new class {
        private __uri: URI | null = null;
        private _uri(): URI {
            return (this.__uri || (this.__uri = new URI(), this.__uri)) as URI;
        }
        url = (host: string, https: boolean = false) => {
            return (port?: number) => {
                const _urlNoPort: URI = (https ? new URI().https() : new URI().http()).host(host).port(port);
                return (path: string | string[] = []): string => _urlNoPort.path(path).toString();
            }
        }
        urlQuery = (url: string = "") => {
            url = url.replace(/\?+$/g, "");
            return (queryValueObject: { [key: string]: any } = {}): string => `${url}${this._uri().clear().search(queryValueObject)}`;
        }
        urlHash = (url: string = "") => {
            url = url.replace(/#+$/g, "");
            return (hash: string = ""): string => `${url}${this._uri().clear().hash(hash)}`;
        }
        encodeURITrimmed = (value: string) => encodeURIComponent(String(value).trim());
    };

    o.url = buildURL.url;
    o.urlQuery = buildURL.urlQuery;
    o.urlHash = buildURL.urlHash;
    o.encodeURITrimmed = buildURL.encodeURITrimmed;
    o.URI = URI;
    return true;
}

export { extend }