const webpack = require('webpack');

module.exports = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {
        if (!isServer) {
            // Exclude all paths starting with ./pages/api/ from webpack builds
            config.plugins.push(new webpack.IgnorePlugin(/^\.\/pages\/api\/.*$/))
        }
        return config
    },
}
