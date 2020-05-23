var app = new Vue({

    el: '#subscriptions',


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

                axios.post(envVariableApi + '/payment/manage',
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

                axios.post(envVariableApi + "/payment/subscribe",
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
                    .get(envVariableApi + "/token/")
                    .then(response => this.payment.token = response.data)
            }
        }
})