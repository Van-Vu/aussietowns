export enum ListingType { Offer, Request }

export enum RepeatedType { None, Daily, Weekly, Monthly }

export enum RepeatedDay { Monday = 1, Tuesday = 2, Wednesday = 3, Thursday = 4 , Friday = 5, Saturday = 6, Sunday = 0 }

export enum UserSource { Native, Facebook, Google }

export enum UserRole { Anonymous = 0, User = 1, Editor = 2, Admin = 4, SuperAdmin = 8 }

export enum UserAction { View, Edit, Delete }

export enum NotificationType { Success = 'is-success', Warning = 'is-warning', Error = 'is-error' }

export enum ScreenSize { Desktop, Tablet, Mobile }

export enum ArticleCategory { Blog, WhatsOn, Introduction }

export enum ArticleStatus { Draft, Publish, Archive }

export enum CardType { Listing, Article }