"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var angular2_universal_1 = require("angular2-universal");
var app_component_1 = require("./components/app/app.component");
var navmenu_component_1 = require("./components/navmenu/navmenu.component");
var home_component_1 = require("./components/home/home.component");
var fetchdata_component_1 = require("./components/fetchdata/fetchdata.component");
var counter_component_1 = require("./components/counter/counter.component");
var map_component_1 = require("./components/map/map.component");
var search_service_1 = require("./services/search.service");
var suburbinfocard_component_1 = require("./components/map/suburbinfocard.component");
var itinerary_component_1 = require("./components/itinerary/itinerary.component");
var itinerary_bridge_1 = require("./services/itinerary.bridge");
var map_bridge_1 = require("./services/map.bridge");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        bootstrap: [app_component_1.AppComponent],
        declarations: [
            app_component_1.AppComponent,
            navmenu_component_1.NavMenuComponent,
            counter_component_1.CounterComponent,
            fetchdata_component_1.FetchDataComponent,
            map_component_1.MapComponent,
            home_component_1.HomeComponent,
            suburbinfocard_component_1.SuburbInforCardComponent,
            itinerary_component_1.ItineraryComponent
        ],
        imports: [
            angular2_universal_1.UniversalModule,
            router_1.RouterModule.forRoot([
                { path: '', redirectTo: 'home', pathMatch: 'full' },
                { path: 'home', component: home_component_1.HomeComponent },
                { path: 'counter', component: counter_component_1.CounterComponent },
                { path: 'fetch-data', component: fetchdata_component_1.FetchDataComponent },
                { path: 'map', component: map_component_1.MapComponent },
                { path: '**', redirectTo: 'home' }
            ])
        ],
        providers: [search_service_1.SearchService, itinerary_bridge_1.ItineraryBridge, map_bridge_1.MapBridge]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map