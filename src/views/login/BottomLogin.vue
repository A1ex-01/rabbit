<template>
    <div class="bottom">
        <div>
            <span>关于我们</span>
            <span>帮助中心</span>
            <span>售后服务</span>
            <span>配送与验收</span>
            <span>商务合作</span>
            <span>搜索推荐</span>
            <span>友情链接</span>
        </div>
        <span>CopyRight © 小兔鲜儿</span>
    </div>
</template>
<style lang="scss" scoped>
.bottom{
    width: 100%;
    height: 160px;
    padding-top: 50px;
    padding-bottom: 30px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: #999;
    >div{
        display: flex;
        margin-bottom: 20px;
        >span{
            padding: 0 10px;
            border-right: 1px solid #f5f5f5;
            &:last-child{
                border: 0;
            }
        }
    }
}
</style>