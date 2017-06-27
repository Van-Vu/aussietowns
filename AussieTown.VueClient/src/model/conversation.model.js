import { Utils } from '../component/utils';
var ConversationModel = (function () {
    function ConversationModel() {
        if (this.lastMessageTime) {
            this.lastMessageFormat = Utils.getDateTime(this.lastMessageTime);
        }
    }
    return ConversationModel;
}());
export default ConversationModel;
