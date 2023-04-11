import { Component } from '@angular/core';
// const express = require('express');
// import { Server } from 'http';
// import { createServer } from 'https';
// import { readFileSync } from 'fs';
// import * as bodyParser from 'body-parser';
// const socketIO = require('socket.io')
// const app = express();
// const port = "http://localhost:4200/"

// app.use(bodyParser.json());

// const server = new Server(app);

// const io = socketIO(server);

// io.on('connection', (socket:any) => {
//     console.log('Socket.io: User connected');

//     socket.on('disconnect', () => {
//       console.log('Socket.io: User disconnected');
//     });
//   });

//   const oneDayBefore = new Date();
//   oneDayBefore.setDate(oneDayBefore.getDate() - 1);

  // setInterval(async () => {
  //   try {
  //     const events = await Event.findAll({
  //       where: {
  //         date: oneDayBefore,
  //         notify: true,
  //       },
  //     });
  //     events.forEach((event:any) => {
  //       io.emit(`event-notification-${event.user_id}`, {
  //         message: `Your event "${event.title}" is starting tomorrow`,
  //         eventId: event.id,
  //       });
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, 60 * 60 * 1000); // check every hour

@Component({
  selector: 'app-app-server',
  templateUrl: './app-server.component.html',
  styleUrls: ['./app-server.component.css']
})
export class AppServerComponent {
  
}
