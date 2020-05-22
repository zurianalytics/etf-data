<template>
    <div class="container-fluid"
         v-observe-visibility="(isVisible, entry) => visibilityChanged(isVisible, entry, 'dynamic-search')">

        <h1 id="dynamic-search">Dynamic Search</h1>

        <div class="row">

            <div class="col-md-6">

                <p>This endpoint searches ETFs/Funds by dynamic criteria.</p>

                <p>This endpoint is not meant as a way to extract coprehensive
                information about the desired ETFs. It will return a list of basic attributes (ISIN & Name). Any further information
                needs to be fetched with using the <a class = "internal" href = "#get-individual-etf">Individual Endpoints</a></p>

                <p>
                    All of the parameters listed below can be attached as query parameters in an arbitary order in order to build a request:
                </p>
                <p>
                    <code class="inline">{{apiUrl}}/search?<span class = "accent-hard">param1</span>=v1&amp;<span class = "accent-hard">param2</span>=v2</code>
                </p>

                <h3>Parameters</h3>
                <ul>
                    <li>
                        <code class="accent-bold">exchange</code> <code class="accent-gray">Exchange</code> <code class="accent-hard">Optional</code>
                        <p>
                            Will filter products only listed on a specific exchange
                            <code class="inline">LSE</code>,
                            <code class="inline">XETRA</code>,
                            <code class="inline">BORSA_ITALIANA</code>,
                            <code class="inline">SIX</code>
                        </p>
                    </li>
                    <li>
                        <code class="accent-bold">[ALPHA3-COUNTRY-CODE]</code> <code class="accent-gray">Numeric</code> <code class="accent-hard">Optional</code>
                        <p>
                            The ETFs will be filtered for ETFs that have exposure to the provided

                            <a href = "https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes" class = "external">Alpha3-Country-Code</a>. The minimum exposure required is the value for this parameter.
                        </p>
                        <p>
                            As an example in order to search for products with at least <span class = "accent-green">50%</span> exposure to <span class = "accent-green">Ireland</span>
                            write:
                        </p>
                        <p>
                            <code class="inline">{{apiUrl}}/search?<span class = "accent-hard">IRL</span>=<span class = "accent-hard">50</span></code>
                        </p>
                    </li>
                    <li>
                        <code class="accent-bold">[FACTOR]</code> <code class="accent-gray">Numeric</code> <code class="accent-hard">Optional</code>
                        <p>
                            The ETFs will be filtered for ETFs that have exposure to the provided

                            <code class = 'inline'>Factor</code>. The minimum exposure required is the value for this parameter.
                        </p>
                        <p>
                            The available factors are:

                            <code v-for="factor of factors" class = "inline">{{factor}}</code>
                        </p>
                        <p>
                            As an example in order to search for products with at least <span class = "accent-green">50%</span> exposure to <span class = "accent-green">Ireland</span>
                            write:
                        </p>
                        <p>
                            <code class="inline">{{apiUrl}}/search?<span class = "accent-hard">IRL</span>=<span class = "accent-hard">50</span></code>
                        </p>
                    </li>
                </ul>

            </div>
            <div class="col-md-6">
                <div class="accent-box">
                    <header>
                        <code>GET</code><code>{{apiUrl}}/fund/:isin</code>
                    </header>


                    <div><code class="json">

                        {
                        "totalFee":0.5,
                        "indexName":"BofA Merrill Lynch Diversified Pref Securities NTR Index",
                        "indexProvider":"Merrill Lynch",
                        "name":"Invesco Preferred Shares UCITS ETF Acc",
                        "isin":"IE00BG482169",
                        "provider":"Invesco",
                        "domicile":"IRL",
                        "baseCurrency":"USD",
                        "assetClass":"EQUITY",
                        "replicationMethod":"PHYSICAL_OPTIMIZED",
                        "productType":"ETF",
                        "factor":null,
                        "distributionFrequency":null,
                        "distributionType":null,
                        "listings":[
                        {
                        "currency":"USD",
                        "exchange":"SIX",
                        "ticker":"PRAC",
                        "reutersTicker":"PRAC.S",
                        "bloombergTicker":"PRAC SE"
                        },
                        {
                        "currency":"USD",
                        "exchange":"LSE",
                        "ticker":"PRAC",
                        "reutersTicker":null,
                        "bloombergTicker":null
                        }
                        ],
                        "regions":[
                        {
                        "country":"USA",
                        "percentage":100.0
                        }
                        ],
                        "sectors":[

                        ]
                        }
                    </code>
                    </div>
                </div>


            </div>
        </div>

    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "content-search-product",

        data() {
            return {
                apiUrl: process.env.api
            }
        },


        async asyncData () {
            const { data } = await axios.get(this.apiUrl + "/metadata/factors")
            return { factors: data }
        }

    }

</script>