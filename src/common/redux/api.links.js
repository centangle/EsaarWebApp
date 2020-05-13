require('dotenv').config();
let baseurl ='https://api.esaar.app';
let host ='localhost';
if (typeof document != 'undefined') {
  // I'm on the web!
  host = window.location.hostname;
}else{
    //for irfan to set host for dev,beta and production
    //set host = one of below cases
}
export const getBaseUrl = () =>{
    switch(host){
        case 'portal-dev.esaar.app':
            return 'https://api-dev.esaar.app';
        case 'portal-beta.esaar.app':
            return 'https://api-beta.esaar.app';
        case 'localhost':
            return 'https://api-dev.esaar.app';
        case 'portal.esaar.app':
            return 'https://api.esaar.app';
        default:
            return 'https://api.esaar.app';
    }
}
baseurl = getBaseUrl();
export const links = {
    UPLOAD:baseurl+'/api/Attachment/Upload'
}
export const socketLink =!process.env.NODE_ENV || process.env.NODE_ENV === 'development'? "localhost:3000":baseurl;

export const apiLink = baseurl;