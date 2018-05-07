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
// let randomExt = require('random-ext');
// let randomInteger = randomExt.integer(99, 10);
const {actionssdk} = require('actions-on-google');

let iumaData = require('./iumaData.json');
// let name = genreData['1650']['genre'];

let randomKey = function(obj) {
    let keys = Object.keys(obj);
    return keys[keys.length * Math.random() << 0];
};

const app = actionssdk({debug: true});

app.intent('actions.intent.MAIN', (conv) => {
  let randKey = randomKey(iumaData);
  // let randMpthree = randomExt.integer(1650, 1).toString();
  let randList = Math.floor(Math.random()*iumaData[randKey].length);
  let randMpthree = iumaData[randKey][randList];
  let iumaLink = 'https://archive.org/download/' + randKey + '/' + randMpthree;

  conv.ask('<speak> Hello there! Here is your random song. Enjoy. ' +
    ' <break time="0.5s"/> ' +
    '<audio src="'+ iumaLink + '"></audio>' +
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
