import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UniversalModule } from 'angular2-universal';
import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { MapComponent } from './components/map/map.component';
import { SearchService } from './services/search.service';
import { SuburbInforCardComponent } from './components/map/suburbinfocard.component';
import { ItineraryComponent } from './components/itinerary/itinerary.component';
import { ItineraryBridge } from './services/itinerary.bridge';
import { MapBridge } from './services/map.bridge';
import { Ng2CompleterModule } from "ng2-completer";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationFormComponent } from './components/forms/registrationform.component';

import { ModalFrameComponent } from './components/forms/modalframe.component';

import { UserService } from  './services/user.service';
import { AlertService } from './services/alert.service';
import { AuthenticationService }  from './services/authentication.service';

@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        MapComponent,
        HomeComponent,
        SuburbInforCardComponent,
        ItineraryComponent,
        RegistrationFormComponent,
        ModalFrameComponent
    ],
    imports: [
        UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        Ng2CompleterModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: 'map', component: MapComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [SearchService, ItineraryBridge, MapBridge, UserService, AlertService, AuthenticationService]
})

export class AppModule {}
