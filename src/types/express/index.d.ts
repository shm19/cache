declare namespace Express {
  interface Request {
    logger: require('pino').Logger;
  }
}
