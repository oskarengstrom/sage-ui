import React, { useLayoutEffect, useEffect, useState, useRef, useCallback } from 'react';
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
  useEffect(function () {
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
    if (node && typeof window !== "undefined") {
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

  useEffect(function () {
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
  var _useState3 = useState(undefined),
    _useState4 = _slicedToArray(_useState3, 2),
    isTouchDevice = _useState4[0],
    setIsTouchDevice = _useState4[1];
  var _useState5 = useState(false),
    _useState6 = _slicedToArray(_useState5, 2),
    breakpoint = _useState6[0],
    setBreakpoint = _useState6[1];
  var _useState7 = useState(false),
    _useState8 = _slicedToArray(_useState7, 2),
    breakpointIndex = _useState8[0],
    setBreakpointIndex = _useState8[1];
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
  useEffect(function () {
    var isMobileCheck = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    var isTouchDeviceCheck = "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
    var isIPadInLandscapeCheck = window.matchMedia("(min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape)").matches;
    var isTouchScreenDeviceCheck = window.matchMedia("(pointer: coarse)").matches;
    setIsTouchDevice(isMobileCheck || isTouchDeviceCheck || isIPadInLandscapeCheck || isTouchScreenDeviceCheck);
  }, []);
  return {
    isTouchDevice: isTouchDevice,
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
  useEffect(function () {
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
var background$1 = function background(_ref2) {
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
var backgroundColor$1 = function backgroundColor(_ref3) {
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
var color$2 = function color(_ref4) {
  var theme = _ref4.theme,
    value = _ref4.color;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n            color: ".concat(isValidColor(x) ? x : findValueInObject(x, theme), ";\n          ");
    }
  });
};
var objectFit = function objectFit(_ref5) {
  var theme = _ref5.theme,
    value = _ref5.objectFit;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "object-fit: ".concat(x, ";");
    }
  });
};
var transform$1 = function transform(_ref6) {
  var theme = _ref6.theme,
    value = _ref6.transform;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n      transform: ".concat(x, ";\n    ");
    }
  });
};
var transformOrigin = function transformOrigin(_ref7) {
  var theme = _ref7.theme,
    value = _ref7.transformOrigin;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n      transform-origin: ".concat(x, ";\n    ");
    }
  });
};
var border = function border(_ref8) {
  var theme = _ref8.theme,
    value = _ref8.border;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n      border: ".concat(x, ";\n    ");
    }
  });
};
var borderTop = function borderTop(_ref9) {
  var theme = _ref9.theme,
    value = _ref9.borderTop;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n      border-top: ".concat(x, ";\n    ");
    },
    interpolation: "rem"
  });
};
var borderRight = function borderRight(_ref10) {
  var theme = _ref10.theme,
    value = _ref10.borderRight;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n      border-right: ".concat(x, ";\n    ");
    },
    interpolation: "rem"
  });
};
var borderBottom = function borderBottom(_ref11) {
  var theme = _ref11.theme,
    value = _ref11.borderBottom;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n      border-bottom: ".concat(x, ";\n    ");
    },
    interpolation: "rem"
  });
};
var borderLeft = function borderLeft(_ref12) {
  var theme = _ref12.theme,
    value = _ref12.borderLeft;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n      border-left: ".concat(x, ";\n    ");
    },
    interpolation: "rem"
  });
};
var borderRadius$1 = function borderRadius(_ref13) {
  var theme = _ref13.theme,
    value = _ref13.borderRadius;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n      border-radius: ".concat(x, ";\n    ");
    },
    interpolation: "rem"
  });
};
var boxShadow$1 = function boxShadow(_ref14) {
  var theme = _ref14.theme,
    value = _ref14.boxShadow;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n      box-shadow: ".concat(x, ";\n    ");
    }
  });
};
var flex$1 = function flex(_ref15) {
  var theme = _ref15.theme,
    value = _ref15.flex;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n      flex: ".concat(x, ";\n    ");
    }
  });
};
var flexBasis$1 = function flexBasis(_ref16) {
  var theme = _ref16.theme,
    value = _ref16.flexBasis;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n      flex-basis: ".concat(x, ";\n    ");
    },
    interpolation: "rem"
  });
};
var flexShrink$1 = function flexShrink(_ref17) {
  var theme = _ref17.theme,
    value = _ref17.flexShrink;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n      flex-shrink: ".concat(x, ";\n    ");
    }
  });
};
var flexGrow = function flexGrow(_ref18) {
  var theme = _ref18.theme,
    value = _ref18.flexGrow;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n      flex-grow: ".concat(x, ";\n    ");
    }
  });
};
var alignSelf$1 = function alignSelf(_ref19) {
  var theme = _ref19.theme,
    value = _ref19.alignSelf;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n      align-self: ".concat(x, ";\n    ");
    }
  });
};
var outline$1 = function outline(_ref20) {
  var theme = _ref20.theme,
    value = _ref20.outline;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n      outline: ".concat(x, ";\n    ");
    }
  });
};
var overflow = function overflow(_ref21) {
  var theme = _ref21.theme,
    value = _ref21.overflow;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n      overflow: ".concat(x, ";\n    ");
    }
  });
};
var visibility$1 = function visibility(_ref22) {
  var theme = _ref22.theme,
    value = _ref22.visibility;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n      visibility: ".concat(x, ";\n    ");
    }
  });
};
var display$1 = function display(_ref23) {
  var theme = _ref23.theme,
    value = _ref23.display;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n      display: ".concat(x, ";\n    ");
    }
  });
};
var position$1 = function position(_ref24) {
  var theme = _ref24.theme,
    value = _ref24.position;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n      position: ".concat(x, ";\n    ");
    }
  });
};
var zIndex$1 = function zIndex(_ref25) {
  var theme = _ref25.theme,
    value = _ref25.zIndex;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n      z-index: ".concat(x, ";\n    ");
    }
  });
};
var top$1 = function top(_ref26) {
  var theme = _ref26.theme,
    value = _ref26.top;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n      top: ".concat(x, ";\n    ");
    },
    interpolation: "rem"
  });
};
var right$1 = function right(_ref27) {
  var theme = _ref27.theme,
    value = _ref27.right;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n      right: ".concat(x, ";\n    ");
    },
    interpolation: "rem"
  });
};
var bottom$1 = function bottom(_ref28) {
  var theme = _ref28.theme,
    value = _ref28.bottom;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n      bottom: ".concat(x, ";\n    ");
    },
    interpolation: "rem"
  });
};
var left$1 = function left(_ref29) {
  var theme = _ref29.theme,
    value = _ref29.left;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n      left: ".concat(x, ";\n    ");
    },
    interpolation: "rem"
  });
};
var inset$1 = function inset(_ref30) {
  var theme = _ref30.theme,
    value = _ref30.inset;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n      inset: ".concat(x, ";\n    ");
    },
    interpolation: "rem"
  });
};
var insetX$1 = function insetX(_ref31) {
  var theme = _ref31.theme,
    value = _ref31.insetX;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n      left: ".concat(x, ";\n      right: ").concat(x, ";\n    ");
    },
    interpolation: "rem"
  });
};
var insetY$1 = function insetY(_ref32) {
  var theme = _ref32.theme,
    value = _ref32.insetY;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n      top: ".concat(x, ";\n      bottom: ").concat(x, ";\n    ");
    },
    interpolation: "rem"
  });
};
var pointerEvents$1 = function pointerEvents(_ref33) {
  var theme = _ref33.theme,
    value = _ref33.pointerEvents;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n      pointer-events: ".concat(x, ";\n    ");
    }
  });
};
var cursor$1 = function cursor(_ref34) {
  var theme = _ref34.theme,
    value = _ref34.cursor;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n      cursor: ".concat(x, ";\n    ");
    }
  });
};
var opacity$1 = function opacity(_ref35) {
  var theme = _ref35.theme,
    value = _ref35.opacity;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n      opacity: ".concat(x, ";\n    ");
    }
  });
};
var transition$1 = function transition(_ref36) {
  var theme = _ref36.theme,
    value = _ref36.transition;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n      transition: ".concat(x, ";\n    ");
    }
  });
};
var span$1 = function span(_ref37) {
  var theme = _ref37.theme,
    value = _ref37.span;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        grid-column: span ".concat(x, ";\n      ");
    }
  });
};
var placeSelf$1 = function placeSelf(_ref38) {
  var theme = _ref38.theme,
    value = _ref38.placeSelf;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        place-self: ".concat(x, ";\n      ");
    }
  });
};
var order$1 = function order(_ref39) {
  var theme = _ref39.theme,
    value = _ref39.order;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        order: ".concat(x, ";\n      ");
    }
  });
};
var gridColumn$1 = function gridColumn(_ref40) {
  var theme = _ref40.theme,
    value = _ref40.gridColumn;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        grid-column: ".concat(x, ";\n      ");
    }
  });
};
var gridRow$1 = function gridRow(_ref41) {
  var theme = _ref41.theme,
    value = _ref41.gridRow;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        grid-row: ".concat(x, ";\n      ");
    }
  });
};
var gridArea$1 = function gridArea(_ref42) {
  var theme = _ref42.theme,
    value = _ref42.gridArea;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        grid-area: ".concat(x, ";\n      ");
    }
  });
};
var width$1 = function width(_ref43) {
  var theme = _ref43.theme,
    value = _ref43.width;
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
var maxWidth$1 = function maxWidth(_ref44) {
  var theme = _ref44.theme,
    value = _ref44.maxWidth;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        max-width: ".concat(x, ";\n      ");
    },
    interpolation: "rem"
  });
};
var minWidth$1 = function minWidth(_ref45) {
  var theme = _ref45.theme,
    value = _ref45.minWidth;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        min-width: ".concat(x, ";\n      ");
    },
    interpolation: "rem"
  });
};
var height$1 = function height(_ref46) {
  var theme = _ref46.theme,
    value = _ref46.height;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        height: ".concat(x, ";\n      ");
    },
    interpolation: "rem"
  });
};
var maxHeight$1 = function maxHeight(_ref47) {
  var theme = _ref47.theme,
    value = _ref47.maxHeight;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        max-height: ".concat(x, ";\n      ");
    },
    interpolation: "rem"
  });
};
var minHeight$1 = function minHeight(_ref48) {
  var theme = _ref48.theme,
    value = _ref48.minHeight;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        min-height: ".concat(x, ";\n      ");
    },
    interpolation: "rem"
  });
};
var aspectRatio$1 = function aspectRatio(_ref49) {
  var theme = _ref49.theme,
    value = _ref49.aspectRatio;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        aspect-ratio: ".concat(x, ";\n      ");
    },
    interpolation: "rem"
  });
};
var m$1 = function m(_ref50) {
  var theme = _ref50.theme,
    value = _ref50.m;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        margin: ".concat(x, ";\n      ");
    },
    interpolation: "rem"
  });
};
var mx$1 = function mx(_ref51) {
  var theme = _ref51.theme,
    value = _ref51.mx;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        margin-left: ".concat(x, ";\n        margin-right: ").concat(x, ";\n      ");
    },
    interpolation: "rem"
  });
};
var my$1 = function my(_ref52) {
  var theme = _ref52.theme,
    value = _ref52.my;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        margin-top: ".concat(x, ";\n        margin-bottom: ").concat(x, ";\n      ");
    },
    interpolation: "rem"
  });
};
var mt$1 = function mt(_ref53) {
  var theme = _ref53.theme,
    value = _ref53.mt;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        margin-top: ".concat(x, ";\n      ");
    },
    interpolation: "rem"
  });
};
var mr$1 = function mr(_ref54) {
  var theme = _ref54.theme,
    value = _ref54.mr;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        margin-right: ".concat(x, ";\n      ");
    },
    interpolation: "rem"
  });
};
var mb$1 = function mb(_ref55) {
  var theme = _ref55.theme,
    value = _ref55.mb;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        margin-bottom: ".concat(x, ";\n      ");
    },
    interpolation: "rem"
  });
};
var ml$1 = function ml(_ref56) {
  var theme = _ref56.theme,
    value = _ref56.ml;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        margin-left: ".concat(x, ";\n      ");
    },
    interpolation: "rem"
  });
};
var p$1 = function p(_ref57) {
  var theme = _ref57.theme,
    value = _ref57.p;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        padding: ".concat(x, ";\n      ");
    },
    interpolation: "rem"
  });
};
var px$1 = function px(_ref58) {
  var theme = _ref58.theme,
    value = _ref58.px;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        padding-left: ".concat(x, ";\n        padding-right: ").concat(x, ";\n      ");
    },
    interpolation: "rem"
  });
};
var py$1 = function py(_ref59) {
  var theme = _ref59.theme,
    value = _ref59.py;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        padding-top: ".concat(x, ";\n        padding-bottom: ").concat(x, ";\n      ");
    },
    interpolation: "rem"
  });
};
var pt$1 = function pt(_ref60) {
  var theme = _ref60.theme,
    value = _ref60.pt;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        padding-top: ".concat(x, ";\n      ");
    },
    interpolation: "rem"
  });
};
var pr$1 = function pr(_ref61) {
  var theme = _ref61.theme,
    value = _ref61.pr;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        padding-right: ".concat(x, ";\n      ");
    },
    interpolation: "rem"
  });
};
var pb$1 = function pb(_ref62) {
  var theme = _ref62.theme,
    value = _ref62.pb;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        padding-bottom: ".concat(x, ";\n      ");
    },
    interpolation: "rem"
  });
};
var pl$1 = function pl(_ref63) {
  var theme = _ref63.theme,
    value = _ref63.pl;
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
background$1, backgroundColor$1, color$2,
// Container
objectFit, transform$1, transformOrigin, border, borderTop, borderRight, borderBottom, borderLeft, borderRadius$1, boxShadow$1, flex$1, flexBasis$1, flexShrink$1, flexGrow, alignSelf$1, outline$1, overflow,
// display
visibility$1, display$1, position$1, zIndex$1, top$1, right$1, bottom$1, left$1, inset$1, insetX$1, insetY$1, pointerEvents$1, cursor$1, opacity$1, transition$1,
// Grid Item
span$1, placeSelf$1, order$1, gridColumn$1, gridRow$1, gridArea$1,
// size
width$1, maxWidth$1, minWidth$1, height$1, maxHeight$1, minHeight$1, aspectRatio$1,
// space
m$1, mx$1, my$1, mt$1, mr$1, mb$1, ml$1, p$1, px$1, py$1, pt$1, pr$1, pb$1, pl$1];

var grid$1 = {
  display: "grid"
};
var base$1 = function base(_ref) {
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
var gap$2 = function gap(_ref2) {
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
var columnGap$2 = function columnGap(_ref3) {
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
var rowGap$2 = function rowGap(_ref4) {
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
var placeItems$1 = function placeItems(_ref5) {
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
var alignItems$1 = function alignItems(_ref6) {
  var theme = _ref6.theme,
    value = _ref6.alignItems;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        align-items: ".concat(x, ";\n      ");
    }
  });
};
var justifyItems = function justifyItems(_ref7) {
  var theme = _ref7.theme,
    value = _ref7.justifyItems;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        justify-items: ".concat(x, ";\n      ");
    }
  });
};
var gridTemplateAreas$1 = function gridTemplateAreas(_ref8) {
  var theme = _ref8.theme,
    value = _ref8.gridTemplateAreas;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        grid-template-areas: ".concat(x, ";\n      ");
    }
  });
};
var gridTemplateRows$1 = function gridTemplateRows(_ref9) {
  var theme = _ref9.theme,
    value = _ref9.gridTemplateRows;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        grid-template-rows: ".concat(x, ";\n      ");
    }
  });
};
var gridTemplateColumns$1 = function gridTemplateColumns(_ref10) {
  var theme = _ref10.theme,
    value = _ref10.gridTemplateColumns;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        grid-template-columns: ".concat(x, ";\n      ");
    }
  });
};
var gridTemplate$1 = function gridTemplate(_ref11) {
  var theme = _ref11.theme,
    value = _ref11.gridTemplate;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        grid-template: ".concat(x, ";\n      ");
    }
  });
};
var gridProps = [grid$1, base$1, gap$2, columnGap$2, rowGap$2, placeItems$1, alignItems$1, justifyItems, gridTemplateAreas$1, gridTemplateRows$1, gridTemplateColumns$1, gridTemplate$1];

var blacklist = ["dev", "background", "backgroundColor", "color", "objectFit", "transform", "transformOrigin", "border", "borderRadius", "boxShadow", "flex", "flexBasis", "flexShrink", "flexGrow", "alignSelf", "outline", "overflow", "visibility", "display", "position", "zIndex", "top", "right", "bottom", "left", "inset", "insetX", "insetY", "pointerEvents", "cursor", "opacity", "transition", "span", "placeSelf", "order", "gridColumn", "gridRow", "gridArea", "width", "maxWidth", "minWidth", "height", "maxHeight", "minHeight", "aspectRatio", "m", "mx", "my", "mt", "mr", "mb", "ml", "p", "px", "py", "pt", "pr", "pb", "pl", "flexDirection", "gap", "alignItems", "justifyContent", "flexWrap", "flexFlow", "alignContent", "rowGap", "columnGap", "base", "gap", "columnGap", "rowGap", "placeItems", "alignItems", "justifyItems", "gridTemplateAreas", "gridTemplateRows", "gridTemplateColumns", "gridTemplate", "fontFamily", "fontSize", "fontStyle", "fontWeight", "fontVariant", "lineHeight", "letterSpacing", "color", "textAlign", "textDecoration", "textTransform", "textIndent", "textOverflow", "textShadow", "whiteSpace", "wordBreak", "wordSpacing", "userSelect"];
var propFilter = function propFilter(prop) {
  return isPropValid(prop) && !blacklist.includes(prop);
};

var _excluded$4 = ["base", "gap"],
  _excluded2 = ["children"];
