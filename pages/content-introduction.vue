<template>
    <div class="container-fluid">

        <h1 id="introduction">Introduction</h1>

        <div class="row" v-observe-visibility="(isVisible, entry) => visibilityChanged(isVisible, entry, 'introduction')">
            <div class="col-md-6">

                <p>
                    This API contains all ETFs listed on all major european exchanges.
                </p>
                <p>
                    The API provides both manually analyzed information which does not change often, as well as
                    deep machine-learned fundamental information about the ETFs, such as: sector
                    allocation, country allocation, dividend yield, investment factors, etc.
                </p>
                <p>
                    The information is updated each day and any structural changes, listing, de-listing of an ETF is available
                    immediately.
                </p>
            </div>


            <div class="col-md-6">
                <div class="accent-box .light">

                    <header id = "demo-header">
                        <code class="info" data-tippy-content="Input an ISIN into the field to the right, to check what information we store about the security">
                            LIVE DEMO (ISIN):</code><input v-model="isin" v-on:change="getFund()"/>
                    </header>


                    <div id = "demo-content">

                        <div class="row">
                            <div class="col-sm-12">
                                <canvas id="countries" style = "width: 100%;"></canvas>
                            </div>
                            <div class="col-sm-12">
                                <canvas id="sectors" style= "width: 100%;"></canvas>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-12">
                                <label>Fund Name:</label>
                                <span>{{ fund.name }}</span>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-4">
                                <label>indexName</label>
                                <span>{{ fund.indexName }}</span>
                            </div>
                            <div class="col-sm-4">
                                <label>indexProvider</label>
                                <span>{{ fund.indexProvider }}</span>
                            </div>
                            <div class="col-sm-4">
                                <label>provider</label>
                                <span>{{ fund.provider }}</span>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-4">
                                <label>Asset Class</label>
                                <span>{{ fund.assetClass }}</span>
                            </div>
                            <div class="col-sm-4">
                                <label>Domicile</label>
                                <span>{{ fund.domicile }}</span>
                            </div>
                            <div class="col-sm-4">
                                <label>Base Currency</label>
                                <span>{{ fund.baseCurrency }}</span>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-4">
                                <label>ReplicationMethod</label>
                                <span>{{ fund.replicationMethod }}</span>
                            </div>
                            <div class="col-sm-4">
                                <label>Distribution Type</label>
                                <span>{{ fund.distributionType }}</span>
                            </div>
                            <div class="col-sm-4">
                                <label>Distribution Frequency</label>
                                <span>{{ fund.distributionFrequency }}</span>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-4">
                                <label>Product Type</label>
                                <span>{{ fund.productType }}</span>
                            </div>
                            <div class="col-sm-4">
                                <label>Factor</label>
                                <span>{{ fund.factor }}</span>
                            </div>
                        </div>

                    </div>


                </div>

            </div>

        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import Chart from 'chart.js'

    export default {
        name: "content-introduction",

        data() {
            return {
                isin: "LU1615092217",
                chart: {},
                fund: {},
                server: process.env.api + "/fund/"
            }
        },

        mounted()
        {
            this.getFund()
        },


        methods:
        {
            getFund: function() {
                let url = process.env.api + "fund/" + this.isin;

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
                    .catch(error =>
                    {
                        console.log(error)

                        document
                            .querySelector('#demo-content')
                            .innerHTML = error.response.data.message
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
    }
</script>