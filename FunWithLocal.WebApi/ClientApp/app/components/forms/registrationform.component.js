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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var email_validator_1 = require("../../shared/email.validator");
var alert_service_1 = require("../../services/alert.service");
var user_service_1 = require("../../services/user.service");
var search_service_1 = require("../../services/search.service");
var RegistrationFormComponent = /** @class */ (function () {
    function RegistrationFormComponent(fb, userService, alertService, router, searchService) {
        this.fb = fb;
        this.userService = userService;
        this.alertService = alertService;
        this.router = router;
        this.searchService = searchService;
        this.isRegistered = new core_1.EventEmitter();
        this.powers = ['Really Smart', 'Super Flexible',
            'Super Hot', 'Weather Changer'];
        this.loading = false;
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
            },
            'power': {
                'required': 'Power is required.'
            }
        };
    }
    RegistrationFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.model = this.fb.group({
            firstName: ['', [forms_1.Validators.required, forms_1.Validators.minLength(2)]],
            lastName: ['', [forms_1.Validators.required, forms_1.Validators.minLength(2)]],
            locationId: ['', [forms_1.Validators.required, forms_1.Validators.minLength(2)]],
            email: ['', [email_validator_1.forbiddenNameValidator()]],
            password: ['', [forms_1.Validators.required, forms_1.Validators.minLength(7)]],
            phone: ['', [forms_1.Validators.required, forms_1.Validators.minLength(2)]]
        });
        this.model.valueChanges
            .subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged(); // (re)set validation messages now
    };
    RegistrationFormComponent.prototype.onRegistration = function (_a) {
        var _this = this;
        var value = _a.value, valid = _a.valid;
        this.submitted = true;
        //console.log(value, valid);
        this.loading = true;
        this.userService.create(this.model.value)
            .subscribe(function (data) {
            _this.alertService.success('Registration successful', true);
            //this.router.navigate(['/login']);
            _this.isRegistered.emit(true);
        }, function (error) {
            _this.alertService.error(error._body);
            _this.loading = false;
            _this.isRegistered.emit(false);
        });
        //this.userService.getUserInfo().subscribe(
        //    data => {
        //        var abc = data;
        //    }
        //);
    };
    RegistrationFormComponent.prototype.onLocationSearch = function (search) {
        var _this = this;
        this.searchService.autoComplete(search).subscribe(function (response) {
            _this.searchLocations = response;
        });
    };
    RegistrationFormComponent.prototype.onValueChanged = function (data) {
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
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], RegistrationFormComponent.prototype, "isRegistered", void 0);
    RegistrationFormComponent = __decorate([
        core_1.Component({
            selector: 'registrationform',
            template: require('./registrationform.component.html'),
            styles: [require('./registrationform.component.css')]
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, user_service_1.UserService,
            alert_service_1.AlertService, router_1.Router, search_service_1.SearchService])
    ], RegistrationFormComponent);
    return RegistrationFormComponent;
}());
exports.RegistrationFormComponent = RegistrationFormComponent;
//# sourceMappingURL=registrationform.component.js.map