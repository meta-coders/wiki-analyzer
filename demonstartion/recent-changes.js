'use strict';

const { interval } = require('rxjs');
const { throttle } = require('rxjs/operators');
const { connect, parseEvents } = require('./wiki-analyzer-service');


const URL = 'ws://127.0.0.1:80/recent-changes';
const INTERVAL = 250;

const subject = connect(URL);
const eventSource = parseEvents(subject).pipe(
  throttle(() => interval(INTERVAL)),
);

eventSource.subscribe(console.log, console.error);
