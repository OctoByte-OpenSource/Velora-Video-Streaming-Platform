const { Server } = require("socket.io");
const roomModel = require("./models/room.model");
const {
  VIDEO_PAUSE,
  VIDEO_PLAY,
  VIDEO_SYNC,
  JOIN_ROOM,
  ROOM_DATA,
  MESSAGE_ROOM,
  ROOM_JOIN_ALERT,
  SEEK_TO,
  ROOM_LEFT_ALERT,
} = require("./constants/socketEvent");

const socketAuth = require("./middlewares/socketAuth.middleware");
const { userModel } = require("./models/user.model");

const roomMembers = new Map();

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

  io.use(async (socket, next) => await socketAuth(socket, next));
  io.on("connection", (socket) => {
    console.log("a user connected", socket.id);
    const user = socket.user;
    const userIdString = user._id.toString();
    //for joining room
    socket.on(JOIN_ROOM, async ({ roomName }) => {
      if (!roomMembers.has(roomName)) {
        roomMembers.set(roomName, new Set());
      }
      if (!roomMembers.get(roomName).has(userIdString)) {
        roomMembers.get(roomName).add(userIdString);
      }

      console.log("room members", roomMembers);
      const room = await roomModel.findOne({ roomName });
      if (!room)
        return socket.emit("Error", {
          message: "Kindly provide valid room name",
        });

      socket.join(roomName);
      const peopleCount = io.sockets.adapter.rooms.get(roomName).size;
      const membersSet = roomMembers.get(roomName);
      const membersId = membersSet ? Array.from(membersSet) : [];

      const membersPromise = membersId.map((memberId) =>
        userModel.findById(memberId, "username profileImage")
      );
      const members = await Promise.all(membersPromise);

      console.log("members", members);
      io.to(roomName).emit(ROOM_DATA, {
        room,
        peopleCount,
        members,
      });
      io.to(roomName).emit(ROOM_JOIN_ALERT, { name: user.username });
    });
    //for sending message in room
    socket.on(MESSAGE_ROOM, async ({ roomName, message }) => {
      const room = await roomModel.findOne({ roomName });
      if (!room) {
        console.log("No room with name", roomName);
        return socket.emit("Error", {
          message: "Kindly provide valid room name",
        });
      }

      const realTimeMessage = {
        content: message,
        sender: {
          _id: user._id,
          username: user.username,
          profileImg: user.profileImage.url,
        },
        createdAt: new Date().toString(),
      };

      // -> can use mangodb to store message for 24hrs
      io.to(roomName).emit(MESSAGE_ROOM, {
        serverMessage: realTimeMessage,
        forRoom: roomName,
      });
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

    socket.on(SEEK_TO, ({ trackTime, roomName }) => {
      io.to(roomName).emit(SEEK_TO, { trackTime, roomName });
    });

    socket.on("disconnect", async () => {
      let userRoom = null;
      let userName = null;

      for (let [room, membersInRoom] of roomMembers) {
        console.log("disconnected room data", room, roomMembers);
        if (membersInRoom.has(userIdString)) {
          console.log("disconnected room data", room, roomMembers);
          userRoom = room;
          userName = user.username;
          membersInRoom.delete(userIdString);
          console.log(
            "disconnected room data after deleted",
            room,
            roomMembers
          );
        }
        if (membersInRoom.size === 0) {
          delete roomMembers[room];
        }
        break;
      }
      const peopleCount = io.sockets.adapter.rooms.get(userRoom)?.size || 0;
      const membersSet = roomMembers.get(userRoom);
      const membersId = membersSet ? Array.from(membersSet) : [];

      const membersPromise = membersId.map((memberId) =>
        userModel.findById(memberId, "username profileImage")
      );
      const members = await Promise.all(membersPromise);
      const room = await roomModel.findOne({ roomName: userRoom });

      if (userName && userRoom) {
        io.to(userRoom).emit(ROOM_DATA, {
          room,
          peopleCount,
          members,
        });
        io.to(userRoom).emit(ROOM_LEFT_ALERT, { name: userName });
      }

      console.log(`User ${socket.id} disconneted`);
    });
  });
};

module.exports = SocketConnection;
