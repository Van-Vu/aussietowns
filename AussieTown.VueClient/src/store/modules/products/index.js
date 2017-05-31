var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { getters } from './getters';
var initialState = {
    products: [
        {
            id: '001',
            name: 'COBOL 101 vintage',
            description: 'Learn COBOL with this vintage programming book',
            price: 399,
        },
        {
            id: '007',
            name: 'Sharp C2719 curved TV',
            description: 'Watch TV like with new screen technology',
            price: 1995,
        },
        {
            id: '719',
            name: 'Remmington X mechanical keyboard',
            description: 'Excellent for gaming and typing',
            price: 595,
        }
    ]
};
export default {
    state: __assign({}, initialState),
    getters: getters
};
