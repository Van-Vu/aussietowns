export var ListingType;
(function (ListingType) {
    ListingType[ListingType["Offer"] = 0] = "Offer";
    ListingType[ListingType["Request"] = 1] = "Request";
})(ListingType || (ListingType = {}));
export var RepeatedType;
(function (RepeatedType) {
    RepeatedType[RepeatedType["None"] = 0] = "None";
    RepeatedType[RepeatedType["Daily"] = 1] = "Daily";
    RepeatedType[RepeatedType["Weekly"] = 2] = "Weekly";
    RepeatedType[RepeatedType["Monthly"] = 3] = "Monthly";
})(RepeatedType || (RepeatedType = {}));
export var UserSource;
(function (UserSource) {
    UserSource[UserSource["Native"] = 0] = "Native";
    UserSource[UserSource["Facebook"] = 1] = "Facebook";
    UserSource[UserSource["Google"] = 2] = "Google";
})(UserSource || (UserSource = {}));
export var UserRole;
(function (UserRole) {
    UserRole[UserRole["User"] = 1] = "User";
    UserRole[UserRole["Editor"] = 2] = "Editor";
    UserRole[UserRole["Admin"] = 4] = "Admin";
    UserRole[UserRole["SuperAdmin"] = 8] = "SuperAdmin";
})(UserRole || (UserRole = {}));
