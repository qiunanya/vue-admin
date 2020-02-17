<template>
    <el-dialog
        :title="title"
        :visible.sync="dialog_flag_info"
        width="580px"
        append-to-body
        @close="close_dialog"
        center>
        <el-form :model="form">
            <el-form-item label="标题：" :label-width="formLabelWidth">
                <el-input v-model="form.title" autocomplete="off" :label-width="formLabelWidth"></el-input>
            </el-form-item>
            <el-form-item label="类型：" :label-width="formLabelWidth">
            <el-select v-model="form.category" placeholder="请选择">
                <el-option label="国际信息" value="1"></el-option>
                <el-option label="国内信息" value="2"></el-option>
                <el-option label="行业信息" value="3"></el-option>
            </el-select>
            </el-form-item>
            <el-form-item label="概况：" :label-width="formLabelWidth">
                <el-input type="textarea" :rows="2" v-model="form.title" placeholder="请输入内容" autocomplete="off" :label-width="formLabelWidth"></el-input>
            </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
            <el-button @click="close_dialog">取 消</el-button>
            <el-button type="danger" @click="submit_form">提 交</el-button>
        </span>
    </el-dialog>
</template>
<script>
export default {
    name:"dialog_info",
    data() {
        return {
            dialog_flag_info:false,
            formLabelWidth:'70px',
            title:'新增',
            form:{
                title:'',
                category:'',
            }
        }
    },
    //数据单向流，不能反向修改
    props:{
       flag:{
           type:Boolean,
           default:false
       },
       updataData:{
           type:Object,
           default:null
       }
    },
    watch: {
        flag:function(newValue,oldValue){
          this.dialog_flag_info = newValue;
        },
        updataData:function(val,old){
            let obj = Object.keys(val);
            if (obj.length !==0) {
                this.title = '修改';
            }else{
                this.title = '新增'
            }
            console.log(val,9999)
        }
    },
    methods: {
        close_dialog(){
            this.dialog_flag_info = false;
            this.$emit('change',this.dialog_flag_info);
        },
        submit_form(){
            this.close_dialog();
        }
    },
    mounted() {
        
    },
}
</script>
<style lang="less">
    
</style>