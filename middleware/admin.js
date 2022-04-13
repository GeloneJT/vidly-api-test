function admin(req, res, next) {
  if (!req.user.isAdmin) {
    res.status(403).send('Forbidden access');
    return;
  }
  next();
}
module.exports = admin;
