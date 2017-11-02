"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var angular2_universal_1 = require("angular2-universal");
var app_component_1 = require("./components/app/app.component");
var navmenu_component_1 = require("./components/navmenu/navmenu.component");
var home_component_1 = require("./components/home/home.component");
var search_component_1 = require("./components/search/search.component");
var search_service_1 = require("./services/search.service");
var suburbinfocard_component_1 = require("./components/search/suburbinfocard.component");
var itinerary_component_1 = require("./components/itinerary/itinerary.component");
var itinerary_bridge_1 = require("./services/itinerary.bridge");
var map_bridge_1 = require("./services/map.bridge");
var ng2_completer_1 = require("ng2-completer");
var forms_1 = require("@angular/forms");
var registrationform_component_1 = require("./components/forms/registrationform.component");
var profileform_component_1 = require("./components/forms/profileform.component");
var loginform_component_1 = require("./components/forms/loginform.component");
var user_service_1 = require("./services/user.service");
var alert_service_1 = require("./services/alert.service");
var message_service_1 = require("./services/message.service");
var angular2_text_mask_1 = require("angular2-text-mask");
var ng2_imageupload_1 = require("ng2-imageupload");
var miniprofile_component_1 = require("./components/shared/miniprofile.component");
var mydatepicker_1 = require("mydatepicker");
var listing_service_1 = require("./services/listing.service");
var profilesearch_component_1 = require("./components/shared/profilesearch.component");
var tourparticipant_component_1 = require("./components/shared/tourparticipant.component");
var angular2_useful_swiper_1 = require("angular2-useful-swiper");
var devicedetection_service_1 = require("./components/shared/devicedetection.service");
var kpx_autocomplete_component_1 = require("./components/shared/3rdParty/kpx-autocomplete.component");
var slider_component_1 = require("./components/shared/slider.component");
var listingoffercard_component_1 = require("./components/search/listingoffercard.component");
var customeReuseStrategy_1 = require("./components/shared/customeReuseStrategy");
var profile_component_1 = require("./components/profile/profile.component");
var message_component_1 = require("./components/profile/message.component");
var angular2_universal_2 = require("angular2-universal");
var textmask_Mock_1 = require("./components/mock/textmask_Mock");
var listingofferform_component_1 = require("./components/forms/listingofferform.component");
var listingrequestform_component_1 = require("./components/forms/listingrequestform.component");
var modalframe_component_1 = require("./components/modal/modalframe.component");
var listingrequestmodal_component_1 = require("./components/modal/listingrequestmodal.component");
var listingoffermodal_component_1 = require("./components/modal/listingoffermodal.component");
var loginmodal_component_1 = require("./components/modal/loginmodal.component");
var registrationmodal_component_1 = require("./components/modal/registrationmodal.component");
var timepicker_component_1 = require("./components/shared/3rdParty/timepicker.component");
var schedule_component_1 = require("./components/shared/schedule.component");
var customUrlSerializer_1 = require("./components/seo/customUrlSerializer");
var imports = [
    ng2_completer_1.Ng2CompleterModule,
    forms_1.FormsModule,
    forms_1.ReactiveFormsModule,
    ng2_imageupload_1.ImageUploadModule,
    mydatepicker_1.MyDatePickerModule,
    angular2_useful_swiper_1.SwiperModule,
    router_1.RouterModule.forRoot([
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        { path: 'home', component: home_component_1.HomeComponent },
        { path: 'search', component: search_component_1.SearchComponent },
        { path: 'profile/:id', component: profile_component_1.ProfileComponent },
        { path: 'profile', component: profile_component_1.ProfileComponent },
        { path: 'touroffer/:id', component: listingofferform_component_1.ListingOfferFormComponent },
        { path: 'touroffer', component: listingofferform_component_1.ListingOfferFormComponent },
        { path: 'tourrequest/:id', component: listingrequestform_component_1.ListingRequestFormComponent },
        { path: 'tourrequest', component: listingrequestform_component_1.ListingRequestFormComponent },
        { path: '**', redirectTo: 'home' }
    ]),
    angular2_universal_1.UniversalModule // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
];
if (angular2_universal_2.isBrowser) {
    var textMaskModule = angular2_text_mask_1.TextMaskModule;
    imports.push(textMaskModule);
}
else {
    var textMaskMock = textmask_Mock_1.TextMaskMockModule;
    imports.push(textMaskMock);
}
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            bootstrap: [app_component_1.AppComponent],
            declarations: [
                app_component_1.AppComponent,
                navmenu_component_1.NavMenuComponent,
                search_component_1.SearchComponent,
                home_component_1.HomeComponent,
                suburbinfocard_component_1.SuburbInforCardComponent,
                itinerary_component_1.ItineraryComponent,
                registrationform_component_1.RegistrationFormComponent,
                loginform_component_1.LoginFormComponent,
                profileform_component_1.ProfileFormComponent,
                modalframe_component_1.ModalFrameComponent,
                miniprofile_component_1.MiniProfileComponent,
                listingofferform_component_1.ListingOfferFormComponent,
                listingrequestform_component_1.ListingRequestFormComponent,
                profilesearch_component_1.ProfileSearchComponent,
                tourparticipant_component_1.TourParticipantComponent,
                kpx_autocomplete_component_1.kpxAutocompleteComponent,
                slider_component_1.SliderComponent,
                listingoffercard_component_1.ListingOfferCardComponent,
                listingrequestmodal_component_1.ListingRequestModalComponent,
                listingoffermodal_component_1.ListingOfferModalComponent,
                profile_component_1.ProfileComponent,
                loginmodal_component_1.LoginModalComponent,
                registrationmodal_component_1.RegistrationModalComponent,
                timepicker_component_1.TimePickerComponent,
                schedule_component_1.ScheduleComponent,
                message_component_1.MessageComponent
            ],
            imports: imports,
            providers: [search_service_1.SearchService, itinerary_bridge_1.ItineraryBridge, map_bridge_1.MapBridge, user_service_1.UserService, alert_service_1.AlertService,
                listing_service_1.ListingService, devicedetection_service_1.DeviceDetectionService, message_service_1.MessageService,
                { provide: router_1.RouteReuseStrategy, useClass: customeReuseStrategy_1.CustomReuseStrategy },
                { provide: router_1.UrlSerializer, useClass: customUrlSerializer_1.CustomUrlSerializer }]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map