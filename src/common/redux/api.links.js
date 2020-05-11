require('dotenv').config();
let baseurl ='http://210.56.11.237:9090';
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    // dev code
    baseurl = 'http://210.56.11.237:9090';
}
export const links = {
    UPLOAD:baseurl+'/api/Attachment/Upload'
}
export const socketLink =!process.env.NODE_ENV || process.env.NODE_ENV === 'development'? "localhost:3000":"210.56.11.237:9090";

export const apiLink = baseurl;