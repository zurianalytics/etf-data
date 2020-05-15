<template>
    <div class="container-fluid"
         v-observe-visibility="(isVisible, entry) => visibilityChanged(isVisible, entry, 'get-individual-etf')">

        <h1 id="get-individual-etf">Get Individual ETF/Fund</h1>

        <div class="row">

            <div class="col-md-6">

                <div v-observe-visibility="(isVisible, entry) => visibilityChanged(isVisible, entry, 'get-product-by-isin')">
                    <h2 id="get-product-by-isin">By ISIN</h2>


                    <p>This endpoint searches for an ETF/Fund by its <span class="info" data-tippy-content="
          An International Securities Identification Number (ISIN)
          uniquely identifies a security. It can be safely reused across applications">ISIN</span>
                    </p>

                    <p>
                        Retrieves all of the information known for a specific product in a JSON format.
                    </p>

                    <h3>Parameters</h3>
                    <ul>
                        <li>
                            <code class="accent-bold">isin</code> <code class="accent-gray">String</code> <code
                                class="accent-hard">Mandatory</code>
                            <p>
                                The ISIN that distinctly identifies the product.
                            </p>
                        </li>
                    </ul>

                    <h3>Examples</h3>
                    <ul>
                        <li>
                            <span>
                                <code class="accent-hard">GET </code>
                                <code class="inline">{{apiUrl}}/fund/<span
                                        class="accent-hard">DE000ETFL326</span></code>
                            </span>
                            <p>
                                Retrieves information about <a class="external"
                                                               href="https://www.deka-etf.de/etfs/Deka-MSCI-China-ex-A-Shares-UCITS-ETF">Deka
                                MSCI China</a>.
                            </p>
                        </li>
                    </ul>

                </div>
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

        <div class="row">

            <div class="col-md-6">

                <div v-observe-visibility="(isVisible, entry) => visibilityChanged(isVisible, entry, 'get-product-by-ticker-and-exchange')">
                    <h2 id="get-product-by-ticker-and-exchange">By Ticker & Exchange</h2>


                    <p>
                        This endpoint searches for an ETF/Fund by a pair of its <a class="info" data-tippy-content="
          A ticker symbol or stock symbol is an abbreviation used to uniquely identify publicly traded shares of a particular stock on a particular stock market.">Exchange Ticker</a>
                        and Exchange.
                    </p>
                    <p>
                        Supported exchanges are listed below
                    </p>

                    <p>
                        Retrieves all of the information known for a specific product in a JSON format.
                    </p>

                    <h3>Parameters</h3>
                    <ul>
                        <li>
                            <code class="accent-bold">Exchange</code> <code class="accent-gray">Exchange</code> <code
                                class="accent-hard">Mandatory</code>
                            <p>
                                The exchange, which contains the provided ticker.
                                One of:
                                <code class="inline">LSE</code>,
                                <code class="inline">XETRA</code>,
                                <code class="inline">BORSA_ITALIANA</code>,
                                <code class="inline">SIX</code>
                            </p>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <code class="accent-bold">Ticker</code> <code class="accent-gray">String</code> <code
                                class="accent-hard">Mandatory</code>
                            <p>
                                The ticker of the product for the given exchange
                            </p>
                        </li>
                    </ul>

                    <h3>Examples</h3>
                    <ul>
                        <li>
                            <span>
                                <code class="accent-hard">GET</code>
                                <code>{{apiUrl}}/fund?exchange=<span class="accent-hard">SIX</span>&ticker=<span
                                        class="accent-hard">EVOE</span></code>
                            </span>
                            <p>
                                Retrieves information about <a class="external"
                                                               href="https://www.bnpparibas-am.lu/intermediary-fund-selector/fundsheet/equity/bnp-paribas-easy-equity-low-vol-europe-ucits-etf-c-lu1377381717/">BNP
                                Easy Equity Low Vol EUROPE - EUR</a>
                            </p>
                        </li>
                    </ul>

                </div>
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
    export default {
        name: "content-subscriptions",

        data() {
            return {
                apiUrl: process.env.api
            }
        }
    }

</script>