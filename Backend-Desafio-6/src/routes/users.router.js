import { Router } from "express";
import UserDao from "../daos/user.dao.js";
import { getAllProductsCtr } from "../controllers/products.controller.js";
const userDao = new UserDao();

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const newUser = await userDao.createUser(req.body);
    if (newUser) {
      res.redirect("/login");
    } else {
      res.redirect("/error-register");
    }
  } catch (error) {
    console.log(error);
  }
});
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userDao.loginUser(req.body);
    if (user) {
      req.session.email = email;
      req.session.password = password;
      res.redirect("/profile");
    } else {
      res.redirect("/error-login");
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/profile", async (req, res) => {
  const products = getAllProductsCtr();
  res.render("profile", { products });
});

router.post("/logout", async (req, res) => {});
export default router;
