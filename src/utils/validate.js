
/**校验特殊字符 */
export function stripscript(str){
    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{ }【】‘；：”“'。，、？]")
    var rs = "";
    if (str&&str!=='') {
        for (var i = 0;i < str.length; i++) {
            rs = rs + str.substr(i, 1).replace(pattern, '');
            } 
    }
    return rs;
}

/**验证邮箱 */
export function validateEmail(value){
    let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    return !reg.test(value)? false:true;
}

/**验证密码 6-20位 数字+字母 */
export function validatePassWord(value){
    let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
    return !reg.test(value)? false:true;
}

/**验证码校验 */
export function validateCode(value){
    let reg = /^[a-z0-9]{6}$/;
    return !reg.test(value)? false:true;
}
    