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
    }

    get lastMessageFormat(): string {
        return this.lastMessageTime ? Utils.getDateTime(this.lastMessageTime) : '';
    }
}