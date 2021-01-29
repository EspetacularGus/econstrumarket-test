const proxy = [
    {
        context: '/api',
        target: 'https://api.hgbrasil.com',
        pathRewrite: { '^/api': '' }
    }
];

module.exports = proxy;