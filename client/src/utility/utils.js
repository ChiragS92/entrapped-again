'use strict';

var assign = require('object-assign');

/* Utility function to parse server message and get key value pairs.
 *  @param msg string
 *    e.g. "data:registered:[size=7]:[life=5]"
 *         "error:some error msg"
 *
 *  @return object
 *    {
 *      type: "registered",
 *      payload: {
 *        size: 7,
 *        life: 5
 *      }
 *    }
 *
 *    or,
 *
 *    {
 *      error: "some error msg"
 *    }
 */

exports.getObject = function(msg) {

  if (!msg || !msg.length) {
    return null;
  }

  var obj = {};

  msg = msg.split(':');

  /* parse error response */
  if (msg[0] === "error") {
    obj[msg[0]] = msg[1];
    return obj;
  }

  obj['type'] = msg[1];
  msg.shift();
  msg.shift();

  obj.payload = {};

  msg.forEach(function(e) {
    e = e.replace(/(\[|\])/g, '');

    var key = e.substr(0, e.indexOf('='));
    var value = e.substr(e.indexOf('=')+1, e.length);

    obj.payload[key] = value;
  });

  return obj;
}
