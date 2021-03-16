interface IXMLTagMethods {
    /**
     * Insert text content
     * @param text text content
     */
    text(text: string): IXMLTagMethods;

    /**
     * Insert html/xml content
     * @param html html/xml content
     */
    html(html: string): IXMLTagMethods;

    /**
     * Set tag properties
     * @param props tag properties
     */
    prop(props: { [key: string]: boolean }): IXMLTagMethods;

    /**
     * Set tag attributes
     * @param attrs tag attributes
     */
    attr(attrs: { [key: string]: string }): IXMLTagMethods;

    /**
     * Add another tag with same tag name as a sibling of current tag
     */
    another(): IXMLTagMethods;

    /**
     * Add a child tag to current tag
     * @param tagName xml tag name
     */
    child(tagName: string): IXMLTagMethods;

    /**
     * Add a sibling tag to current tag
     * @param tagName xml tag name
     */
    sibling(tagName: string): IXMLTagMethods;

    /**
     * Get XML/HTML string
     */
    toString(xml?: XMLDocument): string;
}

interface IXMLMethods {
    /**
     * Create a root tag
     * @param tagName xml tag name
     */
    root(tagName: string): IXMLTagMethods;
}

interface IXMLTagInfo {
    /**
     * Insert text content
     */
    text: { [key: number]: string },

    /**
     * Insert html content
     */
    html: { [key: number]: string },

    /**
     * Tag properties
     */
    prop: { [key: string]: boolean },

    /**
     * Tag attributes
     */
    attr: { [key: string]: string },

    /**
     * Child tags
     */
    child: { [key: number]: IXMLTag };

    /**
     * Tag meta data
     */
    meta: IXMLMeta,

    /**
     * Another tag with same tag name
     */
    another?: IXMLTagInfo;
}

interface IXMLTag {
    /**
     * Tag name
     */
    name: string,

    /**
     * Tag data
     */
    data: IXMLTagInfo;
}

interface IXMLMeta {
    /**
     * Total number of parts in current tag including text, html and child
     */
    parts: number;
}

interface IXMLGlobal {
    /**
     * Get XML/HTML string from object notation
     * @param xmlObj XML/HTML string
     */
    toXMLString(xmlObj: any): string;
    XML: { new(): IXMLMethods };
    XMLTag: { new(tagName: string, parent?: IXMLTag): IXMLTagMethods };
}

export { IXMLGlobal, IXMLTagMethods, IXMLMethods, IXMLTagInfo, IXMLTag, IXMLMeta }
