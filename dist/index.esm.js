import React, { useLayoutEffect, useEffect as useEffect$1, useState, useRef, useCallback } from 'react';
import { useTheme, ThemeContext, css, jsx, ThemeProvider } from '@emotion/react';
import chroma from 'chroma-js';
import { stripUnit, remToPx } from 'polished';
import _styled from '@emotion/styled/base';
import isPropValid from '@emotion/is-prop-valid';

var useSSRLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : function () {};

var defaultTheme = {
  bp: ["36rem", "62rem", "75rem", "85rem"],
  section: {
    maxWidth: "62rem",
    px: ["1rem", "2rem"]
  },
  palette: {
    background: "#fff",
    textPrimary: "white"
  }
};

var interpolatedProp = function interpolatedProp(v, interpolation) {
  if (typeof v === "number") {
    return v + interpolation;
  } else {
    return v;
  }
};
var responsiveProp = function responsiveProp(_ref) {
  var func = _ref.func,
    val = _ref.val,
    _ref$interpolation = _ref.interpolation,
    interpolation = _ref$interpolation === void 0 ? false : _ref$interpolation;
  var _useTheme = useTheme(ThemeContext),
    bp = _useTheme.bp;
  var bpFb = defaultTheme.bp;
  if (val === undefined || val === null) return;
  if (interpolation) {
    if (typeof val === "number") val = interpolatedProp(val, interpolation);
    if (Array.isArray(val)) val.forEach(function (x, index) {
      if (typeof x === "number") val[index] = interpolatedProp(x, interpolation);
    });
  }
  val = Array.isArray(val) ? val : [val];
  return /*#__PURE__*/css(func(val[0]), "@media screen and (min-width: ", (bp === null || bp === void 0 ? void 0 : bp[0]) || bpFb[0], "){", val[1] && func(val[1]), ";}@media screen and (min-width: ", (bp === null || bp === void 0 ? void 0 : bp[1]) || bpFb[1], "){", val[2] && func(val[2]), ";}@media screen and (min-width: ", (bp === null || bp === void 0 ? void 0 : bp[2]) || bpFb[2], "){", val[3] && func(val[3]), ";}@media screen and (min-width: ", (bp === null || bp === void 0 ? void 0 : bp[3]) || bpFb[3], "){", val[4] && func(val[4]), ";}" + (process.env.NODE_ENV === "production" ? "" : ";label:responsiveProp;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc3BvbnNpdmVQcm9wLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTRCWSIsImZpbGUiOiJyZXNwb25zaXZlUHJvcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRoZW1lQ29udGV4dCwgY3NzLCB1c2VUaGVtZSB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xuaW1wb3J0IHsgZGVmYXVsdFRoZW1lIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvU2FnZVByb3ZpZGVyL2RlZmF1bHRUaGVtZVwiO1xuXG5leHBvcnQgY29uc3QgaW50ZXJwb2xhdGVkUHJvcCA9ICh2LCBpbnRlcnBvbGF0aW9uKSA9PiB7XG4gIGlmICh0eXBlb2YgdiA9PT0gXCJudW1iZXJcIikge1xuICAgIHJldHVybiB2ICsgaW50ZXJwb2xhdGlvbjtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdjtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IHJlc3BvbnNpdmVQcm9wID0gKHsgZnVuYywgdmFsLCBpbnRlcnBvbGF0aW9uID0gZmFsc2UgfSkgPT4ge1xuICBjb25zdCB7IGJwIH0gPSB1c2VUaGVtZShUaGVtZUNvbnRleHQpO1xuICBjb25zdCBicEZiID0gZGVmYXVsdFRoZW1lLmJwO1xuXG4gIGlmICh2YWwgPT09IHVuZGVmaW5lZCB8fCB2YWwgPT09IG51bGwpIHJldHVybjtcblxuICBpZiAoaW50ZXJwb2xhdGlvbikge1xuICAgIGlmICh0eXBlb2YgdmFsID09PSBcIm51bWJlclwiKSB2YWwgPSBpbnRlcnBvbGF0ZWRQcm9wKHZhbCwgaW50ZXJwb2xhdGlvbik7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsKSlcbiAgICAgIHZhbC5mb3JFYWNoKCh4LCBpbmRleCkgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIHggPT09IFwibnVtYmVyXCIpXG4gICAgICAgICAgdmFsW2luZGV4XSA9IGludGVycG9sYXRlZFByb3AoeCwgaW50ZXJwb2xhdGlvbik7XG4gICAgICB9KTtcbiAgfVxuXG4gIHZhbCA9IEFycmF5LmlzQXJyYXkodmFsKSA/IHZhbCA6IFt2YWxdO1xuXG4gIHJldHVybiBjc3NgXG4gICAgJHtmdW5jKHZhbFswXSl9XG5cbiAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAke2JwPy5bMF0gfHwgYnBGYlswXX0pIHtcbiAgICAgICR7dmFsWzFdICYmIGZ1bmModmFsWzFdKX1cbiAgICB9XG5cbiAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAke2JwPy5bMV0gfHwgYnBGYlsxXX0pIHtcbiAgICAgICR7dmFsWzJdICYmIGZ1bmModmFsWzJdKX1cbiAgICB9XG5cbiAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAke2JwPy5bMl0gfHwgYnBGYlsyXX0pIHtcbiAgICAgICR7dmFsWzNdICYmIGZ1bmModmFsWzNdKX1cbiAgICB9XG5cbiAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAke2JwPy5bM10gfHwgYnBGYlszXX0pIHtcbiAgICAgICR7dmFsWzRdICYmIGZ1bmModmFsWzRdKX1cbiAgICB9XG4gIGA7XG59O1xuIl19 */");
};

var arrayProp = function arrayProp(_ref) {
  var theme = _ref.theme,
    value = _ref.value,
    func = _ref.func,
    interpolation = _ref.interpolation;
  if (!value) return;
  var bp = (theme === null || theme === void 0 ? void 0 : theme.bp) || [];

  // create media queries array
  var mq = bp.map(function (bp) {
    return "@media (min-width: ".concat(bp, ")");
  });

  // force value to be array of max 5 items
  value = Array.isArray(value) ? value : [value];
  if (value.length > 5) value = value.slice(0, 5);

  // map over the array and return the css
  return value.map(function (x, index) {
    // if the value is null, return nothing
    if (x === null) return;

    // if the value is a number, interpolate it
    if (interpolation && typeof x === "number") {
      x = "".concat(x).concat(interpolation);
    }
    if (index === 0) {
      return func(x);
    } else {
      return "".concat(mq[index - 1], " {").concat(func(x), "}");
    }
  });
};

// export const isValidColor = (strColor) => {
//   if (typeof window === "undefined") return;
//   var s = new Option().style;
//   s.color = strColor;
//   return s.color == strColor;
// };

// export const isValidColor = (strColor) => {
//   if (typeof window === "undefined") {
//     // On the server-side, use a regular expression to check if the string matches a valid color format
//     return /^(#[0-9a-f]{3}|#[0-9a-f]{6}|(rgb|hsl)a?\([^\)]*\))$/i.test(
//       strColor
//     );
//   } else {
//     // On the client-side, use the Option.style object to check if the string is a valid color
//     var s = new Option().style;
//     s.color = strColor;
//     return s.color == strColor;
//   }
// };

// export function isValidColor(strColor) {
//   // Use a regular expression to check if the string matches a valid color format
//   return /^(#[0-9a-f]{3}|#[0-9a-f]{6}|(rgb|hsl)a?\([^\)]*\))$/i.test(strColor);
// }

function isValidColor(color) {
  try {
    chroma(color);
    return true;
  } catch (error) {
    return false;
  }
}

var findValueInObject = function findValueInObject(str, obj) {
  var keys = str.split(".");
  var current = obj;
  for (var i = 0; i < keys.length; i++) {
    if (current.hasOwnProperty(keys[i])) {
      current = current[keys[i]];
    } else {
      return undefined;
    }
  }
  return current;
};

function useLogEffect(msg) {
  var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "green";
  useEffect$1(function () {
    if (typeof msg === "string") {
      console.log("%c" + msg, "color:".concat(color));
    } else {
      console.log(msg);
    }
  }, [msg]);
  return null;
}

function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _regeneratorRuntime() {
  _regeneratorRuntime = function () {
    return exports;
  };
  var exports = {},
    Op = Object.prototype,
    hasOwn = Op.hasOwnProperty,
    defineProperty = Object.defineProperty || function (obj, key, desc) {
      obj[key] = desc.value;
    },
    $Symbol = "function" == typeof Symbol ? Symbol : {},
    iteratorSymbol = $Symbol.iterator || "@@iterator",
    asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
    toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }
  try {
    define({}, "");
  } catch (err) {
    define = function (obj, key, value) {
      return obj[key] = value;
    };
  }
  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
      generator = Object.create(protoGenerator.prototype),
      context = new Context(tryLocsList || []);
    return defineProperty(generator, "_invoke", {
      value: makeInvokeMethod(innerFn, self, context)
    }), generator;
  }
  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }
  exports.wrap = wrap;
  var ContinueSentinel = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
    NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if ("throw" !== record.type) {
        var result = record.arg,
          value = result.value;
        return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }
      reject(record.arg);
    }
    var previousPromise;
    defineProperty(this, "_invoke", {
      value: function (method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }
        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(innerFn, self, context) {
    var state = "suspendedStart";
    return function (method, arg) {
      if ("executing" === state) throw new Error("Generator is already running");
      if ("completed" === state) {
        if ("throw" === method) throw arg;
        return doneResult();
      }
      for (context.method = method, context.arg = arg;;) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }
        if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
          if ("suspendedStart" === state) throw state = "completed", context.arg;
          context.dispatchException(context.arg);
        } else "return" === context.method && context.abrupt("return", context.arg);
        state = "executing";
        var record = tryCatch(innerFn, self, context);
        if ("normal" === record.type) {
          if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
          return {
            value: record.arg,
            done: context.done
          };
        }
        "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
      }
    };
  }
  function maybeInvokeDelegate(delegate, context) {
    var methodName = context.method,
      method = delegate.iterator[methodName];
    if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }
  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }
  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }
  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;
      if (!isNaN(iterable.length)) {
        var i = -1,
          next = function next() {
            for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
            return next.value = undefined, next.done = !0, next;
          };
        return next.next = next;
      }
    }
    return {
      next: doneResult
    };
  }
  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), defineProperty(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (val) {
    var object = Object(val),
      keys = [];
    for (var key in object) keys.push(key);
    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function (skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
    },
    stop: function () {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function (exception) {
      if (this.done) throw exception;
      var context = this;
      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
          record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");
        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
            hasFinally = hasOwn.call(entry, "finallyLoc");
          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function (type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }
      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function (record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function (finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    catch: function (tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function (iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}

function useHover() {
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    value = _useState2[0],
    setValue = _useState2[1];
  var ref = useRef(null);
  var handleMouseOver = function handleMouseOver() {
    return setValue(true);
  };
  var handleMouseOut = function handleMouseOut() {
    return setValue(false);
  };
  useEffect(function () {
    var node = ref.current;
    if (node) {
      node.addEventListener("mouseover", handleMouseOver);
      node.addEventListener("mouseout", handleMouseOut);
      return function () {
        node.removeEventListener("mouseover", handleMouseOver);
        node.removeEventListener("mouseout", handleMouseOut);
      };
    }
  }, [ref.current] // Recall only if ref changes
  );

  return [ref, value];
}

function useElementSize() {
  // Mutable values like 'ref.current' aren't valid dependencies
  // because mutating them doesn't re-render the component.
  // Instead, we use a state as a ref to be reactive.
  var _useState = useState(null),
    _useState2 = _slicedToArray(_useState, 2),
    ref = _useState2[0],
    setRef = _useState2[1];
  var _useState3 = useState({
      width: 0,
      height: 0
    }),
    _useState4 = _slicedToArray(_useState3, 2),
    size = _useState4[0],
    setSize = _useState4[1];

  // Prevent too many rendering using useCallback
  var handleSize = useCallback(function () {
    setSize({
      width: (ref === null || ref === void 0 ? void 0 : ref.offsetWidth) || 0,
      height: (ref === null || ref === void 0 ? void 0 : ref.offsetHeight) || 0
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref === null || ref === void 0 ? void 0 : ref.offsetHeight, ref === null || ref === void 0 ? void 0 : ref.offsetWidth]);

  // useEventListener('resize', handleSize)

  useEffect$1(function () {
    window.addEventListener("resize", handleSize);
    return function () {
      window.removeEventListener("resize", handleSize);
    };
  }, []);
  useSSRLayoutEffect(function () {
    handleSize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref === null || ref === void 0 ? void 0 : ref.offsetHeight, ref === null || ref === void 0 ? void 0 : ref.offsetWidth]);
  return [setRef, size];
}

var useResponsive = function useResponsive() {
  var _useTheme = useTheme(ThemeContext),
    bp = _useTheme.bp;

  // fallback if theme is not present
  bp = bp ? bp : defaultTheme.bp;
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    isMobile = _useState2[0],
    setMobile = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    breakpoint = _useState4[0],
    setBreakpoint = _useState4[1];
  var _useState5 = useState(false),
    _useState6 = _slicedToArray(_useState5, 2),
    breakpointIndex = _useState6[0],
    setBreakpointIndex = _useState6[1];
  var calcBreakpoint = function calcBreakpoint() {
    var width = window.innerWidth > 0 ? window.innerWidth : screen.width;
    if (width > stripUnit(remToPx(bp[3]))) {
      setBreakpoint("wide");
      setBreakpointIndex(4);
    } else if (width > stripUnit(remToPx(bp[2]))) {
      setBreakpoint("xl");
      setBreakpointIndex(3);
    } else if (width > stripUnit(remToPx(bp[1]))) {
      setBreakpoint("lr");
      setBreakpointIndex(2);
    } else if (width > stripUnit(remToPx(bp[0]))) {
      setBreakpoint("md");
      setBreakpointIndex(1);
    } else {
      setBreakpoint("sm");
      setBreakpointIndex(0);
    }
  };
  useSSRLayoutEffect(function () {
    calcBreakpoint();
    window.addEventListener("resize", calcBreakpoint);
    return function () {
      return window.removeEventListener("resize", calcBreakpoint);
    };
  }, []);
  useSSRLayoutEffect(function () {
    var userAgent = typeof window.navigator === "undefined" ? "" : navigator.userAgent;
    var mobile = Boolean(userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i));
    setMobile(mobile);
  }, []);
  return {
    isMobile: isMobile,
    breakpoint: breakpoint,
    breakpointIndex: breakpointIndex
  };
};

var useKeyDown = function useKeyDown(callback, keys) {
  var onKeyDown = function onKeyDown(event) {
    var wasAnyKeyPressed = keys.some(function (key) {
      return event.key === key;
    });
    if (wasAnyKeyPressed) {
      event.preventDefault();
      callback();
    }
  };
  useEffect$1(function () {
    document.addEventListener("keydown", onKeyDown);
    return function () {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onKeyDown]);
};

// exchanging all chars to spaces so that it doesn't load with the sentence
var createSpaces = function createSpaces(sentence) {
  var result = [];
  sentence.split(" ").forEach(function (word) {
    var output = "";
    for (var index = 0; index < word.length; index++) {
      output += " ";
    }
    result.push(output);
  });
  return result.join(" ");
};

// the hook
var useScramble = function useScramble(_ref) {
  var _ref$sentence = _ref.sentence,
    sentence = _ref$sentence === void 0 ? "Test sentence" : _ref$sentence,
    _ref$speed = _ref.speed,
    speed = _ref$speed === void 0 ? 50 : _ref$speed,
    _ref$loops = _ref.loops,
    loops = _ref$loops === void 0 ? 15 : _ref$loops,
    _ref$startEmpty = _ref.startEmpty,
    startEmpty = _ref$startEmpty === void 0 ? false : _ref$startEmpty;
  var _useState = useState(startEmpty ? createSpaces(sentence) : sentence),
    _useState2 = _slicedToArray(_useState, 2),
    generatedScramble = _useState2[0],
    setGeneratedScramble = _useState2[1];
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var genNewScramble = function genNewScramble(sentence) {
    var result = [];
    sentence.split(" ").forEach(function (word) {
      var output = "";
      var charactersLength = characters.length;
      for (var i = 0; i < word.length; i++) {
        output += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      result.push(output);
    });
    return result.join(" ");
  };
  var runScramble = function runScramble(customLoops) {
    var timer = function timer(ms) {
      return new Promise(function (res) {
        return setTimeout(res, ms);
      });
    };
    function load() {
      return _load.apply(this, arguments);
    }
    function _load() {
      _load = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var i;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              i = 0;
            case 1:
              if (!(i < (customLoops ? customLoops : loops))) {
                _context.next = 8;
                break;
              }
              if (i < (customLoops ? customLoops : loops) - 1) {
                setGeneratedScramble(genNewScramble(sentence));
              } else {
                setGeneratedScramble(sentence);
              }
              _context.next = 5;
              return timer(speed);
            case 5:
              i++;
              _context.next = 1;
              break;
            case 8:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      return _load.apply(this, arguments);
    }
    load();
  };
  return {
    generatedScramble: generatedScramble,
    runScramble: runScramble
  };
};

function SageProvider(_ref) {
  var children = _ref.children,
    theme = _ref.theme;
  return jsx(ThemeProvider, {
    theme: _objectSpread2({}, theme)
  }, children);
}

function Test() {
  return jsx("div", null, "Test");
}

// takes a prop and returns an array of 4 items, with interpolation

var arrayifyProp = function arrayifyProp(val, interpolation) {
  val = Array.isArray(val) ? val : [val];
  val.forEach(function (item, index) {
    var isLast = val.length === index + 1;
    if (isLast) {
      var loop = 5 - (index + 1);
      for (var i = 0; i < loop; i++) {
        val.push(item);
      }
    }
  });
  if (interpolation) {
    val.forEach(function (item, index) {
      return val[index] = item + interpolation;
    });
  }
  return val;
};

var dev = function dev(_ref) {
  var theme = _ref.theme,
    value = _ref.dev;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func() {
      return "\n        box-sizing: border-box;\n        background-color: rgba(255, 0, 0, 0.1);\n        box-shadow: inset 0px 0px 0px 1px rgba(255, 0, 0, 0.2);\n      ";
    }
  });
};
var background = function background(_ref2) {
  var theme = _ref2.theme,
    value = _ref2.background;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "background: ".concat(isValidColor(x) ? x : findValueInObject(x, theme), ";");
    }
  });
};
var backgroundColor = function backgroundColor(_ref3) {
  var theme = _ref3.theme,
    value = _ref3.backgroundColor;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "background-color: ".concat(isValidColor(x) ? x : findValueInObject(x, theme), ";");
    }
  });
};
var transform = function transform(_ref4) {
  var theme = _ref4.theme,
    value = _ref4.transform;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n      transform: ".concat(x, ";\n    ");
    }
  });
};
var borderRadius = function borderRadius(_ref5) {
  var theme = _ref5.theme,
    value = _ref5.borderRadius;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n      border-radius: ".concat(x, ";\n    ");
    },
    interpolation: "rem"
  });
};
var boxShadow = function boxShadow(_ref6) {
  var theme = _ref6.theme,
    value = _ref6.boxShadow;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n      box-shadow: ".concat(x, ";\n    ");
    }
  });
};
var flex = function flex(_ref7) {
  var theme = _ref7.theme,
    value = _ref7.flex;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n      flex: ".concat(x, ";\n    ");
    }
  });
};
var flexBasis = function flexBasis(_ref8) {
  var theme = _ref8.theme,
    value = _ref8.flexBasis;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n      flex-basis: ".concat(x, ";\n    ");
    },
    interpolation: "rem"
  });
};
var flexShrink = function flexShrink(_ref9) {
  var theme = _ref9.theme,
    value = _ref9.flexShrink;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n      flex-shrink: ".concat(x, ";\n    ");
    }
  });
};
var alignSelf = function alignSelf(_ref10) {
  var theme = _ref10.theme,
    value = _ref10.alignSelf;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n      align-self: ".concat(x, ";\n    ");
    }
  });
};
var outline = function outline(_ref11) {
  var theme = _ref11.theme,
    value = _ref11.outline;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n      outline: ".concat(x, ";\n    ");
    }
  });
};
var visibility = function visibility(_ref12) {
  var theme = _ref12.theme,
    value = _ref12.visibility;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n      visibility: ".concat(x, ";\n    ");
    }
  });
};
var display = function display(_ref13) {
  var theme = _ref13.theme,
    value = _ref13.display;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n      display: ".concat(x, ";\n    ");
    }
  });
};
var position = function position(_ref14) {
  var theme = _ref14.theme,
    value = _ref14.position;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n      position: ".concat(x, ";\n    ");
    }
  });
};
var zIndex = function zIndex(_ref15) {
  var theme = _ref15.theme,
    value = _ref15.zIndex;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n      z-index: ".concat(x, ";\n    ");
    }
  });
};
var top = function top(_ref16) {
  var theme = _ref16.theme;
    _ref16.top;
  return arrayProp(theme);
};
var right = function right(_ref17) {
  var theme = _ref17.theme;
    _ref17.right;
  return arrayProp(theme);
};
var bottom = function bottom(_ref18) {
  var theme = _ref18.theme,
    value = _ref18.bottom;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n      bottom: ".concat(x, ";\n    ");
    },
    interpolation: "rem"
  });
};
var left = function left(_ref19) {
  var theme = _ref19.theme,
    value = _ref19.left;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n      left: ".concat(x, ";\n    ");
    },
    interpolation: "rem"
  });
};
var inset = function inset(_ref20) {
  var theme = _ref20.theme;
    _ref20.inset;
  return arrayProp(theme);
};
var insetX = function insetX(_ref21) {
  var theme = _ref21.theme,
    value = _ref21.insetX;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n      left: ".concat(x, ";\n      right: ").concat(x, ";\n    ");
    },
    interpolation: "rem"
  });
};
var insetY = function insetY(_ref22) {
  var theme = _ref22.theme,
    value = _ref22.insetY;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n      top: ".concat(x, ";\n      bottom: ").concat(x, ";\n    ");
    },
    interpolation: "rem"
  });
};
var pointerEvents = function pointerEvents(_ref23) {
  var theme = _ref23.theme,
    value = _ref23.pointerEvents;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n      pointer-events: ".concat(x, ";\n    ");
    }
  });
};
var cursor = function cursor(_ref24) {
  var theme = _ref24.theme,
    value = _ref24.cursor;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n      cursor: ".concat(x, ";\n    ");
    }
  });
};
var opacity = function opacity(_ref25) {
  var theme = _ref25.theme,
    value = _ref25.opacity;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n      opacity: ".concat(x, ";\n    ");
    }
  });
};
var transition = function transition(_ref26) {
  var theme = _ref26.theme,
    value = _ref26.transition;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n      transition: ".concat(x, ";\n    ");
    }
  });
};
var span = function span(_ref27) {
  var theme = _ref27.theme,
    value = _ref27.span;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        grid-column: span ".concat(x, ";\n      ");
    }
  });
};
var placeSelf = function placeSelf(_ref28) {
  var theme = _ref28.theme,
    value = _ref28.placeSelf;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        place-self: ".concat(x, ";\n      ");
    }
  });
};
var order = function order(_ref29) {
  var theme = _ref29.theme,
    value = _ref29.order;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        order: ".concat(x, ";\n      ");
    }
  });
};
var gridColumn = function gridColumn(_ref30) {
  var theme = _ref30.theme,
    value = _ref30.gridColumn;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        grid-column: ".concat(x, ";\n      ");
    }
  });
};
var gridRow = function gridRow(_ref31) {
  var theme = _ref31.theme,
    value = _ref31.gridRow;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        grid-row: ".concat(x, ";\n      ");
    }
  });
};
var gridArea = function gridArea(_ref32) {
  var theme = _ref32.theme,
    value = _ref32.gridArea;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        grid-area: ".concat(x, ";\n      ");
    }
  });
};
var width = function width(_ref33) {
  var theme = _ref33.theme,
    value = _ref33.width;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        width: ".concat(x, ";\n      ");
    },
    width: width,
    interpolation: "rem"
  });
};
var maxWidth = function maxWidth(_ref34) {
  var theme = _ref34.theme,
    value = _ref34.maxWidth;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        max-width: ".concat(x, ";\n      ");
    },
    interpolation: "rem"
  });
};
var minWidth = function minWidth(_ref35) {
  var theme = _ref35.theme,
    value = _ref35.minWidth;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        min-width: ".concat(x, ";\n      ");
    },
    interpolation: "rem"
  });
};
var height = function height(_ref36) {
  var theme = _ref36.theme,
    value = _ref36.height;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        height: ".concat(x, ";\n      ");
    },
    interpolation: "rem"
  });
};
var maxHeight = function maxHeight(_ref37) {
  var theme = _ref37.theme,
    value = _ref37.maxHeight;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        max-height: ".concat(x, ";\n      ");
    },
    interpolation: "rem"
  });
};
var minHeight = function minHeight(_ref38) {
  var theme = _ref38.theme,
    value = _ref38.minHeight;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        min-height: ".concat(x, ";\n      ");
    },
    interpolation: "rem"
  });
};
var aspectRatio = function aspectRatio(_ref39) {
  var theme = _ref39.theme,
    value = _ref39.aspectRatio;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        aspect-ratio: ".concat(x, ";\n      ");
    },
    interpolation: "rem"
  });
};
var m = function m(_ref40) {
  var theme = _ref40.theme,
    value = _ref40.m;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        margin: ".concat(x, ";\n      ");
    },
    interpolation: "rem"
  });
};
var mx = function mx(_ref41) {
  var theme = _ref41.theme,
    value = _ref41.mx;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        margin-left: ".concat(x, ";\n        margin-right: ").concat(x, ";\n      ");
    },
    interpolation: "rem"
  });
};
var my = function my(_ref42) {
  var theme = _ref42.theme,
    value = _ref42.my;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        margin-top: ".concat(x, ";\n        margin-bottom: ").concat(x, ";\n      ");
    },
    interpolation: "rem"
  });
};
var mt = function mt(_ref43) {
  var theme = _ref43.theme,
    value = _ref43.mt;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        margin-top: ".concat(x, ";\n      ");
    },
    interpolation: "rem"
  });
};
var mr = function mr(_ref44) {
  var theme = _ref44.theme,
    value = _ref44.mr;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        margin-right: ".concat(x, ";\n      ");
    },
    interpolation: "rem"
  });
};
var mb = function mb(_ref45) {
  var theme = _ref45.theme,
    value = _ref45.mb;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        margin-bottom: ".concat(x, ";\n      ");
    },
    interpolation: "rem"
  });
};
var ml = function ml(_ref46) {
  var theme = _ref46.theme,
    value = _ref46.ml;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        margin-left: ".concat(x, ";\n      ");
    },
    interpolation: "rem"
  });
};
var p = function p(_ref47) {
  var theme = _ref47.theme,
    value = _ref47.p;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        padding: ".concat(x, ";\n      ");
    },
    interpolation: "rem"
  });
};
var px = function px(_ref48) {
  var theme = _ref48.theme,
    value = _ref48.px;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        padding-left: ".concat(x, ";\n        padding-right: ").concat(x, ";\n      ");
    },
    interpolation: "rem"
  });
};
var py = function py(_ref49) {
  var theme = _ref49.theme,
    value = _ref49.py;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        padding-top: ".concat(x, ";\n        padding-bottom: ").concat(x, ";\n      ");
    },
    interpolation: "rem"
  });
};
var pt = function pt(_ref50) {
  var theme = _ref50.theme,
    value = _ref50.pt;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        padding-top: ".concat(x, ";\n      ");
    },
    interpolation: "rem"
  });
};
var pr = function pr(_ref51) {
  var theme = _ref51.theme,
    value = _ref51.pr;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        padding-right: ".concat(x, ";\n      ");
    },
    interpolation: "rem"
  });
};
var pb = function pb(_ref52) {
  var theme = _ref52.theme,
    value = _ref52.pb;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        padding-bottom: ".concat(x, ";\n      ");
    },
    interpolation: "rem"
  });
};
var pl = function pl(_ref53) {
  var theme = _ref53.theme,
    value = _ref53.pl;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        padding-left: ".concat(x, ";\n      ");
    },
    interpolation: "rem"
  });
};
var genericProps = [dev,
// background color
background, backgroundColor,
// Container
transform, borderRadius, boxShadow, flex, flexBasis, flexShrink, alignSelf, outline,
// display
visibility, display, position, zIndex, top, right, bottom, left, inset, insetX, insetY, pointerEvents, cursor, opacity, transition,
// Grid Item
span, placeSelf, order, gridColumn, gridRow, gridArea,
// size
width, maxWidth, minWidth, height, maxHeight, minHeight, aspectRatio,
// space
m, mx, my, mt, mr, mb, ml, p, px, py, pt, pr, pb, pl];

