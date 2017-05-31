import ListingService from "../../../services/listing.service";

export const getters = {
    getListing(state) {
        //var listing = state.listings.filter(x => x.id === id);
        //if (listing != null) {
        //    return listing;
        //} else {
        //    (new ListingService()).getListingById(id).then(data => {
        //        state.listings.push(data);
        //        return data;
        //    });
        //} 
        console.log('inside getter');
        return null;
    }
}