import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { TripItem } from '../model/tripItem';

@Injectable()
export class MapBridge {

    private caculate = new Subject<TripItem[]>();
    caculate$ = this.caculate.asObservable();

    calculateTotalDistance(tripItems: TripItem[]) {
        this.caculate.next(tripItems);
    }
}