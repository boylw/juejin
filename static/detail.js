import Vue from 'vue';
import ElementUI from 'element-ui';
import Router from 'vue-router';
import axios from 'axios';
import VueAxios from 'vue-axios';



axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.use(VueAxios, axios);
Vue.use(ElementUI);
Vue.use(Router);



// 载入css
import 'element-ui/lib/theme-chalk/index.css';

import Detail from './page/detail.vue';

// Vue 挂载
let app = new Vue({
    el: '#detail',
    data() {
        return {
        }
    },
    created() {
    },
    methods: {
    },
    components: {
        Detail
    },
    template: `<Detail></Detail>`
});