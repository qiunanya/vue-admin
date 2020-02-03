<template>
    <div class="layout" :class="menuState? 'close':'open'">
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
    },
    data() {
        return {
            
        }
    },
    computed: {
        menuState(){
            return this.$store.state.app.isCollapse;
        }
    },
    
}
</script>
<style lang="less" scoped>

</style>