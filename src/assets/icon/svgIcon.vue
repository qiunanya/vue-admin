<template>
    <svg :class="svgClass" aria-hidden="true">
        <use :xlink:href="iconName"></use>
    </svg>
</template>
<script>
export default {
    name:'SvgIcon',
    created() {
           // console.log(this.iconClass,this.className,5555)
    },
    data() {
        return {
            msg:'搜地方搜房红薯粉回复',
            // iconName:'',
            // svgClass:''
        }
    },
     props: {
        // 分页
        iconClass: {
            type: String,  // 定义接收的值类型
            default: ''
        },
        className : {
            type: String,
            default: ''
        }
    },
    computed: {
        iconName(){
            return `#icon-${this.iconClass}`;
        },
        svgClass(){
            let sv='';
            if(this.className) {
                sv = `svg-icon ${this.className}`;
            }else{
                sv = `svg-icon`;
            }
            return sv;
        }
    },
}
</script>
<style lang="less" scope>
    .svg-icon{
        width: 1em;
        height: 1em;
        fill: currentColor;
    }
</style>