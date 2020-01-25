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
    //background: #ffffff;
    //box-sizing: border;
}
</style>