import MiniProfile from './miniprofile.model';

export default class MessageModel {
    public id: number;
    public conversationId: number;
    public user: MiniProfile;
    public time: Object;
    public messageContent: string;
}