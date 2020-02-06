
const adminToken = 'admin_token';

export function getToken(){
    return JSON.parse(window.localStorage.getItem(adminToken));
}

export function setToken(token){
    return window.localStorage.setItem(adminToken,JSON.stringify(token));
}

export function removeToken(token){
    return window.localStorage.removeItem(adminToken);
}

export function setUserName(value){
    return window.localStorage.setItem('username',JSON.stringify(value));
}