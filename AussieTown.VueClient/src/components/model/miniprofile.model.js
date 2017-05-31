var MiniProfile = (function () {
    function MiniProfile(id, fullname, email, profileurl, photourl, description) {
        this.id = id;
        this.fullname = fullname;
        this.email = email;
        this.profileUrl = profileurl;
        this.photoUrl = photourl;
        this.shortDescription = description;
    }
    return MiniProfile;
}());
export default MiniProfile;
