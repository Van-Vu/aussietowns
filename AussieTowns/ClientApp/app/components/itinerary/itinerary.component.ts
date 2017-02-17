import { Component, OnInit, OnDestroy } from '@angular/core';
import { ItineraryBridge } from '../../services/itinerary.bridge'
import { Subscription } from 'rxjs/Subscription';
import { MapBridge } from '../../services/map.bridge'
import { TripItem } from '../../model/tripItem'

@Component({
    selector: 'itinerary',
    template: require('./itinerary.component.html'),
    styles: [require('./itinerary.component.css')]
})

export class ItineraryComponent implements OnInit, OnDestroy {
    suburbs: string[] = [];
    tripItems: TripItem[] = [];
    suburbInfoSubscription: Subscription;

    constructor(private itineraryBridge: ItineraryBridge, private mapBridge: MapBridge) {
        //this.subscription = itineraryBridge.suburbToAdd$.subscribe(
        //    suburb => {
        //        this.suburbs.push(suburb);
        //    });
    }

    ngOnInit() {
        this.suburbInfoSubscription = this.itineraryBridge.suburbToAdd$.subscribe(
            suburb => {
                this.suburbs.push(suburb);
            });
        //this.itineraryBridge.getSuburbToItinerary().subscribe(
        //    suburb => {
        //        this.suburbs.push(suburb);
        //    });
    }

    ngOnDestroy() {
        // prevent memory leak when component destroyed
        this.suburbInfoSubscription.unsubscribe();
    }

    onDragend(event: any) {
        event.target.style.opacity = 1;
    }

    onStart(event: any) {
        console.log("Start");
        var style = window.getComputedStyle(event.target, null);
        event.dataTransfer.setData("text/plain",
            (parseInt(style.getPropertyValue("left"), 10) - event.clientX) + ',' + (parseInt(style.getPropertyValue("top"), 10) - event.clientY));
        event.target.style.opacity = .5;
    }

    onDragover(event: any) {
        // do something meaningful with it
        //console.log("drag Over");

        if (event.preventDefault) {
            event.preventDefault();
        }
        return false;
    }

    onDrop(event: any) {
        // do something meaningful with it
        //console.log("Drop");

        var suburbDetail = JSON.parse(event.dataTransfer.getData("application/x-${zone}")) ;
        this.suburbs.push(suburbDetail.suburbName);
        this.tripItems.push({
            suburbName: suburbDetail.suburbName,
            state: suburbDetail.state,
            lat: suburbDetail.lat,
            lng: suburbDetail.lng
        });
        event.preventDefault();
        return false;
    }

    calculateTotalDistance() {
        this.mapBridge.calculateTotalDistance(this.tripItems);
    }

}
