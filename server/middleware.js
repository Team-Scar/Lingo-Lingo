const admin = require('./firebaseConfig.js');

const getAuthToken = (req, res, next) => {
  if (req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    req.authToken = req.headers.authorization.split(' ')[1];
  } else {
    req.authToken = null;
  }
  next();
};

const checkIfAuthenticated = (req, res, next) => {
  getAuthToken(req, res. next, async () => {
    try {
      const {authToken} = req;
      const userInfo = await admin.auth().verifyIdToken(authToken);
      req.authId = userInfo.uid;
      return next();
    } catch (e) {
      return res.status(401).send('You are not authorized to make this request');
    }
  });
};

module.exports.checkIfAuthenticated = checkIfAuthenticated;
