import passportLocal from 'passport-local';

const LocalStrategy = passportLocal.Strategy;
const localStrategy = new LocalStrategy(async (username, password, done) => {});

export { localStrategy };
