import factory from "../persistence/daos/factory.js";
const { userManager } = factory;

export const isAdmin = async (req, res, next) => {
  try {
    const isLoggedIn = req.session.passport;
    if (isLoggedIn) {
      const user = await userManager.getById(req.session.passport.user);
      if (user.role === "admin") {
        next();
      } else {
        res.status(403).json({
          message: "Endpoint no accesible como Admin.",
        });
      }
    } else {
      res.status(400).json({
        message: "Este endpoint esta protegido por Roles.",
      });
    }
  } catch (err) {
    console.log(err);
  }
};
