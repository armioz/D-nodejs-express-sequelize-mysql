exports.server = {
  host: process.env.HOST || "nuxtapp-login.herokuapp.com",
  port: process.env.PORT || "3000",
};

exports.JWT = {
  secret: "HariHos",
  options: {},
};
