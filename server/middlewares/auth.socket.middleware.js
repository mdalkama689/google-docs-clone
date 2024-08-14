import jwt from "jsonwebtoken";

const authSocketMiddleware = (socket, next) => {
  const cookie = socket.request.headers.cookie;
  const token = cookie?.split("token=")[1];

  const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

  try {
    if (!token) return;

    const isTokenValid = jwt.verify(token, JWT_SECRET_KEY);

    if (!isTokenValid) return;

    socket.user = isTokenValid;
    next();
  } catch (error) {
    console.error("Token verification error: ", error);
    return;
  }
};

export default authSocketMiddleware;
