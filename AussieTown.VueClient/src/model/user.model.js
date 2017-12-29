import { Utils } from '../component/utils';
var UserModel = /** @class */ (function () {
    // Booking page needs to create empty object
    function UserModel() {
        this.id = 50;
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.phone = '';
        this.emergencyContact = '';
        this.address = '';
    }
    Object.defineProperty(UserModel.prototype, "birthdayText", {
        get: function () {
            return Utils.formatDate(new Date(this.birthday));
        },
        set: function (value) {
            this.birthday = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserModel.prototype, "descriptionText", {
        get: function () {
            return this.description ? Utils.stripHtml(this.description).replace(/\n/g, '<br/>') : '';
        },
        set: function (value) {
            this.description = value;
        },
        enumerable: true,
        configurable: true
    });
    return UserModel;
}());
export default UserModel;
