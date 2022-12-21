'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var react = require('@emotion/react');
var _styled = require('@emotion/styled/base');
var polished = require('polished');
var isPropValid = require('@emotion/is-prop-valid');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _styled__default = /*#__PURE__*/_interopDefaultLegacy(_styled);
var isPropValid__default = /*#__PURE__*/_interopDefaultLegacy(isPropValid);

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

var defaultTheme = {
  bp: ["0rem", "36rem", "62rem", "75rem"],
  section: {
    maxWidth: "62rem",
    xPadding: ["1rem", "2rem"]
  },
  palette: {
    background: "#fff"
  },
  text: {
    primary: "#000",
    secondary: "#666666",
    disabled: "#999999"
  }
};

function ThemeProvider(_ref) {
  var children = _ref.children,
    theme = _ref.theme;
  return react.jsx(react.ThemeProvider, {
    theme: _objectSpread2(_objectSpread2({}, defaultTheme), theme)
  }, children);
}

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

var useSSRLayoutEffect = typeof window !== "undefined" ? React.useLayoutEffect : function () {};

var Test = function Test() {
  return react.jsx("div", null, "Working okey ");
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
  var _useTheme = react.useTheme(react.ThemeContext),
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
  return /*#__PURE__*/react.css(func(val[0]), "@media screen and (min-width: ", (bp === null || bp === void 0 ? void 0 : bp[1]) || bpFb[1], "){", val[1] && func(val[1]), ";}@media screen and (min-width: ", (bp === null || bp === void 0 ? void 0 : bp[2]) || bpFb[2], "){", val[2] && func(val[2]), ";}@media screen and (min-width: ", (bp === null || bp === void 0 ? void 0 : bp[3]) || bpFb[3], "){", val[3] && func(val[3]), ";}" + (process.env.NODE_ENV === "production" ? "" : ";label:responsiveProp;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc3BvbnNpdmVQcm9wLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTRCWSIsImZpbGUiOiJyZXNwb25zaXZlUHJvcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRoZW1lQ29udGV4dCwgY3NzLCB1c2VUaGVtZSB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xuaW1wb3J0IHsgZGVmYXVsdFRoZW1lIH0gZnJvbSBcIi4uL3RoZW1pbmcvZGVmYXVsdFRoZW1lXCI7XG5cbmV4cG9ydCBjb25zdCBpbnRlcnBvbGF0ZWRQcm9wID0gKHYsIGludGVycG9sYXRpb24pID0+IHtcbiAgaWYgKHR5cGVvZiB2ID09PSBcIm51bWJlclwiKSB7XG4gICAgcmV0dXJuIHYgKyBpbnRlcnBvbGF0aW9uO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB2O1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgcmVzcG9uc2l2ZVByb3AgPSAoeyBmdW5jLCB2YWwsIGludGVycG9sYXRpb24gPSBmYWxzZSB9KSA9PiB7XG4gIGNvbnN0IHsgYnAgfSA9IHVzZVRoZW1lKFRoZW1lQ29udGV4dCk7XG4gIGNvbnN0IGJwRmIgPSBkZWZhdWx0VGhlbWUuYnA7XG5cbiAgaWYgKHZhbCA9PT0gdW5kZWZpbmVkIHx8IHZhbCA9PT0gbnVsbCkgcmV0dXJuO1xuXG4gIGlmIChpbnRlcnBvbGF0aW9uKSB7XG4gICAgaWYgKHR5cGVvZiB2YWwgPT09IFwibnVtYmVyXCIpIHZhbCA9IGludGVycG9sYXRlZFByb3AodmFsLCBpbnRlcnBvbGF0aW9uKTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWwpKVxuICAgICAgdmFsLmZvckVhY2goKHgsIGluZGV4KSA9PiB7XG4gICAgICAgIGlmICh0eXBlb2YgeCA9PT0gXCJudW1iZXJcIilcbiAgICAgICAgICB2YWxbaW5kZXhdID0gaW50ZXJwb2xhdGVkUHJvcCh4LCBpbnRlcnBvbGF0aW9uKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgdmFsID0gQXJyYXkuaXNBcnJheSh2YWwpID8gdmFsIDogW3ZhbF07XG5cbiAgcmV0dXJuIGNzc2BcbiAgICAke2Z1bmModmFsWzBdKX1cblxuICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6ICR7YnA/LlsxXSB8fCBicEZiWzFdfSkge1xuICAgICAgJHt2YWxbMV0gJiYgZnVuYyh2YWxbMV0pfVxuICAgIH1cblxuICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6ICR7YnA/LlsyXSB8fCBicEZiWzJdfSkge1xuICAgICAgJHt2YWxbMl0gJiYgZnVuYyh2YWxbMl0pfVxuICAgIH1cblxuICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6ICR7YnA/LlszXSB8fCBicEZiWzNdfSkge1xuICAgICAgJHt2YWxbM10gJiYgZnVuYyh2YWxbM10pfVxuICAgIH1cbiAgYDtcbn07XG4iXX0= */");
};

function _EMOTION_STRINGIFIED_CSS_ERROR__$1() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }

// grid,
// base,
// gap,
// gapx,
// gapy,
// placeItems,

