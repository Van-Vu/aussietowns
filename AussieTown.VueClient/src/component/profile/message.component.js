var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Vue from "vue";
import { Component } from "vue-property-decorator";
import MiniProfileComponent from '../shared/miniprofile.component.vue';
var MessageComponent = /** @class */ (function (_super) {
    __extends(MessageComponent, _super);
    function MessageComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.conversationsContent = new Array();
        _this.isShowConversationContent = false;
        _this.sendingMessage = '';
        _this.currentConversation = 0;
        return _this;
    }
    MessageComponent.asyncData = function (_a) {
        var store = _a.store, route = _a.route;
        if (route.params.profileId) {
            return store.dispatch('FETCH_CONVERSATIONS_BY_USER', route.params.profileId);
        }
    };
    Object.defineProperty(MessageComponent.prototype, "conversations", {
        get: function () {
            return this.$store.state.conversations;
        },
        enumerable: true,
        configurable: true
    });
    MessageComponent.prototype.created = function () {
        this.profileId = this.$route.params.profileId;
        //this.cookieValue = this.$cookie.get('bodomtest');
        //if (this.$store.state.conversationsContent) {
        //    this.conversationsContent = this.$store.state.conversationsContent;
        //}
    };
    MessageComponent.prototype.openConversation = function (conversation) {
        var _this = this;
        //var data = this.conversations;
        //for (var i = 0; i < data.length; i++) {
        this.$store.dispatch('FETCH_CONVERSATION_CONTENT', conversation.id).then(function () {
            _this.conversationsContent = _this.$store.state.conversationsContent;
            _this.currentConversation = conversation.id;
        });
        this.isShowConversationContent = true;
        //}        
    };
    MessageComponent.prototype.sendMessage = function () {
        var _this = this;
        this.$store.dispatch('SEND_MESSAGE', {
            conversationId: this.currentConversation,
            userId: this.profileId,
            messageContent: this.sendingMessage
        })
            .then(function () {
            _this.sendingMessage = '';
            if (process.env.NODE_ENV !== 'production') {
                console.log('send message success!');
            }
        });
    };
    MessageComponent.prototype.messageBubble = function (message) {
        if (message.userId == this.profileId) {
            return "talk-bubble-main";
        }
        return "talk-bubble";
    };
    MessageComponent = __decorate([
        Component({
            name: "MessageComponent",
            components: {
                "miniprofile": MiniProfileComponent
            }
        })
    ], MessageComponent);
    return MessageComponent;
}(Vue));
export default MessageComponent;
