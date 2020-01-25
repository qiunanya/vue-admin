<template>
    <div id="header-wrapper">
        <h3 style="color:red;">头部模块</h3>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less" scoped>
#header-wrapper{
    position: fixed;
    top: 0;
    right: 0;
    left: @nva-menu-w;
    height: 75px;
    background: #ffffff;
    box-shadow: 0 3px 16px 0 rgba(0, 0, 0, .1)
}
</style>