var grid = process.env.NODE_ENV === "production" ? {
  name: "vetbs0",
  styles: "display:grid"
} : {
  name: "wmhzsl-grid",
  styles: "display:grid;label:grid;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyaWRNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBVWdCIiwiZmlsZSI6ImdyaWRNaXhpbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IHJlc3BvbnNpdmVQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Jlc3BvbnNpdmVQcm9wXCI7XG5cbi8vIGdyaWQsXG4vLyBiYXNlLFxuLy8gZ2FwLFxuLy8gZ2FweCxcbi8vIGdhcHksXG4vLyBwbGFjZUl0ZW1zLFxuXG5jb25zdCBncmlkID0gY3NzYFxuICBkaXNwbGF5OiBncmlkO1xuYDtcblxuY29uc3QgYmFzZSA9ICh7IGJhc2UgfSkgPT5cbiAgYmFzZSAmJlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KCR7eH0sIDFmcik7XG4gICAgICBgLFxuICAgIHZhbDogYmFzZSxcbiAgfSk7XG5cbmNvbnN0IGdhcCA9ICh7IGdhcCB9KSA9PlxuICBnYXAgJiZcbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBnYXA6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZ2FwLFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBnYXB4ID0gKHsgZ2FweCB9KSA9PlxuICBnYXB4ICYmXG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgY29sdW1uLWdhcDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBnYXB4LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBnYXB5ID0gKHsgZ2FweSB9KSA9PlxuICBnYXB5ICYmXG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgcm93LWdhcDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBnYXB5LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBwbGFjZUl0ZW1zID0gKHsgcGxhY2VJdGVtcyB9KSA9PlxuICBwbGFjZUl0ZW1zICYmXG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgcGxhY2UtaXRlbXM6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogcGxhY2VJdGVtcyxcbiAgfSk7XG5cbmV4cG9ydCBkZWZhdWx0IFtncmlkLCBiYXNlLCBnYXAsIGdhcHgsIGdhcHksIHBsYWNlSXRlbXNdO1xuIl19 */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__$1
};
var base = function base(_ref) {
  var base = _ref.base;
  return base && responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/react.css("grid-template-columns:repeat(", x, ", 1fr);" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyaWRNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBa0JTIiwiZmlsZSI6ImdyaWRNaXhpbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IHJlc3BvbnNpdmVQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Jlc3BvbnNpdmVQcm9wXCI7XG5cbi8vIGdyaWQsXG4vLyBiYXNlLFxuLy8gZ2FwLFxuLy8gZ2FweCxcbi8vIGdhcHksXG4vLyBwbGFjZUl0ZW1zLFxuXG5jb25zdCBncmlkID0gY3NzYFxuICBkaXNwbGF5OiBncmlkO1xuYDtcblxuY29uc3QgYmFzZSA9ICh7IGJhc2UgfSkgPT5cbiAgYmFzZSAmJlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KCR7eH0sIDFmcik7XG4gICAgICBgLFxuICAgIHZhbDogYmFzZSxcbiAgfSk7XG5cbmNvbnN0IGdhcCA9ICh7IGdhcCB9KSA9PlxuICBnYXAgJiZcbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBnYXA6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZ2FwLFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBnYXB4ID0gKHsgZ2FweCB9KSA9PlxuICBnYXB4ICYmXG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgY29sdW1uLWdhcDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBnYXB4LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBnYXB5ID0gKHsgZ2FweSB9KSA9PlxuICBnYXB5ICYmXG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgcm93LWdhcDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBnYXB5LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBwbGFjZUl0ZW1zID0gKHsgcGxhY2VJdGVtcyB9KSA9PlxuICBwbGFjZUl0ZW1zICYmXG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgcGxhY2UtaXRlbXM6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogcGxhY2VJdGVtcyxcbiAgfSk7XG5cbmV4cG9ydCBkZWZhdWx0IFtncmlkLCBiYXNlLCBnYXAsIGdhcHgsIGdhcHksIHBsYWNlSXRlbXNdO1xuIl19 */");
    },
    val: base
  });
};
var gap = function gap(_ref2) {
  var gap = _ref2.gap;
  return gap && responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/react.css("gap:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyaWRNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBNEJTIiwiZmlsZSI6ImdyaWRNaXhpbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IHJlc3BvbnNpdmVQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Jlc3BvbnNpdmVQcm9wXCI7XG5cbi8vIGdyaWQsXG4vLyBiYXNlLFxuLy8gZ2FwLFxuLy8gZ2FweCxcbi8vIGdhcHksXG4vLyBwbGFjZUl0ZW1zLFxuXG5jb25zdCBncmlkID0gY3NzYFxuICBkaXNwbGF5OiBncmlkO1xuYDtcblxuY29uc3QgYmFzZSA9ICh7IGJhc2UgfSkgPT5cbiAgYmFzZSAmJlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KCR7eH0sIDFmcik7XG4gICAgICBgLFxuICAgIHZhbDogYmFzZSxcbiAgfSk7XG5cbmNvbnN0IGdhcCA9ICh7IGdhcCB9KSA9PlxuICBnYXAgJiZcbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBnYXA6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZ2FwLFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBnYXB4ID0gKHsgZ2FweCB9KSA9PlxuICBnYXB4ICYmXG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgY29sdW1uLWdhcDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBnYXB4LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBnYXB5ID0gKHsgZ2FweSB9KSA9PlxuICBnYXB5ICYmXG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgcm93LWdhcDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBnYXB5LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBwbGFjZUl0ZW1zID0gKHsgcGxhY2VJdGVtcyB9KSA9PlxuICBwbGFjZUl0ZW1zICYmXG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgcGxhY2UtaXRlbXM6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogcGxhY2VJdGVtcyxcbiAgfSk7XG5cbmV4cG9ydCBkZWZhdWx0IFtncmlkLCBiYXNlLCBnYXAsIGdhcHgsIGdhcHksIHBsYWNlSXRlbXNdO1xuIl19 */");
    },
    val: gap,
    interpolation: "rem"
  });
};
var gapx = function gapx(_ref3) {
  var gapx = _ref3.gapx;
  return gapx && responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/react.css("column-gap:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyaWRNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBdUNTIiwiZmlsZSI6ImdyaWRNaXhpbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IHJlc3BvbnNpdmVQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Jlc3BvbnNpdmVQcm9wXCI7XG5cbi8vIGdyaWQsXG4vLyBiYXNlLFxuLy8gZ2FwLFxuLy8gZ2FweCxcbi8vIGdhcHksXG4vLyBwbGFjZUl0ZW1zLFxuXG5jb25zdCBncmlkID0gY3NzYFxuICBkaXNwbGF5OiBncmlkO1xuYDtcblxuY29uc3QgYmFzZSA9ICh7IGJhc2UgfSkgPT5cbiAgYmFzZSAmJlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KCR7eH0sIDFmcik7XG4gICAgICBgLFxuICAgIHZhbDogYmFzZSxcbiAgfSk7XG5cbmNvbnN0IGdhcCA9ICh7IGdhcCB9KSA9PlxuICBnYXAgJiZcbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBnYXA6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZ2FwLFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBnYXB4ID0gKHsgZ2FweCB9KSA9PlxuICBnYXB4ICYmXG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgY29sdW1uLWdhcDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBnYXB4LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBnYXB5ID0gKHsgZ2FweSB9KSA9PlxuICBnYXB5ICYmXG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgcm93LWdhcDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBnYXB5LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBwbGFjZUl0ZW1zID0gKHsgcGxhY2VJdGVtcyB9KSA9PlxuICBwbGFjZUl0ZW1zICYmXG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgcGxhY2UtaXRlbXM6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogcGxhY2VJdGVtcyxcbiAgfSk7XG5cbmV4cG9ydCBkZWZhdWx0IFtncmlkLCBiYXNlLCBnYXAsIGdhcHgsIGdhcHksIHBsYWNlSXRlbXNdO1xuIl19 */");
    },
    val: gapx,
    interpolation: "rem"
  });
};
var gapy = function gapy(_ref4) {
  var gapy = _ref4.gapy;
  return gapy && responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/react.css("row-gap:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyaWRNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBa0RTIiwiZmlsZSI6ImdyaWRNaXhpbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IHJlc3BvbnNpdmVQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Jlc3BvbnNpdmVQcm9wXCI7XG5cbi8vIGdyaWQsXG4vLyBiYXNlLFxuLy8gZ2FwLFxuLy8gZ2FweCxcbi8vIGdhcHksXG4vLyBwbGFjZUl0ZW1zLFxuXG5jb25zdCBncmlkID0gY3NzYFxuICBkaXNwbGF5OiBncmlkO1xuYDtcblxuY29uc3QgYmFzZSA9ICh7IGJhc2UgfSkgPT5cbiAgYmFzZSAmJlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KCR7eH0sIDFmcik7XG4gICAgICBgLFxuICAgIHZhbDogYmFzZSxcbiAgfSk7XG5cbmNvbnN0IGdhcCA9ICh7IGdhcCB9KSA9PlxuICBnYXAgJiZcbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBnYXA6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZ2FwLFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBnYXB4ID0gKHsgZ2FweCB9KSA9PlxuICBnYXB4ICYmXG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgY29sdW1uLWdhcDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBnYXB4LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBnYXB5ID0gKHsgZ2FweSB9KSA9PlxuICBnYXB5ICYmXG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgcm93LWdhcDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBnYXB5LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBwbGFjZUl0ZW1zID0gKHsgcGxhY2VJdGVtcyB9KSA9PlxuICBwbGFjZUl0ZW1zICYmXG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgcGxhY2UtaXRlbXM6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogcGxhY2VJdGVtcyxcbiAgfSk7XG5cbmV4cG9ydCBkZWZhdWx0IFtncmlkLCBiYXNlLCBnYXAsIGdhcHgsIGdhcHksIHBsYWNlSXRlbXNdO1xuIl19 */");
    },
    val: gapy,
    interpolation: "rem"
  });
};
var placeItems = function placeItems(_ref5) {
  var placeItems = _ref5.placeItems;
  return placeItems && responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/react.css("place-items:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyaWRNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBNkRTIiwiZmlsZSI6ImdyaWRNaXhpbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IHJlc3BvbnNpdmVQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Jlc3BvbnNpdmVQcm9wXCI7XG5cbi8vIGdyaWQsXG4vLyBiYXNlLFxuLy8gZ2FwLFxuLy8gZ2FweCxcbi8vIGdhcHksXG4vLyBwbGFjZUl0ZW1zLFxuXG5jb25zdCBncmlkID0gY3NzYFxuICBkaXNwbGF5OiBncmlkO1xuYDtcblxuY29uc3QgYmFzZSA9ICh7IGJhc2UgfSkgPT5cbiAgYmFzZSAmJlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KCR7eH0sIDFmcik7XG4gICAgICBgLFxuICAgIHZhbDogYmFzZSxcbiAgfSk7XG5cbmNvbnN0IGdhcCA9ICh7IGdhcCB9KSA9PlxuICBnYXAgJiZcbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBnYXA6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZ2FwLFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBnYXB4ID0gKHsgZ2FweCB9KSA9PlxuICBnYXB4ICYmXG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgY29sdW1uLWdhcDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBnYXB4LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBnYXB5ID0gKHsgZ2FweSB9KSA9PlxuICBnYXB5ICYmXG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgcm93LWdhcDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBnYXB5LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBwbGFjZUl0ZW1zID0gKHsgcGxhY2VJdGVtcyB9KSA9PlxuICBwbGFjZUl0ZW1zICYmXG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgcGxhY2UtaXRlbXM6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogcGxhY2VJdGVtcyxcbiAgfSk7XG5cbmV4cG9ydCBkZWZhdWx0IFtncmlkLCBiYXNlLCBnYXAsIGdhcHgsIGdhcHksIHBsYWNlSXRlbXNdO1xuIl19 */");
    },
    val: placeItems
  });
};
var gridMixins = [grid, base, gap, gapx, gapy, placeItems];

