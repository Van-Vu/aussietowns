import { Utils } from '../component/utils';
var UserModel = (function () {
    function UserModel() {
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
    return UserModel;
}());
export default UserModel;
