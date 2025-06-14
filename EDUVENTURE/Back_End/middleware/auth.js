const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  // Get token from headers (usually Authorization: Bearer <token>)
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach user info to request object
    req.user = decoded.user; // assuming you stored user info under 'user' key when signing
    next(); // allow request to proceed
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = auth;
