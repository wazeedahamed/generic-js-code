import { URI, URLMethods } from "../class/uri";
import { IURI, IURLGlobal } from "../interface/iuri";

declare global {
    interface Window extends IURLGlobal {
        URI: { new(): IURI };
    }
}

const define = (o: Window & typeof globalThis) => {
    const buildURL = new URLMethods();

    o.url = buildURL.url;
    o.urlQuery = buildURL.urlQuery;
    o.urlHash = buildURL.urlHash;
    o.encodeURITrimmed = buildURL.encodeURITrimmed;
    o.URI = URI;
    return true;
}

export { define }