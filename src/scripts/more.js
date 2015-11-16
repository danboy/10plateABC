import _ from 'lodash';
import $ from 'jquery';

//---------------------------------------------------------------
// more.js
//---------------------------------------------------------------

/*
This file imports some of the same dependencies as main.js, but
instead of being bundled by both, they'll be split into a third
bundle.common.js file.
*/
// Testing npm module
_.each([1, 2, 3], function(item) {
  console.log(item);
});

// Testing Bower Module
console.log($('body')[0]);

console.log('An additional bundle of scripts.');
