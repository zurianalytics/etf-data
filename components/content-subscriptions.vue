<template>
    <div class="container-fluid"
         v-observe-visibility="(isVisible, entry) => visibilityChanged(isVisible, entry, 'subscriptions')">
        <h1 id="subscriptions" menu-item>Subscriptions</h1>

        <p>
            {{apiName}} can be called for free up to a certain number of requests daily. Thie number of free requests 
            may change day-to-day, as we closelly monitor abuse.
        </p>

        <p>
            Nevertheless it should always be enough for someone just exploring the API and doing small individual research. 
            In the case where these requests are not enough, you will need to subscribe to one of the plans listed below.
        </p>

        <div class="row"
             v-observe-visibility="(isVisible, entry) => visibilityChanged(isVisible, entry, 'subscription-plans')">
            <div class="col-md-12">

                <h2 id="subscription-plans" menu-item>Subscription Plans </h2>

                <div class="row">
                    <div class="col-md-4">
                        <h3>Individual</h3>
                        <ul>
                            <li><span class = "accent-green">10 000</span> API calls | month</li>
                            <li><a class="info" data-tippy-content="
          For individual research and use in personal investing. Data can not be used to present products to third parties.
          <a href ='https://zurianalytics.com/terms_conditions' class = 'external'>Learn more</a>">Individual</a> Use
                                License
                            </li>
                            <li><span class="accent-hard">5</span> <span>&euro; | month</span></li>
                        </ul>
                    </div>
                    <div class="col-md-4">
                        <h3>Business</h3>
                        <ul>
                            <li><span class="accent-green">500 000</span> API calls | month</li>
                            <li><a class="info" data-tippy-content="
          For business research and providing data to third parties.
          <a href ='https://zurianalytics.com/terms_conditions' class = 'external'>Learn more</a>">Business</a> Use
                                License
                            </li>
                            <li>Integration Support</li>
                            <li><span class="accent-hard">377</span> <span>&euro; | month</span></li>
                        </ul>
                    </div>
                    <div class="col-md-4">
                        <h3>Enterprise</h3>
                        <ul>
                            <li><span class="accent-hard">Unlimited</span> API calls | month</li>
                            <li><a class="info" data-tippy-content="
          For business research and providing data to third parties.
          <a href ='https://zurianalytics.com/terms_conditions' class = 'external'>Learn more</a>">Business</a> Use
                                License
                            </li>
                            <li>Integration Support</li>
                            <li><span>Custom Data Feeds</span> (e.g., <span class="accent-hard">CSV</span>, <span
                                    class="accent-hard">XLSX</span>)
                            </li>
                            <li>Get In Touch: <br/><a class="external" href="mailto:contact@zurianalytics.com">contact@zurianalytics.com</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-8">
                        <form id="payment-form">

                            <div class="row">

                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="card-element">
                                            Credit or debit card
                                        </label>
                                        <div id="card-element"><!-- A Stripe Element will be inserted here. --></div>
                                    </div>

                                    <div class="form-group">
                                        <label for="api-token">
              <a class="info" data-tippy-content="The API token is used to authenticate & track all API calls.
              A token can be reused and additional calls and time will be added to the token automatically with the subscription.
              The API token must be kept safe and secret.
              The only restriction of the token is for it to be between 4 and 240 characters.">API Token </a>
                                        </label>
                                        <textarea id="api-token" readonly="readonly" v-model="payment.token"
                                                  v-on:click="copyToClipboard"></textarea>
                                    </div>

                                </div>

                                <div class="col-md-6">


                                    <div class="form-group">

                                        <label for="plan">
                                            Select Plan
                                        </label>
                                        <select id="plan" selected="individual" v-model="payment.plan">
                                            <option value="individual">Individual</option>
                                            <option value="business">Business</option>
                                        </select>

                                    </div>


                                    <div class="form-group">
                                        <label for="email">
                                            Email Address
                                        </label>
                                        <input class="form-control" id="email" placeholder="Enter email" type="text"
                                               v-model="payment.email">
                                    </div>

                                </div>

                            </div>

                            <span id="subscribe-wrapper">
                        <button :disabled='!isComplete || isProcessing || paymentComplete'
                                id="subscribe"
                                v-bind:class="{ 'success': paymentComplete }" v-on:click="initiatePaymentRequest">
                            <span>Subscribe</span><span v-if="paymentComplete">d</span>
                            <img src="images/loading.svg" v-if="isProcessing">
                        </button>
                    </span>

                        </form>
                    </div>
                </div>

            </div>
        </div>


        <div class="row"
             v-observe-visibility="(isVisible, entry) => visibilityChanged(isVisible, entry, 'manage-subscription')">

            <div class="col-md-6">

                <h2 id="manage-subscription" menu-item>Manage Subscription</h2>

                <p>
                    You can manage your subscription by adding time / changing payment methods / cancelling
                    subscriptions, etc, by logging in with your token and email address.

                    For any problems, free feel to contact us at <a class = "external" href ="mailto:support@zurianalytics.com">support@zurianalytics.com</a>
                </p>

                <form id="manage-subscription-form" method="GET">

                    <div class="row">
                        <div class="col-md-6">

                            <div class="form-group">
                                <label for="email">
                                    Email Address
                                </label>
                                <input class="form-control" id="email" placeholder="Enter email" type="email"
                                       v-model="dashboard.email">
                            </div>

                            <div class="form-group">
                                <label for="api-token">
              <a class="info" data-tippy-content="The API token is used to authenticate & track all API calls.
              A token can be reused and additional calls and time will be added to the token automatically with the subscription.
              The API token must be kept safe and secret.
              The only restriction of the token is for it to be between 4 and 240 characters.">API Token </a>
                                </label>
                                <textarea id="api-token" v-model="dashboard.token"></textarea>
                            </div>

                        </div>
                    </div>

                    <button :disabled='!dashboard.email || !dashboard.token' id="management-portal"
                            v-on:click="managementDashboardLogin">
                        <span>Manage Subscription</span>
                    </button>

                </form>

            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "content-subscriptions",

        data() {
            return {

                apiName: 'Zuri Analytics API',

                /* =======================================
                 = Payment Props
                 ======================================= */
                payment:
                    {
                        stripe: null,
                        clientSecret: "pk_test_Dzl7yTz2o6HP1UYa4Wb4ZC8g00tZaM2vr5",
                        card: null,
                        cardError: "error",
                        status: "ready",
                        plan: null,
                        token: null,
                        email: null
                    },

                /* =======================================
                 = Management Dashboard Props
                 ======================================= */
                dashboard:
                    {
                        email: null,
                        token: null
                    },
            }
        },

        computed: {
            isComplete: function () {
                return this.payment.plan
                    && this.payment.email
                    && this.isEmailValid
                    && this.payment.token
                    && this.payment.token.length >= 4
                    && !this.payment.cardError
                    && !this.paymentComplete;
            },

            isEmailValid: function () {
                return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/.test(this.payment.email)
            },

            isProcessing: function () {
                return this.payment.status !== "ready" && this.payment.status !== "complete"
            },

            paymentComplete: function () {
                return this.payment.status === "complete"
            }
        },

        mounted() {
            this.initializeStripe();
            this.initializeToken();
        },

        methods:
            {
                /* =======================================
                 = Misc METHODS
                 ======================================= */
                copyToClipboard: function (event) {
                    event.currentTarget.select();
                    document.execCommand('copy');
                },

                /* =======================================
                 = STRIPE METHODS
                 ======================================= */
                managementDashboardLogin: function (event) {
                    event.preventDefault();

                    var button = '#' + event.currentTarget.id;

                    axios.post(process.env.api + '/payment/manage',
                        {
                            email: this.dashboard.email,
                            token: this.dashboard.token
                        })
                        .then(result => {
                            console.dir("Management Dashboard Session returned: ", result.data);
                            window.location.replace(result.data);
                        })
                        .catch(result => {
                            console.dir("Management Dashboard Session failed:: ", result)
                            this.openTooltip(result.response.data.message, button);
                            this.payment.status = "ready"
                        });

                },

                initiatePaymentRequest: function (event) {
                    event.preventDefault();
                    this.payment.status = "processing"

                    this.submitToStripe()
                        .then(this.submitToServer.bind(this))
                        .catch(function (error) {
                            console.error("Error in creating subscription: ", error)
                            this.openTooltip(error.response.data.message, '#subscribe-wrapper')
                            this.payment.status = "ready"
                        })
                },

                submitToServer: function (result) {
                    var instance = this;

                    axios.post(process.env.api + "/payment/subscribe",
                        {
                            plan: this.payment.plan,
                            token: this.payment.token,
                            email: this.payment.email,
                            paymentMethodId: result.paymentMethod.id
                        })
                        .then(function (result) {
                            console.dir("Subscription returned: ", result.data);

                            if (result.data.status === 'active') {
                                instance.openTooltip("Your payment has been successful! Additional time & calls has been loaded to your api token! Call the token API for additional information!", '#subscribe-wrapper', 'mild');
                                instance.payment.status = "complete";
                            } else if (result.data.status === 'incomplete') {
                                instance.submitToStripeConfirmPayment(result.data.latest_invoice.payment_intent.client_secret);
                            }

                        })
                        .catch(function (result) {
                            console.dir("Request failed: ", result.data)
                            instance.openTooltip(result.response.data.message, '#subscribe-wrapper');
                            instance.payment.status = "ready"
                        })
                },

                submitToStripeConfirmPayment: function (clientSecret) {

                    console.dir("Status incomplete, verifying payment ...");
                    this.payment.stripe.confirmCardPayment(clientSecret)
                        .then(result => {
                            if (result.error) {
                                if (result.error && result.error.message)
                                    this.openTooltip(result.error.message, '#subscribe-wrapper');
                                else
                                    this.openTooltip("Subscription failed for mysterious reasons.", '#subscribe-wrapper')
                                this.payment.status = "ready";
                            } else {
                                this.openTooltip("Your payment has been successful! Additional time & calls has been loaded to your api token! Call the token API for additional information!", '#subscribe-wrapper', 'mild');
                                this.payment.status = "complete";
                            }
                        });
                },

                submitToStripe: function () {
                    return this.payment.stripe.createPaymentMethod({
                        type: 'card',
                        card: this.payment.card
                    });
                },

                displayCardErrors: function (event) {
                    if (!event.error)
                        this.payment.cardError = null
                    else {
                        this.payment.cardError = event.error
                        this.openTooltip(event.error.message, '#card-element')
                    }
                },

                initializeStripe: function () {
                    // Create a Stripe client.
                    this.payment.stripe = Stripe(this.payment.clientSecret);

                    // Create an instance of Elements.
                    var elements = this.payment.stripe.elements();

                    // Custom styling can be passed to options when creating an Element.
                    // (Note that this demo uses a wider set of styles than the guide below.)
                    var style = {
                        base: {
                            color: '#32325d',
                            fontSize: '16px',
                        }
                    };

                    // Create an instance of the card Element.
                    this.payment.card = elements.create('card', {style: style});

                    this.payment.card.on("change", this.displayCardErrors.bind(this))
                    // Add an instance of the card Element into the `card-element` <div>.
                    this.payment.card.mount('#card-element');
                },

                initializeToken: function () {
                    return axios
                        .get(process.env.api + "/token/")
                        .then(response => this.payment.token = response.data)
                }
            }
    }
</script>

<style scoped>

</style>