import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { SearchService } from '../../services/search.service'
import { SuburbLocation } from '../../model/suburbLocation'
import { Subscription } from 'rxjs/Subscription';
import { MapBridge } from '../../services/map.bridge'

import { TripItem } from '../../model/tripItem';

import { CompleterService, CompleterData, RemoteData } from 'ng2-completer';

declare var google: any;
import { Http, Headers } from "@angular/http";

@Component({
    selector: "map",
    template: require('./map.component.html'),
    styles: [require('./map.component.css')]
})

export class MapComponent implements OnInit, OnDestroy, IMessageReceivedCallBack {
    lat: number;
    lng: number;
    map: any = null;
    suburbs: SuburbLocation[];
    itinerarySubscription: Subscription;
    totalDistance: number = 0;

    private searchStr: string;
    private dataService: CompleterData;
    private dataRemote2: RemoteData;
    private searchData = [
        { color: 'red', value: '#f00' },
        { color: 'green', value: '#0f0' },
        { color: 'blue', value: '#00f' },
        { color: 'cyan', value: '#0ff' },
        { color: 'magenta', value: '#f0f' },
        { color: 'yellow', value: '#ff0' },
        { color: 'black', value: '#000' }
    ];


    constructor(private searchService: SearchService, private mapBridge: MapBridge, private completerService: CompleterService) {
        //this.dataService = completerService.local(this.searchData, 'color', 'color');
        this.dataService = completerService.local(this.searchData, 'color', 'color');

        this.dataRemote2 = completerService.remote(
            null,
            "detail",
            "detail");
        this.dataRemote2.urlFormater(term => {
            return `/api/search/autocomplete/${term}`;
        });
        //this.dataRemote2.dataField("detail");
        //this.dataRemote2.headers(new Headers({ "My-Header": "Hello World!" }));

        //this.dataRemote2 = completerService.remote(
        //    null,
        //    null,
        //    "formatted_address");
        //this.dataRemote2.urlFormater(term => {
        //    return `https://maps.googleapis.com/maps/api/geocode/json?address=${term}`;
        //});
        //this.dataRemote2.dataField("results");
    }

    ngOnInit() {
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

        //this.map.addListener("bounds_changed", (event) => this.callSomething(event));
        //this.map.addListener("click", (event) => this.callSomething(event));

        this.searchService.getSuburbs().subscribe(suburbs => {
            this.suburbs = suburbs;
        });

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

}

export interface IMessageReceivedCallBack {
    callSomething(event);
}
