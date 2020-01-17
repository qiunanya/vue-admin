<template>
  <div class="login">
      <h2>这里是登录页</h2>
      <el-row>
  <el-button>默认按钮</el-button>
  <el-button type="primary">主要按钮</el-button>
  <el-button type="success">成功按钮</el-button>
  <el-button type="info">信息按钮</el-button>
  <el-button type="warning">警告按钮</el-button>
  <el-button type="danger">危险按钮</el-button>
</el-row>
  </div>
</template>

<script>
export default {
    name:'login',
    components:{},
    data(){
        return {

        }
    },
    watch:{},
    methods:{},
    mounted(){},

}
</script>

<style lang="less" scope>
  .login{
     background:#344a5f;
     height: 100vh;
  }
    
</style>