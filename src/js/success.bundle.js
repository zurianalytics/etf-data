// Menu should always be last
import './section-side-menu'

const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get("myParam");

new Vue({
  el: "#app",

  computed: {
    token: function () {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get("token");
    },
  },
});
