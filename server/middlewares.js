// function auth(req, res, next) {
//     // if (!req.session.id) {
//     //   return res.status(401).json("You are not logged in");
//     // }
//   const id = req.session.id;
//     // If session ID exists, return req.session and proceed to the next middleware
//     return next(id);
//   }

function auth(req, res, next) {
    if (!req.session.id) {
      return res.status(401).json("You are not logged in");
    }
  
    // If session ID exists, return it and proceed to the next middleware
    return res.json({ sessionId: req.session.id });
  }
  


  module.exports = {auth}