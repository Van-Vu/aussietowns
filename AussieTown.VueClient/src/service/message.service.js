import http from './http-base';
var MessageService = (function () {
    function MessageService() {
        this.getConversationByUserIdUrl = 'api/message/user/';
        this.getMessagesByConversationIdUrl = 'api/message/conversation/';
    }
    MessageService.prototype.getConversations = function (userId) {
        return http.get(this.getConversationByUserIdUrl + userId)
            .then(function (response) {
            return response.data;
        });
    };
    MessageService.prototype.getConversationContent = function (conversationId) {
        return http.get(this.getMessagesByConversationIdUrl + conversationId)
            .then(function (response) {
            return response.data;
        });
    };
    return MessageService;
}());
export default MessageService;