// span (num: span, string: col start/end )
// placeSelf,

// TODO:
// grid-column: ${x};

var span = function span(_ref) {
  var span = _ref.span;
  return span && responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/react.css("grid-column:span ", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyaWRJdGVtTWl4aW5zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWFTIiwiZmlsZSI6ImdyaWRJdGVtTWl4aW5zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3NzIH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XG5pbXBvcnQgeyByZXNwb25zaXZlUHJvcCB9IGZyb20gXCIuLi8uLi91dGlscy9yZXNwb25zaXZlUHJvcFwiO1xuXG4vLyBzcGFuIChudW06IHNwYW4sIHN0cmluZzogY29sIHN0YXJ0L2VuZCApXG4vLyBwbGFjZVNlbGYsXG5cbi8vIFRPRE86XG4vLyBncmlkLWNvbHVtbjogJHt4fTtcblxuY29uc3Qgc3BhbiA9ICh7IHNwYW4gfSkgPT5cbiAgc3BhbiAmJlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdyaWQtY29sdW1uOiBzcGFuICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogc3BhbixcbiAgfSk7XG5cbmNvbnN0IHBsYWNlU2VsZiA9ICh7IHBsYWNlU2VsZiB9KSA9PlxuICBwbGFjZVNlbGYgJiZcbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwbGFjZS1zZWxmOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IHBsYWNlU2VsZixcbiAgfSk7XG5cbmV4cG9ydCBkZWZhdWx0IFtzcGFuLCBwbGFjZVNlbGZdO1xuIl19 */");
    },
    val: span
  });
};
var placeSelf = function placeSelf(_ref2) {
  var placeSelf = _ref2.placeSelf;
  return placeSelf && responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/react.css("place-self:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyaWRJdGVtTWl4aW5zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXVCUyIsImZpbGUiOiJncmlkSXRlbU1peGlucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xuaW1wb3J0IHsgcmVzcG9uc2l2ZVByb3AgfSBmcm9tIFwiLi4vLi4vdXRpbHMvcmVzcG9uc2l2ZVByb3BcIjtcblxuLy8gc3BhbiAobnVtOiBzcGFuLCBzdHJpbmc6IGNvbCBzdGFydC9lbmQgKVxuLy8gcGxhY2VTZWxmLFxuXG4vLyBUT0RPOlxuLy8gZ3JpZC1jb2x1bW46ICR7eH07XG5cbmNvbnN0IHNwYW4gPSAoeyBzcGFuIH0pID0+XG4gIHNwYW4gJiZcbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBncmlkLWNvbHVtbjogc3BhbiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IHNwYW4sXG4gIH0pO1xuXG5jb25zdCBwbGFjZVNlbGYgPSAoeyBwbGFjZVNlbGYgfSkgPT5cbiAgcGxhY2VTZWxmICYmXG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgcGxhY2Utc2VsZjogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBwbGFjZVNlbGYsXG4gIH0pO1xuXG5leHBvcnQgZGVmYXVsdCBbc3BhbiwgcGxhY2VTZWxmXTtcbiJdfQ== */");
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

var Grid = /*#__PURE__*/_styled__default["default"]("div", process.env.NODE_ENV === "production" ? {
  target: "eggk0at1"
} : {
  target: "eggk0at1",
  label: "Grid"
})(devMixins, " ", gridMixins, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkdyaWQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS3VCIiwiZmlsZSI6IkdyaWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc3R5bGVkIGZyb20gXCJAZW1vdGlvbi9zdHlsZWRcIjtcbmltcG9ydCBncmlkTWl4aW5zIGZyb20gXCIuLi8uLi9taXhpbnMvcmVzcG9uc2l2ZVByb3BzL2dyaWRNaXhpbnNcIjtcbmltcG9ydCBncmlkSXRlbU1peGlucyBmcm9tIFwiLi4vLi4vbWl4aW5zL3Jlc3BvbnNpdmVQcm9wcy9ncmlkSXRlbU1peGluc1wiO1xuaW1wb3J0IGRldk1peGlucyBmcm9tIFwiLi4vLi4vbWl4aW5zL3Jlc3BvbnNpdmVQcm9wcy9kZXZNaXhpbnNcIjtcblxuY29uc3QgR3JpZCA9IHN0eWxlZC5kaXZgXG4gICR7ZGV2TWl4aW5zfVxuICAke2dyaWRNaXhpbnN9XG5gO1xuXG5jb25zdCBJdGVtID0gc3R5bGVkLmRpdmBcbiAgJHtkZXZNaXhpbnN9XG4gICR7Z3JpZEl0ZW1NaXhpbnN9XG5gO1xuXG5HcmlkLkl0ZW0gPSBJdGVtO1xuZXhwb3J0IGRlZmF1bHQgR3JpZDtcbiJdfQ== */"));
var Item = /*#__PURE__*/_styled__default["default"]("div", process.env.NODE_ENV === "production" ? {
  target: "eggk0at0"
} : {
  target: "eggk0at0",
  label: "Item"
})(devMixins, " ", gridItemMixins, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkdyaWQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBVXVCIiwiZmlsZSI6IkdyaWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc3R5bGVkIGZyb20gXCJAZW1vdGlvbi9zdHlsZWRcIjtcbmltcG9ydCBncmlkTWl4aW5zIGZyb20gXCIuLi8uLi9taXhpbnMvcmVzcG9uc2l2ZVByb3BzL2dyaWRNaXhpbnNcIjtcbmltcG9ydCBncmlkSXRlbU1peGlucyBmcm9tIFwiLi4vLi4vbWl4aW5zL3Jlc3BvbnNpdmVQcm9wcy9ncmlkSXRlbU1peGluc1wiO1xuaW1wb3J0IGRldk1peGlucyBmcm9tIFwiLi4vLi4vbWl4aW5zL3Jlc3BvbnNpdmVQcm9wcy9kZXZNaXhpbnNcIjtcblxuY29uc3QgR3JpZCA9IHN0eWxlZC5kaXZgXG4gICR7ZGV2TWl4aW5zfVxuICAke2dyaWRNaXhpbnN9XG5gO1xuXG5jb25zdCBJdGVtID0gc3R5bGVkLmRpdmBcbiAgJHtkZXZNaXhpbnN9XG4gICR7Z3JpZEl0ZW1NaXhpbnN9XG5gO1xuXG5HcmlkLkl0ZW0gPSBJdGVtO1xuZXhwb3J0IGRlZmF1bHQgR3JpZDtcbiJdfQ== */"));
Grid.Item = Item;

var useResponsive = function useResponsive() {
  var _useTheme = react.useTheme(react.ThemeContext),
    bp = _useTheme.bp;

  // fallback if theme is not present
  bp = bp ? bp : ["0rem", "36rem", "62rem", "75rem"];
  var _useState = React.useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    isMobile = _useState2[0],
    setMobile = _useState2[1];
  var _useState3 = React.useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    breakpoint = _useState4[0],
    setBreakpoint = _useState4[1];
  var _useState5 = React.useState(false),
    _useState6 = _slicedToArray(_useState5, 2),
    breakpointIndex = _useState6[0],
    setBreakpointIndex = _useState6[1];
  var calcBreakpoint = function calcBreakpoint() {
    var width = window.innerWidth > 0 ? window.innerWidth : screen.width;
    if (width > polished.stripUnit(polished.remToPx(bp[3]))) {
      setBreakpoint("xl");
      setBreakpointIndex(3);
    } else if (width > polished.stripUnit(polished.remToPx(bp[2]))) {
      setBreakpoint("lr");
      setBreakpointIndex(2);
    } else if (width > polished.stripUnit(polished.remToPx(bp[1]))) {
      setBreakpoint("md");
      setBreakpointIndex(1);
    } else {
      setBreakpoint("sm");
      setBreakpointIndex(0);
    }
  };
  React.useEffect(function () {
    calcBreakpoint();
    window.addEventListener("resize", calcBreakpoint);
    return function () {
      return window.removeEventListener("resize", calcBreakpoint);
    };
  }, []);
  React.useEffect(function () {
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

var Section = /*#__PURE__*/React__default["default"].forwardRef(function (props, ref) {
  var _theme$section;
  var _useResponsive = useResponsive(),
    breakpointIndex = _useResponsive.breakpointIndex;
  var theme = react.useTheme(react.ThemeContext);
  var xPadArr = arrayifyProp((theme === null || theme === void 0 ? void 0 : (_theme$section = theme.section) === null || _theme$section === void 0 ? void 0 : _theme$section.xPadding) || 0);
  // console.log(xPadArr);

  return react.jsx(SectionStyled, _extends({
    ref: ref,
    xPad: xPadArr[breakpointIndex]
  }, props), props.children);
});
var SectionStyled = /*#__PURE__*/_styled__default["default"]("section", process.env.NODE_ENV === "production" ? {
  target: "ebf42ix0"
} : {
  target: "ebf42ix0",
  label: "SectionStyled"
})("margin:0 auto;max-width:", function (_ref) {
  var _theme$section2;
  var theme = _ref.theme,
    xPad = _ref.xPad;
  return "calc(".concat(theme === null || theme === void 0 ? void 0 : (_theme$section2 = theme.section) === null || _theme$section2 === void 0 ? void 0 : _theme$section2.maxWidth, " + ").concat(xPad, " + ").concat(xPad, ")");
}, ";padding:", function (_ref2) {
  var xPad = _ref2.xPad;
  return "0 ".concat(xPad);
}, ";background-color:", function (props) {
  var _props$theme;
  return (_props$theme = props.theme) === null || _props$theme === void 0 ? void 0 : _props$theme.palette.background;
}, ";color:", function (props) {
  var _props$theme2;
  return (_props$theme2 = props.theme) === null || _props$theme2 === void 0 ? void 0 : _props$theme2.text.primary;
}, ";", devMixins, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNlY3Rpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBMEJvQyIsImZpbGUiOiJTZWN0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHN0eWxlZCBmcm9tIFwiQGVtb3Rpb24vc3R5bGVkXCI7XG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyB1c2VSZXNwb25zaXZlIH0gZnJvbSBcIi4uLy4uL2hvb2tzL3VzZVJlc3BvbnNpdmUvdXNlUmVzcG9uc2l2ZVwiO1xuaW1wb3J0IHsgVGhlbWVDb250ZXh0LCB1c2VUaGVtZSB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xuaW1wb3J0IHsgYXJyYXlpZnlQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2FycmF5aWZ5UHJvcFwiO1xuaW1wb3J0IGRldk1peGlucyBmcm9tIFwiLi4vLi4vbWl4aW5zL3Jlc3BvbnNpdmVQcm9wcy9kZXZNaXhpbnNcIjtcbmltcG9ydCB7IGludGVycG9sYXRlZFByb3AgfSBmcm9tIFwiLi4vLi4vdXRpbHMvcmVzcG9uc2l2ZVByb3BcIjtcblxuLy8gcmVxdWlyZXMgdGhlbWUgd2l0aCBicCBhbmQgc2VjdGlvblxuXG5jb25zdCBTZWN0aW9uID0gUmVhY3QuZm9yd2FyZFJlZigocHJvcHMsIHJlZikgPT4ge1xuICBjb25zdCB7IGJyZWFrcG9pbnRJbmRleCB9ID0gdXNlUmVzcG9uc2l2ZSgpO1xuICBjb25zdCB0aGVtZSA9IHVzZVRoZW1lKFRoZW1lQ29udGV4dCk7XG5cbiAgY29uc3QgeFBhZEFyciA9IGFycmF5aWZ5UHJvcCh0aGVtZT8uc2VjdGlvbj8ueFBhZGRpbmcgfHwgMCk7XG4gIC8vIGNvbnNvbGUubG9nKHhQYWRBcnIpO1xuXG4gIHJldHVybiAoXG4gICAgPFNlY3Rpb25TdHlsZWQgcmVmPXtyZWZ9IHhQYWQ9e3hQYWRBcnJbYnJlYWtwb2ludEluZGV4XX0gey4uLnByb3BzfT5cbiAgICAgIHtwcm9wcy5jaGlsZHJlbn1cbiAgICA8L1NlY3Rpb25TdHlsZWQ+XG4gICk7XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgU2VjdGlvbjtcblxuY29uc3QgU2VjdGlvblN0eWxlZCA9IHN0eWxlZC5zZWN0aW9uYFxuICBtYXJnaW46IDAgYXV0bztcbiAgbWF4LXdpZHRoOiAkeyh7IHRoZW1lLCB4UGFkIH0pID0+XG4gICAgYGNhbGMoJHt0aGVtZT8uc2VjdGlvbj8ubWF4V2lkdGh9ICsgJHt4UGFkfSArICR7eFBhZH0pYH07XG4gIHBhZGRpbmc6ICR7KHsgeFBhZCB9KSA9PiBgMCAke3hQYWR9YH07XG5cbiAgYmFja2dyb3VuZC1jb2xvcjogJHsocHJvcHMpID0+IHByb3BzLnRoZW1lPy5wYWxldHRlLmJhY2tncm91bmR9O1xuICBjb2xvcjogJHsocHJvcHMpID0+IHByb3BzLnRoZW1lPy50ZXh0LnByaW1hcnl9O1xuXG4gICR7ZGV2TWl4aW5zfVxuYDtcbiJdfQ== */"));

var fontFamily = function fontFamily(_ref) {
  var fontFamily = _ref.fontFamily;
  return fontFamily && responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/react.css("font-family:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInR5cG9ncmFwaHlNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBT1MiLCJmaWxlIjoidHlwb2dyYXBoeU1peGlucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xuaW1wb3J0IHsgcmVzcG9uc2l2ZVByb3AgfSBmcm9tIFwiLi4vLi4vdXRpbHMvcmVzcG9uc2l2ZVByb3BcIjtcblxuY29uc3QgZm9udEZhbWlseSA9ICh7IGZvbnRGYW1pbHkgfSkgPT5cbiAgZm9udEZhbWlseSAmJlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGZvbnQtZmFtaWx5OiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IGZvbnRGYW1pbHksXG4gIH0pO1xuXG5jb25zdCBmb250U2l6ZSA9ICh7IGZvbnRTaXplIH0pID0+XG4gIGZvbnRTaXplICYmXG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgZm9udC1zaXplOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IGZvbnRTaXplLFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBmb250V2VpZ2h0ID0gKHsgZm9udFdlaWdodCB9KSA9PlxuICBmb250V2VpZ2h0ICYmXG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgZm9udC13ZWlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZm9udFdlaWdodCxcbiAgfSk7XG5cbmNvbnN0IGxpbmVIZWlnaHQgPSAoeyBsaW5lSGVpZ2h0IH0pID0+XG4gIGxpbmVIZWlnaHQgJiZcbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBsaW5lLWhlaWdodDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBsaW5lSGVpZ2h0LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBjb2xvciA9ICh7IGNvbG9yIH0pID0+XG4gIGNvbG9yICYmXG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgY29sb3I6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogY29sb3IsXG4gIH0pO1xuXG5jb25zdCB0ZXh0QWxpZ24gPSAoeyB0ZXh0QWxpZ24gfSkgPT5cbiAgdGV4dEFsaWduICYmXG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgdGV4dC1hbGlnbjogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiB0ZXh0QWxpZ24sXG4gIH0pO1xuXG5jb25zdCB0ZXh0RGVjb3JhdGlvbiA9ICh7IHRleHREZWNvcmF0aW9uIH0pID0+XG4gIHRleHREZWNvcmF0aW9uICYmXG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IHRleHREZWNvcmF0aW9uLFxuICB9KTtcblxuY29uc3QgdGV4dFRyYW5zZm9ybSA9ICh7IHRleHRUcmFuc2Zvcm0gfSkgPT5cbiAgdGV4dFRyYW5zZm9ybSAmJlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHRleHQtdHJhbnNmb3JtOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IHRleHRUcmFuc2Zvcm0sXG4gIH0pO1xuXG5leHBvcnQgZGVmYXVsdCBbXG4gIGZvbnRGYW1pbHksXG4gIGZvbnRTaXplLFxuICBmb250V2VpZ2h0LFxuICBsaW5lSGVpZ2h0LFxuICBjb2xvcixcbiAgdGV4dEFsaWduLFxuICB0ZXh0RGVjb3JhdGlvbixcbiAgdGV4dFRyYW5zZm9ybSxcbl07XG4iXX0= */");
    },
    val: fontFamily
  });
};
var fontSize = function fontSize(_ref2) {
  var fontSize = _ref2.fontSize;
  return fontSize && responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/react.css("font-size:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInR5cG9ncmFwaHlNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBaUJTIiwiZmlsZSI6InR5cG9ncmFwaHlNaXhpbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IHJlc3BvbnNpdmVQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Jlc3BvbnNpdmVQcm9wXCI7XG5cbmNvbnN0IGZvbnRGYW1pbHkgPSAoeyBmb250RmFtaWx5IH0pID0+XG4gIGZvbnRGYW1pbHkgJiZcbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBmb250LWZhbWlseTogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBmb250RmFtaWx5LFxuICB9KTtcblxuY29uc3QgZm9udFNpemUgPSAoeyBmb250U2l6ZSB9KSA9PlxuICBmb250U2l6ZSAmJlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGZvbnQtc2l6ZTogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBmb250U2l6ZSxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgZm9udFdlaWdodCA9ICh7IGZvbnRXZWlnaHQgfSkgPT5cbiAgZm9udFdlaWdodCAmJlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGZvbnQtd2VpZ2h0OiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IGZvbnRXZWlnaHQsXG4gIH0pO1xuXG5jb25zdCBsaW5lSGVpZ2h0ID0gKHsgbGluZUhlaWdodCB9KSA9PlxuICBsaW5lSGVpZ2h0ICYmXG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgbGluZS1oZWlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbGluZUhlaWdodCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgY29sb3IgPSAoeyBjb2xvciB9KSA9PlxuICBjb2xvciAmJlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGNvbG9yOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IGNvbG9yLFxuICB9KTtcblxuY29uc3QgdGV4dEFsaWduID0gKHsgdGV4dEFsaWduIH0pID0+XG4gIHRleHRBbGlnbiAmJlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHRleHQtYWxpZ246ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogdGV4dEFsaWduLFxuICB9KTtcblxuY29uc3QgdGV4dERlY29yYXRpb24gPSAoeyB0ZXh0RGVjb3JhdGlvbiB9KSA9PlxuICB0ZXh0RGVjb3JhdGlvbiAmJlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiB0ZXh0RGVjb3JhdGlvbixcbiAgfSk7XG5cbmNvbnN0IHRleHRUcmFuc2Zvcm0gPSAoeyB0ZXh0VHJhbnNmb3JtIH0pID0+XG4gIHRleHRUcmFuc2Zvcm0gJiZcbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICB0ZXh0LXRyYW5zZm9ybTogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiB0ZXh0VHJhbnNmb3JtLFxuICB9KTtcblxuZXhwb3J0IGRlZmF1bHQgW1xuICBmb250RmFtaWx5LFxuICBmb250U2l6ZSxcbiAgZm9udFdlaWdodCxcbiAgbGluZUhlaWdodCxcbiAgY29sb3IsXG4gIHRleHRBbGlnbixcbiAgdGV4dERlY29yYXRpb24sXG4gIHRleHRUcmFuc2Zvcm0sXG5dO1xuIl19 */");
    },
    val: fontSize,
    interpolation: "rem"
  });
};
var fontWeight = function fontWeight(_ref3) {
  var fontWeight = _ref3.fontWeight;
  return fontWeight && responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/react.css("font-weight:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInR5cG9ncmFwaHlNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBNEJTIiwiZmlsZSI6InR5cG9ncmFwaHlNaXhpbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IHJlc3BvbnNpdmVQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Jlc3BvbnNpdmVQcm9wXCI7XG5cbmNvbnN0IGZvbnRGYW1pbHkgPSAoeyBmb250RmFtaWx5IH0pID0+XG4gIGZvbnRGYW1pbHkgJiZcbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBmb250LWZhbWlseTogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBmb250RmFtaWx5LFxuICB9KTtcblxuY29uc3QgZm9udFNpemUgPSAoeyBmb250U2l6ZSB9KSA9PlxuICBmb250U2l6ZSAmJlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGZvbnQtc2l6ZTogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBmb250U2l6ZSxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgZm9udFdlaWdodCA9ICh7IGZvbnRXZWlnaHQgfSkgPT5cbiAgZm9udFdlaWdodCAmJlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGZvbnQtd2VpZ2h0OiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IGZvbnRXZWlnaHQsXG4gIH0pO1xuXG5jb25zdCBsaW5lSGVpZ2h0ID0gKHsgbGluZUhlaWdodCB9KSA9PlxuICBsaW5lSGVpZ2h0ICYmXG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgbGluZS1oZWlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbGluZUhlaWdodCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgY29sb3IgPSAoeyBjb2xvciB9KSA9PlxuICBjb2xvciAmJlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGNvbG9yOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IGNvbG9yLFxuICB9KTtcblxuY29uc3QgdGV4dEFsaWduID0gKHsgdGV4dEFsaWduIH0pID0+XG4gIHRleHRBbGlnbiAmJlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHRleHQtYWxpZ246ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogdGV4dEFsaWduLFxuICB9KTtcblxuY29uc3QgdGV4dERlY29yYXRpb24gPSAoeyB0ZXh0RGVjb3JhdGlvbiB9KSA9PlxuICB0ZXh0RGVjb3JhdGlvbiAmJlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiB0ZXh0RGVjb3JhdGlvbixcbiAgfSk7XG5cbmNvbnN0IHRleHRUcmFuc2Zvcm0gPSAoeyB0ZXh0VHJhbnNmb3JtIH0pID0+XG4gIHRleHRUcmFuc2Zvcm0gJiZcbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICB0ZXh0LXRyYW5zZm9ybTogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiB0ZXh0VHJhbnNmb3JtLFxuICB9KTtcblxuZXhwb3J0IGRlZmF1bHQgW1xuICBmb250RmFtaWx5LFxuICBmb250U2l6ZSxcbiAgZm9udFdlaWdodCxcbiAgbGluZUhlaWdodCxcbiAgY29sb3IsXG4gIHRleHRBbGlnbixcbiAgdGV4dERlY29yYXRpb24sXG4gIHRleHRUcmFuc2Zvcm0sXG5dO1xuIl19 */");
    },
    val: fontWeight
  });
};
var lineHeight = function lineHeight(_ref4) {
  var lineHeight = _ref4.lineHeight;
  return lineHeight && responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/react.css("line-height:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInR5cG9ncmFwaHlNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBc0NTIiwiZmlsZSI6InR5cG9ncmFwaHlNaXhpbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IHJlc3BvbnNpdmVQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Jlc3BvbnNpdmVQcm9wXCI7XG5cbmNvbnN0IGZvbnRGYW1pbHkgPSAoeyBmb250RmFtaWx5IH0pID0+XG4gIGZvbnRGYW1pbHkgJiZcbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBmb250LWZhbWlseTogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBmb250RmFtaWx5LFxuICB9KTtcblxuY29uc3QgZm9udFNpemUgPSAoeyBmb250U2l6ZSB9KSA9PlxuICBmb250U2l6ZSAmJlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGZvbnQtc2l6ZTogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBmb250U2l6ZSxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgZm9udFdlaWdodCA9ICh7IGZvbnRXZWlnaHQgfSkgPT5cbiAgZm9udFdlaWdodCAmJlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGZvbnQtd2VpZ2h0OiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IGZvbnRXZWlnaHQsXG4gIH0pO1xuXG5jb25zdCBsaW5lSGVpZ2h0ID0gKHsgbGluZUhlaWdodCB9KSA9PlxuICBsaW5lSGVpZ2h0ICYmXG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgbGluZS1oZWlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbGluZUhlaWdodCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgY29sb3IgPSAoeyBjb2xvciB9KSA9PlxuICBjb2xvciAmJlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGNvbG9yOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IGNvbG9yLFxuICB9KTtcblxuY29uc3QgdGV4dEFsaWduID0gKHsgdGV4dEFsaWduIH0pID0+XG4gIHRleHRBbGlnbiAmJlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHRleHQtYWxpZ246ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogdGV4dEFsaWduLFxuICB9KTtcblxuY29uc3QgdGV4dERlY29yYXRpb24gPSAoeyB0ZXh0RGVjb3JhdGlvbiB9KSA9PlxuICB0ZXh0RGVjb3JhdGlvbiAmJlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiB0ZXh0RGVjb3JhdGlvbixcbiAgfSk7XG5cbmNvbnN0IHRleHRUcmFuc2Zvcm0gPSAoeyB0ZXh0VHJhbnNmb3JtIH0pID0+XG4gIHRleHRUcmFuc2Zvcm0gJiZcbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICB0ZXh0LXRyYW5zZm9ybTogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiB0ZXh0VHJhbnNmb3JtLFxuICB9KTtcblxuZXhwb3J0IGRlZmF1bHQgW1xuICBmb250RmFtaWx5LFxuICBmb250U2l6ZSxcbiAgZm9udFdlaWdodCxcbiAgbGluZUhlaWdodCxcbiAgY29sb3IsXG4gIHRleHRBbGlnbixcbiAgdGV4dERlY29yYXRpb24sXG4gIHRleHRUcmFuc2Zvcm0sXG5dO1xuIl19 */");
    },
    val: lineHeight,
    interpolation: "rem"
  });
};
var color = function color(_ref5) {
  var color = _ref5.color;
  return color && responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/react.css("color:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInR5cG9ncmFwaHlNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBaURTIiwiZmlsZSI6InR5cG9ncmFwaHlNaXhpbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IHJlc3BvbnNpdmVQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Jlc3BvbnNpdmVQcm9wXCI7XG5cbmNvbnN0IGZvbnRGYW1pbHkgPSAoeyBmb250RmFtaWx5IH0pID0+XG4gIGZvbnRGYW1pbHkgJiZcbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBmb250LWZhbWlseTogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBmb250RmFtaWx5LFxuICB9KTtcblxuY29uc3QgZm9udFNpemUgPSAoeyBmb250U2l6ZSB9KSA9PlxuICBmb250U2l6ZSAmJlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGZvbnQtc2l6ZTogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBmb250U2l6ZSxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgZm9udFdlaWdodCA9ICh7IGZvbnRXZWlnaHQgfSkgPT5cbiAgZm9udFdlaWdodCAmJlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGZvbnQtd2VpZ2h0OiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IGZvbnRXZWlnaHQsXG4gIH0pO1xuXG5jb25zdCBsaW5lSGVpZ2h0ID0gKHsgbGluZUhlaWdodCB9KSA9PlxuICBsaW5lSGVpZ2h0ICYmXG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgbGluZS1oZWlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbGluZUhlaWdodCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgY29sb3IgPSAoeyBjb2xvciB9KSA9PlxuICBjb2xvciAmJlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGNvbG9yOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IGNvbG9yLFxuICB9KTtcblxuY29uc3QgdGV4dEFsaWduID0gKHsgdGV4dEFsaWduIH0pID0+XG4gIHRleHRBbGlnbiAmJlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHRleHQtYWxpZ246ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogdGV4dEFsaWduLFxuICB9KTtcblxuY29uc3QgdGV4dERlY29yYXRpb24gPSAoeyB0ZXh0RGVjb3JhdGlvbiB9KSA9PlxuICB0ZXh0RGVjb3JhdGlvbiAmJlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiB0ZXh0RGVjb3JhdGlvbixcbiAgfSk7XG5cbmNvbnN0IHRleHRUcmFuc2Zvcm0gPSAoeyB0ZXh0VHJhbnNmb3JtIH0pID0+XG4gIHRleHRUcmFuc2Zvcm0gJiZcbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICB0ZXh0LXRyYW5zZm9ybTogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiB0ZXh0VHJhbnNmb3JtLFxuICB9KTtcblxuZXhwb3J0IGRlZmF1bHQgW1xuICBmb250RmFtaWx5LFxuICBmb250U2l6ZSxcbiAgZm9udFdlaWdodCxcbiAgbGluZUhlaWdodCxcbiAgY29sb3IsXG4gIHRleHRBbGlnbixcbiAgdGV4dERlY29yYXRpb24sXG4gIHRleHRUcmFuc2Zvcm0sXG5dO1xuIl19 */");
    },
    val: color
  });
};
var textAlign = function textAlign(_ref6) {
  var textAlign = _ref6.textAlign;
  return textAlign && responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/react.css("text-align:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInR5cG9ncmFwaHlNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBMkRTIiwiZmlsZSI6InR5cG9ncmFwaHlNaXhpbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IHJlc3BvbnNpdmVQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Jlc3BvbnNpdmVQcm9wXCI7XG5cbmNvbnN0IGZvbnRGYW1pbHkgPSAoeyBmb250RmFtaWx5IH0pID0+XG4gIGZvbnRGYW1pbHkgJiZcbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBmb250LWZhbWlseTogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBmb250RmFtaWx5LFxuICB9KTtcblxuY29uc3QgZm9udFNpemUgPSAoeyBmb250U2l6ZSB9KSA9PlxuICBmb250U2l6ZSAmJlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGZvbnQtc2l6ZTogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBmb250U2l6ZSxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgZm9udFdlaWdodCA9ICh7IGZvbnRXZWlnaHQgfSkgPT5cbiAgZm9udFdlaWdodCAmJlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGZvbnQtd2VpZ2h0OiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IGZvbnRXZWlnaHQsXG4gIH0pO1xuXG5jb25zdCBsaW5lSGVpZ2h0ID0gKHsgbGluZUhlaWdodCB9KSA9PlxuICBsaW5lSGVpZ2h0ICYmXG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgbGluZS1oZWlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbGluZUhlaWdodCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgY29sb3IgPSAoeyBjb2xvciB9KSA9PlxuICBjb2xvciAmJlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGNvbG9yOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IGNvbG9yLFxuICB9KTtcblxuY29uc3QgdGV4dEFsaWduID0gKHsgdGV4dEFsaWduIH0pID0+XG4gIHRleHRBbGlnbiAmJlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHRleHQtYWxpZ246ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogdGV4dEFsaWduLFxuICB9KTtcblxuY29uc3QgdGV4dERlY29yYXRpb24gPSAoeyB0ZXh0RGVjb3JhdGlvbiB9KSA9PlxuICB0ZXh0RGVjb3JhdGlvbiAmJlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiB0ZXh0RGVjb3JhdGlvbixcbiAgfSk7XG5cbmNvbnN0IHRleHRUcmFuc2Zvcm0gPSAoeyB0ZXh0VHJhbnNmb3JtIH0pID0+XG4gIHRleHRUcmFuc2Zvcm0gJiZcbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICB0ZXh0LXRyYW5zZm9ybTogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiB0ZXh0VHJhbnNmb3JtLFxuICB9KTtcblxuZXhwb3J0IGRlZmF1bHQgW1xuICBmb250RmFtaWx5LFxuICBmb250U2l6ZSxcbiAgZm9udFdlaWdodCxcbiAgbGluZUhlaWdodCxcbiAgY29sb3IsXG4gIHRleHRBbGlnbixcbiAgdGV4dERlY29yYXRpb24sXG4gIHRleHRUcmFuc2Zvcm0sXG5dO1xuIl19 */");
    },
    val: textAlign
  });
};
var textDecoration = function textDecoration(_ref7) {
  var textDecoration = _ref7.textDecoration;
  return textDecoration && responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/react.css("text-decoration:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInR5cG9ncmFwaHlNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBcUVTIiwiZmlsZSI6InR5cG9ncmFwaHlNaXhpbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IHJlc3BvbnNpdmVQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Jlc3BvbnNpdmVQcm9wXCI7XG5cbmNvbnN0IGZvbnRGYW1pbHkgPSAoeyBmb250RmFtaWx5IH0pID0+XG4gIGZvbnRGYW1pbHkgJiZcbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBmb250LWZhbWlseTogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBmb250RmFtaWx5LFxuICB9KTtcblxuY29uc3QgZm9udFNpemUgPSAoeyBmb250U2l6ZSB9KSA9PlxuICBmb250U2l6ZSAmJlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGZvbnQtc2l6ZTogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBmb250U2l6ZSxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgZm9udFdlaWdodCA9ICh7IGZvbnRXZWlnaHQgfSkgPT5cbiAgZm9udFdlaWdodCAmJlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGZvbnQtd2VpZ2h0OiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IGZvbnRXZWlnaHQsXG4gIH0pO1xuXG5jb25zdCBsaW5lSGVpZ2h0ID0gKHsgbGluZUhlaWdodCB9KSA9PlxuICBsaW5lSGVpZ2h0ICYmXG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgbGluZS1oZWlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbGluZUhlaWdodCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgY29sb3IgPSAoeyBjb2xvciB9KSA9PlxuICBjb2xvciAmJlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGNvbG9yOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IGNvbG9yLFxuICB9KTtcblxuY29uc3QgdGV4dEFsaWduID0gKHsgdGV4dEFsaWduIH0pID0+XG4gIHRleHRBbGlnbiAmJlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHRleHQtYWxpZ246ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogdGV4dEFsaWduLFxuICB9KTtcblxuY29uc3QgdGV4dERlY29yYXRpb24gPSAoeyB0ZXh0RGVjb3JhdGlvbiB9KSA9PlxuICB0ZXh0RGVjb3JhdGlvbiAmJlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiB0ZXh0RGVjb3JhdGlvbixcbiAgfSk7XG5cbmNvbnN0IHRleHRUcmFuc2Zvcm0gPSAoeyB0ZXh0VHJhbnNmb3JtIH0pID0+XG4gIHRleHRUcmFuc2Zvcm0gJiZcbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICB0ZXh0LXRyYW5zZm9ybTogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiB0ZXh0VHJhbnNmb3JtLFxuICB9KTtcblxuZXhwb3J0IGRlZmF1bHQgW1xuICBmb250RmFtaWx5LFxuICBmb250U2l6ZSxcbiAgZm9udFdlaWdodCxcbiAgbGluZUhlaWdodCxcbiAgY29sb3IsXG4gIHRleHRBbGlnbixcbiAgdGV4dERlY29yYXRpb24sXG4gIHRleHRUcmFuc2Zvcm0sXG5dO1xuIl19 */");
    },
    val: textDecoration
  });
};
var textTransform = function textTransform(_ref8) {
  var textTransform = _ref8.textTransform;
  return textTransform && responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/react.css("text-transform:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInR5cG9ncmFwaHlNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBK0VTIiwiZmlsZSI6InR5cG9ncmFwaHlNaXhpbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IHJlc3BvbnNpdmVQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Jlc3BvbnNpdmVQcm9wXCI7XG5cbmNvbnN0IGZvbnRGYW1pbHkgPSAoeyBmb250RmFtaWx5IH0pID0+XG4gIGZvbnRGYW1pbHkgJiZcbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBmb250LWZhbWlseTogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBmb250RmFtaWx5LFxuICB9KTtcblxuY29uc3QgZm9udFNpemUgPSAoeyBmb250U2l6ZSB9KSA9PlxuICBmb250U2l6ZSAmJlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGZvbnQtc2l6ZTogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBmb250U2l6ZSxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgZm9udFdlaWdodCA9ICh7IGZvbnRXZWlnaHQgfSkgPT5cbiAgZm9udFdlaWdodCAmJlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGZvbnQtd2VpZ2h0OiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IGZvbnRXZWlnaHQsXG4gIH0pO1xuXG5jb25zdCBsaW5lSGVpZ2h0ID0gKHsgbGluZUhlaWdodCB9KSA9PlxuICBsaW5lSGVpZ2h0ICYmXG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgbGluZS1oZWlnaHQ6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogbGluZUhlaWdodCxcbiAgICBpbnRlcnBvbGF0aW9uOiBcInJlbVwiLFxuICB9KTtcblxuY29uc3QgY29sb3IgPSAoeyBjb2xvciB9KSA9PlxuICBjb2xvciAmJlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGNvbG9yOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IGNvbG9yLFxuICB9KTtcblxuY29uc3QgdGV4dEFsaWduID0gKHsgdGV4dEFsaWduIH0pID0+XG4gIHRleHRBbGlnbiAmJlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHRleHQtYWxpZ246ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogdGV4dEFsaWduLFxuICB9KTtcblxuY29uc3QgdGV4dERlY29yYXRpb24gPSAoeyB0ZXh0RGVjb3JhdGlvbiB9KSA9PlxuICB0ZXh0RGVjb3JhdGlvbiAmJlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiB0ZXh0RGVjb3JhdGlvbixcbiAgfSk7XG5cbmNvbnN0IHRleHRUcmFuc2Zvcm0gPSAoeyB0ZXh0VHJhbnNmb3JtIH0pID0+XG4gIHRleHRUcmFuc2Zvcm0gJiZcbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICB0ZXh0LXRyYW5zZm9ybTogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiB0ZXh0VHJhbnNmb3JtLFxuICB9KTtcblxuZXhwb3J0IGRlZmF1bHQgW1xuICBmb250RmFtaWx5LFxuICBmb250U2l6ZSxcbiAgZm9udFdlaWdodCxcbiAgbGluZUhlaWdodCxcbiAgY29sb3IsXG4gIHRleHRBbGlnbixcbiAgdGV4dERlY29yYXRpb24sXG4gIHRleHRUcmFuc2Zvcm0sXG5dO1xuIl19 */");
    },
    val: textTransform
  });
};
var typographyMixins = [fontFamily, fontSize, fontWeight, lineHeight, color, textAlign, textDecoration, textTransform];

