export var ListingType;
(function (ListingType) {
    ListingType[ListingType["Offer"] = 0] = "Offer";
    ListingType[ListingType["Request"] = 1] = "Request";
})(ListingType = ListingType || (ListingType = {}));
export var RepeatedType;
(function (RepeatedType) {
    RepeatedType[RepeatedType["None"] = 0] = "None";
    RepeatedType[RepeatedType["Daily"] = 1] = "Daily";
    RepeatedType[RepeatedType["Weekly"] = 2] = "Weekly";
    RepeatedType[RepeatedType["Monthly"] = 3] = "Monthly";
})(RepeatedType = RepeatedType || (RepeatedType = {}));
export var RepeatedDay;
(function (RepeatedDay) {
    RepeatedDay[RepeatedDay["Monday"] = 1] = "Monday";
    RepeatedDay[RepeatedDay["Tuesday"] = 2] = "Tuesday";
    RepeatedDay[RepeatedDay["Wednesday"] = 4] = "Wednesday";
    RepeatedDay[RepeatedDay["Thursday"] = 8] = "Thursday";
    RepeatedDay[RepeatedDay["Friday"] = 16] = "Friday";
    RepeatedDay[RepeatedDay["Saturday"] = 32] = "Saturday";
    RepeatedDay[RepeatedDay["Sunday"] = 64] = "Sunday";
})(RepeatedDay = RepeatedDay || (RepeatedDay = {}));
export var UserSource;
(function (UserSource) {
    UserSource[UserSource["Native"] = 0] = "Native";
    UserSource[UserSource["Facebook"] = 1] = "Facebook";
    UserSource[UserSource["Google"] = 2] = "Google";
})(UserSource = UserSource || (UserSource = {}));
export var UserRole;
(function (UserRole) {
    UserRole[UserRole["Anonymous"] = 0] = "Anonymous";
    UserRole[UserRole["User"] = 1] = "User";
    UserRole[UserRole["Editor"] = 2] = "Editor";
    UserRole[UserRole["Admin"] = 4] = "Admin";
    UserRole[UserRole["SuperAdmin"] = 8] = "SuperAdmin";
})(UserRole = UserRole || (UserRole = {}));
export var UserAction;
(function (UserAction) {
    UserAction[UserAction["View"] = 0] = "View";
    UserAction[UserAction["Edit"] = 1] = "Edit";
    UserAction[UserAction["Delete"] = 2] = "Delete";
})(UserAction = UserAction || (UserAction = {}));
export var NotificationType;
(function (NotificationType) {
    NotificationType["Success"] = "is-success";
    NotificationType["Warning"] = "is-warning";
    NotificationType["Error"] = "is-error";
})(NotificationType = NotificationType || (NotificationType = {}));
export var ScreenSize;
(function (ScreenSize) {
    ScreenSize[ScreenSize["Desktop"] = 0] = "Desktop";
    ScreenSize[ScreenSize["Tablet"] = 1] = "Tablet";
    ScreenSize[ScreenSize["Mobile"] = 2] = "Mobile";
})(ScreenSize = ScreenSize || (ScreenSize = {}));
export var ArticleCategory;
(function (ArticleCategory) {
    ArticleCategory[ArticleCategory["Blog"] = 0] = "Blog";
    ArticleCategory[ArticleCategory["WhatsOn"] = 1] = "WhatsOn";
    ArticleCategory[ArticleCategory["Introduction"] = 2] = "Introduction";
})(ArticleCategory = ArticleCategory || (ArticleCategory = {}));
export var ArticleStatus;
(function (ArticleStatus) {
    ArticleStatus[ArticleStatus["Draft"] = 0] = "Draft";
    ArticleStatus[ArticleStatus["Publish"] = 1] = "Publish";
    ArticleStatus[ArticleStatus["Archive"] = 2] = "Archive";
})(ArticleStatus = ArticleStatus || (ArticleStatus = {}));
