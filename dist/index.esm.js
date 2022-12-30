import React, { useLayoutEffect, useState, useEffect } from 'react';
import { useTheme, ThemeContext, css, jsx, ThemeProvider } from '@emotion/react';
import { stripUnit, remToPx } from 'polished';
import _styled from '@emotion/styled/base';
import isPropValid from '@emotion/is-prop-valid';

var useSSRLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : function () {};

var defaultTheme = {
  bp: ["0rem", "36rem", "62rem", "75rem"],
  section: {
    maxWidth: "62rem",
    xPadding: ["1rem", "2rem"]
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
  return /*#__PURE__*/css(func(val[0]), "@media screen and (min-width: ", (bp === null || bp === void 0 ? void 0 : bp[1]) || bpFb[1], "){", val[1] && func(val[1]), ";}@media screen and (min-width: ", (bp === null || bp === void 0 ? void 0 : bp[2]) || bpFb[2], "){", val[2] && func(val[2]), ";}@media screen and (min-width: ", (bp === null || bp === void 0 ? void 0 : bp[3]) || bpFb[3], "){", val[3] && func(val[3]), ";}" + (process.env.NODE_ENV === "production" ? "" : ";label:responsiveProp;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc3BvbnNpdmVQcm9wLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTRCWSIsImZpbGUiOiJyZXNwb25zaXZlUHJvcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRoZW1lQ29udGV4dCwgY3NzLCB1c2VUaGVtZSB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xuaW1wb3J0IHsgZGVmYXVsdFRoZW1lIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvU2FnZVByb3ZpZGVyL2RlZmF1bHRUaGVtZVwiO1xuXG5leHBvcnQgY29uc3QgaW50ZXJwb2xhdGVkUHJvcCA9ICh2LCBpbnRlcnBvbGF0aW9uKSA9PiB7XG4gIGlmICh0eXBlb2YgdiA9PT0gXCJudW1iZXJcIikge1xuICAgIHJldHVybiB2ICsgaW50ZXJwb2xhdGlvbjtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdjtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IHJlc3BvbnNpdmVQcm9wID0gKHsgZnVuYywgdmFsLCBpbnRlcnBvbGF0aW9uID0gZmFsc2UgfSkgPT4ge1xuICBjb25zdCB7IGJwIH0gPSB1c2VUaGVtZShUaGVtZUNvbnRleHQpO1xuICBjb25zdCBicEZiID0gZGVmYXVsdFRoZW1lLmJwO1xuXG4gIGlmICh2YWwgPT09IHVuZGVmaW5lZCB8fCB2YWwgPT09IG51bGwpIHJldHVybjtcblxuICBpZiAoaW50ZXJwb2xhdGlvbikge1xuICAgIGlmICh0eXBlb2YgdmFsID09PSBcIm51bWJlclwiKSB2YWwgPSBpbnRlcnBvbGF0ZWRQcm9wKHZhbCwgaW50ZXJwb2xhdGlvbik7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsKSlcbiAgICAgIHZhbC5mb3JFYWNoKCh4LCBpbmRleCkgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIHggPT09IFwibnVtYmVyXCIpXG4gICAgICAgICAgdmFsW2luZGV4XSA9IGludGVycG9sYXRlZFByb3AoeCwgaW50ZXJwb2xhdGlvbik7XG4gICAgICB9KTtcbiAgfVxuXG4gIHZhbCA9IEFycmF5LmlzQXJyYXkodmFsKSA/IHZhbCA6IFt2YWxdO1xuXG4gIHJldHVybiBjc3NgXG4gICAgJHtmdW5jKHZhbFswXSl9XG5cbiAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAke2JwPy5bMV0gfHwgYnBGYlsxXX0pIHtcbiAgICAgICR7dmFsWzFdICYmIGZ1bmModmFsWzFdKX1cbiAgICB9XG5cbiAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAke2JwPy5bMl0gfHwgYnBGYlsyXX0pIHtcbiAgICAgICR7dmFsWzJdICYmIGZ1bmModmFsWzJdKX1cbiAgICB9XG5cbiAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAke2JwPy5bM10gfHwgYnBGYlszXX0pIHtcbiAgICAgICR7dmFsWzNdICYmIGZ1bmModmFsWzNdKX1cbiAgICB9XG4gIGA7XG59O1xuIl19 */");
};

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
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
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

var useResponsive = function useResponsive() {
  var _useTheme = useTheme(ThemeContext),
    bp = _useTheme.bp;

  // fallback if theme is not present
  bp = bp ? bp : ["0rem", "36rem", "62rem", "75rem"];
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
      setBreakpoint("xl");
      setBreakpointIndex(3);
    } else if (width > stripUnit(remToPx(bp[2]))) {
      setBreakpoint("lr");
      setBreakpointIndex(2);
    } else if (width > stripUnit(remToPx(bp[1]))) {
      setBreakpoint("md");
      setBreakpointIndex(1);
    } else {
      setBreakpoint("sm");
      setBreakpointIndex(0);
    }
  };
  useEffect(function () {
    calcBreakpoint();
    window.addEventListener("resize", calcBreakpoint);
    return function () {
      return window.removeEventListener("resize", calcBreakpoint);
    };
  }, []);
  useEffect(function () {
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
          while (1) {
            switch (_context.prev = _context.next) {
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
      var loop = 4 - (index + 1);
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

var backgroundColor$1 = function backgroundColor(_ref) {
  var backgroundColor = _ref.backgroundColor;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("background-color:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRlc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBUVMiLCJmaWxlIjoiVGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzdHlsZWQgZnJvbSBcIkBlbW90aW9uL3N0eWxlZFwiO1xuaW1wb3J0IHsgY3NzIH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XG5pbXBvcnQgeyBhcnJheWlmeVByb3AgfSBmcm9tIFwiLi4vLi4vdXRpbHMvYXJyYXlpZnlQcm9wXCI7XG5pbXBvcnQgeyByZXNwb25zaXZlUHJvcCB9IGZyb20gXCIuLi8uLi91dGlscy9yZXNwb25zaXZlUHJvcFwiO1xuXG5jb25zdCBiYWNrZ3JvdW5kQ29sb3IgPSAoeyBiYWNrZ3JvdW5kQ29sb3IgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IGJhY2tncm91bmRDb2xvcixcbiAgfSk7XG5cbmNvbnN0IFRlc3QgPSBzdHlsZWQuZGl2YFxuICAke1tiYWNrZ3JvdW5kQ29sb3JdfTtcbmA7XG5cbmV4cG9ydCBkZWZhdWx0IFRlc3Q7XG4iXX0= */");
    },
    val: backgroundColor
  });
};
var Test = /*#__PURE__*/_styled("div", process.env.NODE_ENV === "production" ? {
  target: "e1qpk7bb0"
} : {
  target: "e1qpk7bb0",
  label: "Test"
})([backgroundColor$1], ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRlc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBY3VCIiwiZmlsZSI6IlRlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc3R5bGVkIGZyb20gXCJAZW1vdGlvbi9zdHlsZWRcIjtcbmltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xuaW1wb3J0IHsgYXJyYXlpZnlQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2FycmF5aWZ5UHJvcFwiO1xuaW1wb3J0IHsgcmVzcG9uc2l2ZVByb3AgfSBmcm9tIFwiLi4vLi4vdXRpbHMvcmVzcG9uc2l2ZVByb3BcIjtcblxuY29uc3QgYmFja2dyb3VuZENvbG9yID0gKHsgYmFja2dyb3VuZENvbG9yIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBiYWNrZ3JvdW5kQ29sb3IsXG4gIH0pO1xuXG5jb25zdCBUZXN0ID0gc3R5bGVkLmRpdmBcbiAgJHtbYmFja2dyb3VuZENvbG9yXX07XG5gO1xuXG5leHBvcnQgZGVmYXVsdCBUZXN0O1xuIl19 */"));

function _EMOTION_STRINGIFIED_CSS_ERROR__$1() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }

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
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyaWRNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBV2dCIiwiZmlsZSI6ImdyaWRNaXhpbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IHJlc3BvbnNpdmVQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Jlc3BvbnNpdmVQcm9wXCI7XG5cbi8vIGdyaWQsXG4vLyBiYXNlLFxuLy8gZ2FwLFxuLy8gY29sdW1uR2FwLFxuLy8gcm93R2FwLFxuLy8gcGxhY2VJdGVtcyxcbi8vIGdyaWRDb2x1bW4sXG5cbmNvbnN0IGdyaWQgPSBjc3NgXG4gIGRpc3BsYXk6IGdyaWQ7XG5gO1xuXG5jb25zdCBiYXNlID0gKHsgYmFzZSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KCR7eH0sIDFmcik7XG4gICAgICBgLFxuICAgIHZhbDogYmFzZSxcbiAgfSk7XG5cbmNvbnN0IGdhcCA9ICh7IGdhcCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdhcDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBnYXAsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IGNvbHVtbkdhcCA9ICh7IGNvbHVtbkdhcCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGNvbHVtbi1nYXA6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogY29sdW1uR2FwLFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCByb3dHYXAgPSAoeyByb3dHYXAgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICByb3ctZ2FwOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IHJvd0dhcCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgcGxhY2VJdGVtcyA9ICh7IHBsYWNlSXRlbXMgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwbGFjZS1pdGVtczogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBwbGFjZUl0ZW1zLFxuICB9KTtcblxuY29uc3QgZ3JpZENvbHVtbiA9ICh7IGdyaWRDb2x1bW4gfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBncmlkLWNvbHVtbjogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBncmlkQ29sdW1uLFxuICB9KTtcblxuZXhwb3J0IGRlZmF1bHQgW2dyaWQsIGJhc2UsIGdhcCwgY29sdW1uR2FwLCByb3dHYXAsIHBsYWNlSXRlbXMsIGdyaWRDb2x1bW5dO1xuIl19 */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__$1
};
var base = function base(_ref) {
  var base = _ref.base;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("grid-template-columns:repeat(", x, ", 1fr);" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyaWRNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBa0JTIiwiZmlsZSI6ImdyaWRNaXhpbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IHJlc3BvbnNpdmVQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Jlc3BvbnNpdmVQcm9wXCI7XG5cbi8vIGdyaWQsXG4vLyBiYXNlLFxuLy8gZ2FwLFxuLy8gY29sdW1uR2FwLFxuLy8gcm93R2FwLFxuLy8gcGxhY2VJdGVtcyxcbi8vIGdyaWRDb2x1bW4sXG5cbmNvbnN0IGdyaWQgPSBjc3NgXG4gIGRpc3BsYXk6IGdyaWQ7XG5gO1xuXG5jb25zdCBiYXNlID0gKHsgYmFzZSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KCR7eH0sIDFmcik7XG4gICAgICBgLFxuICAgIHZhbDogYmFzZSxcbiAgfSk7XG5cbmNvbnN0IGdhcCA9ICh7IGdhcCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdhcDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBnYXAsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IGNvbHVtbkdhcCA9ICh7IGNvbHVtbkdhcCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGNvbHVtbi1nYXA6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogY29sdW1uR2FwLFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCByb3dHYXAgPSAoeyByb3dHYXAgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICByb3ctZ2FwOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IHJvd0dhcCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgcGxhY2VJdGVtcyA9ICh7IHBsYWNlSXRlbXMgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwbGFjZS1pdGVtczogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBwbGFjZUl0ZW1zLFxuICB9KTtcblxuY29uc3QgZ3JpZENvbHVtbiA9ICh7IGdyaWRDb2x1bW4gfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBncmlkLWNvbHVtbjogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBncmlkQ29sdW1uLFxuICB9KTtcblxuZXhwb3J0IGRlZmF1bHQgW2dyaWQsIGJhc2UsIGdhcCwgY29sdW1uR2FwLCByb3dHYXAsIHBsYWNlSXRlbXMsIGdyaWRDb2x1bW5dO1xuIl19 */");
    },
    val: base
  });
};
var gap$1 = function gap(_ref2) {
  var gap = _ref2.gap;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("gap:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyaWRNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBMkJTIiwiZmlsZSI6ImdyaWRNaXhpbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IHJlc3BvbnNpdmVQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Jlc3BvbnNpdmVQcm9wXCI7XG5cbi8vIGdyaWQsXG4vLyBiYXNlLFxuLy8gZ2FwLFxuLy8gY29sdW1uR2FwLFxuLy8gcm93R2FwLFxuLy8gcGxhY2VJdGVtcyxcbi8vIGdyaWRDb2x1bW4sXG5cbmNvbnN0IGdyaWQgPSBjc3NgXG4gIGRpc3BsYXk6IGdyaWQ7XG5gO1xuXG5jb25zdCBiYXNlID0gKHsgYmFzZSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KCR7eH0sIDFmcik7XG4gICAgICBgLFxuICAgIHZhbDogYmFzZSxcbiAgfSk7XG5cbmNvbnN0IGdhcCA9ICh7IGdhcCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdhcDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBnYXAsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IGNvbHVtbkdhcCA9ICh7IGNvbHVtbkdhcCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGNvbHVtbi1nYXA6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogY29sdW1uR2FwLFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCByb3dHYXAgPSAoeyByb3dHYXAgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICByb3ctZ2FwOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IHJvd0dhcCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgcGxhY2VJdGVtcyA9ICh7IHBsYWNlSXRlbXMgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwbGFjZS1pdGVtczogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBwbGFjZUl0ZW1zLFxuICB9KTtcblxuY29uc3QgZ3JpZENvbHVtbiA9ICh7IGdyaWRDb2x1bW4gfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBncmlkLWNvbHVtbjogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBncmlkQ29sdW1uLFxuICB9KTtcblxuZXhwb3J0IGRlZmF1bHQgW2dyaWQsIGJhc2UsIGdhcCwgY29sdW1uR2FwLCByb3dHYXAsIHBsYWNlSXRlbXMsIGdyaWRDb2x1bW5dO1xuIl19 */");
    },
    val: gap,
    interpolation: "rem"
  });
};
var columnGap = function columnGap(_ref3) {
  var columnGap = _ref3.columnGap;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("column-gap:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyaWRNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBcUNTIiwiZmlsZSI6ImdyaWRNaXhpbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IHJlc3BvbnNpdmVQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Jlc3BvbnNpdmVQcm9wXCI7XG5cbi8vIGdyaWQsXG4vLyBiYXNlLFxuLy8gZ2FwLFxuLy8gY29sdW1uR2FwLFxuLy8gcm93R2FwLFxuLy8gcGxhY2VJdGVtcyxcbi8vIGdyaWRDb2x1bW4sXG5cbmNvbnN0IGdyaWQgPSBjc3NgXG4gIGRpc3BsYXk6IGdyaWQ7XG5gO1xuXG5jb25zdCBiYXNlID0gKHsgYmFzZSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KCR7eH0sIDFmcik7XG4gICAgICBgLFxuICAgIHZhbDogYmFzZSxcbiAgfSk7XG5cbmNvbnN0IGdhcCA9ICh7IGdhcCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdhcDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBnYXAsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IGNvbHVtbkdhcCA9ICh7IGNvbHVtbkdhcCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGNvbHVtbi1nYXA6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogY29sdW1uR2FwLFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCByb3dHYXAgPSAoeyByb3dHYXAgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICByb3ctZ2FwOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IHJvd0dhcCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgcGxhY2VJdGVtcyA9ICh7IHBsYWNlSXRlbXMgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwbGFjZS1pdGVtczogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBwbGFjZUl0ZW1zLFxuICB9KTtcblxuY29uc3QgZ3JpZENvbHVtbiA9ICh7IGdyaWRDb2x1bW4gfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBncmlkLWNvbHVtbjogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBncmlkQ29sdW1uLFxuICB9KTtcblxuZXhwb3J0IGRlZmF1bHQgW2dyaWQsIGJhc2UsIGdhcCwgY29sdW1uR2FwLCByb3dHYXAsIHBsYWNlSXRlbXMsIGdyaWRDb2x1bW5dO1xuIl19 */");
    },
    val: columnGap,
    interpolation: "rem"
  });
};
var rowGap = function rowGap(_ref4) {
  var rowGap = _ref4.rowGap;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("row-gap:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyaWRNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBK0NTIiwiZmlsZSI6ImdyaWRNaXhpbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IHJlc3BvbnNpdmVQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Jlc3BvbnNpdmVQcm9wXCI7XG5cbi8vIGdyaWQsXG4vLyBiYXNlLFxuLy8gZ2FwLFxuLy8gY29sdW1uR2FwLFxuLy8gcm93R2FwLFxuLy8gcGxhY2VJdGVtcyxcbi8vIGdyaWRDb2x1bW4sXG5cbmNvbnN0IGdyaWQgPSBjc3NgXG4gIGRpc3BsYXk6IGdyaWQ7XG5gO1xuXG5jb25zdCBiYXNlID0gKHsgYmFzZSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KCR7eH0sIDFmcik7XG4gICAgICBgLFxuICAgIHZhbDogYmFzZSxcbiAgfSk7XG5cbmNvbnN0IGdhcCA9ICh7IGdhcCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdhcDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBnYXAsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IGNvbHVtbkdhcCA9ICh7IGNvbHVtbkdhcCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGNvbHVtbi1nYXA6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogY29sdW1uR2FwLFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCByb3dHYXAgPSAoeyByb3dHYXAgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICByb3ctZ2FwOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IHJvd0dhcCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgcGxhY2VJdGVtcyA9ICh7IHBsYWNlSXRlbXMgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwbGFjZS1pdGVtczogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBwbGFjZUl0ZW1zLFxuICB9KTtcblxuY29uc3QgZ3JpZENvbHVtbiA9ICh7IGdyaWRDb2x1bW4gfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBncmlkLWNvbHVtbjogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBncmlkQ29sdW1uLFxuICB9KTtcblxuZXhwb3J0IGRlZmF1bHQgW2dyaWQsIGJhc2UsIGdhcCwgY29sdW1uR2FwLCByb3dHYXAsIHBsYWNlSXRlbXMsIGdyaWRDb2x1bW5dO1xuIl19 */");
    },
    val: rowGap,
    interpolation: "rem"
  });
};
var placeItems = function placeItems(_ref5) {
  var placeItems = _ref5.placeItems;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("place-items:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyaWRNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBeURTIiwiZmlsZSI6ImdyaWRNaXhpbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IHJlc3BvbnNpdmVQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Jlc3BvbnNpdmVQcm9wXCI7XG5cbi8vIGdyaWQsXG4vLyBiYXNlLFxuLy8gZ2FwLFxuLy8gY29sdW1uR2FwLFxuLy8gcm93R2FwLFxuLy8gcGxhY2VJdGVtcyxcbi8vIGdyaWRDb2x1bW4sXG5cbmNvbnN0IGdyaWQgPSBjc3NgXG4gIGRpc3BsYXk6IGdyaWQ7XG5gO1xuXG5jb25zdCBiYXNlID0gKHsgYmFzZSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KCR7eH0sIDFmcik7XG4gICAgICBgLFxuICAgIHZhbDogYmFzZSxcbiAgfSk7XG5cbmNvbnN0IGdhcCA9ICh7IGdhcCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdhcDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBnYXAsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IGNvbHVtbkdhcCA9ICh7IGNvbHVtbkdhcCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGNvbHVtbi1nYXA6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogY29sdW1uR2FwLFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCByb3dHYXAgPSAoeyByb3dHYXAgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICByb3ctZ2FwOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IHJvd0dhcCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgcGxhY2VJdGVtcyA9ICh7IHBsYWNlSXRlbXMgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwbGFjZS1pdGVtczogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBwbGFjZUl0ZW1zLFxuICB9KTtcblxuY29uc3QgZ3JpZENvbHVtbiA9ICh7IGdyaWRDb2x1bW4gfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBncmlkLWNvbHVtbjogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBncmlkQ29sdW1uLFxuICB9KTtcblxuZXhwb3J0IGRlZmF1bHQgW2dyaWQsIGJhc2UsIGdhcCwgY29sdW1uR2FwLCByb3dHYXAsIHBsYWNlSXRlbXMsIGdyaWRDb2x1bW5dO1xuIl19 */");
    },
    val: placeItems
  });
};
var gridColumn = function gridColumn(_ref6) {
  var gridColumn = _ref6.gridColumn;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("grid-column:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyaWRNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBa0VTIiwiZmlsZSI6ImdyaWRNaXhpbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IHJlc3BvbnNpdmVQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Jlc3BvbnNpdmVQcm9wXCI7XG5cbi8vIGdyaWQsXG4vLyBiYXNlLFxuLy8gZ2FwLFxuLy8gY29sdW1uR2FwLFxuLy8gcm93R2FwLFxuLy8gcGxhY2VJdGVtcyxcbi8vIGdyaWRDb2x1bW4sXG5cbmNvbnN0IGdyaWQgPSBjc3NgXG4gIGRpc3BsYXk6IGdyaWQ7XG5gO1xuXG5jb25zdCBiYXNlID0gKHsgYmFzZSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KCR7eH0sIDFmcik7XG4gICAgICBgLFxuICAgIHZhbDogYmFzZSxcbiAgfSk7XG5cbmNvbnN0IGdhcCA9ICh7IGdhcCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdhcDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBnYXAsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IGNvbHVtbkdhcCA9ICh7IGNvbHVtbkdhcCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGNvbHVtbi1nYXA6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogY29sdW1uR2FwLFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCByb3dHYXAgPSAoeyByb3dHYXAgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICByb3ctZ2FwOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IHJvd0dhcCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgcGxhY2VJdGVtcyA9ICh7IHBsYWNlSXRlbXMgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwbGFjZS1pdGVtczogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBwbGFjZUl0ZW1zLFxuICB9KTtcblxuY29uc3QgZ3JpZENvbHVtbiA9ICh7IGdyaWRDb2x1bW4gfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBncmlkLWNvbHVtbjogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBncmlkQ29sdW1uLFxuICB9KTtcblxuZXhwb3J0IGRlZmF1bHQgW2dyaWQsIGJhc2UsIGdhcCwgY29sdW1uR2FwLCByb3dHYXAsIHBsYWNlSXRlbXMsIGdyaWRDb2x1bW5dO1xuIl19 */");
    },
    val: gridColumn
  });
};
var gridMixins = [grid, base, gap$1, columnGap, rowGap, placeItems, gridColumn];

