let clients = [];
const socket = io => {
  io.on("connection", function(socket) {
    console.log("User connected");
    socket.on("chatmessage", (id,msg) => {
      console.log(id);
      clients.push(id);
      //socket.broadcast.emit("chatmessage", msg);
      socket.broadcast.to(id).emit("chatmessage", msg);
    });
  });
};

module.exports = socket;