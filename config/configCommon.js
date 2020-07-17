exports.server = {
  host: process.env.HOST || "https://nuxtapp-login.herokuapp.com/",
  port: process.env.PORT || "3000",
};

exports.JWT = {
  secret: "HariHos",
  options: {},
};
