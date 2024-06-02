function checkRole() {
  return function (req, res, next) {
    if (!req.session || !req.session.user || !req.session.user.type) {
      if (req.path === "/" || req.path === "/login") {
        return next();
      }
      return res.redirect("/");
    }

    const userRole = req.session.user.type;

    if (req.path.startsWith("/admin") && userRole !== "Admin") {
      return res.redirect("/not-found");
    }

    return next();
  };
}

module.exports = checkRole;
