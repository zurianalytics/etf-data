new Vue({

    el: '#introduction',


    data() {
        return {
            isin: "LU0378437502",
            chart: {},
            fund: {},
            server: envVariableApi + "/product/",
            apiName: envVariableName
        }
    },

    mounted() {
        this.getFund()
    },


    methods:
        {
            getFund: function () {
                let url = envVariableApi + "/product/" + this.isin;

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
                let el = document.getElementById(element);

                // Take first 9 elements
                data = data.slice(0, 9)

                // Hide canvas
                if (data.length === 0) {
                    el.style.display = "none";
                    return
                } else
                    el.style.display = "block"

                return new Chart(el.getContext('2d'), {
                    type: 'pie',
                    data: {
                        labels: data.map(function (c) {
                            return c[attr]
                        }),
                        datasets: [{
                            label: '# of Votes',
                            data: data.map(function (c) {
                                return c["percentage"]
                            }),
                            backgroundColor: palette('cb-Blues', data.length).map(function (hex) {
                                return '#' + hex;
                            }),
                            borderColor: "rgba(0, 0, 0, 0)",
                            borderWidth: 8
                        }]
                    },
                    options: {
                        legend: {
                            position: (element === 'sectors') ? 'left' : 'right',
                            labels: {fontColor: '#a4cdfe', fontSize: 10}, align: 'end'
                        }
                    }
                });
            }
        }
})