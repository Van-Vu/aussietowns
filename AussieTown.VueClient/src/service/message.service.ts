import http from './http-base';

export default class MessageService {
    private getConversationByUserIdUrl = 'api/message/user/';
    private getMessagesByConversationIdUrl = 'api/message/conversation/';
    private sendMessageUrl = 'api/message/conversation';
    private sendEnquiryUrl = 'api/message/enquire';

    getConversations(userId: number) {
        return http.get(this.getConversationByUserIdUrl + userId)
            .then(response => response);
    }

    getConversationContent(conversationId: number) {
        return http.get(this.getMessagesByConversationIdUrl + conversationId)
            .then(response => response);
    }

    sendMessage(message) {
        return http.post(this.sendMessageUrl, message)
            .then(response => response);
    }

    sendEnquiry(enquiry) {
        return http.post(this.sendEnquiryUrl, enquiry)
            .then(response => response);
    }
}