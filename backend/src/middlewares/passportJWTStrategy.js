import jwtPassportStrategy from "passport-jwt";

const JWTstrategy = jwtPassportStrategy.Strategy;
const ExtractJWT = jwtPassportStrategy.ExtractJwt;

const jwtStrategy = new JWTstrategy(
  {
    secretOrKey: process.env.JWT_SECRET, //TODO
    jwtFromRequest: ExtractJWT.fromUrlQueryParameter("Authorization"),
  },
  async (token, done) => {
    console.log("🚀 ~ file: passportJWTStrategy.js ~ line 11 ~ token", token);
    try {
      return done(null, token.user);
    } catch (error) {
      done(error);
    }
  }
);

export default jwtStrategy;
