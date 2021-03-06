// CommonJS module installed via npm
import _ from 'lodash';

// Installed via Bower
import $ from 'jquery';

// Local ES2015 module
import ExampleModule from './modules/Es2015ExampleModule';

//---------------------------------------------------------------
// main.js
//---------------------------------------------------------------

// Testing npm module
_.each([1, 2, 3], function(item) {
  console.log(item);
});

// Testing Bower Module
console.log($('body')[0]);

// Testing ES2015 module
var x = new ExampleModule();
x.run();
