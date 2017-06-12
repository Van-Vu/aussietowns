import { Utils } from '../shared/utils';
var ConversationModel = (function () {
    function ConversationModel() {
    }
    Object.defineProperty(ConversationModel.prototype, "lastMessageFormat", {
        get: function () {
            return Utils.getDateTime(this.lastMessageTime);
        },
        enumerable: true,
        configurable: true
    });
    return ConversationModel;
}());
export default ConversationModel;
