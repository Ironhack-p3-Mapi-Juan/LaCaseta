function isBuddy(req, res, next){
    if (req.isAuthenticated() && req.user.dogBuddy){
        return next();
    }
    return res.status(403).json(new Error("Not Authorized"))
  }
  
  module.exports = isBuddy;