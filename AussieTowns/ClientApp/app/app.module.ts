import { NgModule } from '@angular/core';
import { RouterModule, RouteReuseStrategy, UrlSerializer } from '@angular/router';
import { UniversalModule } from 'angular2-universal';
import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { SearchService } from './services/search.service';
import { SuburbInforCardComponent } from './components/search/suburbinfocard.component';
import { ItineraryComponent } from './components/itinerary/itinerary.component';
import { ItineraryBridge } from './services/itinerary.bridge';
import { MapBridge } from './services/map.bridge';
import { Ng2CompleterModule } from "ng2-completer";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationFormComponent } from './components/forms/registrationform.component';
import { ProfileFormComponent } from './components/forms/profileform.component';
import { LoginFormComponent } from './components/forms/loginform.component';
import { UserService } from  './services/user.service';
import { AlertService } from './services/alert.service';
import { MessageService } from './services/message.service';

import { TextMaskModule } from 'angular2-text-mask';

import { ImageUploadModule } from 'ng2-imageupload';
import { MiniProfileComponent } from './components/shared/miniprofile.component';
import { MyDatePickerModule } from 'mydatepicker';
import { ListingService } from './services/listing.service';
import { ProfileSearchComponent } from './components/shared/profilesearch.component';
import { TourParticipantComponent } from './components/shared/tourparticipant.component';

import { SwiperModule } from 'angular2-useful-swiper';
import { DeviceDetectionService } from './components/shared/devicedetection.service';
import { kpxAutocompleteComponent } from './components/shared/3rdParty/kpx-autocomplete.component';
import { SliderComponent } from './components/shared/slider.component';
import { ListingOfferCardComponent } from './components/search/listingoffercard.component';
import { CustomReuseStrategy }from './components/shared/customeReuseStrategy';
import { ProfileComponent } from './components/profile/profile.component';
import { MessageComponent } from './components/profile/message.component';

import { isBrowser } from 'angular2-universal';

import { TextMaskMockModule } from './components/mock/textmask_Mock';
import { ListingOfferFormComponent } from './components/forms/listingofferform.component';
import { ListingRequestFormComponent } from './components/forms/listingrequestform.component';
import { ModalFrameComponent } from './components/modal/modalframe.component';
import { ListingRequestModalComponent } from './components/modal/listingrequestmodal.component';
import { ListingOfferModalComponent } from './components/modal/listingoffermodal.component';
import { LoginModalComponent } from './components/modal/loginmodal.component';
import { RegistrationModalComponent } from './components/modal/registrationmodal.component';
import { TimePickerComponent } from './components/shared/3rdParty/timepicker.component';
import { ScheduleComponent } from './components/shared/schedule.component';
import { CustomUrlSerializer } from './components/seo/customUrlSerializer';


let imports = [
    Ng2CompleterModule,
    FormsModule,
    ReactiveFormsModule,
    ImageUploadModule,
    MyDatePickerModule,
    SwiperModule,
    RouterModule.forRoot([
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        { path: 'home', component: HomeComponent },
        { path: 'search', component: SearchComponent },
        { path: 'profile/:id', component: ProfileComponent },
        { path: 'profile', component: ProfileComponent },
        { path: 'touroffer/:id', component: ListingOfferFormComponent },
        { path: 'touroffer', component: ListingOfferFormComponent },
        { path: 'tourrequest/:id', component: ListingRequestFormComponent },
        { path: 'tourrequest', component: ListingRequestFormComponent },
        { path: '**', redirectTo: 'home' }
    ]),
    UniversalModule // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
];

if (isBrowser) {
    let textMaskModule = TextMaskModule;
    imports.push(textMaskModule);
} else {
    let textMaskMock = TextMaskMockModule;
    imports.push(textMaskMock);
}

@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        NavMenuComponent,
        SearchComponent,
        HomeComponent,
        SuburbInforCardComponent,
        ItineraryComponent,
        RegistrationFormComponent,
        LoginFormComponent,
        ProfileFormComponent,
        ModalFrameComponent,
        MiniProfileComponent,
        ListingOfferFormComponent,
        ListingRequestFormComponent,
        ProfileSearchComponent,
        TourParticipantComponent,
        kpxAutocompleteComponent,
        SliderComponent,
        ListingOfferCardComponent,
        ListingRequestModalComponent,
        ListingOfferModalComponent,
        ProfileComponent,
        LoginModalComponent,
        RegistrationModalComponent,
        TimePickerComponent,
        ScheduleComponent,
        MessageComponent
    ],
    imports: imports,
    providers: [SearchService, ItineraryBridge, MapBridge, UserService, AlertService,
        ListingService, DeviceDetectionService, MessageService,
        { provide: RouteReuseStrategy, useClass: CustomReuseStrategy },
        { provide: UrlSerializer, useClass: CustomUrlSerializer }]
})

export class AppModule {}