var grid = {
  display: "grid"
};
var base = function base(_ref) {
  var theme = _ref.theme,
    value = _ref.base;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        grid-template-columns: repeat(".concat(x, ", 1fr);\n      ");
    }
  });
};
var gap$1 = function gap(_ref2) {
  var theme = _ref2.theme,
    value = _ref2.gap;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        gap: ".concat(x, ";\n      ");
    },
    interpolation: "rem"
  });
};
var columnGap$1 = function columnGap(_ref3) {
  var theme = _ref3.theme,
    value = _ref3.columnGap;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        column-gap: ".concat(x, ";\n      ");
    },
    interpolation: "rem"
  });
};
var rowGap$1 = function rowGap(_ref4) {
  var theme = _ref4.theme,
    value = _ref4.rowGap;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        row-gap: ".concat(x, ";\n      ");
    },
    interpolation: "rem"
  });
};
var placeItems = function placeItems(_ref5) {
  var theme = _ref5.theme,
    value = _ref5.placeItems;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        place-items: ".concat(x, ";\n      ");
    }
  });
};
var gridTemplateAreas = function gridTemplateAreas(_ref6) {
  var theme = _ref6.theme,
    value = _ref6.gridTemplateAreas;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        grid-template-areas: ".concat(x, ";\n      ");
    }
  });
};
var gridTemplateRows = function gridTemplateRows(_ref7) {
  var theme = _ref7.theme,
    value = _ref7.gridTemplateRows;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        grid-template-rows: ".concat(x, ";\n      ");
    }
  });
};
var gridTemplateColumns = function gridTemplateColumns(_ref8) {
  var theme = _ref8.theme,
    value = _ref8.gridTemplateColumns;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        grid-template-columns: ".concat(x, ";\n      ");
    }
  });
};
var gridTemplate = function gridTemplate(_ref9) {
  var theme = _ref9.theme,
    value = _ref9.gridTemplate;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        grid-template: ".concat(x, ";\n      ");
    }
  });
};
var gridProps = [grid, base, gap$1, columnGap$1, rowGap$1, placeItems, gridTemplateAreas, gridTemplateRows, gridTemplateColumns, gridTemplate];

