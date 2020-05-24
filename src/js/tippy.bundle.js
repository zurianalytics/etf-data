import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';


Vue.mixin({
    methods: {
        initializeTooltips: function () {
            // Initialize tooltips on info links
            tippy('.info', {
                animation: 'scale',
                theme: 'zurianalytics',
                inertia: true,
                interactive: true,
                allowHTML: true
            });
        },

        openTooltip: function (error, element, theme) {
            let t = tippy(element,
                {
                    content: error,
                    animation: 'scale',
                    theme: theme ? theme : 'aggressive',
                    trigger: 'manual',
                    allowHTML: true
                });
            t[0].show();
        },
    },

    created() {
        console.log("aa")
        this.initializeTooltips()
    }
})