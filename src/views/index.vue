<template>
    <div class="wrapper">
    
        <Markdown v-model="markdown"></Markdown>

        <button class="print" @click="print">打印markdown</button>
    </div>
</template>
<script>
    import Markdown from '../components/markdown'
    export default {
        components: { Markdown },
        data () {
            return {
                markdown: ''
            }
        },
        methods: {
            print () {
                console.log(this.markdown)
            }
        }
    }
</script>
<style lang="less" scoped>
    .print {
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        border: 1px solid #b3d8ff;
        -webkit-appearance: none;
        text-align: center;
        box-sizing: border-box;
        outline: none;
        transition: .1s;
        font-weight: 500;
        -webkit-user-select: none;
        padding: 12px 20px;
        font-size: 14px;
        border-radius: 4px;
        color: #409eff;
        transition: all .3s;
        background: #ecf5ff;
        &:hover{
            background: #409eff;
            border-color: #409eff;
            color: #fff;
        }
    }
</style>