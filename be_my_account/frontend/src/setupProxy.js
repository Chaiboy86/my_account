const proxy = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    proxy(
      // "/users",
      "/v2",
      {
        // target: "https://jsonplaceholder.typicode.com",
        target: "http://newsapi.org",
        secure: false,
        changeOrigin: true,
      }
    )
  );
};
