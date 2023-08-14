import express from "express";
import cookieParser from "cookie-parser";
import handlebars from "express-handlebars";
import mongoStore from "connect-mongo";
import passport from "passport";
import session from "express-session";

import apiRouter from "./routes/index.js";
import emailRouter from "./routes/email.router.js";
import cartRouter from "./routes/cart.router.js";
import viewsRouter from "./routes/views.routes.js";
import userRouter from "./routes/user.router.js";
import loggerRouter from "./routes/loggers.router.js";

import { errorHandler } from "./middlewares/errorHandler.js";
import { __dirname } from "./utils/utils.js";
import "./persistence/daos/mongodb/connection.js";
import "./passport/jwt.js";

import "dotenv/config";
import { logger } from "./utils/logger.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: "sessionKey",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 10000,
    },
    store: new mongoStore({
      mongoUrl:
        "mongodb+srv://admin_joa:joa_admin1@abbate.llw9bfj.mongodb.net/ecommerce?retryWrites=true&w=majority",

      ttl: 10,
    }),
  })
);

app.use(errorHandler);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", apiRouter);
app.use("/email", emailRouter);
app.use("/cart", cartRouter);
app.use("/users", userRouter);
app.use("/logger", loggerRouter);

app.use(express.static(__dirname + "/public"));
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use("/", viewsRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  logger.info(`Escuchando al puerto ${PORT}`);
});