// span (num: span, string: col start/end )
// placeSelf,

// TODO:
// grid-column: ${x};

var span = function span(_ref) {
  var span = _ref.span;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("grid-column:span ", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyaWRJdGVtTWl4aW5zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVlTIiwiZmlsZSI6ImdyaWRJdGVtTWl4aW5zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3NzIH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XG5pbXBvcnQgeyByZXNwb25zaXZlUHJvcCB9IGZyb20gXCIuLi8uLi91dGlscy9yZXNwb25zaXZlUHJvcFwiO1xuXG4vLyBzcGFuIChudW06IHNwYW4sIHN0cmluZzogY29sIHN0YXJ0L2VuZCApXG4vLyBwbGFjZVNlbGYsXG5cbi8vIFRPRE86XG4vLyBncmlkLWNvbHVtbjogJHt4fTtcblxuY29uc3Qgc3BhbiA9ICh7IHNwYW4gfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBncmlkLWNvbHVtbjogc3BhbiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IHNwYW4sXG4gIH0pO1xuXG5jb25zdCBwbGFjZVNlbGYgPSAoeyBwbGFjZVNlbGYgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwbGFjZS1zZWxmOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IHBsYWNlU2VsZixcbiAgfSk7XG5cbmV4cG9ydCBkZWZhdWx0IFtzcGFuLCBwbGFjZVNlbGZdO1xuIl19 */");
    },
    val: span
  });
};
var placeSelf = function placeSelf(_ref2) {
  var placeSelf = _ref2.placeSelf;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("place-self:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyaWRJdGVtTWl4aW5zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXFCUyIsImZpbGUiOiJncmlkSXRlbU1peGlucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xuaW1wb3J0IHsgcmVzcG9uc2l2ZVByb3AgfSBmcm9tIFwiLi4vLi4vdXRpbHMvcmVzcG9uc2l2ZVByb3BcIjtcblxuLy8gc3BhbiAobnVtOiBzcGFuLCBzdHJpbmc6IGNvbCBzdGFydC9lbmQgKVxuLy8gcGxhY2VTZWxmLFxuXG4vLyBUT0RPOlxuLy8gZ3JpZC1jb2x1bW46ICR7eH07XG5cbmNvbnN0IHNwYW4gPSAoeyBzcGFuIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgZ3JpZC1jb2x1bW46IHNwYW4gJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBzcGFuLFxuICB9KTtcblxuY29uc3QgcGxhY2VTZWxmID0gKHsgcGxhY2VTZWxmIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgcGxhY2Utc2VsZjogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBwbGFjZVNlbGYsXG4gIH0pO1xuXG5leHBvcnQgZGVmYXVsdCBbc3BhbiwgcGxhY2VTZWxmXTtcbiJdfQ== */");
    },
    val: placeSelf
  });
};
var gridItemMixins = [span, placeSelf];