function _EMOTION_STRINGIFIED_CSS_ERROR__$3() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }
var _ref$1 = process.env.NODE_ENV === "production" ? {
  name: "1b4920d",
  styles: "position:absolute;top:0;left:0;width:100%;height:100%"
} : {
  name: "11jsi5-PsuedoGrid",
  styles: "position:absolute;top:0;left:0;width:100%;height:100%;label:PsuedoGrid;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkdyaWQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBY00iLCJmaWxlIjoiR3JpZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzdHlsZWQgZnJvbSBcIkBlbW90aW9uL3N0eWxlZFwiO1xuaW1wb3J0IHsgdXNlUmVzcG9uc2l2ZSB9IGZyb20gXCIuLi8uLi9ob29rcy91c2VSZXNwb25zaXZlL3VzZVJlc3BvbnNpdmVcIjtcbmltcG9ydCB7IGFycmF5aWZ5UHJvcCB9IGZyb20gXCIuLi8uLi91dGlscy9hcnJheWlmeVByb3BcIjtcbmltcG9ydCBnZW5lcmljUHJvcHMgZnJvbSBcIi4uLy4uL3Byb3BzL2dlbmVyaWNQcm9wc1wiO1xuaW1wb3J0IGdyaWRQcm9wcyBmcm9tIFwiLi4vLi4vcHJvcHMvZ3JpZFByb3BzXCI7XG5pbXBvcnQgeyBwcm9wRmlsdGVyIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Byb3BGaWx0ZXJcIjtcblxuY29uc3QgUHN1ZWRvR3JpZCA9IChwcm9wcykgPT4ge1xuICBjb25zdCB7IGJhc2UsIGdhcCwgLi4ucmVzdCB9ID0gcHJvcHM7XG4gIGNvbnN0IHsgYnJlYWtwb2ludEluZGV4IH0gPSB1c2VSZXNwb25zaXZlKCk7XG5cbiAgcmV0dXJuIChcbiAgICA8U3R5bGVkR3JpZFxuICAgICAgey4uLnByb3BzfVxuICAgICAgY3NzPXt7XG4gICAgICAgIHBvc2l0aW9uOiBcImFic29sdXRlXCIsXG4gICAgICAgIHRvcDogMCxcbiAgICAgICAgbGVmdDogMCxcbiAgICAgICAgd2lkdGg6IFwiMTAwJVwiLFxuICAgICAgICBoZWlnaHQ6IFwiMTAwJVwiLFxuICAgICAgfX1cbiAgICA+XG4gICAgICB7Wy4uLkFycmF5KGFycmF5aWZ5UHJvcChiYXNlKVticmVha3BvaW50SW5kZXhdKV0ubWFwKChfLCBpKSA9PiAoXG4gICAgICAgIDxJdGVtXG4gICAgICAgICAga2V5PXtpfVxuICAgICAgICAgIHNwYW49ezF9XG4gICAgICAgICAgY3NzPXt7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgyNTUsIDAsIDAsIDAuMSlcIixcbiAgICAgICAgICAgIGJveFNoYWRvdzogXCJpbnNldCAwcHggMHB4IDBweCAxcHggcmdiYSgyNTUsIDAsIDAsIDAuMiksXCIsXG4gICAgICAgICAgfX1cbiAgICAgICAgLz5cbiAgICAgICkpfVxuICAgIDwvU3R5bGVkR3JpZD5cbiAgKTtcbn07XG5cbmNvbnN0IEdyaWQgPSAoeyBjaGlsZHJlbiwgLi4ucHJvcHMgfSkgPT4ge1xuICBjb25zdCB7IGRldiB9ID0gcHJvcHM7XG4gIHJldHVybiAoXG4gICAgPFN0eWxlZEdyaWQgey4uLnByb3BzfT5cbiAgICAgIHtkZXYgJiYgPFBzdWVkb0dyaWQgey4uLnByb3BzfSAvPn1cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L1N0eWxlZEdyaWQ+XG4gICk7XG59O1xuXG5jb25zdCBTdHlsZWRHcmlkID0gc3R5bGVkKFwiZGl2XCIsIHtcbiAgc2hvdWxkRm9yd2FyZFByb3A6IHByb3BGaWx0ZXIsXG59KWBcbiAgJHsoeyBkZXYgfSkgPT4gZGV2ICYmIGBwb3NpdGlvbjogcmVsYXRpdmU7YH1cbiAgJHtncmlkUHJvcHN9XG4gICR7Z2VuZXJpY1Byb3BzfVxuYDtcblxuY29uc3QgSXRlbSA9IHN0eWxlZChcImRpdlwiLCB7XG4gIHNob3VsZEZvcndhcmRQcm9wOiBwcm9wRmlsdGVyLFxufSkoZ2VuZXJpY1Byb3BzKTtcblxuR3JpZC5JdGVtID0gSXRlbTtcbmV4cG9ydCBkZWZhdWx0IEdyaWQ7XG4iXX0= */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__$3
};
var _ref2 = process.env.NODE_ENV === "production" ? {
  name: "1wh7wd6",
  styles: "background-color:rgba(255, 0, 0, 0.1);box-shadow:inset 0px 0px 0px 1px rgba(255, 0, 0, 0.2),"
} : {
  name: "rxmk7q-PsuedoGrid",
  styles: "background-color:rgba(255, 0, 0, 0.1);box-shadow:inset 0px 0px 0px 1px rgba(255, 0, 0, 0.2),;label:PsuedoGrid;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkdyaWQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBMEJVIiwiZmlsZSI6IkdyaWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc3R5bGVkIGZyb20gXCJAZW1vdGlvbi9zdHlsZWRcIjtcbmltcG9ydCB7IHVzZVJlc3BvbnNpdmUgfSBmcm9tIFwiLi4vLi4vaG9va3MvdXNlUmVzcG9uc2l2ZS91c2VSZXNwb25zaXZlXCI7XG5pbXBvcnQgeyBhcnJheWlmeVByb3AgfSBmcm9tIFwiLi4vLi4vdXRpbHMvYXJyYXlpZnlQcm9wXCI7XG5pbXBvcnQgZ2VuZXJpY1Byb3BzIGZyb20gXCIuLi8uLi9wcm9wcy9nZW5lcmljUHJvcHNcIjtcbmltcG9ydCBncmlkUHJvcHMgZnJvbSBcIi4uLy4uL3Byb3BzL2dyaWRQcm9wc1wiO1xuaW1wb3J0IHsgcHJvcEZpbHRlciB9IGZyb20gXCIuLi8uLi91dGlscy9wcm9wRmlsdGVyXCI7XG5cbmNvbnN0IFBzdWVkb0dyaWQgPSAocHJvcHMpID0+IHtcbiAgY29uc3QgeyBiYXNlLCBnYXAsIC4uLnJlc3QgfSA9IHByb3BzO1xuICBjb25zdCB7IGJyZWFrcG9pbnRJbmRleCB9ID0gdXNlUmVzcG9uc2l2ZSgpO1xuXG4gIHJldHVybiAoXG4gICAgPFN0eWxlZEdyaWRcbiAgICAgIHsuLi5wcm9wc31cbiAgICAgIGNzcz17e1xuICAgICAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxuICAgICAgICB0b3A6IDAsXG4gICAgICAgIGxlZnQ6IDAsXG4gICAgICAgIHdpZHRoOiBcIjEwMCVcIixcbiAgICAgICAgaGVpZ2h0OiBcIjEwMCVcIixcbiAgICAgIH19XG4gICAgPlxuICAgICAge1suLi5BcnJheShhcnJheWlmeVByb3AoYmFzZSlbYnJlYWtwb2ludEluZGV4XSldLm1hcCgoXywgaSkgPT4gKFxuICAgICAgICA8SXRlbVxuICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICBzcGFuPXsxfVxuICAgICAgICAgIGNzcz17e1xuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcInJnYmEoMjU1LCAwLCAwLCAwLjEpXCIsXG4gICAgICAgICAgICBib3hTaGFkb3c6IFwiaW5zZXQgMHB4IDBweCAwcHggMXB4IHJnYmEoMjU1LCAwLCAwLCAwLjIpLFwiLFxuICAgICAgICAgIH19XG4gICAgICAgIC8+XG4gICAgICApKX1cbiAgICA8L1N0eWxlZEdyaWQ+XG4gICk7XG59O1xuXG5jb25zdCBHcmlkID0gKHsgY2hpbGRyZW4sIC4uLnByb3BzIH0pID0+IHtcbiAgY29uc3QgeyBkZXYgfSA9IHByb3BzO1xuICByZXR1cm4gKFxuICAgIDxTdHlsZWRHcmlkIHsuLi5wcm9wc30+XG4gICAgICB7ZGV2ICYmIDxQc3VlZG9HcmlkIHsuLi5wcm9wc30gLz59XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9TdHlsZWRHcmlkPlxuICApO1xufTtcblxuY29uc3QgU3R5bGVkR3JpZCA9IHN0eWxlZChcImRpdlwiLCB7XG4gIHNob3VsZEZvcndhcmRQcm9wOiBwcm9wRmlsdGVyLFxufSlgXG4gICR7KHsgZGV2IH0pID0+IGRldiAmJiBgcG9zaXRpb246IHJlbGF0aXZlO2B9XG4gICR7Z3JpZFByb3BzfVxuICAke2dlbmVyaWNQcm9wc31cbmA7XG5cbmNvbnN0IEl0ZW0gPSBzdHlsZWQoXCJkaXZcIiwge1xuICBzaG91bGRGb3J3YXJkUHJvcDogcHJvcEZpbHRlcixcbn0pKGdlbmVyaWNQcm9wcyk7XG5cbkdyaWQuSXRlbSA9IEl0ZW07XG5leHBvcnQgZGVmYXVsdCBHcmlkO1xuIl19 */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__$3
};
var PsuedoGrid = function PsuedoGrid(props) {
  var base = props.base;
    props.gap;
    _objectWithoutProperties(props, _excluded$4);
  var _useResponsive = useResponsive(),
    breakpointIndex = _useResponsive.breakpointIndex;
  return jsx(StyledGrid, _extends({}, props, {
    css: _ref$1
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
  shouldForwardProp: propFilter,
  target: "eggk0at1"
} : {
  shouldForwardProp: propFilter,
  target: "eggk0at1",
  label: "StyledGrid"
})(function (_ref4) {
  var dev = _ref4.dev;
  return dev && "position: relative;";
}, " ", gridProps, " ", genericProps, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkdyaWQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBZ0RFIiwiZmlsZSI6IkdyaWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc3R5bGVkIGZyb20gXCJAZW1vdGlvbi9zdHlsZWRcIjtcbmltcG9ydCB7IHVzZVJlc3BvbnNpdmUgfSBmcm9tIFwiLi4vLi4vaG9va3MvdXNlUmVzcG9uc2l2ZS91c2VSZXNwb25zaXZlXCI7XG5pbXBvcnQgeyBhcnJheWlmeVByb3AgfSBmcm9tIFwiLi4vLi4vdXRpbHMvYXJyYXlpZnlQcm9wXCI7XG5pbXBvcnQgZ2VuZXJpY1Byb3BzIGZyb20gXCIuLi8uLi9wcm9wcy9nZW5lcmljUHJvcHNcIjtcbmltcG9ydCBncmlkUHJvcHMgZnJvbSBcIi4uLy4uL3Byb3BzL2dyaWRQcm9wc1wiO1xuaW1wb3J0IHsgcHJvcEZpbHRlciB9IGZyb20gXCIuLi8uLi91dGlscy9wcm9wRmlsdGVyXCI7XG5cbmNvbnN0IFBzdWVkb0dyaWQgPSAocHJvcHMpID0+IHtcbiAgY29uc3QgeyBiYXNlLCBnYXAsIC4uLnJlc3QgfSA9IHByb3BzO1xuICBjb25zdCB7IGJyZWFrcG9pbnRJbmRleCB9ID0gdXNlUmVzcG9uc2l2ZSgpO1xuXG4gIHJldHVybiAoXG4gICAgPFN0eWxlZEdyaWRcbiAgICAgIHsuLi5wcm9wc31cbiAgICAgIGNzcz17e1xuICAgICAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxuICAgICAgICB0b3A6IDAsXG4gICAgICAgIGxlZnQ6IDAsXG4gICAgICAgIHdpZHRoOiBcIjEwMCVcIixcbiAgICAgICAgaGVpZ2h0OiBcIjEwMCVcIixcbiAgICAgIH19XG4gICAgPlxuICAgICAge1suLi5BcnJheShhcnJheWlmeVByb3AoYmFzZSlbYnJlYWtwb2ludEluZGV4XSldLm1hcCgoXywgaSkgPT4gKFxuICAgICAgICA8SXRlbVxuICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICBzcGFuPXsxfVxuICAgICAgICAgIGNzcz17e1xuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcInJnYmEoMjU1LCAwLCAwLCAwLjEpXCIsXG4gICAgICAgICAgICBib3hTaGFkb3c6IFwiaW5zZXQgMHB4IDBweCAwcHggMXB4IHJnYmEoMjU1LCAwLCAwLCAwLjIpLFwiLFxuICAgICAgICAgIH19XG4gICAgICAgIC8+XG4gICAgICApKX1cbiAgICA8L1N0eWxlZEdyaWQ+XG4gICk7XG59O1xuXG5jb25zdCBHcmlkID0gKHsgY2hpbGRyZW4sIC4uLnByb3BzIH0pID0+IHtcbiAgY29uc3QgeyBkZXYgfSA9IHByb3BzO1xuICByZXR1cm4gKFxuICAgIDxTdHlsZWRHcmlkIHsuLi5wcm9wc30+XG4gICAgICB7ZGV2ICYmIDxQc3VlZG9HcmlkIHsuLi5wcm9wc30gLz59XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9TdHlsZWRHcmlkPlxuICApO1xufTtcblxuY29uc3QgU3R5bGVkR3JpZCA9IHN0eWxlZChcImRpdlwiLCB7XG4gIHNob3VsZEZvcndhcmRQcm9wOiBwcm9wRmlsdGVyLFxufSlgXG4gICR7KHsgZGV2IH0pID0+IGRldiAmJiBgcG9zaXRpb246IHJlbGF0aXZlO2B9XG4gICR7Z3JpZFByb3BzfVxuICAke2dlbmVyaWNQcm9wc31cbmA7XG5cbmNvbnN0IEl0ZW0gPSBzdHlsZWQoXCJkaXZcIiwge1xuICBzaG91bGRGb3J3YXJkUHJvcDogcHJvcEZpbHRlcixcbn0pKGdlbmVyaWNQcm9wcyk7XG5cbkdyaWQuSXRlbSA9IEl0ZW07XG5leHBvcnQgZGVmYXVsdCBHcmlkO1xuIl19 */"));
var Item = /*#__PURE__*/_styled("div", process.env.NODE_ENV === "production" ? {
  shouldForwardProp: propFilter,
  target: "eggk0at0"
} : {
  shouldForwardProp: propFilter,
  target: "eggk0at0",
  label: "Item"
})(genericProps, process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkdyaWQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBc0RhIiwiZmlsZSI6IkdyaWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc3R5bGVkIGZyb20gXCJAZW1vdGlvbi9zdHlsZWRcIjtcbmltcG9ydCB7IHVzZVJlc3BvbnNpdmUgfSBmcm9tIFwiLi4vLi4vaG9va3MvdXNlUmVzcG9uc2l2ZS91c2VSZXNwb25zaXZlXCI7XG5pbXBvcnQgeyBhcnJheWlmeVByb3AgfSBmcm9tIFwiLi4vLi4vdXRpbHMvYXJyYXlpZnlQcm9wXCI7XG5pbXBvcnQgZ2VuZXJpY1Byb3BzIGZyb20gXCIuLi8uLi9wcm9wcy9nZW5lcmljUHJvcHNcIjtcbmltcG9ydCBncmlkUHJvcHMgZnJvbSBcIi4uLy4uL3Byb3BzL2dyaWRQcm9wc1wiO1xuaW1wb3J0IHsgcHJvcEZpbHRlciB9IGZyb20gXCIuLi8uLi91dGlscy9wcm9wRmlsdGVyXCI7XG5cbmNvbnN0IFBzdWVkb0dyaWQgPSAocHJvcHMpID0+IHtcbiAgY29uc3QgeyBiYXNlLCBnYXAsIC4uLnJlc3QgfSA9IHByb3BzO1xuICBjb25zdCB7IGJyZWFrcG9pbnRJbmRleCB9ID0gdXNlUmVzcG9uc2l2ZSgpO1xuXG4gIHJldHVybiAoXG4gICAgPFN0eWxlZEdyaWRcbiAgICAgIHsuLi5wcm9wc31cbiAgICAgIGNzcz17e1xuICAgICAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxuICAgICAgICB0b3A6IDAsXG4gICAgICAgIGxlZnQ6IDAsXG4gICAgICAgIHdpZHRoOiBcIjEwMCVcIixcbiAgICAgICAgaGVpZ2h0OiBcIjEwMCVcIixcbiAgICAgIH19XG4gICAgPlxuICAgICAge1suLi5BcnJheShhcnJheWlmeVByb3AoYmFzZSlbYnJlYWtwb2ludEluZGV4XSldLm1hcCgoXywgaSkgPT4gKFxuICAgICAgICA8SXRlbVxuICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICBzcGFuPXsxfVxuICAgICAgICAgIGNzcz17e1xuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcInJnYmEoMjU1LCAwLCAwLCAwLjEpXCIsXG4gICAgICAgICAgICBib3hTaGFkb3c6IFwiaW5zZXQgMHB4IDBweCAwcHggMXB4IHJnYmEoMjU1LCAwLCAwLCAwLjIpLFwiLFxuICAgICAgICAgIH19XG4gICAgICAgIC8+XG4gICAgICApKX1cbiAgICA8L1N0eWxlZEdyaWQ+XG4gICk7XG59O1xuXG5jb25zdCBHcmlkID0gKHsgY2hpbGRyZW4sIC4uLnByb3BzIH0pID0+IHtcbiAgY29uc3QgeyBkZXYgfSA9IHByb3BzO1xuICByZXR1cm4gKFxuICAgIDxTdHlsZWRHcmlkIHsuLi5wcm9wc30+XG4gICAgICB7ZGV2ICYmIDxQc3VlZG9HcmlkIHsuLi5wcm9wc30gLz59XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9TdHlsZWRHcmlkPlxuICApO1xufTtcblxuY29uc3QgU3R5bGVkR3JpZCA9IHN0eWxlZChcImRpdlwiLCB7XG4gIHNob3VsZEZvcndhcmRQcm9wOiBwcm9wRmlsdGVyLFxufSlgXG4gICR7KHsgZGV2IH0pID0+IGRldiAmJiBgcG9zaXRpb246IHJlbGF0aXZlO2B9XG4gICR7Z3JpZFByb3BzfVxuICAke2dlbmVyaWNQcm9wc31cbmA7XG5cbmNvbnN0IEl0ZW0gPSBzdHlsZWQoXCJkaXZcIiwge1xuICBzaG91bGRGb3J3YXJkUHJvcDogcHJvcEZpbHRlcixcbn0pKGdlbmVyaWNQcm9wcyk7XG5cbkdyaWQuSXRlbSA9IEl0ZW07XG5leHBvcnQgZGVmYXVsdCBHcmlkO1xuIl19 */");
Grid.Item = Item;

var Box = /*#__PURE__*/_styled("div", process.env.NODE_ENV === "production" ? {
  shouldForwardProp: propFilter,
  target: "emo2p3z0"
} : {
  shouldForwardProp: propFilter,
  target: "emo2p3z0",
  label: "Box"
})(genericProps, process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkJveC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFJWSIsImZpbGUiOiJCb3guanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc3R5bGVkIGZyb20gXCJAZW1vdGlvbi9zdHlsZWRcIjtcbmltcG9ydCBnZW5lcmljUHJvcHMgZnJvbSBcIi4uLy4uL3Byb3BzL2dlbmVyaWNQcm9wc1wiO1xuaW1wb3J0IHsgcHJvcEZpbHRlciB9IGZyb20gXCIuLi8uLi91dGlscy9wcm9wRmlsdGVyXCI7XG5cbmNvbnN0IEJveCA9IHN0eWxlZChcImRpdlwiLCB7XG4gIHNob3VsZEZvcndhcmRQcm9wOiBwcm9wRmlsdGVyLFxufSkoZ2VuZXJpY1Byb3BzKTtcblxuZXhwb3J0IGRlZmF1bHQgQm94O1xuIl19 */");

function _EMOTION_STRINGIFIED_CSS_ERROR__$2() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }
var _ref = process.env.NODE_ENV === "production" ? {
  name: "1ubad42",
  styles: "box-sizing:border-box;background-color:rgba(255, 0, 0, 0.1);box-shadow:inset 0px 0px 0px 1px rgba(255, 0, 0, 0.2)"
} : {
  name: "ugh45g-func",
  styles: "box-sizing:border-box;background-color:rgba(255, 0, 0, 0.1);box-shadow:inset 0px 0px 0px 1px rgba(255, 0, 0, 0.2);label:func;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRldk1peGlucy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFNUyIsImZpbGUiOiJkZXZNaXhpbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IHJlc3BvbnNpdmVQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Jlc3BvbnNpdmVQcm9wXCI7XG5cbmNvbnN0IGRldk1peGlucyA9ICh7IGRldiB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDAsIDAsIDAuMSk7XG4gICAgICAgIGJveC1zaGFkb3c6IGluc2V0IDBweCAwcHggMHB4IDFweCByZ2JhKDI1NSwgMCwgMCwgMC4yKTtcbiAgICAgIGAsXG4gICAgdmFsOiBkZXYsXG4gIH0pO1xuXG5leHBvcnQgZGVmYXVsdCBkZXZNaXhpbnM7XG4iXX0= */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__$2
};
var devMixins = function devMixins(_ref2) {
  var dev = _ref2.dev;
  return responsiveProp({
    func: function func() {
      return _ref;
    },
    val: dev
  });
};

var m = function m(_ref) {
  var m = _ref.m;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("margin:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNwYWNlTWl4aW5zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU1TIiwiZmlsZSI6InNwYWNlTWl4aW5zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3NzIH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XG5pbXBvcnQgeyByZXNwb25zaXZlUHJvcCB9IGZyb20gXCIuLi8uLi91dGlscy9yZXNwb25zaXZlUHJvcFwiO1xuXG5jb25zdCBtID0gKHsgbSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1hcmdpbjogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtLFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBteCA9ICh7IG14IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgbWFyZ2luLWxlZnQ6ICR7eH07XG4gICAgICAgIG1hcmdpbi1yaWdodDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBteCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbXkgPSAoeyBteSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1hcmdpbi10b3A6ICR7eH07XG4gICAgICAgIG1hcmdpbi1ib3R0b206ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbXksXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IG10ID0gKHsgbXQgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBtYXJnaW4tdG9wOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IG10LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBtciA9ICh7IG1yIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IG1yLFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBtYiA9ICh7IG1iIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtYixcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbWwgPSAoeyBtbCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IG1sLFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBwID0gKHsgcCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHBhZGRpbmc6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogcCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgcHggPSAoeyBweCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHBhZGRpbmctbGVmdDogJHt4fTtcbiAgICAgICAgcGFkZGluZy1yaWdodDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBweCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgcHkgPSAoeyBweSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHBhZGRpbmctdG9wOiAke3h9O1xuICAgICAgICBwYWRkaW5nLWJvdHRvbTogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBweSxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgcHQgPSAoeyBwdCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHBhZGRpbmctdG9wOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IHB0LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBwciA9ICh7IHByIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgcGFkZGluZy1yaWdodDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBwcixcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgcGIgPSAoeyBwYiB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHBhZGRpbmctYm90dG9tOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IHBiLFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBwbCA9ICh7IHBsIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgcGFkZGluZy1sZWZ0OiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IHBsLFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5leHBvcnQgZGVmYXVsdCBbbSwgbXgsIG15LCBtdCwgbXIsIG1iLCBtbCwgcCwgcHgsIHB5LCBwdCwgcHIsIHBiLCBwbF07XG4iXX0= */");
    },
    val: m,
    interpolation: "rem"
  });
};
var mx = function mx(_ref2) {
  var mx = _ref2.mx;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("margin-left:", x, ";margin-right:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNwYWNlTWl4aW5zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWdCUyIsImZpbGUiOiJzcGFjZU1peGlucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xuaW1wb3J0IHsgcmVzcG9uc2l2ZVByb3AgfSBmcm9tIFwiLi4vLi4vdXRpbHMvcmVzcG9uc2l2ZVByb3BcIjtcblxuY29uc3QgbSA9ICh7IG0gfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBtYXJnaW46ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbSxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbXggPSAoeyBteCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAke3h9O1xuICAgICAgICBtYXJnaW4tcmlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbXgsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IG15ID0gKHsgbXkgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBtYXJnaW4tdG9wOiAke3h9O1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IG15LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBtdCA9ICh7IG10IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgbWFyZ2luLXRvcDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtdCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbXIgPSAoeyBtciB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1hcmdpbi1yaWdodDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtcixcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbWIgPSAoeyBtYiB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1hcmdpbi1ib3R0b206ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbWIsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IG1sID0gKHsgbWwgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBtYXJnaW4tbGVmdDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtbCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgcCA9ICh7IHAgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwYWRkaW5nOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IHAsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHB4ID0gKHsgcHggfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwYWRkaW5nLWxlZnQ6ICR7eH07XG4gICAgICAgIHBhZGRpbmctcmlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogcHgsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHB5ID0gKHsgcHkgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwYWRkaW5nLXRvcDogJHt4fTtcbiAgICAgICAgcGFkZGluZy1ib3R0b206ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogcHksXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHB0ID0gKHsgcHQgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwYWRkaW5nLXRvcDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBwdCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgcHIgPSAoeyBwciB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHBhZGRpbmctcmlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogcHIsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHBiID0gKHsgcGIgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwYWRkaW5nLWJvdHRvbTogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBwYixcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgcGwgPSAoeyBwbCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHBhZGRpbmctbGVmdDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBwbCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuZXhwb3J0IGRlZmF1bHQgW20sIG14LCBteSwgbXQsIG1yLCBtYiwgbWwsIHAsIHB4LCBweSwgcHQsIHByLCBwYiwgcGxdO1xuIl19 */");
    },
    val: mx,
    interpolation: "rem"
  });
};
var my = function my(_ref3) {
  var my = _ref3.my;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("margin-top:", x, ";margin-bottom:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNwYWNlTWl4aW5zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTJCUyIsImZpbGUiOiJzcGFjZU1peGlucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xuaW1wb3J0IHsgcmVzcG9uc2l2ZVByb3AgfSBmcm9tIFwiLi4vLi4vdXRpbHMvcmVzcG9uc2l2ZVByb3BcIjtcblxuY29uc3QgbSA9ICh7IG0gfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBtYXJnaW46ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbSxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbXggPSAoeyBteCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAke3h9O1xuICAgICAgICBtYXJnaW4tcmlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbXgsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IG15ID0gKHsgbXkgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBtYXJnaW4tdG9wOiAke3h9O1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IG15LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBtdCA9ICh7IG10IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgbWFyZ2luLXRvcDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtdCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbXIgPSAoeyBtciB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1hcmdpbi1yaWdodDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtcixcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbWIgPSAoeyBtYiB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1hcmdpbi1ib3R0b206ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbWIsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IG1sID0gKHsgbWwgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBtYXJnaW4tbGVmdDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtbCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgcCA9ICh7IHAgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwYWRkaW5nOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IHAsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHB4ID0gKHsgcHggfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwYWRkaW5nLWxlZnQ6ICR7eH07XG4gICAgICAgIHBhZGRpbmctcmlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogcHgsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHB5ID0gKHsgcHkgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwYWRkaW5nLXRvcDogJHt4fTtcbiAgICAgICAgcGFkZGluZy1ib3R0b206ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogcHksXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHB0ID0gKHsgcHQgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwYWRkaW5nLXRvcDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBwdCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgcHIgPSAoeyBwciB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHBhZGRpbmctcmlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogcHIsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHBiID0gKHsgcGIgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwYWRkaW5nLWJvdHRvbTogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBwYixcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgcGwgPSAoeyBwbCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHBhZGRpbmctbGVmdDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBwbCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuZXhwb3J0IGRlZmF1bHQgW20sIG14LCBteSwgbXQsIG1yLCBtYiwgbWwsIHAsIHB4LCBweSwgcHQsIHByLCBwYiwgcGxdO1xuIl19 */");
    },
    val: my,
    interpolation: "rem"
  });
};
var mt = function mt(_ref4) {
  var mt = _ref4.mt;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("margin-top:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNwYWNlTWl4aW5zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXNDUyIsImZpbGUiOiJzcGFjZU1peGlucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xuaW1wb3J0IHsgcmVzcG9uc2l2ZVByb3AgfSBmcm9tIFwiLi4vLi4vdXRpbHMvcmVzcG9uc2l2ZVByb3BcIjtcblxuY29uc3QgbSA9ICh7IG0gfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBtYXJnaW46ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbSxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbXggPSAoeyBteCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAke3h9O1xuICAgICAgICBtYXJnaW4tcmlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbXgsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IG15ID0gKHsgbXkgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBtYXJnaW4tdG9wOiAke3h9O1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IG15LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBtdCA9ICh7IG10IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgbWFyZ2luLXRvcDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtdCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbXIgPSAoeyBtciB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1hcmdpbi1yaWdodDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtcixcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbWIgPSAoeyBtYiB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1hcmdpbi1ib3R0b206ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbWIsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IG1sID0gKHsgbWwgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBtYXJnaW4tbGVmdDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtbCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgcCA9ICh7IHAgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwYWRkaW5nOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IHAsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHB4ID0gKHsgcHggfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwYWRkaW5nLWxlZnQ6ICR7eH07XG4gICAgICAgIHBhZGRpbmctcmlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogcHgsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHB5ID0gKHsgcHkgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwYWRkaW5nLXRvcDogJHt4fTtcbiAgICAgICAgcGFkZGluZy1ib3R0b206ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogcHksXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHB0ID0gKHsgcHQgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwYWRkaW5nLXRvcDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBwdCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgcHIgPSAoeyBwciB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHBhZGRpbmctcmlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogcHIsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHBiID0gKHsgcGIgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwYWRkaW5nLWJvdHRvbTogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBwYixcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgcGwgPSAoeyBwbCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHBhZGRpbmctbGVmdDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBwbCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuZXhwb3J0IGRlZmF1bHQgW20sIG14LCBteSwgbXQsIG1yLCBtYiwgbWwsIHAsIHB4LCBweSwgcHQsIHByLCBwYiwgcGxdO1xuIl19 */");
    },
    val: mt,
    interpolation: "rem"
  });
};
var mr = function mr(_ref5) {
  var mr = _ref5.mr;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("margin-right:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNwYWNlTWl4aW5zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWdEUyIsImZpbGUiOiJzcGFjZU1peGlucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xuaW1wb3J0IHsgcmVzcG9uc2l2ZVByb3AgfSBmcm9tIFwiLi4vLi4vdXRpbHMvcmVzcG9uc2l2ZVByb3BcIjtcblxuY29uc3QgbSA9ICh7IG0gfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBtYXJnaW46ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbSxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbXggPSAoeyBteCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAke3h9O1xuICAgICAgICBtYXJnaW4tcmlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbXgsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IG15ID0gKHsgbXkgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBtYXJnaW4tdG9wOiAke3h9O1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IG15LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBtdCA9ICh7IG10IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgbWFyZ2luLXRvcDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtdCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbXIgPSAoeyBtciB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1hcmdpbi1yaWdodDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtcixcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbWIgPSAoeyBtYiB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1hcmdpbi1ib3R0b206ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbWIsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IG1sID0gKHsgbWwgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBtYXJnaW4tbGVmdDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtbCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgcCA9ICh7IHAgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwYWRkaW5nOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IHAsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHB4ID0gKHsgcHggfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwYWRkaW5nLWxlZnQ6ICR7eH07XG4gICAgICAgIHBhZGRpbmctcmlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogcHgsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHB5ID0gKHsgcHkgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwYWRkaW5nLXRvcDogJHt4fTtcbiAgICAgICAgcGFkZGluZy1ib3R0b206ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogcHksXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHB0ID0gKHsgcHQgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwYWRkaW5nLXRvcDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBwdCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgcHIgPSAoeyBwciB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHBhZGRpbmctcmlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogcHIsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHBiID0gKHsgcGIgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwYWRkaW5nLWJvdHRvbTogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBwYixcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgcGwgPSAoeyBwbCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHBhZGRpbmctbGVmdDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBwbCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuZXhwb3J0IGRlZmF1bHQgW20sIG14LCBteSwgbXQsIG1yLCBtYiwgbWwsIHAsIHB4LCBweSwgcHQsIHByLCBwYiwgcGxdO1xuIl19 */");
    },
    val: mr,
    interpolation: "rem"
  });
};
var mb = function mb(_ref6) {
  var mb = _ref6.mb;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("margin-bottom:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNwYWNlTWl4aW5zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTBEUyIsImZpbGUiOiJzcGFjZU1peGlucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xuaW1wb3J0IHsgcmVzcG9uc2l2ZVByb3AgfSBmcm9tIFwiLi4vLi4vdXRpbHMvcmVzcG9uc2l2ZVByb3BcIjtcblxuY29uc3QgbSA9ICh7IG0gfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBtYXJnaW46ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbSxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbXggPSAoeyBteCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAke3h9O1xuICAgICAgICBtYXJnaW4tcmlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbXgsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IG15ID0gKHsgbXkgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBtYXJnaW4tdG9wOiAke3h9O1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IG15LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBtdCA9ICh7IG10IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgbWFyZ2luLXRvcDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtdCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbXIgPSAoeyBtciB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1hcmdpbi1yaWdodDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtcixcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbWIgPSAoeyBtYiB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1hcmdpbi1ib3R0b206ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbWIsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IG1sID0gKHsgbWwgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBtYXJnaW4tbGVmdDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtbCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgcCA9ICh7IHAgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwYWRkaW5nOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IHAsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHB4ID0gKHsgcHggfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwYWRkaW5nLWxlZnQ6ICR7eH07XG4gICAgICAgIHBhZGRpbmctcmlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogcHgsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHB5ID0gKHsgcHkgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwYWRkaW5nLXRvcDogJHt4fTtcbiAgICAgICAgcGFkZGluZy1ib3R0b206ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogcHksXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHB0ID0gKHsgcHQgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwYWRkaW5nLXRvcDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBwdCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgcHIgPSAoeyBwciB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHBhZGRpbmctcmlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogcHIsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHBiID0gKHsgcGIgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwYWRkaW5nLWJvdHRvbTogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBwYixcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgcGwgPSAoeyBwbCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHBhZGRpbmctbGVmdDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBwbCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuZXhwb3J0IGRlZmF1bHQgW20sIG14LCBteSwgbXQsIG1yLCBtYiwgbWwsIHAsIHB4LCBweSwgcHQsIHByLCBwYiwgcGxdO1xuIl19 */");
    },
    val: mb,
    interpolation: "rem"
  });
};
var ml = function ml(_ref7) {
  var ml = _ref7.ml;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("margin-left:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNwYWNlTWl4aW5zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQW9FUyIsImZpbGUiOiJzcGFjZU1peGlucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xuaW1wb3J0IHsgcmVzcG9uc2l2ZVByb3AgfSBmcm9tIFwiLi4vLi4vdXRpbHMvcmVzcG9uc2l2ZVByb3BcIjtcblxuY29uc3QgbSA9ICh7IG0gfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBtYXJnaW46ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbSxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbXggPSAoeyBteCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAke3h9O1xuICAgICAgICBtYXJnaW4tcmlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbXgsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IG15ID0gKHsgbXkgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBtYXJnaW4tdG9wOiAke3h9O1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IG15LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBtdCA9ICh7IG10IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgbWFyZ2luLXRvcDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtdCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbXIgPSAoeyBtciB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1hcmdpbi1yaWdodDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtcixcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbWIgPSAoeyBtYiB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1hcmdpbi1ib3R0b206ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbWIsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IG1sID0gKHsgbWwgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBtYXJnaW4tbGVmdDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtbCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgcCA9ICh7IHAgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwYWRkaW5nOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IHAsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHB4ID0gKHsgcHggfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwYWRkaW5nLWxlZnQ6ICR7eH07XG4gICAgICAgIHBhZGRpbmctcmlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogcHgsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHB5ID0gKHsgcHkgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwYWRkaW5nLXRvcDogJHt4fTtcbiAgICAgICAgcGFkZGluZy1ib3R0b206ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogcHksXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHB0ID0gKHsgcHQgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwYWRkaW5nLXRvcDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBwdCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgcHIgPSAoeyBwciB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHBhZGRpbmctcmlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogcHIsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHBiID0gKHsgcGIgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwYWRkaW5nLWJvdHRvbTogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBwYixcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgcGwgPSAoeyBwbCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHBhZGRpbmctbGVmdDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBwbCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuZXhwb3J0IGRlZmF1bHQgW20sIG14LCBteSwgbXQsIG1yLCBtYiwgbWwsIHAsIHB4LCBweSwgcHQsIHByLCBwYiwgcGxdO1xuIl19 */");
    },
    val: ml,
    interpolation: "rem"
  });
};
var p = function p(_ref8) {
  var p = _ref8.p;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("padding:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNwYWNlTWl4aW5zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQThFUyIsImZpbGUiOiJzcGFjZU1peGlucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xuaW1wb3J0IHsgcmVzcG9uc2l2ZVByb3AgfSBmcm9tIFwiLi4vLi4vdXRpbHMvcmVzcG9uc2l2ZVByb3BcIjtcblxuY29uc3QgbSA9ICh7IG0gfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBtYXJnaW46ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbSxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbXggPSAoeyBteCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAke3h9O1xuICAgICAgICBtYXJnaW4tcmlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbXgsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IG15ID0gKHsgbXkgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBtYXJnaW4tdG9wOiAke3h9O1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IG15LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBtdCA9ICh7IG10IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgbWFyZ2luLXRvcDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtdCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbXIgPSAoeyBtciB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1hcmdpbi1yaWdodDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtcixcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbWIgPSAoeyBtYiB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1hcmdpbi1ib3R0b206ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbWIsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IG1sID0gKHsgbWwgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBtYXJnaW4tbGVmdDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtbCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgcCA9ICh7IHAgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwYWRkaW5nOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IHAsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHB4ID0gKHsgcHggfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwYWRkaW5nLWxlZnQ6ICR7eH07XG4gICAgICAgIHBhZGRpbmctcmlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogcHgsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHB5ID0gKHsgcHkgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwYWRkaW5nLXRvcDogJHt4fTtcbiAgICAgICAgcGFkZGluZy1ib3R0b206ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogcHksXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHB0ID0gKHsgcHQgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwYWRkaW5nLXRvcDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBwdCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgcHIgPSAoeyBwciB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHBhZGRpbmctcmlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogcHIsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHBiID0gKHsgcGIgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwYWRkaW5nLWJvdHRvbTogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBwYixcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgcGwgPSAoeyBwbCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHBhZGRpbmctbGVmdDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBwbCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuZXhwb3J0IGRlZmF1bHQgW20sIG14LCBteSwgbXQsIG1yLCBtYiwgbWwsIHAsIHB4LCBweSwgcHQsIHByLCBwYiwgcGxdO1xuIl19 */");
    },
    val: p,
    interpolation: "rem"
  });
};
var px = function px(_ref9) {
  var px = _ref9.px;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("padding-left:", x, ";padding-right:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNwYWNlTWl4aW5zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXdGUyIsImZpbGUiOiJzcGFjZU1peGlucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xuaW1wb3J0IHsgcmVzcG9uc2l2ZVByb3AgfSBmcm9tIFwiLi4vLi4vdXRpbHMvcmVzcG9uc2l2ZVByb3BcIjtcblxuY29uc3QgbSA9ICh7IG0gfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBtYXJnaW46ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbSxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbXggPSAoeyBteCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAke3h9O1xuICAgICAgICBtYXJnaW4tcmlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbXgsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IG15ID0gKHsgbXkgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBtYXJnaW4tdG9wOiAke3h9O1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IG15LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBtdCA9ICh7IG10IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgbWFyZ2luLXRvcDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtdCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbXIgPSAoeyBtciB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1hcmdpbi1yaWdodDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtcixcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbWIgPSAoeyBtYiB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1hcmdpbi1ib3R0b206ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbWIsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IG1sID0gKHsgbWwgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBtYXJnaW4tbGVmdDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtbCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgcCA9ICh7IHAgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwYWRkaW5nOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IHAsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHB4ID0gKHsgcHggfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwYWRkaW5nLWxlZnQ6ICR7eH07XG4gICAgICAgIHBhZGRpbmctcmlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogcHgsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHB5ID0gKHsgcHkgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwYWRkaW5nLXRvcDogJHt4fTtcbiAgICAgICAgcGFkZGluZy1ib3R0b206ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogcHksXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHB0ID0gKHsgcHQgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwYWRkaW5nLXRvcDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBwdCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgcHIgPSAoeyBwciB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHBhZGRpbmctcmlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogcHIsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHBiID0gKHsgcGIgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwYWRkaW5nLWJvdHRvbTogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBwYixcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgcGwgPSAoeyBwbCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHBhZGRpbmctbGVmdDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBwbCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuZXhwb3J0IGRlZmF1bHQgW20sIG14LCBteSwgbXQsIG1yLCBtYiwgbWwsIHAsIHB4LCBweSwgcHQsIHByLCBwYiwgcGxdO1xuIl19 */");
    },
    val: px,
    interpolation: "rem"
  });
};
var py = function py(_ref10) {
  var py = _ref10.py;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("padding-top:", x, ";padding-bottom:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNwYWNlTWl4aW5zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQW1HUyIsImZpbGUiOiJzcGFjZU1peGlucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xuaW1wb3J0IHsgcmVzcG9uc2l2ZVByb3AgfSBmcm9tIFwiLi4vLi4vdXRpbHMvcmVzcG9uc2l2ZVByb3BcIjtcblxuY29uc3QgbSA9ICh7IG0gfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBtYXJnaW46ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbSxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbXggPSAoeyBteCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAke3h9O1xuICAgICAgICBtYXJnaW4tcmlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbXgsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IG15ID0gKHsgbXkgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBtYXJnaW4tdG9wOiAke3h9O1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IG15LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBtdCA9ICh7IG10IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgbWFyZ2luLXRvcDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtdCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbXIgPSAoeyBtciB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1hcmdpbi1yaWdodDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtcixcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbWIgPSAoeyBtYiB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1hcmdpbi1ib3R0b206ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbWIsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IG1sID0gKHsgbWwgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBtYXJnaW4tbGVmdDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtbCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgcCA9ICh7IHAgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwYWRkaW5nOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IHAsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHB4ID0gKHsgcHggfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwYWRkaW5nLWxlZnQ6ICR7eH07XG4gICAgICAgIHBhZGRpbmctcmlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogcHgsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHB5ID0gKHsgcHkgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwYWRkaW5nLXRvcDogJHt4fTtcbiAgICAgICAgcGFkZGluZy1ib3R0b206ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogcHksXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHB0ID0gKHsgcHQgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwYWRkaW5nLXRvcDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBwdCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgcHIgPSAoeyBwciB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHBhZGRpbmctcmlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogcHIsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHBiID0gKHsgcGIgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwYWRkaW5nLWJvdHRvbTogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBwYixcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgcGwgPSAoeyBwbCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHBhZGRpbmctbGVmdDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBwbCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuZXhwb3J0IGRlZmF1bHQgW20sIG14LCBteSwgbXQsIG1yLCBtYiwgbWwsIHAsIHB4LCBweSwgcHQsIHByLCBwYiwgcGxdO1xuIl19 */");
    },
    val: py,
    interpolation: "rem"
  });
};
var pt = function pt(_ref11) {
  var pt = _ref11.pt;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("padding-top:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNwYWNlTWl4aW5zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQThHUyIsImZpbGUiOiJzcGFjZU1peGlucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xuaW1wb3J0IHsgcmVzcG9uc2l2ZVByb3AgfSBmcm9tIFwiLi4vLi4vdXRpbHMvcmVzcG9uc2l2ZVByb3BcIjtcblxuY29uc3QgbSA9ICh7IG0gfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBtYXJnaW46ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbSxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbXggPSAoeyBteCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAke3h9O1xuICAgICAgICBtYXJnaW4tcmlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbXgsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IG15ID0gKHsgbXkgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBtYXJnaW4tdG9wOiAke3h9O1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IG15LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBtdCA9ICh7IG10IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgbWFyZ2luLXRvcDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtdCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbXIgPSAoeyBtciB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1hcmdpbi1yaWdodDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtcixcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbWIgPSAoeyBtYiB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1hcmdpbi1ib3R0b206ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbWIsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IG1sID0gKHsgbWwgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBtYXJnaW4tbGVmdDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtbCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgcCA9ICh7IHAgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwYWRkaW5nOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IHAsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHB4ID0gKHsgcHggfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwYWRkaW5nLWxlZnQ6ICR7eH07XG4gICAgICAgIHBhZGRpbmctcmlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogcHgsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHB5ID0gKHsgcHkgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwYWRkaW5nLXRvcDogJHt4fTtcbiAgICAgICAgcGFkZGluZy1ib3R0b206ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogcHksXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHB0ID0gKHsgcHQgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwYWRkaW5nLXRvcDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBwdCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgcHIgPSAoeyBwciB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHBhZGRpbmctcmlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogcHIsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHBiID0gKHsgcGIgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwYWRkaW5nLWJvdHRvbTogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBwYixcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgcGwgPSAoeyBwbCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHBhZGRpbmctbGVmdDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBwbCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuZXhwb3J0IGRlZmF1bHQgW20sIG14LCBteSwgbXQsIG1yLCBtYiwgbWwsIHAsIHB4LCBweSwgcHQsIHByLCBwYiwgcGxdO1xuIl19 */");
    },
    val: pt,
    interpolation: "rem"
  });
};
var pr = function pr(_ref12) {
  var pr = _ref12.pr;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("padding-right:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNwYWNlTWl4aW5zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXdIUyIsImZpbGUiOiJzcGFjZU1peGlucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xuaW1wb3J0IHsgcmVzcG9uc2l2ZVByb3AgfSBmcm9tIFwiLi4vLi4vdXRpbHMvcmVzcG9uc2l2ZVByb3BcIjtcblxuY29uc3QgbSA9ICh7IG0gfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBtYXJnaW46ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbSxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbXggPSAoeyBteCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAke3h9O1xuICAgICAgICBtYXJnaW4tcmlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbXgsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IG15ID0gKHsgbXkgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBtYXJnaW4tdG9wOiAke3h9O1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IG15LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBtdCA9ICh7IG10IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgbWFyZ2luLXRvcDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtdCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbXIgPSAoeyBtciB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1hcmdpbi1yaWdodDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtcixcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbWIgPSAoeyBtYiB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1hcmdpbi1ib3R0b206ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbWIsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IG1sID0gKHsgbWwgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBtYXJnaW4tbGVmdDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtbCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgcCA9ICh7IHAgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwYWRkaW5nOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IHAsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHB4ID0gKHsgcHggfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwYWRkaW5nLWxlZnQ6ICR7eH07XG4gICAgICAgIHBhZGRpbmctcmlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogcHgsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHB5ID0gKHsgcHkgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwYWRkaW5nLXRvcDogJHt4fTtcbiAgICAgICAgcGFkZGluZy1ib3R0b206ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogcHksXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHB0ID0gKHsgcHQgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwYWRkaW5nLXRvcDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBwdCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgcHIgPSAoeyBwciB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHBhZGRpbmctcmlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogcHIsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHBiID0gKHsgcGIgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwYWRkaW5nLWJvdHRvbTogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBwYixcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgcGwgPSAoeyBwbCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHBhZGRpbmctbGVmdDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBwbCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuZXhwb3J0IGRlZmF1bHQgW20sIG14LCBteSwgbXQsIG1yLCBtYiwgbWwsIHAsIHB4LCBweSwgcHQsIHByLCBwYiwgcGxdO1xuIl19 */");
    },
    val: pr,
    interpolation: "rem"
  });
};
var pb = function pb(_ref13) {
  var pb = _ref13.pb;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("padding-bottom:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNwYWNlTWl4aW5zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWtJUyIsImZpbGUiOiJzcGFjZU1peGlucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xuaW1wb3J0IHsgcmVzcG9uc2l2ZVByb3AgfSBmcm9tIFwiLi4vLi4vdXRpbHMvcmVzcG9uc2l2ZVByb3BcIjtcblxuY29uc3QgbSA9ICh7IG0gfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBtYXJnaW46ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbSxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbXggPSAoeyBteCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAke3h9O1xuICAgICAgICBtYXJnaW4tcmlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbXgsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IG15ID0gKHsgbXkgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBtYXJnaW4tdG9wOiAke3h9O1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IG15LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBtdCA9ICh7IG10IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgbWFyZ2luLXRvcDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtdCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbXIgPSAoeyBtciB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1hcmdpbi1yaWdodDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtcixcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbWIgPSAoeyBtYiB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1hcmdpbi1ib3R0b206ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbWIsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IG1sID0gKHsgbWwgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBtYXJnaW4tbGVmdDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtbCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgcCA9ICh7IHAgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwYWRkaW5nOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IHAsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHB4ID0gKHsgcHggfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwYWRkaW5nLWxlZnQ6ICR7eH07XG4gICAgICAgIHBhZGRpbmctcmlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogcHgsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHB5ID0gKHsgcHkgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwYWRkaW5nLXRvcDogJHt4fTtcbiAgICAgICAgcGFkZGluZy1ib3R0b206ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogcHksXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHB0ID0gKHsgcHQgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwYWRkaW5nLXRvcDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBwdCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgcHIgPSAoeyBwciB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHBhZGRpbmctcmlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogcHIsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHBiID0gKHsgcGIgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwYWRkaW5nLWJvdHRvbTogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBwYixcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgcGwgPSAoeyBwbCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHBhZGRpbmctbGVmdDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBwbCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuZXhwb3J0IGRlZmF1bHQgW20sIG14LCBteSwgbXQsIG1yLCBtYiwgbWwsIHAsIHB4LCBweSwgcHQsIHByLCBwYiwgcGxdO1xuIl19 */");
    },
    val: pb,
    interpolation: "rem"
  });
};
var pl = function pl(_ref14) {
  var pl = _ref14.pl;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("padding-left:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNwYWNlTWl4aW5zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTRJUyIsImZpbGUiOiJzcGFjZU1peGlucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xuaW1wb3J0IHsgcmVzcG9uc2l2ZVByb3AgfSBmcm9tIFwiLi4vLi4vdXRpbHMvcmVzcG9uc2l2ZVByb3BcIjtcblxuY29uc3QgbSA9ICh7IG0gfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBtYXJnaW46ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbSxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbXggPSAoeyBteCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAke3h9O1xuICAgICAgICBtYXJnaW4tcmlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbXgsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IG15ID0gKHsgbXkgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBtYXJnaW4tdG9wOiAke3h9O1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IG15LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBtdCA9ICh7IG10IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgbWFyZ2luLXRvcDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtdCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbXIgPSAoeyBtciB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1hcmdpbi1yaWdodDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtcixcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbWIgPSAoeyBtYiB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1hcmdpbi1ib3R0b206ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbWIsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IG1sID0gKHsgbWwgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBtYXJnaW4tbGVmdDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtbCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgcCA9ICh7IHAgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwYWRkaW5nOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IHAsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHB4ID0gKHsgcHggfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwYWRkaW5nLWxlZnQ6ICR7eH07XG4gICAgICAgIHBhZGRpbmctcmlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogcHgsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHB5ID0gKHsgcHkgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwYWRkaW5nLXRvcDogJHt4fTtcbiAgICAgICAgcGFkZGluZy1ib3R0b206ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogcHksXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHB0ID0gKHsgcHQgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwYWRkaW5nLXRvcDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBwdCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgcHIgPSAoeyBwciB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHBhZGRpbmctcmlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogcHIsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHBiID0gKHsgcGIgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwYWRkaW5nLWJvdHRvbTogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBwYixcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgcGwgPSAoeyBwbCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHBhZGRpbmctbGVmdDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBwbCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuZXhwb3J0IGRlZmF1bHQgW20sIG14LCBteSwgbXQsIG1yLCBtYiwgbWwsIHAsIHB4LCBweSwgcHQsIHByLCBwYiwgcGxdO1xuIl19 */");
    },
    val: pl,
    interpolation: "rem"
  });
};
var spaceMixins = [m, mx, my, mt, mr, mb, ml, p, px, py, pt, pr, pb, pl];

