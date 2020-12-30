'use strict';

const WebSocket = require('websocket');
const { webSocket } = require('rxjs/webSocket');
const { map} = require('rxjs/operators');


const connect = (url) => {
  return webSocket({
    url,
    WebSocketCtor: WebSocket.w3cwebsocket,
    serializer: (value) => 
      typeof value === 'object' ? JSON.stringify(value) : value,
  });
}


const parseEvents = (observer) => {
  return observer.pipe(
    map(event => {
      const { user, timestamp, type, title }  = event;
      return { user, date: new Date(timestamp * 1000), type, title };
    })
  );
}

module.exports = {
  connect,
  parseEvents,
}
