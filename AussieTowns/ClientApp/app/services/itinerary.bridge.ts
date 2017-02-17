import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { UUID } from 'angular2-uuid';

@Injectable()
export class ItineraryBridge {

    private suburbToAdd = new Subject<string>();
    suburbToAdd$ = this.suburbToAdd.asObservable();
    uuid = UUID.UUID();

    addSuburbToItinerary(suburb: string) {
        this.suburbToAdd.next(suburb);
    }
}