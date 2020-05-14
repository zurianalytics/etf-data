<template>
    <div class="container-fluid" v-observe-visibility="(isVisible, entry) => visibilityChanged(isVisible, entry, 'authentication')">

        <h1 id="authentication">Authentication</h1>

        <div class="row">

            <div class = "col-md-6">
                <p>
                    {{apiName}} uses tokens to authenticate requests. These tokens are computed automatically when you <a href = "#subscriptions" class = "internal">subscribe</a>.
                </p>
                <p>
                    Your token carry many privileges, so be sure to keep them secure! Do not share your token in publicly accessible areas such as GitHub, client-side code, and so forth.
                </p>
                <p>
                    Your token carry many privileges, so be sure to keep them secure! Do not share your token in publicly accessible areas such as GitHub, client-side code, and so forth.
                </p>
                <p>
                    All API requests must be made over HTTPS. Calls made over plain HTTP will fail. API requests without authentication will also fail.
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "content-authentication",

        data() {
            return {
                apiUrl: process.env.api,
                apiName: 'Zuri Analytics API'
            }
        }
    }

</script>