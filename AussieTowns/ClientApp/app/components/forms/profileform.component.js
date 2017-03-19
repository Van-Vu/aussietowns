"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var angular2_universal_1 = require("angular2-universal");
var forms_1 = require("@angular/forms");
var email_validator_1 = require("../../shared/email.validator");
var user_service_1 = require("../../services/user.service");
var createAutoCorrectedDatePipe_js_1 = require("text-mask-addons/dist/createAutoCorrectedDatePipe.js");
var emailMask_js_1 = require("text-mask-addons/dist/emailMask.js");
var platform_browser_1 = require("@angular/platform-browser");
var ProfileFormComponent = (function () {
    function ProfileFormComponent(fb, userService, sanitizer, element) {
        this.fb = fb;
        this.userService = userService;
        this.sanitizer = sanitizer;
        this.element = element;
        this.submitted = false;
        this.formErrors = {
            'Email': ''
        };
        this.validationMessages = {
            'Email': {
                'required': 'Name is required.',
                'minlength': 'Name must be at least 4 characters long.',
                'maxlength': 'Name cannot be more than 24 characters long.',
                'forbiddenName': 'Invalid email.'
            }
        };
    }
    Object.defineProperty(ProfileFormComponent.prototype, "dateMask", {
        get: function () { return [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProfileFormComponent.prototype, "autoCorrectedDatePipe", {
        get: function () { return createAutoCorrectedDatePipe_js_1.default('mm/dd/yyyy'); },
        enumerable: true,
        configurable: true
    });
    ProfileFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.model = this.fb.group({
            Id: [''],
            Email: ["asdfadsfa@adfasd.com", [email_validator_1.forbiddenNameValidator()]],
            Password: ['', [forms_1.Validators.required, forms_1.Validators.minLength(7)]],
            FirstName: ['', [forms_1.Validators.required, forms_1.Validators.minLength(2)]],
            LastName: ['', [forms_1.Validators.required, forms_1.Validators.minLength(2)]],
            Phone: [''],
            Location: [''],
            Gender: [''],
            Birthday: [''],
            Description: [''],
            Address: [''],
            EmergencyContact: [''],
            Photo: [''],
            Video: ['']
        });
        this.model.valueChanges
            .subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged(); // (re)set validation messages now
        this.phoneNumberMask = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
        this.myEmailMask = emailMask_js_1.default;
        if (angular2_universal_1.isBrowser) {
        }
    };
    ProfileFormComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (angular2_universal_1.isBrowser) {
            this.userService.getUserInfo().subscribe(function (data) {
                _this.model = _this.fb.group({
                    Id: [data.Data.Id],
                    Email: [data.Data.Email, [email_validator_1.forbiddenNameValidator()]],
                    Password: [data.Data.Password, [forms_1.Validators.required, forms_1.Validators.minLength(7)]],
                    FirstName: [data.Data.FirstName, [forms_1.Validators.required, forms_1.Validators.minLength(2)]],
                    LastName: [data.Data.LastName, [forms_1.Validators.required, forms_1.Validators.minLength(2)]],
                    Phone: [data.Data.Phone],
                    Location: [data.Data.Location],
                    Gender: [data.Data.Gender],
                    Birthday: [data.Data.Birthday],
                    Description: [data.Data.Description],
                    Address: [data.Data.Address],
                    EmergencyContact: [data.Data.EmergencyContact],
                    Photo: [data.Data.PhotoUrl],
                    Video: [data.Data.VideoUrl]
                });
            });
        }
    };
    ProfileFormComponent.prototype.showCam = function () {
        var _this = this;
        // 1. Casting necessary because TypeScript doesn't
        // know object Type 'navigator';
        var nav = navigator;
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
        var promise = new Promise(function (resolve, reject) {
            nav.getUserMedia({ video: true }, function (stream) {
                resolve(stream);
            }, function (err) {
                alert(err);
                reject(err);
            });
        }).then(function (stream) {
            var webcamUrl = URL.createObjectURL(stream);
            _this.videosrc = _this.sanitizer.bypassSecurityTrustResourceUrl(webcamUrl);
            // for example: type logic here to send stream to your  server and (re)distribute to
            // other connected clients.
        }).catch(function (error) {
            console.log(error);
        });
    };
    ProfileFormComponent.prototype.capture = function () {
        var video = document.getElementsByTagName('video')[0];
        var canvas = document.getElementsByTagName('canvas')[0];
        if (video) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext('2d').drawImage(video, 0, 0);
        }
    };
    ProfileFormComponent.prototype.onUpdate = function () {
        this.userService.update(this.model.value)
            .subscribe(function (data) {
            if (data.State == 1) {
            }
            else {
                alert(data.Msg);
            }
            console.log(data.Data);
        }, function (error) {
        });
    };
    ProfileFormComponent.prototype.onValueChanged = function (data) {
        if (!this.model) {
            return;
        }
        var form = this.model;
        for (var field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            var control = form.get(field);
            if (control && control.dirty && !control.valid) {
                var messages = this.validationMessages[field];
                for (var key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    };
    return ProfileFormComponent;
}());
ProfileFormComponent = __decorate([
    core_1.Component({
        selector: 'profileform',
        template: require('./profileform.component.html'),
        styles: [require('./profileform.component.css')]
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, user_service_1.UserService, platform_browser_1.DomSanitizer, core_1.ElementRef])
], ProfileFormComponent);
exports.ProfileFormComponent = ProfileFormComponent;
//# sourceMappingURL=profileform.component.js.map