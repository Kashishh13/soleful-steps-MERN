

import jwt from 'jsonwebtoken';


const auth = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) {
    console.log("No token provided");
    return res.status(401).send({ error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userID = decoded.id;
    console.log("Decoded user ID:", decoded.id); // Debugging line
    next();
  } catch (error) {
    console.log("Invalid token");
    res.status(401).send({ error: 'Invalid token' });
  }
};


export default auth


