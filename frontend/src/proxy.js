const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        createProxyMiddleware('/api', {
            target: 'https://www.juso.go.kr/addrlink/addrLinkApiJsonp.do',
            changeOrigin: true,
            pathRewrite: {
                '^/api': '' // URL ^/api -> 공백 변경
            }
        })
    );
};