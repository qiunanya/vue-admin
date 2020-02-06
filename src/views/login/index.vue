<template>
  <div class="login">
      <div class="login-wrap">
        <ul class="menu-tab">
          <li :class="{'active': item.isActive}" v-for="(item,index) in menuTab" :key="item.id" @click="toggleMenu(item,index)">
            {{item.title}}
          </li>
        </ul>

        <!-- 登录表单 -->
        <el-form :model="userForm" status-icon :validate-on-rule-change="false" :rules="rules" size="medium" ref="userForm" class="login-Form">
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
                <el-button type="success" class="block" @click="getSms" :disabled="codeBtn.codeBtnStatus">{{codeBtn.codeBtnText}}</el-button>
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
import {GetSms,Register,Login} from '@/api/login'
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
        //  this.userForm.code = stripscript(value);
        //  value = this.userForm.code;
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
              username: '1766226354@qq.com',
              password: '123456a',
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
        loginBtnStatus:true,
        codeBtn:{
          codeBtnStatus:false,
          codeBtnText:'获取验证码'
        },
        timer:null
           
        }
    },
    watch:{},
    props:{},
    methods:{
      getSms(){
        
        let data = {
          username:this.userForm.username,
          module:this.condition?'register':'login'//自定义标识
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

           //发送验证码后禁用获取验证码按钮
           this.codeBtn.codeBtnStatus = true;
           
           GetSms(data).then(res=>{
              //console.log(res,123)
              if (res.data.resCode==0) {
                this.$message.success(res.data.message);
                this.loginBtnStatus = false;
                this.countDown(60);
              }
           }).catch(err=>{
             this.codeBtn.codeBtnStatus = false;
             this.codeBtn.codeBtnText ='重新获取';
             this.$message.error(err);
           });
        
         //获取开发环境的变量名
         console.log(process.env.VUE_APP_TITLE)
      },
      //倒计时
      countDown(val){
          //判断定时器是否存在
          if(this.timer){
            clearInterval(this.timer);
          }
          this.codeBtn.codeBtnText ='发送中';
         //setTiemOut 执行一次
         // setInterval 不断执行，需要条件才会停止
          let tim = val;
          this.timer = setInterval(()=>{
          console.log('setInterval',val)
             tim--;
             if(tim===0){
                 clearInterval(this.timer);
                 this.codeBtn.codeBtnStatus = false;
                 this.codeBtn.codeBtnText ='重新获取';
             }else{
                 this.codeBtn.codeBtnStatus = true;
                 this.codeBtn.codeBtnText = `倒计时${tim}秒`;
             }

          },1000)
      },
      /*清除倒计时*/
      clearCountDown(){
         this.codeBtn.codeBtnStatus = false;
         this.codeBtn.codeBtnText ='获取验证码';
         //清除倒计时
         clearInterval(this.timer);

      },
      //注册登录
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let rData = {
                  username:this.userForm.username,
                  password:this.userForm.password,
                  code:this.userForm.code,
                  module:this.condition?'register':'login'
                }
            // 注册
            if(this.condition){
                Register(rData).then(res=>{
                  if(res.data.resCode==0){
                     this.$message.success(res.data.message);
                     this.toggleMenu(this.menuTab[0],0);//注册成功后切换到登录
                  }
                }).catch(err=>{
                    this.$message.error(err);
                });
                 this.clearCountDown();
            }else{ //登录
                console.log('login')
                //  Login(rData).then(res=>{
                //     if(res.data.resCode==0){
                //      this.$message.success(res.data.message);
                //      //登录之后操作
                //     this.$router.push({
                //       path:'/console',
                //       query:{
                //         title:'控制台'
                //       }
                //       })

                //   }
                //  }).catch(err=>{
                //     this.$message.error(err);
                //  });
                 this.$store.dispatch('login/userLogin', rData).then(res => {
                   console.log(res,13)
                    if(res.data.resCode==0){
                        this.$message.success(res.data.message);
                        //登录之后操作
                        this.$router.push({
                          path:'/console',
                          query:{
                            title:'控制台'
                          }
                          })
                  }   
                  }).catch(error => {
                      this.$message.error(error.message);
                      console.log(error,12)
                  });
                 this.clearCountDown();
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      /**清空表单内容 */
       resetForm() {
        this.$refs['userForm'].resetFields();
      },
      toggleMenu(item,index){
         //console.log(this.condition,item,index)
         this.menuTab.forEach(el=>{
           el.isActive = false;
         })
          item.isActive = true;
         if (index==0) {
           this.userForm = {};
           this.condition = false;
         } else {
           this.userForm = {};
           this.condition = true;
         }
         this.resetForm();
         this.clearCountDown();
        
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