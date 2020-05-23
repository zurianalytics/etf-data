import {env} from './global-variables'

new Vue({

    el: '#get-individual-etf',


    data() {
        return {
            apiName: env.name,
            apiUrl: env.api
        }
    },
})