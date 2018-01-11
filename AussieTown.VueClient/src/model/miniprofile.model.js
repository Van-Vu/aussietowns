var MiniProfile = /** @class */ (function () {
    function MiniProfile(id, fullname, email, profileurl, photourl, description, isPrimary) {
        this.id = id;
        this.fullname = fullname;
        this.email = email;
        this.profileUrl = profileurl;
        this.photoUrl = photourl;
        this.shortDescription = description;
        this.isPrimary = isPrimary;
    }
    return MiniProfile;
}());
export default MiniProfile;
