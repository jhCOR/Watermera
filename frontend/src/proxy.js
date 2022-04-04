const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/',
    createProxyMiddleware({
      target: 'https://k-water-react.run.goorm.io',
      changeOrigin: true,
    })
  );
};