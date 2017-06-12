﻿import http from './http-base';

export default class MessageService {
    private getConversationByUserIdUrl = 'api/message/user/';
    private getMessagesByConversationIdUrl = 'api/message/conversation/';

    getConversations(userId: number) {
        return http.get(this.getConversationByUserIdUrl + userId)
            .then(response => {
                return response.data;
            });
    }

    getConversationContent(conversationId: number) {
        return http.get(this.getMessagesByConversationIdUrl + conversationId)
            .then(response => {
                return response.data;
            });
    }
}