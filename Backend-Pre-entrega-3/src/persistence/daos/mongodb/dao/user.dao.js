import { UserModel } from "../models/user.model.js";
import { createHash, isValidPassword } from "../../../../utils.js";

import "dotenv/config";

export default class UserDao {
  async createUser(user) {
    try {
      //! ahora no tomamos todo el body sino que vamos a desestructurar
      const { email, password } = user;
      const existUser = await UserModel.findOne({ email });
      if (!existUser) {
        if (
          email === process.env.ADMIN_EMAIL &&
          password === process.env.ADMIN_PASSWORD
        ) {
          const newUser = await UserModel.create({
            ...user,
            password: createHash(password),
            role: "admin",
          });
          return newUser;
        } else {
          const newUser = await UserModel.create({
            ...user,
            password: createHash(password),
          });
          return newUser;
        }
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async loginUser(user) {
    try {
      const { email, password } = user;
      const userExist = await this.getByEmail(email);
      if (userExist) {
        const passValid = isValidPassword(userExist, password);
        if (!passValid) return false;
        else return userExist;
      }
      return false;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async getById(id) {
    try {
      const userExist = await UserModel.findById(id);
      if (userExist) {
        return userExist;
      }
      return false;
    } catch (error) {
      console.log(error);
    }
  }

  async getByEmail(email) {
    try {
      const userExist = await UserModel.findOne({ email });
      if (userExist) {
        return userExist;
      }
      return false;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}
