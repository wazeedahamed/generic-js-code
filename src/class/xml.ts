import { IXMLMethods, IXMLTagMethods } from "../interface/ixml";
import { XMLTag } from "./xml-tag";

class XML implements IXMLMethods {
    root(tagName: string): IXMLTagMethods {
        return new XMLTag(tagName);
    }
}

export { XML }