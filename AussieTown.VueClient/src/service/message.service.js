import http from './http-base';
var MessageService = /** @class */ (function () {
    function MessageService() {
        this.getConversationByUserIdUrl = 'api/message/user/';
        this.getMessagesByConversationIdUrl = 'api/message/conversation/';
        this.sendMessageUrl = 'api/message/conversation';
        this.sendEnquiryUrl = 'api/message/enquire';
    }
    MessageService.prototype.getConversations = function (userId) {
        return http.get(this.getConversationByUserIdUrl + userId)
            .then(function (response) { return response; });
    };
    MessageService.prototype.getConversationContent = function (conversationId) {
        return http.get(this.getMessagesByConversationIdUrl + conversationId)
            .then(function (response) { return response; });
    };
    MessageService.prototype.sendMessage = function (message) {
        return http.post(this.sendMessageUrl, message)
            .then(function (response) { return response; });
    };
    MessageService.prototype.sendEnquiry = function (enquiry) {
        return http.post(this.sendEnquiryUrl, enquiry)
            .then(function (response) { return response; });
    };
    return MessageService;
}());
export default MessageService;
