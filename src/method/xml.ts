import { XML } from "../class/xml";
import { XMLTag } from "../class/xml-tag";
import { IXMLGlobal } from "../interface/ixml";

declare global {
    interface Window extends IXMLGlobal { }
}


const define = (o: Window & typeof globalThis) => {
    function toXMLString(xmlObj: any): string {
        const xml = new window.XML().root('root');
        throw Error('Method Not Implemented: toXMLString');
        return "";
    }

    o.XML = XML;
    o.XMLTag = XMLTag;
    o.toXMLString = toXMLString;
    return true;
}

export { define }