import http from './http-base';
import { GlobalConfig } from '../GlobalConfig';
declare const JSEncrypt: any;

function fetchPublicKey() {
    const authService = "/api/auth/publickey";

    return http.get(authService)
        .then(x => x.data);
}

function decryptTextFromServer(encryptText) {
    const authService = "/api/auth/decrypt/?encryptText=";

    return http.get(authService + encryptText)
        .then(x => x.data);
}

function encryptText(text) {
    var encrypt = new JSEncrypt();
    encrypt.setPublicKey(GlobalConfig.publicKey);
    let encryptedText = encrypt.encrypt(text);
    return encryptedText;
}

function requestPasswordReset(email) {
    const authService = "/api/auth/requestreset";

    return http.post(authService, {email: email})
        .then(x => x.data);
}

function verifyResetToken(resetToken) {
    const authService = "/api/auth/verify/?token=";

    return http.get(authService + resetToken)
        .then(x => x.data);
}

function resetPassword(model) {
    return http.post("/api/auth/resetpassword", model)
        .then(x => x.data);
}

function changePassword(model) {
    return http.post("/api/auth/changepassword", model)
        .then(x => x.data);
}

export { fetchPublicKey, decryptTextFromServer, verifyResetToken, requestPasswordReset, encryptText, resetPassword, changePassword }