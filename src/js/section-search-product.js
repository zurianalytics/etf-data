import {env} from './global-variables'

new Vue({

    el: '#dynamic-search',


    data() {
        return {
            apiName: env.name,
            apiUrl: env.api
        }
    },
})