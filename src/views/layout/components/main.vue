<template>
    <div id="main-wrapper">
      <router-view />
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less" scoped>
#main-wrapper{
    position: fixed;
    left: @nva-menu-w;
    top: 75px;
    bottom: 0;
    right: 0;
    border: 30px solid #f7f7f7;
    border-bottom: none;
    padding: 30px 30px 0 30px;
    background: #ffffff;
    -webkit-transform: all .3s ease 0s;
    -o-transform: all .3s ease 0s;
    -moz-transform: all .3s ease 0s;
    -ms-transform: all .3s ease 0s;
    transform: all .3s ease 0s;
    //box-sizing: border;
}
.open{
   #main-wrapper{
     left: @nva-menu-w;
   }
}
.close{
    #main-wrapper{
     left:  @nav-menu-min;
   }
}
</style>