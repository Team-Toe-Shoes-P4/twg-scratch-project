

const authController = {
  protectRoute(req, res, next) {
    if(req.isAuthenticated()) return next();
    else res.status(401).json({msg: 'You are not authorized to view this. Please sign-in.'});
  },
  verifyAuth(req, res, next) {
    console.log('req.user', req.user);
    if(!req.isAuthenticated()) {return res.status(401).json({isAuth: false, userID: null});}
    return next();
  },
  check (req, res, next) {
    console.log('request.body', req.body);
    return next();
  }

};

module.exports = authController;