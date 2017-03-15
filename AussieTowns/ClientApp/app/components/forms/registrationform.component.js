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
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var ng2_completer_1 = require("ng2-completer");
var modalframe_component_1 = require("./modalframe.component");
var email_validator_1 = require("../../shared/email.validator");
var alert_service_1 = require("../../services/alert.service");
var user_service_1 = require("../../services/user.service");
var RegistrationFormComponent = (function () {
    function RegistrationFormComponent(fb, completerService, userService, alertService, router) {
        this.fb = fb;
        this.completerService = completerService;
        this.userService = userService;
        this.alertService = alertService;
        this.router = router;
        this.powers = ['Really Smart', 'Super Flexible',
            'Super Hot', 'Weather Changer'];
        this.loading = false;
        this.searchData = [
            { color: 'red', value: '#f00' },
            { color: 'green', value: '#0f0' },
            { color: 'blue', value: '#00f' },
            { color: 'cyan', value: '#0ff' },
            { color: 'magenta', value: '#f0f' },
            { color: 'yellow', value: '#ff0' },
            { color: 'black', value: '#000' }
        ];
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
        this.dataService = completerService.local(this.searchData, 'color', 'color');
    }
    RegistrationFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.model = this.fb.group({
            FirstName: ['', [forms_1.Validators.required, forms_1.Validators.minLength(2)]],
            LastName: ['', [forms_1.Validators.required, forms_1.Validators.minLength(2)]],
            Location: ['', [forms_1.Validators.required, forms_1.Validators.minLength(2)]],
            Email: ['', [email_validator_1.forbiddenNameValidator()]],
            Password: ['', [forms_1.Validators.required, forms_1.Validators.minLength(7)]],
            Phone: ['', [forms_1.Validators.required, forms_1.Validators.minLength(2)]]
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
            _this.router.navigate(['/login']);
            _this.modal.hide();
        }, function (error) {
            _this.alertService.error(error._body);
            _this.loading = false;
        });
        //this.userService.getUserInfo().subscribe(
        //    data => {
        //        var abc = data;
        //    }
        //);
    };
    RegistrationFormComponent.prototype.newHero = function () {
        this.model = this.fb.group({
            FirstName: ['', [forms_1.Validators.required, forms_1.Validators.minLength(2)]],
            LastName: ['', [forms_1.Validators.required, forms_1.Validators.minLength(2)]],
            Location: ['', [forms_1.Validators.required, forms_1.Validators.minLength(2)]],
            Email: ['', [email_validator_1.forbiddenNameValidator()]],
            Password: ['', [forms_1.Validators.required, forms_1.Validators.minLength(7)]],
            Phone: ['', [forms_1.Validators.required, forms_1.Validators.minLength(2)]]
        });
    };
    RegistrationFormComponent.prototype.show = function () {
        this.modal.show();
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
    return RegistrationFormComponent;
}());
__decorate([
    core_1.ViewChild(modalframe_component_1.ModalFrameComponent),
    __metadata("design:type", modalframe_component_1.ModalFrameComponent)
], RegistrationFormComponent.prototype, "modal", void 0);
RegistrationFormComponent = __decorate([
    core_1.Component({
        selector: 'registrationform',
        template: require('./registrationform.component.html'),
        styles: [require('./registrationform.component.css')]
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, ng2_completer_1.CompleterService,
        user_service_1.UserService, alert_service_1.AlertService, router_1.Router])
], RegistrationFormComponent);
exports.RegistrationFormComponent = RegistrationFormComponent;
//# sourceMappingURL=registrationform.component.js.map