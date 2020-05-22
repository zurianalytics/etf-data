export default {
    env: {
        api: 'https://test.api.etf.zurianalytics.com'
    },
    plugins: [
        '~/plugins/tippy',
        '~/plugins/json-renderer'
    ],
    build: {
        publicPath: '',
        analyze: {
            analyzerMode: 'static'
        }
    },
    buildModules: [
        // Simple usage
        '@nuxtjs/moment'
    ],
    modules: [
        [
            "nuxt-compress",
            {
                gzip: {
                    cache: true
                },
                brotli: {
                    threshold: 10240
                }
            }
        ]
    ]
}