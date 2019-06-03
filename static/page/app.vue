<template>
  <div class="app">
    <el-row class="tac">
      <el-col :span="4">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo menubar"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#fff"
        >
          <el-menu-item v-for="item in tag" index="item.id" :data-href="item.href" :key="item.id" @click="active($event)" >
            <img :src="item.icon" alt="" class="icon">
             <span>{{item.name}}</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20" class="content">
        <container :tag_name="tag_name"></container>
      </el-col>
    </el-row>
  </div>
</template>

<style>
.menubar {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: 250px;
    overflow-y: auto;
}

.content {
    position: fixed;
    left: 250px;
    top: 0;
    right: 0;
    bottom: 0;
    overflow-y: scroll;
    
}

.content::-webkit-scrollbar {
    display: none;
}

.menubar::-webkit-scrollbar {
    display: none;
}

.icon {
  width:20px;
  height: 20px;
  margin: 0 20px;
}

.activeLi {
  background: #67C23A !important;
}

</style>

<script>
import container from './container.vue';

export default {
  name: "app",
  data() {
    return {
      tag : [],
      tag_name: 'JavaScript'
    };
  },
  async created() {
    let {data} = await this.axios('http://localhost:3000/tagLiat');
    if (!data.err) {
      this.tag = data.data;
    }
  },
   methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      async active (event) {
        let tag_name = event.$el.innerText.trim();
        this.tag_name = tag_name;
        this.$session.set('tagName',tag_name);
        $('.el-menu-item').removeClass('activeLi');
        $(event.$el).addClass('activeLi');
      }
    },
    components: {
      container
    }
};
</script>