var _excluded$4 = ["base", "gap"],
  _excluded2 = ["children"];
function _EMOTION_STRINGIFIED_CSS_ERROR__$2() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }
var _ref = process.env.NODE_ENV === "production" ? {
  name: "1b4920d",
  styles: "position:absolute;top:0;left:0;width:100%;height:100%"
} : {
  name: "11jsi5-PsuedoGrid",
  styles: "position:absolute;top:0;left:0;width:100%;height:100%;label:PsuedoGrid;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkdyaWQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBYU0iLCJmaWxlIjoiR3JpZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzdHlsZWQgZnJvbSBcIkBlbW90aW9uL3N0eWxlZFwiO1xuaW1wb3J0IHsgdXNlUmVzcG9uc2l2ZSB9IGZyb20gXCIuLi8uLi9ob29rcy91c2VSZXNwb25zaXZlL3VzZVJlc3BvbnNpdmVcIjtcbmltcG9ydCB7IGFycmF5aWZ5UHJvcCB9IGZyb20gXCIuLi8uLi91dGlscy9hcnJheWlmeVByb3BcIjtcbmltcG9ydCBnZW5lcmljUHJvcHMgZnJvbSBcIi4uLy4uL3Byb3BzL2dlbmVyaWNQcm9wc1wiO1xuaW1wb3J0IGdyaWRQcm9wcyBmcm9tIFwiLi4vLi4vcHJvcHMvZ3JpZFByb3BzXCI7XG5cbmNvbnN0IFBzdWVkb0dyaWQgPSAocHJvcHMpID0+IHtcbiAgY29uc3QgeyBiYXNlLCBnYXAsIC4uLnJlc3QgfSA9IHByb3BzO1xuICBjb25zdCB7IGJyZWFrcG9pbnRJbmRleCB9ID0gdXNlUmVzcG9uc2l2ZSgpO1xuXG4gIHJldHVybiAoXG4gICAgPFN0eWxlZEdyaWRcbiAgICAgIHsuLi5wcm9wc31cbiAgICAgIGNzcz17e1xuICAgICAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxuICAgICAgICB0b3A6IDAsXG4gICAgICAgIGxlZnQ6IDAsXG4gICAgICAgIHdpZHRoOiBcIjEwMCVcIixcbiAgICAgICAgaGVpZ2h0OiBcIjEwMCVcIixcbiAgICAgIH19XG4gICAgPlxuICAgICAge1suLi5BcnJheShhcnJheWlmeVByb3AoYmFzZSlbYnJlYWtwb2ludEluZGV4XSldLm1hcCgoXywgaSkgPT4gKFxuICAgICAgICA8SXRlbVxuICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICBzcGFuPXsxfVxuICAgICAgICAgIGNzcz17e1xuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcInJnYmEoMjU1LCAwLCAwLCAwLjEpXCIsXG4gICAgICAgICAgICBib3hTaGFkb3c6IFwiaW5zZXQgMHB4IDBweCAwcHggMXB4IHJnYmEoMjU1LCAwLCAwLCAwLjIpLFwiLFxuICAgICAgICAgIH19XG4gICAgICAgIC8+XG4gICAgICApKX1cbiAgICA8L1N0eWxlZEdyaWQ+XG4gICk7XG59O1xuXG5jb25zdCBHcmlkID0gKHsgY2hpbGRyZW4sIC4uLnByb3BzIH0pID0+IHtcbiAgY29uc3QgeyBkZXYgfSA9IHByb3BzO1xuICByZXR1cm4gKFxuICAgIDxTdHlsZWRHcmlkIHsuLi5wcm9wc30+XG4gICAgICB7ZGV2ICYmIDxQc3VlZG9HcmlkIHsuLi5wcm9wc30gLz59XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9TdHlsZWRHcmlkPlxuICApO1xufTtcblxuY29uc3QgU3R5bGVkR3JpZCA9IHN0eWxlZC5kaXZgXG4gICR7KHsgZGV2IH0pID0+IGRldiAmJiBgcG9zaXRpb246IHJlbGF0aXZlO2B9XG4gICR7Z3JpZFByb3BzfVxuICAke2dlbmVyaWNQcm9wc31cbmA7XG5cbmNvbnN0IEl0ZW0gPSBzdHlsZWQuZGl2YFxuICAke2dlbmVyaWNQcm9wc31cbmA7XG5cbkdyaWQuSXRlbSA9IEl0ZW07XG5leHBvcnQgZGVmYXVsdCBHcmlkO1xuIl19 */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__$2
};
var _ref2 = process.env.NODE_ENV === "production" ? {
  name: "1wh7wd6",
  styles: "background-color:rgba(255, 0, 0, 0.1);box-shadow:inset 0px 0px 0px 1px rgba(255, 0, 0, 0.2),"
} : {
  name: "rxmk7q-PsuedoGrid",
  styles: "background-color:rgba(255, 0, 0, 0.1);box-shadow:inset 0px 0px 0px 1px rgba(255, 0, 0, 0.2),;label:PsuedoGrid;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkdyaWQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBeUJVIiwiZmlsZSI6IkdyaWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc3R5bGVkIGZyb20gXCJAZW1vdGlvbi9zdHlsZWRcIjtcbmltcG9ydCB7IHVzZVJlc3BvbnNpdmUgfSBmcm9tIFwiLi4vLi4vaG9va3MvdXNlUmVzcG9uc2l2ZS91c2VSZXNwb25zaXZlXCI7XG5pbXBvcnQgeyBhcnJheWlmeVByb3AgfSBmcm9tIFwiLi4vLi4vdXRpbHMvYXJyYXlpZnlQcm9wXCI7XG5pbXBvcnQgZ2VuZXJpY1Byb3BzIGZyb20gXCIuLi8uLi9wcm9wcy9nZW5lcmljUHJvcHNcIjtcbmltcG9ydCBncmlkUHJvcHMgZnJvbSBcIi4uLy4uL3Byb3BzL2dyaWRQcm9wc1wiO1xuXG5jb25zdCBQc3VlZG9HcmlkID0gKHByb3BzKSA9PiB7XG4gIGNvbnN0IHsgYmFzZSwgZ2FwLCAuLi5yZXN0IH0gPSBwcm9wcztcbiAgY29uc3QgeyBicmVha3BvaW50SW5kZXggfSA9IHVzZVJlc3BvbnNpdmUoKTtcblxuICByZXR1cm4gKFxuICAgIDxTdHlsZWRHcmlkXG4gICAgICB7Li4ucHJvcHN9XG4gICAgICBjc3M9e3tcbiAgICAgICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcbiAgICAgICAgdG9wOiAwLFxuICAgICAgICBsZWZ0OiAwLFxuICAgICAgICB3aWR0aDogXCIxMDAlXCIsXG4gICAgICAgIGhlaWdodDogXCIxMDAlXCIsXG4gICAgICB9fVxuICAgID5cbiAgICAgIHtbLi4uQXJyYXkoYXJyYXlpZnlQcm9wKGJhc2UpW2JyZWFrcG9pbnRJbmRleF0pXS5tYXAoKF8sIGkpID0+IChcbiAgICAgICAgPEl0ZW1cbiAgICAgICAgICBrZXk9e2l9XG4gICAgICAgICAgc3Bhbj17MX1cbiAgICAgICAgICBjc3M9e3tcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDI1NSwgMCwgMCwgMC4xKVwiLFxuICAgICAgICAgICAgYm94U2hhZG93OiBcImluc2V0IDBweCAwcHggMHB4IDFweCByZ2JhKDI1NSwgMCwgMCwgMC4yKSxcIixcbiAgICAgICAgICB9fVxuICAgICAgICAvPlxuICAgICAgKSl9XG4gICAgPC9TdHlsZWRHcmlkPlxuICApO1xufTtcblxuY29uc3QgR3JpZCA9ICh7IGNoaWxkcmVuLCAuLi5wcm9wcyB9KSA9PiB7XG4gIGNvbnN0IHsgZGV2IH0gPSBwcm9wcztcbiAgcmV0dXJuIChcbiAgICA8U3R5bGVkR3JpZCB7Li4ucHJvcHN9PlxuICAgICAge2RldiAmJiA8UHN1ZWRvR3JpZCB7Li4ucHJvcHN9IC8+fVxuICAgICAge2NoaWxkcmVufVxuICAgIDwvU3R5bGVkR3JpZD5cbiAgKTtcbn07XG5cbmNvbnN0IFN0eWxlZEdyaWQgPSBzdHlsZWQuZGl2YFxuICAkeyh7IGRldiB9KSA9PiBkZXYgJiYgYHBvc2l0aW9uOiByZWxhdGl2ZTtgfVxuICAke2dyaWRQcm9wc31cbiAgJHtnZW5lcmljUHJvcHN9XG5gO1xuXG5jb25zdCBJdGVtID0gc3R5bGVkLmRpdmBcbiAgJHtnZW5lcmljUHJvcHN9XG5gO1xuXG5HcmlkLkl0ZW0gPSBJdGVtO1xuZXhwb3J0IGRlZmF1bHQgR3JpZDtcbiJdfQ== */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__$2
};
var PsuedoGrid = function PsuedoGrid(props) {
  var base = props.base;
    props.gap;
    _objectWithoutProperties(props, _excluded$4);
  var _useResponsive = useResponsive(),
    breakpointIndex = _useResponsive.breakpointIndex;
  return jsx(StyledGrid, _extends({}, props, {
    css: _ref
  }), _toConsumableArray(Array(arrayifyProp(base)[breakpointIndex])).map(function (_, i) {
    return jsx(Item, {
      key: i,
      span: 1,
      css: _ref2
    });
  }));
};
var Grid = function Grid(_ref3) {
  var children = _ref3.children,
    props = _objectWithoutProperties(_ref3, _excluded2);
  var dev = props.dev;
  return jsx(StyledGrid, props, dev && jsx(PsuedoGrid, props), children);
};
var StyledGrid = /*#__PURE__*/_styled("div", process.env.NODE_ENV === "production" ? {
  target: "eggk0at1"
} : {
  target: "eggk0at1",
  label: "StyledGrid"
})(function (_ref4) {
  var dev = _ref4.dev;
  return dev && "position: relative;";
}, " ", gridProps, " ", genericProps, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkdyaWQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBNkM2QiIsImZpbGUiOiJHcmlkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHN0eWxlZCBmcm9tIFwiQGVtb3Rpb24vc3R5bGVkXCI7XG5pbXBvcnQgeyB1c2VSZXNwb25zaXZlIH0gZnJvbSBcIi4uLy4uL2hvb2tzL3VzZVJlc3BvbnNpdmUvdXNlUmVzcG9uc2l2ZVwiO1xuaW1wb3J0IHsgYXJyYXlpZnlQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2FycmF5aWZ5UHJvcFwiO1xuaW1wb3J0IGdlbmVyaWNQcm9wcyBmcm9tIFwiLi4vLi4vcHJvcHMvZ2VuZXJpY1Byb3BzXCI7XG5pbXBvcnQgZ3JpZFByb3BzIGZyb20gXCIuLi8uLi9wcm9wcy9ncmlkUHJvcHNcIjtcblxuY29uc3QgUHN1ZWRvR3JpZCA9IChwcm9wcykgPT4ge1xuICBjb25zdCB7IGJhc2UsIGdhcCwgLi4ucmVzdCB9ID0gcHJvcHM7XG4gIGNvbnN0IHsgYnJlYWtwb2ludEluZGV4IH0gPSB1c2VSZXNwb25zaXZlKCk7XG5cbiAgcmV0dXJuIChcbiAgICA8U3R5bGVkR3JpZFxuICAgICAgey4uLnByb3BzfVxuICAgICAgY3NzPXt7XG4gICAgICAgIHBvc2l0aW9uOiBcImFic29sdXRlXCIsXG4gICAgICAgIHRvcDogMCxcbiAgICAgICAgbGVmdDogMCxcbiAgICAgICAgd2lkdGg6IFwiMTAwJVwiLFxuICAgICAgICBoZWlnaHQ6IFwiMTAwJVwiLFxuICAgICAgfX1cbiAgICA+XG4gICAgICB7Wy4uLkFycmF5KGFycmF5aWZ5UHJvcChiYXNlKVticmVha3BvaW50SW5kZXhdKV0ubWFwKChfLCBpKSA9PiAoXG4gICAgICAgIDxJdGVtXG4gICAgICAgICAga2V5PXtpfVxuICAgICAgICAgIHNwYW49ezF9XG4gICAgICAgICAgY3NzPXt7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgyNTUsIDAsIDAsIDAuMSlcIixcbiAgICAgICAgICAgIGJveFNoYWRvdzogXCJpbnNldCAwcHggMHB4IDBweCAxcHggcmdiYSgyNTUsIDAsIDAsIDAuMiksXCIsXG4gICAgICAgICAgfX1cbiAgICAgICAgLz5cbiAgICAgICkpfVxuICAgIDwvU3R5bGVkR3JpZD5cbiAgKTtcbn07XG5cbmNvbnN0IEdyaWQgPSAoeyBjaGlsZHJlbiwgLi4ucHJvcHMgfSkgPT4ge1xuICBjb25zdCB7IGRldiB9ID0gcHJvcHM7XG4gIHJldHVybiAoXG4gICAgPFN0eWxlZEdyaWQgey4uLnByb3BzfT5cbiAgICAgIHtkZXYgJiYgPFBzdWVkb0dyaWQgey4uLnByb3BzfSAvPn1cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L1N0eWxlZEdyaWQ+XG4gICk7XG59O1xuXG5jb25zdCBTdHlsZWRHcmlkID0gc3R5bGVkLmRpdmBcbiAgJHsoeyBkZXYgfSkgPT4gZGV2ICYmIGBwb3NpdGlvbjogcmVsYXRpdmU7YH1cbiAgJHtncmlkUHJvcHN9XG4gICR7Z2VuZXJpY1Byb3BzfVxuYDtcblxuY29uc3QgSXRlbSA9IHN0eWxlZC5kaXZgXG4gICR7Z2VuZXJpY1Byb3BzfVxuYDtcblxuR3JpZC5JdGVtID0gSXRlbTtcbmV4cG9ydCBkZWZhdWx0IEdyaWQ7XG4iXX0= */"));
var Item = /*#__PURE__*/_styled("div", process.env.NODE_ENV === "production" ? {
  target: "eggk0at0"
} : {
  target: "eggk0at0",
  label: "Item"
})(genericProps, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkdyaWQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBbUR1QiIsImZpbGUiOiJHcmlkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHN0eWxlZCBmcm9tIFwiQGVtb3Rpb24vc3R5bGVkXCI7XG5pbXBvcnQgeyB1c2VSZXNwb25zaXZlIH0gZnJvbSBcIi4uLy4uL2hvb2tzL3VzZVJlc3BvbnNpdmUvdXNlUmVzcG9uc2l2ZVwiO1xuaW1wb3J0IHsgYXJyYXlpZnlQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2FycmF5aWZ5UHJvcFwiO1xuaW1wb3J0IGdlbmVyaWNQcm9wcyBmcm9tIFwiLi4vLi4vcHJvcHMvZ2VuZXJpY1Byb3BzXCI7XG5pbXBvcnQgZ3JpZFByb3BzIGZyb20gXCIuLi8uLi9wcm9wcy9ncmlkUHJvcHNcIjtcblxuY29uc3QgUHN1ZWRvR3JpZCA9IChwcm9wcykgPT4ge1xuICBjb25zdCB7IGJhc2UsIGdhcCwgLi4ucmVzdCB9ID0gcHJvcHM7XG4gIGNvbnN0IHsgYnJlYWtwb2ludEluZGV4IH0gPSB1c2VSZXNwb25zaXZlKCk7XG5cbiAgcmV0dXJuIChcbiAgICA8U3R5bGVkR3JpZFxuICAgICAgey4uLnByb3BzfVxuICAgICAgY3NzPXt7XG4gICAgICAgIHBvc2l0aW9uOiBcImFic29sdXRlXCIsXG4gICAgICAgIHRvcDogMCxcbiAgICAgICAgbGVmdDogMCxcbiAgICAgICAgd2lkdGg6IFwiMTAwJVwiLFxuICAgICAgICBoZWlnaHQ6IFwiMTAwJVwiLFxuICAgICAgfX1cbiAgICA+XG4gICAgICB7Wy4uLkFycmF5KGFycmF5aWZ5UHJvcChiYXNlKVticmVha3BvaW50SW5kZXhdKV0ubWFwKChfLCBpKSA9PiAoXG4gICAgICAgIDxJdGVtXG4gICAgICAgICAga2V5PXtpfVxuICAgICAgICAgIHNwYW49ezF9XG4gICAgICAgICAgY3NzPXt7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgyNTUsIDAsIDAsIDAuMSlcIixcbiAgICAgICAgICAgIGJveFNoYWRvdzogXCJpbnNldCAwcHggMHB4IDBweCAxcHggcmdiYSgyNTUsIDAsIDAsIDAuMiksXCIsXG4gICAgICAgICAgfX1cbiAgICAgICAgLz5cbiAgICAgICkpfVxuICAgIDwvU3R5bGVkR3JpZD5cbiAgKTtcbn07XG5cbmNvbnN0IEdyaWQgPSAoeyBjaGlsZHJlbiwgLi4ucHJvcHMgfSkgPT4ge1xuICBjb25zdCB7IGRldiB9ID0gcHJvcHM7XG4gIHJldHVybiAoXG4gICAgPFN0eWxlZEdyaWQgey4uLnByb3BzfT5cbiAgICAgIHtkZXYgJiYgPFBzdWVkb0dyaWQgey4uLnByb3BzfSAvPn1cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L1N0eWxlZEdyaWQ+XG4gICk7XG59O1xuXG5jb25zdCBTdHlsZWRHcmlkID0gc3R5bGVkLmRpdmBcbiAgJHsoeyBkZXYgfSkgPT4gZGV2ICYmIGBwb3NpdGlvbjogcmVsYXRpdmU7YH1cbiAgJHtncmlkUHJvcHN9XG4gICR7Z2VuZXJpY1Byb3BzfVxuYDtcblxuY29uc3QgSXRlbSA9IHN0eWxlZC5kaXZgXG4gICR7Z2VuZXJpY1Byb3BzfVxuYDtcblxuR3JpZC5JdGVtID0gSXRlbTtcbmV4cG9ydCBkZWZhdWx0IEdyaWQ7XG4iXX0= */"));
Grid.Item = Item;

var Box = /*#__PURE__*/_styled("div", process.env.NODE_ENV === "production" ? {
  target: "emo2p3z0"
} : {
  target: "emo2p3z0",
  label: "Box"
})(genericProps, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkJveC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHc0IiLCJmaWxlIjoiQm94LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHN0eWxlZCBmcm9tIFwiQGVtb3Rpb24vc3R5bGVkXCI7XG5pbXBvcnQgZ2VuZXJpY1Byb3BzIGZyb20gXCIuLi8uLi9wcm9wcy9nZW5lcmljUHJvcHNcIjtcblxuY29uc3QgQm94ID0gc3R5bGVkLmRpdmBcbiAgJHtnZW5lcmljUHJvcHN9XG5gO1xuXG5leHBvcnQgZGVmYXVsdCBCb3g7XG4iXX0= */"));

function _EMOTION_STRINGIFIED_CSS_ERROR__$1() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }
process.env.NODE_ENV === "production" ? {
  name: "1ubad42",
  styles: "box-sizing:border-box;background-color:rgba(255, 0, 0, 0.1);box-shadow:inset 0px 0px 0px 1px rgba(255, 0, 0, 0.2)"
} : {
  name: "ugh45g-func",
  styles: "box-sizing:border-box;background-color:rgba(255, 0, 0, 0.1);box-shadow:inset 0px 0px 0px 1px rgba(255, 0, 0, 0.2);label:func;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRldk1peGlucy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFNUyIsImZpbGUiOiJkZXZNaXhpbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IHJlc3BvbnNpdmVQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Jlc3BvbnNpdmVQcm9wXCI7XG5cbmNvbnN0IGRldk1peGlucyA9ICh7IGRldiB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDAsIDAsIDAuMSk7XG4gICAgICAgIGJveC1zaGFkb3c6IGluc2V0IDBweCAwcHggMHB4IDFweCByZ2JhKDI1NSwgMCwgMCwgMC4yKTtcbiAgICAgIGAsXG4gICAgdmFsOiBkZXYsXG4gIH0pO1xuXG5leHBvcnQgZGVmYXVsdCBkZXZNaXhpbnM7XG4iXX0= */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__$1
};

var _excluded$3 = ["maxWidth", "px", "backgroundColor", "background", "children", "as", "id", "className"];
var Section = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
  var _theme$palette, _theme$section, _theme$section2;
  var maxWidth = _ref.maxWidth,
    px = _ref.px,
    backgroundColor = _ref.backgroundColor,
    background = _ref.background,
    children = _ref.children,
    as = _ref.as,
    id = _ref.id,
    className = _ref.className,
    restProps = _objectWithoutProperties(_ref, _excluded$3);
  var theme = useTheme(ThemeContext);
  return jsx(Outer$1, {
    id: id,
    backgroundColor: backgroundColor || (theme === null || theme === void 0 ? void 0 : (_theme$palette = theme.palette) === null || _theme$palette === void 0 ? void 0 : _theme$palette.background),
    background: background,
    as: as,
    className: className
  }, jsx(Inner$1, _extends({
    ref: ref,
    maxWidth: interpolatedProp(maxWidth || (theme === null || theme === void 0 ? void 0 : (_theme$section = theme.section) === null || _theme$section === void 0 ? void 0 : _theme$section.maxWidth), "rem"),
    px: px || (theme === null || theme === void 0 ? void 0 : (_theme$section2 = theme.section) === null || _theme$section2 === void 0 ? void 0 : _theme$section2.px)
  }, restProps), children));
});
var sectionSpecialProps = function sectionSpecialProps(_ref2) {
  var theme = _ref2.theme,
    value = _ref2.px,
    maxWidth = _ref2.maxWidth;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        max-width: calc(".concat(maxWidth, " + ").concat(x, " + ").concat(x, ");\n        padding-left: ").concat(x, ";\n        padding-right: ").concat(x, ";\n      ");
    },
    interpolation: "rem"
  });
};
var Inner$1 = /*#__PURE__*/_styled("div", process.env.NODE_ENV === "production" ? {
  target: "ebf42ix1"
} : {
  target: "ebf42ix1",
  label: "Inner"
})("margin:0 auto;", genericProps, " ", sectionSpecialProps, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNlY3Rpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBcUV3QiIsImZpbGUiOiJTZWN0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHN0eWxlZCBmcm9tIFwiQGVtb3Rpb24vc3R5bGVkXCI7XG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG4vLyBpbXBvcnQgeyB1c2VSZXNwb25zaXZlIH0gZnJvbSBcIi4uLy4uL2hvb2tzL3VzZVJlc3BvbnNpdmUvdXNlUmVzcG9uc2l2ZVwiO1xuaW1wb3J0IHsgVGhlbWVDb250ZXh0LCBjc3MsIHVzZVRoZW1lIH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XG4vLyBpbXBvcnQgeyBhcnJheWlmeVByb3AgfSBmcm9tIFwiLi4vLi4vdXRpbHMvYXJyYXlpZnlQcm9wXCI7XG5pbXBvcnQgZGV2TWl4aW5zIGZyb20gXCIuLi8uLi9taXhpbnMvcmVzcG9uc2l2ZVByb3BzL2Rldk1peGluc1wiO1xuaW1wb3J0IHNwYWNlTWl4aW5zIGZyb20gXCIuLi8uLi9taXhpbnMvcmVzcG9uc2l2ZVByb3BzL3NwYWNlTWl4aW5zXCI7XG5pbXBvcnQgc2l6ZU1peGlucyBmcm9tIFwiLi4vLi4vbWl4aW5zL3Jlc3BvbnNpdmVQcm9wcy9zaXplTWl4aW5zXCI7XG5pbXBvcnQgYmFja2dyb3VuZENvbG9yTWl4aW5zIGZyb20gXCIuLi8uLi9taXhpbnMvcmVzcG9uc2l2ZVByb3BzL2JhY2tncm91bmRDb2xvck1peGluc1wiO1xuaW1wb3J0IHsgaW50ZXJwb2xhdGVkUHJvcCwgcmVzcG9uc2l2ZVByb3AgfSBmcm9tIFwiLi4vLi4vdXRpbHMvcmVzcG9uc2l2ZVByb3BcIjtcbmltcG9ydCBnZW5lcmljUHJvcHMgZnJvbSBcIi4uLy4uL3Byb3BzL2dlbmVyaWNQcm9wc1wiO1xuaW1wb3J0IHsgYXJyYXlQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2FycmF5UHJvcFwiO1xuXG5jb25zdCBTZWN0aW9uID0gUmVhY3QuZm9yd2FyZFJlZihcbiAgKFxuICAgIHtcbiAgICAgIG1heFdpZHRoLFxuICAgICAgcHgsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3IsXG4gICAgICBiYWNrZ3JvdW5kLFxuICAgICAgY2hpbGRyZW4sXG4gICAgICBhcyxcbiAgICAgIGlkLFxuICAgICAgY2xhc3NOYW1lLFxuICAgICAgLi4ucmVzdFByb3BzXG4gICAgfSxcbiAgICByZWZcbiAgKSA9PiB7XG4gICAgY29uc3QgdGhlbWUgPSB1c2VUaGVtZShUaGVtZUNvbnRleHQpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxPdXRlclxuICAgICAgICBpZD17aWR9XG4gICAgICAgIGJhY2tncm91bmRDb2xvcj17YmFja2dyb3VuZENvbG9yIHx8IHRoZW1lPy5wYWxldHRlPy5iYWNrZ3JvdW5kfVxuICAgICAgICBiYWNrZ3JvdW5kPXtiYWNrZ3JvdW5kfVxuICAgICAgICBhcz17YXN9XG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuICAgICAgPlxuICAgICAgICA8SW5uZXJcbiAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICBtYXhXaWR0aD17aW50ZXJwb2xhdGVkUHJvcChcbiAgICAgICAgICAgIG1heFdpZHRoIHx8IHRoZW1lPy5zZWN0aW9uPy5tYXhXaWR0aCxcbiAgICAgICAgICAgIFwicmVtXCJcbiAgICAgICAgICApfVxuICAgICAgICAgIHB4PXtweCB8fCB0aGVtZT8uc2VjdGlvbj8ucHh9XG4gICAgICAgICAgey4uLnJlc3RQcm9wc31cbiAgICAgICAgPlxuICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgPC9Jbm5lcj5cbiAgICAgIDwvT3V0ZXI+XG4gICAgKTtcbiAgfVxuKTtcblxuZXhwb3J0IGRlZmF1bHQgU2VjdGlvbjtcblxuY29uc3Qgc2VjdGlvblNwZWNpYWxQcm9wcyA9ICh7IHRoZW1lLCBweDogdmFsdWUsIG1heFdpZHRoIH0pID0+XG4gIGFycmF5UHJvcCh7XG4gICAgdGhlbWUsXG4gICAgdmFsdWUsXG4gICAgZnVuYzogKHgpID0+XG4gICAgICBgXG4gICAgICAgIG1heC13aWR0aDogY2FsYygke21heFdpZHRofSArICR7eH0gKyAke3h9KTtcbiAgICAgICAgcGFkZGluZy1sZWZ0OiAke3h9O1xuICAgICAgICBwYWRkaW5nLXJpZ2h0OiAke3h9O1xuICAgICAgYCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgSW5uZXIgPSBzdHlsZWQuZGl2YFxuICBtYXJnaW46IDAgYXV0bztcbiAgJHtnZW5lcmljUHJvcHN9XG4gICR7c2VjdGlvblNwZWNpYWxQcm9wc31cbmA7XG5cbmNvbnN0IE91dGVyID0gc3R5bGVkLnNlY3Rpb25gXG4gICR7Z2VuZXJpY1Byb3BzfVxuYDtcbiJdfQ== */"));
var Outer$1 = /*#__PURE__*/_styled("section", process.env.NODE_ENV === "production" ? {
  target: "ebf42ix0"
} : {
  target: "ebf42ix0",
  label: "Outer"
})(genericProps, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNlY3Rpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBMkU0QiIsImZpbGUiOiJTZWN0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHN0eWxlZCBmcm9tIFwiQGVtb3Rpb24vc3R5bGVkXCI7XG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG4vLyBpbXBvcnQgeyB1c2VSZXNwb25zaXZlIH0gZnJvbSBcIi4uLy4uL2hvb2tzL3VzZVJlc3BvbnNpdmUvdXNlUmVzcG9uc2l2ZVwiO1xuaW1wb3J0IHsgVGhlbWVDb250ZXh0LCBjc3MsIHVzZVRoZW1lIH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XG4vLyBpbXBvcnQgeyBhcnJheWlmeVByb3AgfSBmcm9tIFwiLi4vLi4vdXRpbHMvYXJyYXlpZnlQcm9wXCI7XG5pbXBvcnQgZGV2TWl4aW5zIGZyb20gXCIuLi8uLi9taXhpbnMvcmVzcG9uc2l2ZVByb3BzL2Rldk1peGluc1wiO1xuaW1wb3J0IHNwYWNlTWl4aW5zIGZyb20gXCIuLi8uLi9taXhpbnMvcmVzcG9uc2l2ZVByb3BzL3NwYWNlTWl4aW5zXCI7XG5pbXBvcnQgc2l6ZU1peGlucyBmcm9tIFwiLi4vLi4vbWl4aW5zL3Jlc3BvbnNpdmVQcm9wcy9zaXplTWl4aW5zXCI7XG5pbXBvcnQgYmFja2dyb3VuZENvbG9yTWl4aW5zIGZyb20gXCIuLi8uLi9taXhpbnMvcmVzcG9uc2l2ZVByb3BzL2JhY2tncm91bmRDb2xvck1peGluc1wiO1xuaW1wb3J0IHsgaW50ZXJwb2xhdGVkUHJvcCwgcmVzcG9uc2l2ZVByb3AgfSBmcm9tIFwiLi4vLi4vdXRpbHMvcmVzcG9uc2l2ZVByb3BcIjtcbmltcG9ydCBnZW5lcmljUHJvcHMgZnJvbSBcIi4uLy4uL3Byb3BzL2dlbmVyaWNQcm9wc1wiO1xuaW1wb3J0IHsgYXJyYXlQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2FycmF5UHJvcFwiO1xuXG5jb25zdCBTZWN0aW9uID0gUmVhY3QuZm9yd2FyZFJlZihcbiAgKFxuICAgIHtcbiAgICAgIG1heFdpZHRoLFxuICAgICAgcHgsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3IsXG4gICAgICBiYWNrZ3JvdW5kLFxuICAgICAgY2hpbGRyZW4sXG4gICAgICBhcyxcbiAgICAgIGlkLFxuICAgICAgY2xhc3NOYW1lLFxuICAgICAgLi4ucmVzdFByb3BzXG4gICAgfSxcbiAgICByZWZcbiAgKSA9PiB7XG4gICAgY29uc3QgdGhlbWUgPSB1c2VUaGVtZShUaGVtZUNvbnRleHQpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxPdXRlclxuICAgICAgICBpZD17aWR9XG4gICAgICAgIGJhY2tncm91bmRDb2xvcj17YmFja2dyb3VuZENvbG9yIHx8IHRoZW1lPy5wYWxldHRlPy5iYWNrZ3JvdW5kfVxuICAgICAgICBiYWNrZ3JvdW5kPXtiYWNrZ3JvdW5kfVxuICAgICAgICBhcz17YXN9XG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuICAgICAgPlxuICAgICAgICA8SW5uZXJcbiAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICBtYXhXaWR0aD17aW50ZXJwb2xhdGVkUHJvcChcbiAgICAgICAgICAgIG1heFdpZHRoIHx8IHRoZW1lPy5zZWN0aW9uPy5tYXhXaWR0aCxcbiAgICAgICAgICAgIFwicmVtXCJcbiAgICAgICAgICApfVxuICAgICAgICAgIHB4PXtweCB8fCB0aGVtZT8uc2VjdGlvbj8ucHh9XG4gICAgICAgICAgey4uLnJlc3RQcm9wc31cbiAgICAgICAgPlxuICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgPC9Jbm5lcj5cbiAgICAgIDwvT3V0ZXI+XG4gICAgKTtcbiAgfVxuKTtcblxuZXhwb3J0IGRlZmF1bHQgU2VjdGlvbjtcblxuY29uc3Qgc2VjdGlvblNwZWNpYWxQcm9wcyA9ICh7IHRoZW1lLCBweDogdmFsdWUsIG1heFdpZHRoIH0pID0+XG4gIGFycmF5UHJvcCh7XG4gICAgdGhlbWUsXG4gICAgdmFsdWUsXG4gICAgZnVuYzogKHgpID0+XG4gICAgICBgXG4gICAgICAgIG1heC13aWR0aDogY2FsYygke21heFdpZHRofSArICR7eH0gKyAke3h9KTtcbiAgICAgICAgcGFkZGluZy1sZWZ0OiAke3h9O1xuICAgICAgICBwYWRkaW5nLXJpZ2h0OiAke3h9O1xuICAgICAgYCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgSW5uZXIgPSBzdHlsZWQuZGl2YFxuICBtYXJnaW46IDAgYXV0bztcbiAgJHtnZW5lcmljUHJvcHN9XG4gICR7c2VjdGlvblNwZWNpYWxQcm9wc31cbmA7XG5cbmNvbnN0IE91dGVyID0gc3R5bGVkLnNlY3Rpb25gXG4gICR7Z2VuZXJpY1Byb3BzfVxuYDtcbiJdfQ== */"));

var Spacer = /*#__PURE__*/_styled("div", process.env.NODE_ENV === "production" ? {
  target: "eeqcce90"
} : {
  target: "eeqcce90",
  label: "Spacer"
})(genericProps, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNwYWNlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHeUIiLCJmaWxlIjoiU3BhY2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHN0eWxlZCBmcm9tIFwiQGVtb3Rpb24vc3R5bGVkXCI7XG5pbXBvcnQgZ2VuZXJpY1Byb3BzIGZyb20gXCIuLi8uLi9wcm9wcy9nZW5lcmljUHJvcHNcIjtcblxuY29uc3QgU3BhY2VyID0gc3R5bGVkLmRpdmBcbiAgJHtnZW5lcmljUHJvcHN9XG5gO1xuXG5TcGFjZXIuZGVmYXVsdFByb3BzID0ge1xuICBoZWlnaHQ6IDEsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBTcGFjZXI7XG4iXX0= */"));
Spacer.defaultProps = {
  height: 1
};

var color = function color(_ref) {
  var theme = _ref.theme,
    value = _ref.color;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n          color: ".concat(isValidColor(x) ? x : findValueInObject(x, theme), ";\n        ");
    }
  });
};
var fontFamily = function fontFamily(_ref2) {
  var theme = _ref2.theme,
    value = _ref2.fontFamily;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n          font-family: ".concat(x, ";\n        ");
    }
  });
};
var fontSize = function fontSize(_ref3) {
  var theme = _ref3.theme,
    value = _ref3.fontSize;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n          font-size: ".concat(x, ";\n        ");
    },
    interpolation: "rem"
  });
};
var fontWeight = function fontWeight(_ref4) {
  var theme = _ref4.theme,
    value = _ref4.fontWeight;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n          font-weight: ".concat(x, ";\n        ");
    }
  });
};
var lineHeight = function lineHeight(_ref5) {
  var theme = _ref5.theme,
    value = _ref5.lineHeight;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n          line-height: ".concat(x, ";\n        ");
    },
    interpolation: "rem"
  });
};
var letterSpacing = function letterSpacing(_ref6) {
  var theme = _ref6.theme,
    value = _ref6.letterSpacing;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n          letter-spacing: ".concat(x, ";\n        ");
    },
    interpolation: "em"
  });
};
var textAlign = function textAlign(_ref7) {
  var theme = _ref7.theme,
    value = _ref7.textAlign;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n          text-align: ".concat(x, ";\n        ");
    }
  });
};
var textDecoration = function textDecoration(_ref8) {
  var theme = _ref8.theme,
    value = _ref8.textDecoration;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n          text-decoration: ".concat(x, ";\n        ");
    }
  });
};
var textTransform = function textTransform(_ref9) {
  var theme = _ref9.theme,
    value = _ref9.textTransform;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n          text-transform: ".concat(x, ";\n        ");
    }
  });
};
var whiteSpace = function whiteSpace(_ref10) {
  var theme = _ref10.theme,
    value = _ref10.whiteSpace;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n          white-space: ".concat(x, ";\n        ");
    }
  });
};
var userSelect = function userSelect(_ref11) {
  var theme = _ref11.theme,
    value = _ref11.userSelect;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n          user-select: ".concat(x, ";\n        ");
    }
  });
};
var typographyProps = [fontFamily, fontSize, fontWeight, lineHeight, letterSpacing, color, textAlign, textDecoration, textTransform, whiteSpace, userSelect];

