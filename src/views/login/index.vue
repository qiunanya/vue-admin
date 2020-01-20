<template>
  <div class="login">
      <div class="login-wrap">
        <ul class="menu-tab">
          <li :class="{'active': item.isActive}" v-for="(item,index) in menuTab" :key="item.id" @click="toggleMenu(item,index)">
            {{item.title}}
          </li>
        </ul>

        <!-- 登录表单 -->
        <el-form :model="userForm" status-icon :rules="rules" size="medium" ref="userForm" class="login-Form">
          <el-form-item prop="username" class="item-form">
            <label for="username">邮箱</label>
            <el-input id="username" type="text" v-model="userForm.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="password" class="item-form">
            <label for="password">密码</label>
            <el-input id="password" type="password" v-model="userForm.password" autocomplete="off" minlength="6" maxlength="20"></el-input>
          </el-form-item>
          <el-form-item prop="pwds" class="item-form" v-if="condition">
            <label for="pwds">确认密码</label>
            <el-input id="pwds" type="password" v-model="userForm.pwds" autocomplete="off" minlength="6" maxlength="20"></el-input>
          </el-form-item>
          <el-form-item prop="code" class="item-form">
            <label for="code">验证码</label>
            <el-row :gutter="15">
              <el-col :span="15">
                <el-input id="code" type="text" v-model="userForm.code"></el-input>
              </el-col>
              <el-col :span="9">
                <el-button type="success" class="block" @click="getSms">获取验证码</el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-button :disabled="loginBtnStatus" type="primary" @click="submitForm('userForm')" class="submit-btn top-19">
              {{condition?"提交":"登录"}}
            </el-button>
          </el-form-item>
        </el-form>

      </div>
  </div>
</template>

<script>
import {GetSms} from '@/api/login'
import { stripscript,validateEmail,validatePassWord,validateCode} from '@/utils/validate'
export default {
    name:'login',
    components:{},
    data(){
      //邮箱验证
      var validateUserName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入邮箱'));
        }else if (!validateEmail(value)) {
            callback(new Error('邮箱格式错误！'));
        }else{
            callback();
          }
        
      };
      // 密码校验
      var validatePass = (rule, value, callback) => {
        this.userForm.password = stripscript(value);
        value = this.userForm.password;
        if (value === '') {
          callback(new Error('请输入密码'));
        }else if(!validatePassWord(value)){
          callback(new Error('密码为6-20位的数字+字母！'));
        }else{
            callback();
        }
      };
      var validatePwds = (rule, value, callback) => {
        this.userForm.pwds = stripscript(value);
        value = this.userForm.pwds;
        if (value === '') {
          callback(new Error('请再次输入密码'));
        }else if(value !==this.userForm.password){
          callback(new Error('两次密码不一致，请重新输入'));
        }else{
            callback();
        }
      };

       //验证码校验
       var checkCode = (rule, value, callback) => {
         this.userForm.code = stripscript(value);
         value = this.userForm.code;
        if (value=='') {
          callback(new Error('请输入验证码！'));
        }else if (!validateCode(value)) {
          callback(new Error('验证码格式有误！必须为6位'));
        } else {
          callback();
        }
      };

        return {
            condition:false,
            menuTab:[
              {id:1,title:'登录', isActive:true},
              {id:2,title:'注册', isActive:false},
            ],
             userForm: {
              username: '',
              password: '',
              pwds:'',
              code: ''
            },
        rules: {
          username: [
            { validator: validateUserName, trigger: 'blur' }
          ],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          pwds: [
            { validator: validatePwds, trigger: 'blur' }
          ],
          code: [
            { validator: checkCode, trigger: 'blur' }
          ]
        },
        loginBtnStatus:true
           
        }
    },
    watch:{},
    props:{},
    methods:{
      getSms(){
        console.log(this.userForm.username,112)
        let data = {
          username:this.userForm.username,
          module:'login'//自定义标识
        }
        //判断邮箱和密码是否为空
        if (this.userForm.username=='') {
           this.$message.error('登录邮箱不能为空');
           return false;
        } 
        if (this.userForm.password=='') {
           this.$message.error('密码不能为空');
           return false;
        }

        if (!validateEmail(this.userForm.username)) {
           this.$message.error('邮箱格式错误');
           return false;
        }
         if (!validatePassWord(this.userForm.password)) {
           this.$message.error('密码为6-20位的数字+字母');
           return false;
        }
           
           GetSms(data).then(res=>{
              console.log(res,123)
              if (res.data.resCode==0) {
                this.$message.success(res.data.message);
              }
           }).catch(err=>{
             this.$message.error(err);
           });
        
         //获取开发环境的变量名
         console.log(process.env.VUE_APP_TITLE)
      },
      //登录
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.userForm)
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
       resetForm() {
        this.$refs['userForm'].resetFields();
      },
      toggleMenu(item,index){
         this.menuTab.forEach(el=>{
           el.isActive = false;
         })
          item.isActive = true;
         if (index==0) {
           this.resetForm();
           this.userForm = {};
           this.condition = false;
         } else {
           this.resetForm();
           this.userForm = {};
           this.condition = true;
         }
        
      }
    },
    mounted(){},

}
</script>

<style lang="less" scope>
  .login{
     background:#344a5f;
     height: 93vh;
     padding-top: 50px;
     .el-input__suffix{
       color: green;
     }
     .active{
       background-color: rgba(0, 0, 0, .1);//百分之十的透明度
     }
     .login-wrap{
       width: 330px;
       margin: auto;
     }
     .menu-tab{
         text-align: center;
         li{
           display: inline-block;
           width: 88px;
           line-height: 36px;
           font-size: 14px;
           color: #ffffff;
           border-radius: 2px;
           cursor: pointer;
          
         }
       }
      .login-Form{
        margin-top: 15px;
        label{
          display: block;
          margin-bottom: 3px;
          font-size: 14px;
          color:#ffffff;
        }
        .item-form{
          margin-bottom: 13px;
        }
        .submit-btn{
          display: block;
          width: 100%;
        }
        .top-19{
          margin-top: 19px;
        }
        .block{
          display: block;
        }
      }

  
  }
    
</style>