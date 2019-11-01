"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSelector = exports.memoize = exports.combineReducers = exports.createStoreProvider = exports.compose = exports.applyMiddleware = exports.createStore = void 0;

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var StoreContext = (0, _react.createContext)();

var createStore = function createStore(reducer, initialState, enhancer) {
  var listeners = [];

  var wrapReducer = function wrapReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments.length > 1 ? arguments[1] : undefined;
    return reducer(state, action);
  };

  var createStore = function createStore(reducer, notUsed, enhancer) {
    if (typeof enhancer === 'function') {
      return enhancer(createStore)(reducer);
    }

    var value = reducer(undefined, {
      type: "@@redux/INIT ".concat(new Date().getTime())
    });

    var setValue = function setValue(newValue) {
      if (value === newValue) {
        return;
      }

      value = newValue;
      listeners.forEach(function (listener) {
        return listener(value);
      });
    };

    var s = {
      getState: function getState() {
        return value;
      },
      subscribe: function subscribe(listener) {
        listeners.push(listener);
        return function () {
          return listeners = listeners.filter(function (l) {
            return l !== listener;
          });
        };
      },
      dispatch: function dispatch(action) {
        var newState = reducer(s.getState(), action);
        setValue(newState);
      }
    };
    return s;
  };

  var store = createStore(wrapReducer, undefined, enhancer);
  return {
    useDispatch: function useDispatch() {
      return store.dispatch;
    },
    store: store,
    useSelector: function useSelector(selector) {
      var state = (0, _react.useContext)(StoreContext);
      return selector(state);
    }
  };
};

exports.createStore = createStore;

var applyMiddleware = function applyMiddleware() {
  for (var _len = arguments.length, functions = new Array(_len), _key = 0; _key < _len; _key++) {
    functions[_key] = arguments[_key];
  }

  return function (createStore) {
    return function (reducer, notUsed, enhancer) {
      var store = createStore(reducer, undefined, enhancer);
      var dispatch = compose.apply(void 0, _toConsumableArray(functions.map(function (fn) {
        return fn(store);
      })))(store.dispatch);
      return _objectSpread({}, store, {
        dispatch: dispatch
      });
    };
  };
};

exports.applyMiddleware = applyMiddleware;

var compose = function compose() {
  for (var _len2 = arguments.length, functions = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    functions[_key2] = arguments[_key2];
  }

  return functions //take out non functions
  .filter(function (e) {
    return typeof e === 'function';
  }).reduce(function (result, fn) {
    return function () {
      return result(fn.apply(void 0, arguments));
    };
  });
};

exports.compose = compose;

var createStoreProvider = function createStoreProvider(store) {
  return function (_ref) {
    var children = _ref.children;

    var _useState = (0, _react.useState)(store.getState()),
        _useState2 = _slicedToArray(_useState, 2),
        state = _useState2[0],
        setState = _useState2[1];

    (0, _react.useEffect)(function () {
      var remove = store.subscribe(function () {
        var lastState = store.getState();
        Promise.resolve().then(function () {
          if (lastState === store.getState()) {
            setState(store.getState());
          }
        });
      });
      return function () {
        return remove();
      };
    }, []);
    return _react["default"].createElement(StoreContext.Provider, {
      value: state
    }, children);
  };
}; //@todo: document combineReducers and test it (only rough idea of how it should work)
//  https://redux.js.org/api/combinereducers#combinereducersreducers


exports.createStoreProvider = createStoreProvider;

var combineReducers = function combineReducers(reducers) {
  return function combinedReducers(state, action) {
    return _objectSpread({}, state, {}, Object.entries(reducers).reduce(function (result, _ref2) {
      var _ref3 = _slicedToArray(_ref2, 2),
          key = _ref3[0],
          reducer = _ref3[1];

      return _objectSpread({}, result, _defineProperty({}, key, reducer(state, action)));
    }, {}));
  };
}; //@todo: document and test memoize


exports.combineReducers = combineReducers;

var memoize = function memoize(fn) {
  var lastResult,
      lastArguments = [{}];
  return function () {
    for (var _len3 = arguments.length, currentArgs = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      currentArgs[_key3] = arguments[_key3];
    }

    var sameArgs = currentArgs.length === lastArguments.length && lastArguments.reduce(function (result, lastArg, index) {
      return result && Object.is(lastArg, currentArgs[index]);
    }, true);

    if (sameArgs) {
      return lastResult;
    }

    lastResult = fn.apply(null, currentArgs);
    lastArguments = currentArgs;
    return lastResult;
  };
}; //@todo: document and test createSelector


exports.memoize = memoize;

var createSelector = function createSelector() {
  for (var _len4 = arguments.length, functions = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    functions[_key4] = arguments[_key4];
  }

  var lastFunction = memoize(functions.pop());
  return function () {
    for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      args[_key5] = arguments[_key5];
    }

    var argsForLastFunction = functions.map(function (fn) {
      return fn.apply(null, args);
    });
    return lastFunction.apply(null, argsForLastFunction);
  };
};

exports.createSelector = createSelector;