var _excluded$2 = ["variant", "children", "color"];
var Typography = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
  var _theme$typography, _varsFrTheme$default, _theme$palette, _theme$palette2;
  var variantFromProps = _ref.variant,
    children = _ref.children,
    color = _ref.color,
    restProps = _objectWithoutProperties(_ref, _excluded$2);
  var theme = useTheme(ThemeContext);
  var varsFrTheme = theme === null || theme === void 0 ? void 0 : (_theme$typography = theme.typography) === null || _theme$typography === void 0 ? void 0 : _theme$typography.variants;
  var colorPriority = color ||
  // if color is passed as prop, use it
  variantFromProps && varsFrTheme[variantFromProps].color ||
  // if variant is passed as prop, use its color
  varsFrTheme && ((_varsFrTheme$default = varsFrTheme.default) === null || _varsFrTheme$default === void 0 ? void 0 : _varsFrTheme$default.color) || ( // if variants exist, use default color
  theme === null || theme === void 0 ? void 0 : (_theme$palette = theme.palette) === null || _theme$palette === void 0 ? void 0 : _theme$palette.text.primary) || (theme === null || theme === void 0 ? void 0 : (_theme$palette2 = theme.palette) === null || _theme$palette2 === void 0 ? void 0 : _theme$palette2.textPrimary); // if no variants exist, use theme's textPrimary

  return jsx(TypographyStyled, _extends({
    ref: ref
  }, varsFrTheme && varsFrTheme.default, variantFromProps && varsFrTheme[variantFromProps], {
    color: colorPriority
  }, restProps), children);
});
var props = ["fontSize", "fontWeight", "lineHeight", "fontFamily", "color", "textAlign", "textDecoration", "textTransform"];
var TypographyStyled = /*#__PURE__*/_styled("div", process.env.NODE_ENV === "production" ? {
  shouldForwardProp: function shouldForwardProp(prop) {
    return isPropValid(prop) && !props.includes(prop);
  },
  target: "e14iioxq0"
} : {
  shouldForwardProp: function shouldForwardProp(prop) {
    return isPropValid(prop) && !props.includes(prop);
  },
  target: "e14iioxq0",
  label: "TypographyStyled"
})(typographyProps, " ", genericProps, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlR5cG9ncmFwaHkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBK0NFIiwiZmlsZSI6IlR5cG9ncmFwaHkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgc3R5bGVkIGZyb20gXCJAZW1vdGlvbi9zdHlsZWRcIjtcbmltcG9ydCB7IFRoZW1lQ29udGV4dCwgdXNlVGhlbWUgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCBpc1Byb3BWYWxpZCBmcm9tIFwiQGVtb3Rpb24vaXMtcHJvcC12YWxpZFwiO1xuaW1wb3J0IGdlbmVyaWNQcm9wcyBmcm9tIFwiLi4vLi4vcHJvcHMvZ2VuZXJpY1Byb3BzXCI7XG5pbXBvcnQgdHlwb2dyYXBoeVByb3BzIGZyb20gXCIuLi8uLi9wcm9wcy90eXBvZ3JhcGh5UHJvcHNcIjtcblxuY29uc3QgVHlwb2dyYXBoeSA9IFJlYWN0LmZvcndhcmRSZWYoXG4gICh7IHZhcmlhbnQ6IHZhcmlhbnRGcm9tUHJvcHMsIGNoaWxkcmVuLCBjb2xvciwgLi4ucmVzdFByb3BzIH0sIHJlZikgPT4ge1xuICAgIGNvbnN0IHRoZW1lID0gdXNlVGhlbWUoVGhlbWVDb250ZXh0KTtcblxuICAgIGNvbnN0IHZhcnNGclRoZW1lID0gdGhlbWU/LnR5cG9ncmFwaHk/LnZhcmlhbnRzO1xuXG4gICAgY29uc3QgY29sb3JQcmlvcml0eSA9XG4gICAgICBjb2xvciB8fCAvLyBpZiBjb2xvciBpcyBwYXNzZWQgYXMgcHJvcCwgdXNlIGl0XG4gICAgICAodmFyaWFudEZyb21Qcm9wcyAmJiB2YXJzRnJUaGVtZVt2YXJpYW50RnJvbVByb3BzXS5jb2xvcikgfHwgLy8gaWYgdmFyaWFudCBpcyBwYXNzZWQgYXMgcHJvcCwgdXNlIGl0cyBjb2xvclxuICAgICAgKHZhcnNGclRoZW1lICYmIHZhcnNGclRoZW1lLmRlZmF1bHQ/LmNvbG9yKSB8fCAvLyBpZiB2YXJpYW50cyBleGlzdCwgdXNlIGRlZmF1bHQgY29sb3JcbiAgICAgIHRoZW1lPy5wYWxldHRlPy50ZXh0LnByaW1hcnkgfHxcbiAgICAgIHRoZW1lPy5wYWxldHRlPy50ZXh0UHJpbWFyeTsgLy8gaWYgbm8gdmFyaWFudHMgZXhpc3QsIHVzZSB0aGVtZSdzIHRleHRQcmltYXJ5XG5cbiAgICByZXR1cm4gKFxuICAgICAgPFR5cG9ncmFwaHlTdHlsZWRcbiAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgIHsuLi4odmFyc0ZyVGhlbWUgJiYgdmFyc0ZyVGhlbWUuZGVmYXVsdCl9XG4gICAgICAgIHsuLi4odmFyaWFudEZyb21Qcm9wcyAmJiB2YXJzRnJUaGVtZVt2YXJpYW50RnJvbVByb3BzXSl9XG4gICAgICAgIGNvbG9yPXtjb2xvclByaW9yaXR5fVxuICAgICAgICB7Li4ucmVzdFByb3BzfVxuICAgICAgPlxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L1R5cG9ncmFwaHlTdHlsZWQ+XG4gICAgKTtcbiAgfVxuKTtcblxuY29uc3QgcHJvcHMgPSBbXG4gIFwiZm9udFNpemVcIixcbiAgXCJmb250V2VpZ2h0XCIsXG4gIFwibGluZUhlaWdodFwiLFxuICBcImZvbnRGYW1pbHlcIixcbiAgXCJjb2xvclwiLFxuICBcInRleHRBbGlnblwiLFxuICBcInRleHREZWNvcmF0aW9uXCIsXG4gIFwidGV4dFRyYW5zZm9ybVwiLFxuXTtcblxuY29uc3QgVHlwb2dyYXBoeVN0eWxlZCA9IHN0eWxlZChcImRpdlwiLCB7XG4gIHNob3VsZEZvcndhcmRQcm9wOiAocHJvcCkgPT4gaXNQcm9wVmFsaWQocHJvcCkgJiYgIXByb3BzLmluY2x1ZGVzKHByb3ApLFxufSlgXG4gICR7dHlwb2dyYXBoeVByb3BzfVxuICAke2dlbmVyaWNQcm9wc31cbmA7XG5cbmV4cG9ydCBkZWZhdWx0IFR5cG9ncmFwaHk7XG4iXX0= */"));

var displayFlex = {
  display: "flex"
};
var flexDirection = function flexDirection(_ref) {
  var theme = _ref.theme,
    value = _ref.flexDirection;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        flex-direction: ".concat(x, ";\n      ");
    }
  });
};
var gap = function gap(_ref2) {
  var theme = _ref2.theme,
    value = _ref2.gap;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        gap: ".concat(x, ";\n      ");
    },
    interpolation: "rem"
  });
};
var rowGap = function rowGap(_ref3) {
  var theme = _ref3.theme,
    value = _ref3.rowGap;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        row-gap: ".concat(x, ";\n      ");
    },
    interpolation: "rem"
  });
};
var columnGap = function columnGap(_ref4) {
  var theme = _ref4.theme,
    value = _ref4.columnGap;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        column-gap: ".concat(x, ";\n      ");
    },
    interpolation: "rem"
  });
};
var alignItems = function alignItems(_ref5) {
  var theme = _ref5.theme,
    value = _ref5.alignItems;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        align-items: ".concat(x, ";\n      ");
    }
  });
};
var justifyContent = function justifyContent(_ref6) {
  var theme = _ref6.theme,
    value = _ref6.justifyContent;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        justify-content: ".concat(x, ";\n      ");
    }
  });
};
var flexWrap = function flexWrap(_ref7) {
  var theme = _ref7.theme,
    value = _ref7.flexWrap;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        flex-wrap: ".concat(x, ";\n      ");
    }
  });
};
var alignContent = function alignContent(_ref8) {
  var theme = _ref8.theme,
    value = _ref8.alignContent;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        align-content: ".concat(x, ";\n      ");
    }
  });
};
var flexProps = [displayFlex, flexDirection, gap, alignItems, justifyContent, flexWrap, alignContent, rowGap, columnGap];

