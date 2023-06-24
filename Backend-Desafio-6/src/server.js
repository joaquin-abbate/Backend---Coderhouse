import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import { __dirname } from "./utils.js";
import viewsRouter from "./routes/views.router.js";
import usersRouter from "./routes/users.router.js";
import mongoStore from "connect-mongo";
import { errorHandler } from "./middlewares/errorHandler.js";
import passport from "passport";
import "./db/dbConfig.js";
import "./passport/local.js";
import "./passport/github.js";
import handlebars from "express-handlebars";

const app = express();

app.use("/", viewsRouter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use(express.json());
// app.use(express.urlencoded({ extended: true }))
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
        "mongodb+srv://admin_joa:joadmin1@abbate.llw9bfj.mongodb.net/ecommerce?retryWrites=true&w=majority",
      ttl: 10,
    }),
  })
);

app.use(errorHandler);
app.use(passport.initialize());
app.use(passport.session());

app.use("/users", usersRouter);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Escuchando al puerto ${PORT}`);
});
