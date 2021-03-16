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
        const { info, newData } = this;
        (info.meta.parts > 0 || window.isValid(info.attr) || window.isValid(info.prop)) && (
            this.info = newData(),
            info.another = this.info
        );
        return this;
    }
    child(tagName: string) {
        return new XMLTag(tagName, this.tag);
    }
    sibling(tagName: string) {
        return new XMLTag(tagName, this.parent);
    }
    toString(xml: XMLDocument = document.implementation.createDocument(null, 'root', null)) {
        const { name, data } = this.tag;
        const root: HTMLElement = xml.createElement('root');
        this.processXMLNode(xml, name, data, root);
        return new XMLSerializer().serializeToString(root).replace(/^(<root>)|(<\/root>)$/g, '');;
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
    private processXMLNode(xml: XMLDocument, name: string, data: IXMLTagInfo, parent: HTMLElement) {
        let count = 0;
        const { prop, attr, text, html, child, meta, another } = data;
        const element: HTMLElement = xml.createElement(name);
        parent.insertAdjacentElement("beforeend", element);
        for (const property in prop) {
            prop[property] && (element.setAttribute(property, prop[property] as any));
        }
        for (const attribute in attr) {
            element.setAttribute(attribute, attr[attribute] as any);
        }
        while (count++ < meta.parts) {
            switch (true) {
                case text.hasOwnProperty(count): { element.insertAdjacentText("beforeend", text[count]) } break;
                case html.hasOwnProperty(count): { element.insertAdjacentHTML("beforeend", html[count]) } break;
                case child.hasOwnProperty(count): {
                    const { name: cname, data: cdata } = child[count];
                    this.processXMLNode(xml, cname, cdata, element);
                } break;
            }
        }
        if (
            !window.isNull(another) && (
                (another?.meta.parts ?? 0) > 0 ||
                window.isValid(another?.attr) ||
                window.isValid(another?.prop)
            )
        ) {
            this.processXMLNode(xml, name, another as any, parent);
        }
    }
}

export { XMLTag }