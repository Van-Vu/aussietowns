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
var forms_1 = require("@angular/forms");
var email_validator_1 = require("../../shared/email.validator");
var user_service_1 = require("../../services/user.service");
var LoginFormComponent = /** @class */ (function () {
    function LoginFormComponent(fb, userService) {
        this.fb = fb;
        this.userService = userService;
        this.isLoggedIn = new core_1.EventEmitter();
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
    LoginFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.model = this.fb.group({
            email: ['', [email_validator_1.forbiddenNameValidator()]],
            password: ['', [forms_1.Validators.required, forms_1.Validators.minLength(7)]],
        });
        this.model.valueChanges
            .subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged(); // (re)set validation messages now
    };
    LoginFormComponent.prototype.onLogin = function () {
        var _this = this;
        this.userService.login(this.model.value)
            .subscribe(function (data) { return _this.isLoggedIn.emit({ id: data.userId, name: data.username }); }, function (error) {
        });
    };
    LoginFormComponent.prototype.onValueChanged = function (data) {
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
    ], LoginFormComponent.prototype, "isLoggedIn", void 0);
    LoginFormComponent = __decorate([
        core_1.Component({
            selector: 'loginform',
            template: require('./loginform.component.html'),
            styles: [require('./loginform.component.css')]
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, user_service_1.UserService])
    ], LoginFormComponent);
    return LoginFormComponent;
}());
exports.LoginFormComponent = LoginFormComponent;
//# sourceMappingURL=loginform.component.js.map