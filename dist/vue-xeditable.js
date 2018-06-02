(function (axios) {
  'use strict';

  axios = axios && axios.hasOwnProperty('default') ? axios['default'] : axios;

  /**
   * A specialized version of `_.forEach` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns `array`.
   */
  function arrayEach(array, iteratee) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
      if (iteratee(array[index], index, array) === false) {
        break;
      }
    }
    return array;
  }

  var _arrayEach = arrayEach;

  var _arrayEach$1 = /*#__PURE__*/Object.freeze({
    default: _arrayEach,
    __moduleExports: _arrayEach
  });

  /**
   * Creates a base function for methods like `_.forIn` and `_.forOwn`.
   *
   * @private
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {Function} Returns the new base function.
   */
  function createBaseFor(fromRight) {
    return function(object, iteratee, keysFunc) {
      var index = -1,
          iterable = Object(object),
          props = keysFunc(object),
          length = props.length;

      while (length--) {
        var key = props[fromRight ? length : ++index];
        if (iteratee(iterable[key], key, iterable) === false) {
          break;
        }
      }
      return object;
    };
  }

  var _createBaseFor = createBaseFor;

  var _createBaseFor$1 = /*#__PURE__*/Object.freeze({
    default: _createBaseFor,
    __moduleExports: _createBaseFor
  });

  var require$$0 = ( _createBaseFor$1 && _createBaseFor ) || _createBaseFor$1;

  var createBaseFor$1 = require$$0;

  /**
   * The base implementation of `baseForOwn` which iterates over `object`
   * properties returned by `keysFunc` and invokes `iteratee` for each property.
   * Iteratee functions may exit iteration early by explicitly returning `false`.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {Function} keysFunc The function to get the keys of `object`.
   * @returns {Object} Returns `object`.
   */
  var baseFor = createBaseFor$1();

  var _baseFor = baseFor;

  var _baseFor$1 = /*#__PURE__*/Object.freeze({
    default: _baseFor,
    __moduleExports: _baseFor
  });

  /**
   * The base implementation of `_.times` without support for iteratee shorthands
   * or max array length checks.
   *
   * @private
   * @param {number} n The number of times to invoke `iteratee`.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the array of results.
   */
  function baseTimes(n, iteratee) {
    var index = -1,
        result = Array(n);

    while (++index < n) {
      result[index] = iteratee(index);
    }
    return result;
  }

  var _baseTimes = baseTimes;

  var _baseTimes$1 = /*#__PURE__*/Object.freeze({
    default: _baseTimes,
    __moduleExports: _baseTimes
  });

  var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  /** Detect free variable `global` from Node.js. */
  var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

  var _freeGlobal = freeGlobal;

  var _freeGlobal$1 = /*#__PURE__*/Object.freeze({
    default: _freeGlobal,
    __moduleExports: _freeGlobal
  });

  var require$$0$1 = ( _freeGlobal$1 && _freeGlobal ) || _freeGlobal$1;

  var freeGlobal$1 = require$$0$1;

  /** Detect free variable `self`. */
  var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

  /** Used as a reference to the global object. */
  var root = freeGlobal$1 || freeSelf || Function('return this')();

  var _root = root;

  var _root$1 = /*#__PURE__*/Object.freeze({
    default: _root,
    __moduleExports: _root
  });

  var require$$0$2 = ( _root$1 && _root ) || _root$1;

  var root$1 = require$$0$2;

  /** Built-in value references. */
  var Symbol = root$1.Symbol;

  var _Symbol = Symbol;

  var _Symbol$1 = /*#__PURE__*/Object.freeze({
    default: _Symbol,
    __moduleExports: _Symbol
  });

  var require$$0$3 = ( _Symbol$1 && _Symbol ) || _Symbol$1;

  var Symbol$1 = require$$0$3;

  /** Used for built-in method references. */
  var objectProto = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty = objectProto.hasOwnProperty;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString = objectProto.toString;

  /** Built-in value references. */
  var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : undefined;

  /**
   * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the raw `toStringTag`.
   */
  function getRawTag(value) {
    var isOwn = hasOwnProperty.call(value, symToStringTag),
        tag = value[symToStringTag];

    try {
      value[symToStringTag] = undefined;
    } catch (e) {}

    var result = nativeObjectToString.call(value);
    {
      if (isOwn) {
        value[symToStringTag] = tag;
      } else {
        delete value[symToStringTag];
      }
    }
    return result;
  }

  var _getRawTag = getRawTag;

  var _getRawTag$1 = /*#__PURE__*/Object.freeze({
    default: _getRawTag,
    __moduleExports: _getRawTag
  });

  /** Used for built-in method references. */
  var objectProto$1 = Object.prototype;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString$1 = objectProto$1.toString;

  /**
   * Converts `value` to a string using `Object.prototype.toString`.
   *
   * @private
   * @param {*} value The value to convert.
   * @returns {string} Returns the converted string.
   */
  function objectToString(value) {
    return nativeObjectToString$1.call(value);
  }

  var _objectToString = objectToString;

  var _objectToString$1 = /*#__PURE__*/Object.freeze({
    default: _objectToString,
    __moduleExports: _objectToString
  });

  var require$$1 = ( _getRawTag$1 && _getRawTag ) || _getRawTag$1;

  var require$$2 = ( _objectToString$1 && _objectToString ) || _objectToString$1;

  var Symbol$2 = require$$0$3,
      getRawTag$1 = require$$1,
      objectToString$1 = require$$2;

  /** `Object#toString` result references. */
  var nullTag = '[object Null]',
      undefinedTag = '[object Undefined]';

  /** Built-in value references. */
  var symToStringTag$1 = Symbol$2 ? Symbol$2.toStringTag : undefined;

  /**
   * The base implementation of `getTag` without fallbacks for buggy environments.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */
  function baseGetTag(value) {
    if (value == null) {
      return value === undefined ? undefinedTag : nullTag;
    }
    return (symToStringTag$1 && symToStringTag$1 in Object(value))
      ? getRawTag$1(value)
      : objectToString$1(value);
  }

  var _baseGetTag = baseGetTag;

  var _baseGetTag$1 = /*#__PURE__*/Object.freeze({
    default: _baseGetTag,
    __moduleExports: _baseGetTag
  });

  /**
   * Checks if `value` is object-like. A value is object-like if it's not `null`
   * and has a `typeof` result of "object".
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
   * @example
   *
   * _.isObjectLike({});
   * // => true
   *
   * _.isObjectLike([1, 2, 3]);
   * // => true
   *
   * _.isObjectLike(_.noop);
   * // => false
   *
   * _.isObjectLike(null);
   * // => false
   */
  function isObjectLike(value) {
    return value != null && typeof value == 'object';
  }

  var isObjectLike_1 = isObjectLike;

  var isObjectLike$1 = /*#__PURE__*/Object.freeze({
    default: isObjectLike_1,
    __moduleExports: isObjectLike_1
  });

  var require$$0$4 = ( _baseGetTag$1 && _baseGetTag ) || _baseGetTag$1;

  var require$$2$1 = ( isObjectLike$1 && isObjectLike_1 ) || isObjectLike$1;

  var baseGetTag$1 = require$$0$4,
      isObjectLike$2 = require$$2$1;

  /** `Object#toString` result references. */
  var argsTag = '[object Arguments]';

  /**
   * The base implementation of `_.isArguments`.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an `arguments` object,
   */
  function baseIsArguments(value) {
    return isObjectLike$2(value) && baseGetTag$1(value) == argsTag;
  }

  var _baseIsArguments = baseIsArguments;

  var _baseIsArguments$1 = /*#__PURE__*/Object.freeze({
    default: _baseIsArguments,
    __moduleExports: _baseIsArguments
  });

  var require$$0$5 = ( _baseIsArguments$1 && _baseIsArguments ) || _baseIsArguments$1;

  var baseIsArguments$1 = require$$0$5,
      isObjectLike$3 = require$$2$1;

  /** Used for built-in method references. */
  var objectProto$2 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$1 = objectProto$2.hasOwnProperty;

  /** Built-in value references. */
  var propertyIsEnumerable = objectProto$2.propertyIsEnumerable;

  /**
   * Checks if `value` is likely an `arguments` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an `arguments` object,
   *  else `false`.
   * @example
   *
   * _.isArguments(function() { return arguments; }());
   * // => true
   *
   * _.isArguments([1, 2, 3]);
   * // => false
   */
  var isArguments = baseIsArguments$1(function() { return arguments; }()) ? baseIsArguments$1 : function(value) {
    return isObjectLike$3(value) && hasOwnProperty$1.call(value, 'callee') &&
      !propertyIsEnumerable.call(value, 'callee');
  };

  var isArguments_1 = isArguments;

  var isArguments$1 = /*#__PURE__*/Object.freeze({
    default: isArguments_1,
    __moduleExports: isArguments_1
  });

  /**
   * Checks if `value` is classified as an `Array` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an array, else `false`.
   * @example
   *
   * _.isArray([1, 2, 3]);
   * // => true
   *
   * _.isArray(document.body.children);
   * // => false
   *
   * _.isArray('abc');
   * // => false
   *
   * _.isArray(_.noop);
   * // => false
   */
  var isArray = Array.isArray;

  var isArray_1 = isArray;

  var isArray$1 = /*#__PURE__*/Object.freeze({
    default: isArray_1,
    __moduleExports: isArray_1
  });

  /**
   * This method returns `false`.
   *
   * @static
   * @memberOf _
   * @since 4.13.0
   * @category Util
   * @returns {boolean} Returns `false`.
   * @example
   *
   * _.times(2, _.stubFalse);
   * // => [false, false]
   */
  function stubFalse() {
    return false;
  }

  var stubFalse_1 = stubFalse;

  var stubFalse$1 = /*#__PURE__*/Object.freeze({
    default: stubFalse_1,
    __moduleExports: stubFalse_1
  });

  var require$$1$1 = ( stubFalse$1 && stubFalse_1 ) || stubFalse$1;

  var isBuffer_1 = createCommonjsModule(function (module, exports) {
  var root = require$$0$2,
      stubFalse = require$$1$1;

  /** Detect free variable `exports`. */
  var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports;

  /** Built-in value references. */
  var Buffer = moduleExports ? root.Buffer : undefined;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

  /**
   * Checks if `value` is a buffer.
   *
   * @static
   * @memberOf _
   * @since 4.3.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
   * @example
   *
   * _.isBuffer(new Buffer(2));
   * // => true
   *
   * _.isBuffer(new Uint8Array(2));
   * // => false
   */
  var isBuffer = nativeIsBuffer || stubFalse;

  module.exports = isBuffer;
  });

  var isBuffer = /*#__PURE__*/Object.freeze({
    default: isBuffer_1,
    __moduleExports: isBuffer_1
  });

  /** Used as references for various `Number` constants. */
  var MAX_SAFE_INTEGER = 9007199254740991;

  /** Used to detect unsigned integer values. */
  var reIsUint = /^(?:0|[1-9]\d*)$/;

  /**
   * Checks if `value` is a valid array-like index.
   *
   * @private
   * @param {*} value The value to check.
   * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
   * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
   */
  function isIndex(value, length) {
    length = length == null ? MAX_SAFE_INTEGER : length;
    return !!length &&
      (typeof value == 'number' || reIsUint.test(value)) &&
      (value > -1 && value % 1 == 0 && value < length);
  }

  var _isIndex = isIndex;

  var _isIndex$1 = /*#__PURE__*/Object.freeze({
    default: _isIndex,
    __moduleExports: _isIndex
  });

  /** Used as references for various `Number` constants. */
  var MAX_SAFE_INTEGER$1 = 9007199254740991;

  /**
   * Checks if `value` is a valid array-like length.
   *
   * **Note:** This method is loosely based on
   * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
   * @example
   *
   * _.isLength(3);
   * // => true
   *
   * _.isLength(Number.MIN_VALUE);
   * // => false
   *
   * _.isLength(Infinity);
   * // => false
   *
   * _.isLength('3');
   * // => false
   */
  function isLength(value) {
    return typeof value == 'number' &&
      value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER$1;
  }

  var isLength_1 = isLength;

  var isLength$1 = /*#__PURE__*/Object.freeze({
    default: isLength_1,
    __moduleExports: isLength_1
  });

  var require$$1$2 = ( isLength$1 && isLength_1 ) || isLength$1;

  var baseGetTag$2 = require$$0$4,
      isLength$2 = require$$1$2,
      isObjectLike$4 = require$$2$1;

  /** `Object#toString` result references. */
  var argsTag$1 = '[object Arguments]',
      arrayTag = '[object Array]',
      boolTag = '[object Boolean]',
      dateTag = '[object Date]',
      errorTag = '[object Error]',
      funcTag = '[object Function]',
      mapTag = '[object Map]',
      numberTag = '[object Number]',
      objectTag = '[object Object]',
      regexpTag = '[object RegExp]',
      setTag = '[object Set]',
      stringTag = '[object String]',
      weakMapTag = '[object WeakMap]';

  var arrayBufferTag = '[object ArrayBuffer]',
      dataViewTag = '[object DataView]',
      float32Tag = '[object Float32Array]',
      float64Tag = '[object Float64Array]',
      int8Tag = '[object Int8Array]',
      int16Tag = '[object Int16Array]',
      int32Tag = '[object Int32Array]',
      uint8Tag = '[object Uint8Array]',
      uint8ClampedTag = '[object Uint8ClampedArray]',
      uint16Tag = '[object Uint16Array]',
      uint32Tag = '[object Uint32Array]';

  /** Used to identify `toStringTag` values of typed arrays. */
  var typedArrayTags = {};
  typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
  typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
  typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
  typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
  typedArrayTags[uint32Tag] = true;
  typedArrayTags[argsTag$1] = typedArrayTags[arrayTag] =
  typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
  typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
  typedArrayTags[errorTag] = typedArrayTags[funcTag] =
  typedArrayTags[mapTag] = typedArrayTags[numberTag] =
  typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
  typedArrayTags[setTag] = typedArrayTags[stringTag] =
  typedArrayTags[weakMapTag] = false;

  /**
   * The base implementation of `_.isTypedArray` without Node.js optimizations.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
   */
  function baseIsTypedArray(value) {
    return isObjectLike$4(value) &&
      isLength$2(value.length) && !!typedArrayTags[baseGetTag$2(value)];
  }

  var _baseIsTypedArray = baseIsTypedArray;

  var _baseIsTypedArray$1 = /*#__PURE__*/Object.freeze({
    default: _baseIsTypedArray,
    __moduleExports: _baseIsTypedArray
  });

  /**
   * The base implementation of `_.unary` without support for storing metadata.
   *
   * @private
   * @param {Function} func The function to cap arguments for.
   * @returns {Function} Returns the new capped function.
   */
  function baseUnary(func) {
    return function(value) {
      return func(value);
    };
  }

  var _baseUnary = baseUnary;

  var _baseUnary$1 = /*#__PURE__*/Object.freeze({
    default: _baseUnary,
    __moduleExports: _baseUnary
  });

  var _nodeUtil = createCommonjsModule(function (module, exports) {
  var freeGlobal = require$$0$1;

  /** Detect free variable `exports`. */
  var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports;

  /** Detect free variable `process` from Node.js. */
  var freeProcess = moduleExports && freeGlobal.process;

  /** Used to access faster Node.js helpers. */
  var nodeUtil = (function() {
    try {
      return freeProcess && freeProcess.binding && freeProcess.binding('util');
    } catch (e) {}
  }());

  module.exports = nodeUtil;
  });

  var _nodeUtil$1 = /*#__PURE__*/Object.freeze({
    default: _nodeUtil,
    __moduleExports: _nodeUtil
  });

  var require$$0$6 = ( _baseIsTypedArray$1 && _baseIsTypedArray ) || _baseIsTypedArray$1;

  var require$$1$3 = ( _baseUnary$1 && _baseUnary ) || _baseUnary$1;

  var require$$2$2 = ( _nodeUtil$1 && _nodeUtil ) || _nodeUtil$1;

  var baseIsTypedArray$1 = require$$0$6,
      baseUnary$1 = require$$1$3,
      nodeUtil = require$$2$2;

  /* Node.js helper references. */
  var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

  /**
   * Checks if `value` is classified as a typed array.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
   * @example
   *
   * _.isTypedArray(new Uint8Array);
   * // => true
   *
   * _.isTypedArray([]);
   * // => false
   */
  var isTypedArray = nodeIsTypedArray ? baseUnary$1(nodeIsTypedArray) : baseIsTypedArray$1;

  var isTypedArray_1 = isTypedArray;

  var isTypedArray$1 = /*#__PURE__*/Object.freeze({
    default: isTypedArray_1,
    __moduleExports: isTypedArray_1
  });

  var require$$0$7 = ( _baseTimes$1 && _baseTimes ) || _baseTimes$1;

  var require$$1$4 = ( isArguments$1 && isArguments_1 ) || isArguments$1;

  var require$$2$3 = ( isArray$1 && isArray_1 ) || isArray$1;

  var require$$3 = ( isBuffer && isBuffer_1 ) || isBuffer;

  var require$$4 = ( _isIndex$1 && _isIndex ) || _isIndex$1;

  var require$$5 = ( isTypedArray$1 && isTypedArray_1 ) || isTypedArray$1;

  var baseTimes$1 = require$$0$7,
      isArguments$2 = require$$1$4,
      isArray$2 = require$$2$3,
      isBuffer$1 = require$$3,
      isIndex$1 = require$$4,
      isTypedArray$2 = require$$5;

  /** Used for built-in method references. */
  var objectProto$3 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$2 = objectProto$3.hasOwnProperty;

  /**
   * Creates an array of the enumerable property names of the array-like `value`.
   *
   * @private
   * @param {*} value The value to query.
   * @param {boolean} inherited Specify returning inherited property names.
   * @returns {Array} Returns the array of property names.
   */
  function arrayLikeKeys(value, inherited) {
    var isArr = isArray$2(value),
        isArg = !isArr && isArguments$2(value),
        isBuff = !isArr && !isArg && isBuffer$1(value),
        isType = !isArr && !isArg && !isBuff && isTypedArray$2(value),
        skipIndexes = isArr || isArg || isBuff || isType,
        result = skipIndexes ? baseTimes$1(value.length, String) : [],
        length = result.length;

    for (var key in value) {
      if ((inherited || hasOwnProperty$2.call(value, key)) &&
          !(skipIndexes && (
             // Safari 9 has enumerable `arguments.length` in strict mode.
             key == 'length' ||
             // Node.js 0.10 has enumerable non-index properties on buffers.
             (isBuff && (key == 'offset' || key == 'parent')) ||
             // PhantomJS 2 has enumerable non-index properties on typed arrays.
             (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
             // Skip index properties.
             isIndex$1(key, length)
          ))) {
        result.push(key);
      }
    }
    return result;
  }

  var _arrayLikeKeys = arrayLikeKeys;

  var _arrayLikeKeys$1 = /*#__PURE__*/Object.freeze({
    default: _arrayLikeKeys,
    __moduleExports: _arrayLikeKeys
  });

  /** Used for built-in method references. */
  var objectProto$4 = Object.prototype;

  /**
   * Checks if `value` is likely a prototype object.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
   */
  function isPrototype(value) {
    var Ctor = value && value.constructor,
        proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$4;

    return value === proto;
  }

  var _isPrototype = isPrototype;

  var _isPrototype$1 = /*#__PURE__*/Object.freeze({
    default: _isPrototype,
    __moduleExports: _isPrototype
  });

  /**
   * Creates a unary function that invokes `func` with its argument transformed.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {Function} transform The argument transform.
   * @returns {Function} Returns the new function.
   */
  function overArg(func, transform) {
    return function(arg) {
      return func(transform(arg));
    };
  }

  var _overArg = overArg;

  var _overArg$1 = /*#__PURE__*/Object.freeze({
    default: _overArg,
    __moduleExports: _overArg
  });

  var require$$0$8 = ( _overArg$1 && _overArg ) || _overArg$1;

  var overArg$1 = require$$0$8;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeKeys = overArg$1(Object.keys, Object);

  var _nativeKeys = nativeKeys;

  var _nativeKeys$1 = /*#__PURE__*/Object.freeze({
    default: _nativeKeys,
    __moduleExports: _nativeKeys
  });

  var require$$0$9 = ( _isPrototype$1 && _isPrototype ) || _isPrototype$1;

  var require$$1$5 = ( _nativeKeys$1 && _nativeKeys ) || _nativeKeys$1;

  var isPrototype$1 = require$$0$9,
      nativeKeys$1 = require$$1$5;

  /** Used for built-in method references. */
  var objectProto$5 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$3 = objectProto$5.hasOwnProperty;

  /**
   * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */
  function baseKeys(object) {
    if (!isPrototype$1(object)) {
      return nativeKeys$1(object);
    }
    var result = [];
    for (var key in Object(object)) {
      if (hasOwnProperty$3.call(object, key) && key != 'constructor') {
        result.push(key);
      }
    }
    return result;
  }

  var _baseKeys = baseKeys;

  var _baseKeys$1 = /*#__PURE__*/Object.freeze({
    default: _baseKeys,
    __moduleExports: _baseKeys
  });

  /**
   * Checks if `value` is the
   * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
   * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an object, else `false`.
   * @example
   *
   * _.isObject({});
   * // => true
   *
   * _.isObject([1, 2, 3]);
   * // => true
   *
   * _.isObject(_.noop);
   * // => true
   *
   * _.isObject(null);
   * // => false
   */
  function isObject(value) {
    var type = typeof value;
    return value != null && (type == 'object' || type == 'function');
  }

  var isObject_1 = isObject;

  var isObject$1 = /*#__PURE__*/Object.freeze({
    default: isObject_1,
    __moduleExports: isObject_1
  });

  var require$$1$6 = ( isObject$1 && isObject_1 ) || isObject$1;

  var baseGetTag$3 = require$$0$4,
      isObject$2 = require$$1$6;

  /** `Object#toString` result references. */
  var asyncTag = '[object AsyncFunction]',
      funcTag$1 = '[object Function]',
      genTag = '[object GeneratorFunction]',
      proxyTag = '[object Proxy]';

  /**
   * Checks if `value` is classified as a `Function` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a function, else `false`.
   * @example
   *
   * _.isFunction(_);
   * // => true
   *
   * _.isFunction(/abc/);
   * // => false
   */
  function isFunction(value) {
    if (!isObject$2(value)) {
      return false;
    }
    // The use of `Object#toString` avoids issues with the `typeof` operator
    // in Safari 9 which returns 'object' for typed arrays and other constructors.
    var tag = baseGetTag$3(value);
    return tag == funcTag$1 || tag == genTag || tag == asyncTag || tag == proxyTag;
  }

  var isFunction_1 = isFunction;

  var isFunction$1 = /*#__PURE__*/Object.freeze({
    default: isFunction_1,
    __moduleExports: isFunction_1
  });

  var require$$0$a = ( isFunction$1 && isFunction_1 ) || isFunction$1;

  var isFunction$2 = require$$0$a,
      isLength$3 = require$$1$2;

  /**
   * Checks if `value` is array-like. A value is considered array-like if it's
   * not a function and has a `value.length` that's an integer greater than or
   * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
   * @example
   *
   * _.isArrayLike([1, 2, 3]);
   * // => true
   *
   * _.isArrayLike(document.body.children);
   * // => true
   *
   * _.isArrayLike('abc');
   * // => true
   *
   * _.isArrayLike(_.noop);
   * // => false
   */
  function isArrayLike(value) {
    return value != null && isLength$3(value.length) && !isFunction$2(value);
  }

  var isArrayLike_1 = isArrayLike;

  var isArrayLike$1 = /*#__PURE__*/Object.freeze({
    default: isArrayLike_1,
    __moduleExports: isArrayLike_1
  });

  var require$$0$b = ( _arrayLikeKeys$1 && _arrayLikeKeys ) || _arrayLikeKeys$1;

  var require$$1$7 = ( _baseKeys$1 && _baseKeys ) || _baseKeys$1;

  var require$$2$4 = ( isArrayLike$1 && isArrayLike_1 ) || isArrayLike$1;

  var arrayLikeKeys$1 = require$$0$b,
      baseKeys$1 = require$$1$7,
      isArrayLike$2 = require$$2$4;

  /**
   * Creates an array of the own enumerable property names of `object`.
   *
   * **Note:** Non-object values are coerced to objects. See the
   * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
   * for more details.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Object
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.keys(new Foo);
   * // => ['a', 'b'] (iteration order is not guaranteed)
   *
   * _.keys('hi');
   * // => ['0', '1']
   */
  function keys(object) {
    return isArrayLike$2(object) ? arrayLikeKeys$1(object) : baseKeys$1(object);
  }

  var keys_1 = keys;

  var keys$1 = /*#__PURE__*/Object.freeze({
    default: keys_1,
    __moduleExports: keys_1
  });

  var require$$0$c = ( _baseFor$1 && _baseFor ) || _baseFor$1;

  var require$$1$8 = ( keys$1 && keys_1 ) || keys$1;

  var baseFor$1 = require$$0$c,
      keys$2 = require$$1$8;

  /**
   * The base implementation of `_.forOwn` without support for iteratee shorthands.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Object} Returns `object`.
   */
  function baseForOwn(object, iteratee) {
    return object && baseFor$1(object, iteratee, keys$2);
  }

  var _baseForOwn = baseForOwn;

  var _baseForOwn$1 = /*#__PURE__*/Object.freeze({
    default: _baseForOwn,
    __moduleExports: _baseForOwn
  });

  var isArrayLike$3 = require$$2$4;

  /**
   * Creates a `baseEach` or `baseEachRight` function.
   *
   * @private
   * @param {Function} eachFunc The function to iterate over a collection.
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {Function} Returns the new base function.
   */
  function createBaseEach(eachFunc, fromRight) {
    return function(collection, iteratee) {
      if (collection == null) {
        return collection;
      }
      if (!isArrayLike$3(collection)) {
        return eachFunc(collection, iteratee);
      }
      var length = collection.length,
          index = fromRight ? length : -1,
          iterable = Object(collection);

      while ((fromRight ? index-- : ++index < length)) {
        if (iteratee(iterable[index], index, iterable) === false) {
          break;
        }
      }
      return collection;
    };
  }

  var _createBaseEach = createBaseEach;

  var _createBaseEach$1 = /*#__PURE__*/Object.freeze({
    default: _createBaseEach,
    __moduleExports: _createBaseEach
  });

  var require$$0$d = ( _baseForOwn$1 && _baseForOwn ) || _baseForOwn$1;

  var require$$1$9 = ( _createBaseEach$1 && _createBaseEach ) || _createBaseEach$1;

  var baseForOwn$1 = require$$0$d,
      createBaseEach$1 = require$$1$9;

  /**
   * The base implementation of `_.forEach` without support for iteratee shorthands.
   *
   * @private
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array|Object} Returns `collection`.
   */
  var baseEach = createBaseEach$1(baseForOwn$1);

  var _baseEach = baseEach;

  var _baseEach$1 = /*#__PURE__*/Object.freeze({
    default: _baseEach,
    __moduleExports: _baseEach
  });

  /**
   * This method returns the first argument it receives.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Util
   * @param {*} value Any value.
   * @returns {*} Returns `value`.
   * @example
   *
   * var object = { 'a': 1 };
   *
   * console.log(_.identity(object) === object);
   * // => true
   */
  function identity(value) {
    return value;
  }

  var identity_1 = identity;

  var identity$1 = /*#__PURE__*/Object.freeze({
    default: identity_1,
    __moduleExports: identity_1
  });

  var require$$0$e = ( identity$1 && identity_1 ) || identity$1;

  var identity$2 = require$$0$e;

  /**
   * Casts `value` to `identity` if it's not a function.
   *
   * @private
   * @param {*} value The value to inspect.
   * @returns {Function} Returns cast function.
   */
  function castFunction(value) {
    return typeof value == 'function' ? value : identity$2;
  }

  var _castFunction = castFunction;

  var _castFunction$1 = /*#__PURE__*/Object.freeze({
    default: _castFunction,
    __moduleExports: _castFunction
  });

  var require$$0$f = ( _arrayEach$1 && _arrayEach ) || _arrayEach$1;

  var require$$1$a = ( _baseEach$1 && _baseEach ) || _baseEach$1;

  var require$$2$5 = ( _castFunction$1 && _castFunction ) || _castFunction$1;

  var arrayEach$1 = require$$0$f,
      baseEach$1 = require$$1$a,
      castFunction$1 = require$$2$5,
      isArray$3 = require$$2$3;

  /**
   * Iterates over elements of `collection` and invokes `iteratee` for each element.
   * The iteratee is invoked with three arguments: (value, index|key, collection).
   * Iteratee functions may exit iteration early by explicitly returning `false`.
   *
   * **Note:** As with other "Collections" methods, objects with a "length"
   * property are iterated like arrays. To avoid this behavior use `_.forIn`
   * or `_.forOwn` for object iteration.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @alias each
   * @category Collection
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} [iteratee=_.identity] The function invoked per iteration.
   * @returns {Array|Object} Returns `collection`.
   * @see _.forEachRight
   * @example
   *
   * _.forEach([1, 2], function(value) {
   *   console.log(value);
   * });
   * // => Logs `1` then `2`.
   *
   * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
   *   console.log(key);
   * });
   * // => Logs 'a' then 'b' (iteration order is not guaranteed).
   */
  function forEach(collection, iteratee) {
    var func = isArray$3(collection) ? arrayEach$1 : baseEach$1;
    return func(collection, castFunction$1(iteratee));
  }

  var forEach_1 = forEach;

  var forEach$1 = /*#__PURE__*/Object.freeze({
    default: forEach_1,
    __moduleExports: forEach_1
  });

  var require$$0$g = ( forEach$1 && forEach_1 ) || forEach$1;

  var each = require$$0$g;

  var XCustomSelect = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('select',{ref:"$_VueXeditable_Select",domProps:{"value":_vm.internalOptionValue(_vm.value)},on:{"change":function($event){_vm.onChange($event.target.value);}}},_vm._l((_vm.options),function(option,index){return _c('option',{key:index,ref:"options",refInFor:true,domProps:{"value":index,"selected":_vm.isSelected(option)}},[_vm._v(" "+_vm._s(_vm.displayedOptionValue(option))+" ")])}))},staticRenderFns: [],
    template: '#custom-select',
    props: ['value', 'options'],
    mounted: function mounted () {
      this.$refs.$_VueXeditable_Select.addEventListener('keydown', this.onKeyDown, false);
    },
    beforeDestroy: function beforeDestroy () {
      this.$refs.$_VueXeditable_Select.removeEventListener('keydown', this.onKeyDown, false);
    },
    methods: {
      displayedOptionValue: function displayedOptionValue (option) {
        if (Array.isArray(option)) {
          return option[option.length - 1]
        } else {
          return option
        }
      },
      internalOptionValue: function internalOptionValue (option) {
        if (Array.isArray(option)) {
          return option[0]
        } else {
          return option
        }
      },
      onChange: function onChange (newSelectionIndex) {
        // MUST be called 'input'
        this.$emit('input', this.options[newSelectionIndex]);
      },
      isSelected: function isSelected (option) {
        return option === this.value
      },
      onKeyDown: function onKeyDown (e) {
        this.$emit('keydown', e);
      }
    }
  }

  var XEditable = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"vue-xeditable"},[(_vm.isRemoteUpdating)?_vm._t("before"):_vm._e(),_vm._v(" "),_c('span',{directives:[{name:"show",rawName:"v-show",value:(!_vm.isEditing && !_vm.isRemoteUpdating),expression:"!isEditing && !isRemoteUpdating"}],staticClass:"vue-xeditable-value",class:{'vue-xeditable-empty': _vm.$_VueXeditable_isValueEmpty},domProps:{"innerHTML":_vm._s(_vm.$_VueXeditable_getHTMLValue())},on:{"click":function($event){_vm.$_VueXeditable_maybeStartEditing(1, $event);},"dblclick":function($event){_vm.$_VueXeditable_maybeStartEditing(2, $event);}}}),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isEditing && !_vm.isRemoteUpdating),expression:"isEditing && !isRemoteUpdating"}],staticClass:"vue-xeditable-control"},[(_vm.type === "text")?_c('input',{staticClass:"vue-xeditable-form-control",attrs:{"type":"text","autofocus":""},domProps:{"value":_vm.rawValue},on:{"keydown":_vm.$_VueXeditable_onKeydown,"blur":_vm.$_VueXeditable_stopEditing}}):(_vm.type === "textarea")?_c('textarea',{staticClass:"vue-xeditable-form-control",on:{"keydown":_vm.$_VueXeditable_onKeydown,"blur":_vm.$_VueXeditable_stopEditing}},[_vm._v("      "+_vm._s(_vm.rawValue)+"\n    ")]):(_vm.type === "number")?_c('input',{staticClass:"vue-xeditable-form-control",attrs:{"type":"number"},domProps:{"value":_vm.rawValue},on:{"keydown":_vm.$_VueXeditable_onKeydown,"blur":_vm.$_VueXeditable_stopEditing}}):(_vm.type === "select")?_c('x-custom-select',{staticClass:"vue-xeditable-form-control",attrs:{"value":_vm.rawValue,"options":_vm.options},on:{"input":_vm.$_VueXeditable_valueDidChange,"keydown":_vm.$_VueXeditable_onKeydown,"blur":_vm.$_VueXeditable_stopEditing}}):_vm._e()],1),_vm._v(" "),(_vm.isRemoteUpdating)?_vm._t("after"):_vm._e()],2)},staticRenderFns: [],
    name: 'vue-xeditable',
    components: { XCustomSelect: XCustomSelect },
    props: {
      value: {
        type: [String, Number, Array]
      },
      type: {
        type: String,
        required: false,
        default: 'text'
      },
      name: {
        type: String,
        required: false,
        default: 'VueXeditableDefaultName'
      },
      empty: {
        type: String,
        required: false,
        default: 'Empty'
      },
      placeholder: {
        type: String,
        required: false,
        default: ''
      },
      options: {
        type: Array,
        default: function () {
          return []
        }
      },
      editOnDoubleClick: {
        type: Boolean,
        required: false,
        default: false
      },
      remote: {
        type: Object,
        required: false,
        default: function () {
          return {
            url: null,
            method: 'PUT',
            key: null,
            resource: null,
            headers: null
          }
        }
      }
    },
    data: function data () {
      return {
        isEditing: false,
        isRemoteUpdating: false,
        rawValue: this.value
      }
    },
    watch: {
      value: function value (newValue) {
        this.rawValue = newValue;
      },
      options: function options (newOptions) {
        var this$1 = this;

        this.rawValue = newOptions.find(function (o) {
          var v = (Array.isArray(o)) ? o[0] : o;
          return v === this$1.rawValue
        });
      }
    },
    computed: {
      $_VueXeditable_isValueEmpty: function $_VueXeditable_isValueEmpty () {
        return (this.rawValue === null || this.rawValue === undefined || this.rawValue === '')
      },
      $_VueXeditable_hasRemoteUpdate: function $_VueXeditable_hasRemoteUpdate () {
        return this.remote && this.remote.url && this.remote.url.length && this.remote.key && this.remote.key.length
      },
      $_VueXeditable_hasValidRemote: function $_VueXeditable_hasValidRemote () {
        return this.$_VueXeditable_hasRemoteUpdate && ['PUT', 'POST'].includes(this.remote.method.toUpperCase())
      }
    },
    methods: {
      $_VueXeditable_getHTMLValue: function $_VueXeditable_getHTMLValue () {
        if (this.$_VueXeditable_isValueEmpty) {
          return this.empty
        }
        if (this.type === 'select' && Array.isArray(this.rawValue)) {
          return this.rawValue[this.rawValue.length - 1]
        }
        return this.rawValue || '?'
      },
      $_VueXeditable_onKeydown: function $_VueXeditable_onKeydown (event) {
        if (!this.isEditing) {
          return
        }
        if (event.keyCode === 13) {
          this.$_VueXeditable_stopEditing(event);
          this.$_VueXeditable_valueDidChange(event.target.value);
        }
        else if (event.keyCode === 27) {
          this.$_VueXeditable_stopEditing(event);
        }
      },
      $_VueXeditable_maybeStartEditing: function $_VueXeditable_maybeStartEditing (value, event) {
        if ((value === 1 && !this.editOnDoubleClick) || (value === 2 && this.editOnDoubleClick)) {
          this.$_VueXeditable_startEditing(event);
        }
      },
      $_VueXeditable_startEditing: function $_VueXeditable_startEditing (event) {
        this.isEditing = true;
        var that = this;
        that.$emit('start-editing', this.rawValue, this.name);
        setTimeout(function () {
          var inputs = Array.from(event.target.nextElementSibling.children);
          inputs.forEach(function (i) {
            i.focus();
          });
        }, 100);
      },
      $_VueXeditable_stopEditing: function $_VueXeditable_stopEditing (event) {
        this.isEditing = false;
        this.$emit('stop-editing', this.rawValue, this.name);
      },
      $_VueXeditable_valueDidChange: function $_VueXeditable_valueDidChange (newValue) {
        var this$1 = this;

        if (this.type === 'select') {
          this.$_VueXeditable_stopEditing(); // Needed because no events can be associated with select / option?...
        }
        if (this.$_VueXeditable_hasValueChanged(newValue) || this.type === 'select') {
          this.$emit('value-will-change', this.rawValue, this.name);

          if (this.$_VueXeditable_hasRemoteUpdate) {
            if (this.$_VueXeditable_hasValidRemote) {
              this.$_VueXeditable_sendRemoteUpdate(newValue)
                .then(function () {
                  this$1.$emit('value-did-change', newValue, this$1.name);
                })
                .catch(function (error) {
                  this$1.$emit('value-remote-update-error', newValue, error, this$1.name);
                });
            } else {
              console.error('VueXeditable Error: Invalid Remote Update configuration.');
            }
          } else {
            this.$_VueXeditable_makeLocalUpdate(newValue);
            this.$emit('value-did-change', newValue, this.name);
          }
        }
      },
      $_VueXeditable_hasValueChanged: function $_VueXeditable_hasValueChanged (newValue) {
        return newValue !== this.rawValue
      },
      $_VueXeditable_makeLocalUpdate: function $_VueXeditable_makeLocalUpdate (newValue) {
        this.rawValue = newValue;
      },
      $_VueXeditable_sendRemoteUpdate: function $_VueXeditable_sendRemoteUpdate (newValue) {
        var this$1 = this;

        var updateValue = null;
        if (this.type === 'number') {
          updateValue = parseFloat(newValue);
        } else if (this.type === 'select') {
          updateValue = (Array.isArray(newValue)) ? newValue[0] : newValue;
        } else {
          updateValue = newValue.toString();
        }

        var payload = {};
        if (this.remote.resource && this.remote.resource.length) {
          var subpayload = {};
          subpayload[this.remote.key] = updateValue;
          payload[this.remote.resource] = subpayload;
        } else {
          payload[this.remote.key] = updateValue;
        }

        return new Promise(function (resolve, reject) {
          this$1.isRemoteUpdating = true;
          axios({
            method: this$1.remote.method,
            url: this$1.remote.url,
            headers: this$1.remote.headers || {},
            data: payload
          })
            .then(function (response) {
              this$1.isRemoteUpdating = false;
              this$1.$_VueXeditable_makeLocalUpdate(newValue);
              resolve(newValue);
            })
            .catch(function (error) {
              this$1.isRemoteUpdating = false;
              reject(error);
            });
        })
      }
    }
  }

  var VueXeditable = {};

  VueXeditable.install = function (Vue, options) {
    Vue.component('VueXeditable', XEditable);
  };

  each(VueXeditable, function (component, name) {
    Vue.component(name, component);
  });

}(axios));
