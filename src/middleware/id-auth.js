function checkId() {
  return function (req, res, next) {
    if (!req.session || !req.session.user) {
      return res.redirect("/");
    }

    const sessionUitleenmandjeID = req.session.user.UitleenmandjeID;
    const routeUitleenmandjeID = req.params.uitleenmandjeID;

    if (sessionUitleenmandjeID != routeUitleenmandjeID) {
      return res.redirect("/not-found");
    }

    return next();
  };
}

module.exports = checkId;