var width = function width(_ref) {
  var width = _ref.width;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("width:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNpemVNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBTVMiLCJmaWxlIjoic2l6ZU1peGlucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xuaW1wb3J0IHsgcmVzcG9uc2l2ZVByb3AgfSBmcm9tIFwiLi4vLi4vdXRpbHMvcmVzcG9uc2l2ZVByb3BcIjtcblxuY29uc3Qgd2lkdGggPSAoeyB3aWR0aCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHdpZHRoOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IHdpZHRoLFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBtYXhXaWR0aCA9ICh7IG1heFdpZHRoIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgbWF4LXdpZHRoOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IG1heFdpZHRoLFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBtaW5XaWR0aCA9ICh7IG1pbldpZHRoIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgbWluLXdpZHRoOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IG1pbldpZHRoLFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBoZWlnaHQgPSAoeyBoZWlnaHQgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBoZWlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogaGVpZ2h0LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBtYXhIZWlnaHQgPSAoeyBtYXhIZWlnaHQgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBtYXgtaGVpZ2h0OiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IG1heEhlaWdodCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbWluSGVpZ2h0ID0gKHsgbWluSGVpZ2h0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgbWluLWhlaWdodDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtaW5IZWlnaHQsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IGFzcGVjdFJhdGlvID0gKHsgYXNwZWN0UmF0aW8gfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBhc3BlY3QtcmF0aW86ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogYXNwZWN0UmF0aW8sXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmV4cG9ydCBkZWZhdWx0IFtcbiAgd2lkdGgsXG4gIG1heFdpZHRoLFxuICBtaW5XaWR0aCxcbiAgaGVpZ2h0LFxuICBtYXhIZWlnaHQsXG4gIG1pbkhlaWdodCxcbiAgYXNwZWN0UmF0aW8sXG5dO1xuIl19 */");
    },
    val: width,
    interpolation: "rem"
  });
};
var maxWidth = function maxWidth(_ref2) {
  var maxWidth = _ref2.maxWidth;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("max-width:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNpemVNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBZ0JTIiwiZmlsZSI6InNpemVNaXhpbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IHJlc3BvbnNpdmVQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Jlc3BvbnNpdmVQcm9wXCI7XG5cbmNvbnN0IHdpZHRoID0gKHsgd2lkdGggfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICB3aWR0aDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiB3aWR0aCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbWF4V2lkdGggPSAoeyBtYXhXaWR0aCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1heC13aWR0aDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtYXhXaWR0aCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbWluV2lkdGggPSAoeyBtaW5XaWR0aCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1pbi13aWR0aDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtaW5XaWR0aCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgaGVpZ2h0ID0gKHsgaGVpZ2h0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgaGVpZ2h0OiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IGhlaWdodCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbWF4SGVpZ2h0ID0gKHsgbWF4SGVpZ2h0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgbWF4LWhlaWdodDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtYXhIZWlnaHQsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IG1pbkhlaWdodCA9ICh7IG1pbkhlaWdodCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1pbi1oZWlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbWluSGVpZ2h0LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBhc3BlY3RSYXRpbyA9ICh7IGFzcGVjdFJhdGlvIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgYXNwZWN0LXJhdGlvOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IGFzcGVjdFJhdGlvLFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5leHBvcnQgZGVmYXVsdCBbXG4gIHdpZHRoLFxuICBtYXhXaWR0aCxcbiAgbWluV2lkdGgsXG4gIGhlaWdodCxcbiAgbWF4SGVpZ2h0LFxuICBtaW5IZWlnaHQsXG4gIGFzcGVjdFJhdGlvLFxuXTtcbiJdfQ== */");
    },
    val: maxWidth,
    interpolation: "rem"
  });
};
var minWidth = function minWidth(_ref3) {
  var minWidth = _ref3.minWidth;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("min-width:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNpemVNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBMEJTIiwiZmlsZSI6InNpemVNaXhpbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IHJlc3BvbnNpdmVQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Jlc3BvbnNpdmVQcm9wXCI7XG5cbmNvbnN0IHdpZHRoID0gKHsgd2lkdGggfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICB3aWR0aDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiB3aWR0aCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbWF4V2lkdGggPSAoeyBtYXhXaWR0aCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1heC13aWR0aDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtYXhXaWR0aCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbWluV2lkdGggPSAoeyBtaW5XaWR0aCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1pbi13aWR0aDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtaW5XaWR0aCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgaGVpZ2h0ID0gKHsgaGVpZ2h0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgaGVpZ2h0OiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IGhlaWdodCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbWF4SGVpZ2h0ID0gKHsgbWF4SGVpZ2h0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgbWF4LWhlaWdodDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtYXhIZWlnaHQsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IG1pbkhlaWdodCA9ICh7IG1pbkhlaWdodCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1pbi1oZWlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbWluSGVpZ2h0LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBhc3BlY3RSYXRpbyA9ICh7IGFzcGVjdFJhdGlvIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgYXNwZWN0LXJhdGlvOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IGFzcGVjdFJhdGlvLFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5leHBvcnQgZGVmYXVsdCBbXG4gIHdpZHRoLFxuICBtYXhXaWR0aCxcbiAgbWluV2lkdGgsXG4gIGhlaWdodCxcbiAgbWF4SGVpZ2h0LFxuICBtaW5IZWlnaHQsXG4gIGFzcGVjdFJhdGlvLFxuXTtcbiJdfQ== */");
    },
    val: minWidth,
    interpolation: "rem"
  });
};
var height = function height(_ref4) {
  var height = _ref4.height;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("height:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNpemVNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBb0NTIiwiZmlsZSI6InNpemVNaXhpbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IHJlc3BvbnNpdmVQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Jlc3BvbnNpdmVQcm9wXCI7XG5cbmNvbnN0IHdpZHRoID0gKHsgd2lkdGggfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICB3aWR0aDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiB3aWR0aCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbWF4V2lkdGggPSAoeyBtYXhXaWR0aCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1heC13aWR0aDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtYXhXaWR0aCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbWluV2lkdGggPSAoeyBtaW5XaWR0aCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1pbi13aWR0aDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtaW5XaWR0aCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgaGVpZ2h0ID0gKHsgaGVpZ2h0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgaGVpZ2h0OiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IGhlaWdodCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbWF4SGVpZ2h0ID0gKHsgbWF4SGVpZ2h0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgbWF4LWhlaWdodDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtYXhIZWlnaHQsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IG1pbkhlaWdodCA9ICh7IG1pbkhlaWdodCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1pbi1oZWlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbWluSGVpZ2h0LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBhc3BlY3RSYXRpbyA9ICh7IGFzcGVjdFJhdGlvIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgYXNwZWN0LXJhdGlvOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IGFzcGVjdFJhdGlvLFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5leHBvcnQgZGVmYXVsdCBbXG4gIHdpZHRoLFxuICBtYXhXaWR0aCxcbiAgbWluV2lkdGgsXG4gIGhlaWdodCxcbiAgbWF4SGVpZ2h0LFxuICBtaW5IZWlnaHQsXG4gIGFzcGVjdFJhdGlvLFxuXTtcbiJdfQ== */");
    },
    val: height,
    interpolation: "rem"
  });
};
var maxHeight = function maxHeight(_ref5) {
  var maxHeight = _ref5.maxHeight;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("max-height:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNpemVNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBOENTIiwiZmlsZSI6InNpemVNaXhpbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IHJlc3BvbnNpdmVQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Jlc3BvbnNpdmVQcm9wXCI7XG5cbmNvbnN0IHdpZHRoID0gKHsgd2lkdGggfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICB3aWR0aDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiB3aWR0aCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbWF4V2lkdGggPSAoeyBtYXhXaWR0aCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1heC13aWR0aDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtYXhXaWR0aCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbWluV2lkdGggPSAoeyBtaW5XaWR0aCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1pbi13aWR0aDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtaW5XaWR0aCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgaGVpZ2h0ID0gKHsgaGVpZ2h0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgaGVpZ2h0OiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IGhlaWdodCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbWF4SGVpZ2h0ID0gKHsgbWF4SGVpZ2h0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgbWF4LWhlaWdodDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtYXhIZWlnaHQsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IG1pbkhlaWdodCA9ICh7IG1pbkhlaWdodCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1pbi1oZWlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbWluSGVpZ2h0LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBhc3BlY3RSYXRpbyA9ICh7IGFzcGVjdFJhdGlvIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgYXNwZWN0LXJhdGlvOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IGFzcGVjdFJhdGlvLFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5leHBvcnQgZGVmYXVsdCBbXG4gIHdpZHRoLFxuICBtYXhXaWR0aCxcbiAgbWluV2lkdGgsXG4gIGhlaWdodCxcbiAgbWF4SGVpZ2h0LFxuICBtaW5IZWlnaHQsXG4gIGFzcGVjdFJhdGlvLFxuXTtcbiJdfQ== */");
    },
    val: maxHeight,
    interpolation: "rem"
  });
};
var minHeight = function minHeight(_ref6) {
  var minHeight = _ref6.minHeight;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("min-height:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNpemVNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBd0RTIiwiZmlsZSI6InNpemVNaXhpbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IHJlc3BvbnNpdmVQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Jlc3BvbnNpdmVQcm9wXCI7XG5cbmNvbnN0IHdpZHRoID0gKHsgd2lkdGggfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICB3aWR0aDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiB3aWR0aCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbWF4V2lkdGggPSAoeyBtYXhXaWR0aCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1heC13aWR0aDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtYXhXaWR0aCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbWluV2lkdGggPSAoeyBtaW5XaWR0aCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1pbi13aWR0aDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtaW5XaWR0aCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgaGVpZ2h0ID0gKHsgaGVpZ2h0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgaGVpZ2h0OiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IGhlaWdodCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbWF4SGVpZ2h0ID0gKHsgbWF4SGVpZ2h0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgbWF4LWhlaWdodDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtYXhIZWlnaHQsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IG1pbkhlaWdodCA9ICh7IG1pbkhlaWdodCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1pbi1oZWlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbWluSGVpZ2h0LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBhc3BlY3RSYXRpbyA9ICh7IGFzcGVjdFJhdGlvIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgYXNwZWN0LXJhdGlvOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IGFzcGVjdFJhdGlvLFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5leHBvcnQgZGVmYXVsdCBbXG4gIHdpZHRoLFxuICBtYXhXaWR0aCxcbiAgbWluV2lkdGgsXG4gIGhlaWdodCxcbiAgbWF4SGVpZ2h0LFxuICBtaW5IZWlnaHQsXG4gIGFzcGVjdFJhdGlvLFxuXTtcbiJdfQ== */");
    },
    val: minHeight,
    interpolation: "rem"
  });
};
var aspectRatio = function aspectRatio(_ref7) {
  var aspectRatio = _ref7.aspectRatio;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("aspect-ratio:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNpemVNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBa0VTIiwiZmlsZSI6InNpemVNaXhpbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IHJlc3BvbnNpdmVQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Jlc3BvbnNpdmVQcm9wXCI7XG5cbmNvbnN0IHdpZHRoID0gKHsgd2lkdGggfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICB3aWR0aDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiB3aWR0aCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbWF4V2lkdGggPSAoeyBtYXhXaWR0aCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1heC13aWR0aDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtYXhXaWR0aCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbWluV2lkdGggPSAoeyBtaW5XaWR0aCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1pbi13aWR0aDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtaW5XaWR0aCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgaGVpZ2h0ID0gKHsgaGVpZ2h0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgaGVpZ2h0OiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IGhlaWdodCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbWF4SGVpZ2h0ID0gKHsgbWF4SGVpZ2h0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgbWF4LWhlaWdodDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtYXhIZWlnaHQsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IG1pbkhlaWdodCA9ICh7IG1pbkhlaWdodCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1pbi1oZWlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbWluSGVpZ2h0LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBhc3BlY3RSYXRpbyA9ICh7IGFzcGVjdFJhdGlvIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgYXNwZWN0LXJhdGlvOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IGFzcGVjdFJhdGlvLFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5leHBvcnQgZGVmYXVsdCBbXG4gIHdpZHRoLFxuICBtYXhXaWR0aCxcbiAgbWluV2lkdGgsXG4gIGhlaWdodCxcbiAgbWF4SGVpZ2h0LFxuICBtaW5IZWlnaHQsXG4gIGFzcGVjdFJhdGlvLFxuXTtcbiJdfQ== */");
    },
    val: aspectRatio,
    interpolation: "rem"
  });
};
var sizeMixins = [width, maxWidth, minWidth, height, maxHeight, minHeight, aspectRatio];

var background = function background(_ref) {
  var background = _ref.background,
    theme = _ref.theme;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("background:", isValidColor(x) ? x : findValueInObject(x, theme), ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJhY2tncm91bmRDb2xvck1peGlucy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFRUyIsImZpbGUiOiJiYWNrZ3JvdW5kQ29sb3JNaXhpbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IHJlc3BvbnNpdmVQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Jlc3BvbnNpdmVQcm9wXCI7XG5pbXBvcnQgeyBpc1ZhbGlkQ29sb3IgfSBmcm9tIFwiLi4vLi4vdXRpbHMvaXNWYWxpZENvbG9yXCI7XG5pbXBvcnQgeyBmaW5kVmFsdWVJbk9iamVjdCB9IGZyb20gXCIuLi8uLi91dGlscy9maW5kVmFsdWVJbk9iamVjdFwiO1xuXG5jb25zdCBiYWNrZ3JvdW5kID0gKHsgYmFja2dyb3VuZCwgdGhlbWUgfSkgPT4ge1xuICByZXR1cm4gcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBiYWNrZ3JvdW5kOiAke2lzVmFsaWRDb2xvcih4KSA/IHggOiBmaW5kVmFsdWVJbk9iamVjdCh4LCB0aGVtZSl9O1xuICAgICAgYCxcbiAgICB2YWw6IGJhY2tncm91bmQsXG4gIH0pO1xufTtcbmNvbnN0IGJhY2tncm91bmRDb2xvciA9ICh7IGJhY2tncm91bmRDb2xvciwgdGhlbWUgfSkgPT4ge1xuICByZXR1cm4gcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke2lzVmFsaWRDb2xvcih4KSA/IHggOiBmaW5kVmFsdWVJbk9iamVjdCh4LCB0aGVtZSl9O1xuICAgICAgYCxcbiAgICB2YWw6IGJhY2tncm91bmRDb2xvcixcbiAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBbYmFja2dyb3VuZENvbG9yLCBiYWNrZ3JvdW5kXTtcbiJdfQ== */");
    },
    val: background
  });
};
var backgroundColor = function backgroundColor(_ref2) {
  var backgroundColor = _ref2.backgroundColor,
    theme = _ref2.theme;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("background-color:", isValidColor(x) ? x : findValueInObject(x, theme), ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJhY2tncm91bmRDb2xvck1peGlucy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFpQlMiLCJmaWxlIjoiYmFja2dyb3VuZENvbG9yTWl4aW5zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3NzIH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XG5pbXBvcnQgeyByZXNwb25zaXZlUHJvcCB9IGZyb20gXCIuLi8uLi91dGlscy9yZXNwb25zaXZlUHJvcFwiO1xuaW1wb3J0IHsgaXNWYWxpZENvbG9yIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2lzVmFsaWRDb2xvclwiO1xuaW1wb3J0IHsgZmluZFZhbHVlSW5PYmplY3QgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZmluZFZhbHVlSW5PYmplY3RcIjtcblxuY29uc3QgYmFja2dyb3VuZCA9ICh7IGJhY2tncm91bmQsIHRoZW1lIH0pID0+IHtcbiAgcmV0dXJuIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgYmFja2dyb3VuZDogJHtpc1ZhbGlkQ29sb3IoeCkgPyB4IDogZmluZFZhbHVlSW5PYmplY3QoeCwgdGhlbWUpfTtcbiAgICAgIGAsXG4gICAgdmFsOiBiYWNrZ3JvdW5kLFxuICB9KTtcbn07XG5jb25zdCBiYWNrZ3JvdW5kQ29sb3IgPSAoeyBiYWNrZ3JvdW5kQ29sb3IsIHRoZW1lIH0pID0+IHtcbiAgcmV0dXJuIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHtpc1ZhbGlkQ29sb3IoeCkgPyB4IDogZmluZFZhbHVlSW5PYmplY3QoeCwgdGhlbWUpfTtcbiAgICAgIGAsXG4gICAgdmFsOiBiYWNrZ3JvdW5kQ29sb3IsXG4gIH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgW2JhY2tncm91bmRDb2xvciwgYmFja2dyb3VuZF07XG4iXX0= */");
    },
    val: backgroundColor
  });
};
var backgroundColorMixins = [backgroundColor, background];

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
var sectionSpecialProps$1 = function sectionSpecialProps(_ref2) {
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
})("margin:0 auto;", genericProps, " ", sectionSpecialProps$1, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNlY3Rpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBcUV3QiIsImZpbGUiOiJTZWN0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHN0eWxlZCBmcm9tIFwiQGVtb3Rpb24vc3R5bGVkXCI7XG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG4vLyBpbXBvcnQgeyB1c2VSZXNwb25zaXZlIH0gZnJvbSBcIi4uLy4uL2hvb2tzL3VzZVJlc3BvbnNpdmUvdXNlUmVzcG9uc2l2ZVwiO1xuaW1wb3J0IHsgVGhlbWVDb250ZXh0LCBjc3MsIHVzZVRoZW1lIH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XG4vLyBpbXBvcnQgeyBhcnJheWlmeVByb3AgfSBmcm9tIFwiLi4vLi4vdXRpbHMvYXJyYXlpZnlQcm9wXCI7XG5pbXBvcnQgZGV2TWl4aW5zIGZyb20gXCIuLi8uLi9taXhpbnMvcmVzcG9uc2l2ZVByb3BzL2Rldk1peGluc1wiO1xuaW1wb3J0IHNwYWNlTWl4aW5zIGZyb20gXCIuLi8uLi9taXhpbnMvcmVzcG9uc2l2ZVByb3BzL3NwYWNlTWl4aW5zXCI7XG5pbXBvcnQgc2l6ZU1peGlucyBmcm9tIFwiLi4vLi4vbWl4aW5zL3Jlc3BvbnNpdmVQcm9wcy9zaXplTWl4aW5zXCI7XG5pbXBvcnQgYmFja2dyb3VuZENvbG9yTWl4aW5zIGZyb20gXCIuLi8uLi9taXhpbnMvcmVzcG9uc2l2ZVByb3BzL2JhY2tncm91bmRDb2xvck1peGluc1wiO1xuaW1wb3J0IHsgaW50ZXJwb2xhdGVkUHJvcCwgcmVzcG9uc2l2ZVByb3AgfSBmcm9tIFwiLi4vLi4vdXRpbHMvcmVzcG9uc2l2ZVByb3BcIjtcbmltcG9ydCBnZW5lcmljUHJvcHMgZnJvbSBcIi4uLy4uL3Byb3BzL2dlbmVyaWNQcm9wc1wiO1xuaW1wb3J0IHsgYXJyYXlQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2FycmF5UHJvcFwiO1xuXG5jb25zdCBTZWN0aW9uID0gUmVhY3QuZm9yd2FyZFJlZihcbiAgKFxuICAgIHtcbiAgICAgIG1heFdpZHRoLFxuICAgICAgcHgsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3IsXG4gICAgICBiYWNrZ3JvdW5kLFxuICAgICAgY2hpbGRyZW4sXG4gICAgICBhcyxcbiAgICAgIGlkLFxuICAgICAgY2xhc3NOYW1lLFxuICAgICAgLi4ucmVzdFByb3BzXG4gICAgfSxcbiAgICByZWZcbiAgKSA9PiB7XG4gICAgY29uc3QgdGhlbWUgPSB1c2VUaGVtZShUaGVtZUNvbnRleHQpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxPdXRlclxuICAgICAgICBpZD17aWR9XG4gICAgICAgIGJhY2tncm91bmRDb2xvcj17YmFja2dyb3VuZENvbG9yIHx8IHRoZW1lPy5wYWxldHRlPy5iYWNrZ3JvdW5kfVxuICAgICAgICBiYWNrZ3JvdW5kPXtiYWNrZ3JvdW5kfVxuICAgICAgICBhcz17YXN9XG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuICAgICAgPlxuICAgICAgICA8SW5uZXJcbiAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICBtYXhXaWR0aD17aW50ZXJwb2xhdGVkUHJvcChcbiAgICAgICAgICAgIG1heFdpZHRoIHx8IHRoZW1lPy5zZWN0aW9uPy5tYXhXaWR0aCxcbiAgICAgICAgICAgIFwicmVtXCJcbiAgICAgICAgICApfVxuICAgICAgICAgIHB4PXtweCB8fCB0aGVtZT8uc2VjdGlvbj8ucHh9XG4gICAgICAgICAgey4uLnJlc3RQcm9wc31cbiAgICAgICAgPlxuICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgPC9Jbm5lcj5cbiAgICAgIDwvT3V0ZXI+XG4gICAgKTtcbiAgfVxuKTtcblxuZXhwb3J0IGRlZmF1bHQgU2VjdGlvbjtcblxuY29uc3Qgc2VjdGlvblNwZWNpYWxQcm9wcyA9ICh7IHRoZW1lLCBweDogdmFsdWUsIG1heFdpZHRoIH0pID0+XG4gIGFycmF5UHJvcCh7XG4gICAgdGhlbWUsXG4gICAgdmFsdWUsXG4gICAgZnVuYzogKHgpID0+XG4gICAgICBgXG4gICAgICAgIG1heC13aWR0aDogY2FsYygke21heFdpZHRofSArICR7eH0gKyAke3h9KTtcbiAgICAgICAgcGFkZGluZy1sZWZ0OiAke3h9O1xuICAgICAgICBwYWRkaW5nLXJpZ2h0OiAke3h9O1xuICAgICAgYCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgSW5uZXIgPSBzdHlsZWQuZGl2YFxuICBtYXJnaW46IDAgYXV0bztcbiAgJHtnZW5lcmljUHJvcHN9XG4gICR7c2VjdGlvblNwZWNpYWxQcm9wc31cbmA7XG5cbmNvbnN0IE91dGVyID0gc3R5bGVkLnNlY3Rpb25gXG4gICR7Z2VuZXJpY1Byb3BzfVxuYDtcbiJdfQ== */"));
var Outer$1 = /*#__PURE__*/_styled("section", process.env.NODE_ENV === "production" ? {
  target: "ebf42ix0"
} : {
  target: "ebf42ix0",
  label: "Outer"
})(genericProps, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNlY3Rpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBMkU0QiIsImZpbGUiOiJTZWN0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHN0eWxlZCBmcm9tIFwiQGVtb3Rpb24vc3R5bGVkXCI7XG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG4vLyBpbXBvcnQgeyB1c2VSZXNwb25zaXZlIH0gZnJvbSBcIi4uLy4uL2hvb2tzL3VzZVJlc3BvbnNpdmUvdXNlUmVzcG9uc2l2ZVwiO1xuaW1wb3J0IHsgVGhlbWVDb250ZXh0LCBjc3MsIHVzZVRoZW1lIH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XG4vLyBpbXBvcnQgeyBhcnJheWlmeVByb3AgfSBmcm9tIFwiLi4vLi4vdXRpbHMvYXJyYXlpZnlQcm9wXCI7XG5pbXBvcnQgZGV2TWl4aW5zIGZyb20gXCIuLi8uLi9taXhpbnMvcmVzcG9uc2l2ZVByb3BzL2Rldk1peGluc1wiO1xuaW1wb3J0IHNwYWNlTWl4aW5zIGZyb20gXCIuLi8uLi9taXhpbnMvcmVzcG9uc2l2ZVByb3BzL3NwYWNlTWl4aW5zXCI7XG5pbXBvcnQgc2l6ZU1peGlucyBmcm9tIFwiLi4vLi4vbWl4aW5zL3Jlc3BvbnNpdmVQcm9wcy9zaXplTWl4aW5zXCI7XG5pbXBvcnQgYmFja2dyb3VuZENvbG9yTWl4aW5zIGZyb20gXCIuLi8uLi9taXhpbnMvcmVzcG9uc2l2ZVByb3BzL2JhY2tncm91bmRDb2xvck1peGluc1wiO1xuaW1wb3J0IHsgaW50ZXJwb2xhdGVkUHJvcCwgcmVzcG9uc2l2ZVByb3AgfSBmcm9tIFwiLi4vLi4vdXRpbHMvcmVzcG9uc2l2ZVByb3BcIjtcbmltcG9ydCBnZW5lcmljUHJvcHMgZnJvbSBcIi4uLy4uL3Byb3BzL2dlbmVyaWNQcm9wc1wiO1xuaW1wb3J0IHsgYXJyYXlQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2FycmF5UHJvcFwiO1xuXG5jb25zdCBTZWN0aW9uID0gUmVhY3QuZm9yd2FyZFJlZihcbiAgKFxuICAgIHtcbiAgICAgIG1heFdpZHRoLFxuICAgICAgcHgsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3IsXG4gICAgICBiYWNrZ3JvdW5kLFxuICAgICAgY2hpbGRyZW4sXG4gICAgICBhcyxcbiAgICAgIGlkLFxuICAgICAgY2xhc3NOYW1lLFxuICAgICAgLi4ucmVzdFByb3BzXG4gICAgfSxcbiAgICByZWZcbiAgKSA9PiB7XG4gICAgY29uc3QgdGhlbWUgPSB1c2VUaGVtZShUaGVtZUNvbnRleHQpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxPdXRlclxuICAgICAgICBpZD17aWR9XG4gICAgICAgIGJhY2tncm91bmRDb2xvcj17YmFja2dyb3VuZENvbG9yIHx8IHRoZW1lPy5wYWxldHRlPy5iYWNrZ3JvdW5kfVxuICAgICAgICBiYWNrZ3JvdW5kPXtiYWNrZ3JvdW5kfVxuICAgICAgICBhcz17YXN9XG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuICAgICAgPlxuICAgICAgICA8SW5uZXJcbiAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICBtYXhXaWR0aD17aW50ZXJwb2xhdGVkUHJvcChcbiAgICAgICAgICAgIG1heFdpZHRoIHx8IHRoZW1lPy5zZWN0aW9uPy5tYXhXaWR0aCxcbiAgICAgICAgICAgIFwicmVtXCJcbiAgICAgICAgICApfVxuICAgICAgICAgIHB4PXtweCB8fCB0aGVtZT8uc2VjdGlvbj8ucHh9XG4gICAgICAgICAgey4uLnJlc3RQcm9wc31cbiAgICAgICAgPlxuICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgPC9Jbm5lcj5cbiAgICAgIDwvT3V0ZXI+XG4gICAgKTtcbiAgfVxuKTtcblxuZXhwb3J0IGRlZmF1bHQgU2VjdGlvbjtcblxuY29uc3Qgc2VjdGlvblNwZWNpYWxQcm9wcyA9ICh7IHRoZW1lLCBweDogdmFsdWUsIG1heFdpZHRoIH0pID0+XG4gIGFycmF5UHJvcCh7XG4gICAgdGhlbWUsXG4gICAgdmFsdWUsXG4gICAgZnVuYzogKHgpID0+XG4gICAgICBgXG4gICAgICAgIG1heC13aWR0aDogY2FsYygke21heFdpZHRofSArICR7eH0gKyAke3h9KTtcbiAgICAgICAgcGFkZGluZy1sZWZ0OiAke3h9O1xuICAgICAgICBwYWRkaW5nLXJpZ2h0OiAke3h9O1xuICAgICAgYCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgSW5uZXIgPSBzdHlsZWQuZGl2YFxuICBtYXJnaW46IDAgYXV0bztcbiAgJHtnZW5lcmljUHJvcHN9XG4gICR7c2VjdGlvblNwZWNpYWxQcm9wc31cbmA7XG5cbmNvbnN0IE91dGVyID0gc3R5bGVkLnNlY3Rpb25gXG4gICR7Z2VuZXJpY1Byb3BzfVxuYDtcbiJdfQ== */"));

var _excluded$2 = ["maxWidth", "px", "children"];
var XPad = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
  var _theme$section, _theme$section2;
  var maxWidth = _ref.maxWidth,
    px = _ref.px,
    children = _ref.children,
    props = _objectWithoutProperties(_ref, _excluded$2);
  var theme = useTheme(ThemeContext);
  return jsx(XPadStyled, _extends({
    ref: ref,
    m: "0 auto",
    maxWidth: interpolatedProp(maxWidth || (theme === null || theme === void 0 ? void 0 : (_theme$section = theme.section) === null || _theme$section === void 0 ? void 0 : _theme$section.maxWidth), "rem"),
    px: px || (theme === null || theme === void 0 ? void 0 : (_theme$section2 = theme.section) === null || _theme$section2 === void 0 ? void 0 : _theme$section2.px)
  }, props), children);
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
var XPadStyled = /*#__PURE__*/_styled("div", process.env.NODE_ENV === "production" ? {
  shouldForwardProp: propFilter,
  target: "ey6a28v0"
} : {
  shouldForwardProp: propFilter,
  target: "ey6a28v0",
  label: "XPadStyled"
})([sectionSpecialProps, genericProps], process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlhQYWQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBdUNtQiIsImZpbGUiOiJYUGFkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHN0eWxlZCBmcm9tIFwiQGVtb3Rpb24vc3R5bGVkXCI7XG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBUaGVtZUNvbnRleHQsIGNzcywgdXNlVGhlbWUgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IGludGVycG9sYXRlZFByb3AsIHJlc3BvbnNpdmVQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Jlc3BvbnNpdmVQcm9wXCI7XG5pbXBvcnQgZ2VuZXJpY1Byb3BzIGZyb20gXCIuLi8uLi9wcm9wcy9nZW5lcmljUHJvcHNcIjtcbmltcG9ydCB7IGFycmF5UHJvcCB9IGZyb20gXCIuLi8uLi91dGlscy9hcnJheVByb3BcIjtcbmltcG9ydCB7IHByb3BGaWx0ZXIgfSBmcm9tIFwiLi4vLi4vdXRpbHMvcHJvcEZpbHRlclwiO1xuXG5jb25zdCBYUGFkID0gUmVhY3QuZm9yd2FyZFJlZigoeyBtYXhXaWR0aCwgcHgsIGNoaWxkcmVuLCAuLi5wcm9wcyB9LCByZWYpID0+IHtcbiAgY29uc3QgdGhlbWUgPSB1c2VUaGVtZShUaGVtZUNvbnRleHQpO1xuXG4gIHJldHVybiAoXG4gICAgPFhQYWRTdHlsZWRcbiAgICAgIHJlZj17cmVmfVxuICAgICAgbT17XCIwIGF1dG9cIn1cbiAgICAgIG1heFdpZHRoPXtpbnRlcnBvbGF0ZWRQcm9wKG1heFdpZHRoIHx8IHRoZW1lPy5zZWN0aW9uPy5tYXhXaWR0aCwgXCJyZW1cIil9XG4gICAgICBweD17cHggfHwgdGhlbWU/LnNlY3Rpb24/LnB4fVxuICAgICAgey4uLnByb3BzfVxuICAgID5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L1hQYWRTdHlsZWQ+XG4gICk7XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgWFBhZDtcblxuY29uc3Qgc2VjdGlvblNwZWNpYWxQcm9wcyA9ICh7IHRoZW1lLCBweDogdmFsdWUsIG1heFdpZHRoIH0pID0+XG4gIGFycmF5UHJvcCh7XG4gICAgdGhlbWUsXG4gICAgdmFsdWUsXG4gICAgZnVuYzogKHgpID0+XG4gICAgICBgXG4gICAgICAgIG1heC13aWR0aDogY2FsYygke21heFdpZHRofSArICR7eH0gKyAke3h9KTtcbiAgICAgICAgcGFkZGluZy1sZWZ0OiAke3h9O1xuICAgICAgICBwYWRkaW5nLXJpZ2h0OiAke3h9O1xuICAgICAgYCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgWFBhZFN0eWxlZCA9IHN0eWxlZChcImRpdlwiLCB7XG4gIHNob3VsZEZvcndhcmRQcm9wOiBwcm9wRmlsdGVyLFxufSkoW3NlY3Rpb25TcGVjaWFsUHJvcHMsIGdlbmVyaWNQcm9wc10pO1xuIl19 */");

var Spacer = /*#__PURE__*/_styled("div", process.env.NODE_ENV === "production" ? {
  shouldForwardProp: propFilter,
  target: "eeqcce90"
} : {
  shouldForwardProp: propFilter,
  target: "eeqcce90",
  label: "Spacer"
})(genericProps, process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNwYWNlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFJZSIsImZpbGUiOiJTcGFjZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc3R5bGVkIGZyb20gXCJAZW1vdGlvbi9zdHlsZWRcIjtcbmltcG9ydCBnZW5lcmljUHJvcHMgZnJvbSBcIi4uLy4uL3Byb3BzL2dlbmVyaWNQcm9wc1wiO1xuaW1wb3J0IHsgcHJvcEZpbHRlciB9IGZyb20gXCIuLi8uLi91dGlscy9wcm9wRmlsdGVyXCI7XG5cbmNvbnN0IFNwYWNlciA9IHN0eWxlZChcImRpdlwiLCB7XG4gIHNob3VsZEZvcndhcmRQcm9wOiBwcm9wRmlsdGVyLFxufSkoZ2VuZXJpY1Byb3BzKTtcblxuU3BhY2VyLmRlZmF1bHRQcm9wcyA9IHtcbiAgaGVpZ2h0OiAxLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgU3BhY2VyO1xuIl19 */");
Spacer.defaultProps = {
  height: 1
};

var color$1 = function color(_ref) {
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
var fontFamily$1 = function fontFamily(_ref2) {
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
var fontSize$1 = function fontSize(_ref3) {
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
var fontStyle = function fontStyle(_ref4) {
  var theme = _ref4.theme,
    value = _ref4.fontStyle;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n          font-style: ".concat(x, ";\n        ");
    }
  });
};
var fontWeight$1 = function fontWeight(_ref5) {
  var theme = _ref5.theme,
    value = _ref5.fontWeight;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n          font-weight: ".concat(x, ";\n        ");
    }
  });
};
var fontVariant = function fontVariant(_ref6) {
  var theme = _ref6.theme,
    value = _ref6.fontVariant;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n          font-weight: ".concat(x, ";\n        ");
    }
  });
};
var lineHeight$1 = function lineHeight(_ref7) {
  var theme = _ref7.theme,
    value = _ref7.lineHeight;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n          line-height: ".concat(x, ";\n        ");
    },
    interpolation: "rem"
  });
};
var letterSpacing$1 = function letterSpacing(_ref8) {
  var theme = _ref8.theme,
    value = _ref8.letterSpacing;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n          letter-spacing: ".concat(x, ";\n        ");
    },
    interpolation: "em"
  });
};
var textAlign$1 = function textAlign(_ref9) {
  var theme = _ref9.theme,
    value = _ref9.textAlign;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n          text-align: ".concat(x, ";\n        ");
    }
  });
};
var textDecoration$1 = function textDecoration(_ref10) {
  var theme = _ref10.theme,
    value = _ref10.textDecoration;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n          text-decoration: ".concat(x, ";\n        ");
    }
  });
};
var textTransform$1 = function textTransform(_ref11) {
  var theme = _ref11.theme,
    value = _ref11.textTransform;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n          text-transform: ".concat(x, ";\n        ");
    }
  });
};
var textIndent = function textIndent(_ref12) {
  var theme = _ref12.theme,
    value = _ref12.textIndent;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n          text-indent: ".concat(x, ";\n        ");
    }
  });
};
var textOverflow = function textOverflow(_ref13) {
  var theme = _ref13.theme,
    value = _ref13.textOverflow;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n          text-overflow: ".concat(x, ";\n        ");
    }
  });
};
var textShadow = function textShadow(_ref14) {
  var theme = _ref14.theme,
    value = _ref14.textShadow;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n          text-shadow: ".concat(x, ";\n        ");
    }
  });
};
var whiteSpace$1 = function whiteSpace(_ref15) {
  var theme = _ref15.theme,
    value = _ref15.whiteSpace;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n          white-space: ".concat(x, ";\n        ");
    }
  });
};
var wordBreak = function wordBreak(_ref16) {
  var theme = _ref16.theme,
    value = _ref16.wordBreak;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n      word-break: ".concat(x, ";\n        ");
    }
  });
};
var wordSpacing = function wordSpacing(_ref17) {
  var theme = _ref17.theme,
    value = _ref17.wordSpacing;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n      word-spacing: ".concat(x, ";\n        ");
    }
  });
};
var userSelect$1 = function userSelect(_ref18) {
  var theme = _ref18.theme,
    value = _ref18.userSelect;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n          user-select: ".concat(x, ";\n        ");
    }
  });
};
var typographyProps = [fontFamily$1, fontSize$1, fontStyle, fontWeight$1, fontVariant, lineHeight$1, letterSpacing$1, color$1, textAlign$1, textDecoration$1, textTransform$1, textIndent, textOverflow, textShadow, whiteSpace$1, wordBreak, wordSpacing, userSelect$1];

