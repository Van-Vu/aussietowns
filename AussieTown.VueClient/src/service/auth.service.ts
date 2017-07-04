import http from './http-base';

function fetchPublicKey() {
    const authService = "/api/auth/publickey";

    return http.get(authService)
        .then(x => x.data);

    //// add url field
    //.then(x => {
    //    return Object.assign({}, x, { url: `/images/${x.id}` })
    //}
    //);
}

function decryptTextFromServer(encryptText) {
    const authService = "/api/auth/decrypt/?encryptText=";

    return http.get(authService + encryptText)
        .then(x => x.data);

    //// add url field
    //.then(x => {
    //    return Object.assign({}, x, { url: `/images/${x.id}` })
    //}
    //);
}

export { fetchPublicKey, decryptTextFromServer }