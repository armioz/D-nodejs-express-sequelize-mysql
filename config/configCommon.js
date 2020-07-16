exports.server = {
  host: process.env.HOST || "0.0.0.0",
  port: process.env.PORT || "3000",
};

exports.JWT = {
  secret: "HariHos",
  options: {},
};