var _excluded$1 = ["variant", "children", "color"];
var Typography = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
  var _theme$typography, _varsFrTheme$default, _theme$palette, _theme$palette2;
  var variantFromProps = _ref.variant,
    children = _ref.children,
    color = _ref.color,
    restProps = _objectWithoutProperties(_ref, _excluded$1);
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
var TypographyStyled = /*#__PURE__*/_styled("div", process.env.NODE_ENV === "production" ? {
  shouldForwardProp: propFilter,
  target: "e14iioxq0"
} : {
  shouldForwardProp: propFilter,
  target: "e14iioxq0",
  label: "TypographyStyled"
})([typographyProps, genericProps], process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlR5cG9ncmFwaHkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBbUN5QiIsImZpbGUiOiJUeXBvZ3JhcGh5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHN0eWxlZCBmcm9tIFwiQGVtb3Rpb24vc3R5bGVkXCI7XG5pbXBvcnQgeyBUaGVtZUNvbnRleHQsIHVzZVRoZW1lIH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XG5pbXBvcnQgaXNQcm9wVmFsaWQgZnJvbSBcIkBlbW90aW9uL2lzLXByb3AtdmFsaWRcIjtcbmltcG9ydCBnZW5lcmljUHJvcHMgZnJvbSBcIi4uLy4uL3Byb3BzL2dlbmVyaWNQcm9wc1wiO1xuaW1wb3J0IHR5cG9ncmFwaHlQcm9wcyBmcm9tIFwiLi4vLi4vcHJvcHMvdHlwb2dyYXBoeVByb3BzXCI7XG5pbXBvcnQgeyBwcm9wRmlsdGVyIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Byb3BGaWx0ZXJcIjtcblxuY29uc3QgVHlwb2dyYXBoeSA9IFJlYWN0LmZvcndhcmRSZWYoXG4gICh7IHZhcmlhbnQ6IHZhcmlhbnRGcm9tUHJvcHMsIGNoaWxkcmVuLCBjb2xvciwgLi4ucmVzdFByb3BzIH0sIHJlZikgPT4ge1xuICAgIGNvbnN0IHRoZW1lID0gdXNlVGhlbWUoVGhlbWVDb250ZXh0KTtcblxuICAgIGNvbnN0IHZhcnNGclRoZW1lID0gdGhlbWU/LnR5cG9ncmFwaHk/LnZhcmlhbnRzO1xuXG4gICAgY29uc3QgY29sb3JQcmlvcml0eSA9XG4gICAgICBjb2xvciB8fCAvLyBpZiBjb2xvciBpcyBwYXNzZWQgYXMgcHJvcCwgdXNlIGl0XG4gICAgICAodmFyaWFudEZyb21Qcm9wcyAmJiB2YXJzRnJUaGVtZVt2YXJpYW50RnJvbVByb3BzXS5jb2xvcikgfHwgLy8gaWYgdmFyaWFudCBpcyBwYXNzZWQgYXMgcHJvcCwgdXNlIGl0cyBjb2xvclxuICAgICAgKHZhcnNGclRoZW1lICYmIHZhcnNGclRoZW1lLmRlZmF1bHQ/LmNvbG9yKSB8fCAvLyBpZiB2YXJpYW50cyBleGlzdCwgdXNlIGRlZmF1bHQgY29sb3JcbiAgICAgIHRoZW1lPy5wYWxldHRlPy50ZXh0LnByaW1hcnkgfHxcbiAgICAgIHRoZW1lPy5wYWxldHRlPy50ZXh0UHJpbWFyeTsgLy8gaWYgbm8gdmFyaWFudHMgZXhpc3QsIHVzZSB0aGVtZSdzIHRleHRQcmltYXJ5XG5cbiAgICByZXR1cm4gKFxuICAgICAgPFR5cG9ncmFwaHlTdHlsZWRcbiAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgIHsuLi4odmFyc0ZyVGhlbWUgJiYgdmFyc0ZyVGhlbWUuZGVmYXVsdCl9XG4gICAgICAgIHsuLi4odmFyaWFudEZyb21Qcm9wcyAmJiB2YXJzRnJUaGVtZVt2YXJpYW50RnJvbVByb3BzXSl9XG4gICAgICAgIGNvbG9yPXtjb2xvclByaW9yaXR5fVxuICAgICAgICB7Li4ucmVzdFByb3BzfVxuICAgICAgPlxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L1R5cG9ncmFwaHlTdHlsZWQ+XG4gICAgKTtcbiAgfVxuKTtcblxuY29uc3QgVHlwb2dyYXBoeVN0eWxlZCA9IHN0eWxlZChcImRpdlwiLCB7XG4gIHNob3VsZEZvcndhcmRQcm9wOiBwcm9wRmlsdGVyLFxufSkoW3R5cG9ncmFwaHlQcm9wcywgZ2VuZXJpY1Byb3BzXSk7XG5cbmV4cG9ydCBkZWZhdWx0IFR5cG9ncmFwaHk7XG4iXX0= */");

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
var rowGap$1 = function rowGap(_ref3) {
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
var columnGap$1 = function columnGap(_ref4) {
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
var flexFlow = function flexFlow(_ref8) {
  var theme = _ref8.theme,
    value = _ref8.flexFlow;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        flex-flow: ".concat(x, ";\n      ");
    }
  });
};
var alignContent = function alignContent(_ref9) {
  var theme = _ref9.theme,
    value = _ref9.alignContent;
  return arrayProp({
    theme: theme,
    value: value,
    func: function func(x) {
      return "\n        align-content: ".concat(x, ";\n      ");
    }
  });
};
var flexProps = [displayFlex, flexDirection, gap$1, alignItems, justifyContent, flexWrap, flexFlow, alignContent, rowGap$1, columnGap$1];

var Stack = /*#__PURE__*/_styled("div", process.env.NODE_ENV === "production" ? {
  shouldForwardProp: propFilter,
  target: "e1nhy00x0"
} : {
  shouldForwardProp: propFilter,
  target: "e1nhy00x0",
  label: "Stack"
})([flexProps, genericProps], process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlN0YWNrLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUtjIiwiZmlsZSI6IlN0YWNrLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHN0eWxlZCBmcm9tIFwiQGVtb3Rpb24vc3R5bGVkXCI7XG5pbXBvcnQgZ2VuZXJpY1Byb3BzIGZyb20gXCIuLi8uLi9wcm9wcy9nZW5lcmljUHJvcHNcIjtcbmltcG9ydCBmbGV4UHJvcHMgZnJvbSBcIi4uLy4uL3Byb3BzL2ZsZXhQcm9wc1wiO1xuaW1wb3J0IHsgcHJvcEZpbHRlciB9IGZyb20gXCIuLi8uLi91dGlscy9wcm9wRmlsdGVyXCI7XG5cbmNvbnN0IFN0YWNrID0gc3R5bGVkKFwiZGl2XCIsIHtcbiAgc2hvdWxkRm9yd2FyZFByb3A6IHByb3BGaWx0ZXIsXG59KShbZmxleFByb3BzLCBnZW5lcmljUHJvcHNdKTtcblxuU3RhY2suZGVmYXVsdFByb3BzID0ge1xuICBmbGV4RGlyZWN0aW9uOiBcImNvbHVtblwiLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgU3RhY2s7XG4iXX0= */");
Stack.defaultProps = {
  flexDirection: "column"
};

var Column = /*#__PURE__*/_styled("div", process.env.NODE_ENV === "production" ? {
  shouldForwardProp: propFilter,
  target: "e1b9k2eu0"
} : {
  shouldForwardProp: propFilter,
  target: "e1b9k2eu0",
  label: "Column"
})([flexProps, genericProps], process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbHVtbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFLZSIsImZpbGUiOiJDb2x1bW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc3R5bGVkIGZyb20gXCJAZW1vdGlvbi9zdHlsZWRcIjtcbmltcG9ydCBnZW5lcmljUHJvcHMgZnJvbSBcIi4uLy4uL3Byb3BzL2dlbmVyaWNQcm9wc1wiO1xuaW1wb3J0IGZsZXhQcm9wcyBmcm9tIFwiLi4vLi4vcHJvcHMvZmxleFByb3BzXCI7XG5pbXBvcnQgeyBwcm9wRmlsdGVyIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Byb3BGaWx0ZXJcIjtcblxuY29uc3QgQ29sdW1uID0gc3R5bGVkKFwiZGl2XCIsIHtcbiAgc2hvdWxkRm9yd2FyZFByb3A6IHByb3BGaWx0ZXIsXG59KShbZmxleFByb3BzLCBnZW5lcmljUHJvcHNdKTtcblxuQ29sdW1uLmRlZmF1bHRQcm9wcyA9IHtcbiAgZmxleERpcmVjdGlvbjogXCJjb2x1bW5cIixcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbHVtbjtcbiJdfQ== */");
Column.defaultProps = {
  flexDirection: "column"
};

var Row = /*#__PURE__*/_styled("div", process.env.NODE_ENV === "production" ? {
  shouldForwardProp: propFilter,
  target: "e1yfu7i80"
} : {
  shouldForwardProp: propFilter,
  target: "e1yfu7i80",
  label: "Row"
})([flexProps, genericProps], process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlJvdy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFLWSIsImZpbGUiOiJSb3cuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc3R5bGVkIGZyb20gXCJAZW1vdGlvbi9zdHlsZWRcIjtcbmltcG9ydCBnZW5lcmljUHJvcHMgZnJvbSBcIi4uLy4uL3Byb3BzL2dlbmVyaWNQcm9wc1wiO1xuaW1wb3J0IGZsZXhQcm9wcyBmcm9tIFwiLi4vLi4vcHJvcHMvZmxleFByb3BzXCI7XG5pbXBvcnQgeyBwcm9wRmlsdGVyIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Byb3BGaWx0ZXJcIjtcblxuY29uc3QgUm93ID0gc3R5bGVkKFwiZGl2XCIsIHtcbiAgc2hvdWxkRm9yd2FyZFByb3A6IHByb3BGaWx0ZXIsXG59KShbZmxleFByb3BzLCBnZW5lcmljUHJvcHNdKTtcblxuUm93LmRlZmF1bHRQcm9wcyA9IHtcbiAgZmxleERpcmVjdGlvbjogXCJyb3dcIixcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFJvdztcbiJdfQ== */");
Row.defaultProps = {
  flexDirection: "row"
};

var _excluded = ["ratio", "children"];
function _EMOTION_STRINGIFIED_CSS_ERROR__$1() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }
var KeepAspectRatio = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
  var _ref$ratio = _ref.ratio,
    ratio = _ref$ratio === void 0 ? 1 : _ref$ratio,
    children = _ref.children,
    restProps = _objectWithoutProperties(_ref, _excluded);
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
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__$1
});

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

// span (num: span, string: col start/end )
// placeSelf,

// TODO:
// grid-column: ${x};

var span = function span(_ref) {
  var span = _ref.span;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("grid-column:span ", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyaWRJdGVtTWl4aW5zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVlTIiwiZmlsZSI6ImdyaWRJdGVtTWl4aW5zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3NzIH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XG5pbXBvcnQgeyByZXNwb25zaXZlUHJvcCB9IGZyb20gXCIuLi8uLi91dGlscy9yZXNwb25zaXZlUHJvcFwiO1xuXG4vLyBzcGFuIChudW06IHNwYW4sIHN0cmluZzogY29sIHN0YXJ0L2VuZCApXG4vLyBwbGFjZVNlbGYsXG5cbi8vIFRPRE86XG4vLyBncmlkLWNvbHVtbjogJHt4fTtcblxuY29uc3Qgc3BhbiA9ICh7IHNwYW4gfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBncmlkLWNvbHVtbjogc3BhbiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IHNwYW4sXG4gIH0pO1xuXG5jb25zdCBwbGFjZVNlbGYgPSAoeyBwbGFjZVNlbGYgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwbGFjZS1zZWxmOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IHBsYWNlU2VsZixcbiAgfSk7XG5cbmNvbnN0IG9yZGVyID0gKHsgb3JkZXIgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBvcmRlcjogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBvcmRlcixcbiAgfSk7XG5cbmNvbnN0IGdyaWRDb2x1bW4gPSAoeyBncmlkQ29sdW1uIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgZ3JpZC1jb2x1bW46ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZ3JpZENvbHVtbixcbiAgfSk7XG5cbmNvbnN0IGdyaWRSb3cgPSAoeyBncmlkUm93IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgZ3JpZC1yb3c6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZ3JpZFJvdyxcbiAgfSk7XG5cbmNvbnN0IGdyaWRBcmVhID0gKHsgZ3JpZEFyZWEgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBncmlkLWFyZWE6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZ3JpZEFyZWEsXG4gIH0pO1xuXG5leHBvcnQgZGVmYXVsdCBbc3BhbiwgcGxhY2VTZWxmLCBvcmRlciwgZ3JpZENvbHVtbiwgZ3JpZFJvdywgZ3JpZEFyZWFdO1xuIl19 */");
    },
    val: span
  });
};
var placeSelf = function placeSelf(_ref2) {
  var placeSelf = _ref2.placeSelf;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("place-self:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyaWRJdGVtTWl4aW5zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXFCUyIsImZpbGUiOiJncmlkSXRlbU1peGlucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xuaW1wb3J0IHsgcmVzcG9uc2l2ZVByb3AgfSBmcm9tIFwiLi4vLi4vdXRpbHMvcmVzcG9uc2l2ZVByb3BcIjtcblxuLy8gc3BhbiAobnVtOiBzcGFuLCBzdHJpbmc6IGNvbCBzdGFydC9lbmQgKVxuLy8gcGxhY2VTZWxmLFxuXG4vLyBUT0RPOlxuLy8gZ3JpZC1jb2x1bW46ICR7eH07XG5cbmNvbnN0IHNwYW4gPSAoeyBzcGFuIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgZ3JpZC1jb2x1bW46IHNwYW4gJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBzcGFuLFxuICB9KTtcblxuY29uc3QgcGxhY2VTZWxmID0gKHsgcGxhY2VTZWxmIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgcGxhY2Utc2VsZjogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBwbGFjZVNlbGYsXG4gIH0pO1xuXG5jb25zdCBvcmRlciA9ICh7IG9yZGVyIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgb3JkZXI6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogb3JkZXIsXG4gIH0pO1xuXG5jb25zdCBncmlkQ29sdW1uID0gKHsgZ3JpZENvbHVtbiB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdyaWQtY29sdW1uOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IGdyaWRDb2x1bW4sXG4gIH0pO1xuXG5jb25zdCBncmlkUm93ID0gKHsgZ3JpZFJvdyB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdyaWQtcm93OiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IGdyaWRSb3csXG4gIH0pO1xuXG5jb25zdCBncmlkQXJlYSA9ICh7IGdyaWRBcmVhIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgZ3JpZC1hcmVhOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IGdyaWRBcmVhLFxuICB9KTtcblxuZXhwb3J0IGRlZmF1bHQgW3NwYW4sIHBsYWNlU2VsZiwgb3JkZXIsIGdyaWRDb2x1bW4sIGdyaWRSb3csIGdyaWRBcmVhXTtcbiJdfQ== */");
    },
    val: placeSelf
  });
};
var order = function order(_ref3) {
  var order = _ref3.order;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("order:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyaWRJdGVtTWl4aW5zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQThCUyIsImZpbGUiOiJncmlkSXRlbU1peGlucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xuaW1wb3J0IHsgcmVzcG9uc2l2ZVByb3AgfSBmcm9tIFwiLi4vLi4vdXRpbHMvcmVzcG9uc2l2ZVByb3BcIjtcblxuLy8gc3BhbiAobnVtOiBzcGFuLCBzdHJpbmc6IGNvbCBzdGFydC9lbmQgKVxuLy8gcGxhY2VTZWxmLFxuXG4vLyBUT0RPOlxuLy8gZ3JpZC1jb2x1bW46ICR7eH07XG5cbmNvbnN0IHNwYW4gPSAoeyBzcGFuIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgZ3JpZC1jb2x1bW46IHNwYW4gJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBzcGFuLFxuICB9KTtcblxuY29uc3QgcGxhY2VTZWxmID0gKHsgcGxhY2VTZWxmIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgcGxhY2Utc2VsZjogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBwbGFjZVNlbGYsXG4gIH0pO1xuXG5jb25zdCBvcmRlciA9ICh7IG9yZGVyIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgb3JkZXI6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogb3JkZXIsXG4gIH0pO1xuXG5jb25zdCBncmlkQ29sdW1uID0gKHsgZ3JpZENvbHVtbiB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdyaWQtY29sdW1uOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IGdyaWRDb2x1bW4sXG4gIH0pO1xuXG5jb25zdCBncmlkUm93ID0gKHsgZ3JpZFJvdyB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdyaWQtcm93OiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IGdyaWRSb3csXG4gIH0pO1xuXG5jb25zdCBncmlkQXJlYSA9ICh7IGdyaWRBcmVhIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgZ3JpZC1hcmVhOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IGdyaWRBcmVhLFxuICB9KTtcblxuZXhwb3J0IGRlZmF1bHQgW3NwYW4sIHBsYWNlU2VsZiwgb3JkZXIsIGdyaWRDb2x1bW4sIGdyaWRSb3csIGdyaWRBcmVhXTtcbiJdfQ== */");
    },
    val: order
  });
};
var gridColumn = function gridColumn(_ref4) {
  var gridColumn = _ref4.gridColumn;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("grid-column:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyaWRJdGVtTWl4aW5zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXVDUyIsImZpbGUiOiJncmlkSXRlbU1peGlucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xuaW1wb3J0IHsgcmVzcG9uc2l2ZVByb3AgfSBmcm9tIFwiLi4vLi4vdXRpbHMvcmVzcG9uc2l2ZVByb3BcIjtcblxuLy8gc3BhbiAobnVtOiBzcGFuLCBzdHJpbmc6IGNvbCBzdGFydC9lbmQgKVxuLy8gcGxhY2VTZWxmLFxuXG4vLyBUT0RPOlxuLy8gZ3JpZC1jb2x1bW46ICR7eH07XG5cbmNvbnN0IHNwYW4gPSAoeyBzcGFuIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgZ3JpZC1jb2x1bW46IHNwYW4gJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBzcGFuLFxuICB9KTtcblxuY29uc3QgcGxhY2VTZWxmID0gKHsgcGxhY2VTZWxmIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgcGxhY2Utc2VsZjogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBwbGFjZVNlbGYsXG4gIH0pO1xuXG5jb25zdCBvcmRlciA9ICh7IG9yZGVyIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgb3JkZXI6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogb3JkZXIsXG4gIH0pO1xuXG5jb25zdCBncmlkQ29sdW1uID0gKHsgZ3JpZENvbHVtbiB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdyaWQtY29sdW1uOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IGdyaWRDb2x1bW4sXG4gIH0pO1xuXG5jb25zdCBncmlkUm93ID0gKHsgZ3JpZFJvdyB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdyaWQtcm93OiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IGdyaWRSb3csXG4gIH0pO1xuXG5jb25zdCBncmlkQXJlYSA9ICh7IGdyaWRBcmVhIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgZ3JpZC1hcmVhOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IGdyaWRBcmVhLFxuICB9KTtcblxuZXhwb3J0IGRlZmF1bHQgW3NwYW4sIHBsYWNlU2VsZiwgb3JkZXIsIGdyaWRDb2x1bW4sIGdyaWRSb3csIGdyaWRBcmVhXTtcbiJdfQ== */");
    },
    val: gridColumn
  });
};
var gridRow = function gridRow(_ref5) {
  var gridRow = _ref5.gridRow;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("grid-row:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyaWRJdGVtTWl4aW5zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWdEUyIsImZpbGUiOiJncmlkSXRlbU1peGlucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xuaW1wb3J0IHsgcmVzcG9uc2l2ZVByb3AgfSBmcm9tIFwiLi4vLi4vdXRpbHMvcmVzcG9uc2l2ZVByb3BcIjtcblxuLy8gc3BhbiAobnVtOiBzcGFuLCBzdHJpbmc6IGNvbCBzdGFydC9lbmQgKVxuLy8gcGxhY2VTZWxmLFxuXG4vLyBUT0RPOlxuLy8gZ3JpZC1jb2x1bW46ICR7eH07XG5cbmNvbnN0IHNwYW4gPSAoeyBzcGFuIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgZ3JpZC1jb2x1bW46IHNwYW4gJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBzcGFuLFxuICB9KTtcblxuY29uc3QgcGxhY2VTZWxmID0gKHsgcGxhY2VTZWxmIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgcGxhY2Utc2VsZjogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBwbGFjZVNlbGYsXG4gIH0pO1xuXG5jb25zdCBvcmRlciA9ICh7IG9yZGVyIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgb3JkZXI6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogb3JkZXIsXG4gIH0pO1xuXG5jb25zdCBncmlkQ29sdW1uID0gKHsgZ3JpZENvbHVtbiB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdyaWQtY29sdW1uOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IGdyaWRDb2x1bW4sXG4gIH0pO1xuXG5jb25zdCBncmlkUm93ID0gKHsgZ3JpZFJvdyB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdyaWQtcm93OiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IGdyaWRSb3csXG4gIH0pO1xuXG5jb25zdCBncmlkQXJlYSA9ICh7IGdyaWRBcmVhIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgZ3JpZC1hcmVhOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IGdyaWRBcmVhLFxuICB9KTtcblxuZXhwb3J0IGRlZmF1bHQgW3NwYW4sIHBsYWNlU2VsZiwgb3JkZXIsIGdyaWRDb2x1bW4sIGdyaWRSb3csIGdyaWRBcmVhXTtcbiJdfQ== */");
    },
    val: gridRow
  });
};
var gridArea = function gridArea(_ref6) {
  var gridArea = _ref6.gridArea;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("grid-area:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyaWRJdGVtTWl4aW5zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXlEUyIsImZpbGUiOiJncmlkSXRlbU1peGlucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xuaW1wb3J0IHsgcmVzcG9uc2l2ZVByb3AgfSBmcm9tIFwiLi4vLi4vdXRpbHMvcmVzcG9uc2l2ZVByb3BcIjtcblxuLy8gc3BhbiAobnVtOiBzcGFuLCBzdHJpbmc6IGNvbCBzdGFydC9lbmQgKVxuLy8gcGxhY2VTZWxmLFxuXG4vLyBUT0RPOlxuLy8gZ3JpZC1jb2x1bW46ICR7eH07XG5cbmNvbnN0IHNwYW4gPSAoeyBzcGFuIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgZ3JpZC1jb2x1bW46IHNwYW4gJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBzcGFuLFxuICB9KTtcblxuY29uc3QgcGxhY2VTZWxmID0gKHsgcGxhY2VTZWxmIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgcGxhY2Utc2VsZjogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBwbGFjZVNlbGYsXG4gIH0pO1xuXG5jb25zdCBvcmRlciA9ICh7IG9yZGVyIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgb3JkZXI6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogb3JkZXIsXG4gIH0pO1xuXG5jb25zdCBncmlkQ29sdW1uID0gKHsgZ3JpZENvbHVtbiB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdyaWQtY29sdW1uOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IGdyaWRDb2x1bW4sXG4gIH0pO1xuXG5jb25zdCBncmlkUm93ID0gKHsgZ3JpZFJvdyB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdyaWQtcm93OiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IGdyaWRSb3csXG4gIH0pO1xuXG5jb25zdCBncmlkQXJlYSA9ICh7IGdyaWRBcmVhIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgZ3JpZC1hcmVhOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IGdyaWRBcmVhLFxuICB9KTtcblxuZXhwb3J0IGRlZmF1bHQgW3NwYW4sIHBsYWNlU2VsZiwgb3JkZXIsIGdyaWRDb2x1bW4sIGdyaWRSb3csIGdyaWRBcmVhXTtcbiJdfQ== */");
    },
    val: gridArea
  });
};
var gridItemMixins = [span, placeSelf, order, gridColumn, gridRow, gridArea];

function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }

// grid,
// base,
// gap,
// columnGap,
// rowGap,
// placeItems,
// gridColumn,

