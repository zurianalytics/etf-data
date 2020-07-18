import {env} from './global-variables'
import axios from 'axios'

new Vue({

    el: '#subscriptions-app',


    data() {
        return {

            apiName: env.name,

            /* =======================================
             = Payment Props
             ======================================= */
            payment:
                {
                    stripe: null,
                    clientSecret: "pk_live_Ku4juyvaWDrHh3DQHg55aFaI00pj25URBI",
                    plan: null,
                    token: null,
                    processing: false,
                    tokenSaved: false
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

    mounted() {
        this.initializeToken();

        let pollForStripe = () =>
        {
            if (typeof(Stripe) === "undefined")
                setTimeout(pollForStripe, 250);
            else 
                this.initializeStripe();
        }
        
        pollForStripe();
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

                axios.post(env.api + '/payment/manage',
                    {
                        token: this.dashboard.token,
                        successUrl: env.website,
                        returnUrl: env.website,
                    })
                    .then(result => {
                        console.dir("Management Dashboard Session returned: ", result.data);
                        window.location.replace(result.data);
                    })
                    .catch(result => {
                        console.dir("Management Dashboard Session failed:: ", result)
                        this.openTooltip("<p>Unfortunatelly something went wrong. Is your token active?</p><p>Unloaded tokens can't be managed</p>", button);
                        this.payment.status = "ready"
                    });

            },

            selfCheckout: function (event) {
                //event.preventDefault()
                console.info("Redirecting to stripe api...")
                this.payment.processing = true
                this.payment.stripe.redirectToCheckout({
                    lineItems: [{
                      // Replace with the ID of your price
                      price: this.payment.plan,
                      quantity: 1
                    }],
                    clientReferenceId: this.payment.token,
                    mode: 'subscription',
                    successUrl: env.website + '/success' + '?token=' + this.payment.token,
                    cancelUrl: env.website,
                  }).then( (result) => {
                    this.openTooltip(result.response.data.message, '#subscribe-wrapper')
                    // If `redirectToCheckout` fails due to a browser or network
                    // error, display the localized error message to your customer
                    // using `result.error.message`.
                  }).finally(() => this.processing = false);
            },

            initializeStripe: function () {
                // Create a Stripe client.
                this.payment.stripe = Stripe(this.payment.clientSecret);
            },

            initializeToken: function () {
                this.payment.tokenSaved = false;
                return axios
                    .get(env.api + "/token/")
                    .then(response => this.payment.token = response.data)
            }
        }
})