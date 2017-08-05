//https://github.com/AStaroverov/v-media-query

// lazy methodsger
let extend;
let defineReactive;

let _vms = {};
let _nameSpace = {
    methods: '$mq',
    variables: '$mv'
}
let _methods = {expr, below, above, beyond, between}
let _mqData = {
    created() {
        let root = this.$parent

        if (root) {
            defineReactive(this[_nameSpace.methods], 'resize', root[_nameSpace.methods].resize)
        } else {
            _vms[this._uid] = this
            defineReactive(this[_nameSpace.methods], 'resize', 1)
        }
    }
}

export default {
    methods: _methods,
    install(Vue, {
        methods = {},
        variables = {},
        nameSpace = {},
    } = {}) {
        lazyInitMethods(Vue);
        extend(_nameSpace, nameSpace);

        //Vue.mixin(_mqData);
        Vue.prototype[_nameSpace.methods] = extend(extend({}, _methods), methods);
        Vue.prototype[_nameSpace.variables] = variables;

        //initResize()
    }
    }

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
            ? `${val}px`
            : val;
    }

    function expr(expressionString) {
        if (window) {
            return matchMedia(expressionString).matches;
        }
            
    }

    function below(...args) {
        let [value, measurement = 'width'] = getArgs(args);
        if (typeof (window) !== 'undefined') {
            return matchMedia(`(max-${measurement}: ${prepare(value)})`).matches;
        } else {
            return true;
        }
    }

    function above(...args) {
        let [value, measurement = 'width'] = getArgs(args);
        if (typeof (window) !== 'undefined') {
            return matchMedia(`(min-${measurement}: ${prepare(value)})`).matches;
        } else {
            return true;
        }
        
    }

    function between(...args) {
        let [value, measurement = 'width'] = getArgs(args);
        let [minVal, maxVal] = value;
        if (typeof (window) !== 'undefined') {
            return matchMedia(`
                    (min-${measurement}: ${prepare(minVal)}) and
                    (max-${measurement}: ${prepare(maxVal)})
                  `).matches;
        } else {
            return false;
        }
    }

    function beyond(...args) {
        let [value, measurement = 'width'] = getArgs(args);
        let [minVal, maxVal] = value;
        if(typeof (window) !== 'undefined') {
            return matchMedia(`
                (min-${measurement}: ${prepare(maxVal)}),
                (max-${measurement}: ${prepare(minVal)})
                `).matches;
        } else {
            return false;
        }
    }