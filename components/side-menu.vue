<template>
    <ul>
        <li v-for="h in headers">
            <a :href="'#' + h.id">{{h.content}}</a>

            <ul v-if="h.subs.length > 0">
                <li v-for="sh in h.subs">
                    <a :href = "'#' + sh.id">{{sh.content}}</a>
                </li>
            </ul>
        </li>
    </ul>
</template>

<script>
    export default {
        name: "side-menu",

        data() {
            return {
                headers: []
            }
        },

        /**
         * Create the menu from the headers in the pages
         */
        mounted()
        {
            document.querySelectorAll('h1').forEach(header =>
            {
                let h = new Object({'id': header.id, 'content': header.innerText, 'subs': []});
                this.headers.push(h)

                header.parentNode.querySelectorAll('h2').forEach(subheader =>
                    h.subs.push(new Object({'id': subheader.id, 'content': subheader.innerText})))

            })

        }
    }
</script>