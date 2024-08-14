import app from "./app.js";
import { config } from "dotenv";
import { Server } from "socket.io";
import http from "http";
import socketRoute from "./routes/socket.route.js";
import connectToDB from "./config/db.connection.js";
config();

const PORT = process.env.PORT;
const CLIENT_URL = process.env.CLIENT_URL;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

socketRoute(io);

server.listen(PORT, async () => {
  await connectToDB();
  console.log(`backend is listen at http://:localhost${PORT}`);
});

export { io };