var _excluded = ["variant", "children"];
var Typography = /*#__PURE__*/React__default["default"].forwardRef(function (_ref, ref) {
  var _theme$text;
  var variantFromProps = _ref.variant,
    children = _ref.children,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var theme = react.useTheme(react.ThemeContext);
  var varsFrTheme = theme === null || theme === void 0 ? void 0 : (_theme$text = theme.text) === null || _theme$text === void 0 ? void 0 : _theme$text.variants;
  return react.jsx(TypographyStyled, _extends({
    ref: ref
  }, varsFrTheme && varsFrTheme.default, variantFromProps && varsFrTheme[variantFromProps], restProps), children);
});
var props = ["fontSize", "fontWeight", "lineHeight", "fontFamily", "color", "textAlign", "textDecoration", "textTransform"];
var TypographyStyled = /*#__PURE__*/_styled__default["default"]("p", process.env.NODE_ENV === "production" ? {
  shouldForwardProp: function shouldForwardProp(prop) {
    return isPropValid__default["default"](prop) && !props.includes(prop);
  },
  target: "e14iioxq0"
} : {
  shouldForwardProp: function shouldForwardProp(prop) {
    return isPropValid__default["default"](prop) && !props.includes(prop);
  },
  target: "e14iioxq0",
  label: "TypographyStyled"
})(devMixins, " ", typographyMixins, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlR5cG9ncmFwaHkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBdUNFIiwiZmlsZSI6IlR5cG9ncmFwaHkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgc3R5bGVkIGZyb20gXCJAZW1vdGlvbi9zdHlsZWRcIjtcbmltcG9ydCB7IFRoZW1lQ29udGV4dCwgdXNlVGhlbWUgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCBpc1Byb3BWYWxpZCBmcm9tIFwiQGVtb3Rpb24vaXMtcHJvcC12YWxpZFwiO1xuaW1wb3J0IHR5cG9ncmFwaHlNaXhpbnMgZnJvbSBcIi4uLy4uL21peGlucy9yZXNwb25zaXZlUHJvcHMvdHlwb2dyYXBoeU1peGluc1wiO1xuaW1wb3J0IGRldk1peGlucyBmcm9tIFwiLi4vLi4vbWl4aW5zL3Jlc3BvbnNpdmVQcm9wcy9kZXZNaXhpbnNcIjtcblxuY29uc3QgVHlwb2dyYXBoeSA9IFJlYWN0LmZvcndhcmRSZWYoXG4gICh7IHZhcmlhbnQ6IHZhcmlhbnRGcm9tUHJvcHMsIGNoaWxkcmVuLCAuLi5yZXN0UHJvcHMgfSwgcmVmKSA9PiB7XG4gICAgY29uc3QgdGhlbWUgPSB1c2VUaGVtZShUaGVtZUNvbnRleHQpO1xuXG4gICAgY29uc3QgdmFyc0ZyVGhlbWUgPSB0aGVtZT8udGV4dD8udmFyaWFudHM7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPFR5cG9ncmFwaHlTdHlsZWRcbiAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgIHsuLi4odmFyc0ZyVGhlbWUgJiYgdmFyc0ZyVGhlbWUuZGVmYXVsdCl9XG4gICAgICAgIHsuLi4odmFyaWFudEZyb21Qcm9wcyAmJiB2YXJzRnJUaGVtZVt2YXJpYW50RnJvbVByb3BzXSl9XG4gICAgICAgIHsuLi5yZXN0UHJvcHN9XG4gICAgICA+XG4gICAgICAgIHtjaGlsZHJlbn1cbiAgICAgIDwvVHlwb2dyYXBoeVN0eWxlZD5cbiAgICApO1xuICB9XG4pO1xuXG5jb25zdCBwcm9wcyA9IFtcbiAgXCJmb250U2l6ZVwiLFxuICBcImZvbnRXZWlnaHRcIixcbiAgXCJsaW5lSGVpZ2h0XCIsXG4gIFwiZm9udEZhbWlseVwiLFxuICBcImNvbG9yXCIsXG4gIFwidGV4dEFsaWduXCIsXG4gIFwidGV4dERlY29yYXRpb25cIixcbiAgXCJ0ZXh0VHJhbnNmb3JtXCIsXG5dO1xuXG5jb25zdCBUeXBvZ3JhcGh5U3R5bGVkID0gc3R5bGVkKFwicFwiLCB7XG4gIHNob3VsZEZvcndhcmRQcm9wOiAocHJvcCkgPT4gaXNQcm9wVmFsaWQocHJvcCkgJiYgIXByb3BzLmluY2x1ZGVzKHByb3ApLFxufSlgXG4gICR7ZGV2TWl4aW5zfVxuICAke3R5cG9ncmFwaHlNaXhpbnN9XG5gO1xuXG4vLyBjb25zdCBUeXBvZ3JhcGh5U3R5bGVkID0gc3R5bGVkLnBgXG4vLyAgICR7ZGV2TWl4aW5zfVxuLy8gICAke3R5cG9ncmFwaHlNaXhpbnN9XG4vLyBgO1xuXG5leHBvcnQgZGVmYXVsdCBUeXBvZ3JhcGh5O1xuIl19 */"));

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
  var _useState = React.useState(startEmpty ? createSpaces(sentence) : sentence),
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

exports.Grid = Grid;
exports.Section = Section;
exports.Test = Test;
exports.ThemeProvider = ThemeProvider;
exports.Typography = Typography;
exports.defaultTheme = defaultTheme;
exports.mq = mq;
exports.useResponsive = useResponsive;
exports.useSSRLayoutEffect = useSSRLayoutEffect;
exports.useScramble = useScramble;
