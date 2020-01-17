<template>
  <div class="login">
      <div class="login-wrap">
        <ul class="menu-tab">
          <li :class="{'active': item.isActive}" v-for="(item,index) in menuTab" :key="item.id" @click="toggleMenu(item,index)">
            {{item.title}}
          </li>
        </ul>
      </div>
  </div>
</template>

<script>
export default {
    name:'login',
    components:{},
    data(){
        return {
            menuTab:[
              {id:1,title:'登录', isActive:true},
              {id:2,title:'注册', isActive:false},
            ],
           
        }
    },
    watch:{},
    props:{},
    methods:{
      toggleMenu(item,index){
         this.menuTab.forEach(el=>{
           el.isActive = false;
         })
         item.isActive = true;
      }
    },
    mounted(){},

}
</script>

<style lang="less" scope>
  .login{
     .active{
       background-color: rgba(0, 0, 0, .1);//百分之十的透明度
     }
     background:#344a5f;
     height: 100vh;
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
  }
    
</style>