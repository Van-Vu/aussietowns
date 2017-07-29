export default class ResetPasswordModel {
    isChangePassword: boolean = true; 
    email: string;
    oldPassword: string;
    newPassword: string;
    resetToken: string;
}