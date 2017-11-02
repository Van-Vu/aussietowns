import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { UserService } from '../../services/user.service';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { User } from '../../model/user';

@Component({
    selector: 'profilesearch',
    template: require('./profilesearch.component.html'),
    styles: [require('./profilesearch.component.css')]
})
export class ProfileSearchComponent {
    @ViewChild("searchBox") searchBox;

    @Output() addedUser: EventEmitter<User> = new EventEmitter<User>();

    miniProfile: Observable<any[]>;
    private searchTerms = new Subject<string>();

    constructor(private userService: UserService) { }

    search(term: string): void {
        // Push a search term into the observable stream.
        this.searchTerms.next(term);
    }

    ngOnInit(): void {
        this.miniProfile = this.searchTerms
            .debounceTime(300)        // wait for 300ms pause in events
            .distinctUntilChanged()   // ignore if next search term is same as previous
            .switchMap(term => term   // switch to new observable each time
                // return the http search observable
                ? this.userService.search(term)
                // or the observable of empty heroes if no search term
                : Observable.of<any[]>([]))
            .catch(error => {
                // TODO: real error handling
                console.log(`Error in component ... ${error}`);
                return Observable.of<any[]>([]);
            });

        let abs = this.miniProfile;
    }

    onAdd(profile) {
        this.addedUser.emit(profile);
        this.searchBox.nativeElement.value = '';
        this.searchTerms.next('');
    }
}