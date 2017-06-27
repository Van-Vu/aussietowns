import http from './http-base';

function upload(formData, progressCallback) {
    const uploadUrl = "/api/photo/upload";
    return http.post(uploadUrl,
        formData,
        progressCallback)
        // get data
        .then(x => x.data);

        //// add url field
        //.then(x => {
        //    return Object.assign({}, x, { url: `/images/${x.id}` })
        //}
        //);
}

export { upload }