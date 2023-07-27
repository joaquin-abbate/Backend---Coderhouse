import express from "express";
import cookieParser from "cookie-parser";
import handlebars from "express-handlebars";
import mongoStore from "connect-mongo";
import passport from "passport";
import session from "express-session";

import { __dirname } from "./utils.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import morgan from "morgan";

import apiRouter from "./routes/index.js";
import emailRouter from "./routes/email.router.js";
import cartRouter from "./routes/cart.router.js";
import smsRouter from "./routes/sms.router.js";
import viewsRouter from "./routes/views.routes.js";
import userRouter from "./routes/user.router.js";

import "./persistence/daos/mongodb/connection.js";
import "./passport/jwt.js";
import "dotenv/config";
import MongoStore from "connect-mongo";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);
app.use(morgan("dev"));

app.use(cookieParser());

const storeOptions = {
  store: new MongoStore({
    mongoUrl:
      "mongodb+srv://admin_joa:joadmin1@abbate.llw9bfj.mongodb.net/ecommerce?retryWrites=true&w=majority",
    crypto: {
      secret: "1234",
    },
    //autoRemoveInterval: 15,
    autoRemove: "interval",
    ttl: 15,
  }),
  secret: "12345",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1500,
  },
};
app.use(session(storeOptions));
app.use("/api", apiRouter);
app.use("/email", emailRouter);
app.use("/cart", cartRouter);
app.use("/sms", smsRouter);
app.use("/users", userRouter);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + "/public"));
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use("/", viewsRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Servidor en el puerto:  ${PORT}`));
