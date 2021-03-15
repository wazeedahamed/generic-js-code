import * as array from "./extend/array";
import * as string from "./extend/string";
import * as validation from "./method/validation";
import * as url from "./method/url";
import * as xml from "./method/xml";

const process = () => {
    return array.extend(Array) &&
        string.extend(String) &&
        validation.define(window) &&
        url.define(window) &&
        xml.define(window);
}

export { process }
