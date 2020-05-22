<template>
    <ul>
        <li v-for="i in menuItems">
            <a :href="'#' + i.id">{{i.content}}</a>

            <ul v-if="i.subs.length > 0">
                <li v-for="si in i.subs">
                    <a :href = "'#' + si.id">{{si.content}}</a>
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
                menuItems: []
            }
        },

        /**
         * Create the menu from the headers in the pages
         */
        mounted()
        {
            document.querySelectorAll('h1[menu-item]').forEach(header =>
            {
                let h = new Object({'id': header.id, 'content': header.innerText, 'subs': []});
                this.menuItems.push(h)

                header
                    .parentNode
                    .querySelectorAll('[menu-item]:not(h1)')
                    .forEach(sub =>
                    h.subs.push(new Object({'id': sub.id, 'content': sub.getAttribute("menu-item") ? sub.getAttribute("menu-item") : sub.innerText})))

            })

        }
    }
</script>