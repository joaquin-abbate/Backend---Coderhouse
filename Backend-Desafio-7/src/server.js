import express from "express";
import cookieParser from "cookie-parser";
import handlebars from "express-handlebars";
import mongoStore from "connect-mongo";
import passport from "passport";
import session from "express-session";
import usersRouter from "./routes/users.router.js";
import viewsRouter from "./routes/views.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { __dirname } from "./utils.js";
import "./db/dbConfig.js";
import "./passport/jwt.js";

import "dotenv/config";

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
        "mongodb+srv://admin:admin@cluster0.vcjyxe3.mongodb.net/coderhouse?retryWrites=true&w=majority",

      ttl: 10,
    }),
  })
);

app.use(errorHandler);
app.use(passport.initialize());
app.use(passport.session());

app.use("/users", usersRouter);
app.use(express.static(__dirname + "/public"));
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use("/", viewsRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Escuchando al puerto ${PORT}`);
});
