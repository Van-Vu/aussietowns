import http from './http-base';
function upload(formData, progressCallback) {
    var uploadUrl = "/api/photo/upload2";
    return http.post(uploadUrl, formData, progressCallback)
        .then(function (x) { return x.data; })
        .then(function (x) { return x.map(function (img) { return Object.assign({}, img, { url: "/images/" + img.id }); }); });
}
export { upload };
