import { createContext, useContext, useEffect, useState } from "react";
import socketio from "socket.io-client";
import { AuthContext } from "./AuthContext";

const BACKEND_URL = "http://localhost:5000";
const SocketContext = createContext(null);

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      const socketInstance = socketio(BACKEND_URL, { withCredentials: true });
      socketInstance.on("connect", () => {
        console.log("Connected to Socket.IO server");
      });

      socketInstance.on("disconnect", () => {
        console.log("Disconnected from Socket.IO server");
      });
      setSocket(socketInstance);
      return () => {
        socketInstance.disconnect();
        console.log("Socket disconnected");
      };
    } else {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
    }
  }, [isAuthenticated]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };
