import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SuburbLocation } from '../../model/suburbLocation'
import { SearchService } from '../../services/search.service'
import { ItineraryBridge } from '../../services/itinerary.bridge'

declare var google: any;

@Component({
    selector: 'suburbinfocard',
    template: require('./suburbinfocard.component.html'),
    styles: [require('./suburbinfocard.component.css')]
})

export class SuburbInforCardComponent {
    @Input() data: SuburbLocation;
    @Input() map: any;

    suburbFullName: string;
    isClassVisible = false;

    constructor(private searchService: SearchService, private itineraryBridge: ItineraryBridge) { }

    ngOnInit() {


        this.suburbFullName = this.data.suburbName + " (" + this.data.state + ")";
        var myLatLng = { lat: this.data.lat, lng: this.data.lng };
        var marker = new google.maps.Marker({
            position: myLatLng,
            map: this.map,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 5
            }
        });

        google.maps.event.addListener(marker, 'click', () => {
            //this.searchService.getSuburbDetails(this.data.postcode).subscribe(info => {
            //    console.log(info);
            //});
            this.isClassVisible = !this.isClassVisible;
        });
    }


    moreDetail() {
        this.isClassVisible = !this.isClassVisible;
        return false;
    }

    addToItinerary() {
        this.itineraryBridge.addSuburbToItinerary(this.data.suburbName);
    }

    onDragend(event: any) {
        event.target.style.opacity = 1;
    }

    onStart(event: any) {
        console.log("Start");
        var style = window.getComputedStyle(event.target, null);
        event.dataTransfer.setData("application/x-${zone}", JSON.stringify(this.data));
        event.target.style.opacity = .5;
    }
}
