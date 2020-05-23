import JSONFormatter from 'json-formatter-js'

Vue.mixin({
    mounted() {
        document.querySelectorAll('code.json').forEach(el => {
            let renderedJson = new JSONFormatter(JSON.parse(el.innerHTML)).render();
            var parent = el.parentNode
            parent.removeChild(el)
            parent.appendChild(renderedJson)
        })
    }
})