var grid = process.env.NODE_ENV === "production" ? {
  name: "vetbs0",
  styles: "display:grid"
} : {
  name: "wmhzsl-grid",
  styles: "display:grid;label:grid;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyaWRNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBV2dCIiwiZmlsZSI6ImdyaWRNaXhpbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IHJlc3BvbnNpdmVQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Jlc3BvbnNpdmVQcm9wXCI7XG5cbi8vIGdyaWQsXG4vLyBiYXNlLFxuLy8gZ2FwLFxuLy8gY29sdW1uR2FwLFxuLy8gcm93R2FwLFxuLy8gcGxhY2VJdGVtcyxcbi8vIGdyaWRDb2x1bW4sXG5cbmNvbnN0IGdyaWQgPSBjc3NgXG4gIGRpc3BsYXk6IGdyaWQ7XG5gO1xuXG5jb25zdCBiYXNlID0gKHsgYmFzZSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KCR7eH0sIDFmcik7XG4gICAgICBgLFxuICAgIHZhbDogYmFzZSxcbiAgfSk7XG5cbmNvbnN0IGdhcCA9ICh7IGdhcCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdhcDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBnYXAsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IGNvbHVtbkdhcCA9ICh7IGNvbHVtbkdhcCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGNvbHVtbi1nYXA6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogY29sdW1uR2FwLFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCByb3dHYXAgPSAoeyByb3dHYXAgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICByb3ctZ2FwOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IHJvd0dhcCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgcGxhY2VJdGVtcyA9ICh7IHBsYWNlSXRlbXMgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwbGFjZS1pdGVtczogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBwbGFjZUl0ZW1zLFxuICB9KTtcblxuY29uc3QgZ3JpZFRlbXBsYXRlQXJlYXMgPSAoeyBncmlkVGVtcGxhdGVBcmVhcyB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtYXJlYXM6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZ3JpZFRlbXBsYXRlQXJlYXMsXG4gIH0pO1xuXG5jb25zdCBncmlkVGVtcGxhdGVSb3dzID0gKHsgZ3JpZFRlbXBsYXRlUm93cyB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtcm93czogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBncmlkVGVtcGxhdGVSb3dzLFxuICB9KTtcblxuY29uc3QgZ3JpZFRlbXBsYXRlQ29sdW1ucyA9ICh7IGdyaWRUZW1wbGF0ZUNvbHVtbnMgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZ3JpZFRlbXBsYXRlQ29sdW1ucyxcbiAgfSk7XG5cbmNvbnN0IGdyaWRUZW1wbGF0ZSA9ICh7IGdyaWRUZW1wbGF0ZSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdyaWQtdGVtcGxhdGU6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZ3JpZFRlbXBsYXRlLFxuICB9KTtcblxuZXhwb3J0IGRlZmF1bHQgW1xuICBncmlkLFxuICBiYXNlLFxuICBnYXAsXG4gIGNvbHVtbkdhcCxcbiAgcm93R2FwLFxuICBwbGFjZUl0ZW1zLFxuICBncmlkVGVtcGxhdGVBcmVhcyxcbiAgZ3JpZFRlbXBsYXRlUm93cyxcbiAgZ3JpZFRlbXBsYXRlQ29sdW1ucyxcbiAgZ3JpZFRlbXBsYXRlLFxuXTtcbiJdfQ== */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
};
var base = function base(_ref) {
  var base = _ref.base;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("grid-template-columns:repeat(", x, ", 1fr);" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyaWRNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBa0JTIiwiZmlsZSI6ImdyaWRNaXhpbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IHJlc3BvbnNpdmVQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Jlc3BvbnNpdmVQcm9wXCI7XG5cbi8vIGdyaWQsXG4vLyBiYXNlLFxuLy8gZ2FwLFxuLy8gY29sdW1uR2FwLFxuLy8gcm93R2FwLFxuLy8gcGxhY2VJdGVtcyxcbi8vIGdyaWRDb2x1bW4sXG5cbmNvbnN0IGdyaWQgPSBjc3NgXG4gIGRpc3BsYXk6IGdyaWQ7XG5gO1xuXG5jb25zdCBiYXNlID0gKHsgYmFzZSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KCR7eH0sIDFmcik7XG4gICAgICBgLFxuICAgIHZhbDogYmFzZSxcbiAgfSk7XG5cbmNvbnN0IGdhcCA9ICh7IGdhcCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdhcDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBnYXAsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IGNvbHVtbkdhcCA9ICh7IGNvbHVtbkdhcCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGNvbHVtbi1nYXA6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogY29sdW1uR2FwLFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCByb3dHYXAgPSAoeyByb3dHYXAgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICByb3ctZ2FwOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IHJvd0dhcCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgcGxhY2VJdGVtcyA9ICh7IHBsYWNlSXRlbXMgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwbGFjZS1pdGVtczogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBwbGFjZUl0ZW1zLFxuICB9KTtcblxuY29uc3QgZ3JpZFRlbXBsYXRlQXJlYXMgPSAoeyBncmlkVGVtcGxhdGVBcmVhcyB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtYXJlYXM6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZ3JpZFRlbXBsYXRlQXJlYXMsXG4gIH0pO1xuXG5jb25zdCBncmlkVGVtcGxhdGVSb3dzID0gKHsgZ3JpZFRlbXBsYXRlUm93cyB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtcm93czogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBncmlkVGVtcGxhdGVSb3dzLFxuICB9KTtcblxuY29uc3QgZ3JpZFRlbXBsYXRlQ29sdW1ucyA9ICh7IGdyaWRUZW1wbGF0ZUNvbHVtbnMgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZ3JpZFRlbXBsYXRlQ29sdW1ucyxcbiAgfSk7XG5cbmNvbnN0IGdyaWRUZW1wbGF0ZSA9ICh7IGdyaWRUZW1wbGF0ZSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdyaWQtdGVtcGxhdGU6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZ3JpZFRlbXBsYXRlLFxuICB9KTtcblxuZXhwb3J0IGRlZmF1bHQgW1xuICBncmlkLFxuICBiYXNlLFxuICBnYXAsXG4gIGNvbHVtbkdhcCxcbiAgcm93R2FwLFxuICBwbGFjZUl0ZW1zLFxuICBncmlkVGVtcGxhdGVBcmVhcyxcbiAgZ3JpZFRlbXBsYXRlUm93cyxcbiAgZ3JpZFRlbXBsYXRlQ29sdW1ucyxcbiAgZ3JpZFRlbXBsYXRlLFxuXTtcbiJdfQ== */");
    },
    val: base
  });
};
var gap = function gap(_ref2) {
  var gap = _ref2.gap;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("gap:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyaWRNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBMkJTIiwiZmlsZSI6ImdyaWRNaXhpbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IHJlc3BvbnNpdmVQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Jlc3BvbnNpdmVQcm9wXCI7XG5cbi8vIGdyaWQsXG4vLyBiYXNlLFxuLy8gZ2FwLFxuLy8gY29sdW1uR2FwLFxuLy8gcm93R2FwLFxuLy8gcGxhY2VJdGVtcyxcbi8vIGdyaWRDb2x1bW4sXG5cbmNvbnN0IGdyaWQgPSBjc3NgXG4gIGRpc3BsYXk6IGdyaWQ7XG5gO1xuXG5jb25zdCBiYXNlID0gKHsgYmFzZSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KCR7eH0sIDFmcik7XG4gICAgICBgLFxuICAgIHZhbDogYmFzZSxcbiAgfSk7XG5cbmNvbnN0IGdhcCA9ICh7IGdhcCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdhcDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBnYXAsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IGNvbHVtbkdhcCA9ICh7IGNvbHVtbkdhcCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGNvbHVtbi1nYXA6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogY29sdW1uR2FwLFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCByb3dHYXAgPSAoeyByb3dHYXAgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICByb3ctZ2FwOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IHJvd0dhcCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgcGxhY2VJdGVtcyA9ICh7IHBsYWNlSXRlbXMgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwbGFjZS1pdGVtczogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBwbGFjZUl0ZW1zLFxuICB9KTtcblxuY29uc3QgZ3JpZFRlbXBsYXRlQXJlYXMgPSAoeyBncmlkVGVtcGxhdGVBcmVhcyB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtYXJlYXM6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZ3JpZFRlbXBsYXRlQXJlYXMsXG4gIH0pO1xuXG5jb25zdCBncmlkVGVtcGxhdGVSb3dzID0gKHsgZ3JpZFRlbXBsYXRlUm93cyB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtcm93czogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBncmlkVGVtcGxhdGVSb3dzLFxuICB9KTtcblxuY29uc3QgZ3JpZFRlbXBsYXRlQ29sdW1ucyA9ICh7IGdyaWRUZW1wbGF0ZUNvbHVtbnMgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZ3JpZFRlbXBsYXRlQ29sdW1ucyxcbiAgfSk7XG5cbmNvbnN0IGdyaWRUZW1wbGF0ZSA9ICh7IGdyaWRUZW1wbGF0ZSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdyaWQtdGVtcGxhdGU6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZ3JpZFRlbXBsYXRlLFxuICB9KTtcblxuZXhwb3J0IGRlZmF1bHQgW1xuICBncmlkLFxuICBiYXNlLFxuICBnYXAsXG4gIGNvbHVtbkdhcCxcbiAgcm93R2FwLFxuICBwbGFjZUl0ZW1zLFxuICBncmlkVGVtcGxhdGVBcmVhcyxcbiAgZ3JpZFRlbXBsYXRlUm93cyxcbiAgZ3JpZFRlbXBsYXRlQ29sdW1ucyxcbiAgZ3JpZFRlbXBsYXRlLFxuXTtcbiJdfQ== */");
    },
    val: gap,
    interpolation: "rem"
  });
};
var columnGap = function columnGap(_ref3) {
  var columnGap = _ref3.columnGap;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("column-gap:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyaWRNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBcUNTIiwiZmlsZSI6ImdyaWRNaXhpbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IHJlc3BvbnNpdmVQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Jlc3BvbnNpdmVQcm9wXCI7XG5cbi8vIGdyaWQsXG4vLyBiYXNlLFxuLy8gZ2FwLFxuLy8gY29sdW1uR2FwLFxuLy8gcm93R2FwLFxuLy8gcGxhY2VJdGVtcyxcbi8vIGdyaWRDb2x1bW4sXG5cbmNvbnN0IGdyaWQgPSBjc3NgXG4gIGRpc3BsYXk6IGdyaWQ7XG5gO1xuXG5jb25zdCBiYXNlID0gKHsgYmFzZSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KCR7eH0sIDFmcik7XG4gICAgICBgLFxuICAgIHZhbDogYmFzZSxcbiAgfSk7XG5cbmNvbnN0IGdhcCA9ICh7IGdhcCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdhcDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBnYXAsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IGNvbHVtbkdhcCA9ICh7IGNvbHVtbkdhcCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGNvbHVtbi1nYXA6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogY29sdW1uR2FwLFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCByb3dHYXAgPSAoeyByb3dHYXAgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICByb3ctZ2FwOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IHJvd0dhcCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgcGxhY2VJdGVtcyA9ICh7IHBsYWNlSXRlbXMgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwbGFjZS1pdGVtczogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBwbGFjZUl0ZW1zLFxuICB9KTtcblxuY29uc3QgZ3JpZFRlbXBsYXRlQXJlYXMgPSAoeyBncmlkVGVtcGxhdGVBcmVhcyB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtYXJlYXM6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZ3JpZFRlbXBsYXRlQXJlYXMsXG4gIH0pO1xuXG5jb25zdCBncmlkVGVtcGxhdGVSb3dzID0gKHsgZ3JpZFRlbXBsYXRlUm93cyB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtcm93czogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBncmlkVGVtcGxhdGVSb3dzLFxuICB9KTtcblxuY29uc3QgZ3JpZFRlbXBsYXRlQ29sdW1ucyA9ICh7IGdyaWRUZW1wbGF0ZUNvbHVtbnMgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZ3JpZFRlbXBsYXRlQ29sdW1ucyxcbiAgfSk7XG5cbmNvbnN0IGdyaWRUZW1wbGF0ZSA9ICh7IGdyaWRUZW1wbGF0ZSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdyaWQtdGVtcGxhdGU6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZ3JpZFRlbXBsYXRlLFxuICB9KTtcblxuZXhwb3J0IGRlZmF1bHQgW1xuICBncmlkLFxuICBiYXNlLFxuICBnYXAsXG4gIGNvbHVtbkdhcCxcbiAgcm93R2FwLFxuICBwbGFjZUl0ZW1zLFxuICBncmlkVGVtcGxhdGVBcmVhcyxcbiAgZ3JpZFRlbXBsYXRlUm93cyxcbiAgZ3JpZFRlbXBsYXRlQ29sdW1ucyxcbiAgZ3JpZFRlbXBsYXRlLFxuXTtcbiJdfQ== */");
    },
    val: columnGap,
    interpolation: "rem"
  });
};
var rowGap = function rowGap(_ref4) {
  var rowGap = _ref4.rowGap;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("row-gap:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyaWRNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBK0NTIiwiZmlsZSI6ImdyaWRNaXhpbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IHJlc3BvbnNpdmVQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Jlc3BvbnNpdmVQcm9wXCI7XG5cbi8vIGdyaWQsXG4vLyBiYXNlLFxuLy8gZ2FwLFxuLy8gY29sdW1uR2FwLFxuLy8gcm93R2FwLFxuLy8gcGxhY2VJdGVtcyxcbi8vIGdyaWRDb2x1bW4sXG5cbmNvbnN0IGdyaWQgPSBjc3NgXG4gIGRpc3BsYXk6IGdyaWQ7XG5gO1xuXG5jb25zdCBiYXNlID0gKHsgYmFzZSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KCR7eH0sIDFmcik7XG4gICAgICBgLFxuICAgIHZhbDogYmFzZSxcbiAgfSk7XG5cbmNvbnN0IGdhcCA9ICh7IGdhcCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdhcDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBnYXAsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IGNvbHVtbkdhcCA9ICh7IGNvbHVtbkdhcCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGNvbHVtbi1nYXA6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogY29sdW1uR2FwLFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCByb3dHYXAgPSAoeyByb3dHYXAgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICByb3ctZ2FwOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IHJvd0dhcCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgcGxhY2VJdGVtcyA9ICh7IHBsYWNlSXRlbXMgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwbGFjZS1pdGVtczogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBwbGFjZUl0ZW1zLFxuICB9KTtcblxuY29uc3QgZ3JpZFRlbXBsYXRlQXJlYXMgPSAoeyBncmlkVGVtcGxhdGVBcmVhcyB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtYXJlYXM6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZ3JpZFRlbXBsYXRlQXJlYXMsXG4gIH0pO1xuXG5jb25zdCBncmlkVGVtcGxhdGVSb3dzID0gKHsgZ3JpZFRlbXBsYXRlUm93cyB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtcm93czogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBncmlkVGVtcGxhdGVSb3dzLFxuICB9KTtcblxuY29uc3QgZ3JpZFRlbXBsYXRlQ29sdW1ucyA9ICh7IGdyaWRUZW1wbGF0ZUNvbHVtbnMgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZ3JpZFRlbXBsYXRlQ29sdW1ucyxcbiAgfSk7XG5cbmNvbnN0IGdyaWRUZW1wbGF0ZSA9ICh7IGdyaWRUZW1wbGF0ZSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdyaWQtdGVtcGxhdGU6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZ3JpZFRlbXBsYXRlLFxuICB9KTtcblxuZXhwb3J0IGRlZmF1bHQgW1xuICBncmlkLFxuICBiYXNlLFxuICBnYXAsXG4gIGNvbHVtbkdhcCxcbiAgcm93R2FwLFxuICBwbGFjZUl0ZW1zLFxuICBncmlkVGVtcGxhdGVBcmVhcyxcbiAgZ3JpZFRlbXBsYXRlUm93cyxcbiAgZ3JpZFRlbXBsYXRlQ29sdW1ucyxcbiAgZ3JpZFRlbXBsYXRlLFxuXTtcbiJdfQ== */");
    },
    val: rowGap,
    interpolation: "rem"
  });
};
var placeItems = function placeItems(_ref5) {
  var placeItems = _ref5.placeItems;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("place-items:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyaWRNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBeURTIiwiZmlsZSI6ImdyaWRNaXhpbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IHJlc3BvbnNpdmVQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Jlc3BvbnNpdmVQcm9wXCI7XG5cbi8vIGdyaWQsXG4vLyBiYXNlLFxuLy8gZ2FwLFxuLy8gY29sdW1uR2FwLFxuLy8gcm93R2FwLFxuLy8gcGxhY2VJdGVtcyxcbi8vIGdyaWRDb2x1bW4sXG5cbmNvbnN0IGdyaWQgPSBjc3NgXG4gIGRpc3BsYXk6IGdyaWQ7XG5gO1xuXG5jb25zdCBiYXNlID0gKHsgYmFzZSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KCR7eH0sIDFmcik7XG4gICAgICBgLFxuICAgIHZhbDogYmFzZSxcbiAgfSk7XG5cbmNvbnN0IGdhcCA9ICh7IGdhcCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdhcDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBnYXAsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IGNvbHVtbkdhcCA9ICh7IGNvbHVtbkdhcCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGNvbHVtbi1nYXA6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogY29sdW1uR2FwLFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCByb3dHYXAgPSAoeyByb3dHYXAgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICByb3ctZ2FwOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IHJvd0dhcCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgcGxhY2VJdGVtcyA9ICh7IHBsYWNlSXRlbXMgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwbGFjZS1pdGVtczogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBwbGFjZUl0ZW1zLFxuICB9KTtcblxuY29uc3QgZ3JpZFRlbXBsYXRlQXJlYXMgPSAoeyBncmlkVGVtcGxhdGVBcmVhcyB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtYXJlYXM6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZ3JpZFRlbXBsYXRlQXJlYXMsXG4gIH0pO1xuXG5jb25zdCBncmlkVGVtcGxhdGVSb3dzID0gKHsgZ3JpZFRlbXBsYXRlUm93cyB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtcm93czogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBncmlkVGVtcGxhdGVSb3dzLFxuICB9KTtcblxuY29uc3QgZ3JpZFRlbXBsYXRlQ29sdW1ucyA9ICh7IGdyaWRUZW1wbGF0ZUNvbHVtbnMgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZ3JpZFRlbXBsYXRlQ29sdW1ucyxcbiAgfSk7XG5cbmNvbnN0IGdyaWRUZW1wbGF0ZSA9ICh7IGdyaWRUZW1wbGF0ZSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdyaWQtdGVtcGxhdGU6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZ3JpZFRlbXBsYXRlLFxuICB9KTtcblxuZXhwb3J0IGRlZmF1bHQgW1xuICBncmlkLFxuICBiYXNlLFxuICBnYXAsXG4gIGNvbHVtbkdhcCxcbiAgcm93R2FwLFxuICBwbGFjZUl0ZW1zLFxuICBncmlkVGVtcGxhdGVBcmVhcyxcbiAgZ3JpZFRlbXBsYXRlUm93cyxcbiAgZ3JpZFRlbXBsYXRlQ29sdW1ucyxcbiAgZ3JpZFRlbXBsYXRlLFxuXTtcbiJdfQ== */");
    },
    val: placeItems
  });
};
var gridTemplateAreas = function gridTemplateAreas(_ref6) {
  var gridTemplateAreas = _ref6.gridTemplateAreas;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("grid-template-areas:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyaWRNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBa0VTIiwiZmlsZSI6ImdyaWRNaXhpbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IHJlc3BvbnNpdmVQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Jlc3BvbnNpdmVQcm9wXCI7XG5cbi8vIGdyaWQsXG4vLyBiYXNlLFxuLy8gZ2FwLFxuLy8gY29sdW1uR2FwLFxuLy8gcm93R2FwLFxuLy8gcGxhY2VJdGVtcyxcbi8vIGdyaWRDb2x1bW4sXG5cbmNvbnN0IGdyaWQgPSBjc3NgXG4gIGRpc3BsYXk6IGdyaWQ7XG5gO1xuXG5jb25zdCBiYXNlID0gKHsgYmFzZSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KCR7eH0sIDFmcik7XG4gICAgICBgLFxuICAgIHZhbDogYmFzZSxcbiAgfSk7XG5cbmNvbnN0IGdhcCA9ICh7IGdhcCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdhcDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBnYXAsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IGNvbHVtbkdhcCA9ICh7IGNvbHVtbkdhcCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGNvbHVtbi1nYXA6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogY29sdW1uR2FwLFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCByb3dHYXAgPSAoeyByb3dHYXAgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICByb3ctZ2FwOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IHJvd0dhcCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgcGxhY2VJdGVtcyA9ICh7IHBsYWNlSXRlbXMgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwbGFjZS1pdGVtczogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBwbGFjZUl0ZW1zLFxuICB9KTtcblxuY29uc3QgZ3JpZFRlbXBsYXRlQXJlYXMgPSAoeyBncmlkVGVtcGxhdGVBcmVhcyB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtYXJlYXM6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZ3JpZFRlbXBsYXRlQXJlYXMsXG4gIH0pO1xuXG5jb25zdCBncmlkVGVtcGxhdGVSb3dzID0gKHsgZ3JpZFRlbXBsYXRlUm93cyB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtcm93czogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBncmlkVGVtcGxhdGVSb3dzLFxuICB9KTtcblxuY29uc3QgZ3JpZFRlbXBsYXRlQ29sdW1ucyA9ICh7IGdyaWRUZW1wbGF0ZUNvbHVtbnMgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZ3JpZFRlbXBsYXRlQ29sdW1ucyxcbiAgfSk7XG5cbmNvbnN0IGdyaWRUZW1wbGF0ZSA9ICh7IGdyaWRUZW1wbGF0ZSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdyaWQtdGVtcGxhdGU6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZ3JpZFRlbXBsYXRlLFxuICB9KTtcblxuZXhwb3J0IGRlZmF1bHQgW1xuICBncmlkLFxuICBiYXNlLFxuICBnYXAsXG4gIGNvbHVtbkdhcCxcbiAgcm93R2FwLFxuICBwbGFjZUl0ZW1zLFxuICBncmlkVGVtcGxhdGVBcmVhcyxcbiAgZ3JpZFRlbXBsYXRlUm93cyxcbiAgZ3JpZFRlbXBsYXRlQ29sdW1ucyxcbiAgZ3JpZFRlbXBsYXRlLFxuXTtcbiJdfQ== */");
    },
    val: gridTemplateAreas
  });
};
var gridTemplateRows = function gridTemplateRows(_ref7) {
  var gridTemplateRows = _ref7.gridTemplateRows;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("grid-template-rows:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyaWRNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBMkVTIiwiZmlsZSI6ImdyaWRNaXhpbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IHJlc3BvbnNpdmVQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Jlc3BvbnNpdmVQcm9wXCI7XG5cbi8vIGdyaWQsXG4vLyBiYXNlLFxuLy8gZ2FwLFxuLy8gY29sdW1uR2FwLFxuLy8gcm93R2FwLFxuLy8gcGxhY2VJdGVtcyxcbi8vIGdyaWRDb2x1bW4sXG5cbmNvbnN0IGdyaWQgPSBjc3NgXG4gIGRpc3BsYXk6IGdyaWQ7XG5gO1xuXG5jb25zdCBiYXNlID0gKHsgYmFzZSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KCR7eH0sIDFmcik7XG4gICAgICBgLFxuICAgIHZhbDogYmFzZSxcbiAgfSk7XG5cbmNvbnN0IGdhcCA9ICh7IGdhcCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdhcDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBnYXAsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IGNvbHVtbkdhcCA9ICh7IGNvbHVtbkdhcCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGNvbHVtbi1nYXA6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogY29sdW1uR2FwLFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCByb3dHYXAgPSAoeyByb3dHYXAgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICByb3ctZ2FwOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IHJvd0dhcCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgcGxhY2VJdGVtcyA9ICh7IHBsYWNlSXRlbXMgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwbGFjZS1pdGVtczogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBwbGFjZUl0ZW1zLFxuICB9KTtcblxuY29uc3QgZ3JpZFRlbXBsYXRlQXJlYXMgPSAoeyBncmlkVGVtcGxhdGVBcmVhcyB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtYXJlYXM6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZ3JpZFRlbXBsYXRlQXJlYXMsXG4gIH0pO1xuXG5jb25zdCBncmlkVGVtcGxhdGVSb3dzID0gKHsgZ3JpZFRlbXBsYXRlUm93cyB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtcm93czogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBncmlkVGVtcGxhdGVSb3dzLFxuICB9KTtcblxuY29uc3QgZ3JpZFRlbXBsYXRlQ29sdW1ucyA9ICh7IGdyaWRUZW1wbGF0ZUNvbHVtbnMgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZ3JpZFRlbXBsYXRlQ29sdW1ucyxcbiAgfSk7XG5cbmNvbnN0IGdyaWRUZW1wbGF0ZSA9ICh7IGdyaWRUZW1wbGF0ZSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdyaWQtdGVtcGxhdGU6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZ3JpZFRlbXBsYXRlLFxuICB9KTtcblxuZXhwb3J0IGRlZmF1bHQgW1xuICBncmlkLFxuICBiYXNlLFxuICBnYXAsXG4gIGNvbHVtbkdhcCxcbiAgcm93R2FwLFxuICBwbGFjZUl0ZW1zLFxuICBncmlkVGVtcGxhdGVBcmVhcyxcbiAgZ3JpZFRlbXBsYXRlUm93cyxcbiAgZ3JpZFRlbXBsYXRlQ29sdW1ucyxcbiAgZ3JpZFRlbXBsYXRlLFxuXTtcbiJdfQ== */");
    },
    val: gridTemplateRows
  });
};
var gridTemplateColumns = function gridTemplateColumns(_ref8) {
  var gridTemplateColumns = _ref8.gridTemplateColumns;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("grid-template-columns:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyaWRNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBb0ZTIiwiZmlsZSI6ImdyaWRNaXhpbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IHJlc3BvbnNpdmVQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Jlc3BvbnNpdmVQcm9wXCI7XG5cbi8vIGdyaWQsXG4vLyBiYXNlLFxuLy8gZ2FwLFxuLy8gY29sdW1uR2FwLFxuLy8gcm93R2FwLFxuLy8gcGxhY2VJdGVtcyxcbi8vIGdyaWRDb2x1bW4sXG5cbmNvbnN0IGdyaWQgPSBjc3NgXG4gIGRpc3BsYXk6IGdyaWQ7XG5gO1xuXG5jb25zdCBiYXNlID0gKHsgYmFzZSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KCR7eH0sIDFmcik7XG4gICAgICBgLFxuICAgIHZhbDogYmFzZSxcbiAgfSk7XG5cbmNvbnN0IGdhcCA9ICh7IGdhcCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdhcDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBnYXAsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IGNvbHVtbkdhcCA9ICh7IGNvbHVtbkdhcCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGNvbHVtbi1nYXA6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogY29sdW1uR2FwLFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCByb3dHYXAgPSAoeyByb3dHYXAgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICByb3ctZ2FwOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IHJvd0dhcCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgcGxhY2VJdGVtcyA9ICh7IHBsYWNlSXRlbXMgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwbGFjZS1pdGVtczogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBwbGFjZUl0ZW1zLFxuICB9KTtcblxuY29uc3QgZ3JpZFRlbXBsYXRlQXJlYXMgPSAoeyBncmlkVGVtcGxhdGVBcmVhcyB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtYXJlYXM6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZ3JpZFRlbXBsYXRlQXJlYXMsXG4gIH0pO1xuXG5jb25zdCBncmlkVGVtcGxhdGVSb3dzID0gKHsgZ3JpZFRlbXBsYXRlUm93cyB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtcm93czogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBncmlkVGVtcGxhdGVSb3dzLFxuICB9KTtcblxuY29uc3QgZ3JpZFRlbXBsYXRlQ29sdW1ucyA9ICh7IGdyaWRUZW1wbGF0ZUNvbHVtbnMgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZ3JpZFRlbXBsYXRlQ29sdW1ucyxcbiAgfSk7XG5cbmNvbnN0IGdyaWRUZW1wbGF0ZSA9ICh7IGdyaWRUZW1wbGF0ZSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdyaWQtdGVtcGxhdGU6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZ3JpZFRlbXBsYXRlLFxuICB9KTtcblxuZXhwb3J0IGRlZmF1bHQgW1xuICBncmlkLFxuICBiYXNlLFxuICBnYXAsXG4gIGNvbHVtbkdhcCxcbiAgcm93R2FwLFxuICBwbGFjZUl0ZW1zLFxuICBncmlkVGVtcGxhdGVBcmVhcyxcbiAgZ3JpZFRlbXBsYXRlUm93cyxcbiAgZ3JpZFRlbXBsYXRlQ29sdW1ucyxcbiAgZ3JpZFRlbXBsYXRlLFxuXTtcbiJdfQ== */");
    },
    val: gridTemplateColumns
  });
};
var gridTemplate = function gridTemplate(_ref9) {
  var gridTemplate = _ref9.gridTemplate;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("grid-template:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyaWRNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBNkZTIiwiZmlsZSI6ImdyaWRNaXhpbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IHJlc3BvbnNpdmVQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Jlc3BvbnNpdmVQcm9wXCI7XG5cbi8vIGdyaWQsXG4vLyBiYXNlLFxuLy8gZ2FwLFxuLy8gY29sdW1uR2FwLFxuLy8gcm93R2FwLFxuLy8gcGxhY2VJdGVtcyxcbi8vIGdyaWRDb2x1bW4sXG5cbmNvbnN0IGdyaWQgPSBjc3NgXG4gIGRpc3BsYXk6IGdyaWQ7XG5gO1xuXG5jb25zdCBiYXNlID0gKHsgYmFzZSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KCR7eH0sIDFmcik7XG4gICAgICBgLFxuICAgIHZhbDogYmFzZSxcbiAgfSk7XG5cbmNvbnN0IGdhcCA9ICh7IGdhcCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdhcDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBnYXAsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IGNvbHVtbkdhcCA9ICh7IGNvbHVtbkdhcCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGNvbHVtbi1nYXA6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogY29sdW1uR2FwLFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCByb3dHYXAgPSAoeyByb3dHYXAgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICByb3ctZ2FwOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IHJvd0dhcCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgcGxhY2VJdGVtcyA9ICh7IHBsYWNlSXRlbXMgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwbGFjZS1pdGVtczogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBwbGFjZUl0ZW1zLFxuICB9KTtcblxuY29uc3QgZ3JpZFRlbXBsYXRlQXJlYXMgPSAoeyBncmlkVGVtcGxhdGVBcmVhcyB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtYXJlYXM6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZ3JpZFRlbXBsYXRlQXJlYXMsXG4gIH0pO1xuXG5jb25zdCBncmlkVGVtcGxhdGVSb3dzID0gKHsgZ3JpZFRlbXBsYXRlUm93cyB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtcm93czogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBncmlkVGVtcGxhdGVSb3dzLFxuICB9KTtcblxuY29uc3QgZ3JpZFRlbXBsYXRlQ29sdW1ucyA9ICh7IGdyaWRUZW1wbGF0ZUNvbHVtbnMgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZ3JpZFRlbXBsYXRlQ29sdW1ucyxcbiAgfSk7XG5cbmNvbnN0IGdyaWRUZW1wbGF0ZSA9ICh7IGdyaWRUZW1wbGF0ZSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdyaWQtdGVtcGxhdGU6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZ3JpZFRlbXBsYXRlLFxuICB9KTtcblxuZXhwb3J0IGRlZmF1bHQgW1xuICBncmlkLFxuICBiYXNlLFxuICBnYXAsXG4gIGNvbHVtbkdhcCxcbiAgcm93R2FwLFxuICBwbGFjZUl0ZW1zLFxuICBncmlkVGVtcGxhdGVBcmVhcyxcbiAgZ3JpZFRlbXBsYXRlUm93cyxcbiAgZ3JpZFRlbXBsYXRlQ29sdW1ucyxcbiAgZ3JpZFRlbXBsYXRlLFxuXTtcbiJdfQ== */");
    },
    val: gridTemplate
  });
};
var gridMixins = [grid, base, gap, columnGap, rowGap, placeItems, gridTemplateAreas, gridTemplateRows, gridTemplateColumns, gridTemplate];

