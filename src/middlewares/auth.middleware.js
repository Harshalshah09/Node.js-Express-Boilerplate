import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  // Extract the Authorization header
  const authHeader = req.header("Authorization");

  // Check if the header exists
  if (!authHeader) {
    return res.status(401).send("Access denied. No token provided.");
  }

  // Check if the token is in the correct format
  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).send("Access denied. Invalid token format.");
  }

  // Extract the token from the Authorization header
  const token = authHeader.replace("Bearer ", "");

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded token payload to the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    res.status(400).send("Invalid token.");
  }
};
