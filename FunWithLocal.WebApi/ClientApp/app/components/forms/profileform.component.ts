import { Component, ElementRef, AfterViewInit} from '@angular/core';
import { isBrowser } from 'angular2-universal';
import { User } from '../../model/user'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { forbiddenNameValidator } from '../../shared/email.validator';

import { UserService } from '../../services/user.service';

import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe.js'
import emailMask from 'text-mask-addons/dist/emailMask.js';

import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../../services/search.service';

@Component({
    selector: 'profileform',
    template: require('./profileform.component.html'),
    styles: [require('./profileform.component.css')]
})

export class ProfileFormComponent implements AfterViewInit{
    //Bodom: doesn't work on refresh'

    model: FormGroup;
    public get dateMask(): any { return [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]; }
    public get autoCorrectedDatePipe(): any { return createAutoCorrectedDatePipe('mm/dd/yyyy'); }
    myEmailMask: any;
    phoneNumberMask: any;
    private sub: any;
    profileId: number = 0;
    searchLocations: any;

    constructor(private fb: FormBuilder, private userService: UserService, private route: ActivatedRoute,
        private sanitizer: DomSanitizer, private element: ElementRef, private searchService: SearchService) { }

    ngOnInit() {
        this.model = this.fb.group({
            id: [''],
            email: ['', [forbiddenNameValidator()]],
            password: ['', [Validators.required, Validators.minLength(7)]],
            firstName: ['', [Validators.required, Validators.minLength(2)]],
            lastName: ['', [Validators.required, Validators.minLength(2)]],
            phone: [''],
            locationId: [''],
            gender: [''],
            birthday: [''],
            description: [''],
            address: [''],
            emergencyContact: [''],
            photo: [''],
            video: ['']
        });

        this.model.valueChanges
            .subscribe(data => this.onValueChanged(data));

        this.onValueChanged(); // (re)set validation messages now

        this.phoneNumberMask = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
        this.myEmailMask = emailMask;
        if (isBrowser) {
            //this.showCam();
        }
    }

    private ngOnDestroy() {
        this.sub.unsubscribe();
    }

    ngAfterViewInit() {
        this.sub = this.route.params.subscribe(params => {
            this.profileId = +params['id'] | 0; // (+) converts string 'id' to a number
            if (this.profileId > 0) {
                if (isBrowser) {
                    this.userService.getUserInfo(this.profileId).subscribe(
                        data => {
                            this.model = this.fb.group({
                                id: [data.id],
                                email: [data.email, [forbiddenNameValidator()]],
                                password: [data.password, [Validators.required, Validators.minLength(7)]],
                                firstName: [data.firstName, [Validators.required, Validators.minLength(2)]],
                                lastName: [data.lastName, [Validators.required, Validators.minLength(2)]],
                                phone: [data.phone],
                                locationId: [data.location],
                                gender: [data.gender],
                                birthday: [data.birthday],
                                description: [data.description],
                                address: [data.address],
                                emergencyContact: [data.emergencyContact],
                                photo: [data.photoUrl],
                                video: [data.videoUrl]
                            });
                        });
                }
            }
        });

    }

    onLocationSearch(search) {
        this.searchService.autoComplete(search).subscribe((response: any) => {
            this.searchLocations = response;
        });
    }

    public videosrc: any;

    private showCam() {
        // 1. Casting necessary because TypeScript doesn't
        // know object Type 'navigator';
        let nav = <any>navigator;

        // 2. Adjust for all browsers
        nav.getUserMedia = nav.getUserMedia || nav.mozGetUserMedia || nav.webkitGetUserMedia;

        //// 3. Trigger lifecycle tick (ugly, but works - see (better) Promise example below)
        ////setTimeout(() => { }, 100);

        //// 4. Get stream from webcam
        //nav.getUserMedia(
        //    { video: true },
        //    (stream) => {
        //        let webcamUrl = URL.createObjectURL(stream);

        //        // 4a. Tell Angular the stream comes from a trusted source
        //        this.videosrc = this.sanitizer.bypassSecurityTrustUrl(webcamUrl);

        //        // 4b. Start video element to stream automatically from webcam.
        //        this.element.nativeElement.querySelector('video').autoplay = true;
        //    },
        //    (err) => console.log(err));


        // OR: other method, see http://stackoverflow.com/questions/32645724/angular2-cant-set-video-src-from-navigator-getusermedia for credits
        var promise = new Promise<string>((resolve, reject) => {
            nav.getUserMedia({ video: true }, (stream) => {
                resolve(stream);
            }, (err) => {
                alert(err);
                reject(err);
            });
        }).then((stream) => {
            let webcamUrl = URL.createObjectURL(stream);
            this.videosrc = this.sanitizer.bypassSecurityTrustResourceUrl(webcamUrl);
            // for example: type logic here to send stream to your  server and (re)distribute to
            // other connected clients.
        }).catch((error) => {
            console.log(error);
        });
    }

    capture(): void {
        let video = <any>document.getElementsByTagName('video')[0];
        let canvas = <any>document.getElementsByTagName('canvas')[0];
        if (video) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext('2d').drawImage(video, 0, 0);
        }
    }

    submitted = false;
    onUpdate() {
        this.userService.update(this.model.value)
            .subscribe(
            data => {
                if (data.State == 1) {
                }
                else {
                    alert(data.Msg);
                }

                console.log(data.Data);
            },
            error => {

            });
    }

    onValueChanged(data?: any) {
        if (!this.model) { return; }
        const form = this.model;

        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);

            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }

    formErrors = {
        'Email': ''
    };

    validationMessages = {
        'Email': {
            'required': 'Name is required.',
            'minlength': 'Name must be at least 4 characters long.',
            'maxlength': 'Name cannot be more than 24 characters long.',
            'forbiddenName': 'Invalid email.'
        }
    };
}