var color = function color(_ref) {
  var color = _ref.color,
    theme = _ref.theme;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("color:", isValidColor(x) ? x : findValueInObject(x, theme), ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInR5cG9ncmFwaHlNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBUVMiLCJmaWxlIjoidHlwb2dyYXBoeU1peGlucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xuaW1wb3J0IHsgcmVzcG9uc2l2ZVByb3AgfSBmcm9tIFwiLi4vLi4vdXRpbHMvcmVzcG9uc2l2ZVByb3BcIjtcbmltcG9ydCB7IGlzVmFsaWRDb2xvciB9IGZyb20gXCIuLi8uLi91dGlscy9pc1ZhbGlkQ29sb3JcIjtcbmltcG9ydCB7IGZpbmRWYWx1ZUluT2JqZWN0IH0gZnJvbSBcIi4uLy4uL3V0aWxzL2ZpbmRWYWx1ZUluT2JqZWN0XCI7XG5cbmNvbnN0IGNvbG9yID0gKHsgY29sb3IsIHRoZW1lIH0pID0+IHtcbiAgcmV0dXJuIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgY29sb3I6ICR7aXNWYWxpZENvbG9yKHgpID8geCA6IGZpbmRWYWx1ZUluT2JqZWN0KHgsIHRoZW1lKX07XG4gICAgICBgLFxuICAgIHZhbDogY29sb3IsXG4gIH0pO1xufTtcblxuY29uc3QgZm9udEZhbWlseSA9ICh7IGZvbnRGYW1pbHkgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBmb250LWZhbWlseTogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBmb250RmFtaWx5LFxuICB9KTtcblxuY29uc3QgZm9udFNpemUgPSAoeyBmb250U2l6ZSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGZvbnQtc2l6ZTogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBmb250U2l6ZSxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgZm9udFdlaWdodCA9ICh7IGZvbnRXZWlnaHQgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBmb250LXdlaWdodDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBmb250V2VpZ2h0LFxuICB9KTtcblxuY29uc3QgbGluZUhlaWdodCA9ICh7IGxpbmVIZWlnaHQgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBsaW5lLWhlaWdodDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBsaW5lSGVpZ2h0LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBsZXR0ZXJTcGFjaW5nID0gKHsgbGV0dGVyU3BhY2luZyB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGxldHRlci1zcGFjaW5nOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IGxldHRlclNwYWNpbmcsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJlbVwiLFxuICB9KTtcblxuY29uc3QgdGV4dEFsaWduID0gKHsgdGV4dEFsaWduIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgdGV4dC1hbGlnbjogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiB0ZXh0QWxpZ24sXG4gIH0pO1xuXG5jb25zdCB0ZXh0RGVjb3JhdGlvbiA9ICh7IHRleHREZWNvcmF0aW9uIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IHRleHREZWNvcmF0aW9uLFxuICB9KTtcblxuY29uc3QgdGV4dFRyYW5zZm9ybSA9ICh7IHRleHRUcmFuc2Zvcm0gfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICB0ZXh0LXRyYW5zZm9ybTogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiB0ZXh0VHJhbnNmb3JtLFxuICB9KTtcblxuY29uc3Qgd2hpdGVTcGFjZSA9ICh7IHdoaXRlU3BhY2UgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICB3aGl0ZS1zcGFjZTogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiB3aGl0ZVNwYWNlLFxuICB9KTtcblxuY29uc3QgdXNlclNlbGVjdCA9ICh7IHVzZXJTZWxlY3QgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICB1c2VyLXNlbGVjdDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiB1c2VyU2VsZWN0LFxuICB9KTtcblxuZXhwb3J0IGRlZmF1bHQgW1xuICBmb250RmFtaWx5LFxuICBmb250U2l6ZSxcbiAgZm9udFdlaWdodCxcbiAgbGluZUhlaWdodCxcbiAgbGV0dGVyU3BhY2luZyxcbiAgY29sb3IsXG4gIHRleHRBbGlnbixcbiAgdGV4dERlY29yYXRpb24sXG4gIHRleHRUcmFuc2Zvcm0sXG4gIHdoaXRlU3BhY2UsXG4gIHVzZXJTZWxlY3QsXG5dO1xuIl19 */");
    },
    val: color
  });
};
var fontFamily = function fontFamily(_ref2) {
  var fontFamily = _ref2.fontFamily;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("font-family:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInR5cG9ncmFwaHlNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBa0JTIiwiZmlsZSI6InR5cG9ncmFwaHlNaXhpbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IHJlc3BvbnNpdmVQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Jlc3BvbnNpdmVQcm9wXCI7XG5pbXBvcnQgeyBpc1ZhbGlkQ29sb3IgfSBmcm9tIFwiLi4vLi4vdXRpbHMvaXNWYWxpZENvbG9yXCI7XG5pbXBvcnQgeyBmaW5kVmFsdWVJbk9iamVjdCB9IGZyb20gXCIuLi8uLi91dGlscy9maW5kVmFsdWVJbk9iamVjdFwiO1xuXG5jb25zdCBjb2xvciA9ICh7IGNvbG9yLCB0aGVtZSB9KSA9PiB7XG4gIHJldHVybiByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGNvbG9yOiAke2lzVmFsaWRDb2xvcih4KSA/IHggOiBmaW5kVmFsdWVJbk9iamVjdCh4LCB0aGVtZSl9O1xuICAgICAgYCxcbiAgICB2YWw6IGNvbG9yLFxuICB9KTtcbn07XG5cbmNvbnN0IGZvbnRGYW1pbHkgPSAoeyBmb250RmFtaWx5IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgZm9udC1mYW1pbHk6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZm9udEZhbWlseSxcbiAgfSk7XG5cbmNvbnN0IGZvbnRTaXplID0gKHsgZm9udFNpemUgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBmb250LXNpemU6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZm9udFNpemUsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IGZvbnRXZWlnaHQgPSAoeyBmb250V2VpZ2h0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgZm9udC13ZWlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZm9udFdlaWdodCxcbiAgfSk7XG5cbmNvbnN0IGxpbmVIZWlnaHQgPSAoeyBsaW5lSGVpZ2h0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgbGluZS1oZWlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbGluZUhlaWdodCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbGV0dGVyU3BhY2luZyA9ICh7IGxldHRlclNwYWNpbmcgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBsZXR0ZXItc3BhY2luZzogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBsZXR0ZXJTcGFjaW5nLFxuICAgIGludGVycG9sYXRpb246IFwiZW1cIixcbiAgfSk7XG5cbmNvbnN0IHRleHRBbGlnbiA9ICh7IHRleHRBbGlnbiB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHRleHQtYWxpZ246ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogdGV4dEFsaWduLFxuICB9KTtcblxuY29uc3QgdGV4dERlY29yYXRpb24gPSAoeyB0ZXh0RGVjb3JhdGlvbiB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiB0ZXh0RGVjb3JhdGlvbixcbiAgfSk7XG5cbmNvbnN0IHRleHRUcmFuc2Zvcm0gPSAoeyB0ZXh0VHJhbnNmb3JtIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgdGV4dC10cmFuc2Zvcm06ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogdGV4dFRyYW5zZm9ybSxcbiAgfSk7XG5cbmNvbnN0IHdoaXRlU3BhY2UgPSAoeyB3aGl0ZVNwYWNlIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgd2hpdGUtc3BhY2U6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogd2hpdGVTcGFjZSxcbiAgfSk7XG5cbmNvbnN0IHVzZXJTZWxlY3QgPSAoeyB1c2VyU2VsZWN0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgdXNlci1zZWxlY3Q6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogdXNlclNlbGVjdCxcbiAgfSk7XG5cbmV4cG9ydCBkZWZhdWx0IFtcbiAgZm9udEZhbWlseSxcbiAgZm9udFNpemUsXG4gIGZvbnRXZWlnaHQsXG4gIGxpbmVIZWlnaHQsXG4gIGxldHRlclNwYWNpbmcsXG4gIGNvbG9yLFxuICB0ZXh0QWxpZ24sXG4gIHRleHREZWNvcmF0aW9uLFxuICB0ZXh0VHJhbnNmb3JtLFxuICB3aGl0ZVNwYWNlLFxuICB1c2VyU2VsZWN0LFxuXTtcbiJdfQ== */");
    },
    val: fontFamily
  });
};
var fontSize = function fontSize(_ref3) {
  var fontSize = _ref3.fontSize;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("font-size:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInR5cG9ncmFwaHlNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBMkJTIiwiZmlsZSI6InR5cG9ncmFwaHlNaXhpbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IHJlc3BvbnNpdmVQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Jlc3BvbnNpdmVQcm9wXCI7XG5pbXBvcnQgeyBpc1ZhbGlkQ29sb3IgfSBmcm9tIFwiLi4vLi4vdXRpbHMvaXNWYWxpZENvbG9yXCI7XG5pbXBvcnQgeyBmaW5kVmFsdWVJbk9iamVjdCB9IGZyb20gXCIuLi8uLi91dGlscy9maW5kVmFsdWVJbk9iamVjdFwiO1xuXG5jb25zdCBjb2xvciA9ICh7IGNvbG9yLCB0aGVtZSB9KSA9PiB7XG4gIHJldHVybiByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGNvbG9yOiAke2lzVmFsaWRDb2xvcih4KSA/IHggOiBmaW5kVmFsdWVJbk9iamVjdCh4LCB0aGVtZSl9O1xuICAgICAgYCxcbiAgICB2YWw6IGNvbG9yLFxuICB9KTtcbn07XG5cbmNvbnN0IGZvbnRGYW1pbHkgPSAoeyBmb250RmFtaWx5IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgZm9udC1mYW1pbHk6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZm9udEZhbWlseSxcbiAgfSk7XG5cbmNvbnN0IGZvbnRTaXplID0gKHsgZm9udFNpemUgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBmb250LXNpemU6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZm9udFNpemUsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IGZvbnRXZWlnaHQgPSAoeyBmb250V2VpZ2h0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgZm9udC13ZWlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZm9udFdlaWdodCxcbiAgfSk7XG5cbmNvbnN0IGxpbmVIZWlnaHQgPSAoeyBsaW5lSGVpZ2h0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgbGluZS1oZWlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbGluZUhlaWdodCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbGV0dGVyU3BhY2luZyA9ICh7IGxldHRlclNwYWNpbmcgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBsZXR0ZXItc3BhY2luZzogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBsZXR0ZXJTcGFjaW5nLFxuICAgIGludGVycG9sYXRpb246IFwiZW1cIixcbiAgfSk7XG5cbmNvbnN0IHRleHRBbGlnbiA9ICh7IHRleHRBbGlnbiB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHRleHQtYWxpZ246ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogdGV4dEFsaWduLFxuICB9KTtcblxuY29uc3QgdGV4dERlY29yYXRpb24gPSAoeyB0ZXh0RGVjb3JhdGlvbiB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiB0ZXh0RGVjb3JhdGlvbixcbiAgfSk7XG5cbmNvbnN0IHRleHRUcmFuc2Zvcm0gPSAoeyB0ZXh0VHJhbnNmb3JtIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgdGV4dC10cmFuc2Zvcm06ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogdGV4dFRyYW5zZm9ybSxcbiAgfSk7XG5cbmNvbnN0IHdoaXRlU3BhY2UgPSAoeyB3aGl0ZVNwYWNlIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgd2hpdGUtc3BhY2U6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogd2hpdGVTcGFjZSxcbiAgfSk7XG5cbmNvbnN0IHVzZXJTZWxlY3QgPSAoeyB1c2VyU2VsZWN0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgdXNlci1zZWxlY3Q6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogdXNlclNlbGVjdCxcbiAgfSk7XG5cbmV4cG9ydCBkZWZhdWx0IFtcbiAgZm9udEZhbWlseSxcbiAgZm9udFNpemUsXG4gIGZvbnRXZWlnaHQsXG4gIGxpbmVIZWlnaHQsXG4gIGxldHRlclNwYWNpbmcsXG4gIGNvbG9yLFxuICB0ZXh0QWxpZ24sXG4gIHRleHREZWNvcmF0aW9uLFxuICB0ZXh0VHJhbnNmb3JtLFxuICB3aGl0ZVNwYWNlLFxuICB1c2VyU2VsZWN0LFxuXTtcbiJdfQ== */");
    },
    val: fontSize,
    interpolation: "rem"
  });
};
var fontWeight = function fontWeight(_ref4) {
  var fontWeight = _ref4.fontWeight;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("font-weight:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInR5cG9ncmFwaHlNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBcUNTIiwiZmlsZSI6InR5cG9ncmFwaHlNaXhpbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IHJlc3BvbnNpdmVQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Jlc3BvbnNpdmVQcm9wXCI7XG5pbXBvcnQgeyBpc1ZhbGlkQ29sb3IgfSBmcm9tIFwiLi4vLi4vdXRpbHMvaXNWYWxpZENvbG9yXCI7XG5pbXBvcnQgeyBmaW5kVmFsdWVJbk9iamVjdCB9IGZyb20gXCIuLi8uLi91dGlscy9maW5kVmFsdWVJbk9iamVjdFwiO1xuXG5jb25zdCBjb2xvciA9ICh7IGNvbG9yLCB0aGVtZSB9KSA9PiB7XG4gIHJldHVybiByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGNvbG9yOiAke2lzVmFsaWRDb2xvcih4KSA/IHggOiBmaW5kVmFsdWVJbk9iamVjdCh4LCB0aGVtZSl9O1xuICAgICAgYCxcbiAgICB2YWw6IGNvbG9yLFxuICB9KTtcbn07XG5cbmNvbnN0IGZvbnRGYW1pbHkgPSAoeyBmb250RmFtaWx5IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgZm9udC1mYW1pbHk6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZm9udEZhbWlseSxcbiAgfSk7XG5cbmNvbnN0IGZvbnRTaXplID0gKHsgZm9udFNpemUgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBmb250LXNpemU6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZm9udFNpemUsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IGZvbnRXZWlnaHQgPSAoeyBmb250V2VpZ2h0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgZm9udC13ZWlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZm9udFdlaWdodCxcbiAgfSk7XG5cbmNvbnN0IGxpbmVIZWlnaHQgPSAoeyBsaW5lSGVpZ2h0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgbGluZS1oZWlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbGluZUhlaWdodCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbGV0dGVyU3BhY2luZyA9ICh7IGxldHRlclNwYWNpbmcgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBsZXR0ZXItc3BhY2luZzogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBsZXR0ZXJTcGFjaW5nLFxuICAgIGludGVycG9sYXRpb246IFwiZW1cIixcbiAgfSk7XG5cbmNvbnN0IHRleHRBbGlnbiA9ICh7IHRleHRBbGlnbiB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHRleHQtYWxpZ246ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogdGV4dEFsaWduLFxuICB9KTtcblxuY29uc3QgdGV4dERlY29yYXRpb24gPSAoeyB0ZXh0RGVjb3JhdGlvbiB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiB0ZXh0RGVjb3JhdGlvbixcbiAgfSk7XG5cbmNvbnN0IHRleHRUcmFuc2Zvcm0gPSAoeyB0ZXh0VHJhbnNmb3JtIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgdGV4dC10cmFuc2Zvcm06ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogdGV4dFRyYW5zZm9ybSxcbiAgfSk7XG5cbmNvbnN0IHdoaXRlU3BhY2UgPSAoeyB3aGl0ZVNwYWNlIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgd2hpdGUtc3BhY2U6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogd2hpdGVTcGFjZSxcbiAgfSk7XG5cbmNvbnN0IHVzZXJTZWxlY3QgPSAoeyB1c2VyU2VsZWN0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgdXNlci1zZWxlY3Q6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogdXNlclNlbGVjdCxcbiAgfSk7XG5cbmV4cG9ydCBkZWZhdWx0IFtcbiAgZm9udEZhbWlseSxcbiAgZm9udFNpemUsXG4gIGZvbnRXZWlnaHQsXG4gIGxpbmVIZWlnaHQsXG4gIGxldHRlclNwYWNpbmcsXG4gIGNvbG9yLFxuICB0ZXh0QWxpZ24sXG4gIHRleHREZWNvcmF0aW9uLFxuICB0ZXh0VHJhbnNmb3JtLFxuICB3aGl0ZVNwYWNlLFxuICB1c2VyU2VsZWN0LFxuXTtcbiJdfQ== */");
    },
    val: fontWeight
  });
};
var lineHeight = function lineHeight(_ref5) {
  var lineHeight = _ref5.lineHeight;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("line-height:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInR5cG9ncmFwaHlNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBOENTIiwiZmlsZSI6InR5cG9ncmFwaHlNaXhpbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IHJlc3BvbnNpdmVQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Jlc3BvbnNpdmVQcm9wXCI7XG5pbXBvcnQgeyBpc1ZhbGlkQ29sb3IgfSBmcm9tIFwiLi4vLi4vdXRpbHMvaXNWYWxpZENvbG9yXCI7XG5pbXBvcnQgeyBmaW5kVmFsdWVJbk9iamVjdCB9IGZyb20gXCIuLi8uLi91dGlscy9maW5kVmFsdWVJbk9iamVjdFwiO1xuXG5jb25zdCBjb2xvciA9ICh7IGNvbG9yLCB0aGVtZSB9KSA9PiB7XG4gIHJldHVybiByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGNvbG9yOiAke2lzVmFsaWRDb2xvcih4KSA/IHggOiBmaW5kVmFsdWVJbk9iamVjdCh4LCB0aGVtZSl9O1xuICAgICAgYCxcbiAgICB2YWw6IGNvbG9yLFxuICB9KTtcbn07XG5cbmNvbnN0IGZvbnRGYW1pbHkgPSAoeyBmb250RmFtaWx5IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgZm9udC1mYW1pbHk6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZm9udEZhbWlseSxcbiAgfSk7XG5cbmNvbnN0IGZvbnRTaXplID0gKHsgZm9udFNpemUgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBmb250LXNpemU6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZm9udFNpemUsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IGZvbnRXZWlnaHQgPSAoeyBmb250V2VpZ2h0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgZm9udC13ZWlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZm9udFdlaWdodCxcbiAgfSk7XG5cbmNvbnN0IGxpbmVIZWlnaHQgPSAoeyBsaW5lSGVpZ2h0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgbGluZS1oZWlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbGluZUhlaWdodCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbGV0dGVyU3BhY2luZyA9ICh7IGxldHRlclNwYWNpbmcgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBsZXR0ZXItc3BhY2luZzogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBsZXR0ZXJTcGFjaW5nLFxuICAgIGludGVycG9sYXRpb246IFwiZW1cIixcbiAgfSk7XG5cbmNvbnN0IHRleHRBbGlnbiA9ICh7IHRleHRBbGlnbiB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHRleHQtYWxpZ246ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogdGV4dEFsaWduLFxuICB9KTtcblxuY29uc3QgdGV4dERlY29yYXRpb24gPSAoeyB0ZXh0RGVjb3JhdGlvbiB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiB0ZXh0RGVjb3JhdGlvbixcbiAgfSk7XG5cbmNvbnN0IHRleHRUcmFuc2Zvcm0gPSAoeyB0ZXh0VHJhbnNmb3JtIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgdGV4dC10cmFuc2Zvcm06ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogdGV4dFRyYW5zZm9ybSxcbiAgfSk7XG5cbmNvbnN0IHdoaXRlU3BhY2UgPSAoeyB3aGl0ZVNwYWNlIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgd2hpdGUtc3BhY2U6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogd2hpdGVTcGFjZSxcbiAgfSk7XG5cbmNvbnN0IHVzZXJTZWxlY3QgPSAoeyB1c2VyU2VsZWN0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgdXNlci1zZWxlY3Q6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogdXNlclNlbGVjdCxcbiAgfSk7XG5cbmV4cG9ydCBkZWZhdWx0IFtcbiAgZm9udEZhbWlseSxcbiAgZm9udFNpemUsXG4gIGZvbnRXZWlnaHQsXG4gIGxpbmVIZWlnaHQsXG4gIGxldHRlclNwYWNpbmcsXG4gIGNvbG9yLFxuICB0ZXh0QWxpZ24sXG4gIHRleHREZWNvcmF0aW9uLFxuICB0ZXh0VHJhbnNmb3JtLFxuICB3aGl0ZVNwYWNlLFxuICB1c2VyU2VsZWN0LFxuXTtcbiJdfQ== */");
    },
    val: lineHeight,
    interpolation: "rem"
  });
};
var letterSpacing = function letterSpacing(_ref6) {
  var letterSpacing = _ref6.letterSpacing;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("letter-spacing:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInR5cG9ncmFwaHlNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBd0RTIiwiZmlsZSI6InR5cG9ncmFwaHlNaXhpbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IHJlc3BvbnNpdmVQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Jlc3BvbnNpdmVQcm9wXCI7XG5pbXBvcnQgeyBpc1ZhbGlkQ29sb3IgfSBmcm9tIFwiLi4vLi4vdXRpbHMvaXNWYWxpZENvbG9yXCI7XG5pbXBvcnQgeyBmaW5kVmFsdWVJbk9iamVjdCB9IGZyb20gXCIuLi8uLi91dGlscy9maW5kVmFsdWVJbk9iamVjdFwiO1xuXG5jb25zdCBjb2xvciA9ICh7IGNvbG9yLCB0aGVtZSB9KSA9PiB7XG4gIHJldHVybiByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGNvbG9yOiAke2lzVmFsaWRDb2xvcih4KSA/IHggOiBmaW5kVmFsdWVJbk9iamVjdCh4LCB0aGVtZSl9O1xuICAgICAgYCxcbiAgICB2YWw6IGNvbG9yLFxuICB9KTtcbn07XG5cbmNvbnN0IGZvbnRGYW1pbHkgPSAoeyBmb250RmFtaWx5IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgZm9udC1mYW1pbHk6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZm9udEZhbWlseSxcbiAgfSk7XG5cbmNvbnN0IGZvbnRTaXplID0gKHsgZm9udFNpemUgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBmb250LXNpemU6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZm9udFNpemUsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IGZvbnRXZWlnaHQgPSAoeyBmb250V2VpZ2h0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgZm9udC13ZWlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZm9udFdlaWdodCxcbiAgfSk7XG5cbmNvbnN0IGxpbmVIZWlnaHQgPSAoeyBsaW5lSGVpZ2h0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgbGluZS1oZWlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbGluZUhlaWdodCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbGV0dGVyU3BhY2luZyA9ICh7IGxldHRlclNwYWNpbmcgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBsZXR0ZXItc3BhY2luZzogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBsZXR0ZXJTcGFjaW5nLFxuICAgIGludGVycG9sYXRpb246IFwiZW1cIixcbiAgfSk7XG5cbmNvbnN0IHRleHRBbGlnbiA9ICh7IHRleHRBbGlnbiB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHRleHQtYWxpZ246ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogdGV4dEFsaWduLFxuICB9KTtcblxuY29uc3QgdGV4dERlY29yYXRpb24gPSAoeyB0ZXh0RGVjb3JhdGlvbiB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiB0ZXh0RGVjb3JhdGlvbixcbiAgfSk7XG5cbmNvbnN0IHRleHRUcmFuc2Zvcm0gPSAoeyB0ZXh0VHJhbnNmb3JtIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgdGV4dC10cmFuc2Zvcm06ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogdGV4dFRyYW5zZm9ybSxcbiAgfSk7XG5cbmNvbnN0IHdoaXRlU3BhY2UgPSAoeyB3aGl0ZVNwYWNlIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgd2hpdGUtc3BhY2U6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogd2hpdGVTcGFjZSxcbiAgfSk7XG5cbmNvbnN0IHVzZXJTZWxlY3QgPSAoeyB1c2VyU2VsZWN0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgdXNlci1zZWxlY3Q6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogdXNlclNlbGVjdCxcbiAgfSk7XG5cbmV4cG9ydCBkZWZhdWx0IFtcbiAgZm9udEZhbWlseSxcbiAgZm9udFNpemUsXG4gIGZvbnRXZWlnaHQsXG4gIGxpbmVIZWlnaHQsXG4gIGxldHRlclNwYWNpbmcsXG4gIGNvbG9yLFxuICB0ZXh0QWxpZ24sXG4gIHRleHREZWNvcmF0aW9uLFxuICB0ZXh0VHJhbnNmb3JtLFxuICB3aGl0ZVNwYWNlLFxuICB1c2VyU2VsZWN0LFxuXTtcbiJdfQ== */");
    },
    val: letterSpacing,
    interpolation: "em"
  });
};
var textAlign = function textAlign(_ref7) {
  var textAlign = _ref7.textAlign;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("text-align:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInR5cG9ncmFwaHlNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBa0VTIiwiZmlsZSI6InR5cG9ncmFwaHlNaXhpbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IHJlc3BvbnNpdmVQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Jlc3BvbnNpdmVQcm9wXCI7XG5pbXBvcnQgeyBpc1ZhbGlkQ29sb3IgfSBmcm9tIFwiLi4vLi4vdXRpbHMvaXNWYWxpZENvbG9yXCI7XG5pbXBvcnQgeyBmaW5kVmFsdWVJbk9iamVjdCB9IGZyb20gXCIuLi8uLi91dGlscy9maW5kVmFsdWVJbk9iamVjdFwiO1xuXG5jb25zdCBjb2xvciA9ICh7IGNvbG9yLCB0aGVtZSB9KSA9PiB7XG4gIHJldHVybiByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGNvbG9yOiAke2lzVmFsaWRDb2xvcih4KSA/IHggOiBmaW5kVmFsdWVJbk9iamVjdCh4LCB0aGVtZSl9O1xuICAgICAgYCxcbiAgICB2YWw6IGNvbG9yLFxuICB9KTtcbn07XG5cbmNvbnN0IGZvbnRGYW1pbHkgPSAoeyBmb250RmFtaWx5IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgZm9udC1mYW1pbHk6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZm9udEZhbWlseSxcbiAgfSk7XG5cbmNvbnN0IGZvbnRTaXplID0gKHsgZm9udFNpemUgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBmb250LXNpemU6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZm9udFNpemUsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IGZvbnRXZWlnaHQgPSAoeyBmb250V2VpZ2h0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgZm9udC13ZWlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZm9udFdlaWdodCxcbiAgfSk7XG5cbmNvbnN0IGxpbmVIZWlnaHQgPSAoeyBsaW5lSGVpZ2h0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgbGluZS1oZWlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbGluZUhlaWdodCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbGV0dGVyU3BhY2luZyA9ICh7IGxldHRlclNwYWNpbmcgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBsZXR0ZXItc3BhY2luZzogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBsZXR0ZXJTcGFjaW5nLFxuICAgIGludGVycG9sYXRpb246IFwiZW1cIixcbiAgfSk7XG5cbmNvbnN0IHRleHRBbGlnbiA9ICh7IHRleHRBbGlnbiB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHRleHQtYWxpZ246ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogdGV4dEFsaWduLFxuICB9KTtcblxuY29uc3QgdGV4dERlY29yYXRpb24gPSAoeyB0ZXh0RGVjb3JhdGlvbiB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiB0ZXh0RGVjb3JhdGlvbixcbiAgfSk7XG5cbmNvbnN0IHRleHRUcmFuc2Zvcm0gPSAoeyB0ZXh0VHJhbnNmb3JtIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgdGV4dC10cmFuc2Zvcm06ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogdGV4dFRyYW5zZm9ybSxcbiAgfSk7XG5cbmNvbnN0IHdoaXRlU3BhY2UgPSAoeyB3aGl0ZVNwYWNlIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgd2hpdGUtc3BhY2U6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogd2hpdGVTcGFjZSxcbiAgfSk7XG5cbmNvbnN0IHVzZXJTZWxlY3QgPSAoeyB1c2VyU2VsZWN0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgdXNlci1zZWxlY3Q6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogdXNlclNlbGVjdCxcbiAgfSk7XG5cbmV4cG9ydCBkZWZhdWx0IFtcbiAgZm9udEZhbWlseSxcbiAgZm9udFNpemUsXG4gIGZvbnRXZWlnaHQsXG4gIGxpbmVIZWlnaHQsXG4gIGxldHRlclNwYWNpbmcsXG4gIGNvbG9yLFxuICB0ZXh0QWxpZ24sXG4gIHRleHREZWNvcmF0aW9uLFxuICB0ZXh0VHJhbnNmb3JtLFxuICB3aGl0ZVNwYWNlLFxuICB1c2VyU2VsZWN0LFxuXTtcbiJdfQ== */");
    },
    val: textAlign
  });
};
var textDecoration = function textDecoration(_ref8) {
  var textDecoration = _ref8.textDecoration;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("text-decoration:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInR5cG9ncmFwaHlNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBMkVTIiwiZmlsZSI6InR5cG9ncmFwaHlNaXhpbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IHJlc3BvbnNpdmVQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Jlc3BvbnNpdmVQcm9wXCI7XG5pbXBvcnQgeyBpc1ZhbGlkQ29sb3IgfSBmcm9tIFwiLi4vLi4vdXRpbHMvaXNWYWxpZENvbG9yXCI7XG5pbXBvcnQgeyBmaW5kVmFsdWVJbk9iamVjdCB9IGZyb20gXCIuLi8uLi91dGlscy9maW5kVmFsdWVJbk9iamVjdFwiO1xuXG5jb25zdCBjb2xvciA9ICh7IGNvbG9yLCB0aGVtZSB9KSA9PiB7XG4gIHJldHVybiByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGNvbG9yOiAke2lzVmFsaWRDb2xvcih4KSA/IHggOiBmaW5kVmFsdWVJbk9iamVjdCh4LCB0aGVtZSl9O1xuICAgICAgYCxcbiAgICB2YWw6IGNvbG9yLFxuICB9KTtcbn07XG5cbmNvbnN0IGZvbnRGYW1pbHkgPSAoeyBmb250RmFtaWx5IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgZm9udC1mYW1pbHk6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZm9udEZhbWlseSxcbiAgfSk7XG5cbmNvbnN0IGZvbnRTaXplID0gKHsgZm9udFNpemUgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBmb250LXNpemU6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZm9udFNpemUsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IGZvbnRXZWlnaHQgPSAoeyBmb250V2VpZ2h0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgZm9udC13ZWlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZm9udFdlaWdodCxcbiAgfSk7XG5cbmNvbnN0IGxpbmVIZWlnaHQgPSAoeyBsaW5lSGVpZ2h0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgbGluZS1oZWlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbGluZUhlaWdodCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbGV0dGVyU3BhY2luZyA9ICh7IGxldHRlclNwYWNpbmcgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBsZXR0ZXItc3BhY2luZzogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBsZXR0ZXJTcGFjaW5nLFxuICAgIGludGVycG9sYXRpb246IFwiZW1cIixcbiAgfSk7XG5cbmNvbnN0IHRleHRBbGlnbiA9ICh7IHRleHRBbGlnbiB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHRleHQtYWxpZ246ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogdGV4dEFsaWduLFxuICB9KTtcblxuY29uc3QgdGV4dERlY29yYXRpb24gPSAoeyB0ZXh0RGVjb3JhdGlvbiB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiB0ZXh0RGVjb3JhdGlvbixcbiAgfSk7XG5cbmNvbnN0IHRleHRUcmFuc2Zvcm0gPSAoeyB0ZXh0VHJhbnNmb3JtIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgdGV4dC10cmFuc2Zvcm06ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogdGV4dFRyYW5zZm9ybSxcbiAgfSk7XG5cbmNvbnN0IHdoaXRlU3BhY2UgPSAoeyB3aGl0ZVNwYWNlIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgd2hpdGUtc3BhY2U6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogd2hpdGVTcGFjZSxcbiAgfSk7XG5cbmNvbnN0IHVzZXJTZWxlY3QgPSAoeyB1c2VyU2VsZWN0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgdXNlci1zZWxlY3Q6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogdXNlclNlbGVjdCxcbiAgfSk7XG5cbmV4cG9ydCBkZWZhdWx0IFtcbiAgZm9udEZhbWlseSxcbiAgZm9udFNpemUsXG4gIGZvbnRXZWlnaHQsXG4gIGxpbmVIZWlnaHQsXG4gIGxldHRlclNwYWNpbmcsXG4gIGNvbG9yLFxuICB0ZXh0QWxpZ24sXG4gIHRleHREZWNvcmF0aW9uLFxuICB0ZXh0VHJhbnNmb3JtLFxuICB3aGl0ZVNwYWNlLFxuICB1c2VyU2VsZWN0LFxuXTtcbiJdfQ== */");
    },
    val: textDecoration
  });
};
var textTransform = function textTransform(_ref9) {
  var textTransform = _ref9.textTransform;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("text-transform:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInR5cG9ncmFwaHlNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBb0ZTIiwiZmlsZSI6InR5cG9ncmFwaHlNaXhpbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IHJlc3BvbnNpdmVQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Jlc3BvbnNpdmVQcm9wXCI7XG5pbXBvcnQgeyBpc1ZhbGlkQ29sb3IgfSBmcm9tIFwiLi4vLi4vdXRpbHMvaXNWYWxpZENvbG9yXCI7XG5pbXBvcnQgeyBmaW5kVmFsdWVJbk9iamVjdCB9IGZyb20gXCIuLi8uLi91dGlscy9maW5kVmFsdWVJbk9iamVjdFwiO1xuXG5jb25zdCBjb2xvciA9ICh7IGNvbG9yLCB0aGVtZSB9KSA9PiB7XG4gIHJldHVybiByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGNvbG9yOiAke2lzVmFsaWRDb2xvcih4KSA/IHggOiBmaW5kVmFsdWVJbk9iamVjdCh4LCB0aGVtZSl9O1xuICAgICAgYCxcbiAgICB2YWw6IGNvbG9yLFxuICB9KTtcbn07XG5cbmNvbnN0IGZvbnRGYW1pbHkgPSAoeyBmb250RmFtaWx5IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgZm9udC1mYW1pbHk6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZm9udEZhbWlseSxcbiAgfSk7XG5cbmNvbnN0IGZvbnRTaXplID0gKHsgZm9udFNpemUgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBmb250LXNpemU6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZm9udFNpemUsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IGZvbnRXZWlnaHQgPSAoeyBmb250V2VpZ2h0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgZm9udC13ZWlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZm9udFdlaWdodCxcbiAgfSk7XG5cbmNvbnN0IGxpbmVIZWlnaHQgPSAoeyBsaW5lSGVpZ2h0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgbGluZS1oZWlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbGluZUhlaWdodCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbGV0dGVyU3BhY2luZyA9ICh7IGxldHRlclNwYWNpbmcgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBsZXR0ZXItc3BhY2luZzogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBsZXR0ZXJTcGFjaW5nLFxuICAgIGludGVycG9sYXRpb246IFwiZW1cIixcbiAgfSk7XG5cbmNvbnN0IHRleHRBbGlnbiA9ICh7IHRleHRBbGlnbiB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHRleHQtYWxpZ246ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogdGV4dEFsaWduLFxuICB9KTtcblxuY29uc3QgdGV4dERlY29yYXRpb24gPSAoeyB0ZXh0RGVjb3JhdGlvbiB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiB0ZXh0RGVjb3JhdGlvbixcbiAgfSk7XG5cbmNvbnN0IHRleHRUcmFuc2Zvcm0gPSAoeyB0ZXh0VHJhbnNmb3JtIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgdGV4dC10cmFuc2Zvcm06ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogdGV4dFRyYW5zZm9ybSxcbiAgfSk7XG5cbmNvbnN0IHdoaXRlU3BhY2UgPSAoeyB3aGl0ZVNwYWNlIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgd2hpdGUtc3BhY2U6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogd2hpdGVTcGFjZSxcbiAgfSk7XG5cbmNvbnN0IHVzZXJTZWxlY3QgPSAoeyB1c2VyU2VsZWN0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgdXNlci1zZWxlY3Q6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogdXNlclNlbGVjdCxcbiAgfSk7XG5cbmV4cG9ydCBkZWZhdWx0IFtcbiAgZm9udEZhbWlseSxcbiAgZm9udFNpemUsXG4gIGZvbnRXZWlnaHQsXG4gIGxpbmVIZWlnaHQsXG4gIGxldHRlclNwYWNpbmcsXG4gIGNvbG9yLFxuICB0ZXh0QWxpZ24sXG4gIHRleHREZWNvcmF0aW9uLFxuICB0ZXh0VHJhbnNmb3JtLFxuICB3aGl0ZVNwYWNlLFxuICB1c2VyU2VsZWN0LFxuXTtcbiJdfQ== */");
    },
    val: textTransform
  });
};
var whiteSpace = function whiteSpace(_ref10) {
  var whiteSpace = _ref10.whiteSpace;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("white-space:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInR5cG9ncmFwaHlNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBNkZTIiwiZmlsZSI6InR5cG9ncmFwaHlNaXhpbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IHJlc3BvbnNpdmVQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Jlc3BvbnNpdmVQcm9wXCI7XG5pbXBvcnQgeyBpc1ZhbGlkQ29sb3IgfSBmcm9tIFwiLi4vLi4vdXRpbHMvaXNWYWxpZENvbG9yXCI7XG5pbXBvcnQgeyBmaW5kVmFsdWVJbk9iamVjdCB9IGZyb20gXCIuLi8uLi91dGlscy9maW5kVmFsdWVJbk9iamVjdFwiO1xuXG5jb25zdCBjb2xvciA9ICh7IGNvbG9yLCB0aGVtZSB9KSA9PiB7XG4gIHJldHVybiByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGNvbG9yOiAke2lzVmFsaWRDb2xvcih4KSA/IHggOiBmaW5kVmFsdWVJbk9iamVjdCh4LCB0aGVtZSl9O1xuICAgICAgYCxcbiAgICB2YWw6IGNvbG9yLFxuICB9KTtcbn07XG5cbmNvbnN0IGZvbnRGYW1pbHkgPSAoeyBmb250RmFtaWx5IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgZm9udC1mYW1pbHk6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZm9udEZhbWlseSxcbiAgfSk7XG5cbmNvbnN0IGZvbnRTaXplID0gKHsgZm9udFNpemUgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBmb250LXNpemU6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZm9udFNpemUsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IGZvbnRXZWlnaHQgPSAoeyBmb250V2VpZ2h0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgZm9udC13ZWlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZm9udFdlaWdodCxcbiAgfSk7XG5cbmNvbnN0IGxpbmVIZWlnaHQgPSAoeyBsaW5lSGVpZ2h0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgbGluZS1oZWlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbGluZUhlaWdodCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbGV0dGVyU3BhY2luZyA9ICh7IGxldHRlclNwYWNpbmcgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBsZXR0ZXItc3BhY2luZzogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBsZXR0ZXJTcGFjaW5nLFxuICAgIGludGVycG9sYXRpb246IFwiZW1cIixcbiAgfSk7XG5cbmNvbnN0IHRleHRBbGlnbiA9ICh7IHRleHRBbGlnbiB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHRleHQtYWxpZ246ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogdGV4dEFsaWduLFxuICB9KTtcblxuY29uc3QgdGV4dERlY29yYXRpb24gPSAoeyB0ZXh0RGVjb3JhdGlvbiB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiB0ZXh0RGVjb3JhdGlvbixcbiAgfSk7XG5cbmNvbnN0IHRleHRUcmFuc2Zvcm0gPSAoeyB0ZXh0VHJhbnNmb3JtIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgdGV4dC10cmFuc2Zvcm06ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogdGV4dFRyYW5zZm9ybSxcbiAgfSk7XG5cbmNvbnN0IHdoaXRlU3BhY2UgPSAoeyB3aGl0ZVNwYWNlIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgd2hpdGUtc3BhY2U6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogd2hpdGVTcGFjZSxcbiAgfSk7XG5cbmNvbnN0IHVzZXJTZWxlY3QgPSAoeyB1c2VyU2VsZWN0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgdXNlci1zZWxlY3Q6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogdXNlclNlbGVjdCxcbiAgfSk7XG5cbmV4cG9ydCBkZWZhdWx0IFtcbiAgZm9udEZhbWlseSxcbiAgZm9udFNpemUsXG4gIGZvbnRXZWlnaHQsXG4gIGxpbmVIZWlnaHQsXG4gIGxldHRlclNwYWNpbmcsXG4gIGNvbG9yLFxuICB0ZXh0QWxpZ24sXG4gIHRleHREZWNvcmF0aW9uLFxuICB0ZXh0VHJhbnNmb3JtLFxuICB3aGl0ZVNwYWNlLFxuICB1c2VyU2VsZWN0LFxuXTtcbiJdfQ== */");
    },
    val: whiteSpace
  });
};
var userSelect = function userSelect(_ref11) {
  var userSelect = _ref11.userSelect;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("user-select:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInR5cG9ncmFwaHlNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBc0dTIiwiZmlsZSI6InR5cG9ncmFwaHlNaXhpbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IHJlc3BvbnNpdmVQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Jlc3BvbnNpdmVQcm9wXCI7XG5pbXBvcnQgeyBpc1ZhbGlkQ29sb3IgfSBmcm9tIFwiLi4vLi4vdXRpbHMvaXNWYWxpZENvbG9yXCI7XG5pbXBvcnQgeyBmaW5kVmFsdWVJbk9iamVjdCB9IGZyb20gXCIuLi8uLi91dGlscy9maW5kVmFsdWVJbk9iamVjdFwiO1xuXG5jb25zdCBjb2xvciA9ICh7IGNvbG9yLCB0aGVtZSB9KSA9PiB7XG4gIHJldHVybiByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGNvbG9yOiAke2lzVmFsaWRDb2xvcih4KSA/IHggOiBmaW5kVmFsdWVJbk9iamVjdCh4LCB0aGVtZSl9O1xuICAgICAgYCxcbiAgICB2YWw6IGNvbG9yLFxuICB9KTtcbn07XG5cbmNvbnN0IGZvbnRGYW1pbHkgPSAoeyBmb250RmFtaWx5IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgZm9udC1mYW1pbHk6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZm9udEZhbWlseSxcbiAgfSk7XG5cbmNvbnN0IGZvbnRTaXplID0gKHsgZm9udFNpemUgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBmb250LXNpemU6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZm9udFNpemUsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IGZvbnRXZWlnaHQgPSAoeyBmb250V2VpZ2h0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgZm9udC13ZWlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZm9udFdlaWdodCxcbiAgfSk7XG5cbmNvbnN0IGxpbmVIZWlnaHQgPSAoeyBsaW5lSGVpZ2h0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgbGluZS1oZWlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbGluZUhlaWdodCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbGV0dGVyU3BhY2luZyA9ICh7IGxldHRlclNwYWNpbmcgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBsZXR0ZXItc3BhY2luZzogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBsZXR0ZXJTcGFjaW5nLFxuICAgIGludGVycG9sYXRpb246IFwiZW1cIixcbiAgfSk7XG5cbmNvbnN0IHRleHRBbGlnbiA9ICh7IHRleHRBbGlnbiB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHRleHQtYWxpZ246ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogdGV4dEFsaWduLFxuICB9KTtcblxuY29uc3QgdGV4dERlY29yYXRpb24gPSAoeyB0ZXh0RGVjb3JhdGlvbiB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiB0ZXh0RGVjb3JhdGlvbixcbiAgfSk7XG5cbmNvbnN0IHRleHRUcmFuc2Zvcm0gPSAoeyB0ZXh0VHJhbnNmb3JtIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgdGV4dC10cmFuc2Zvcm06ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogdGV4dFRyYW5zZm9ybSxcbiAgfSk7XG5cbmNvbnN0IHdoaXRlU3BhY2UgPSAoeyB3aGl0ZVNwYWNlIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgd2hpdGUtc3BhY2U6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogd2hpdGVTcGFjZSxcbiAgfSk7XG5cbmNvbnN0IHVzZXJTZWxlY3QgPSAoeyB1c2VyU2VsZWN0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgdXNlci1zZWxlY3Q6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogdXNlclNlbGVjdCxcbiAgfSk7XG5cbmV4cG9ydCBkZWZhdWx0IFtcbiAgZm9udEZhbWlseSxcbiAgZm9udFNpemUsXG4gIGZvbnRXZWlnaHQsXG4gIGxpbmVIZWlnaHQsXG4gIGxldHRlclNwYWNpbmcsXG4gIGNvbG9yLFxuICB0ZXh0QWxpZ24sXG4gIHRleHREZWNvcmF0aW9uLFxuICB0ZXh0VHJhbnNmb3JtLFxuICB3aGl0ZVNwYWNlLFxuICB1c2VyU2VsZWN0LFxuXTtcbiJdfQ== */");
    },
    val: userSelect
  });
};
var typographyMixins = [fontFamily, fontSize, fontWeight, lineHeight, letterSpacing, color, textAlign, textDecoration, textTransform, whiteSpace, userSelect];

