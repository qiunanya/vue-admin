<template>
    <div id="nav-wrapper">
        <div class="logo">
            <img src="../../../assets/icon/img/logo.png" alt="" srcset="">
        </div>
       <el-menu default-active="1-4-1" class="el-menu-vertical-demo" 
                background-color="transparent" text-color="#ffffff"
                 @open="handleOpen" @close="handleClose" 
                 :collapse="isCollapse" router>
            <template v-for="(item,index) in menuList">
                <el-submenu v-if="!item.hidden" :key="item.id" :index="index + ''">
                    <template slot="title">
                        <!-- <i class="el-icon-location"></i> -->
                        <svg-icon :iconClass='item.meta.icon' :className='item.meta.icon'/>
                        <span slot="title">{{item.meta.name}}</span>
                    </template>
                    <el-menu-item v-for="(subItem, index1) in item.children" :key="subItem.id" :index="subItem.path">
                        {{subItem.meta.name}}
                    </el-menu-item>
                </el-submenu>
            </template>     
            



            <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title">导航二</span>
            </el-menu-item>
            
            <el-menu-item index="3">
                <i class="el-icon-setting"></i>
                <span slot="title">导航四</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>
<script>
export default {
    name:'navMenu',
    data() {
        return {
           // isCollapse: false,
            menuList:[]
        }
    },
    created() {
        // 改变state值
        //this.$store.commit('SET_ISCOLLAPSE',true)
        console.log(this.$store.state.app.isCollapse,this.$store.getters.isCollapse,1111)
    },
    methods: {
         handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    },
    mounted(){
        this.menuList = this.$router.options.routes;
        console.log(this.menuList,this.$store.state.login.qiuny,this.$store.getters.qiu,123)
    },
    computed: {
        isCollapse(){
            return this.$store.state.app.isCollapse;
        }
        
    },
}
</script>
<style lang="less" scoped>
#nav-wrapper{
    position: fixed;
    left: 0;
    top: 0;
    width: @nva-menu-w;
    height: 100vh;
    background: #344a5f;
    -webkit-transform: all .3s ease 0s;
    -o-transform: all .3s ease 0s;
    -moz-transform: all .3s ease 0s;
    -ms-transform: all .3s ease 0s;
    transform: all .3s ease 0s;
    .logo{
        img{
            margin: 22px auto 19px;
            width: 60px;
            height: 60px;
            -webkit-transform: all .3s ease 0s;
            -o-transform: all .3s ease 0s;
            -moz-transform: all .3s ease 0s;
            -ms-transform: all .3s ease 0s;
            transform: all .3s ease 0s;
                }
    }
    .el-menu-vertical-demo{
        width: @nva-menu-w;
    }
}
.open{
    #nav-wrapper{
       width: @nva-menu-w;
        .el-menu-vertical-demo{
        width: @nva-menu-w;
       } 
    }
}
.close{
    #nav-wrapper{
       width: @nav-menu-min;
        .el-menu-vertical-demo{
        width: @nav-menu-min;
       }
       .logo{
            img{
                width: 60%;
                height: 60%;
            }
    }
    }
}
</style>