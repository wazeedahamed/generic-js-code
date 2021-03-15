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

// function _toHTML(obj) {
//     var booleanProps = ["disabled", "readOnly", "readonly"];
//     var xml = document.implementation.createDocument(null, 'root', null);
//     var getNode = function (tag, tagObj) {
//         var node = xml.createElement(tag),
//             keys = Object.keys(tagObj);

//         keys.forEach(function (key) {
//             if (key == "__text") {
//                 node.textContent = tagObj.__text;
//             } else if (key == "__html") {
//                 node.innerHTML = tagObj.__html;
//             } else if (key != "__append") {
//                 if (key.indexOf("_") == 0) {
//                     var attr = key.substring(1);
//                     if (booleanProps.indexOf(attr) == -1) {
//                         node.setAttribute(attr, tagObj[key]);
//                     } else {
//                         node.setAttribute(attr.toLowerCase(), [false, null, undefined, ""].indexOf(tagObj[key]) == -1);
//                     }
//                 } else {
//                     if (tagObj[key].constructor !== Array) {
//                         tagObj[key] = [tagObj[key]];
//                     }
//                     tagObj[key].forEach(function (tagObjItem) {
//                         var _newNode = getNode(key, tagObjItem);
//                         node.appendChild(_newNode);
//                         if (tagObjItem.__append) {
//                             processAppend(_newNode, tagObjItem.__append);
//                         }
//                     });
//                 }
//             }
//         });
//         return node;
//     }, processAppend = function (node, appendObj) {
//         Object.keys(appendObj).forEach(function (type) {
//             switch (type) {
//                 case "__text": node.insertAdjacentText("beforeend", appendObj.__text); break;
//                 case "__html": node.insertAdjacentHTML("beforeend", appendObj.__html); break;
//                 case "__append": processAppend(node, appendObj.__append); break;
//                 default: {
//                     if (appendObj[type].constructor !== Array) {
//                         appendObj[type] = [appendObj[type]];
//                     }
//                     appendObj[type].forEach(function (tagObjItem) {
//                         var _newNode = getNode(type, tagObjItem);
//                         node.insertAdjacentElement("beforeend", _newNode);
//                         if (tagObjItem.__append) {
//                             processAppend(_newNode, tagObjItem.__append);
//                         }
//                     });
//                 }
//             }
//         });
//     };

//     Object.keys(obj).forEach(function (key) {
//         var _newNode = getNode(key, obj[key]);
//         xml.getElementsByTagName('root')[0].appendChild(_newNode);
//         if (obj[key].__append) {
//             processAppend(_newNode, obj[key].__append);
//         }
//     })
//     return new XMLSerializer().serializeToString(xml).replace(/^(<root>)|(<\/root>)$/g, '');
// }

export { define }