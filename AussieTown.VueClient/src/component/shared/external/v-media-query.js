//https://github.com/AStaroverov/v-media-query
// lazy methodsger
var extend;
var defineReactive;
var _vms = {};
var _nameSpace = {
    methods: '$mq',
    variables: '$mv'
};
var _methods = { expr: expr, below: below, above: above, beyond: beyond, between: between };
var _mqData = {
    created: function () {
        var root = this.$parent;
        if (root) {
            defineReactive(this[_nameSpace.methods], 'resize', root[_nameSpace.methods].resize);
        }
        else {
            _vms[this._uid] = this;
            defineReactive(this[_nameSpace.methods], 'resize', 1);
        }
    }
};
export default {
    methods: _methods,
    install: function (Vue, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.methods, methods = _c === void 0 ? {} : _c, _d = _b.variables, variables = _d === void 0 ? {} : _d, _e = _b.nameSpace, nameSpace = _e === void 0 ? {} : _e;
        lazyInitMethods(Vue);
        extend(_nameSpace, nameSpace);
        //Vue.mixin(_mqData);
        Vue.prototype[_nameSpace.methods] = extend(extend({}, _methods), methods);
        Vue.prototype[_nameSpace.variables] = variables;
        //initResize()
    }
};
function lazyInitMethods(Vue) {
    extend = Vue.util.extend;
    defineReactive = Vue.util.defineReactive;
}
//function initResize() {
//    let throttleResize = throttle(() => {
//        Object.keys(_vms).forEach(key => ++_vms[key][_nameSpace.methods].resize)
//    } , 150)
//    window.addEventListener('resize', throttleResize)
//}
function getArgs(args) {
    return args.length > 0 ? args.reverse() : args;
}
function prepare(val) {
    return ('' + parseInt(val)).length === ('' + val).length
        ? val + "px"
        : val;
}
function expr(expressionString) {
    if (window) {
        return matchMedia(expressionString).matches;
    }
}
function below() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var _a = getArgs(args), value = _a[0], _b = _a[1], measurement = _b === void 0 ? 'width' : _b;
    if (typeof (window) !== 'undefined') {
        return matchMedia("(max-" + measurement + ": " + prepare(value) + ")").matches;
    }
    else {
        return true;
    }
}
function above() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var _a = getArgs(args), value = _a[0], _b = _a[1], measurement = _b === void 0 ? 'width' : _b;
    if (typeof (window) !== 'undefined') {
        return matchMedia("(min-" + measurement + ": " + prepare(value) + ")").matches;
    }
    else {
        return true;
    }
}
function between() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var _a = getArgs(args), value = _a[0], _b = _a[1], measurement = _b === void 0 ? 'width' : _b;
    var minVal = value[0], maxVal = value[1];
    if (typeof (window) !== 'undefined') {
        return matchMedia("\n                    (min-" + measurement + ": " + prepare(minVal) + ") and\n                    (max-" + measurement + ": " + prepare(maxVal) + ")\n                  ").matches;
    }
    else {
        return false;
    }
}
function beyond() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var _a = getArgs(args), value = _a[0], _b = _a[1], measurement = _b === void 0 ? 'width' : _b;
    var minVal = value[0], maxVal = value[1];
    if (typeof (window) !== 'undefined') {
        return matchMedia("\n                (min-" + measurement + ": " + prepare(maxVal) + "),\n                (max-" + measurement + ": " + prepare(minVal) + ")\n                ").matches;
    }
    else {
        return false;
    }
}
