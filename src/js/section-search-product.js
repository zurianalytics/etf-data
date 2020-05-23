var app = new Vue({

    el: '#dynamic-search',


    data() {
        return {
            apiName: envVariableName,
            apiUrl: envVariableApi
        }
    },
})