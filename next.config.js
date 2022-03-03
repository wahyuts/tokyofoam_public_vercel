module.exports = {
    reactStrictMode: true,
    extends: [
        //...
        'plugin:@next/next/recommended'
    ]
};

module.exports = {
    images: {
        domains: [
            'storage.googleapis.com',
            'https://www.youtube.com/',
            'fakestoreapi.com',
            'live.staticflickr.com',
            'res.cloudinary.com'
        ]
    },
    i18n: {
        locales: ['en', 'id'],
        defaultLocale: 'id',
        localeDetection: false
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        // Note: we provide webpack above so you should not `require` it
        // Perform customizations to webpack config
        config.plugins.push(
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery'
            })
        );
        // Important: return the modified config

        return config;
    }
};
