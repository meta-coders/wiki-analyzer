'use strict';

const { connect, parseEvents } = require('./wiki-analyzer-service');


const URL = 'ws://127.0.0.1:80/users-recent-changes';
const users = [
  { name: 'Wmr-bot'},
  { name: 'LD AWBot'},
  // { errorTest: 'Oops' },
];

const subject = connect(URL);
const eventSource = parseEvents(subject);

eventSource.subscribe(console.log, console.error, () => console.log('Complete'));

subject.next(JSON.stringify(users));
