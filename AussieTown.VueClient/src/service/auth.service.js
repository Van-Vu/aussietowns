import http from './http-base';
import { GlobalConfig } from '../GlobalConfig';
function fetchPublicKey() {
    var authService = "/api/auth/publickey";
    return http.get(authService)
        .then(function (x) { return x.data; });
}
function decryptTextFromServer(encryptText) {
    var authService = "/api/auth/decrypt/?encryptText=";
    return http.get(authService + encryptText)
        .then(function (x) { return x.data; });
}
function encryptText(text) {
    var encrypt = new JSEncrypt();
    encrypt.setPublicKey(GlobalConfig.publicKey);
    var encryptedText = encrypt.encrypt(text);
    return encryptedText;
}
function requestPasswordReset(email) {
    var authService = "/api/auth/requestreset";
    return http.post(authService, { email: email })
        .then(function (x) { return x.data; });
}
function verifyResetToken(resetToken) {
    var authService = "/api/auth/verify/?token=";
    return http.get(authService + resetToken)
        .then(function (x) { return x.data; });
}
function resetPassword(model) {
    return http.post("/api/auth/resetpassword", model)
        .then(function (x) { return x.data; });
}
function changePassword(model) {
    return http.post("/api/auth/changepassword", model)
        .then(function (x) { return x.data; });
}
export { fetchPublicKey, decryptTextFromServer, verifyResetToken, requestPasswordReset, encryptText, resetPassword, changePassword };
