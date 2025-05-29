const {
    shareAll,
    withModuleFederationPlugin,
} = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
    name: 'hr-feed-mf',
    filename: 'remoteEntry.js',
    exposes: {
        './bootstrap': './src/bootstrap.ts',
    },
    shared: {
        // ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
    },
});
