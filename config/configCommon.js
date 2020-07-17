exports.server = {
  host: process.env.HOST || "https://express-nuxt.herokuapp.com/",
  port: process.env.PORT || "3000",
};

exports.JWT = {
  secret: "HariHos",
  options: {},
};
