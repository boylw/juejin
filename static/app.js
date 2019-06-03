import Vue from 'vue';
import ElementUI from 'element-ui';
import Router from 'vue-router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueSession from 'vue-session';




axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.use(VueAxios, axios);
Vue.use(ElementUI);
Vue.use(Router);
Vue.use(VueSession)


// 载入css
import 'element-ui/lib/theme-chalk/index.css';

import App from './page/app.vue';
import container from './page/container.vue'

new Router ({
    routes: [
        {
            path: '/',
            name: 'app',
            component: App
        },
        {
            path: '/detial',
            name: 'detial',
            component: container
        }
    ]
})

// Vue 挂载
let app = new Vue({
    el: '#app',
    data() {
        return {
        }
    },
    created() {
    },
    methods: {
    },
    components: {
        App
    },
    template: `<App></App>`
});