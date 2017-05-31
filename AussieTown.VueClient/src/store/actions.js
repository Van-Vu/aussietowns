import ListingService from "../services/listing.service";
export var actions = {
    FETCH_LISTING: function (_a) {
        var commit = _a.commit, state = _a.state;
        console.log('in actions:' + state.items);
        if (state.items.length === 0) {
            (new ListingService()).getListingById(2).then(function (data) {
                console.log('before ADD_LISTING:' + data);
                commit('ADD_LISTING', { data: data });
                console.log('in actions:' + state.items);
                return data;
            });
        }
        else {
            return state.items[0];
        }
        //// on the client, the store itself serves as a cache.
        //// only fetch items that we do not already have, or has expired (3 minutes)
        //const now = Date.now()
        //ids = ids.filter(id => {
        //    const item = state.items[id]
        //    if (!item) {
        //        return true
        //    }
        //    if (now - item.__lastUpdated > 1000 * 60 * 3) {
        //        return true
        //    }
        //    return false
        //})
        //if (ids.length) {
        //    return fetchItems(ids).then(items => commit('SET_ITEMS', { items }))
        //} else {
        //    return Promise.resolve()
        //}
    },
    getListing: function (state) {
        //var listing = state.listings.filter(x => x.id === id);
        //if (listing != null) {
        //    return listing;
        //} else {
        //    (new ListingService()).getListingById(id).then(data => {
        //        state.listings.push(data);
        //        return data;
        //    });
        //}
        if (state.listings.length === 0) {
            (new ListingService()).getListingById(1).then(function (data) {
                state.listings.push(data);
                return data;
            });
        }
        else {
            return state.listings[0];
        }
    }
};
