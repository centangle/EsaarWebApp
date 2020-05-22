import { apiLink } from '../redux/api.links';
export const formEncode = (obj) => {
    let i = 0;
    var data = '';
    Object.keys(obj).forEach(key => {
        if (i === 0) {
            data += key + "=" + obj[key];
        } else {
            data += "&" + key + "=" + obj[key];
        }
        i++;
    });
    return data;
}
export const remapChildren = () => {

}
export const canView = (roles, CurrentMemberRoles) => {
    let result = false;
    roles.forEach(role => {
        if (CurrentMemberRoles && CurrentMemberRoles.includes(role)) {
            result = true;
        }
    });
    return result;
}
export const baseUrl = apiLink;
export const params = { activePage: 1, itemsCountPerPage: 10, pageRangeDisplayed: 5 };