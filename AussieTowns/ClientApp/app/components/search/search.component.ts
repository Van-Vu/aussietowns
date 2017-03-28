import { Component, Injectable, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { SearchService } from '../../services/search.service'
import { SuburbLocation } from '../../model/suburbLocation'
import { Subscription } from 'rxjs/Subscription';
import { MapBridge } from '../../services/map.bridge'

import { TripItem } from '../../model/tripItem';

import { Http, Headers } from "@angular/http";
import { isBrowser } from 'angular2-universal';

import { TourService } from '../../services/tour.service';
import { TourRequestModalComponent } from '../forms/tourrequestmodal.component';
import { TourDetailModalComponent } from '../forms/tourdetailmodal.component';

declare var google: any;
@Component({
    selector: "search",
    template: require('./search.component.html'),
})

export class SearchComponent implements OnInit, OnDestroy, IMessageReceivedCallBack {
    @ViewChild(TourRequestModalComponent) tourRequestModalComponent: TourRequestModalComponent;
    @ViewChild(TourDetailModalComponent) tourDetailModalComponent: TourDetailModalComponent;

    lat: number;
    lng: number;
    map: any = null;
    //suburbs: SuburbLocation[];
    listings: any[] = [];
    itinerarySubscription: Subscription;
    totalDistance: number = 0;

    constructor(private searchService: SearchService, private mapBridge: MapBridge, private tourService: TourService) {}

    ngOnInit() {
        if (isBrowser) {
            if (!this.map) {
                this.lat = -33.860;
                this.lng = 151.210;
                var mapProp = {
                    center: new google.maps.LatLng(-33.860, 151.210),
                    zoom: 5,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                this.map = new google.maps.Map(document.getElementById("gmap"), mapProp);
            } else {
                this.lat = 1;
                this.lng = 1;
            } 

            this.tourService.getAllListingOffer().subscribe(listings => {
                this.listings = listings;
            });
        }
        //this.map.addListener("bounds_changed", (event) => this.callSomething(event));
        //this.map.addListener("click", (event) => this.callSomething(event));

        this.itinerarySubscription = this.mapBridge.caculate$.subscribe(
            tripItems => {
                this.calculateTotalDistance(tripItems);
            });
    }

    ngOnDestroy() {
        // prevent memory leak when component destroyed
        this.itinerarySubscription.unsubscribe();
    }

    calculateTotalDistance(tripItems: TripItem[]) {
        var directionsService = new google.maps.DirectionsService();
        var waypoints = [];

        var origin = new google.maps.LatLng(tripItems[0].lat, tripItems[0].lng);
        var destination = new google.maps.LatLng(tripItems[tripItems.length - 1].lat, tripItems[tripItems.length - 1].lng);

        tripItems.forEach((tripItem, index) => {
            if ((index !== 0) && (index !== tripItems.length-1)) {
                waypoints.push({
                    location: new google.maps.LatLng(tripItem.lat, tripItem.lng),
                    stopover: true
                });    
            }
        });

        var request = {
            origin: origin,
            destination: destination,
            waypoints: waypoints,
            optimizeWaypoints: false,
            travelMode: google.maps.TravelMode["DRIVING"]
        };

        var directionsDisplay = new google.maps.DirectionsRenderer();
        directionsDisplay.setMap(this.map);

        this.totalDistance = 0;

        directionsService.route(request, (response, status) => {
            if (status == 'OK') {
                directionsDisplay.setDirections(response);

                response.routes[0].legs.forEach(leg => {
                    this.totalDistance += parseInt(leg.distance.value) / 1000;
                });

                alert(this.totalDistance);
            }
        });
    }

    callSomething(customInfo) {
        //Bodom
        //this.searchService.getSuburbDetails(customInfo).subscribe(info => {
        //    console.log(info);
        //});
    }

    showTourRequest() {
        this.tourRequestModalComponent.show();
    }

    showTourDetail() {
        this.tourDetailModalComponent.show();
    }
}

export interface IMessageReceivedCallBack {
    callSomething(event);
}
