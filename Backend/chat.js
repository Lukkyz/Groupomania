exports.chat = (io) => {
  let connected = [];

  io.on("connection", (socket) => {
    socket.on("message", (msg) =>
      io.emit("message", { user: socket.username, message: msg })
    );
    socket.on("join", (username) => {
      if (connected.indexOf(username) == -1) {
        connected.push(username);
      }
      socket.username = username;
      socket.broadcast.emit("message", {
        message: socket.username + " a rejoint le tchat !",
      });
      io.emit("connected", connected);
    });
    socket.on("leave", (username) => {
      let indexUser = connected.indexOf(username);
      connected.splice(indexUser, 1);
      io.emit("connected", connected);
      socket.broadcast.emit("message", {
        message: socket.username + " a quitté le chat !",
      });
    });
  });
};
