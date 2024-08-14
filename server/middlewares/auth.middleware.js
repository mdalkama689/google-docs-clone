import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

  try {
    const { token } = req.cookies;
    console.log("token : ", token);
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Unauthenticated, please login to continue",
      });
    }

    const isTokenValid = jwt.verify(token, JWT_SECRET_KEY);

    if (!isTokenValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }
    req.user = isTokenValid;
    next();
  } catch (error) {
    console.error("Token verification error: ", error);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default authMiddleware;