function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }
var _ref = process.env.NODE_ENV === "production" ? {
  name: "1ubad42",
  styles: "box-sizing:border-box;background-color:rgba(255, 0, 0, 0.1);box-shadow:inset 0px 0px 0px 1px rgba(255, 0, 0, 0.2)"
} : {
  name: "ugh45g-func",
  styles: "box-sizing:border-box;background-color:rgba(255, 0, 0, 0.1);box-shadow:inset 0px 0px 0px 1px rgba(255, 0, 0, 0.2);label:func;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRldk1peGlucy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFNUyIsImZpbGUiOiJkZXZNaXhpbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IHJlc3BvbnNpdmVQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Jlc3BvbnNpdmVQcm9wXCI7XG5cbmNvbnN0IGRldk1peGlucyA9ICh7IGRldiB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDAsIDAsIDAuMSk7XG4gICAgICAgIGJveC1zaGFkb3c6IGluc2V0IDBweCAwcHggMHB4IDFweCByZ2JhKDI1NSwgMCwgMCwgMC4yKTtcbiAgICAgIGAsXG4gICAgdmFsOiBkZXYsXG4gIH0pO1xuXG5leHBvcnQgZGVmYXVsdCBkZXZNaXhpbnM7XG4iXX0= */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
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

var width = function width(_ref) {
  var width = _ref.width;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("width:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNpemVNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBTVMiLCJmaWxlIjoic2l6ZU1peGlucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xuaW1wb3J0IHsgcmVzcG9uc2l2ZVByb3AgfSBmcm9tIFwiLi4vLi4vdXRpbHMvcmVzcG9uc2l2ZVByb3BcIjtcblxuY29uc3Qgd2lkdGggPSAoeyB3aWR0aCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHdpZHRoOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IHdpZHRoLFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBtYXhXaWR0aCA9ICh7IG1heFdpZHRoIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgbWF4LXdpZHRoOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IG1heFdpZHRoLFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBtaW5XaWR0aCA9ICh7IG1pbldpZHRoIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgbWluLXdpZHRoOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IG1pbldpZHRoLFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBoZWlnaHQgPSAoeyBoZWlnaHQgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBoZWlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogaGVpZ2h0LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBtYXhIZWlnaHQgPSAoeyBtYXhIZWlnaHQgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBtYXgtaGVpZ2h0OiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IG1heEhlaWdodCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbWluSGVpZ2h0ID0gKHsgbWluSGVpZ2h0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgbWluLWhlaWdodDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtaW5IZWlnaHQsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmV4cG9ydCBkZWZhdWx0IFt3aWR0aCwgbWF4V2lkdGgsIG1pbldpZHRoLCBoZWlnaHQsIG1heEhlaWdodCwgbWluSGVpZ2h0XTtcbiJdfQ== */");
    },
    val: width,
    interpolation: "rem"
  });
};
var maxWidth = function maxWidth(_ref2) {
  var maxWidth = _ref2.maxWidth;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("max-width:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNpemVNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBZ0JTIiwiZmlsZSI6InNpemVNaXhpbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IHJlc3BvbnNpdmVQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Jlc3BvbnNpdmVQcm9wXCI7XG5cbmNvbnN0IHdpZHRoID0gKHsgd2lkdGggfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICB3aWR0aDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiB3aWR0aCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbWF4V2lkdGggPSAoeyBtYXhXaWR0aCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1heC13aWR0aDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtYXhXaWR0aCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbWluV2lkdGggPSAoeyBtaW5XaWR0aCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1pbi13aWR0aDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtaW5XaWR0aCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgaGVpZ2h0ID0gKHsgaGVpZ2h0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgaGVpZ2h0OiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IGhlaWdodCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbWF4SGVpZ2h0ID0gKHsgbWF4SGVpZ2h0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgbWF4LWhlaWdodDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtYXhIZWlnaHQsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IG1pbkhlaWdodCA9ICh7IG1pbkhlaWdodCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1pbi1oZWlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbWluSGVpZ2h0LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5leHBvcnQgZGVmYXVsdCBbd2lkdGgsIG1heFdpZHRoLCBtaW5XaWR0aCwgaGVpZ2h0LCBtYXhIZWlnaHQsIG1pbkhlaWdodF07XG4iXX0= */");
    },
    val: maxWidth,
    interpolation: "rem"
  });
};
var minWidth = function minWidth(_ref3) {
  var minWidth = _ref3.minWidth;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("min-width:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNpemVNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBMEJTIiwiZmlsZSI6InNpemVNaXhpbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IHJlc3BvbnNpdmVQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Jlc3BvbnNpdmVQcm9wXCI7XG5cbmNvbnN0IHdpZHRoID0gKHsgd2lkdGggfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICB3aWR0aDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiB3aWR0aCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbWF4V2lkdGggPSAoeyBtYXhXaWR0aCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1heC13aWR0aDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtYXhXaWR0aCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbWluV2lkdGggPSAoeyBtaW5XaWR0aCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1pbi13aWR0aDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtaW5XaWR0aCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgaGVpZ2h0ID0gKHsgaGVpZ2h0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgaGVpZ2h0OiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IGhlaWdodCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbWF4SGVpZ2h0ID0gKHsgbWF4SGVpZ2h0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgbWF4LWhlaWdodDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtYXhIZWlnaHQsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IG1pbkhlaWdodCA9ICh7IG1pbkhlaWdodCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1pbi1oZWlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbWluSGVpZ2h0LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5leHBvcnQgZGVmYXVsdCBbd2lkdGgsIG1heFdpZHRoLCBtaW5XaWR0aCwgaGVpZ2h0LCBtYXhIZWlnaHQsIG1pbkhlaWdodF07XG4iXX0= */");
    },
    val: minWidth,
    interpolation: "rem"
  });
};
var height = function height(_ref4) {
  var height = _ref4.height;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("height:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNpemVNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBb0NTIiwiZmlsZSI6InNpemVNaXhpbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IHJlc3BvbnNpdmVQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Jlc3BvbnNpdmVQcm9wXCI7XG5cbmNvbnN0IHdpZHRoID0gKHsgd2lkdGggfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICB3aWR0aDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiB3aWR0aCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbWF4V2lkdGggPSAoeyBtYXhXaWR0aCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1heC13aWR0aDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtYXhXaWR0aCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbWluV2lkdGggPSAoeyBtaW5XaWR0aCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1pbi13aWR0aDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtaW5XaWR0aCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgaGVpZ2h0ID0gKHsgaGVpZ2h0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgaGVpZ2h0OiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IGhlaWdodCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbWF4SGVpZ2h0ID0gKHsgbWF4SGVpZ2h0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgbWF4LWhlaWdodDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtYXhIZWlnaHQsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IG1pbkhlaWdodCA9ICh7IG1pbkhlaWdodCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1pbi1oZWlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbWluSGVpZ2h0LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5leHBvcnQgZGVmYXVsdCBbd2lkdGgsIG1heFdpZHRoLCBtaW5XaWR0aCwgaGVpZ2h0LCBtYXhIZWlnaHQsIG1pbkhlaWdodF07XG4iXX0= */");
    },
    val: height,
    interpolation: "rem"
  });
};
var maxHeight = function maxHeight(_ref5) {
  var maxHeight = _ref5.maxHeight;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("max-height:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNpemVNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBOENTIiwiZmlsZSI6InNpemVNaXhpbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IHJlc3BvbnNpdmVQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Jlc3BvbnNpdmVQcm9wXCI7XG5cbmNvbnN0IHdpZHRoID0gKHsgd2lkdGggfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICB3aWR0aDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiB3aWR0aCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbWF4V2lkdGggPSAoeyBtYXhXaWR0aCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1heC13aWR0aDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtYXhXaWR0aCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbWluV2lkdGggPSAoeyBtaW5XaWR0aCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1pbi13aWR0aDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtaW5XaWR0aCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgaGVpZ2h0ID0gKHsgaGVpZ2h0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgaGVpZ2h0OiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IGhlaWdodCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbWF4SGVpZ2h0ID0gKHsgbWF4SGVpZ2h0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgbWF4LWhlaWdodDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtYXhIZWlnaHQsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IG1pbkhlaWdodCA9ICh7IG1pbkhlaWdodCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1pbi1oZWlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbWluSGVpZ2h0LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5leHBvcnQgZGVmYXVsdCBbd2lkdGgsIG1heFdpZHRoLCBtaW5XaWR0aCwgaGVpZ2h0LCBtYXhIZWlnaHQsIG1pbkhlaWdodF07XG4iXX0= */");
    },
    val: maxHeight,
    interpolation: "rem"
  });
};
var minHeight = function minHeight(_ref6) {
  var minHeight = _ref6.minHeight;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("min-height:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNpemVNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBd0RTIiwiZmlsZSI6InNpemVNaXhpbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IHJlc3BvbnNpdmVQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Jlc3BvbnNpdmVQcm9wXCI7XG5cbmNvbnN0IHdpZHRoID0gKHsgd2lkdGggfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICB3aWR0aDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiB3aWR0aCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbWF4V2lkdGggPSAoeyBtYXhXaWR0aCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1heC13aWR0aDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtYXhXaWR0aCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbWluV2lkdGggPSAoeyBtaW5XaWR0aCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1pbi13aWR0aDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtaW5XaWR0aCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgaGVpZ2h0ID0gKHsgaGVpZ2h0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgaGVpZ2h0OiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IGhlaWdodCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbWF4SGVpZ2h0ID0gKHsgbWF4SGVpZ2h0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgbWF4LWhlaWdodDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtYXhIZWlnaHQsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IG1pbkhlaWdodCA9ICh7IG1pbkhlaWdodCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1pbi1oZWlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbWluSGVpZ2h0LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5leHBvcnQgZGVmYXVsdCBbd2lkdGgsIG1heFdpZHRoLCBtaW5XaWR0aCwgaGVpZ2h0LCBtYXhIZWlnaHQsIG1pbkhlaWdodF07XG4iXX0= */");
    },
    val: minHeight,
    interpolation: "rem"
  });
};
var sizeMixins = [width, maxWidth, minWidth, height, maxHeight, minHeight];

