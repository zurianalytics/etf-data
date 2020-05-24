import {env} from './global-variables'
import axios from 'axios'
import { Chart } from "frappe-charts/dist/frappe-charts.min.esm"

new Vue({

    el: '#introduction',


    data() {
        return {
            isin: "DE000A0F5UG3",
            chart: {},
            fund: {
                sectors: [], 
                regions: []
            },
            server: env.api + "/product/",
            apiName: env.name
        }
    },

    mounted() {
        this.getFund()
        window.addEventListener('resize', e=>
        {
            e.stopImmediatePropagation()
        })
    },


    methods:
        {
            getFund: function () {
                let url = this.server + this.isin;

                console.info("Loading fund on: " + url);

                // Get fund
                axios
                    .get(url)
                    .then(response => {
                        this.fund = response.data
                        this.drawChart("sectors", response.data.sectors, "sector")
                        this.drawChart("countries", response.data.regions, "country")
                    })
                    // Free requests have expired
                    .catch(error => {
                        console.error(error)
                        let text = "Unspecified error occured."
                        if (typeof error.response === "undefined")
                            text = "Unspecified error occured."
                        else if (error && error.response.status == 404)
                            text = "Unfortunatelly the product provided could not be found. Did you try with a correct ISIN?"
                        else if (error && error.response.status == 401)
                            text = "Unfortunatelly your free requests have expired."+ 
                            " Please feel free to visit again tomorrow, or <a href = '#subscription-plans' class = 'internal'>subscribe</a>" +
                            " to the API for a price of a coffee."
                        
                        document.querySelector('#demo-content').innerHTML = text
                    })
            },

            drawChart: function (element, data, attr) {

                if (data.length === 0)
                    document.querySelector('#' + element).style.display = "none"
                else 
                    document.querySelector('#' + element).style.display = "block"

                let dataS = {
                    labels: data.map(d => d[attr]),
                    datasets: [{values: data.map(d => d.percentage)}]
                }

                new Chart('#' + element, {  
                    data: dataS,
                    type: 'pie', // or 'bar', 'line', 'scatter', 'pie', 'percentage'
                    height: 280,
                    colors: []
                })

                this.resizeChart(element);
            },

            resizeChart: function(element)
            {
                // Resize 
                let holder = document.querySelector('#' + element).querySelector('.frappe-chart')
                holder.setAttribute("height", 200)
                let pixels = 0;
                holder.querySelector('.pie-chart').removeAttribute("transform")
                holder.querySelectorAll('.chart-legend').forEach(l => l.removeAttribute("transform"))
                holder.querySelectorAll('.chart-legend > *').forEach(l => l.setAttribute("transform", "translate(10, " + (pixels += 17) + ")"))
            }
        }
})