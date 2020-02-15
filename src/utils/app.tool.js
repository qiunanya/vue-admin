
const adminToken = 'admin_token';

const user_Name_Key = 'username';

export function getToken(){
    return JSON.parse(window.localStorage.getItem(adminToken));
}

export function setToken(token){
    return window.localStorage.setItem(adminToken,JSON.stringify(token));
}

export function removeToken(){
    return window.localStorage.removeItem(adminToken);
}

export function removeUserName(){
    return window.localStorage.removeItem(user_Name_Key);
}

export function setUserName(value){
    return window.localStorage.setItem(user_Name_Key,JSON.stringify(value));
}

export function getUserName(){
    return JSON.parse(window.localStorage.getItem(user_Name_Key));
}