var visibility = function visibility(_ref) {
  var visibility = _ref.visibility;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("visibility:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpc3BsYXlNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS29CIiwiZmlsZSI6ImRpc3BsYXlNaXhpbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IHJlc3BvbnNpdmVQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Jlc3BvbnNpdmVQcm9wXCI7XG5cbmNvbnN0IHZpc2liaWxpdHkgPSAoeyB2aXNpYmlsaXR5IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgdmlzaWJpbGl0eTogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogdmlzaWJpbGl0eSxcbiAgfSk7XG5cbmNvbnN0IGRpc3BsYXkgPSAoeyBkaXNwbGF5IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgZGlzcGxheTogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogZGlzcGxheSxcbiAgfSk7XG5cbmNvbnN0IHBvc2l0aW9uID0gKHsgcG9zaXRpb24gfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICBwb3NpdGlvbjogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogcG9zaXRpb24sXG4gIH0pO1xuXG5jb25zdCB6SW5kZXggPSAoeyB6SW5kZXggfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICB6LWluZGV4OiAke3h9O1xuICAgIGAsXG4gICAgdmFsOiB6SW5kZXgsXG4gIH0pO1xuXG5jb25zdCB0b3AgPSAoeyB0b3AgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICB0b3A6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IHRvcCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgcmlnaHQgPSAoeyByaWdodCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+IGNzc2BcbiAgICAgIHJpZ2h0OiAke3h9O1xuICAgIGAsXG4gICAgdmFsOiByaWdodCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcbmNvbnN0IGJvdHRvbSA9ICh7IGJvdHRvbSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+IGNzc2BcbiAgICAgIGJvdHRvbTogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogYm90dG9tLFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBsZWZ0ID0gKHsgbGVmdCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+IGNzc2BcbiAgICAgIGxlZnQ6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGxlZnQsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IGluc2V0ID0gKHsgaW5zZXQgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICBpbnNldDogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogaW5zZXQsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IGluc2V0WCA9ICh7IGluc2V0WCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+IGNzc2BcbiAgICAgIGxlZnQ6ICR7eH07XG4gICAgICByaWdodDogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogaW5zZXRYLFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBpbnNldFkgPSAoeyBpbnNldFkgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICB0b3A6ICR7eH07XG4gICAgICBib3R0b206ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGluc2V0WSxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgcG9pbnRlckV2ZW50cyA9ICh7IHBvaW50ZXJFdmVudHMgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICBwb2ludGVyLWV2ZW50czogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogcG9pbnRlckV2ZW50cyxcbiAgfSk7XG5cbmNvbnN0IGN1cnNvciA9ICh7IGN1cnNvciB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+IGNzc2BcbiAgICAgIGN1cnNvcjogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogY3Vyc29yLFxuICB9KTtcblxuY29uc3Qgb3BhY2l0eSA9ICh7IG9wYWNpdHkgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICBvcGFjaXR5OiAke3h9O1xuICAgIGAsXG4gICAgdmFsOiBvcGFjaXR5LFxuICB9KTtcblxuY29uc3QgdHJhbnNpdGlvbiA9ICh7IHRyYW5zaXRpb24gfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICB0cmFuc2l0aW9uOiAke3h9O1xuICAgIGAsXG4gICAgdmFsOiB0cmFuc2l0aW9uLFxuICB9KTtcblxuZXhwb3J0IGRlZmF1bHQgW1xuICB2aXNpYmlsaXR5LFxuICBkaXNwbGF5LFxuICBwb3NpdGlvbixcbiAgekluZGV4LFxuICB0b3AsXG4gIHJpZ2h0LFxuICBib3R0b20sXG4gIGxlZnQsXG4gIGluc2V0LFxuICBpbnNldFgsXG4gIGluc2V0WSxcbiAgcG9pbnRlckV2ZW50cyxcbiAgY3Vyc29yLFxuICBvcGFjaXR5LFxuICB0cmFuc2l0aW9uLFxuXTtcbiJdfQ== */");
    },
    val: visibility
  });
};
var display = function display(_ref2) {
  var display = _ref2.display;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("display:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpc3BsYXlNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBYW9CIiwiZmlsZSI6ImRpc3BsYXlNaXhpbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IHJlc3BvbnNpdmVQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Jlc3BvbnNpdmVQcm9wXCI7XG5cbmNvbnN0IHZpc2liaWxpdHkgPSAoeyB2aXNpYmlsaXR5IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgdmlzaWJpbGl0eTogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogdmlzaWJpbGl0eSxcbiAgfSk7XG5cbmNvbnN0IGRpc3BsYXkgPSAoeyBkaXNwbGF5IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgZGlzcGxheTogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogZGlzcGxheSxcbiAgfSk7XG5cbmNvbnN0IHBvc2l0aW9uID0gKHsgcG9zaXRpb24gfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICBwb3NpdGlvbjogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogcG9zaXRpb24sXG4gIH0pO1xuXG5jb25zdCB6SW5kZXggPSAoeyB6SW5kZXggfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICB6LWluZGV4OiAke3h9O1xuICAgIGAsXG4gICAgdmFsOiB6SW5kZXgsXG4gIH0pO1xuXG5jb25zdCB0b3AgPSAoeyB0b3AgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICB0b3A6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IHRvcCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgcmlnaHQgPSAoeyByaWdodCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+IGNzc2BcbiAgICAgIHJpZ2h0OiAke3h9O1xuICAgIGAsXG4gICAgdmFsOiByaWdodCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcbmNvbnN0IGJvdHRvbSA9ICh7IGJvdHRvbSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+IGNzc2BcbiAgICAgIGJvdHRvbTogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogYm90dG9tLFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBsZWZ0ID0gKHsgbGVmdCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+IGNzc2BcbiAgICAgIGxlZnQ6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGxlZnQsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IGluc2V0ID0gKHsgaW5zZXQgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICBpbnNldDogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogaW5zZXQsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IGluc2V0WCA9ICh7IGluc2V0WCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+IGNzc2BcbiAgICAgIGxlZnQ6ICR7eH07XG4gICAgICByaWdodDogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogaW5zZXRYLFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBpbnNldFkgPSAoeyBpbnNldFkgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICB0b3A6ICR7eH07XG4gICAgICBib3R0b206ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGluc2V0WSxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgcG9pbnRlckV2ZW50cyA9ICh7IHBvaW50ZXJFdmVudHMgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICBwb2ludGVyLWV2ZW50czogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogcG9pbnRlckV2ZW50cyxcbiAgfSk7XG5cbmNvbnN0IGN1cnNvciA9ICh7IGN1cnNvciB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+IGNzc2BcbiAgICAgIGN1cnNvcjogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogY3Vyc29yLFxuICB9KTtcblxuY29uc3Qgb3BhY2l0eSA9ICh7IG9wYWNpdHkgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICBvcGFjaXR5OiAke3h9O1xuICAgIGAsXG4gICAgdmFsOiBvcGFjaXR5LFxuICB9KTtcblxuY29uc3QgdHJhbnNpdGlvbiA9ICh7IHRyYW5zaXRpb24gfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICB0cmFuc2l0aW9uOiAke3h9O1xuICAgIGAsXG4gICAgdmFsOiB0cmFuc2l0aW9uLFxuICB9KTtcblxuZXhwb3J0IGRlZmF1bHQgW1xuICB2aXNpYmlsaXR5LFxuICBkaXNwbGF5LFxuICBwb3NpdGlvbixcbiAgekluZGV4LFxuICB0b3AsXG4gIHJpZ2h0LFxuICBib3R0b20sXG4gIGxlZnQsXG4gIGluc2V0LFxuICBpbnNldFgsXG4gIGluc2V0WSxcbiAgcG9pbnRlckV2ZW50cyxcbiAgY3Vyc29yLFxuICBvcGFjaXR5LFxuICB0cmFuc2l0aW9uLFxuXTtcbiJdfQ== */");
    },
    val: display
  });
};
var position = function position(_ref3) {
  var position = _ref3.position;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("position:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpc3BsYXlNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBcUJvQiIsImZpbGUiOiJkaXNwbGF5TWl4aW5zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3NzIH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XG5pbXBvcnQgeyByZXNwb25zaXZlUHJvcCB9IGZyb20gXCIuLi8uLi91dGlscy9yZXNwb25zaXZlUHJvcFwiO1xuXG5jb25zdCB2aXNpYmlsaXR5ID0gKHsgdmlzaWJpbGl0eSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+IGNzc2BcbiAgICAgIHZpc2liaWxpdHk6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IHZpc2liaWxpdHksXG4gIH0pO1xuXG5jb25zdCBkaXNwbGF5ID0gKHsgZGlzcGxheSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+IGNzc2BcbiAgICAgIGRpc3BsYXk6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGRpc3BsYXksXG4gIH0pO1xuXG5jb25zdCBwb3NpdGlvbiA9ICh7IHBvc2l0aW9uIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgcG9zaXRpb246ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IHBvc2l0aW9uLFxuICB9KTtcblxuY29uc3QgekluZGV4ID0gKHsgekluZGV4IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgei1pbmRleDogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogekluZGV4LFxuICB9KTtcblxuY29uc3QgdG9wID0gKHsgdG9wIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgdG9wOiAke3h9O1xuICAgIGAsXG4gICAgdmFsOiB0b3AsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHJpZ2h0ID0gKHsgcmlnaHQgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICByaWdodDogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogcmlnaHQsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5jb25zdCBib3R0b20gPSAoeyBib3R0b20gfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICBib3R0b206ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGJvdHRvbSxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbGVmdCA9ICh7IGxlZnQgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICBsZWZ0OiAke3h9O1xuICAgIGAsXG4gICAgdmFsOiBsZWZ0LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBpbnNldCA9ICh7IGluc2V0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgaW5zZXQ6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGluc2V0LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBpbnNldFggPSAoeyBpbnNldFggfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICBsZWZ0OiAke3h9O1xuICAgICAgcmlnaHQ6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGluc2V0WCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgaW5zZXRZID0gKHsgaW5zZXRZIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgdG9wOiAke3h9O1xuICAgICAgYm90dG9tOiAke3h9O1xuICAgIGAsXG4gICAgdmFsOiBpbnNldFksXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHBvaW50ZXJFdmVudHMgPSAoeyBwb2ludGVyRXZlbnRzIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgcG9pbnRlci1ldmVudHM6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IHBvaW50ZXJFdmVudHMsXG4gIH0pO1xuXG5jb25zdCBjdXJzb3IgPSAoeyBjdXJzb3IgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICBjdXJzb3I6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGN1cnNvcixcbiAgfSk7XG5cbmNvbnN0IG9wYWNpdHkgPSAoeyBvcGFjaXR5IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgb3BhY2l0eTogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogb3BhY2l0eSxcbiAgfSk7XG5cbmNvbnN0IHRyYW5zaXRpb24gPSAoeyB0cmFuc2l0aW9uIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgdHJhbnNpdGlvbjogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogdHJhbnNpdGlvbixcbiAgfSk7XG5cbmV4cG9ydCBkZWZhdWx0IFtcbiAgdmlzaWJpbGl0eSxcbiAgZGlzcGxheSxcbiAgcG9zaXRpb24sXG4gIHpJbmRleCxcbiAgdG9wLFxuICByaWdodCxcbiAgYm90dG9tLFxuICBsZWZ0LFxuICBpbnNldCxcbiAgaW5zZXRYLFxuICBpbnNldFksXG4gIHBvaW50ZXJFdmVudHMsXG4gIGN1cnNvcixcbiAgb3BhY2l0eSxcbiAgdHJhbnNpdGlvbixcbl07XG4iXX0= */");
    },
    val: position
  });
};
var zIndex = function zIndex(_ref4) {
  var zIndex = _ref4.zIndex;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("z-index:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpc3BsYXlNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBNkJvQiIsImZpbGUiOiJkaXNwbGF5TWl4aW5zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3NzIH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XG5pbXBvcnQgeyByZXNwb25zaXZlUHJvcCB9IGZyb20gXCIuLi8uLi91dGlscy9yZXNwb25zaXZlUHJvcFwiO1xuXG5jb25zdCB2aXNpYmlsaXR5ID0gKHsgdmlzaWJpbGl0eSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+IGNzc2BcbiAgICAgIHZpc2liaWxpdHk6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IHZpc2liaWxpdHksXG4gIH0pO1xuXG5jb25zdCBkaXNwbGF5ID0gKHsgZGlzcGxheSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+IGNzc2BcbiAgICAgIGRpc3BsYXk6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGRpc3BsYXksXG4gIH0pO1xuXG5jb25zdCBwb3NpdGlvbiA9ICh7IHBvc2l0aW9uIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgcG9zaXRpb246ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IHBvc2l0aW9uLFxuICB9KTtcblxuY29uc3QgekluZGV4ID0gKHsgekluZGV4IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgei1pbmRleDogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogekluZGV4LFxuICB9KTtcblxuY29uc3QgdG9wID0gKHsgdG9wIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgdG9wOiAke3h9O1xuICAgIGAsXG4gICAgdmFsOiB0b3AsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHJpZ2h0ID0gKHsgcmlnaHQgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICByaWdodDogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogcmlnaHQsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5jb25zdCBib3R0b20gPSAoeyBib3R0b20gfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICBib3R0b206ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGJvdHRvbSxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbGVmdCA9ICh7IGxlZnQgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICBsZWZ0OiAke3h9O1xuICAgIGAsXG4gICAgdmFsOiBsZWZ0LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBpbnNldCA9ICh7IGluc2V0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgaW5zZXQ6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGluc2V0LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBpbnNldFggPSAoeyBpbnNldFggfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICBsZWZ0OiAke3h9O1xuICAgICAgcmlnaHQ6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGluc2V0WCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgaW5zZXRZID0gKHsgaW5zZXRZIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgdG9wOiAke3h9O1xuICAgICAgYm90dG9tOiAke3h9O1xuICAgIGAsXG4gICAgdmFsOiBpbnNldFksXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHBvaW50ZXJFdmVudHMgPSAoeyBwb2ludGVyRXZlbnRzIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgcG9pbnRlci1ldmVudHM6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IHBvaW50ZXJFdmVudHMsXG4gIH0pO1xuXG5jb25zdCBjdXJzb3IgPSAoeyBjdXJzb3IgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICBjdXJzb3I6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGN1cnNvcixcbiAgfSk7XG5cbmNvbnN0IG9wYWNpdHkgPSAoeyBvcGFjaXR5IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgb3BhY2l0eTogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogb3BhY2l0eSxcbiAgfSk7XG5cbmNvbnN0IHRyYW5zaXRpb24gPSAoeyB0cmFuc2l0aW9uIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgdHJhbnNpdGlvbjogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogdHJhbnNpdGlvbixcbiAgfSk7XG5cbmV4cG9ydCBkZWZhdWx0IFtcbiAgdmlzaWJpbGl0eSxcbiAgZGlzcGxheSxcbiAgcG9zaXRpb24sXG4gIHpJbmRleCxcbiAgdG9wLFxuICByaWdodCxcbiAgYm90dG9tLFxuICBsZWZ0LFxuICBpbnNldCxcbiAgaW5zZXRYLFxuICBpbnNldFksXG4gIHBvaW50ZXJFdmVudHMsXG4gIGN1cnNvcixcbiAgb3BhY2l0eSxcbiAgdHJhbnNpdGlvbixcbl07XG4iXX0= */");
    },
    val: zIndex
  });
};
var top = function top(_ref5) {
  var top = _ref5.top;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("top:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpc3BsYXlNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBcUNvQiIsImZpbGUiOiJkaXNwbGF5TWl4aW5zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3NzIH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XG5pbXBvcnQgeyByZXNwb25zaXZlUHJvcCB9IGZyb20gXCIuLi8uLi91dGlscy9yZXNwb25zaXZlUHJvcFwiO1xuXG5jb25zdCB2aXNpYmlsaXR5ID0gKHsgdmlzaWJpbGl0eSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+IGNzc2BcbiAgICAgIHZpc2liaWxpdHk6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IHZpc2liaWxpdHksXG4gIH0pO1xuXG5jb25zdCBkaXNwbGF5ID0gKHsgZGlzcGxheSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+IGNzc2BcbiAgICAgIGRpc3BsYXk6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGRpc3BsYXksXG4gIH0pO1xuXG5jb25zdCBwb3NpdGlvbiA9ICh7IHBvc2l0aW9uIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgcG9zaXRpb246ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IHBvc2l0aW9uLFxuICB9KTtcblxuY29uc3QgekluZGV4ID0gKHsgekluZGV4IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgei1pbmRleDogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogekluZGV4LFxuICB9KTtcblxuY29uc3QgdG9wID0gKHsgdG9wIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgdG9wOiAke3h9O1xuICAgIGAsXG4gICAgdmFsOiB0b3AsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHJpZ2h0ID0gKHsgcmlnaHQgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICByaWdodDogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogcmlnaHQsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5jb25zdCBib3R0b20gPSAoeyBib3R0b20gfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICBib3R0b206ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGJvdHRvbSxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbGVmdCA9ICh7IGxlZnQgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICBsZWZ0OiAke3h9O1xuICAgIGAsXG4gICAgdmFsOiBsZWZ0LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBpbnNldCA9ICh7IGluc2V0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgaW5zZXQ6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGluc2V0LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBpbnNldFggPSAoeyBpbnNldFggfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICBsZWZ0OiAke3h9O1xuICAgICAgcmlnaHQ6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGluc2V0WCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgaW5zZXRZID0gKHsgaW5zZXRZIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgdG9wOiAke3h9O1xuICAgICAgYm90dG9tOiAke3h9O1xuICAgIGAsXG4gICAgdmFsOiBpbnNldFksXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHBvaW50ZXJFdmVudHMgPSAoeyBwb2ludGVyRXZlbnRzIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgcG9pbnRlci1ldmVudHM6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IHBvaW50ZXJFdmVudHMsXG4gIH0pO1xuXG5jb25zdCBjdXJzb3IgPSAoeyBjdXJzb3IgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICBjdXJzb3I6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGN1cnNvcixcbiAgfSk7XG5cbmNvbnN0IG9wYWNpdHkgPSAoeyBvcGFjaXR5IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgb3BhY2l0eTogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogb3BhY2l0eSxcbiAgfSk7XG5cbmNvbnN0IHRyYW5zaXRpb24gPSAoeyB0cmFuc2l0aW9uIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgdHJhbnNpdGlvbjogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogdHJhbnNpdGlvbixcbiAgfSk7XG5cbmV4cG9ydCBkZWZhdWx0IFtcbiAgdmlzaWJpbGl0eSxcbiAgZGlzcGxheSxcbiAgcG9zaXRpb24sXG4gIHpJbmRleCxcbiAgdG9wLFxuICByaWdodCxcbiAgYm90dG9tLFxuICBsZWZ0LFxuICBpbnNldCxcbiAgaW5zZXRYLFxuICBpbnNldFksXG4gIHBvaW50ZXJFdmVudHMsXG4gIGN1cnNvcixcbiAgb3BhY2l0eSxcbiAgdHJhbnNpdGlvbixcbl07XG4iXX0= */");
    },
    val: top,
    interpolation: "rem"
  });
};
var right = function right(_ref6) {
  var right = _ref6.right;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("right:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpc3BsYXlNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBOENvQiIsImZpbGUiOiJkaXNwbGF5TWl4aW5zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3NzIH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XG5pbXBvcnQgeyByZXNwb25zaXZlUHJvcCB9IGZyb20gXCIuLi8uLi91dGlscy9yZXNwb25zaXZlUHJvcFwiO1xuXG5jb25zdCB2aXNpYmlsaXR5ID0gKHsgdmlzaWJpbGl0eSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+IGNzc2BcbiAgICAgIHZpc2liaWxpdHk6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IHZpc2liaWxpdHksXG4gIH0pO1xuXG5jb25zdCBkaXNwbGF5ID0gKHsgZGlzcGxheSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+IGNzc2BcbiAgICAgIGRpc3BsYXk6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGRpc3BsYXksXG4gIH0pO1xuXG5jb25zdCBwb3NpdGlvbiA9ICh7IHBvc2l0aW9uIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgcG9zaXRpb246ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IHBvc2l0aW9uLFxuICB9KTtcblxuY29uc3QgekluZGV4ID0gKHsgekluZGV4IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgei1pbmRleDogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogekluZGV4LFxuICB9KTtcblxuY29uc3QgdG9wID0gKHsgdG9wIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgdG9wOiAke3h9O1xuICAgIGAsXG4gICAgdmFsOiB0b3AsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHJpZ2h0ID0gKHsgcmlnaHQgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICByaWdodDogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogcmlnaHQsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5jb25zdCBib3R0b20gPSAoeyBib3R0b20gfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICBib3R0b206ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGJvdHRvbSxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbGVmdCA9ICh7IGxlZnQgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICBsZWZ0OiAke3h9O1xuICAgIGAsXG4gICAgdmFsOiBsZWZ0LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBpbnNldCA9ICh7IGluc2V0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgaW5zZXQ6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGluc2V0LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBpbnNldFggPSAoeyBpbnNldFggfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICBsZWZ0OiAke3h9O1xuICAgICAgcmlnaHQ6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGluc2V0WCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgaW5zZXRZID0gKHsgaW5zZXRZIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgdG9wOiAke3h9O1xuICAgICAgYm90dG9tOiAke3h9O1xuICAgIGAsXG4gICAgdmFsOiBpbnNldFksXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHBvaW50ZXJFdmVudHMgPSAoeyBwb2ludGVyRXZlbnRzIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgcG9pbnRlci1ldmVudHM6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IHBvaW50ZXJFdmVudHMsXG4gIH0pO1xuXG5jb25zdCBjdXJzb3IgPSAoeyBjdXJzb3IgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICBjdXJzb3I6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGN1cnNvcixcbiAgfSk7XG5cbmNvbnN0IG9wYWNpdHkgPSAoeyBvcGFjaXR5IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgb3BhY2l0eTogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogb3BhY2l0eSxcbiAgfSk7XG5cbmNvbnN0IHRyYW5zaXRpb24gPSAoeyB0cmFuc2l0aW9uIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgdHJhbnNpdGlvbjogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogdHJhbnNpdGlvbixcbiAgfSk7XG5cbmV4cG9ydCBkZWZhdWx0IFtcbiAgdmlzaWJpbGl0eSxcbiAgZGlzcGxheSxcbiAgcG9zaXRpb24sXG4gIHpJbmRleCxcbiAgdG9wLFxuICByaWdodCxcbiAgYm90dG9tLFxuICBsZWZ0LFxuICBpbnNldCxcbiAgaW5zZXRYLFxuICBpbnNldFksXG4gIHBvaW50ZXJFdmVudHMsXG4gIGN1cnNvcixcbiAgb3BhY2l0eSxcbiAgdHJhbnNpdGlvbixcbl07XG4iXX0= */");
    },
    val: right,
    interpolation: "rem"
  });
};
var bottom = function bottom(_ref7) {
  var bottom = _ref7.bottom;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("bottom:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpc3BsYXlNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBc0RvQiIsImZpbGUiOiJkaXNwbGF5TWl4aW5zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3NzIH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XG5pbXBvcnQgeyByZXNwb25zaXZlUHJvcCB9IGZyb20gXCIuLi8uLi91dGlscy9yZXNwb25zaXZlUHJvcFwiO1xuXG5jb25zdCB2aXNpYmlsaXR5ID0gKHsgdmlzaWJpbGl0eSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+IGNzc2BcbiAgICAgIHZpc2liaWxpdHk6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IHZpc2liaWxpdHksXG4gIH0pO1xuXG5jb25zdCBkaXNwbGF5ID0gKHsgZGlzcGxheSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+IGNzc2BcbiAgICAgIGRpc3BsYXk6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGRpc3BsYXksXG4gIH0pO1xuXG5jb25zdCBwb3NpdGlvbiA9ICh7IHBvc2l0aW9uIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgcG9zaXRpb246ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IHBvc2l0aW9uLFxuICB9KTtcblxuY29uc3QgekluZGV4ID0gKHsgekluZGV4IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgei1pbmRleDogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogekluZGV4LFxuICB9KTtcblxuY29uc3QgdG9wID0gKHsgdG9wIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgdG9wOiAke3h9O1xuICAgIGAsXG4gICAgdmFsOiB0b3AsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHJpZ2h0ID0gKHsgcmlnaHQgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICByaWdodDogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogcmlnaHQsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5jb25zdCBib3R0b20gPSAoeyBib3R0b20gfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICBib3R0b206ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGJvdHRvbSxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbGVmdCA9ICh7IGxlZnQgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICBsZWZ0OiAke3h9O1xuICAgIGAsXG4gICAgdmFsOiBsZWZ0LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBpbnNldCA9ICh7IGluc2V0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgaW5zZXQ6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGluc2V0LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBpbnNldFggPSAoeyBpbnNldFggfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICBsZWZ0OiAke3h9O1xuICAgICAgcmlnaHQ6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGluc2V0WCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgaW5zZXRZID0gKHsgaW5zZXRZIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgdG9wOiAke3h9O1xuICAgICAgYm90dG9tOiAke3h9O1xuICAgIGAsXG4gICAgdmFsOiBpbnNldFksXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHBvaW50ZXJFdmVudHMgPSAoeyBwb2ludGVyRXZlbnRzIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgcG9pbnRlci1ldmVudHM6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IHBvaW50ZXJFdmVudHMsXG4gIH0pO1xuXG5jb25zdCBjdXJzb3IgPSAoeyBjdXJzb3IgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICBjdXJzb3I6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGN1cnNvcixcbiAgfSk7XG5cbmNvbnN0IG9wYWNpdHkgPSAoeyBvcGFjaXR5IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgb3BhY2l0eTogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogb3BhY2l0eSxcbiAgfSk7XG5cbmNvbnN0IHRyYW5zaXRpb24gPSAoeyB0cmFuc2l0aW9uIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgdHJhbnNpdGlvbjogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogdHJhbnNpdGlvbixcbiAgfSk7XG5cbmV4cG9ydCBkZWZhdWx0IFtcbiAgdmlzaWJpbGl0eSxcbiAgZGlzcGxheSxcbiAgcG9zaXRpb24sXG4gIHpJbmRleCxcbiAgdG9wLFxuICByaWdodCxcbiAgYm90dG9tLFxuICBsZWZ0LFxuICBpbnNldCxcbiAgaW5zZXRYLFxuICBpbnNldFksXG4gIHBvaW50ZXJFdmVudHMsXG4gIGN1cnNvcixcbiAgb3BhY2l0eSxcbiAgdHJhbnNpdGlvbixcbl07XG4iXX0= */");
    },
    val: bottom,
    interpolation: "rem"
  });
};
var left = function left(_ref8) {
  var left = _ref8.left;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("left:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpc3BsYXlNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBK0RvQiIsImZpbGUiOiJkaXNwbGF5TWl4aW5zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3NzIH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XG5pbXBvcnQgeyByZXNwb25zaXZlUHJvcCB9IGZyb20gXCIuLi8uLi91dGlscy9yZXNwb25zaXZlUHJvcFwiO1xuXG5jb25zdCB2aXNpYmlsaXR5ID0gKHsgdmlzaWJpbGl0eSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+IGNzc2BcbiAgICAgIHZpc2liaWxpdHk6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IHZpc2liaWxpdHksXG4gIH0pO1xuXG5jb25zdCBkaXNwbGF5ID0gKHsgZGlzcGxheSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+IGNzc2BcbiAgICAgIGRpc3BsYXk6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGRpc3BsYXksXG4gIH0pO1xuXG5jb25zdCBwb3NpdGlvbiA9ICh7IHBvc2l0aW9uIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgcG9zaXRpb246ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IHBvc2l0aW9uLFxuICB9KTtcblxuY29uc3QgekluZGV4ID0gKHsgekluZGV4IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgei1pbmRleDogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogekluZGV4LFxuICB9KTtcblxuY29uc3QgdG9wID0gKHsgdG9wIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgdG9wOiAke3h9O1xuICAgIGAsXG4gICAgdmFsOiB0b3AsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHJpZ2h0ID0gKHsgcmlnaHQgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICByaWdodDogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogcmlnaHQsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5jb25zdCBib3R0b20gPSAoeyBib3R0b20gfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICBib3R0b206ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGJvdHRvbSxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbGVmdCA9ICh7IGxlZnQgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICBsZWZ0OiAke3h9O1xuICAgIGAsXG4gICAgdmFsOiBsZWZ0LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBpbnNldCA9ICh7IGluc2V0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgaW5zZXQ6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGluc2V0LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBpbnNldFggPSAoeyBpbnNldFggfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICBsZWZ0OiAke3h9O1xuICAgICAgcmlnaHQ6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGluc2V0WCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgaW5zZXRZID0gKHsgaW5zZXRZIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgdG9wOiAke3h9O1xuICAgICAgYm90dG9tOiAke3h9O1xuICAgIGAsXG4gICAgdmFsOiBpbnNldFksXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHBvaW50ZXJFdmVudHMgPSAoeyBwb2ludGVyRXZlbnRzIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgcG9pbnRlci1ldmVudHM6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IHBvaW50ZXJFdmVudHMsXG4gIH0pO1xuXG5jb25zdCBjdXJzb3IgPSAoeyBjdXJzb3IgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICBjdXJzb3I6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGN1cnNvcixcbiAgfSk7XG5cbmNvbnN0IG9wYWNpdHkgPSAoeyBvcGFjaXR5IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgb3BhY2l0eTogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogb3BhY2l0eSxcbiAgfSk7XG5cbmNvbnN0IHRyYW5zaXRpb24gPSAoeyB0cmFuc2l0aW9uIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgdHJhbnNpdGlvbjogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogdHJhbnNpdGlvbixcbiAgfSk7XG5cbmV4cG9ydCBkZWZhdWx0IFtcbiAgdmlzaWJpbGl0eSxcbiAgZGlzcGxheSxcbiAgcG9zaXRpb24sXG4gIHpJbmRleCxcbiAgdG9wLFxuICByaWdodCxcbiAgYm90dG9tLFxuICBsZWZ0LFxuICBpbnNldCxcbiAgaW5zZXRYLFxuICBpbnNldFksXG4gIHBvaW50ZXJFdmVudHMsXG4gIGN1cnNvcixcbiAgb3BhY2l0eSxcbiAgdHJhbnNpdGlvbixcbl07XG4iXX0= */");
    },
    val: left,
    interpolation: "rem"
  });
};
var inset = function inset(_ref9) {
  var inset = _ref9.inset;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("inset:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpc3BsYXlNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBd0VvQiIsImZpbGUiOiJkaXNwbGF5TWl4aW5zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3NzIH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XG5pbXBvcnQgeyByZXNwb25zaXZlUHJvcCB9IGZyb20gXCIuLi8uLi91dGlscy9yZXNwb25zaXZlUHJvcFwiO1xuXG5jb25zdCB2aXNpYmlsaXR5ID0gKHsgdmlzaWJpbGl0eSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+IGNzc2BcbiAgICAgIHZpc2liaWxpdHk6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IHZpc2liaWxpdHksXG4gIH0pO1xuXG5jb25zdCBkaXNwbGF5ID0gKHsgZGlzcGxheSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+IGNzc2BcbiAgICAgIGRpc3BsYXk6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGRpc3BsYXksXG4gIH0pO1xuXG5jb25zdCBwb3NpdGlvbiA9ICh7IHBvc2l0aW9uIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgcG9zaXRpb246ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IHBvc2l0aW9uLFxuICB9KTtcblxuY29uc3QgekluZGV4ID0gKHsgekluZGV4IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgei1pbmRleDogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogekluZGV4LFxuICB9KTtcblxuY29uc3QgdG9wID0gKHsgdG9wIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgdG9wOiAke3h9O1xuICAgIGAsXG4gICAgdmFsOiB0b3AsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHJpZ2h0ID0gKHsgcmlnaHQgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICByaWdodDogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogcmlnaHQsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5jb25zdCBib3R0b20gPSAoeyBib3R0b20gfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICBib3R0b206ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGJvdHRvbSxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbGVmdCA9ICh7IGxlZnQgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICBsZWZ0OiAke3h9O1xuICAgIGAsXG4gICAgdmFsOiBsZWZ0LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBpbnNldCA9ICh7IGluc2V0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgaW5zZXQ6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGluc2V0LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBpbnNldFggPSAoeyBpbnNldFggfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICBsZWZ0OiAke3h9O1xuICAgICAgcmlnaHQ6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGluc2V0WCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgaW5zZXRZID0gKHsgaW5zZXRZIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgdG9wOiAke3h9O1xuICAgICAgYm90dG9tOiAke3h9O1xuICAgIGAsXG4gICAgdmFsOiBpbnNldFksXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHBvaW50ZXJFdmVudHMgPSAoeyBwb2ludGVyRXZlbnRzIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgcG9pbnRlci1ldmVudHM6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IHBvaW50ZXJFdmVudHMsXG4gIH0pO1xuXG5jb25zdCBjdXJzb3IgPSAoeyBjdXJzb3IgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICBjdXJzb3I6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGN1cnNvcixcbiAgfSk7XG5cbmNvbnN0IG9wYWNpdHkgPSAoeyBvcGFjaXR5IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgb3BhY2l0eTogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogb3BhY2l0eSxcbiAgfSk7XG5cbmNvbnN0IHRyYW5zaXRpb24gPSAoeyB0cmFuc2l0aW9uIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgdHJhbnNpdGlvbjogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogdHJhbnNpdGlvbixcbiAgfSk7XG5cbmV4cG9ydCBkZWZhdWx0IFtcbiAgdmlzaWJpbGl0eSxcbiAgZGlzcGxheSxcbiAgcG9zaXRpb24sXG4gIHpJbmRleCxcbiAgdG9wLFxuICByaWdodCxcbiAgYm90dG9tLFxuICBsZWZ0LFxuICBpbnNldCxcbiAgaW5zZXRYLFxuICBpbnNldFksXG4gIHBvaW50ZXJFdmVudHMsXG4gIGN1cnNvcixcbiAgb3BhY2l0eSxcbiAgdHJhbnNpdGlvbixcbl07XG4iXX0= */");
    },
    val: inset,
    interpolation: "rem"
  });
};
var insetX = function insetX(_ref10) {
  var insetX = _ref10.insetX;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("left:", x, ";right:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpc3BsYXlNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBaUZvQiIsImZpbGUiOiJkaXNwbGF5TWl4aW5zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3NzIH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XG5pbXBvcnQgeyByZXNwb25zaXZlUHJvcCB9IGZyb20gXCIuLi8uLi91dGlscy9yZXNwb25zaXZlUHJvcFwiO1xuXG5jb25zdCB2aXNpYmlsaXR5ID0gKHsgdmlzaWJpbGl0eSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+IGNzc2BcbiAgICAgIHZpc2liaWxpdHk6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IHZpc2liaWxpdHksXG4gIH0pO1xuXG5jb25zdCBkaXNwbGF5ID0gKHsgZGlzcGxheSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+IGNzc2BcbiAgICAgIGRpc3BsYXk6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGRpc3BsYXksXG4gIH0pO1xuXG5jb25zdCBwb3NpdGlvbiA9ICh7IHBvc2l0aW9uIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgcG9zaXRpb246ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IHBvc2l0aW9uLFxuICB9KTtcblxuY29uc3QgekluZGV4ID0gKHsgekluZGV4IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgei1pbmRleDogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogekluZGV4LFxuICB9KTtcblxuY29uc3QgdG9wID0gKHsgdG9wIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgdG9wOiAke3h9O1xuICAgIGAsXG4gICAgdmFsOiB0b3AsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHJpZ2h0ID0gKHsgcmlnaHQgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICByaWdodDogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogcmlnaHQsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5jb25zdCBib3R0b20gPSAoeyBib3R0b20gfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICBib3R0b206ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGJvdHRvbSxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbGVmdCA9ICh7IGxlZnQgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICBsZWZ0OiAke3h9O1xuICAgIGAsXG4gICAgdmFsOiBsZWZ0LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBpbnNldCA9ICh7IGluc2V0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgaW5zZXQ6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGluc2V0LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBpbnNldFggPSAoeyBpbnNldFggfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICBsZWZ0OiAke3h9O1xuICAgICAgcmlnaHQ6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGluc2V0WCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgaW5zZXRZID0gKHsgaW5zZXRZIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgdG9wOiAke3h9O1xuICAgICAgYm90dG9tOiAke3h9O1xuICAgIGAsXG4gICAgdmFsOiBpbnNldFksXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHBvaW50ZXJFdmVudHMgPSAoeyBwb2ludGVyRXZlbnRzIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgcG9pbnRlci1ldmVudHM6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IHBvaW50ZXJFdmVudHMsXG4gIH0pO1xuXG5jb25zdCBjdXJzb3IgPSAoeyBjdXJzb3IgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICBjdXJzb3I6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGN1cnNvcixcbiAgfSk7XG5cbmNvbnN0IG9wYWNpdHkgPSAoeyBvcGFjaXR5IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgb3BhY2l0eTogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogb3BhY2l0eSxcbiAgfSk7XG5cbmNvbnN0IHRyYW5zaXRpb24gPSAoeyB0cmFuc2l0aW9uIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgdHJhbnNpdGlvbjogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogdHJhbnNpdGlvbixcbiAgfSk7XG5cbmV4cG9ydCBkZWZhdWx0IFtcbiAgdmlzaWJpbGl0eSxcbiAgZGlzcGxheSxcbiAgcG9zaXRpb24sXG4gIHpJbmRleCxcbiAgdG9wLFxuICByaWdodCxcbiAgYm90dG9tLFxuICBsZWZ0LFxuICBpbnNldCxcbiAgaW5zZXRYLFxuICBpbnNldFksXG4gIHBvaW50ZXJFdmVudHMsXG4gIGN1cnNvcixcbiAgb3BhY2l0eSxcbiAgdHJhbnNpdGlvbixcbl07XG4iXX0= */");
    },
    val: insetX,
    interpolation: "rem"
  });
};
var insetY = function insetY(_ref11) {
  var insetY = _ref11.insetY;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("top:", x, ";bottom:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpc3BsYXlNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBMkZvQiIsImZpbGUiOiJkaXNwbGF5TWl4aW5zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3NzIH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XG5pbXBvcnQgeyByZXNwb25zaXZlUHJvcCB9IGZyb20gXCIuLi8uLi91dGlscy9yZXNwb25zaXZlUHJvcFwiO1xuXG5jb25zdCB2aXNpYmlsaXR5ID0gKHsgdmlzaWJpbGl0eSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+IGNzc2BcbiAgICAgIHZpc2liaWxpdHk6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IHZpc2liaWxpdHksXG4gIH0pO1xuXG5jb25zdCBkaXNwbGF5ID0gKHsgZGlzcGxheSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+IGNzc2BcbiAgICAgIGRpc3BsYXk6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGRpc3BsYXksXG4gIH0pO1xuXG5jb25zdCBwb3NpdGlvbiA9ICh7IHBvc2l0aW9uIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgcG9zaXRpb246ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IHBvc2l0aW9uLFxuICB9KTtcblxuY29uc3QgekluZGV4ID0gKHsgekluZGV4IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgei1pbmRleDogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogekluZGV4LFxuICB9KTtcblxuY29uc3QgdG9wID0gKHsgdG9wIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgdG9wOiAke3h9O1xuICAgIGAsXG4gICAgdmFsOiB0b3AsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHJpZ2h0ID0gKHsgcmlnaHQgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICByaWdodDogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogcmlnaHQsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5jb25zdCBib3R0b20gPSAoeyBib3R0b20gfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICBib3R0b206ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGJvdHRvbSxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbGVmdCA9ICh7IGxlZnQgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICBsZWZ0OiAke3h9O1xuICAgIGAsXG4gICAgdmFsOiBsZWZ0LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBpbnNldCA9ICh7IGluc2V0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgaW5zZXQ6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGluc2V0LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBpbnNldFggPSAoeyBpbnNldFggfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICBsZWZ0OiAke3h9O1xuICAgICAgcmlnaHQ6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGluc2V0WCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgaW5zZXRZID0gKHsgaW5zZXRZIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgdG9wOiAke3h9O1xuICAgICAgYm90dG9tOiAke3h9O1xuICAgIGAsXG4gICAgdmFsOiBpbnNldFksXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHBvaW50ZXJFdmVudHMgPSAoeyBwb2ludGVyRXZlbnRzIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgcG9pbnRlci1ldmVudHM6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IHBvaW50ZXJFdmVudHMsXG4gIH0pO1xuXG5jb25zdCBjdXJzb3IgPSAoeyBjdXJzb3IgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICBjdXJzb3I6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGN1cnNvcixcbiAgfSk7XG5cbmNvbnN0IG9wYWNpdHkgPSAoeyBvcGFjaXR5IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgb3BhY2l0eTogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogb3BhY2l0eSxcbiAgfSk7XG5cbmNvbnN0IHRyYW5zaXRpb24gPSAoeyB0cmFuc2l0aW9uIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgdHJhbnNpdGlvbjogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogdHJhbnNpdGlvbixcbiAgfSk7XG5cbmV4cG9ydCBkZWZhdWx0IFtcbiAgdmlzaWJpbGl0eSxcbiAgZGlzcGxheSxcbiAgcG9zaXRpb24sXG4gIHpJbmRleCxcbiAgdG9wLFxuICByaWdodCxcbiAgYm90dG9tLFxuICBsZWZ0LFxuICBpbnNldCxcbiAgaW5zZXRYLFxuICBpbnNldFksXG4gIHBvaW50ZXJFdmVudHMsXG4gIGN1cnNvcixcbiAgb3BhY2l0eSxcbiAgdHJhbnNpdGlvbixcbl07XG4iXX0= */");
    },
    val: insetY,
    interpolation: "rem"
  });
};
var pointerEvents = function pointerEvents(_ref12) {
  var pointerEvents = _ref12.pointerEvents;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("pointer-events:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpc3BsYXlNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBcUdvQiIsImZpbGUiOiJkaXNwbGF5TWl4aW5zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3NzIH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XG5pbXBvcnQgeyByZXNwb25zaXZlUHJvcCB9IGZyb20gXCIuLi8uLi91dGlscy9yZXNwb25zaXZlUHJvcFwiO1xuXG5jb25zdCB2aXNpYmlsaXR5ID0gKHsgdmlzaWJpbGl0eSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+IGNzc2BcbiAgICAgIHZpc2liaWxpdHk6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IHZpc2liaWxpdHksXG4gIH0pO1xuXG5jb25zdCBkaXNwbGF5ID0gKHsgZGlzcGxheSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+IGNzc2BcbiAgICAgIGRpc3BsYXk6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGRpc3BsYXksXG4gIH0pO1xuXG5jb25zdCBwb3NpdGlvbiA9ICh7IHBvc2l0aW9uIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgcG9zaXRpb246ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IHBvc2l0aW9uLFxuICB9KTtcblxuY29uc3QgekluZGV4ID0gKHsgekluZGV4IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgei1pbmRleDogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogekluZGV4LFxuICB9KTtcblxuY29uc3QgdG9wID0gKHsgdG9wIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgdG9wOiAke3h9O1xuICAgIGAsXG4gICAgdmFsOiB0b3AsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHJpZ2h0ID0gKHsgcmlnaHQgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICByaWdodDogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogcmlnaHQsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5jb25zdCBib3R0b20gPSAoeyBib3R0b20gfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICBib3R0b206ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGJvdHRvbSxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbGVmdCA9ICh7IGxlZnQgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICBsZWZ0OiAke3h9O1xuICAgIGAsXG4gICAgdmFsOiBsZWZ0LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBpbnNldCA9ICh7IGluc2V0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgaW5zZXQ6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGluc2V0LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBpbnNldFggPSAoeyBpbnNldFggfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICBsZWZ0OiAke3h9O1xuICAgICAgcmlnaHQ6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGluc2V0WCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgaW5zZXRZID0gKHsgaW5zZXRZIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgdG9wOiAke3h9O1xuICAgICAgYm90dG9tOiAke3h9O1xuICAgIGAsXG4gICAgdmFsOiBpbnNldFksXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHBvaW50ZXJFdmVudHMgPSAoeyBwb2ludGVyRXZlbnRzIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgcG9pbnRlci1ldmVudHM6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IHBvaW50ZXJFdmVudHMsXG4gIH0pO1xuXG5jb25zdCBjdXJzb3IgPSAoeyBjdXJzb3IgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICBjdXJzb3I6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGN1cnNvcixcbiAgfSk7XG5cbmNvbnN0IG9wYWNpdHkgPSAoeyBvcGFjaXR5IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgb3BhY2l0eTogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogb3BhY2l0eSxcbiAgfSk7XG5cbmNvbnN0IHRyYW5zaXRpb24gPSAoeyB0cmFuc2l0aW9uIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgdHJhbnNpdGlvbjogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogdHJhbnNpdGlvbixcbiAgfSk7XG5cbmV4cG9ydCBkZWZhdWx0IFtcbiAgdmlzaWJpbGl0eSxcbiAgZGlzcGxheSxcbiAgcG9zaXRpb24sXG4gIHpJbmRleCxcbiAgdG9wLFxuICByaWdodCxcbiAgYm90dG9tLFxuICBsZWZ0LFxuICBpbnNldCxcbiAgaW5zZXRYLFxuICBpbnNldFksXG4gIHBvaW50ZXJFdmVudHMsXG4gIGN1cnNvcixcbiAgb3BhY2l0eSxcbiAgdHJhbnNpdGlvbixcbl07XG4iXX0= */");
    },
    val: pointerEvents
  });
};
var cursor = function cursor(_ref13) {
  var cursor = _ref13.cursor;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("cursor:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpc3BsYXlNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBNkdvQiIsImZpbGUiOiJkaXNwbGF5TWl4aW5zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3NzIH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XG5pbXBvcnQgeyByZXNwb25zaXZlUHJvcCB9IGZyb20gXCIuLi8uLi91dGlscy9yZXNwb25zaXZlUHJvcFwiO1xuXG5jb25zdCB2aXNpYmlsaXR5ID0gKHsgdmlzaWJpbGl0eSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+IGNzc2BcbiAgICAgIHZpc2liaWxpdHk6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IHZpc2liaWxpdHksXG4gIH0pO1xuXG5jb25zdCBkaXNwbGF5ID0gKHsgZGlzcGxheSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+IGNzc2BcbiAgICAgIGRpc3BsYXk6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGRpc3BsYXksXG4gIH0pO1xuXG5jb25zdCBwb3NpdGlvbiA9ICh7IHBvc2l0aW9uIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgcG9zaXRpb246ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IHBvc2l0aW9uLFxuICB9KTtcblxuY29uc3QgekluZGV4ID0gKHsgekluZGV4IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgei1pbmRleDogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogekluZGV4LFxuICB9KTtcblxuY29uc3QgdG9wID0gKHsgdG9wIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgdG9wOiAke3h9O1xuICAgIGAsXG4gICAgdmFsOiB0b3AsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHJpZ2h0ID0gKHsgcmlnaHQgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICByaWdodDogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogcmlnaHQsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5jb25zdCBib3R0b20gPSAoeyBib3R0b20gfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICBib3R0b206ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGJvdHRvbSxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbGVmdCA9ICh7IGxlZnQgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICBsZWZ0OiAke3h9O1xuICAgIGAsXG4gICAgdmFsOiBsZWZ0LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBpbnNldCA9ICh7IGluc2V0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgaW5zZXQ6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGluc2V0LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBpbnNldFggPSAoeyBpbnNldFggfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICBsZWZ0OiAke3h9O1xuICAgICAgcmlnaHQ6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGluc2V0WCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgaW5zZXRZID0gKHsgaW5zZXRZIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgdG9wOiAke3h9O1xuICAgICAgYm90dG9tOiAke3h9O1xuICAgIGAsXG4gICAgdmFsOiBpbnNldFksXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHBvaW50ZXJFdmVudHMgPSAoeyBwb2ludGVyRXZlbnRzIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgcG9pbnRlci1ldmVudHM6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IHBvaW50ZXJFdmVudHMsXG4gIH0pO1xuXG5jb25zdCBjdXJzb3IgPSAoeyBjdXJzb3IgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICBjdXJzb3I6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGN1cnNvcixcbiAgfSk7XG5cbmNvbnN0IG9wYWNpdHkgPSAoeyBvcGFjaXR5IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgb3BhY2l0eTogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogb3BhY2l0eSxcbiAgfSk7XG5cbmNvbnN0IHRyYW5zaXRpb24gPSAoeyB0cmFuc2l0aW9uIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgdHJhbnNpdGlvbjogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogdHJhbnNpdGlvbixcbiAgfSk7XG5cbmV4cG9ydCBkZWZhdWx0IFtcbiAgdmlzaWJpbGl0eSxcbiAgZGlzcGxheSxcbiAgcG9zaXRpb24sXG4gIHpJbmRleCxcbiAgdG9wLFxuICByaWdodCxcbiAgYm90dG9tLFxuICBsZWZ0LFxuICBpbnNldCxcbiAgaW5zZXRYLFxuICBpbnNldFksXG4gIHBvaW50ZXJFdmVudHMsXG4gIGN1cnNvcixcbiAgb3BhY2l0eSxcbiAgdHJhbnNpdGlvbixcbl07XG4iXX0= */");
    },
    val: cursor
  });
};
var opacity = function opacity(_ref14) {
  var opacity = _ref14.opacity;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("opacity:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpc3BsYXlNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBcUhvQiIsImZpbGUiOiJkaXNwbGF5TWl4aW5zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3NzIH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XG5pbXBvcnQgeyByZXNwb25zaXZlUHJvcCB9IGZyb20gXCIuLi8uLi91dGlscy9yZXNwb25zaXZlUHJvcFwiO1xuXG5jb25zdCB2aXNpYmlsaXR5ID0gKHsgdmlzaWJpbGl0eSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+IGNzc2BcbiAgICAgIHZpc2liaWxpdHk6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IHZpc2liaWxpdHksXG4gIH0pO1xuXG5jb25zdCBkaXNwbGF5ID0gKHsgZGlzcGxheSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+IGNzc2BcbiAgICAgIGRpc3BsYXk6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGRpc3BsYXksXG4gIH0pO1xuXG5jb25zdCBwb3NpdGlvbiA9ICh7IHBvc2l0aW9uIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgcG9zaXRpb246ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IHBvc2l0aW9uLFxuICB9KTtcblxuY29uc3QgekluZGV4ID0gKHsgekluZGV4IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgei1pbmRleDogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogekluZGV4LFxuICB9KTtcblxuY29uc3QgdG9wID0gKHsgdG9wIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgdG9wOiAke3h9O1xuICAgIGAsXG4gICAgdmFsOiB0b3AsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHJpZ2h0ID0gKHsgcmlnaHQgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICByaWdodDogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogcmlnaHQsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5jb25zdCBib3R0b20gPSAoeyBib3R0b20gfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICBib3R0b206ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGJvdHRvbSxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbGVmdCA9ICh7IGxlZnQgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICBsZWZ0OiAke3h9O1xuICAgIGAsXG4gICAgdmFsOiBsZWZ0LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBpbnNldCA9ICh7IGluc2V0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgaW5zZXQ6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGluc2V0LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBpbnNldFggPSAoeyBpbnNldFggfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICBsZWZ0OiAke3h9O1xuICAgICAgcmlnaHQ6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGluc2V0WCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgaW5zZXRZID0gKHsgaW5zZXRZIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgdG9wOiAke3h9O1xuICAgICAgYm90dG9tOiAke3h9O1xuICAgIGAsXG4gICAgdmFsOiBpbnNldFksXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHBvaW50ZXJFdmVudHMgPSAoeyBwb2ludGVyRXZlbnRzIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgcG9pbnRlci1ldmVudHM6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IHBvaW50ZXJFdmVudHMsXG4gIH0pO1xuXG5jb25zdCBjdXJzb3IgPSAoeyBjdXJzb3IgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICBjdXJzb3I6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGN1cnNvcixcbiAgfSk7XG5cbmNvbnN0IG9wYWNpdHkgPSAoeyBvcGFjaXR5IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgb3BhY2l0eTogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogb3BhY2l0eSxcbiAgfSk7XG5cbmNvbnN0IHRyYW5zaXRpb24gPSAoeyB0cmFuc2l0aW9uIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgdHJhbnNpdGlvbjogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogdHJhbnNpdGlvbixcbiAgfSk7XG5cbmV4cG9ydCBkZWZhdWx0IFtcbiAgdmlzaWJpbGl0eSxcbiAgZGlzcGxheSxcbiAgcG9zaXRpb24sXG4gIHpJbmRleCxcbiAgdG9wLFxuICByaWdodCxcbiAgYm90dG9tLFxuICBsZWZ0LFxuICBpbnNldCxcbiAgaW5zZXRYLFxuICBpbnNldFksXG4gIHBvaW50ZXJFdmVudHMsXG4gIGN1cnNvcixcbiAgb3BhY2l0eSxcbiAgdHJhbnNpdGlvbixcbl07XG4iXX0= */");
    },
    val: opacity
  });
};
var transition = function transition(_ref15) {
  var transition = _ref15.transition;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("transition:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpc3BsYXlNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBNkhvQiIsImZpbGUiOiJkaXNwbGF5TWl4aW5zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3NzIH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XG5pbXBvcnQgeyByZXNwb25zaXZlUHJvcCB9IGZyb20gXCIuLi8uLi91dGlscy9yZXNwb25zaXZlUHJvcFwiO1xuXG5jb25zdCB2aXNpYmlsaXR5ID0gKHsgdmlzaWJpbGl0eSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+IGNzc2BcbiAgICAgIHZpc2liaWxpdHk6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IHZpc2liaWxpdHksXG4gIH0pO1xuXG5jb25zdCBkaXNwbGF5ID0gKHsgZGlzcGxheSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+IGNzc2BcbiAgICAgIGRpc3BsYXk6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGRpc3BsYXksXG4gIH0pO1xuXG5jb25zdCBwb3NpdGlvbiA9ICh7IHBvc2l0aW9uIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgcG9zaXRpb246ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IHBvc2l0aW9uLFxuICB9KTtcblxuY29uc3QgekluZGV4ID0gKHsgekluZGV4IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgei1pbmRleDogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogekluZGV4LFxuICB9KTtcblxuY29uc3QgdG9wID0gKHsgdG9wIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgdG9wOiAke3h9O1xuICAgIGAsXG4gICAgdmFsOiB0b3AsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHJpZ2h0ID0gKHsgcmlnaHQgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICByaWdodDogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogcmlnaHQsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5jb25zdCBib3R0b20gPSAoeyBib3R0b20gfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICBib3R0b206ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGJvdHRvbSxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbGVmdCA9ICh7IGxlZnQgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICBsZWZ0OiAke3h9O1xuICAgIGAsXG4gICAgdmFsOiBsZWZ0LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBpbnNldCA9ICh7IGluc2V0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgaW5zZXQ6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGluc2V0LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBpbnNldFggPSAoeyBpbnNldFggfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICBsZWZ0OiAke3h9O1xuICAgICAgcmlnaHQ6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGluc2V0WCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgaW5zZXRZID0gKHsgaW5zZXRZIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgdG9wOiAke3h9O1xuICAgICAgYm90dG9tOiAke3h9O1xuICAgIGAsXG4gICAgdmFsOiBpbnNldFksXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHBvaW50ZXJFdmVudHMgPSAoeyBwb2ludGVyRXZlbnRzIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgcG9pbnRlci1ldmVudHM6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IHBvaW50ZXJFdmVudHMsXG4gIH0pO1xuXG5jb25zdCBjdXJzb3IgPSAoeyBjdXJzb3IgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICBjdXJzb3I6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGN1cnNvcixcbiAgfSk7XG5cbmNvbnN0IG9wYWNpdHkgPSAoeyBvcGFjaXR5IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgb3BhY2l0eTogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogb3BhY2l0eSxcbiAgfSk7XG5cbmNvbnN0IHRyYW5zaXRpb24gPSAoeyB0cmFuc2l0aW9uIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgdHJhbnNpdGlvbjogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogdHJhbnNpdGlvbixcbiAgfSk7XG5cbmV4cG9ydCBkZWZhdWx0IFtcbiAgdmlzaWJpbGl0eSxcbiAgZGlzcGxheSxcbiAgcG9zaXRpb24sXG4gIHpJbmRleCxcbiAgdG9wLFxuICByaWdodCxcbiAgYm90dG9tLFxuICBsZWZ0LFxuICBpbnNldCxcbiAgaW5zZXRYLFxuICBpbnNldFksXG4gIHBvaW50ZXJFdmVudHMsXG4gIGN1cnNvcixcbiAgb3BhY2l0eSxcbiAgdHJhbnNpdGlvbixcbl07XG4iXX0= */");
    },
    val: transition
  });
};
var displayMixins = [visibility, display, position, zIndex, top, right, bottom, left, inset, insetX, insetY, pointerEvents, cursor, opacity, transition];

