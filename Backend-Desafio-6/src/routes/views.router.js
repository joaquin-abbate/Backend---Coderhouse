import { Router } from "express";
import passport from "passport";
import {
  registerResponse,
  loginResponse,
  githubResponse,
} from "../controllers/user.controller.js";

const router = Router();

router.post("/register", passport.authenticate("register"), registerResponse);

router.post("/login", passport.authenticate("login"), loginResponse);

router.get(
  "/register-github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/profile-github",
  passport.authenticate("github", { scope: ["user:email"] }),
  githubResponse
);

// ---------------------------------------------------------------------------------------

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/error-register", (req, res) => {
  res.render("errorRegister");
});

router.get("/error-login", (req, res) => {
  res.render("errorLogin");
});

router.get("/profile", (req, res) => {
  res.render("profile");
});
export default router;
