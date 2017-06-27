import Vue from "vue";
import { Component, Inject, Watch, Prop } from "vue-property-decorator";
import ListingCardComponent from '../shared/listingcard.component.vue';
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
    conversations: ConversationModel[] = new Array<ConversationModel>();
    conversationsContent: MessageModel[] = new Array<MessageModel>();
    test: any[];
    cookieValue: string;
    $cookie: any;
    profileId: number;

    created(): void {
        this.profileId = (this.$route.params as any).profileId;

        if (this.$store.state.conversations.length > 0) {
            this.conversations = this.$store.state.conversations;
        } else {
            this.$store.dispatch('FETCH_CONVERSATIONS_BY_USER', this.profileId).then(() => {
                this.conversations = this.$store.state.conversations;
            });
        }

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
            });
        //}        
    }

    messageBubble(message) {
        if (message.user.id == this.profileId) {
            return "talk-bubble-main";
        }

        return "talk-bubble";
    }
}
