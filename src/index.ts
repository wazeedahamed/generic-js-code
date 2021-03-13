import * as Method_Validation from './extend/method_validation';
import * as Method_Url from './extend/method_url';
import * as Extend_String from './extend/extend_string';
import * as Extend_Array from './extend/extend_array';

const extend = () => {
    Method_Validation.extend(window);
    Method_Url.extend(window);
    Extend_String.extend(String);
    Extend_Array.extend(Array);
}

export { extend }
