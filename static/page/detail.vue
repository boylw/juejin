<template>
    <div>
        <el-row type="flex" justify="center">
            <el-col :span="18">
                <div class="content"></div>
            </el-col>
        </el-row>
    </div>
</template>

<style>
.meta-box {
    display: none;
}


.article-title {
    text-align: center;
}

* {
    color: #606266;
}

center {
    display: none;
}


h1 {
    color: #303133;
}

h2 {
   color: #606266; 
}

pre {
    background: #000;
    border: 1px solid #DCDFE6;
}

code {
    color: white;
    line-height: 24px;
    font-size: 16px;
}

code span{
    color: white;
    line-height: 24px;
    font-size: 16px;
}

.copy-code-btn {
    display: none;
}

p code,li code {
    color: #606266;
}

pre>code {
    color: white;
}
    
</style>

<script>
export default {
    name: 'detail',
    data() {
        return {
            name: '',
            content: ''
        }
    },
    async created() {
        let id = window.location.href.split('=')[1];
        if (id) {
            let {data} =await this.axios(`http://localhost:3000/getContainerOne?id=`+id)
            console.log(data);
            this.content = data.data[0].content;
            this.name = data.data[0].name;
            $('.content').append(this.content);
            $('.lazyload').attr('src', $('.lazyload').data('src'))
        }
    }
}
</script>