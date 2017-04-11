import { Component, AfterViewInit } from '@angular/core';
import { ListingService } from '../../services/listing.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'tripcomponent',
    template: require('./trip.component.html')
})

export class TripComponent implements AfterViewInit{
    sub: any;
    profileId: number = 0;

    constructor(private listingService: ListingService, private route: ActivatedRoute) { }

    ngAfterViewInit() {
        this.sub = this.route.params.subscribe(params => {
            this.profileId = +params['id'] | 0; // (+) converts string 'id' to a number
            if (this.profileId > 0) {
                this.listingService.getListingsByUserId(this.profileId).subscribe(
                    data => {

                    });
            }
        });
    }
}