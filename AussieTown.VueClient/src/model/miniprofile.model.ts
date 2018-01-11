export default class MiniProfile {
    public id: number;
    public fullname: string;
    public email: string;
    public profileUrl: string;
    public photoUrl: string;
    public shortDescription: string;
    public isPrimary: boolean;

    constructor(id,fullname,email,profileurl,photourl,description,isPrimary) {
        this.id = id; 
        this.fullname = fullname;
        this.email = email;
        this.profileUrl = profileurl;
        this.photoUrl = photourl;
        this.shortDescription = description;
        this.isPrimary = isPrimary;
    }
}