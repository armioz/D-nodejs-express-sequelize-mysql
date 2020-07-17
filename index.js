const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const userController = require("./Controllers/user");
const roleController = require("./Controllers/role");
const app = express();
require("./config/passport");
var corsOptions = {
  origin: "nuxtapp-login.herokuapp.com",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// passport
app.use(passport.initialize());

app.use(passport.session());
// simple route
app.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

app.get("/api/user", userController.get);
app.post("/api/user/info", userController.getInfo);
app.get("/api/user/:id", userController.get);
app.post("/api/user", userController.store);
app.put("/api/user/:id", userController.update);
app.delete("/api/user/:id", userController.destroy);

app.get("/api/role", roleController.index);
app.post("/api/role", roleController.store);
app.put("/api/role/:id", roleController.update);
app.delete("/api/role/:id", roleController.destroy);

//authen
app.use("/auth", require("./route/auth"));
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
