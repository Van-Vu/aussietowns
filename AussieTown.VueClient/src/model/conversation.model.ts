import MiniProfile from './miniprofile.model';
import { Utils } from '../component/utils';

export default class ConversationModel {
    public id: number;
    public userOneId: number;
    public userOne: MiniProfile;
    public userTwoId: number;
    public userTwo: MiniProfile;
    public lastMessageTime: Object;
    public messageContent: string;

    constructor() {
        if (this.lastMessageTime) {
            //this.lastMessageFormat = Utils.getDateTime(this.lastMessageTime);
        }
    }
}