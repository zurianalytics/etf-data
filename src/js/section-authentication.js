import {env} from './global-variables'

new Vue({

    el: '#authentication',


    data() {
        return {
            apiName: env.name,
            apiUrl: env.api
        }
    },
})