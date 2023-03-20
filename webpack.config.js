const path = require('path');

module.exports = {
    // ... other options
    module: {
        rules: [
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: '@svgr/webpack',
                        options: {
                            throwIfNamespace: false
                        }
                    },
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[hash].[ext]',
                            outputPath: 'static/media'
                        }
                    }
                ]
            }
        ]
    }
};
