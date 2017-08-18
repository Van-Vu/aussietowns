﻿export enum ListingType { Offer, Request }

export enum RepeatedType { None, Daily, Weekly, Monthly }

export enum RepeatedDay { Monday = 1, Tuesday = 2, Wednesday = 4, Thursday = 8 , Friday = 16, Saturday = 32, Sunday = 64 }

export enum UserSource { Native, Facebook, Google }

export enum UserRole { Anonymous = 0, User = 1, Editor = 2, Admin = 4, SuperAdmin = 8 }

export enum UserAction { View, Edit, Delete }

export enum NotificationType { Success = 'is-success', Warning = 'is-warning', Error = 'is-error' }

export enum ScreenSize { Desktop, Tablet, Mobile }