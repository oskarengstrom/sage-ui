import React, { useState, useEffect, useLayoutEffect } from 'react';
import { jsx, ThemeProvider as ThemeProvider$1, useTheme, ThemeContext, css } from '@emotion/react';
import { stripUnit, remToPx } from 'polished';
import _styled from '@emotion/styled/base';

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
  colors: {
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
  return jsx(ThemeProvider$1, {
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

// USAGE:
// const { isMobile, breakpoint } = useResponsive()
//
// isMobile = Is the device an actual phone,
// breakpoint = shows the current screen width in sm/md/lr/xl,

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

var useSSRLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : function () {};

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
  if (val === undefined || val === null) return;
  if (interpolation) {
    if (typeof val === "number") val = interpolatedProp(val, interpolation);
    if (Array.isArray(val)) val.forEach(function (x, index) {
      if (typeof x === "number") val[index] = interpolatedProp(x, interpolation);
    });
  }
  val = Array.isArray(val) ? val : [val];
  return /*#__PURE__*/css(func(val[0]), "@media screen and (min-width: ", bp[1], "){", val[1] && func(val[1]), ";}@media screen and (min-width: ", bp[2], "){", val[2] && func(val[2]), ";}@media screen and (min-width: ", bp[3], "){", val[3] && func(val[3]), ";}" + (process.env.NODE_ENV === "production" ? "" : ";label:responsiveProp;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc3BvbnNpdmVQcm9wLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTBCWSIsImZpbGUiOiJyZXNwb25zaXZlUHJvcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRoZW1lQ29udGV4dCwgY3NzLCB1c2VUaGVtZSB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xuXG5leHBvcnQgY29uc3QgaW50ZXJwb2xhdGVkUHJvcCA9ICh2LCBpbnRlcnBvbGF0aW9uKSA9PiB7XG4gIGlmICh0eXBlb2YgdiA9PT0gXCJudW1iZXJcIikge1xuICAgIHJldHVybiB2ICsgaW50ZXJwb2xhdGlvbjtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdjtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IHJlc3BvbnNpdmVQcm9wID0gKHsgZnVuYywgdmFsLCBpbnRlcnBvbGF0aW9uID0gZmFsc2UgfSkgPT4ge1xuICBjb25zdCB7IGJwIH0gPSB1c2VUaGVtZShUaGVtZUNvbnRleHQpO1xuXG4gIGlmICh2YWwgPT09IHVuZGVmaW5lZCB8fCB2YWwgPT09IG51bGwpIHJldHVybjtcblxuICBpZiAoaW50ZXJwb2xhdGlvbikge1xuICAgIGlmICh0eXBlb2YgdmFsID09PSBcIm51bWJlclwiKSB2YWwgPSBpbnRlcnBvbGF0ZWRQcm9wKHZhbCwgaW50ZXJwb2xhdGlvbik7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsKSlcbiAgICAgIHZhbC5mb3JFYWNoKCh4LCBpbmRleCkgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIHggPT09IFwibnVtYmVyXCIpXG4gICAgICAgICAgdmFsW2luZGV4XSA9IGludGVycG9sYXRlZFByb3AoeCwgaW50ZXJwb2xhdGlvbik7XG4gICAgICB9KTtcbiAgfVxuXG4gIHZhbCA9IEFycmF5LmlzQXJyYXkodmFsKSA/IHZhbCA6IFt2YWxdO1xuXG4gIHJldHVybiBjc3NgXG4gICAgJHtmdW5jKHZhbFswXSl9XG5cbiAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAke2JwWzFdfSkge1xuICAgICAgJHt2YWxbMV0gJiYgZnVuYyh2YWxbMV0pfVxuICAgIH1cblxuICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6ICR7YnBbMl19KSB7XG4gICAgICAke3ZhbFsyXSAmJiBmdW5jKHZhbFsyXSl9XG4gICAgfVxuXG4gICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogJHticFszXX0pIHtcbiAgICAgICR7dmFsWzNdICYmIGZ1bmModmFsWzNdKX1cbiAgICB9XG4gIGA7XG59O1xuIl19 */");
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
      return /*#__PURE__*/css("grid-template-columns:repeat(", x, ", 1fr);" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyaWRNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBa0JTIiwiZmlsZSI6ImdyaWRNaXhpbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IHJlc3BvbnNpdmVQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Jlc3BvbnNpdmVQcm9wXCI7XG5cbi8vIGdyaWQsXG4vLyBiYXNlLFxuLy8gZ2FwLFxuLy8gZ2FweCxcbi8vIGdhcHksXG4vLyBwbGFjZUl0ZW1zLFxuXG5jb25zdCBncmlkID0gY3NzYFxuICBkaXNwbGF5OiBncmlkO1xuYDtcblxuY29uc3QgYmFzZSA9ICh7IGJhc2UgfSkgPT5cbiAgYmFzZSAmJlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KCR7eH0sIDFmcik7XG4gICAgICBgLFxuICAgIHZhbDogYmFzZSxcbiAgfSk7XG5cbmNvbnN0IGdhcCA9ICh7IGdhcCB9KSA9PlxuICBnYXAgJiZcbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBnYXA6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZ2FwLFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBnYXB4ID0gKHsgZ2FweCB9KSA9PlxuICBnYXB4ICYmXG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgY29sdW1uLWdhcDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBnYXB4LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBnYXB5ID0gKHsgZ2FweSB9KSA9PlxuICBnYXB5ICYmXG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgcm93LWdhcDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBnYXB5LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBwbGFjZUl0ZW1zID0gKHsgcGxhY2VJdGVtcyB9KSA9PlxuICBwbGFjZUl0ZW1zICYmXG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgcGxhY2UtaXRlbXM6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogcGxhY2VJdGVtcyxcbiAgfSk7XG5cbmV4cG9ydCBkZWZhdWx0IFtncmlkLCBiYXNlLCBnYXAsIGdhcHgsIGdhcHksIHBsYWNlSXRlbXNdO1xuIl19 */");
    },
    val: base
  });
};
var gap = function gap(_ref2) {
  var gap = _ref2.gap;
  return gap && responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("gap:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyaWRNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBNEJTIiwiZmlsZSI6ImdyaWRNaXhpbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IHJlc3BvbnNpdmVQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Jlc3BvbnNpdmVQcm9wXCI7XG5cbi8vIGdyaWQsXG4vLyBiYXNlLFxuLy8gZ2FwLFxuLy8gZ2FweCxcbi8vIGdhcHksXG4vLyBwbGFjZUl0ZW1zLFxuXG5jb25zdCBncmlkID0gY3NzYFxuICBkaXNwbGF5OiBncmlkO1xuYDtcblxuY29uc3QgYmFzZSA9ICh7IGJhc2UgfSkgPT5cbiAgYmFzZSAmJlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KCR7eH0sIDFmcik7XG4gICAgICBgLFxuICAgIHZhbDogYmFzZSxcbiAgfSk7XG5cbmNvbnN0IGdhcCA9ICh7IGdhcCB9KSA9PlxuICBnYXAgJiZcbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBnYXA6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZ2FwLFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBnYXB4ID0gKHsgZ2FweCB9KSA9PlxuICBnYXB4ICYmXG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgY29sdW1uLWdhcDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBnYXB4LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBnYXB5ID0gKHsgZ2FweSB9KSA9PlxuICBnYXB5ICYmXG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgcm93LWdhcDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBnYXB5LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBwbGFjZUl0ZW1zID0gKHsgcGxhY2VJdGVtcyB9KSA9PlxuICBwbGFjZUl0ZW1zICYmXG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgcGxhY2UtaXRlbXM6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogcGxhY2VJdGVtcyxcbiAgfSk7XG5cbmV4cG9ydCBkZWZhdWx0IFtncmlkLCBiYXNlLCBnYXAsIGdhcHgsIGdhcHksIHBsYWNlSXRlbXNdO1xuIl19 */");
    },
    val: gap,
    interpolation: "rem"
  });
};
var gapx = function gapx(_ref3) {
  var gapx = _ref3.gapx;
  return gapx && responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("column-gap:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyaWRNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBdUNTIiwiZmlsZSI6ImdyaWRNaXhpbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IHJlc3BvbnNpdmVQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Jlc3BvbnNpdmVQcm9wXCI7XG5cbi8vIGdyaWQsXG4vLyBiYXNlLFxuLy8gZ2FwLFxuLy8gZ2FweCxcbi8vIGdhcHksXG4vLyBwbGFjZUl0ZW1zLFxuXG5jb25zdCBncmlkID0gY3NzYFxuICBkaXNwbGF5OiBncmlkO1xuYDtcblxuY29uc3QgYmFzZSA9ICh7IGJhc2UgfSkgPT5cbiAgYmFzZSAmJlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KCR7eH0sIDFmcik7XG4gICAgICBgLFxuICAgIHZhbDogYmFzZSxcbiAgfSk7XG5cbmNvbnN0IGdhcCA9ICh7IGdhcCB9KSA9PlxuICBnYXAgJiZcbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBnYXA6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZ2FwLFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBnYXB4ID0gKHsgZ2FweCB9KSA9PlxuICBnYXB4ICYmXG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgY29sdW1uLWdhcDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBnYXB4LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBnYXB5ID0gKHsgZ2FweSB9KSA9PlxuICBnYXB5ICYmXG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgcm93LWdhcDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBnYXB5LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBwbGFjZUl0ZW1zID0gKHsgcGxhY2VJdGVtcyB9KSA9PlxuICBwbGFjZUl0ZW1zICYmXG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgcGxhY2UtaXRlbXM6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogcGxhY2VJdGVtcyxcbiAgfSk7XG5cbmV4cG9ydCBkZWZhdWx0IFtncmlkLCBiYXNlLCBnYXAsIGdhcHgsIGdhcHksIHBsYWNlSXRlbXNdO1xuIl19 */");
    },
    val: gapx,
    interpolation: "rem"
  });
};
var gapy = function gapy(_ref4) {
  var gapy = _ref4.gapy;
  return gapy && responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("row-gap:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyaWRNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBa0RTIiwiZmlsZSI6ImdyaWRNaXhpbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IHJlc3BvbnNpdmVQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Jlc3BvbnNpdmVQcm9wXCI7XG5cbi8vIGdyaWQsXG4vLyBiYXNlLFxuLy8gZ2FwLFxuLy8gZ2FweCxcbi8vIGdhcHksXG4vLyBwbGFjZUl0ZW1zLFxuXG5jb25zdCBncmlkID0gY3NzYFxuICBkaXNwbGF5OiBncmlkO1xuYDtcblxuY29uc3QgYmFzZSA9ICh7IGJhc2UgfSkgPT5cbiAgYmFzZSAmJlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KCR7eH0sIDFmcik7XG4gICAgICBgLFxuICAgIHZhbDogYmFzZSxcbiAgfSk7XG5cbmNvbnN0IGdhcCA9ICh7IGdhcCB9KSA9PlxuICBnYXAgJiZcbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBnYXA6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZ2FwLFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBnYXB4ID0gKHsgZ2FweCB9KSA9PlxuICBnYXB4ICYmXG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgY29sdW1uLWdhcDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBnYXB4LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBnYXB5ID0gKHsgZ2FweSB9KSA9PlxuICBnYXB5ICYmXG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgcm93LWdhcDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBnYXB5LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBwbGFjZUl0ZW1zID0gKHsgcGxhY2VJdGVtcyB9KSA9PlxuICBwbGFjZUl0ZW1zICYmXG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgcGxhY2UtaXRlbXM6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogcGxhY2VJdGVtcyxcbiAgfSk7XG5cbmV4cG9ydCBkZWZhdWx0IFtncmlkLCBiYXNlLCBnYXAsIGdhcHgsIGdhcHksIHBsYWNlSXRlbXNdO1xuIl19 */");
    },
    val: gapy,
    interpolation: "rem"
  });
};
var placeItems = function placeItems(_ref5) {
  var placeItems = _ref5.placeItems;
  return placeItems && responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("place-items:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyaWRNaXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBNkRTIiwiZmlsZSI6ImdyaWRNaXhpbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IHJlc3BvbnNpdmVQcm9wIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Jlc3BvbnNpdmVQcm9wXCI7XG5cbi8vIGdyaWQsXG4vLyBiYXNlLFxuLy8gZ2FwLFxuLy8gZ2FweCxcbi8vIGdhcHksXG4vLyBwbGFjZUl0ZW1zLFxuXG5jb25zdCBncmlkID0gY3NzYFxuICBkaXNwbGF5OiBncmlkO1xuYDtcblxuY29uc3QgYmFzZSA9ICh7IGJhc2UgfSkgPT5cbiAgYmFzZSAmJlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KCR7eH0sIDFmcik7XG4gICAgICBgLFxuICAgIHZhbDogYmFzZSxcbiAgfSk7XG5cbmNvbnN0IGdhcCA9ICh7IGdhcCB9KSA9PlxuICBnYXAgJiZcbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBnYXA6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogZ2FwLFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBnYXB4ID0gKHsgZ2FweCB9KSA9PlxuICBnYXB4ICYmXG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgY29sdW1uLWdhcDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBnYXB4LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBnYXB5ID0gKHsgZ2FweSB9KSA9PlxuICBnYXB5ICYmXG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgcm93LWdhcDogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBnYXB5LFxuICAgIGludGVycG9sYXRpb246IFwicmVtXCIsXG4gIH0pO1xuXG5jb25zdCBwbGFjZUl0ZW1zID0gKHsgcGxhY2VJdGVtcyB9KSA9PlxuICBwbGFjZUl0ZW1zICYmXG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgcGxhY2UtaXRlbXM6ICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogcGxhY2VJdGVtcyxcbiAgfSk7XG5cbmV4cG9ydCBkZWZhdWx0IFtncmlkLCBiYXNlLCBnYXAsIGdhcHgsIGdhcHksIHBsYWNlSXRlbXNdO1xuIl19 */");
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
      return /*#__PURE__*/css("grid-column:span ", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyaWRJdGVtTWl4aW5zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWFTIiwiZmlsZSI6ImdyaWRJdGVtTWl4aW5zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3NzIH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XG5pbXBvcnQgeyByZXNwb25zaXZlUHJvcCB9IGZyb20gXCIuLi8uLi91dGlscy9yZXNwb25zaXZlUHJvcFwiO1xuXG4vLyBzcGFuIChudW06IHNwYW4sIHN0cmluZzogY29sIHN0YXJ0L2VuZCApXG4vLyBwbGFjZVNlbGYsXG5cbi8vIFRPRE86XG4vLyBncmlkLWNvbHVtbjogJHt4fTtcblxuY29uc3Qgc3BhbiA9ICh7IHNwYW4gfSkgPT5cbiAgc3BhbiAmJlxuICByZXNwb25zaXZlUHJvcCh7XG4gICAgZnVuYzogKHgpID0+XG4gICAgICBjc3NgXG4gICAgICAgIGdyaWQtY29sdW1uOiBzcGFuICR7eH07XG4gICAgICBgLFxuICAgIHZhbDogc3BhbixcbiAgfSk7XG5cbmNvbnN0IHBsYWNlU2VsZiA9ICh7IHBsYWNlU2VsZiB9KSA9PlxuICBwbGFjZVNlbGYgJiZcbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBwbGFjZS1zZWxmOiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IHBsYWNlU2VsZixcbiAgfSk7XG5cbmV4cG9ydCBkZWZhdWx0IFtzcGFuLCBwbGFjZVNlbGZdO1xuIl19 */");
    },
    val: span
  });
};
var placeSelf = function placeSelf(_ref2) {
  var placeSelf = _ref2.placeSelf;
  return placeSelf && responsiveProp({
    func: function func(x) {
      return /*#__PURE__*/css("place-self:", x, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:func;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyaWRJdGVtTWl4aW5zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXVCUyIsImZpbGUiOiJncmlkSXRlbU1peGlucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xuaW1wb3J0IHsgcmVzcG9uc2l2ZVByb3AgfSBmcm9tIFwiLi4vLi4vdXRpbHMvcmVzcG9uc2l2ZVByb3BcIjtcblxuLy8gc3BhbiAobnVtOiBzcGFuLCBzdHJpbmc6IGNvbCBzdGFydC9lbmQgKVxuLy8gcGxhY2VTZWxmLFxuXG4vLyBUT0RPOlxuLy8gZ3JpZC1jb2x1bW46ICR7eH07XG5cbmNvbnN0IHNwYW4gPSAoeyBzcGFuIH0pID0+XG4gIHNwYW4gJiZcbiAgcmVzcG9uc2l2ZVByb3Aoe1xuICAgIGZ1bmM6ICh4KSA9PlxuICAgICAgY3NzYFxuICAgICAgICBncmlkLWNvbHVtbjogc3BhbiAke3h9O1xuICAgICAgYCxcbiAgICB2YWw6IHNwYW4sXG4gIH0pO1xuXG5jb25zdCBwbGFjZVNlbGYgPSAoeyBwbGFjZVNlbGYgfSkgPT5cbiAgcGxhY2VTZWxmICYmXG4gIHJlc3BvbnNpdmVQcm9wKHtcbiAgICBmdW5jOiAoeCkgPT5cbiAgICAgIGNzc2BcbiAgICAgICAgcGxhY2Utc2VsZjogJHt4fTtcbiAgICAgIGAsXG4gICAgdmFsOiBwbGFjZVNlbGYsXG4gIH0pO1xuXG5leHBvcnQgZGVmYXVsdCBbc3BhbiwgcGxhY2VTZWxmXTtcbiJdfQ== */");
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

var Grid = /*#__PURE__*/_styled("div", process.env.NODE_ENV === "production" ? {
  target: "e4c7wjj1"
} : {
  target: "e4c7wjj1",
  label: "Grid"
})(devMixins, " ", gridMixins, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkdyaWQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS3VCIiwiZmlsZSI6IkdyaWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc3R5bGVkIGZyb20gXCJAZW1vdGlvbi9zdHlsZWRcIjtcbmltcG9ydCBncmlkTWl4aW5zIGZyb20gXCIuLi9taXhpbnMvcmVzcG9uc2l2ZVByb3BzL2dyaWRNaXhpbnNcIjtcbmltcG9ydCBncmlkSXRlbU1peGlucyBmcm9tIFwiLi4vbWl4aW5zL3Jlc3BvbnNpdmVQcm9wcy9ncmlkSXRlbU1peGluc1wiO1xuaW1wb3J0IGRldk1peGlucyBmcm9tIFwiLi4vbWl4aW5zL3Jlc3BvbnNpdmVQcm9wcy9kZXZNaXhpbnNcIjtcblxuY29uc3QgR3JpZCA9IHN0eWxlZC5kaXZgXG4gICR7ZGV2TWl4aW5zfVxuICAke2dyaWRNaXhpbnN9XG5gO1xuXG5jb25zdCBJdGVtID0gc3R5bGVkLmRpdmBcbiAgJHtkZXZNaXhpbnN9XG4gICR7Z3JpZEl0ZW1NaXhpbnN9XG5gO1xuXG5HcmlkLkl0ZW0gPSBJdGVtO1xuZXhwb3J0IGRlZmF1bHQgR3JpZDtcbiJdfQ== */"));
var Item = /*#__PURE__*/_styled("div", process.env.NODE_ENV === "production" ? {
  target: "e4c7wjj0"
} : {
  target: "e4c7wjj0",
  label: "Item"
})(devMixins, " ", gridItemMixins, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkdyaWQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBVXVCIiwiZmlsZSI6IkdyaWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc3R5bGVkIGZyb20gXCJAZW1vdGlvbi9zdHlsZWRcIjtcbmltcG9ydCBncmlkTWl4aW5zIGZyb20gXCIuLi9taXhpbnMvcmVzcG9uc2l2ZVByb3BzL2dyaWRNaXhpbnNcIjtcbmltcG9ydCBncmlkSXRlbU1peGlucyBmcm9tIFwiLi4vbWl4aW5zL3Jlc3BvbnNpdmVQcm9wcy9ncmlkSXRlbU1peGluc1wiO1xuaW1wb3J0IGRldk1peGlucyBmcm9tIFwiLi4vbWl4aW5zL3Jlc3BvbnNpdmVQcm9wcy9kZXZNaXhpbnNcIjtcblxuY29uc3QgR3JpZCA9IHN0eWxlZC5kaXZgXG4gICR7ZGV2TWl4aW5zfVxuICAke2dyaWRNaXhpbnN9XG5gO1xuXG5jb25zdCBJdGVtID0gc3R5bGVkLmRpdmBcbiAgJHtkZXZNaXhpbnN9XG4gICR7Z3JpZEl0ZW1NaXhpbnN9XG5gO1xuXG5HcmlkLkl0ZW0gPSBJdGVtO1xuZXhwb3J0IGRlZmF1bHQgR3JpZDtcbiJdfQ== */"));
Grid.Item = Item;

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

var Section = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _theme$section;
  var _useResponsive = useResponsive(),
    breakpointIndex = _useResponsive.breakpointIndex;
  var theme = useTheme(ThemeContext);
  var xPadArr = arrayifyProp((theme === null || theme === void 0 ? void 0 : (_theme$section = theme.section) === null || _theme$section === void 0 ? void 0 : _theme$section.xPadding) || 0);
  return jsx(SectionStyled, {
    ref: ref,
    xPad: xPadArr[breakpointIndex]
  }, props.children);
});
var SectionStyled = /*#__PURE__*/_styled("section", process.env.NODE_ENV === "production" ? {
  target: "e1ple2mq0"
} : {
  target: "e1ple2mq0",
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
}, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNlY3Rpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBdUJvQyIsImZpbGUiOiJTZWN0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHN0eWxlZCBmcm9tIFwiQGVtb3Rpb24vc3R5bGVkXCI7XG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyB1c2VSZXNwb25zaXZlIH0gZnJvbSBcIi4uL2hvb2tzL3VzZVJlc3BvbnNpdmVcIjtcbmltcG9ydCB7IFRoZW1lQ29udGV4dCwgdXNlVGhlbWUgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IGFycmF5aWZ5UHJvcCB9IGZyb20gXCIuLi91dGlscy9hcnJheWlmeVByb3BcIjtcblxuLy8gcmVxdWlyZXMgdGhlbWUgd2l0aCBicCBhbmQgc2VjdGlvblxuXG5jb25zdCBTZWN0aW9uID0gUmVhY3QuZm9yd2FyZFJlZigocHJvcHMsIHJlZikgPT4ge1xuICBjb25zdCB7IGJyZWFrcG9pbnRJbmRleCB9ID0gdXNlUmVzcG9uc2l2ZSgpO1xuICBjb25zdCB0aGVtZSA9IHVzZVRoZW1lKFRoZW1lQ29udGV4dCk7XG5cbiAgY29uc3QgeFBhZEFyciA9IGFycmF5aWZ5UHJvcCh0aGVtZT8uc2VjdGlvbj8ueFBhZGRpbmcgfHwgMCk7XG5cbiAgcmV0dXJuIChcbiAgICA8U2VjdGlvblN0eWxlZCByZWY9e3JlZn0geFBhZD17eFBhZEFyclticmVha3BvaW50SW5kZXhdfT5cbiAgICAgIHtwcm9wcy5jaGlsZHJlbn1cbiAgICA8L1NlY3Rpb25TdHlsZWQ+XG4gICk7XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgU2VjdGlvbjtcblxuY29uc3QgU2VjdGlvblN0eWxlZCA9IHN0eWxlZC5zZWN0aW9uYFxuICBtYXJnaW46IDAgYXV0bztcbiAgbWF4LXdpZHRoOiAkeyh7IHRoZW1lLCB4UGFkIH0pID0+XG4gICAgYGNhbGMoJHt0aGVtZT8uc2VjdGlvbj8ubWF4V2lkdGh9ICsgJHt4UGFkfSArICR7eFBhZH0pYH07XG4gIHBhZGRpbmc6ICR7KHsgeFBhZCB9KSA9PiBgMCAke3hQYWR9YH07XG5cbiAgYmFja2dyb3VuZC1jb2xvcjogJHsocHJvcHMpID0+IHByb3BzLnRoZW1lPy5wYWxldHRlLmJhY2tncm91bmR9O1xuICBjb2xvcjogJHsocHJvcHMpID0+IHByb3BzLnRoZW1lPy50ZXh0LnByaW1hcnl9O1xuYDtcbiJdfQ== */"));

export { Grid, Section, ThemeProvider, defaultTheme, mq, useResponsive, useSSRLayoutEffect };
