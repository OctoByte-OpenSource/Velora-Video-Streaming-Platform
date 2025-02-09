const { Server } = require("socket.io");
const roomModel = require("./models/room.model");
const {
  VIDEO_PAUSE,
  VIDEO_PLAY,
  VIDEO_SYNC,
  JOIN_ROOM,
  ROOM_DATA,
  MESSAGE_ROOM,
} = require("./constants/socketEvent");

const SocketConnection = (server) => {
  const io = new Server(server, {
    cors: {
      origin: [
        "http://localhost:5173",
        "http://localhost:4173",
        process.env.CLIENT_URL,
      ],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    },
  });
  io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    //for joining room
    socket.on(JOIN_ROOM, async ({ roomName }) => {
      const room = await roomModel.findOne({ roomName });
      if (!room)
        return socket.emit("Error", {
          message: "Kindly provide valid room name",
        });

      socket.join(roomName);

      io.to(roomName).emit(ROOM_DATA, room);
    });
    //for sending message in room
    socket.on(MESSAGE_ROOM, async ({ roomName, message }) => {
      const room = await roomModel.findOne({ roomName });
      if (!room)
        return socket.emit("Error", {
          message: "Kindly provide valid room name",
        });
      // -> can use mangodb to store message for 24hrs
      io.to(roomName).emit(MESSAGE_ROOM, { serverMessage: message });
    });

    // for playing and pausing athe video
    socket.on(VIDEO_PLAY, ({ trackTime, roomName }) => {
      io.to(roomName).emit(VIDEO_PLAY, { trackTime, roomName });
    });

    socket.on(VIDEO_PAUSE, ({ trackTime, roomName }) => {
      io.to(roomName).emit(VIDEO_PAUSE, { trackTime, roomName });
    });

    socket.on(VIDEO_SYNC, ({ trackTime, roomName }) =>
      io.to(roomName).emit(VIDEO_SYNC, { trackTime, roomName })
    );
  });
};

module.exports = SocketConnection;
