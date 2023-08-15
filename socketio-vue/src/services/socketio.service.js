// import { io } from 'socket.io-client';

class SocketioService {
  socket;

  constructor() {}

  // setupSocketConnection() {
  //   this.socket = io(process.env.VUE_APP_SOCKET_ENDPOINT);
  //   // this.socket.emit('test', 'Hello there from Vue.');
  //   this.socket.on("test", (arg) => {
  //     alert ("hello");
  //     console.log(arg); // world
  //   });
  //   // this.socket.on('test', (record) => {
  //   //     console.log(record);
  //   //   });
  // }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

export default new SocketioService();