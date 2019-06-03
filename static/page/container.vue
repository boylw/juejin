<template>
    <div>
        <el-row type="flex" justify="center">
            <el-col :span="16">
                <h1 style="text-align:center;">{{name}}</h1>

                <el-row>
                    <el-col :span="24" v-for="item in container"  class="list" :key="item.id">
                        <div>
                           <a :href="'http://localhost:8080/detail.html#/id='+item.id">{{item.name}}</a> 
                        </div>
                    </el-col>
                </el-row>
            </el-col>

        </el-row>
    </div>
</template>

<style>
    .list:nth-of-type(odd) {
        background: #909399;
    }

    .list:nth-of-type(even) {
        background: #E4E7ED;
    }

    .list {
        height: 65px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    a {
        text-decoration: none;
        color: #303133;

    }

    a:hover {
        color: #000000;
    }
</style>

<script>
export default {
    props: ['tag_name'],
    data() {
        let name = this.$session.get('tagName');
        console.log(this.$session.get('tagName'));
        
        return {
            container: [],
            name: name
        }
    },
    async created() {
      let {data} = await this.axios('http://localhost:3000/getContainer?tag_name='+this.tag_name);
      console.log(data);
      this.container = data.data;
    },
    watch: {
        tag_name: {
            async handler(newVal,oldVal) {
                let {data} = await this.axios('http://localhost:3000/getContainer?tag_name='+newVal);
                this.container=data.data
                this.name = this.$session.get('tagName');
            }
        }
    }
}
</script>