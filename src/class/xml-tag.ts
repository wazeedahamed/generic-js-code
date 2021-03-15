import { IXMLTag, IXMLTagInfo, IXMLTagMethods } from "../interface/ixml";

class XMLTag implements IXMLTagMethods {
    private tag: IXMLTag;
    private parent: IXMLTag;
    private info: IXMLTagInfo;
    constructor(
        tagName: string,
        parent: IXMLTag = {
            name: "root",
            data: {
                text: {},
                html: {},
                child: {},
                attr: {},
                prop: {},
                meta: {
                    parts: 0
                }
            }
        }
    ) {
        const { data } = parent,
            { meta } = data;
        this.parent = parent;
        this.info = this.newData();
        this.tag = { name: tagName, data: this.info };
        data.child[++meta.parts] = this.tag;
    }
    text(text: string) {
        const { info } = this,
            { meta } = info;
        info.text[++meta.parts] = text;
        return this;
    }
    html(html: string) {
        const { info } = this,
            { meta } = info;
        info.html[++meta.parts] = html;
        return this;
    }
    prop(prop: { [key: string]: boolean } = {}) {
        const { info } = this;
        info.prop = { ...info.prop, ...prop };
        return this;
    }
    attr(attr: { [key: string]: string } = {}) {
        const { info } = this;
        info.attr = { ...info.attr, ...attr };
        return this;
    }
    another() {
        const { info, tag, newData } = this;
        info.meta.parts > 0 && (
            this.info = newData(),
            tag.data.another = this.info
        );
        return this;
    }
    child(tagName: string) {
        return new XMLTag(tagName, this.tag);
    }
    sibling(tagName: string) {
        return new XMLTag(tagName, this.parent);
    }
    toString() {
        throw Error("Not Implemented: toString");
        return "";
    }
    private newData(): IXMLTagInfo {
        return {
            text: {},
            html: {},
            child: {},
            attr: {},
            prop: {},
            meta: {
                parts: 0
            }
        };
    }
}

export { XMLTag }