var Stack = /*#__PURE__*/_styled("div", process.env.NODE_ENV === "production" ? {
  target: "e1nhy00x0"
} : {
  target: "e1nhy00x0",
  label: "Stack"
})(flexProps, " ", genericProps, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlN0YWNrLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUl3QiIsImZpbGUiOiJTdGFjay5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzdHlsZWQgZnJvbSBcIkBlbW90aW9uL3N0eWxlZFwiO1xuaW1wb3J0IGdlbmVyaWNQcm9wcyBmcm9tIFwiLi4vLi4vcHJvcHMvZ2VuZXJpY1Byb3BzXCI7XG5pbXBvcnQgZmxleFByb3BzIGZyb20gXCIuLi8uLi9wcm9wcy9mbGV4UHJvcHNcIjtcblxuY29uc3QgU3RhY2sgPSBzdHlsZWQuZGl2YFxuICAke2ZsZXhQcm9wc31cbiAgJHtnZW5lcmljUHJvcHN9XG5gO1xuXG5TdGFjay5kZWZhdWx0UHJvcHMgPSB7XG4gIGZsZXhEaXJlY3Rpb246IFwiY29sdW1uXCIsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBTdGFjaztcbiJdfQ== */"));
Stack.defaultProps = {
  flexDirection: "column"
};

var _excluded$1 = ["ratio", "children"];
function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }
var KeepAspectRatio = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
  var _ref$ratio = _ref.ratio,
    ratio = _ref$ratio === void 0 ? 1 : _ref$ratio,
    children = _ref.children,
    restProps = _objectWithoutProperties(_ref, _excluded$1);
  return jsx(Outer, {
    ratio: ratio
  }, jsx(Inner, _extends({
    ref: ref
  }, restProps), children));
});
var ratio = function ratio(_ref2) {
  var ratio = _ref2.ratio;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("padding-bottom:", 1 / x * 100, "%;" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIktlZXBBc3BlY3RSYXRpby5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFzQlMiLCJmaWxlIjoiS2VlcEFzcGVjdFJhdGlvLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHN0eWxlZCBmcm9tIFwiQGVtb3Rpb24vc3R5bGVkXCI7XG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNwb25zaXZlUHJvcCB9IGZyb20gXCIuLi8uLi91dGlscy9yZXNwb25zaXZlUHJvcFwiO1xuaW1wb3J0IHsgY3NzIH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XG5cbmNvbnN0IEtlZXBBc3BlY3RSYXRpbyA9IFJlYWN0LmZvcndhcmRSZWYoXG4gICh7IHJhdGlvID0gMSwgY2hpbGRyZW4sIC4uLnJlc3RQcm9wcyB9LCByZWYpID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgPE91dGVyIHJhdGlvPXtyYXRpb30+XG4gICAgICAgIDxJbm5lciByZWY9e3JlZn0gey4uLnJlc3RQcm9wc30+XG4gICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICA8L0lubmVyPlxuICAgICAgPC9PdXRlcj5cbiAgICApO1xuICB9XG4pO1xuXG5leHBvcnQgZGVmYXVsdCBLZWVwQXNwZWN0UmF0aW87XG5cbmNvbnN0IHJhdGlvID0gKHsgcmF0aW8gfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwYWRkaW5nLWJvdHRvbTogJHsoMSAvIHgpICogMTAwfSU7XG4gICAgICBgLFxuICAgIHZhbDogcmF0aW8sXG4gIH0pO1xuXG5jb25zdCBPdXRlciA9IHN0eWxlZC5kaXZgXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMDtcbiAgJHtyYXRpb31cbmA7XG5cbmNvbnN0IElubmVyID0gc3R5bGVkLmRpdmBcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG4gIGxlZnQ6IDA7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIGJvcmRlci1yYWRpdXM6IDAuNXJlbTtcbmA7XG4iXX0= */");
    },
    val: ratio
  });
};
var Outer = /*#__PURE__*/_styled("div", process.env.NODE_ENV === "production" ? {
  target: "elrxxr01"
} : {
  target: "elrxxr01",
  label: "Outer"
})("position:relative;width:100%;height:0;", ratio, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIktlZXBBc3BlY3RSYXRpby5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUE0QndCIiwiZmlsZSI6IktlZXBBc3BlY3RSYXRpby5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzdHlsZWQgZnJvbSBcIkBlbW90aW9uL3N0eWxlZFwiO1xuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzcG9uc2l2ZVByb3AgfSBmcm9tIFwiLi4vLi4vdXRpbHMvcmVzcG9uc2l2ZVByb3BcIjtcbmltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xuXG5jb25zdCBLZWVwQXNwZWN0UmF0aW8gPSBSZWFjdC5mb3J3YXJkUmVmKFxuICAoeyByYXRpbyA9IDEsIGNoaWxkcmVuLCAuLi5yZXN0UHJvcHMgfSwgcmVmKSA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxPdXRlciByYXRpbz17cmF0aW99PlxuICAgICAgICA8SW5uZXIgcmVmPXtyZWZ9IHsuLi5yZXN0UHJvcHN9PlxuICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgPC9Jbm5lcj5cbiAgICAgIDwvT3V0ZXI+XG4gICAgKTtcbiAgfVxuKTtcblxuZXhwb3J0IGRlZmF1bHQgS2VlcEFzcGVjdFJhdGlvO1xuXG5jb25zdCByYXRpbyA9ICh7IHJhdGlvIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgcGFkZGluZy1ib3R0b206ICR7KDEgLyB4KSAqIDEwMH0lO1xuICAgICAgYCxcbiAgICB2YWw6IHJhdGlvLFxuICB9KTtcblxuY29uc3QgT3V0ZXIgPSBzdHlsZWQuZGl2YFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDA7XG4gICR7cmF0aW99XG5gO1xuXG5jb25zdCBJbm5lciA9IHN0eWxlZC5kaXZgXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwO1xuICBsZWZ0OiAwO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBib3JkZXItcmFkaXVzOiAwLjVyZW07XG5gO1xuIl19 */"));
var Inner = /*#__PURE__*/_styled("div", process.env.NODE_ENV === "production" ? {
  target: "elrxxr00"
} : {
  target: "elrxxr00",
  label: "Inner"
})(process.env.NODE_ENV === "production" ? {
  name: "je4esf",
  styles: "position:absolute;top:0;left:0;width:100%;height:100%;border-radius:0.5rem"
} : {
  name: "je4esf",
  styles: "position:absolute;top:0;left:0;width:100%;height:100%;border-radius:0.5rem",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIktlZXBBc3BlY3RSYXRpby5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFtQ3dCIiwiZmlsZSI6IktlZXBBc3BlY3RSYXRpby5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzdHlsZWQgZnJvbSBcIkBlbW90aW9uL3N0eWxlZFwiO1xuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzcG9uc2l2ZVByb3AgfSBmcm9tIFwiLi4vLi4vdXRpbHMvcmVzcG9uc2l2ZVByb3BcIjtcbmltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xuXG5jb25zdCBLZWVwQXNwZWN0UmF0aW8gPSBSZWFjdC5mb3J3YXJkUmVmKFxuICAoeyByYXRpbyA9IDEsIGNoaWxkcmVuLCAuLi5yZXN0UHJvcHMgfSwgcmVmKSA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxPdXRlciByYXRpbz17cmF0aW99PlxuICAgICAgICA8SW5uZXIgcmVmPXtyZWZ9IHsuLi5yZXN0UHJvcHN9PlxuICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgPC9Jbm5lcj5cbiAgICAgIDwvT3V0ZXI+XG4gICAgKTtcbiAgfVxuKTtcblxuZXhwb3J0IGRlZmF1bHQgS2VlcEFzcGVjdFJhdGlvO1xuXG5jb25zdCByYXRpbyA9ICh7IHJhdGlvIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgcGFkZGluZy1ib3R0b206ICR7KDEgLyB4KSAqIDEwMH0lO1xuICAgICAgYCxcbiAgICB2YWw6IHJhdGlvLFxuICB9KTtcblxuY29uc3QgT3V0ZXIgPSBzdHlsZWQuZGl2YFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDA7XG4gICR7cmF0aW99XG5gO1xuXG5jb25zdCBJbm5lciA9IHN0eWxlZC5kaXZgXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwO1xuICBsZWZ0OiAwO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBib3JkZXItcmFkaXVzOiAwLjVyZW07XG5gO1xuIl19 */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
});

var _excluded = ["only", "up", "down", "supports", "children"];
function Mq(_ref) {
  _ref.only;
    _ref.up;
    _ref.down;
    _ref.supports;
    _ref.children;
    var props = _objectWithoutProperties(_ref, _excluded);
  return jsx("div", props, "Mq");
}

function Theme(props) {
  var theme = useTheme(ThemeContext);
  return props.children(theme);
}

var fallback = defaultTheme.bp;
var mq = {
  only: {
    sm: function sm(_ref) {
      var theme = _ref.theme;
      return "@media (max-width: calc(".concat(theme.bp ? theme.bp[0] : fallback[0], " - 1px))");
    },
    md: function md(_ref2) {
      var theme = _ref2.theme;
      return "@media (min-width: ".concat(theme.bp ? theme.bp[0] : fallback[0], ") and (max-width: calc(").concat(theme.bp ? theme.bp[1] : fallback[1], " - 1px))");
    },
    lr: function lr(_ref3) {
      var theme = _ref3.theme;
      return "@media (min-width: ".concat(theme.bp ? theme.bp[1] : fallback[1], ") and (max-width: calc(").concat(theme.bp ? theme.bp[2] : fallback[2], " - 1px))");
    },
    xl: function xl(_ref4) {
      var theme = _ref4.theme;
      return "@media (min-width: ".concat(theme.bp ? theme.bp[2] : fallback[2], ") and (max-width: calc(").concat(theme.bp ? theme.bp[3] : fallback[3], " - 1px))");
    },
    wide: function wide(_ref5) {
      var theme = _ref5.theme;
      return "@media (min-width: ".concat(theme.bp ? theme.bp[3] : fallback[3], ")");
    },
    computer: "@media (hover: hover) and (pointer: fine)",
    touchDevice: "@media (hover: none) and (pointer: coarse)",
    stylus: "@media (hover: none) and (pointer: fine)",
    retina: "@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)"
  },
  up: {
    md: function md(_ref6) {
      var theme = _ref6.theme;
      return "@media (min-width: ".concat(theme.bp ? theme.bp[0] : fallback[0], ")");
    },
    lr: function lr(_ref7) {
      var theme = _ref7.theme;
      return "@media (min-width: ".concat(theme.bp ? theme.bp[1] : fallback[1], ")");
    },
    xl: function xl(_ref8) {
      var theme = _ref8.theme;
      return "@media (min-width: ".concat(theme.bp ? theme.bp[2] : fallback[2], ")");
    },
    wide: function wide(_ref9) {
      var theme = _ref9.theme;
      return "@media (min-width: ".concat(theme.bp ? theme.bp[3] : fallback[3], ")");
    }
  },
  down: {
    sm: function sm(_ref10) {
      var theme = _ref10.theme;
      return "@media (max-width: calc(".concat(theme.bp ? theme.bp[0] : fallback[0], " - 1px))");
    },
    md: function md(_ref11) {
      var theme = _ref11.theme;
      return "@media (max-width: calc(".concat(theme.bp ? theme.bp[1] : fallback[1], " - 1px))");
    },
    lr: function lr(_ref12) {
      var theme = _ref12.theme;
      return "@media (max-width: calc(".concat(theme.bp ? theme.bp[2] : fallback[2], " - 1px))");
    },
    xl: function xl(_ref13) {
      var theme = _ref13.theme;
      return "@media (max-width: calc(".concat(theme.bp ? theme.bp[3] : fallback[3], " - 1px))");
    }
  },
  supports: {
    hover: "@media (hover: hover)"
  }
};

// CSS-style syntax:
//
// const Component = styled.div`
//   ${mq.only.sm} {
//     color: green;
//   }
// `;

// Object-style syntax:
//
// <div
//   css={(theme) => ({
//     [mq.down.sm({ theme })]: {
//       color: "green",
//     },
//   })}
// >
//   ...
// </div>

export { Box, Grid, KeepAspectRatio, Mq, SageProvider, Section, Spacer, Stack, Test, Theme, Typography, arrayProp, defaultTheme, findValueInObject, flexProps, genericProps, gridProps, isValidColor, mq, responsiveProp, typographyProps, useElementSize, useHover, useKeyDown, useLogEffect, useResponsive, useSSRLayoutEffect, useScramble };