var transform = function transform(_ref) {
  var transform = _ref.transform;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("transform:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRhaW5lck1peGlucy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFLb0IiLCJmaWxlIjoiY29udGFpbmVyTWl4aW5zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3NzIH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XG5pbXBvcnQgeyByZXNwb25zaXZlUHJvcCB9IGZyb20gXCIuLi8uLi91dGlscy9yZXNwb25zaXZlUHJvcFwiO1xuXG5jb25zdCB0cmFuc2Zvcm0gPSAoeyB0cmFuc2Zvcm0gfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICB0cmFuc2Zvcm06ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IHRyYW5zZm9ybSxcbiAgfSk7XG5cbmNvbnN0IGJvcmRlclJhZGl1cyA9ICh7IGJvcmRlclJhZGl1cyB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+IGNzc2BcbiAgICAgIGJvcmRlci1yYWRpdXM6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGJvcmRlclJhZGl1cyxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgYm94U2hhZG93ID0gKHsgYm94U2hhZG93IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgYm94LXNoYWRvdzogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogYm94U2hhZG93LFxuICB9KTtcblxuY29uc3QgZmxleCA9ICh7IGZsZXggfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICBmbGV4OiAke3h9O1xuICAgIGAsXG4gICAgdmFsOiBmbGV4LFxuICB9KTtcblxuY29uc3QgZmxleEJhc2lzID0gKHsgZmxleEJhc2lzIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgZmxleC1iYXNpczogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogZmxleEJhc2lzLFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBmbGV4U2hyaW5rID0gKHsgZmxleFNocmluayB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+IGNzc2BcbiAgICAgIGZsZXgtc2hyaW5rOiAke3h9O1xuICAgIGAsXG4gICAgdmFsOiBmbGV4U2hyaW5rLFxuICB9KTtcblxuY29uc3QgYWxpZ25TZWxmID0gKHsgYWxpZ25TZWxmIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgYWxpZ24tc2VsZjogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogYWxpZ25TZWxmLFxuICB9KTtcbmNvbnN0IG91dGxpbmUgPSAoeyBvdXRsaW5lIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgb3V0bGluZTogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogb3V0bGluZSxcbiAgfSk7XG5cbmV4cG9ydCBkZWZhdWx0IFtcbiAgdHJhbnNmb3JtLFxuICBib3JkZXJSYWRpdXMsXG4gIGJveFNoYWRvdyxcbiAgZmxleCxcbiAgZmxleEJhc2lzLFxuICBmbGV4U2hyaW5rLFxuICBhbGlnblNlbGYsXG4gIG91dGxpbmUsXG5dO1xuIl19 */");
    },
    val: transform
  });
};
var borderRadius = function borderRadius(_ref2) {
  var borderRadius = _ref2.borderRadius;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("border-radius:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRhaW5lck1peGlucy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFhb0IiLCJmaWxlIjoiY29udGFpbmVyTWl4aW5zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3NzIH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XG5pbXBvcnQgeyByZXNwb25zaXZlUHJvcCB9IGZyb20gXCIuLi8uLi91dGlscy9yZXNwb25zaXZlUHJvcFwiO1xuXG5jb25zdCB0cmFuc2Zvcm0gPSAoeyB0cmFuc2Zvcm0gfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICB0cmFuc2Zvcm06ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IHRyYW5zZm9ybSxcbiAgfSk7XG5cbmNvbnN0IGJvcmRlclJhZGl1cyA9ICh7IGJvcmRlclJhZGl1cyB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+IGNzc2BcbiAgICAgIGJvcmRlci1yYWRpdXM6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGJvcmRlclJhZGl1cyxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgYm94U2hhZG93ID0gKHsgYm94U2hhZG93IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgYm94LXNoYWRvdzogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogYm94U2hhZG93LFxuICB9KTtcblxuY29uc3QgZmxleCA9ICh7IGZsZXggfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICBmbGV4OiAke3h9O1xuICAgIGAsXG4gICAgdmFsOiBmbGV4LFxuICB9KTtcblxuY29uc3QgZmxleEJhc2lzID0gKHsgZmxleEJhc2lzIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgZmxleC1iYXNpczogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogZmxleEJhc2lzLFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBmbGV4U2hyaW5rID0gKHsgZmxleFNocmluayB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+IGNzc2BcbiAgICAgIGZsZXgtc2hyaW5rOiAke3h9O1xuICAgIGAsXG4gICAgdmFsOiBmbGV4U2hyaW5rLFxuICB9KTtcblxuY29uc3QgYWxpZ25TZWxmID0gKHsgYWxpZ25TZWxmIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgYWxpZ24tc2VsZjogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogYWxpZ25TZWxmLFxuICB9KTtcbmNvbnN0IG91dGxpbmUgPSAoeyBvdXRsaW5lIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgb3V0bGluZTogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogb3V0bGluZSxcbiAgfSk7XG5cbmV4cG9ydCBkZWZhdWx0IFtcbiAgdHJhbnNmb3JtLFxuICBib3JkZXJSYWRpdXMsXG4gIGJveFNoYWRvdyxcbiAgZmxleCxcbiAgZmxleEJhc2lzLFxuICBmbGV4U2hyaW5rLFxuICBhbGlnblNlbGYsXG4gIG91dGxpbmUsXG5dO1xuIl19 */");
    },
    val: borderRadius,
    interpolation: "rem"
  });
};
var boxShadow = function boxShadow(_ref3) {
  var boxShadow = _ref3.boxShadow;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("box-shadow:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRhaW5lck1peGlucy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFzQm9CIiwiZmlsZSI6ImNvbnRhaW5lck1peGlucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xuaW1wb3J0IHsgcmVzcG9uc2l2ZVByb3AgfSBmcm9tIFwiLi4vLi4vdXRpbHMvcmVzcG9uc2l2ZVByb3BcIjtcblxuY29uc3QgdHJhbnNmb3JtID0gKHsgdHJhbnNmb3JtIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgdHJhbnNmb3JtOiAke3h9O1xuICAgIGAsXG4gICAgdmFsOiB0cmFuc2Zvcm0sXG4gIH0pO1xuXG5jb25zdCBib3JkZXJSYWRpdXMgPSAoeyBib3JkZXJSYWRpdXMgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICBib3JkZXItcmFkaXVzOiAke3h9O1xuICAgIGAsXG4gICAgdmFsOiBib3JkZXJSYWRpdXMsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IGJveFNoYWRvdyA9ICh7IGJveFNoYWRvdyB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+IGNzc2BcbiAgICAgIGJveC1zaGFkb3c6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGJveFNoYWRvdyxcbiAgfSk7XG5cbmNvbnN0IGZsZXggPSAoeyBmbGV4IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgZmxleDogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogZmxleCxcbiAgfSk7XG5cbmNvbnN0IGZsZXhCYXNpcyA9ICh7IGZsZXhCYXNpcyB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+IGNzc2BcbiAgICAgIGZsZXgtYmFzaXM6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGZsZXhCYXNpcyxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgZmxleFNocmluayA9ICh7IGZsZXhTaHJpbmsgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICBmbGV4LXNocmluazogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogZmxleFNocmluayxcbiAgfSk7XG5cbmNvbnN0IGFsaWduU2VsZiA9ICh7IGFsaWduU2VsZiB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+IGNzc2BcbiAgICAgIGFsaWduLXNlbGY6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGFsaWduU2VsZixcbiAgfSk7XG5jb25zdCBvdXRsaW5lID0gKHsgb3V0bGluZSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+IGNzc2BcbiAgICAgIG91dGxpbmU6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IG91dGxpbmUsXG4gIH0pO1xuXG5leHBvcnQgZGVmYXVsdCBbXG4gIHRyYW5zZm9ybSxcbiAgYm9yZGVyUmFkaXVzLFxuICBib3hTaGFkb3csXG4gIGZsZXgsXG4gIGZsZXhCYXNpcyxcbiAgZmxleFNocmluayxcbiAgYWxpZ25TZWxmLFxuICBvdXRsaW5lLFxuXTtcbiJdfQ== */");
    },
    val: boxShadow
  });
};
var flex = function flex(_ref4) {
  var flex = _ref4.flex;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("flex:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRhaW5lck1peGlucy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUE4Qm9CIiwiZmlsZSI6ImNvbnRhaW5lck1peGlucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xuaW1wb3J0IHsgcmVzcG9uc2l2ZVByb3AgfSBmcm9tIFwiLi4vLi4vdXRpbHMvcmVzcG9uc2l2ZVByb3BcIjtcblxuY29uc3QgdHJhbnNmb3JtID0gKHsgdHJhbnNmb3JtIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgdHJhbnNmb3JtOiAke3h9O1xuICAgIGAsXG4gICAgdmFsOiB0cmFuc2Zvcm0sXG4gIH0pO1xuXG5jb25zdCBib3JkZXJSYWRpdXMgPSAoeyBib3JkZXJSYWRpdXMgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICBib3JkZXItcmFkaXVzOiAke3h9O1xuICAgIGAsXG4gICAgdmFsOiBib3JkZXJSYWRpdXMsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IGJveFNoYWRvdyA9ICh7IGJveFNoYWRvdyB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+IGNzc2BcbiAgICAgIGJveC1zaGFkb3c6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGJveFNoYWRvdyxcbiAgfSk7XG5cbmNvbnN0IGZsZXggPSAoeyBmbGV4IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgZmxleDogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogZmxleCxcbiAgfSk7XG5cbmNvbnN0IGZsZXhCYXNpcyA9ICh7IGZsZXhCYXNpcyB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+IGNzc2BcbiAgICAgIGZsZXgtYmFzaXM6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGZsZXhCYXNpcyxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgZmxleFNocmluayA9ICh7IGZsZXhTaHJpbmsgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICBmbGV4LXNocmluazogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogZmxleFNocmluayxcbiAgfSk7XG5cbmNvbnN0IGFsaWduU2VsZiA9ICh7IGFsaWduU2VsZiB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+IGNzc2BcbiAgICAgIGFsaWduLXNlbGY6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGFsaWduU2VsZixcbiAgfSk7XG5jb25zdCBvdXRsaW5lID0gKHsgb3V0bGluZSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+IGNzc2BcbiAgICAgIG91dGxpbmU6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IG91dGxpbmUsXG4gIH0pO1xuXG5leHBvcnQgZGVmYXVsdCBbXG4gIHRyYW5zZm9ybSxcbiAgYm9yZGVyUmFkaXVzLFxuICBib3hTaGFkb3csXG4gIGZsZXgsXG4gIGZsZXhCYXNpcyxcbiAgZmxleFNocmluayxcbiAgYWxpZ25TZWxmLFxuICBvdXRsaW5lLFxuXTtcbiJdfQ== */");
    },
    val: flex
  });
};
var flexBasis = function flexBasis(_ref5) {
  var flexBasis = _ref5.flexBasis;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("flex-basis:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRhaW5lck1peGlucy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFzQ29CIiwiZmlsZSI6ImNvbnRhaW5lck1peGlucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xuaW1wb3J0IHsgcmVzcG9uc2l2ZVByb3AgfSBmcm9tIFwiLi4vLi4vdXRpbHMvcmVzcG9uc2l2ZVByb3BcIjtcblxuY29uc3QgdHJhbnNmb3JtID0gKHsgdHJhbnNmb3JtIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgdHJhbnNmb3JtOiAke3h9O1xuICAgIGAsXG4gICAgdmFsOiB0cmFuc2Zvcm0sXG4gIH0pO1xuXG5jb25zdCBib3JkZXJSYWRpdXMgPSAoeyBib3JkZXJSYWRpdXMgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICBib3JkZXItcmFkaXVzOiAke3h9O1xuICAgIGAsXG4gICAgdmFsOiBib3JkZXJSYWRpdXMsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IGJveFNoYWRvdyA9ICh7IGJveFNoYWRvdyB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+IGNzc2BcbiAgICAgIGJveC1zaGFkb3c6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGJveFNoYWRvdyxcbiAgfSk7XG5cbmNvbnN0IGZsZXggPSAoeyBmbGV4IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgZmxleDogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogZmxleCxcbiAgfSk7XG5cbmNvbnN0IGZsZXhCYXNpcyA9ICh7IGZsZXhCYXNpcyB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+IGNzc2BcbiAgICAgIGZsZXgtYmFzaXM6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGZsZXhCYXNpcyxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgZmxleFNocmluayA9ICh7IGZsZXhTaHJpbmsgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICBmbGV4LXNocmluazogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogZmxleFNocmluayxcbiAgfSk7XG5cbmNvbnN0IGFsaWduU2VsZiA9ICh7IGFsaWduU2VsZiB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+IGNzc2BcbiAgICAgIGFsaWduLXNlbGY6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGFsaWduU2VsZixcbiAgfSk7XG5jb25zdCBvdXRsaW5lID0gKHsgb3V0bGluZSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+IGNzc2BcbiAgICAgIG91dGxpbmU6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IG91dGxpbmUsXG4gIH0pO1xuXG5leHBvcnQgZGVmYXVsdCBbXG4gIHRyYW5zZm9ybSxcbiAgYm9yZGVyUmFkaXVzLFxuICBib3hTaGFkb3csXG4gIGZsZXgsXG4gIGZsZXhCYXNpcyxcbiAgZmxleFNocmluayxcbiAgYWxpZ25TZWxmLFxuICBvdXRsaW5lLFxuXTtcbiJdfQ== */");
    },
    val: flexBasis,
    interpolation: "rem"
  });
};
var flexShrink = function flexShrink(_ref6) {
  var flexShrink = _ref6.flexShrink;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("flex-shrink:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRhaW5lck1peGlucy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUErQ29CIiwiZmlsZSI6ImNvbnRhaW5lck1peGlucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xuaW1wb3J0IHsgcmVzcG9uc2l2ZVByb3AgfSBmcm9tIFwiLi4vLi4vdXRpbHMvcmVzcG9uc2l2ZVByb3BcIjtcblxuY29uc3QgdHJhbnNmb3JtID0gKHsgdHJhbnNmb3JtIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgdHJhbnNmb3JtOiAke3h9O1xuICAgIGAsXG4gICAgdmFsOiB0cmFuc2Zvcm0sXG4gIH0pO1xuXG5jb25zdCBib3JkZXJSYWRpdXMgPSAoeyBib3JkZXJSYWRpdXMgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICBib3JkZXItcmFkaXVzOiAke3h9O1xuICAgIGAsXG4gICAgdmFsOiBib3JkZXJSYWRpdXMsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IGJveFNoYWRvdyA9ICh7IGJveFNoYWRvdyB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+IGNzc2BcbiAgICAgIGJveC1zaGFkb3c6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGJveFNoYWRvdyxcbiAgfSk7XG5cbmNvbnN0IGZsZXggPSAoeyBmbGV4IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgZmxleDogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogZmxleCxcbiAgfSk7XG5cbmNvbnN0IGZsZXhCYXNpcyA9ICh7IGZsZXhCYXNpcyB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+IGNzc2BcbiAgICAgIGZsZXgtYmFzaXM6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGZsZXhCYXNpcyxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgZmxleFNocmluayA9ICh7IGZsZXhTaHJpbmsgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICBmbGV4LXNocmluazogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogZmxleFNocmluayxcbiAgfSk7XG5cbmNvbnN0IGFsaWduU2VsZiA9ICh7IGFsaWduU2VsZiB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+IGNzc2BcbiAgICAgIGFsaWduLXNlbGY6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGFsaWduU2VsZixcbiAgfSk7XG5jb25zdCBvdXRsaW5lID0gKHsgb3V0bGluZSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+IGNzc2BcbiAgICAgIG91dGxpbmU6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IG91dGxpbmUsXG4gIH0pO1xuXG5leHBvcnQgZGVmYXVsdCBbXG4gIHRyYW5zZm9ybSxcbiAgYm9yZGVyUmFkaXVzLFxuICBib3hTaGFkb3csXG4gIGZsZXgsXG4gIGZsZXhCYXNpcyxcbiAgZmxleFNocmluayxcbiAgYWxpZ25TZWxmLFxuICBvdXRsaW5lLFxuXTtcbiJdfQ== */");
    },
    val: flexShrink
  });
};
var alignSelf = function alignSelf(_ref7) {
  var alignSelf = _ref7.alignSelf;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("align-self:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRhaW5lck1peGlucy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUF1RG9CIiwiZmlsZSI6ImNvbnRhaW5lck1peGlucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xuaW1wb3J0IHsgcmVzcG9uc2l2ZVByb3AgfSBmcm9tIFwiLi4vLi4vdXRpbHMvcmVzcG9uc2l2ZVByb3BcIjtcblxuY29uc3QgdHJhbnNmb3JtID0gKHsgdHJhbnNmb3JtIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgdHJhbnNmb3JtOiAke3h9O1xuICAgIGAsXG4gICAgdmFsOiB0cmFuc2Zvcm0sXG4gIH0pO1xuXG5jb25zdCBib3JkZXJSYWRpdXMgPSAoeyBib3JkZXJSYWRpdXMgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICBib3JkZXItcmFkaXVzOiAke3h9O1xuICAgIGAsXG4gICAgdmFsOiBib3JkZXJSYWRpdXMsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IGJveFNoYWRvdyA9ICh7IGJveFNoYWRvdyB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+IGNzc2BcbiAgICAgIGJveC1zaGFkb3c6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGJveFNoYWRvdyxcbiAgfSk7XG5cbmNvbnN0IGZsZXggPSAoeyBmbGV4IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgZmxleDogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogZmxleCxcbiAgfSk7XG5cbmNvbnN0IGZsZXhCYXNpcyA9ICh7IGZsZXhCYXNpcyB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+IGNzc2BcbiAgICAgIGZsZXgtYmFzaXM6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGZsZXhCYXNpcyxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgZmxleFNocmluayA9ICh7IGZsZXhTaHJpbmsgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICBmbGV4LXNocmluazogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogZmxleFNocmluayxcbiAgfSk7XG5cbmNvbnN0IGFsaWduU2VsZiA9ICh7IGFsaWduU2VsZiB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+IGNzc2BcbiAgICAgIGFsaWduLXNlbGY6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGFsaWduU2VsZixcbiAgfSk7XG5jb25zdCBvdXRsaW5lID0gKHsgb3V0bGluZSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+IGNzc2BcbiAgICAgIG91dGxpbmU6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IG91dGxpbmUsXG4gIH0pO1xuXG5leHBvcnQgZGVmYXVsdCBbXG4gIHRyYW5zZm9ybSxcbiAgYm9yZGVyUmFkaXVzLFxuICBib3hTaGFkb3csXG4gIGZsZXgsXG4gIGZsZXhCYXNpcyxcbiAgZmxleFNocmluayxcbiAgYWxpZ25TZWxmLFxuICBvdXRsaW5lLFxuXTtcbiJdfQ== */");
    },
    val: alignSelf
  });
};
var outline = function outline(_ref8) {
  var outline = _ref8.outline;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("outline:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRhaW5lck1peGlucy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUE4RG9CIiwiZmlsZSI6ImNvbnRhaW5lck1peGlucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xuaW1wb3J0IHsgcmVzcG9uc2l2ZVByb3AgfSBmcm9tIFwiLi4vLi4vdXRpbHMvcmVzcG9uc2l2ZVByb3BcIjtcblxuY29uc3QgdHJhbnNmb3JtID0gKHsgdHJhbnNmb3JtIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgdHJhbnNmb3JtOiAke3h9O1xuICAgIGAsXG4gICAgdmFsOiB0cmFuc2Zvcm0sXG4gIH0pO1xuXG5jb25zdCBib3JkZXJSYWRpdXMgPSAoeyBib3JkZXJSYWRpdXMgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICBib3JkZXItcmFkaXVzOiAke3h9O1xuICAgIGAsXG4gICAgdmFsOiBib3JkZXJSYWRpdXMsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IGJveFNoYWRvdyA9ICh7IGJveFNoYWRvdyB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+IGNzc2BcbiAgICAgIGJveC1zaGFkb3c6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGJveFNoYWRvdyxcbiAgfSk7XG5cbmNvbnN0IGZsZXggPSAoeyBmbGV4IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT4gY3NzYFxuICAgICAgZmxleDogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogZmxleCxcbiAgfSk7XG5cbmNvbnN0IGZsZXhCYXNpcyA9ICh7IGZsZXhCYXNpcyB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+IGNzc2BcbiAgICAgIGZsZXgtYmFzaXM6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGZsZXhCYXNpcyxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgZmxleFNocmluayA9ICh7IGZsZXhTaHJpbmsgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PiBjc3NgXG4gICAgICBmbGV4LXNocmluazogJHt4fTtcbiAgICBgLFxuICAgIHZhbDogZmxleFNocmluayxcbiAgfSk7XG5cbmNvbnN0IGFsaWduU2VsZiA9ICh7IGFsaWduU2VsZiB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+IGNzc2BcbiAgICAgIGFsaWduLXNlbGY6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IGFsaWduU2VsZixcbiAgfSk7XG5jb25zdCBvdXRsaW5lID0gKHsgb3V0bGluZSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+IGNzc2BcbiAgICAgIG91dGxpbmU6ICR7eH07XG4gICAgYCxcbiAgICB2YWw6IG91dGxpbmUsXG4gIH0pO1xuXG5leHBvcnQgZGVmYXVsdCBbXG4gIHRyYW5zZm9ybSxcbiAgYm9yZGVyUmFkaXVzLFxuICBib3hTaGFkb3csXG4gIGZsZXgsXG4gIGZsZXhCYXNpcyxcbiAgZmxleFNocmluayxcbiAgYWxpZ25TZWxmLFxuICBvdXRsaW5lLFxuXTtcbiJdfQ== */");
    },
    val: outline
  });
};
var containerMixins = [transform, borderRadius, boxShadow, flex, flexBasis, flexShrink, alignSelf, outline];

export { Box, Column, Grid, KeepAspectRatio, Row, SageProvider, Section, Spacer, Stack, Theme, Typography, XPad, arrayProp, backgroundColorMixins, containerMixins, defaultTheme, devMixins, displayMixins, findValueInObject, flexProps, genericProps, gridItemMixins, gridMixins, gridProps, isValidColor, mq, responsiveProp, sizeMixins, spaceMixins, typographyMixins, typographyProps, useElementSize, useHover, useKeyDown, useLogEffect, useResponsive, useSSRLayoutEffect, useScramble };
