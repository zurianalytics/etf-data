import {env} from './global-variables'
import axios from 'axios'
import { Chart } from "frappe-charts/dist/frappe-charts.min.esm"

new Vue({

    el: '#introduction',


    data() {
        return {
            isin: "LU0378437502",
            chart: {},
            fund: {},
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

                console.log("Loading fund on: " + url);

                // Get fund
                axios
                    .get(url)
                    .then(response => {
                        this.fund = response.data

                        let sectors = response.data.sectors;
                        let regions = response.data.regions;

                        if (this.chart.sectors)
                            this.chart.sectors.destroy();
                        this.chart.sectors = this.drawChart("sectors", sectors, "sector")

                        if (this.chart.regions)
                            this.chart.regions.destroy();
                        this.chart.regions = this.drawChart("countries", regions, "country")
                    })
                    // Free requests have expired
                    .catch(error => {
                        document
                            .querySelector('#demo-content')
                            .innerHTML = error.response ? error.response.data.message : error
                    })
            },

            drawChart: function (element, data, attr) {
                console.log("Drawing charts")

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