var m = function m(_ref) {
  var m = _ref.m;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("margin:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNwYWNlTWl4aW5zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU1TIiwiZmlsZSI6InNwYWNlTWl4aW5zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3NzIH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XG5pbXBvcnQgeyByZXNwb25zaXZlUHJvcCB9IGZyb20gXCIuLi8uLi91dGlscy9yZXNwb25zaXZlUHJvcFwiO1xuXG5jb25zdCBtID0gKHsgbSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1hcmdpbjogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBtLFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBteCA9ICh7IG14IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgbWFyZ2luLWxlZnQ6ICR7eH07XG4gICAgICAgIG1hcmdpbi1yaWdodDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBteCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbXkgPSAoeyBteSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1hcmdpbi10b3A6ICR7eH07XG4gICAgICAgIG1hcmdpbi1ib3R0b206ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbXksXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IHAgPSAoeyBwIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgcGFkZGluZzogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBwLFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBweCA9ICh7IHB4IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgcGFkZGluZy1sZWZ0OiAke3h9O1xuICAgICAgICBwYWRkaW5nLXJpZ2h0OiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IHB4LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBweSA9ICh7IHB5IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgcGFkZGluZy10b3A6ICR7eH07XG4gICAgICAgIHBhZGRpbmctYm90dG9tOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IHB5LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5leHBvcnQgZGVmYXVsdCBbbSwgbXgsIG15LCBteSwgcCwgcHgsIHB5LCBweV07XG4iXX0= */");
    },
    val: m,
    interpolation: "rem"
  });
};
var mx = function mx(_ref2) {
  var mx = _ref2.mx;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("margin-left:", x, ";margin-right:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNwYWNlTWl4aW5zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWdCUyIsImZpbGUiOiJzcGFjZU1peGlucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xuaW1wb3J0IHsgcmVzcG9uc2l2ZVByb3AgfSBmcm9tIFwiLi4vLi4vdXRpbHMvcmVzcG9uc2l2ZVByb3BcIjtcblxuY29uc3QgbSA9ICh7IG0gfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBtYXJnaW46ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbSxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbXggPSAoeyBteCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAke3h9O1xuICAgICAgICBtYXJnaW4tcmlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbXgsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IG15ID0gKHsgbXkgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBtYXJnaW4tdG9wOiAke3h9O1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IG15LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBwID0gKHsgcCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHBhZGRpbmc6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogcCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgcHggPSAoeyBweCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHBhZGRpbmctbGVmdDogJHt4fTtcbiAgICAgICAgcGFkZGluZy1yaWdodDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBweCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgcHkgPSAoeyBweSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHBhZGRpbmctdG9wOiAke3h9O1xuICAgICAgICBwYWRkaW5nLWJvdHRvbTogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBweSxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuZXhwb3J0IGRlZmF1bHQgW20sIG14LCBteSwgbXksIHAsIHB4LCBweSwgcHldO1xuIl19 */");
    },
    val: mx,
    interpolation: "rem"
  });
};
var my = function my(_ref3) {
  var my = _ref3.my;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("margin-top:", x, ";margin-bottom:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNwYWNlTWl4aW5zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTJCUyIsImZpbGUiOiJzcGFjZU1peGlucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xuaW1wb3J0IHsgcmVzcG9uc2l2ZVByb3AgfSBmcm9tIFwiLi4vLi4vdXRpbHMvcmVzcG9uc2l2ZVByb3BcIjtcblxuY29uc3QgbSA9ICh7IG0gfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBtYXJnaW46ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbSxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbXggPSAoeyBteCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAke3h9O1xuICAgICAgICBtYXJnaW4tcmlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbXgsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IG15ID0gKHsgbXkgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBtYXJnaW4tdG9wOiAke3h9O1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IG15LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBwID0gKHsgcCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHBhZGRpbmc6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogcCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgcHggPSAoeyBweCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHBhZGRpbmctbGVmdDogJHt4fTtcbiAgICAgICAgcGFkZGluZy1yaWdodDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBweCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgcHkgPSAoeyBweSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHBhZGRpbmctdG9wOiAke3h9O1xuICAgICAgICBwYWRkaW5nLWJvdHRvbTogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBweSxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuZXhwb3J0IGRlZmF1bHQgW20sIG14LCBteSwgbXksIHAsIHB4LCBweSwgcHldO1xuIl19 */");
    },
    val: my,
    interpolation: "rem"
  });
};
var p = function p(_ref4) {
  var p = _ref4.p;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("padding:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNwYWNlTWl4aW5zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXNDUyIsImZpbGUiOiJzcGFjZU1peGlucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xuaW1wb3J0IHsgcmVzcG9uc2l2ZVByb3AgfSBmcm9tIFwiLi4vLi4vdXRpbHMvcmVzcG9uc2l2ZVByb3BcIjtcblxuY29uc3QgbSA9ICh7IG0gfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBtYXJnaW46ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbSxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbXggPSAoeyBteCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAke3h9O1xuICAgICAgICBtYXJnaW4tcmlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbXgsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IG15ID0gKHsgbXkgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBtYXJnaW4tdG9wOiAke3h9O1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IG15LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBwID0gKHsgcCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHBhZGRpbmc6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogcCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgcHggPSAoeyBweCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHBhZGRpbmctbGVmdDogJHt4fTtcbiAgICAgICAgcGFkZGluZy1yaWdodDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBweCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgcHkgPSAoeyBweSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHBhZGRpbmctdG9wOiAke3h9O1xuICAgICAgICBwYWRkaW5nLWJvdHRvbTogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBweSxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuZXhwb3J0IGRlZmF1bHQgW20sIG14LCBteSwgbXksIHAsIHB4LCBweSwgcHldO1xuIl19 */");
    },
    val: p,
    interpolation: "rem"
  });
};
var px = function px(_ref5) {
  var px = _ref5.px;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("padding-left:", x, ";padding-right:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNwYWNlTWl4aW5zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWdEUyIsImZpbGUiOiJzcGFjZU1peGlucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xuaW1wb3J0IHsgcmVzcG9uc2l2ZVByb3AgfSBmcm9tIFwiLi4vLi4vdXRpbHMvcmVzcG9uc2l2ZVByb3BcIjtcblxuY29uc3QgbSA9ICh7IG0gfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBtYXJnaW46ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbSxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbXggPSAoeyBteCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAke3h9O1xuICAgICAgICBtYXJnaW4tcmlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbXgsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IG15ID0gKHsgbXkgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBtYXJnaW4tdG9wOiAke3h9O1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IG15LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBwID0gKHsgcCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHBhZGRpbmc6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogcCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgcHggPSAoeyBweCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHBhZGRpbmctbGVmdDogJHt4fTtcbiAgICAgICAgcGFkZGluZy1yaWdodDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBweCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgcHkgPSAoeyBweSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHBhZGRpbmctdG9wOiAke3h9O1xuICAgICAgICBwYWRkaW5nLWJvdHRvbTogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBweSxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuZXhwb3J0IGRlZmF1bHQgW20sIG14LCBteSwgbXksIHAsIHB4LCBweSwgcHldO1xuIl19 */");
    },
    val: px,
    interpolation: "rem"
  });
};
var py = function py(_ref6) {
  var py = _ref6.py;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("padding-top:", x, ";padding-bottom:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNwYWNlTWl4aW5zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTJEUyIsImZpbGUiOiJzcGFjZU1peGlucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xuaW1wb3J0IHsgcmVzcG9uc2l2ZVByb3AgfSBmcm9tIFwiLi4vLi4vdXRpbHMvcmVzcG9uc2l2ZVByb3BcIjtcblxuY29uc3QgbSA9ICh7IG0gfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBtYXJnaW46ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbSxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgbXggPSAoeyBteCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAke3h9O1xuICAgICAgICBtYXJnaW4tcmlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbXgsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IG15ID0gKHsgbXkgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBtYXJnaW4tdG9wOiAke3h9O1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IG15LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBwID0gKHsgcCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHBhZGRpbmc6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogcCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgcHggPSAoeyBweCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHBhZGRpbmctbGVmdDogJHt4fTtcbiAgICAgICAgcGFkZGluZy1yaWdodDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBweCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgcHkgPSAoeyBweSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHBhZGRpbmctdG9wOiAke3h9O1xuICAgICAgICBwYWRkaW5nLWJvdHRvbTogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBweSxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuZXhwb3J0IGRlZmF1bHQgW20sIG14LCBteSwgbXksIHAsIHB4LCBweSwgcHldO1xuIl19 */");
    },
    val: py,
    interpolation: "rem"
  });
};
var spaceMixins = [m, mx, my, my, p, px, py, py];

