// Todos los console.log fueron reemplazados con logger!

import winston from "winston";
import "winston-mongodb";

const logConfiguration = {
  transports: [
    winston.add(
      new winston.transports.MongoDB({
        options: { useUnifiedTopology: true },
        db: "mongodb+srv://admin_joa:joa_admin1@abbate.llw9bfj.mongodb.net/ecommerce?retryWrites=true&w=majority",
        collection: "logs",
        tryReconnect: true,
        level: "error",
      })
    ),
    new winston.transports.Console({ level: "silly" }),

    new winston.transports.File({
      filename: "./logs.log",
      level: "info",
    }),
  ],
};

export const logger = winston.createLogger(logConfiguration);
