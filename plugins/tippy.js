import Vue from 'vue';
import tippy from "tippy.js";

Vue.mixin({
    methods: {
        initializeTooltips: function () {
            tippy('[data-tippy-content]', {
                animation: 'scale',
                theme: 'zurianalytics',
                inertia: true
            });
        },

        openTooltip: function (error, element, theme) {
            var t = tippy(element,
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

    mounted()
    {
        this.initializeTooltips()
    }
})