var Grid = /*#__PURE__*/_styled("div", process.env.NODE_ENV === "production" ? {
  target: "eggk0at1"
} : {
  target: "eggk0at1",
  label: "Grid"
})(devMixins, " ", gridMixins, " ", sizeMixins, " ", spaceMixins, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkdyaWQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBT3VCIiwiZmlsZSI6IkdyaWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc3R5bGVkIGZyb20gXCJAZW1vdGlvbi9zdHlsZWRcIjtcbmltcG9ydCBncmlkTWl4aW5zIGZyb20gXCIuLi8uLi9taXhpbnMvcmVzcG9uc2l2ZVByb3BzL2dyaWRNaXhpbnNcIjtcbmltcG9ydCBncmlkSXRlbU1peGlucyBmcm9tIFwiLi4vLi4vbWl4aW5zL3Jlc3BvbnNpdmVQcm9wcy9ncmlkSXRlbU1peGluc1wiO1xuaW1wb3J0IGRldk1peGlucyBmcm9tIFwiLi4vLi4vbWl4aW5zL3Jlc3BvbnNpdmVQcm9wcy9kZXZNaXhpbnNcIjtcbmltcG9ydCBzaXplTWl4aW5zIGZyb20gXCIuLi8uLi9taXhpbnMvcmVzcG9uc2l2ZVByb3BzL3NpemVNaXhpbnNcIjtcbmltcG9ydCBzcGFjZU1peGlucyBmcm9tIFwiLi4vLi4vbWl4aW5zL3Jlc3BvbnNpdmVQcm9wcy9zcGFjZU1peGluc1wiO1xuXG5jb25zdCBHcmlkID0gc3R5bGVkLmRpdmBcbiAgJHtkZXZNaXhpbnN9XG4gICR7Z3JpZE1peGluc31cbiAgJHtzaXplTWl4aW5zfVxuICAke3NwYWNlTWl4aW5zfVxuYDtcblxuY29uc3QgSXRlbSA9IHN0eWxlZC5kaXZgXG4gICR7ZGV2TWl4aW5zfVxuICAke2dyaWRJdGVtTWl4aW5zfVxuICAke3NpemVNaXhpbnN9XG4gICR7c3BhY2VNaXhpbnN9XG5gO1xuXG5HcmlkLkl0ZW0gPSBJdGVtO1xuZXhwb3J0IGRlZmF1bHQgR3JpZDtcbiJdfQ== */"));
var Item = /*#__PURE__*/_styled("div", process.env.NODE_ENV === "production" ? {
  target: "eggk0at0"
} : {
  target: "eggk0at0",
  label: "Item"
})(devMixins, " ", gridItemMixins, " ", sizeMixins, " ", spaceMixins, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkdyaWQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBY3VCIiwiZmlsZSI6IkdyaWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc3R5bGVkIGZyb20gXCJAZW1vdGlvbi9zdHlsZWRcIjtcbmltcG9ydCBncmlkTWl4aW5zIGZyb20gXCIuLi8uLi9taXhpbnMvcmVzcG9uc2l2ZVByb3BzL2dyaWRNaXhpbnNcIjtcbmltcG9ydCBncmlkSXRlbU1peGlucyBmcm9tIFwiLi4vLi4vbWl4aW5zL3Jlc3BvbnNpdmVQcm9wcy9ncmlkSXRlbU1peGluc1wiO1xuaW1wb3J0IGRldk1peGlucyBmcm9tIFwiLi4vLi4vbWl4aW5zL3Jlc3BvbnNpdmVQcm9wcy9kZXZNaXhpbnNcIjtcbmltcG9ydCBzaXplTWl4aW5zIGZyb20gXCIuLi8uLi9taXhpbnMvcmVzcG9uc2l2ZVByb3BzL3NpemVNaXhpbnNcIjtcbmltcG9ydCBzcGFjZU1peGlucyBmcm9tIFwiLi4vLi4vbWl4aW5zL3Jlc3BvbnNpdmVQcm9wcy9zcGFjZU1peGluc1wiO1xuXG5jb25zdCBHcmlkID0gc3R5bGVkLmRpdmBcbiAgJHtkZXZNaXhpbnN9XG4gICR7Z3JpZE1peGluc31cbiAgJHtzaXplTWl4aW5zfVxuICAke3NwYWNlTWl4aW5zfVxuYDtcblxuY29uc3QgSXRlbSA9IHN0eWxlZC5kaXZgXG4gICR7ZGV2TWl4aW5zfVxuICAke2dyaWRJdGVtTWl4aW5zfVxuICAke3NpemVNaXhpbnN9XG4gICR7c3BhY2VNaXhpbnN9XG5gO1xuXG5HcmlkLkl0ZW0gPSBJdGVtO1xuZXhwb3J0IGRlZmF1bHQgR3JpZDtcbiJdfQ== */"));
Grid.Item = Item;

var _excluded$1 = ["maxWidth", "xPadding", "backgroundColor", "children", "as"];
var Section = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
  var _theme$section, _theme$section2;
  var maxWidth = _ref.maxWidth,
    xPadding = _ref.xPadding,
    backgroundColor = _ref.backgroundColor,
    children = _ref.children,
    as = _ref.as,
    restProps = _objectWithoutProperties(_ref, _excluded$1);
  var _useResponsive = useResponsive(),
    breakpointIndex = _useResponsive.breakpointIndex;
  var theme = useTheme(ThemeContext);
  var xPadArr = arrayifyProp((theme === null || theme === void 0 ? void 0 : (_theme$section = theme.section) === null || _theme$section === void 0 ? void 0 : _theme$section.xPadding) || 0);
  return jsx(Outer, {
    backgroundColor: backgroundColor,
    as: as
  }, jsx(Inner, _extends({
    ref: ref,
    maxWidth: maxWidth || (theme === null || theme === void 0 ? void 0 : (_theme$section2 = theme.section) === null || _theme$section2 === void 0 ? void 0 : _theme$section2.maxWidth),
    xPadding: arrayifyProp(xPadding)[breakpointIndex] || xPadArr[breakpointIndex]
  }, restProps), children));
});
var Inner = /*#__PURE__*/_styled("div", process.env.NODE_ENV === "production" ? {
  target: "ebf42ix1"
} : {
  target: "ebf42ix1",
  label: "Inner"
})("margin:0 auto;max-width:", function (_ref2) {
  var maxWidth = _ref2.maxWidth,
    xPadding = _ref2.xPadding;
  return "calc(".concat(maxWidth, " + ").concat(xPadding, " + ").concat(xPadding, ")");
}, ";padding:", function (_ref3) {
  var xPadding = _ref3.xPadding;
  return "0 ".concat(xPadding);
}, ";", devMixins, " ", sizeMixins, " ", spaceMixins, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNlY3Rpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBc0N3QiIsImZpbGUiOiJTZWN0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHN0eWxlZCBmcm9tIFwiQGVtb3Rpb24vc3R5bGVkXCI7XG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyB1c2VSZXNwb25zaXZlIH0gZnJvbSBcIi4uLy4uL2hvb2tzL3VzZVJlc3BvbnNpdmUvdXNlUmVzcG9uc2l2ZVwiO1xuaW1wb3J0IHsgVGhlbWVDb250ZXh0LCB1c2VUaGVtZSB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xuaW1wb3J0IHsgYXJyYXlpZnlQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2FycmF5aWZ5UHJvcFwiO1xuaW1wb3J0IGRldk1peGlucyBmcm9tIFwiLi4vLi4vbWl4aW5zL3Jlc3BvbnNpdmVQcm9wcy9kZXZNaXhpbnNcIjtcbmltcG9ydCBzcGFjZU1peGlucyBmcm9tIFwiLi4vLi4vbWl4aW5zL3Jlc3BvbnNpdmVQcm9wcy9zcGFjZU1peGluc1wiO1xuaW1wb3J0IHNpemVNaXhpbnMgZnJvbSBcIi4uLy4uL21peGlucy9yZXNwb25zaXZlUHJvcHMvc2l6ZU1peGluc1wiO1xuXG5jb25zdCBTZWN0aW9uID0gUmVhY3QuZm9yd2FyZFJlZihcbiAgKFxuICAgIHsgbWF4V2lkdGgsIHhQYWRkaW5nLCBiYWNrZ3JvdW5kQ29sb3IsIGNoaWxkcmVuLCBhcywgLi4ucmVzdFByb3BzIH0sXG4gICAgcmVmXG4gICkgPT4ge1xuICAgIGNvbnN0IHsgYnJlYWtwb2ludEluZGV4IH0gPSB1c2VSZXNwb25zaXZlKCk7XG4gICAgY29uc3QgdGhlbWUgPSB1c2VUaGVtZShUaGVtZUNvbnRleHQpO1xuXG4gICAgY29uc3QgeFBhZEFyciA9IGFycmF5aWZ5UHJvcCh0aGVtZT8uc2VjdGlvbj8ueFBhZGRpbmcgfHwgMCk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPE91dGVyIGJhY2tncm91bmRDb2xvcj17YmFja2dyb3VuZENvbG9yfSBhcz17YXN9PlxuICAgICAgICA8SW5uZXJcbiAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICBtYXhXaWR0aD17bWF4V2lkdGggfHwgdGhlbWU/LnNlY3Rpb24/Lm1heFdpZHRofVxuICAgICAgICAgIHhQYWRkaW5nPXtcbiAgICAgICAgICAgIGFycmF5aWZ5UHJvcCh4UGFkZGluZylbYnJlYWtwb2ludEluZGV4XSB8fCB4UGFkQXJyW2JyZWFrcG9pbnRJbmRleF1cbiAgICAgICAgICB9XG4gICAgICAgICAgey4uLnJlc3RQcm9wc31cbiAgICAgICAgPlxuICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgPC9Jbm5lcj5cbiAgICAgIDwvT3V0ZXI+XG4gICAgKTtcbiAgfVxuKTtcblxuZXhwb3J0IGRlZmF1bHQgU2VjdGlvbjtcblxuY29uc3QgSW5uZXIgPSBzdHlsZWQuZGl2YFxuICBtYXJnaW46IDAgYXV0bztcbiAgbWF4LXdpZHRoOiAkeyh7IG1heFdpZHRoLCB4UGFkZGluZyB9KSA9PlxuICAgIGBjYWxjKCR7bWF4V2lkdGh9ICsgJHt4UGFkZGluZ30gKyAke3hQYWRkaW5nfSlgfTtcbiAgcGFkZGluZzogJHsoeyB4UGFkZGluZyB9KSA9PiBgMCAke3hQYWRkaW5nfWB9O1xuXG4gICR7ZGV2TWl4aW5zfVxuICAke3NpemVNaXhpbnN9XG4gICR7c3BhY2VNaXhpbnN9XG5gO1xuXG5jb25zdCBPdXRlciA9IHN0eWxlZC5zZWN0aW9uYFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAkeyhwcm9wcykgPT5cbiAgICBwcm9wcy5iYWNrZ3JvdW5kQ29sb3IgfHwgcHJvcHMudGhlbWU/LnBhbGV0dGU/LmJhY2tncm91bmR9O1xuXG4gICR7ZGV2TWl4aW5zfVxuYDtcbiJdfQ== */"));
var Outer = /*#__PURE__*/_styled("section", process.env.NODE_ENV === "production" ? {
  target: "ebf42ix0"
} : {
  target: "ebf42ix0",
  label: "Outer"
})("background-color:", function (props) {
  var _props$theme, _props$theme$palette;
  return props.backgroundColor || ((_props$theme = props.theme) === null || _props$theme === void 0 ? void 0 : (_props$theme$palette = _props$theme.palette) === null || _props$theme$palette === void 0 ? void 0 : _props$theme$palette.background);
}, ";", devMixins, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNlY3Rpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBaUQ0QiIsImZpbGUiOiJTZWN0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHN0eWxlZCBmcm9tIFwiQGVtb3Rpb24vc3R5bGVkXCI7XG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyB1c2VSZXNwb25zaXZlIH0gZnJvbSBcIi4uLy4uL2hvb2tzL3VzZVJlc3BvbnNpdmUvdXNlUmVzcG9uc2l2ZVwiO1xuaW1wb3J0IHsgVGhlbWVDb250ZXh0LCB1c2VUaGVtZSB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xuaW1wb3J0IHsgYXJyYXlpZnlQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2FycmF5aWZ5UHJvcFwiO1xuaW1wb3J0IGRldk1peGlucyBmcm9tIFwiLi4vLi4vbWl4aW5zL3Jlc3BvbnNpdmVQcm9wcy9kZXZNaXhpbnNcIjtcbmltcG9ydCBzcGFjZU1peGlucyBmcm9tIFwiLi4vLi4vbWl4aW5zL3Jlc3BvbnNpdmVQcm9wcy9zcGFjZU1peGluc1wiO1xuaW1wb3J0IHNpemVNaXhpbnMgZnJvbSBcIi4uLy4uL21peGlucy9yZXNwb25zaXZlUHJvcHMvc2l6ZU1peGluc1wiO1xuXG5jb25zdCBTZWN0aW9uID0gUmVhY3QuZm9yd2FyZFJlZihcbiAgKFxuICAgIHsgbWF4V2lkdGgsIHhQYWRkaW5nLCBiYWNrZ3JvdW5kQ29sb3IsIGNoaWxkcmVuLCBhcywgLi4ucmVzdFByb3BzIH0sXG4gICAgcmVmXG4gICkgPT4ge1xuICAgIGNvbnN0IHsgYnJlYWtwb2ludEluZGV4IH0gPSB1c2VSZXNwb25zaXZlKCk7XG4gICAgY29uc3QgdGhlbWUgPSB1c2VUaGVtZShUaGVtZUNvbnRleHQpO1xuXG4gICAgY29uc3QgeFBhZEFyciA9IGFycmF5aWZ5UHJvcCh0aGVtZT8uc2VjdGlvbj8ueFBhZGRpbmcgfHwgMCk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPE91dGVyIGJhY2tncm91bmRDb2xvcj17YmFja2dyb3VuZENvbG9yfSBhcz17YXN9PlxuICAgICAgICA8SW5uZXJcbiAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICBtYXhXaWR0aD17bWF4V2lkdGggfHwgdGhlbWU/LnNlY3Rpb24/Lm1heFdpZHRofVxuICAgICAgICAgIHhQYWRkaW5nPXtcbiAgICAgICAgICAgIGFycmF5aWZ5UHJvcCh4UGFkZGluZylbYnJlYWtwb2ludEluZGV4XSB8fCB4UGFkQXJyW2JyZWFrcG9pbnRJbmRleF1cbiAgICAgICAgICB9XG4gICAgICAgICAgey4uLnJlc3RQcm9wc31cbiAgICAgICAgPlxuICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgPC9Jbm5lcj5cbiAgICAgIDwvT3V0ZXI+XG4gICAgKTtcbiAgfVxuKTtcblxuZXhwb3J0IGRlZmF1bHQgU2VjdGlvbjtcblxuY29uc3QgSW5uZXIgPSBzdHlsZWQuZGl2YFxuICBtYXJnaW46IDAgYXV0bztcbiAgbWF4LXdpZHRoOiAkeyh7IG1heFdpZHRoLCB4UGFkZGluZyB9KSA9PlxuICAgIGBjYWxjKCR7bWF4V2lkdGh9ICsgJHt4UGFkZGluZ30gKyAke3hQYWRkaW5nfSlgfTtcbiAgcGFkZGluZzogJHsoeyB4UGFkZGluZyB9KSA9PiBgMCAke3hQYWRkaW5nfWB9O1xuXG4gICR7ZGV2TWl4aW5zfVxuICAke3NpemVNaXhpbnN9XG4gICR7c3BhY2VNaXhpbnN9XG5gO1xuXG5jb25zdCBPdXRlciA9IHN0eWxlZC5zZWN0aW9uYFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAkeyhwcm9wcykgPT5cbiAgICBwcm9wcy5iYWNrZ3JvdW5kQ29sb3IgfHwgcHJvcHMudGhlbWU/LnBhbGV0dGU/LmJhY2tncm91bmR9O1xuXG4gICR7ZGV2TWl4aW5zfVxuYDtcbiJdfQ== */"));

var backgroundColor = function backgroundColor(_ref) {
  var backgroundColor = _ref.backgroundColor;
  return backgroundColor && responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("background-color:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNwYWNlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFVUyIsImZpbGUiOiJTcGFjZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc3R5bGVkIGZyb20gXCJAZW1vdGlvbi9zdHlsZWRcIjtcbmltcG9ydCBzaXplTWl4aW5zIGZyb20gXCIuLi8uLi9taXhpbnMvcmVzcG9uc2l2ZVByb3BzL3NpemVNaXhpbnNcIjtcbmltcG9ydCBkZXZNaXhpbnMgZnJvbSBcIi4uLy4uL21peGlucy9yZXNwb25zaXZlUHJvcHMvZGV2TWl4aW5zXCI7XG5pbXBvcnQgeyByZXNwb25zaXZlUHJvcCB9IGZyb20gXCIuLi8uLi91dGlscy9yZXNwb25zaXZlUHJvcFwiO1xuaW1wb3J0IHsgY3NzIH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XG5cbmNvbnN0IGJhY2tncm91bmRDb2xvciA9ICh7IGJhY2tncm91bmRDb2xvciB9KSA9PlxuICBiYWNrZ3JvdW5kQ29sb3IgJiZcbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IGJhY2tncm91bmRDb2xvcixcbiAgfSk7XG5cbmNvbnN0IFNwYWNlciA9IHN0eWxlZC5kaXZgXG4gICR7ZGV2TWl4aW5zfVxuXG4gIC8vIGFkZHMgYSBkZWZhdWx0IGJhY2tncm91bmQgY29sb3IgZnJvbSB0aGVtZVxuICAkeyhwcm9wcykgPT5cbiAgICBwcm9wcy50aGVtZT8ucGFsZXR0ZT8uYmFja2dyb3VuZCAmJlxuICAgIGBiYWNrZ3JvdW5kLWNvbG9yOiAke3Byb3BzLnRoZW1lLnBhbGV0dGUuYmFja2dyb3VuZH1gfVxuXG4gIC8vIG92ZXJyaWRlcyBiYWNrZ3JvdW5kIGNvbG9yIGZyb20gcHJvcHNcbiAgJHtiYWNrZ3JvdW5kQ29sb3J9XG5cbiAgJHtzaXplTWl4aW5zfVxuYDtcblxuU3BhY2VyLmRlZmF1bHRQcm9wcyA9IHtcbiAgaGVpZ2h0OiAxLFxuICAvLyAgIGJhY2tncm91bmRDb2xvcjogKHByb3BzKSA9PiBwcm9wcy50aGVtZS5wYWxldHRlLmJhY2tncm91bmQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBTcGFjZXI7XG4iXX0= */");
    },
    val: backgroundColor
  });
};
var Spacer = /*#__PURE__*/_styled("div", process.env.NODE_ENV === "production" ? {
  target: "eeqcce90"
} : {
  target: "eeqcce90",
  label: "Spacer"
})(devMixins, function (props) {
  var _props$theme, _props$theme$palette;
  return ((_props$theme = props.theme) === null || _props$theme === void 0 ? void 0 : (_props$theme$palette = _props$theme.palette) === null || _props$theme$palette === void 0 ? void 0 : _props$theme$palette.background) && "background-color: ".concat(props.theme.palette.background);
}, backgroundColor, " ", sizeMixins, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNwYWNlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFnQnlCIiwiZmlsZSI6IlNwYWNlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzdHlsZWQgZnJvbSBcIkBlbW90aW9uL3N0eWxlZFwiO1xuaW1wb3J0IHNpemVNaXhpbnMgZnJvbSBcIi4uLy4uL21peGlucy9yZXNwb25zaXZlUHJvcHMvc2l6ZU1peGluc1wiO1xuaW1wb3J0IGRldk1peGlucyBmcm9tIFwiLi4vLi4vbWl4aW5zL3Jlc3BvbnNpdmVQcm9wcy9kZXZNaXhpbnNcIjtcbmltcG9ydCB7IHJlc3BvbnNpdmVQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Jlc3BvbnNpdmVQcm9wXCI7XG5pbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcblxuY29uc3QgYmFja2dyb3VuZENvbG9yID0gKHsgYmFja2dyb3VuZENvbG9yIH0pID0+XG4gIGJhY2tncm91bmRDb2xvciAmJlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogYmFja2dyb3VuZENvbG9yLFxuICB9KTtcblxuY29uc3QgU3BhY2VyID0gc3R5bGVkLmRpdmBcbiAgJHtkZXZNaXhpbnN9XG5cbiAgLy8gYWRkcyBhIGRlZmF1bHQgYmFja2dyb3VuZCBjb2xvciBmcm9tIHRoZW1lXG4gICR7KHByb3BzKSA9PlxuICAgIHByb3BzLnRoZW1lPy5wYWxldHRlPy5iYWNrZ3JvdW5kICYmXG4gICAgYGJhY2tncm91bmQtY29sb3I6ICR7cHJvcHMudGhlbWUucGFsZXR0ZS5iYWNrZ3JvdW5kfWB9XG5cbiAgLy8gb3ZlcnJpZGVzIGJhY2tncm91bmQgY29sb3IgZnJvbSBwcm9wc1xuICAke2JhY2tncm91bmRDb2xvcn1cblxuICAke3NpemVNaXhpbnN9XG5gO1xuXG5TcGFjZXIuZGVmYXVsdFByb3BzID0ge1xuICBoZWlnaHQ6IDEsXG4gIC8vICAgYmFja2dyb3VuZENvbG9yOiAocHJvcHMpID0+IHByb3BzLnRoZW1lLnBhbGV0dGUuYmFja2dyb3VuZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNwYWNlcjtcbiJdfQ== */"));
Spacer.defaultProps = {
  height: 1
  //   backgroundColor: (props) => props.theme.palette.background,
};

var color = function color(_ref) {
  var color = _ref.color;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("color:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInR5cG9ncmFwaHlNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBTVMiLCJmaWxlIjoidHlwb2dyYXBoeU1peGlucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xuaW1wb3J0IHsgcmVzcG9uc2l2ZVByb3AgfSBmcm9tIFwiLi4vLi4vdXRpbHMvcmVzcG9uc2l2ZVByb3BcIjtcblxuY29uc3QgY29sb3IgPSAoeyBjb2xvciB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGNvbG9yOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IGNvbG9yLFxuICB9KTtcblxuY29uc3QgZm9udEZhbWlseSA9ICh7IGZvbnRGYW1pbHkgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBmb250LWZhbWlseTogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBmb250RmFtaWx5LFxuICB9KTtcblxuY29uc3QgZm9udFNpemUgPSAoeyBmb250U2l6ZSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGZvbnQtc2l6ZTogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBmb250U2l6ZSxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgZm9udFdlaWdodCA9ICh7IGZvbnRXZWlnaHQgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBmb250LXdlaWdodDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBmb250V2VpZ2h0LFxuICB9KTtcblxuY29uc3QgbGluZUhlaWdodCA9ICh7IGxpbmVIZWlnaHQgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBsaW5lLWhlaWdodDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBsaW5lSGVpZ2h0LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCB0ZXh0QWxpZ24gPSAoeyB0ZXh0QWxpZ24gfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICB0ZXh0LWFsaWduOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IHRleHRBbGlnbixcbiAgfSk7XG5cbmNvbnN0IHRleHREZWNvcmF0aW9uID0gKHsgdGV4dERlY29yYXRpb24gfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICB0ZXh0LWRlY29yYXRpb246ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogdGV4dERlY29yYXRpb24sXG4gIH0pO1xuXG5jb25zdCB0ZXh0VHJhbnNmb3JtID0gKHsgdGV4dFRyYW5zZm9ybSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHRleHQtdHJhbnNmb3JtOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IHRleHRUcmFuc2Zvcm0sXG4gIH0pO1xuXG5leHBvcnQgZGVmYXVsdCBbXG4gIGZvbnRGYW1pbHksXG4gIGZvbnRTaXplLFxuICBmb250V2VpZ2h0LFxuICBsaW5lSGVpZ2h0LFxuICBjb2xvcixcbiAgdGV4dEFsaWduLFxuICB0ZXh0RGVjb3JhdGlvbixcbiAgdGV4dFRyYW5zZm9ybSxcbl07XG4iXX0= */");
    },
    val: color
  });
};
var fontFamily = function fontFamily(_ref2) {
  var fontFamily = _ref2.fontFamily;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("font-family:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInR5cG9ncmFwaHlNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBZVMiLCJmaWxlIjoidHlwb2dyYXBoeU1peGlucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xuaW1wb3J0IHsgcmVzcG9uc2l2ZVByb3AgfSBmcm9tIFwiLi4vLi4vdXRpbHMvcmVzcG9uc2l2ZVByb3BcIjtcblxuY29uc3QgY29sb3IgPSAoeyBjb2xvciB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGNvbG9yOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IGNvbG9yLFxuICB9KTtcblxuY29uc3QgZm9udEZhbWlseSA9ICh7IGZvbnRGYW1pbHkgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBmb250LWZhbWlseTogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBmb250RmFtaWx5LFxuICB9KTtcblxuY29uc3QgZm9udFNpemUgPSAoeyBmb250U2l6ZSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGZvbnQtc2l6ZTogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBmb250U2l6ZSxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgZm9udFdlaWdodCA9ICh7IGZvbnRXZWlnaHQgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBmb250LXdlaWdodDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBmb250V2VpZ2h0LFxuICB9KTtcblxuY29uc3QgbGluZUhlaWdodCA9ICh7IGxpbmVIZWlnaHQgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBsaW5lLWhlaWdodDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBsaW5lSGVpZ2h0LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCB0ZXh0QWxpZ24gPSAoeyB0ZXh0QWxpZ24gfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICB0ZXh0LWFsaWduOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IHRleHRBbGlnbixcbiAgfSk7XG5cbmNvbnN0IHRleHREZWNvcmF0aW9uID0gKHsgdGV4dERlY29yYXRpb24gfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICB0ZXh0LWRlY29yYXRpb246ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogdGV4dERlY29yYXRpb24sXG4gIH0pO1xuXG5jb25zdCB0ZXh0VHJhbnNmb3JtID0gKHsgdGV4dFRyYW5zZm9ybSB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHRleHQtdHJhbnNmb3JtOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IHRleHRUcmFuc2Zvcm0sXG4gIH0pO1xuXG5leHBvcnQgZGVmYXVsdCBbXG4gIGZvbnRGYW1pbHksXG4gIGZvbnRTaXplLFxuICBmb250V2VpZ2h0LFxuICBsaW5lSGVpZ2h0LFxuICBjb2xvcixcbiAgdGV4dEFsaWduLFxuICB0ZXh0RGVjb3JhdGlvbixcbiAgdGV4dFRyYW5zZm9ybSxcbl07XG4iXX0= */");
    },
    val: fontFamily
  });
};
var fontSize = function fontSize(_ref3) {
  var fontSize = _ref3.fontSize;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("font-size:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInR5cG9ncmFwaHlNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBd0JTIiwiZmlsZSI6InR5cG9ncmFwaHlNaXhpbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IHJlc3BvbnNpdmVQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Jlc3BvbnNpdmVQcm9wXCI7XG5cbmNvbnN0IGNvbG9yID0gKHsgY29sb3IgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBjb2xvcjogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBjb2xvcixcbiAgfSk7XG5cbmNvbnN0IGZvbnRGYW1pbHkgPSAoeyBmb250RmFtaWx5IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgZm9udC1mYW1pbHk6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZm9udEZhbWlseSxcbiAgfSk7XG5cbmNvbnN0IGZvbnRTaXplID0gKHsgZm9udFNpemUgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBmb250LXNpemU6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZm9udFNpemUsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IGZvbnRXZWlnaHQgPSAoeyBmb250V2VpZ2h0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgZm9udC13ZWlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZm9udFdlaWdodCxcbiAgfSk7XG5cbmNvbnN0IGxpbmVIZWlnaHQgPSAoeyBsaW5lSGVpZ2h0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgbGluZS1oZWlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbGluZUhlaWdodCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgdGV4dEFsaWduID0gKHsgdGV4dEFsaWduIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgdGV4dC1hbGlnbjogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiB0ZXh0QWxpZ24sXG4gIH0pO1xuXG5jb25zdCB0ZXh0RGVjb3JhdGlvbiA9ICh7IHRleHREZWNvcmF0aW9uIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IHRleHREZWNvcmF0aW9uLFxuICB9KTtcblxuY29uc3QgdGV4dFRyYW5zZm9ybSA9ICh7IHRleHRUcmFuc2Zvcm0gfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICB0ZXh0LXRyYW5zZm9ybTogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiB0ZXh0VHJhbnNmb3JtLFxuICB9KTtcblxuZXhwb3J0IGRlZmF1bHQgW1xuICBmb250RmFtaWx5LFxuICBmb250U2l6ZSxcbiAgZm9udFdlaWdodCxcbiAgbGluZUhlaWdodCxcbiAgY29sb3IsXG4gIHRleHRBbGlnbixcbiAgdGV4dERlY29yYXRpb24sXG4gIHRleHRUcmFuc2Zvcm0sXG5dO1xuIl19 */");
    },
    val: fontSize,
    interpolation: "rem"
  });
};
var fontWeight = function fontWeight(_ref4) {
  var fontWeight = _ref4.fontWeight;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("font-weight:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInR5cG9ncmFwaHlNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBa0NTIiwiZmlsZSI6InR5cG9ncmFwaHlNaXhpbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IHJlc3BvbnNpdmVQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Jlc3BvbnNpdmVQcm9wXCI7XG5cbmNvbnN0IGNvbG9yID0gKHsgY29sb3IgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBjb2xvcjogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBjb2xvcixcbiAgfSk7XG5cbmNvbnN0IGZvbnRGYW1pbHkgPSAoeyBmb250RmFtaWx5IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgZm9udC1mYW1pbHk6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZm9udEZhbWlseSxcbiAgfSk7XG5cbmNvbnN0IGZvbnRTaXplID0gKHsgZm9udFNpemUgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBmb250LXNpemU6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZm9udFNpemUsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IGZvbnRXZWlnaHQgPSAoeyBmb250V2VpZ2h0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgZm9udC13ZWlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZm9udFdlaWdodCxcbiAgfSk7XG5cbmNvbnN0IGxpbmVIZWlnaHQgPSAoeyBsaW5lSGVpZ2h0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgbGluZS1oZWlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbGluZUhlaWdodCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgdGV4dEFsaWduID0gKHsgdGV4dEFsaWduIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgdGV4dC1hbGlnbjogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiB0ZXh0QWxpZ24sXG4gIH0pO1xuXG5jb25zdCB0ZXh0RGVjb3JhdGlvbiA9ICh7IHRleHREZWNvcmF0aW9uIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IHRleHREZWNvcmF0aW9uLFxuICB9KTtcblxuY29uc3QgdGV4dFRyYW5zZm9ybSA9ICh7IHRleHRUcmFuc2Zvcm0gfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICB0ZXh0LXRyYW5zZm9ybTogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiB0ZXh0VHJhbnNmb3JtLFxuICB9KTtcblxuZXhwb3J0IGRlZmF1bHQgW1xuICBmb250RmFtaWx5LFxuICBmb250U2l6ZSxcbiAgZm9udFdlaWdodCxcbiAgbGluZUhlaWdodCxcbiAgY29sb3IsXG4gIHRleHRBbGlnbixcbiAgdGV4dERlY29yYXRpb24sXG4gIHRleHRUcmFuc2Zvcm0sXG5dO1xuIl19 */");
    },
    val: fontWeight
  });
};
var lineHeight = function lineHeight(_ref5) {
  var lineHeight = _ref5.lineHeight;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("line-height:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInR5cG9ncmFwaHlNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBMkNTIiwiZmlsZSI6InR5cG9ncmFwaHlNaXhpbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IHJlc3BvbnNpdmVQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Jlc3BvbnNpdmVQcm9wXCI7XG5cbmNvbnN0IGNvbG9yID0gKHsgY29sb3IgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBjb2xvcjogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBjb2xvcixcbiAgfSk7XG5cbmNvbnN0IGZvbnRGYW1pbHkgPSAoeyBmb250RmFtaWx5IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgZm9udC1mYW1pbHk6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZm9udEZhbWlseSxcbiAgfSk7XG5cbmNvbnN0IGZvbnRTaXplID0gKHsgZm9udFNpemUgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBmb250LXNpemU6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZm9udFNpemUsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IGZvbnRXZWlnaHQgPSAoeyBmb250V2VpZ2h0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgZm9udC13ZWlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZm9udFdlaWdodCxcbiAgfSk7XG5cbmNvbnN0IGxpbmVIZWlnaHQgPSAoeyBsaW5lSGVpZ2h0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgbGluZS1oZWlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbGluZUhlaWdodCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgdGV4dEFsaWduID0gKHsgdGV4dEFsaWduIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgdGV4dC1hbGlnbjogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiB0ZXh0QWxpZ24sXG4gIH0pO1xuXG5jb25zdCB0ZXh0RGVjb3JhdGlvbiA9ICh7IHRleHREZWNvcmF0aW9uIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IHRleHREZWNvcmF0aW9uLFxuICB9KTtcblxuY29uc3QgdGV4dFRyYW5zZm9ybSA9ICh7IHRleHRUcmFuc2Zvcm0gfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICB0ZXh0LXRyYW5zZm9ybTogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiB0ZXh0VHJhbnNmb3JtLFxuICB9KTtcblxuZXhwb3J0IGRlZmF1bHQgW1xuICBmb250RmFtaWx5LFxuICBmb250U2l6ZSxcbiAgZm9udFdlaWdodCxcbiAgbGluZUhlaWdodCxcbiAgY29sb3IsXG4gIHRleHRBbGlnbixcbiAgdGV4dERlY29yYXRpb24sXG4gIHRleHRUcmFuc2Zvcm0sXG5dO1xuIl19 */");
    },
    val: lineHeight,
    interpolation: "rem"
  });
};
var textAlign = function textAlign(_ref6) {
  var textAlign = _ref6.textAlign;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("text-align:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInR5cG9ncmFwaHlNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBcURTIiwiZmlsZSI6InR5cG9ncmFwaHlNaXhpbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IHJlc3BvbnNpdmVQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Jlc3BvbnNpdmVQcm9wXCI7XG5cbmNvbnN0IGNvbG9yID0gKHsgY29sb3IgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBjb2xvcjogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBjb2xvcixcbiAgfSk7XG5cbmNvbnN0IGZvbnRGYW1pbHkgPSAoeyBmb250RmFtaWx5IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgZm9udC1mYW1pbHk6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZm9udEZhbWlseSxcbiAgfSk7XG5cbmNvbnN0IGZvbnRTaXplID0gKHsgZm9udFNpemUgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBmb250LXNpemU6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZm9udFNpemUsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IGZvbnRXZWlnaHQgPSAoeyBmb250V2VpZ2h0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgZm9udC13ZWlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZm9udFdlaWdodCxcbiAgfSk7XG5cbmNvbnN0IGxpbmVIZWlnaHQgPSAoeyBsaW5lSGVpZ2h0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgbGluZS1oZWlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbGluZUhlaWdodCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgdGV4dEFsaWduID0gKHsgdGV4dEFsaWduIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgdGV4dC1hbGlnbjogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiB0ZXh0QWxpZ24sXG4gIH0pO1xuXG5jb25zdCB0ZXh0RGVjb3JhdGlvbiA9ICh7IHRleHREZWNvcmF0aW9uIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IHRleHREZWNvcmF0aW9uLFxuICB9KTtcblxuY29uc3QgdGV4dFRyYW5zZm9ybSA9ICh7IHRleHRUcmFuc2Zvcm0gfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICB0ZXh0LXRyYW5zZm9ybTogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiB0ZXh0VHJhbnNmb3JtLFxuICB9KTtcblxuZXhwb3J0IGRlZmF1bHQgW1xuICBmb250RmFtaWx5LFxuICBmb250U2l6ZSxcbiAgZm9udFdlaWdodCxcbiAgbGluZUhlaWdodCxcbiAgY29sb3IsXG4gIHRleHRBbGlnbixcbiAgdGV4dERlY29yYXRpb24sXG4gIHRleHRUcmFuc2Zvcm0sXG5dO1xuIl19 */");
    },
    val: textAlign
  });
};
var textDecoration = function textDecoration(_ref7) {
  var textDecoration = _ref7.textDecoration;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("text-decoration:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInR5cG9ncmFwaHlNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBOERTIiwiZmlsZSI6InR5cG9ncmFwaHlNaXhpbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IHJlc3BvbnNpdmVQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Jlc3BvbnNpdmVQcm9wXCI7XG5cbmNvbnN0IGNvbG9yID0gKHsgY29sb3IgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBjb2xvcjogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBjb2xvcixcbiAgfSk7XG5cbmNvbnN0IGZvbnRGYW1pbHkgPSAoeyBmb250RmFtaWx5IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgZm9udC1mYW1pbHk6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZm9udEZhbWlseSxcbiAgfSk7XG5cbmNvbnN0IGZvbnRTaXplID0gKHsgZm9udFNpemUgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBmb250LXNpemU6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZm9udFNpemUsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IGZvbnRXZWlnaHQgPSAoeyBmb250V2VpZ2h0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgZm9udC13ZWlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZm9udFdlaWdodCxcbiAgfSk7XG5cbmNvbnN0IGxpbmVIZWlnaHQgPSAoeyBsaW5lSGVpZ2h0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgbGluZS1oZWlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbGluZUhlaWdodCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgdGV4dEFsaWduID0gKHsgdGV4dEFsaWduIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgdGV4dC1hbGlnbjogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiB0ZXh0QWxpZ24sXG4gIH0pO1xuXG5jb25zdCB0ZXh0RGVjb3JhdGlvbiA9ICh7IHRleHREZWNvcmF0aW9uIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IHRleHREZWNvcmF0aW9uLFxuICB9KTtcblxuY29uc3QgdGV4dFRyYW5zZm9ybSA9ICh7IHRleHRUcmFuc2Zvcm0gfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICB0ZXh0LXRyYW5zZm9ybTogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiB0ZXh0VHJhbnNmb3JtLFxuICB9KTtcblxuZXhwb3J0IGRlZmF1bHQgW1xuICBmb250RmFtaWx5LFxuICBmb250U2l6ZSxcbiAgZm9udFdlaWdodCxcbiAgbGluZUhlaWdodCxcbiAgY29sb3IsXG4gIHRleHRBbGlnbixcbiAgdGV4dERlY29yYXRpb24sXG4gIHRleHRUcmFuc2Zvcm0sXG5dO1xuIl19 */");
    },
    val: textDecoration
  });
};
var textTransform = function textTransform(_ref8) {
  var textTransform = _ref8.textTransform;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("text-transform:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInR5cG9ncmFwaHlNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBdUVTIiwiZmlsZSI6InR5cG9ncmFwaHlNaXhpbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IHJlc3BvbnNpdmVQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Jlc3BvbnNpdmVQcm9wXCI7XG5cbmNvbnN0IGNvbG9yID0gKHsgY29sb3IgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBjb2xvcjogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBjb2xvcixcbiAgfSk7XG5cbmNvbnN0IGZvbnRGYW1pbHkgPSAoeyBmb250RmFtaWx5IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgZm9udC1mYW1pbHk6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZm9udEZhbWlseSxcbiAgfSk7XG5cbmNvbnN0IGZvbnRTaXplID0gKHsgZm9udFNpemUgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBmb250LXNpemU6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZm9udFNpemUsXG4gICAgaW50ZXJwb2xhdGlvbjogXCJyZW1cIixcbiAgfSk7XG5cbmNvbnN0IGZvbnRXZWlnaHQgPSAoeyBmb250V2VpZ2h0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgZm9udC13ZWlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZm9udFdlaWdodCxcbiAgfSk7XG5cbmNvbnN0IGxpbmVIZWlnaHQgPSAoeyBsaW5lSGVpZ2h0IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgbGluZS1oZWlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbGluZUhlaWdodCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgdGV4dEFsaWduID0gKHsgdGV4dEFsaWduIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgdGV4dC1hbGlnbjogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiB0ZXh0QWxpZ24sXG4gIH0pO1xuXG5jb25zdCB0ZXh0RGVjb3JhdGlvbiA9ICh7IHRleHREZWNvcmF0aW9uIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IHRleHREZWNvcmF0aW9uLFxuICB9KTtcblxuY29uc3QgdGV4dFRyYW5zZm9ybSA9ICh7IHRleHRUcmFuc2Zvcm0gfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICB0ZXh0LXRyYW5zZm9ybTogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiB0ZXh0VHJhbnNmb3JtLFxuICB9KTtcblxuZXhwb3J0IGRlZmF1bHQgW1xuICBmb250RmFtaWx5LFxuICBmb250U2l6ZSxcbiAgZm9udFdlaWdodCxcbiAgbGluZUhlaWdodCxcbiAgY29sb3IsXG4gIHRleHRBbGlnbixcbiAgdGV4dERlY29yYXRpb24sXG4gIHRleHRUcmFuc2Zvcm0sXG5dO1xuIl19 */");
    },
    val: textTransform
  });
};
var typographyMixins = [fontFamily, fontSize, fontWeight, lineHeight, color, textAlign, textDecoration, textTransform];

