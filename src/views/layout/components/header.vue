<template>
    <div class="header-wrapper">
        <!-- <h3 style="color:red;">头部模块</h3> pull-right-->
        <div class="pull-left menu-icon" @click="changeMenuState">
          <svg-icon iconClass='menu' className='menu'/>  
        </div>
        <div class="pull-right">
          <div class="user-info pull-left">
              <img class="avatar" src="../../../assets/icon/img/u.png" alt="" srcset="">
              <div class="user-name">{{username}}</div>
          </div>
          <div class="menu-icon pull-left" @click="logout">
              <svg-icon iconClass='back' className='back'/> 
          </div> 
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            username:''
        }
    },
    methods: {
        // logout
        logout(){
            this.$confirm('确定要退出系统吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    this.$store.dispatch('login/logout', {name:'logout'}).then(res => {
                        this.$message({
                            type: 'success',
                            message: '退出成功!'
                        });
                        this.$router.push({
                                path:'/login'
                                })
                        }).catch(error => {
                            this.$message.error(error.message);
                            console.log(error,12)
                        });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });          
                });
        },
        //改变左侧菜单显示状态
        changeMenuState(){
            this.$store.commit('app/SET_COLLAPSE');
            //调用store中的actions的setState方法
            this.$store.dispatch('app/setState',{name:'李斯',age:1422})
        }
    },
    mounted() {
        this.username = this.$store.state.login.user_name;
        console.log(this.$store.state.login.user_name,'username')
    },
}
</script>
<style lang="less" scope>
.header-wrapper{
    position: fixed;
    top: 0;
    right: 0;
    left: @nva-menu-w;
    height: 75px;
    background: #ffffff;
    line-height: 75px;
    box-shadow: 0 3px 16px 0 rgba(0, 0, 0, .1);
    -webkit-transform: all .3s ease 0s;
    -o-transform: all .3s ease 0s;
    -moz-transform: all .3s ease 0s;
    -ms-transform: all .3s ease 0s;
    transform: all .3s ease 0s;
    .menu-icon{
        padding: 0 32px;
        svg{
            margin-bottom: -8px;
            font-size: 25px;
            cursor: pointer;
        }
    }
    .pull-right{
        .user-info{
            height: 100%;
            padding: 0 32px;
            border-right: 2px solid #ededed;
            display: flex;
            align-items: center;
            .avatar{
               width: 30px;
               height: 30px;
               border-radius: 50%; 
               padding-right: 15px;
            }
            .user-name{

            }
        }
    }
}
.open{
   .header-wrapper{
           left: @nva-menu-w; 
   }
}
.close{
.header-wrapper{
           left: @nav-menu-min; 
   }
}   
</style>