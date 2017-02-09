'use strict';

module.exports = function (dep) {
  let result = {}

  result.debug = function (title, message) {
    const { console }            = dep;
    const { yellow, blue, grey } = dep.colors
    console.log(
      yellow('[QI-assist]') +
      (title
        ? blue(' ' + title)
        : ' ') +
      (message
        ? grey(' ' + message)
        : '')
    )
  }

  return result
};