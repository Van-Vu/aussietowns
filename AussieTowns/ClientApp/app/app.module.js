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
var ng2_completer_1 = require("ng2-completer");
var forms_1 = require("@angular/forms");
var registrationform_component_1 = require("./components/forms/registrationform.component");
var profileform_component_1 = require("./components/forms/profileform.component");
var loginform_component_1 = require("./components/forms/loginform.component");
var modalframe_component_1 = require("./components/forms/modalframe.component");
var user_service_1 = require("./services/user.service");
var alert_service_1 = require("./services/alert.service");
var authentication_service_1 = require("./services/authentication.service");
var angular2_text_mask_1 = require("angular2-text-mask");
var ng2_imageupload_1 = require("ng2-imageupload");
var miniprofile_component_1 = require("./components/shared/miniprofile.component");
var tourdetailform_component_1 = require("./components/forms/tourdetailform.component");
var mydatepicker_1 = require("mydatepicker");
var tourrequestform_component_1 = require("./components/forms/tourrequestform.component");
var tour_service_1 = require("./services/tour.service");
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
            itinerary_component_1.ItineraryComponent,
            registrationform_component_1.RegistrationFormComponent,
            loginform_component_1.LoginFormComponent,
            profileform_component_1.ProfileFormComponent,
            modalframe_component_1.ModalFrameComponent,
            miniprofile_component_1.MiniProfileComponent,
            tourdetailform_component_1.TourDetailFormComponent,
            tourrequestform_component_1.TourRequestFormComponent
        ],
        imports: [
            angular2_universal_1.UniversalModule,
            ng2_completer_1.Ng2CompleterModule,
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule,
            angular2_text_mask_1.TextMaskModule,
            ng2_imageupload_1.ImageUploadModule,
            mydatepicker_1.MyDatePickerModule,
            router_1.RouterModule.forRoot([
                { path: '', redirectTo: 'home', pathMatch: 'full' },
                { path: 'home', component: home_component_1.HomeComponent },
                { path: 'counter', component: counter_component_1.CounterComponent },
                { path: 'fetch-data', component: fetchdata_component_1.FetchDataComponent },
                { path: 'map', component: map_component_1.MapComponent },
                { path: 'profile', component: profileform_component_1.ProfileFormComponent },
                { path: 'tourdetail/:id', component: tourdetailform_component_1.TourDetailFormComponent },
                { path: 'tourdetail', component: tourdetailform_component_1.TourDetailFormComponent },
                { path: 'tourrequest/:id', component: tourrequestform_component_1.TourRequestFormComponent },
                { path: 'tourrequest', component: tourrequestform_component_1.TourRequestFormComponent },
                { path: '**', redirectTo: 'home' }
            ])
        ],
        providers: [search_service_1.SearchService, itinerary_bridge_1.ItineraryBridge, map_bridge_1.MapBridge, user_service_1.UserService, alert_service_1.AlertService, authentication_service_1.AuthenticationService, tour_service_1.TourService]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map