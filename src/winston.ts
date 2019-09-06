import { createLogger, format, transports } from "winston";

// const levels = {
//   error: 0,
//   warn: 1,
//   info: 2,
//   verbose: 3,
//   debug: 4,
//   silly: 5
// };

const customLevels = {
  levels: {
    info: 0,
    good: 1,
    ok: 2,
    error: 3
  },
  colors: {
    normal: "blue",
    success: "green",
    warning: "yellow",
    error: "red"
  }
};

const logger = createLogger({
  level: "info",
  levels: customLevels.levels,
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss"
    }),
    format.colorize(),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "error.log", level: "error" }),
    new transports.File({ filename: "info.log", level: "info" }),
    new transports.File({ filename: "warn.log", level: "warn" })
  ]
});

export { logger, customLevels };
