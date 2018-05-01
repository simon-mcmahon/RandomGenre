// Copyright 2016, Google, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

const functions = require('firebase-functions');
let randomExt = require('random-ext');
// let randomInteger = randomExt.integer(99, 10);
const {actionssdk} = require('actions-on-google');

let genreData = require('./genreData.json');
// let name = genreData['1650']['genre'];

const app = actionssdk({debug: true});

app.intent('actions.intent.MAIN', (conv) => {
  let randroll = randomExt.integer(1650, 1).toString();
  let genreName = genreData[randroll]['genre'];
  let genreLink = 'https://randomgenre-35e37.firebaseapp.com/' + randroll + '.mp3';

  conv.ask('<speak> Hello there! Your random music genre is ' + genreName +
    '. <break time="0.5s"/> And here is a song. <break time="0.5s"/>' +
    '<audio src="'+ genreLink + '"></audio>' +
    '</speak>');
});

app.intent('actions.intent.TEXT', (conv, input) => {
  if (input === 'bye') {
    return conv.close('Goodbye!');
  }
  conv.ask('<speak>You said, ' +
    `<say-as interpret-as="ordinal">${input}</say-as></speak>`);
});

exports.sayNumber = functions.https.onRequest(app);
