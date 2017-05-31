import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
export default {
    state: {
        items: []
    },
    actions: actions,
    mutations: mutations,
    getters: getters
};
