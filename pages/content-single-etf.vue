<template>
    <div class="container-fluid">

        <h1 id="get-single-etf">Get Single ETF</h1>

        <div class="row" v-observe-visibility="(isVisible, entry) => visibilityChanged(isVisible, entry, 'get-single-etf')">
            <div class="col-md-6">

                <div v-observe-visibility="(isVisible, entry) => visibilityChanged(isVisible, entry, 'get-etf-by-isin-exchange')">
                    <h2 id="get-etf-by-isin-exchange">Get ETF by ISIN & exchange</h2>


                    <p>This endpoint searches for an ETF by its <span class="info" data-tippy-content="
An International Securities Identification Number (ISIN)
uniquely identifies a security. Its structure is defined in ISO 6166.">ISIN</span>
                    </p>

                    <p>
                        Retrieves all of the meta information available for the ETF, such as Sector Exposure, Country Exposure, etc.
                    </p>

                    <h3>Parameters</h3>
                    <ul>
                        <li>
                            <code>isin</code> <code class = "code-aggresive">String</code>
                            <p>
                                his endpoint searches for an ETF by its <span class="info" data-tippy-content="
          An International Securities Identification Number (ISIN)
          uniquely identifies a security. Its structure is defined in ISO 6166.">ISIN</span>
                            </p>
                        </li>
                    </ul>

                </div>
            </div>
            <div class="col-md-6">
                <div class="accent-box">
                    <header>
                        <code>GET</code><code><%= app_config['api_url'] %>/fund/:isin</code>
                    </header>
                    <pre><code><% code("json") do %>
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
              <% end %></code>
      </pre>
                </div>


            </div>
        </div>
    </div>

</template>

<script>

</script>