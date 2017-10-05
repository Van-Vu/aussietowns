import { Utils } from '../component/utils';
var ConversationModel = /** @class */ (function () {
    function ConversationModel() {
    }
    Object.defineProperty(ConversationModel.prototype, "lastMessageFormat", {
        get: function () {
            return this.lastMessageTime ? Utils.getDateTime(this.lastMessageTime) : '';
        },
        enumerable: true,
        configurable: true
    });
    return ConversationModel;
}());
export default ConversationModel;
