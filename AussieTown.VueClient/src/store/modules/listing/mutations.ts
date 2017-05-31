import Vue from 'vue'

export const mutations = {
    ADD_LISTING: (state, { items }) => {
        console.log('before pushing: ' + items);
        state.items.push(items);
        console.log('after pushing: ' + state.items);
    }
}