const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../models");
const passportJWT = require("passport-jwt");
const secret = require("./configCommon").JWT.secret;
const util = require("../encryp/utils");
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (username, password, done) => {
      try {
        const user = await db.user.findOne({
          where: {
            email: username,
          },
        });
        console.log(user);
        if (user.length === 0) {
          return done(null, false, { message: "Incorrect username." });
        }

        const comparedPassword = await util.verifyPassword(
          password,
          user.dataValues
        );

        delete user.dataValues.password;

        if (!comparedPassword) {
          return done(null, false, { message: "Incorrect password." });
        }

        return done(null, user.dataValues, {
          message: "Logged In Successfully",
        });
      } catch (err) {
        done(err);
      }
    }
  )
);

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: secret,
    },
    async (jwtPayload, done) => {
      try {
        const user = await db.user.findAll({ where: { id: jwtPayload.id } });
        delete user[0].dataValues.password;
        done(null, user[0].dataValues);
      } catch (error) {
        return done(error);
      }
    }
  )
);
