import Vue from 'vue'
import VueObserveVisibility from 'vue-observe-visibility'

Vue.use(VueObserveVisibility)


Vue.mixin({
    methods: {
        visibilityChanged(isVisible, entry, linkPointsTo) {
            this.isVisible = isVisible

            // Get the parent link
            var link = document.querySelector('a[href="#' + linkPointsTo + '"]').parentElement

            // Mark as a visibility candidate
            if (isVisible)
                link.classList.add('candidate');
            else
                link.classList.remove('candidate')


            // Remove active from all other candidates on the same level
            link.parentElement.querySelectorAll(':scope > .active').forEach(function (e) {
                e.classList.remove('active')
            })

            var target = [].slice.call(link.parentElement.querySelectorAll(':scope > .candidate')).pop()
            if (target)
                target.classList.add('active')
        }
    }
})