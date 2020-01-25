<template>
    <div>
        <layoutHeader/>
        <layoutMain/>
        <layoutNav/>
        
    </div>
</template>
<script>
import layoutHeader from './components/header'
import layoutMain from './components/main'
import layoutNav from './components/nav'

export default {
    name:'layout',
    components:{
        layoutHeader,
        layoutMain,
        layoutNav
    }
    
}
</script>
<style lang="less" scoped>

</style>