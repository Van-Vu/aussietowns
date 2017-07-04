import http from './http-base';
function fetchPublicKey() {
    var authService = "/api/auth/publickey";
    return http.get(authService)
        .then(function (x) { return x.data; });
    //// add url field
    //.then(x => {
    //    return Object.assign({}, x, { url: `/images/${x.id}` })
    //}
    //);
}
function decryptTextFromServer(encryptText) {
    var authService = "/api/auth/decrypt/?encryptText=";
    return http.get(authService + encryptText)
        .then(function (x) { return x.data; });
    //// add url field
    //.then(x => {
    //    return Object.assign({}, x, { url: `/images/${x.id}` })
    //}
    //);
}
export { fetchPublicKey, decryptTextFromServer };
