const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/*", {
      target: "https://nd-social-api.herokuapp.com/api",
    })
  );
};
