//import State from './state';
//import ListingService from '../services/listing.service';

//export default class getters {
//    getListing(state: State, id: number) {
//        var listing = state.listings.filter(x => x.id === id);
//        if (listing != null) {
//            return listing;
//        } else {
//            (new ListingService()).getListingById(id).then(data => {
//                state.listings.push(data);
//                return data;
//            });
//        }
//    }

//}