var _excluded = ["variant", "children", "color"];
var Typography = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
  var _theme$typography, _varsFrTheme$default, _theme$palette;
  var variantFromProps = _ref.variant,
    children = _ref.children,
    color = _ref.color,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var theme = useTheme(ThemeContext);
  var varsFrTheme = theme === null || theme === void 0 ? void 0 : (_theme$typography = theme.typography) === null || _theme$typography === void 0 ? void 0 : _theme$typography.variants;
  var colorPriority = color ||
  // if color is passed as prop, use it
  variantFromProps && varsFrTheme[variantFromProps].color ||
  // if variant is passed as prop, use its color
  varsFrTheme && ((_varsFrTheme$default = varsFrTheme.default) === null || _varsFrTheme$default === void 0 ? void 0 : _varsFrTheme$default.color) || ( // if variants exist, use default color
  theme === null || theme === void 0 ? void 0 : (_theme$palette = theme.palette) === null || _theme$palette === void 0 ? void 0 : _theme$palette.textPrimary); // if no variants exist, use theme's textPrimary

  return jsx(TypographyStyled, _extends({
    ref: ref
  }, varsFrTheme && varsFrTheme.default, variantFromProps && varsFrTheme[variantFromProps], {
    color: colorPriority
  }, restProps), children);
});
var props = ["fontSize", "fontWeight", "lineHeight", "fontFamily", "color", "textAlign", "textDecoration", "textTransform"];
var TypographyStyled = /*#__PURE__*/_styled("p", process.env.NODE_ENV === "production" ? {
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
})(devMixins, " ", typographyMixins, " ", spaceMixins, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlR5cG9ncmFwaHkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBK0NFIiwiZmlsZSI6IlR5cG9ncmFwaHkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgc3R5bGVkIGZyb20gXCJAZW1vdGlvbi9zdHlsZWRcIjtcbmltcG9ydCB7IFRoZW1lQ29udGV4dCwgdXNlVGhlbWUgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCBpc1Byb3BWYWxpZCBmcm9tIFwiQGVtb3Rpb24vaXMtcHJvcC12YWxpZFwiO1xuaW1wb3J0IHR5cG9ncmFwaHlNaXhpbnMgZnJvbSBcIi4uLy4uL21peGlucy9yZXNwb25zaXZlUHJvcHMvdHlwb2dyYXBoeU1peGluc1wiO1xuaW1wb3J0IGRldk1peGlucyBmcm9tIFwiLi4vLi4vbWl4aW5zL3Jlc3BvbnNpdmVQcm9wcy9kZXZNaXhpbnNcIjtcbmltcG9ydCBzcGFjZU1peGlucyBmcm9tIFwiLi4vLi4vbWl4aW5zL3Jlc3BvbnNpdmVQcm9wcy9zcGFjZU1peGluc1wiO1xuXG5jb25zdCBUeXBvZ3JhcGh5ID0gUmVhY3QuZm9yd2FyZFJlZihcbiAgKHsgdmFyaWFudDogdmFyaWFudEZyb21Qcm9wcywgY2hpbGRyZW4sIGNvbG9yLCAuLi5yZXN0UHJvcHMgfSwgcmVmKSA9PiB7XG4gICAgY29uc3QgdGhlbWUgPSB1c2VUaGVtZShUaGVtZUNvbnRleHQpO1xuXG4gICAgY29uc3QgdmFyc0ZyVGhlbWUgPSB0aGVtZT8udHlwb2dyYXBoeT8udmFyaWFudHM7XG5cbiAgICBjb25zdCBjb2xvclByaW9yaXR5ID1cbiAgICAgIGNvbG9yIHx8IC8vIGlmIGNvbG9yIGlzIHBhc3NlZCBhcyBwcm9wLCB1c2UgaXRcbiAgICAgICh2YXJpYW50RnJvbVByb3BzICYmIHZhcnNGclRoZW1lW3ZhcmlhbnRGcm9tUHJvcHNdLmNvbG9yKSB8fCAvLyBpZiB2YXJpYW50IGlzIHBhc3NlZCBhcyBwcm9wLCB1c2UgaXRzIGNvbG9yXG4gICAgICAodmFyc0ZyVGhlbWUgJiYgdmFyc0ZyVGhlbWUuZGVmYXVsdD8uY29sb3IpIHx8IC8vIGlmIHZhcmlhbnRzIGV4aXN0LCB1c2UgZGVmYXVsdCBjb2xvclxuICAgICAgdGhlbWU/LnBhbGV0dGU/LnRleHRQcmltYXJ5OyAvLyBpZiBubyB2YXJpYW50cyBleGlzdCwgdXNlIHRoZW1lJ3MgdGV4dFByaW1hcnlcblxuICAgIHJldHVybiAoXG4gICAgICA8VHlwb2dyYXBoeVN0eWxlZFxuICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgey4uLih2YXJzRnJUaGVtZSAmJiB2YXJzRnJUaGVtZS5kZWZhdWx0KX1cbiAgICAgICAgey4uLih2YXJpYW50RnJvbVByb3BzICYmIHZhcnNGclRoZW1lW3ZhcmlhbnRGcm9tUHJvcHNdKX1cbiAgICAgICAgY29sb3I9e2NvbG9yUHJpb3JpdHl9XG4gICAgICAgIHsuLi5yZXN0UHJvcHN9XG4gICAgICA+XG4gICAgICAgIHtjaGlsZHJlbn1cbiAgICAgIDwvVHlwb2dyYXBoeVN0eWxlZD5cbiAgICApO1xuICB9XG4pO1xuXG5jb25zdCBwcm9wcyA9IFtcbiAgXCJmb250U2l6ZVwiLFxuICBcImZvbnRXZWlnaHRcIixcbiAgXCJsaW5lSGVpZ2h0XCIsXG4gIFwiZm9udEZhbWlseVwiLFxuICBcImNvbG9yXCIsXG4gIFwidGV4dEFsaWduXCIsXG4gIFwidGV4dERlY29yYXRpb25cIixcbiAgXCJ0ZXh0VHJhbnNmb3JtXCIsXG5dO1xuXG5jb25zdCBUeXBvZ3JhcGh5U3R5bGVkID0gc3R5bGVkKFwicFwiLCB7XG4gIHNob3VsZEZvcndhcmRQcm9wOiAocHJvcCkgPT4gaXNQcm9wVmFsaWQocHJvcCkgJiYgIXByb3BzLmluY2x1ZGVzKHByb3ApLFxufSlgXG4gICR7ZGV2TWl4aW5zfVxuICAke3R5cG9ncmFwaHlNaXhpbnN9XG4gICR7c3BhY2VNaXhpbnN9XG5gO1xuXG5leHBvcnQgZGVmYXVsdCBUeXBvZ3JhcGh5O1xuIl19 */"));

var flexDirection = function flexDirection(_ref) {
  var flexDirection = _ref.flexDirection;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("flex-direction:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0YWNrTWl4aW5zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU1TIiwiZmlsZSI6InN0YWNrTWl4aW5zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3NzIH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XG5pbXBvcnQgeyByZXNwb25zaXZlUHJvcCB9IGZyb20gXCIuLi8uLi91dGlscy9yZXNwb25zaXZlUHJvcFwiO1xuXG5jb25zdCBmbGV4RGlyZWN0aW9uID0gKHsgZmxleERpcmVjdGlvbiB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IGZsZXhEaXJlY3Rpb24sXG4gIH0pO1xuXG5jb25zdCBnYXAgPSAoeyBnYXAgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBnYXA6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZ2FwLFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBhbGlnbkl0ZW1zID0gKHsgYWxpZ25JdGVtcyB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGFsaWduLWl0ZW1zOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IGFsaWduSXRlbXMsXG4gIH0pO1xuXG5jb25zdCBqdXN0aWZ5Q29udGVudCA9ICh7IGp1c3RpZnlDb250ZW50IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAganVzdGlmeS1jb250ZW50OiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IGp1c3RpZnlDb250ZW50LFxuICB9KTtcblxuZXhwb3J0IGRlZmF1bHQgW2ZsZXhEaXJlY3Rpb24sIGdhcCwgYWxpZ25JdGVtcywganVzdGlmeUNvbnRlbnRdO1xuIl19 */");
    },
    val: flexDirection
  });
};
var gap = function gap(_ref2) {
  var gap = _ref2.gap;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("gap:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0YWNrTWl4aW5zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWVTIiwiZmlsZSI6InN0YWNrTWl4aW5zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3NzIH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XG5pbXBvcnQgeyByZXNwb25zaXZlUHJvcCB9IGZyb20gXCIuLi8uLi91dGlscy9yZXNwb25zaXZlUHJvcFwiO1xuXG5jb25zdCBmbGV4RGlyZWN0aW9uID0gKHsgZmxleERpcmVjdGlvbiB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IGZsZXhEaXJlY3Rpb24sXG4gIH0pO1xuXG5jb25zdCBnYXAgPSAoeyBnYXAgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBnYXA6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZ2FwLFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBhbGlnbkl0ZW1zID0gKHsgYWxpZ25JdGVtcyB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGFsaWduLWl0ZW1zOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IGFsaWduSXRlbXMsXG4gIH0pO1xuXG5jb25zdCBqdXN0aWZ5Q29udGVudCA9ICh7IGp1c3RpZnlDb250ZW50IH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAganVzdGlmeS1jb250ZW50OiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IGp1c3RpZnlDb250ZW50LFxuICB9KTtcblxuZXhwb3J0IGRlZmF1bHQgW2ZsZXhEaXJlY3Rpb24sIGdhcCwgYWxpZ25JdGVtcywganVzdGlmeUNvbnRlbnRdO1xuIl19 */");
    },
    val: gap,
    interpolation: "rem"
  });
};
var alignItems = function alignItems(_ref3) {
  var alignItems = _ref3.alignItems;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("align-items:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0YWNrTWl4aW5zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXlCUyIsImZpbGUiOiJzdGFja01peGlucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xuaW1wb3J0IHsgcmVzcG9uc2l2ZVByb3AgfSBmcm9tIFwiLi4vLi4vdXRpbHMvcmVzcG9uc2l2ZVByb3BcIjtcblxuY29uc3QgZmxleERpcmVjdGlvbiA9ICh7IGZsZXhEaXJlY3Rpb24gfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBmbGV4LWRpcmVjdGlvbjogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBmbGV4RGlyZWN0aW9uLFxuICB9KTtcblxuY29uc3QgZ2FwID0gKHsgZ2FwIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgZ2FwOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IGdhcCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgYWxpZ25JdGVtcyA9ICh7IGFsaWduSXRlbXMgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBhbGlnbi1pdGVtczogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBhbGlnbkl0ZW1zLFxuICB9KTtcblxuY29uc3QganVzdGlmeUNvbnRlbnQgPSAoeyBqdXN0aWZ5Q29udGVudCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGp1c3RpZnktY29udGVudDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBqdXN0aWZ5Q29udGVudCxcbiAgfSk7XG5cbmV4cG9ydCBkZWZhdWx0IFtmbGV4RGlyZWN0aW9uLCBnYXAsIGFsaWduSXRlbXMsIGp1c3RpZnlDb250ZW50XTtcbiJdfQ== */");
    },
    val: alignItems
  });
};
var justifyContent = function justifyContent(_ref4) {
  var justifyContent = _ref4.justifyContent;
  return responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("justify-content:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0YWNrTWl4aW5zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWtDUyIsImZpbGUiOiJzdGFja01peGlucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xuaW1wb3J0IHsgcmVzcG9uc2l2ZVByb3AgfSBmcm9tIFwiLi4vLi4vdXRpbHMvcmVzcG9uc2l2ZVByb3BcIjtcblxuY29uc3QgZmxleERpcmVjdGlvbiA9ICh7IGZsZXhEaXJlY3Rpb24gfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBmbGV4LWRpcmVjdGlvbjogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBmbGV4RGlyZWN0aW9uLFxuICB9KTtcblxuY29uc3QgZ2FwID0gKHsgZ2FwIH0pID0+XG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgZ2FwOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IGdhcCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgYWxpZ25JdGVtcyA9ICh7IGFsaWduSXRlbXMgfSkgPT5cbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBhbGlnbi1pdGVtczogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBhbGlnbkl0ZW1zLFxuICB9KTtcblxuY29uc3QganVzdGlmeUNvbnRlbnQgPSAoeyBqdXN0aWZ5Q29udGVudCB9KSA9PlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGp1c3RpZnktY29udGVudDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBqdXN0aWZ5Q29udGVudCxcbiAgfSk7XG5cbmV4cG9ydCBkZWZhdWx0IFtmbGV4RGlyZWN0aW9uLCBnYXAsIGFsaWduSXRlbXMsIGp1c3RpZnlDb250ZW50XTtcbiJdfQ== */");
    },
    val: justifyContent
  });
};
var stackMixins = [flexDirection, gap, alignItems, justifyContent];

