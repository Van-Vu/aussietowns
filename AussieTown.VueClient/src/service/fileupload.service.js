import http from './http-base';
function upload(formData, progressCallback) {
    var uploadUrl = "/api/photo/upload";
    return http.post(uploadUrl, formData, progressCallback)
        .then(function (x) { return x.data; });
    //// add url field
    //.then(x => {
    //    return Object.assign({}, x, { url: `/images/${x.id}` })
    //}
    //);
}
export { upload };
