/*!
 * Debounce Function
 * https://github.com/gregstallings/debounce-function
 *
 * Copyright 2016 Greg Stallings
 * Released under the MIT license
 */
;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory)
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory()
  } else {
    root.DebounceFunction = factory()
  }
}(this, function() {
  'use strict'

  function callFirstWithSecond(caller, cb) {
    return function() {
      caller(cb)
    }
  }

  var DebounceFunction = {
    get: function(done, timeout, once) {
      var once = typeof once !== 'undefined' ? once : false

      var debouncer = (function() {
        var count = 0
        var fired = false

        return function(cb) {
          var id = (++count)

          setTimeout(function() {
            if (id === count) {
              if (!once || !fired) {
                fired = true
                cb()
              }
            }
          }, timeout)
        }
      })()

      return callFirstWithSecond(debouncer, done)
    }
  }

  return DebounceFunction
}));
