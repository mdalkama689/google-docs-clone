import {
  findOrCreateDocument,
  saveDocument,
} from "../controllers/document.controller.js";
import authSocketMiddleware from "../middlewares/auth.socket.middleware.js";

const socketRoute = (io) => {
  io.use(authSocketMiddleware);

  io.on("connection", (socket) => {
    console.log("new user connected");

    socket.on("get-document", async (documentId) => {
      const loggedInUser = socket?.user?._id;
      const document = await findOrCreateDocument(documentId, loggedInUser);
      socket.join(documentId);

      socket.emit("load-document", document.data);

      socket.on("send-changes", (delta) => {
        socket.broadcast.to(documentId).emit("recieve-changes", delta);
      });

      socket.on("save-document", async (data) => {
        await saveDocument(documentId, data);
      });

      socket.on("disconnect", () => {
        console.log("user disconnect");
      });
    });
  });
};

export default socketRoute;
