import { createContext, useContext, useMemo } from "react";
import io from "socket.io-client";

const SocketContext = createContext();

const getSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2E4OTNmMjU5YzVjZmU1ODQ5ZTEzNTEiLCJpYXQiOjE3MzkxMDEzNDB9.sHjXIJnn50j4E10vD27o0Px_K6PUFfEMzZ5MBCkNerk";
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
