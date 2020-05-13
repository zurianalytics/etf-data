<template lang="html">


    <div class="container" id="app">

        <!-- Stripe hosted -->
        <script src="https://js.stripe.com/v3/"></script>

        <!-- Left Side Menu -->
        <div class="row">
            <div class="col-md-2">

                <nav v-bind:class="{ active: interaction.menu }">

                    <a class="puller" href="" v-on:click.prevent="interaction.menu = !interaction.menu">
                        <span v-if="!interaction.menu">»</span>
                        <span v-if="interaction.menu">«</span>
                    </a>
                    <div class="representation">
                        <a href="https://zurianalytics.com/">
                            <img src="~/assets/logo.png" class = "logo"/>
                            <div><span class="special">ETF</span> Data API</div>
                        </a>
                    </div>

                    <side-menu></side-menu>

                    <footer>
                        <ul>
                            <li><a href='#subscription-plans'>Sign Up for a Developer Key</a></li>
                            <li><a href='https://zurianalytics.com'>This is a ZuriAnalytics API.</a></li>
                        </ul>
                    </footer>
                </nav>
            </div>
            <div class="col-md-10">
                <!-- Main Page Conent -->
                <div class="content">

                    <!-- Page content -->
                    <introduction></introduction>
                    <content-single-e-t-f></content-single-e-t-f>
                    <content-subscriptions></content-subscriptions>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
    import SideMenu from "./side-menu";
    import Introduction from "./content-demo";
    import ContentSingleETF from "./content-single-etf";
    import ContentSubscriptions from "./content-subscriptions";

    export default {
        components: {
            ContentSubscriptions,
            Introduction,
            SideMenu,
            ContentSingleETF,
        },

        data() {
            return {
                interaction:
                    {
                        menu: false
                    }
            }
        }
    };
</script>

<style lang="scss">
    @import 'css/main';
</style>
