import { createContext, useContext, useMemo } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";

const SocketContext = createContext();

const getSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
  const token = useSelector((state) => state.auth.token);
  const socket = useMemo(
    () =>
      io("http://localhost:5000", {
        extraHeaders: { Authorization: `Bearer ${token}` },
      }),
    []
  );
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { getSocket, SocketProvider };
