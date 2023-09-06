import factory from "../persistence/daos/factory.js";
import { logger } from "../utils/logger.js";
const { userManager } = factory;

export const isPremium = async (req, res, next) => {
  try {
    const isLoggedIn = req.session.passport;
    if (isLoggedIn) {
      const user = await userManager.getById(req.session.passport.user);
      if (user.role === "premium") {
        next();
      } else {
        res.status(403).json({
          message: "Endpoint no accesible como Premium.",
        });
      }
    } else {
      res.status(400).json({
        message: "Este endpoint esta protegido por Roles.",
      });
    }
  } catch (err) {
    logger.error(err);
  }
};
