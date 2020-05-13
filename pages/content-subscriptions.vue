<template>
    <div class="container-fluid">
        <h1 id="subscriptions">Subscriptions</h1>

        <div class="row"
             v-observe-visibility="(isVisible, entry) => visibilityChanged(isVisible, entry, 'subscriptions')">

            <div class="col-md-12"
                 v-observe-visibility="(isVisible, entry) => visibilityChanged(isVisible, entry, 'subscription-plans')">

                <h2 id="subscription-plans">Subscription Plans </h2>


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
              <span class="info" data-tippy-content="The API token is used to authenticate & track all API calls.
              A token can be reused and additional calls and time will be added to the token automatically with the subscription.
              The API token must be kept safe and secret.
              The only restriction of the token is for it to be between 4 and 240 characters.">API Token </span>
                                </label>
                                <textarea readonly="readonly" id="api-token" v-model="payment.token"></textarea>
                            </div>

                        </div>

                        <div class="col-md-6">


                            <div class="form-group">

                                <label for="plan">
                                    Select Plan
                                </label>
                                <select id="plan" v-model="payment.plan" selected="individual">
                                    <option value="individual">Individual</option>
                                    <option value="business">Business</option>
                                </select>

                            </div>


                            <div class="form-group">
                                <label for="email">
                                    Email Address
                                </label>
                                <input type="email" class="form-control" id="email" placeholder="Enter email"
                                       v-model="payment.email">
                            </div>

                        </div>

                    </div>

                    <button v-bind:class="{ 'success': paymentComplete }"
                            :disabled='!isComplete || isProcessing || paymentComplete'
                            v-on:click="initiatePaymentRequest" id="subscribe">
                        <span>Subscribe</span><span v-if="paymentComplete">d</span>
                        <img v-if="isProcessing" src="images/loading.svg">
                    </button>

                </form>


            </div>
        </div>

        <div class="row"
             v-observe-visibility="(isVisible, entry) => visibilityChanged(isVisible, entry, 'manage-subscription')">

            <div class="col-md-6"
                 v-observe-visibility="(isVisible, entry) => visibilityChanged(isVisible, entry, 'manage-subscription')">

                <h2 id="manage-subscription">Manage Subscription</h2>

                <p>
                    You can manage your subscription by adding time / changing payment methods / cancelling
                    subscriptions, etc, by
                    logging in with your token and email address.
                </p>

                <form method="GET" id="manage-subscription">

                    <div class="row">
                        <div class="col-md-6">

                            <div class="form-group">
                                <label for="email">
                                    Email Address
                                </label>
                                <input type="email" class="form-control" id="email" placeholder="Enter email"
                                       v-model="dashboard.email">
                            </div>

                            <div class="form-group">
                                <label for="api-token">
              <span class="info" data-tippy-content="The API token is used to authenticate & track all API calls.
              A token can be reused and additional calls and time will be added to the token automatically with the subscription.
              The API token must be kept safe and secret.
              The only restriction of the token is for it to be between 4 and 240 characters.">API Token </span>
                                </label>
                                <textarea id="api-token" v-model="dashboard.token"></textarea>
                            </div>

                        </div>
                    </div>

                    <button :disabled='!dashboard.email || !dashboard.token' v-on:click="managementDashboardLogin"
                            id="management-portal">
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
                    && this.payment.token
                    && this.payment.token.length >= 4
                    && !this.payment.cardError
                    && !this.paymentComplete;
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

                    var instance = this;

                    this.submitToStripe()
                        .then(instance.submitToServer.bind(this))
                        .catch(function (error) {
                            instance.openTooltip(error.response.data.message)
                            instance.payment.status = "ready"
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
                                instance.openTooltip("Your payment has been successful! Additional time & calls has been loaded to your api token! Call the token API for additional information!", '#subscribe', 'mild');
                                instance.payment.status = "complete";
                            } else if (result.data.status === 'incomplete') {
                                instance.submitToStripeConfirmPayment(result.data.latest_invoice.payment_intent.client_secret);
                            }

                        })
                        .catch(function (result) {
                            console.dir("Subscription failed: ", result)
                            instance.openTooltip(result.response.data.message);
                            instance.payment.status = "ready"
                        })
                },

                submitToStripeConfirmPayment: function (clientSecret) {
                    var instance = this;

                    console.dir("Status incomplete, verifying payment ...");
                    this.payment.stripe.confirmCardPayment(clientSecret)
                        .then(function (result) {
                            if (result.error) {
                                if (result.error && result.error.message)
                                    instance.openTooltip(result.error.message);
                                else
                                    instance.openTooltip("Subscription failed for mysterious reasons.")
                                instance.payment.status = "ready";
                            } else {
                                instance.openTooltip("Your payment has been successful! Additional time & calls has been loaded to your api token! Call the token API for additional information!", '#subscribe', 'mild');
                                instance.payment.status = "complete";
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
                        .get(process.env.api+ "/token/")
                        .then(response => this.payment.token = response.data)
                }
            }
    }
</script>

<style scoped>

</style>