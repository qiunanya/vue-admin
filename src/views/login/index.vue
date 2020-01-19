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
            <label>邮箱</label>
            <el-input type="text" v-model="userForm.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="password" class="item-form">
            <label>密码</label>
            <el-input type="password" v-model="userForm.password" autocomplete="off" minlength="6" maxlength="20"></el-input>
          </el-form-item>
          <el-form-item prop="pwds" class="item-form" v-if="condition">
            <label>确认密码</label>
            <el-input type="password" v-model="userForm.pwds" autocomplete="off" minlength="6" maxlength="20"></el-input>
          </el-form-item>
          <el-form-item prop="code" class="item-form">
            <label>验证码</label>
            <el-row :gutter="15">
              <el-col :span="15">
                <el-input type="text" v-model="userForm.code"></el-input>
              </el-col>
              <el-col :span="9">
                <el-button type="success" class="block">获取验证码</el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('userForm')" class="submit-btn top-19">提交</el-button>
          </el-form-item>
        </el-form>

      </div>
  </div>
</template>

<script>
import loginApi from '@/utils/requestFilter'
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
        }
           
        }
    },
    watch:{},
    props:{},
    methods:{
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