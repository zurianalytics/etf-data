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
                            <img class="logo" src="images/logo.png"/>
                            <div><span class="accent-blue">ETF</span> Data API</div>
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
                    <content-introduction></content-introduction>
                    <content-single-product></content-single-product>
                    <content-authentication></content-authentication>
                    <content-subscriptions></content-subscriptions>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
    import SideMenu from "../components/side-menu";
    import ContentIntroduction from "../components/content-introduction";
    import ContentSingleProduct from "../components/content-single-product";
    import ContentSubscriptions from "../components/content-subscriptions";
    import ContentAuthentication from "../components/content-authentication";

    export default {
        components: {
            ContentIntroduction,
            ContentAuthentication,
            ContentSubscriptions,
            ContentSingleProduct,
            SideMenu
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
