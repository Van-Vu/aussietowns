import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UniversalModule } from 'angular2-universal';
import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { MapComponent } from './components/map/map.component';
import { SearchService } from './services/search.service';
import { SuburbInforCardComponent } from './components/map/suburbinfocard.component';
import { ItineraryComponent } from './components/itinerary/itinerary.component';
import { ItineraryBridge } from './services/itinerary.bridge';
import { MapBridge } from './services/map.bridge';
import { Ng2CompleterModule } from "ng2-completer";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationFormComponent } from './components/forms/registrationform.component';
import { ProfileFormComponent } from './components/forms/profileform.component';
import { LoginFormComponent } from './components/forms/loginform.component';

import { ModalFrameComponent } from './components/forms/modalframe.component';

import { UserService } from  './services/user.service';
import { AlertService } from './services/alert.service';
import { AuthenticationService } from './services/authentication.service';

import { TextMaskModule } from 'angular2-text-mask';

import { ImageUploadModule } from 'ng2-imageupload';
import { MiniProfileComponent } from './components/shared/miniprofile.component';
import { TourDetailFormComponent } from './components/forms/tourdetailform.component';
import { MyDatePickerModule } from 'mydatepicker';
import { TourRequestFormComponent } from './components/forms/tourrequestform.component';
import { TourService } from './services/tour.service';
import { ProfileSearchComponent } from './components/shared/profilesearch.component';
import { TourParticipantComponent } from './components/shared/tourparticipant.component';

import { SwiperModule } from 'angular2-useful-swiper';
import { DeviceDetectionService } from './components/shared/devicedetection.service';
import { kpxAutocompleteComponent } from './components/shared/3rdParty/kpx-autocomplete.component';
import { SliderComponent } from './components/shared/slider.component';

@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        NavMenuComponent,
        MapComponent,
        HomeComponent,
        SuburbInforCardComponent,
        ItineraryComponent,
        RegistrationFormComponent,
        LoginFormComponent,
        ProfileFormComponent,
        ModalFrameComponent,
        MiniProfileComponent,
        TourDetailFormComponent,
        TourRequestFormComponent,
        ProfileSearchComponent,
        TourParticipantComponent,
        kpxAutocompleteComponent,
        SliderComponent
    ],
    imports: [
        UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        Ng2CompleterModule,
        FormsModule,
        ReactiveFormsModule,
        TextMaskModule,
        ImageUploadModule,
        MyDatePickerModule,
        SwiperModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'map', component: MapComponent },
            { path: 'profile/:id', component: ProfileFormComponent },
            { path: 'profile', component: ProfileFormComponent },
            { path: 'tourdetail/:id', component: TourDetailFormComponent },
            { path: 'tourdetail', component: TourDetailFormComponent },
            { path: 'tourrequest/:id', component: TourRequestFormComponent },
            { path: 'tourrequest', component: TourRequestFormComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [SearchService, ItineraryBridge, MapBridge, UserService, AlertService, AuthenticationService, TourService, DeviceDetectionService]
})

export class AppModule {}
