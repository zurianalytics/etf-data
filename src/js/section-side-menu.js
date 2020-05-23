var app = new Vue({

    el: '#side-menu',

    data() {
        return {
            menuItems: [],
        }
    },

    methods: 
    {
        smoothScrollToLink(target, e)
        {
            e.preventDefault() 
            // Scroll
            target.scrollIntoView({ behavior: 'smooth' });
        },

        applyIntersectStyles(entries, observer)
        {
            entries.forEach(e =>
            {
                if (e.intersectionRatio > 0)
                    document.querySelector('a[href="#' + e.target.id + '"]').parentElement.classList.add("active")
                else
                    document.querySelector('a[href="#' + e.target.id + '"]').parentElement.classList.remove("active")
            })
        },
    },

    /**
     * Create the menu from the headers in the pages
     */
    mounted()
    {
        // Create observer to change active / inactive links
        let observer = new IntersectionObserver(this.applyIntersectStyles, {
                root: document,
                rootMargin: "0px"
        })

        // Add smooth scroll to the selected link
        document.querySelectorAll('[menu-item][top]').forEach(link => link.addEventListener('click', this.smoothScrollToLink));

        // Create a drop down for for each menu-item
        document.querySelectorAll('[menu-item][top]').forEach(topLevel =>
        {
            observer.observe(topLevel);

            let h = new Object({
                'id': topLevel.id, 
                'content': topLevel.getAttribute("menu-item"), 
                'subs': [], 
                'linkTo': topLevel});
            this.menuItems.push(h)

            
            topLevel
                .querySelectorAll('[menu-item]:not([top])')
                .forEach(subLevel =>
                {
                    observer.observe(subLevel)

                    h.subs.push(new Object({
                        'id': subLevel.id, 
                        'linkTo': subLevel, 
                        'content': subLevel.getAttribute("menu-item")
                        }))
                })

        })

    }
})