var Stack = /*#__PURE__*/_styled("div", process.env.NODE_ENV === "production" ? {
  target: "e1nhy00x0"
} : {
  target: "e1nhy00x0",
  label: "Stack"
})("display:flex;", devMixins, " ", sizeMixins, " ", spaceMixins, " ", stackMixins, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlN0YWNrLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU13QiIsImZpbGUiOiJTdGFjay5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzdHlsZWQgZnJvbSBcIkBlbW90aW9uL3N0eWxlZFwiO1xuaW1wb3J0IHN0YWNrTWl4aW5zIGZyb20gXCIuL3N0YWNrTWl4aW5zXCI7XG5pbXBvcnQgZGV2TWl4aW5zIGZyb20gXCIuLi8uLi9taXhpbnMvcmVzcG9uc2l2ZVByb3BzL2Rldk1peGluc1wiO1xuaW1wb3J0IHNpemVNaXhpbnMgZnJvbSBcIi4uLy4uL21peGlucy9yZXNwb25zaXZlUHJvcHMvc2l6ZU1peGluc1wiO1xuaW1wb3J0IHNwYWNlTWl4aW5zIGZyb20gXCIuLi8uLi9taXhpbnMvcmVzcG9uc2l2ZVByb3BzL3NwYWNlTWl4aW5zXCI7XG5cbmNvbnN0IFN0YWNrID0gc3R5bGVkLmRpdmBcbiAgZGlzcGxheTogZmxleDtcbiAgJHtkZXZNaXhpbnN9XG4gICR7c2l6ZU1peGluc31cbiAgJHtzcGFjZU1peGluc31cbiAgJHtzdGFja01peGluc31cbmA7XG5cbi8vIFN0YWNrLmRlZmF1bHRQcm9wcyA9IHtcbi8vICAganVzdGlmeUNvbnRlbnQ6IFwiY2VudGVyXCIsXG4vLyB9O1xuXG5leHBvcnQgZGVmYXVsdCBTdGFjaztcbiJdfQ== */"));

var fallback = defaultTheme.bp;
var mq = {
  only: {
    sm: function sm(_ref) {
      var theme = _ref.theme;
      return "@media (max-width: calc(".concat(theme.bp ? theme.bp[1] : fallback[1], " - 1px))");
    },
    md: function md(_ref2) {
      var theme = _ref2.theme;
      return "@media (min-width: ".concat(theme.bp ? theme.bp[1] : fallback[1], ") and (max-width: calc(").concat(theme.bp ? theme.bp[2] : fallback[2], " - 1px))");
    },
    lr: function lr(_ref3) {
      var theme = _ref3.theme;
      return "@media (min-width: ".concat(theme.bp ? theme.bp[2] : fallback[2], ") and (max-width: calc(").concat(theme.bp ? theme.bp[3] : fallback[3], " - 1px))");
    },
    xl: function xl(_ref4) {
      var theme = _ref4.theme;
      return "@media (min-width: ".concat(theme.bp ? theme.bp[3] : fallback[3], ")");
    },
    computer: "@media (hover: hover) and (pointer: fine)",
    touchDevice: "@media (hover: none) and (pointer: coarse)",
    stylus: "@media (hover: none) and (pointer: fine)",
    retina: "@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)"
  },
  up: {
    md: function md(_ref5) {
      var theme = _ref5.theme;
      return "@media (min-width: ".concat(theme.bp ? theme.bp[1] : fallback[1], ")");
    },
    lr: function lr(_ref6) {
      var theme = _ref6.theme;
      return "@media (min-width: ".concat(theme.bp ? theme.bp[2] : fallback[2], ")");
    },
    xl: function xl(_ref7) {
      var theme = _ref7.theme;
      return "@media (min-width: ".concat(theme.bp ? theme.bp[3] : fallback[3], ")");
    }
  },
  down: {
    sm: function sm(_ref8) {
      var theme = _ref8.theme;
      return "@media (max-width: calc(".concat(theme.bp ? theme.bp[1] : fallback[1], " - 1px))");
    },
    md: function md(_ref9) {
      var theme = _ref9.theme;
      return "@media (max-width: calc(".concat(theme.bp ? theme.bp[2] : fallback[2], " - 1px))");
    },
    lr: function lr(_ref10) {
      var theme = _ref10.theme;
      return "@media (max-width: calc(".concat(theme.bp ? theme.bp[3] : fallback[3], " - 1px))");
    }
  },
  supports: {
    hover: "@media (hover: hover)"
  }
};

export { Grid, SageProvider, Section, Spacer, Stack, Test, Typography, defaultTheme, devMixins, gridItemMixins, gridMixins, mq, responsiveProp, sizeMixins, spaceMixins, typographyMixins, useResponsive, useSSRLayoutEffect, useScramble };
