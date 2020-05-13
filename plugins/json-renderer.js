import Vue from 'vue';

Vue.mixin({

    mounted()
    {
        if (process.client) {

            var JSONFormatter = require('json-formatter-js')

            document.querySelectorAll('code.json').forEach(el =>
            {
                let renderedJson = new JSONFormatter(JSON.parse(el.innerHTML)).render();

                var parent = el.parentNode
                parent.removeChild(el)
                parent.appendChild(renderedJson)
            })
        }
    }
})