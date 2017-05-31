export var mutations = {
    ADD_LISTING: function (state, _a) {
        var items = _a.items;
        console.log('before pushing: ' + items);
        state.items.push(items);
        console.log('after pushing: ' + state.items);
    }
};
