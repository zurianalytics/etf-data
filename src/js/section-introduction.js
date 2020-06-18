import {env} from './global-variables'
import axios from 'axios'
import { Chart } from "frappe-charts/dist/frappe-charts.min.esm"

new Vue({

    el: '#introduction',


    data() {
        return {
            isin: "DE000A14ND46",
            chart: {},
            fund: {
                sectors: [], 
                regions: []
            },
            fundError: null,
            server: env.api + "/product/",
            apiName: env.name,
            url: this.server + this.isin
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
                this.url = this.server + this.isin;

                console.info("Loading fund on: " + this.url);

                // Get fund
                axios
                    .get(this.url)
                    .then(response => {
                        this.fundError = false;
                        this.fund = response.data
                        this.$nextTick(l => 
                        {
                            this.drawChart("sectors", response.data.sectors, "sector")
                            this.drawChart("countries", response.data.regions, "country")
                        })
                    })
                    // Free requests have expired
                    .catch(error => {
                        console.error(error)
                        //this.fundError = "Unspecified error occured."
                        if (typeof error.response === "undefined")
                            this.fundError = "Unspecified error occured."
                        else if (error && error.response.status == 404)
                            this.fundError = "Unfortunatelly the product provided could not be found. Did you try with a correct ISIN?"
                        else if (error && error.response.status == 401)
                            this.fundError = "Unfortunatelly your free requests have expired."+ 
                            " Please feel free to visit again tomorrow, or <a href = '#subscription-plans' class = 'link'>subscribe</a> to a plan."
                    })
            },

            drawChart: function (element, data, attr) {
                if (data.length === 0)
                    document.querySelector('#' + element).style.display = "none"
                else 
                    document.querySelector('#' + element).style.display = "block"
                
                // Add other 
                let delta = 100 - data.map(d => d.percentage).reduce((a, b) => a + b, 0);

                if (delta > 0)
                    data.push(new Object(
                        {
                            'country': 'OTH',
                            'sector': 'OTHER',
                            'percentage': Number(delta.toFixed(2))
                        }))
                
                let dataS = {
                    labels: data.map(d => d[attr]).map(this.shortenString),
                    datasets: [{values: data.map(d => d.percentage)}]
                }

                new Chart('#' + element, {  
                    data: dataS,
                    height: 140,
                    type: 'percentage', // or 'bar', 'line', 'scatter', 'pie', 'percentage'
                    colors: ['hsla(227, 52%, 25%, 1)', 'hsla(227, 50%, 50%, 1)', 'hsla(227, 80%, 70%, 1)',
                             'hsla(200, 80%, 70%, 1)', 'hsla(200, 50%, 50%, 1)', 'hsla(200, 52%, 25%, 1)',
                             'hsla(154, 45%, 40%, 1)', 'hsla(154, 45%, 50%, 1)', 'hsla(154, 55%, 57%, 1)',
                             'hsla(124, 55%, 57%, 1)', 'hsla(124, 45%, 50%, 1)', 'hsla(124, 45%, 40%, 1)',
                             'hsla(88, 55%, 57%, 1)', 'hsla(88, 45%, 50%, 1)', 'hsla(88, 45%, 40%, 1)',
                             'hsla(60, 55%, 57%, 1)', 'hsla(60, 45%, 50%, 1)', 'hsla(60, 45%, 40%, 1)'],
                    barOptions: {
                        height: 20,          // default: 20
                        depth: 0,             // default: 2
                        spaceRatio: 1,
                        stacked: true

                    }
                })
                //this.resizeChart(element);
            },

            shortenString: function(s)
            {
                if (!s.includes("_"))
                    return s.substring(0, 3);
                return s.split("_").map(s => s.substring(0, 1)).join("")
            }
        }
})