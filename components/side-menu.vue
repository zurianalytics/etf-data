<template>
    <ul>
        <li v-for="i in menuItems">
            <a :href="'#' + i.id" @click="smoothScrollToLink(i.linkTo, $event)">{{i.content}}</a>

            <ul v-if="i.subs.length > 0">
                <li v-for="si in i.subs">
                    <a :href = "'#' + si.id" @click="smoothScrollToLink(si.linkTo, $event)">{{si.content}}</a>
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

        methods: 
        {
            smoothScrollToLink(target, e)
            {
                e.preventDefault() 
                // Scroll
                target.scrollIntoView({ behavior: 'smooth' });
            }
        },

        /**
         * Create the menu from the headers in the pages
         */
        mounted()
        {
            // Add smooth scroll to the selected link
            document.querySelectorAll('[menu-item]').forEach(link => link.addEventListener('click', this.smoothScrollToLink));

            // Create a drop down for for each menu-item
            document.querySelectorAll('h1[menu-item]').forEach(header =>
            {
                let h = new Object({'id': header.id, 'content': header.innerText, 'subs': [], 'linkTo': header});
                this.menuItems.push(h)

                header
                    .parentNode
                    .querySelectorAll('[menu-item]:not(h1)')
                    .forEach(sub =>
                    h.subs.push(new Object({'id': sub.id, 'linkTo': sub, 'content': sub.getAttribute("menu-item") ? sub.getAttribute("menu-item") : sub.innerText})))

            })

        }
    }
</script>