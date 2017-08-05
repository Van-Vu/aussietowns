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
export var RepeatedDay;
(function (RepeatedDay) {
    RepeatedDay[RepeatedDay["Monday"] = 1] = "Monday";
    RepeatedDay[RepeatedDay["Tuesday"] = 2] = "Tuesday";
    RepeatedDay[RepeatedDay["Wednesday"] = 4] = "Wednesday";
    RepeatedDay[RepeatedDay["Thursday"] = 8] = "Thursday";
    RepeatedDay[RepeatedDay["Friday"] = 16] = "Friday";
    RepeatedDay[RepeatedDay["Saturday"] = 32] = "Saturday";
    RepeatedDay[RepeatedDay["Sunday"] = 64] = "Sunday";
})(RepeatedDay || (RepeatedDay = {}));
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
export var NotificationType;
(function (NotificationType) {
    NotificationType["Success"] = "is-success";
    NotificationType["Warning"] = "is-warning";
    NotificationType["Error"] = "is-error";
})(NotificationType || (NotificationType = {}));
export var ScreenSize;
(function (ScreenSize) {
    ScreenSize[ScreenSize["Desktop"] = 0] = "Desktop";
    ScreenSize[ScreenSize["Tablet"] = 1] = "Tablet";
    ScreenSize[ScreenSize["Mobile"] = 2] = "Mobile";
})(ScreenSize || (ScreenSize = {}));
