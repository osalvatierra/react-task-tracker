const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        "/tasks",
        createProxyMiddleware( {
            target: "https://my-json-server.typicode.com/osalvatierra/tasks/",
            changeOrigin: true,
        })
    );
};