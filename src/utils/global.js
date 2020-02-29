import { MessageBox,Message} from 'element-ui';

export default {
    install(Vue,options){
       Vue.prototype.confirm = (params)=>{
           console.log(params,77)
        MessageBox.confirm(params.content, params.tips || '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: params.type || 'warning',
            center: true
            }).then(() => {
                params.meth && params.meth(params.id);
            }).catch(() => {
                Message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
       }
    }
}