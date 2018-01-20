import Vue from "vue";
import { Component, Inject, Watch, Prop } from "vue-property-decorator";
import ConversationModel from '../../model/conversation.model';
import MiniProfileComponent from '../shared/miniprofile.component.vue'
import MessageModel from '../../model/message.model';

@Component({
    name: "MessageComponent",
    components: {
        "miniprofile": MiniProfileComponent
    }
})

export default class MessageComponent extends Vue {
    conversationsContent: MessageModel[] = new Array<MessageModel>();
    test: any[];
    cookieValue: string;
    profileId: number;
    isShowConversationContent: boolean = false;
    sendingMessage: string = '';
    currentConversation: number = 0;

    static asyncData({ store, route }) {
        if (route.params.profileId) {
            return store.dispatch('FETCH_CONVERSATIONS_BY_USER', route.params.profileId);
        }
    }

    get conversations() {
        return this.$store.state.conversations;
    }

    created(): void {
        this.profileId = (this.$route.params as any).profileId;

        //this.cookieValue = this.$cookie.get('bodomtest');

        //if (this.$store.state.conversationsContent) {
        //    this.conversationsContent = this.$store.state.conversationsContent;
        //}
    }

    openConversation(conversation) {
        //var data = this.conversations;
        //for (var i = 0; i < data.length; i++) {
        this.$store.dispatch('FETCH_CONVERSATION_CONTENT', conversation.id).then(() => {
            this.conversationsContent = this.$store.state.conversationsContent;
            this.currentConversation = conversation.id;
        });

        this.isShowConversationContent = true;
        //}        
    }

    sendMessage() {
        this.$store.dispatch('SEND_MESSAGE',
            {
                conversationId: this.currentConversation,
                userId: this.profileId,
                messageContent: this.sendingMessage
            })
            .then(() => {
                this.sendingMessage = '';
                if (process.env.NODE_ENV !== 'production') {
                    console.log('send message success!');
                }
            });
    }

    messageBubble(message) {
        if (message.userId == this.profileId) {
            return "talk-bubble-main";
        }

        return "talk-bubble";
    }
}
