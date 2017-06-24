import http from './http-base';

function upload(formData, progressCallback) {
    const uploadUrl = "/api/photo/upload2";
    return http.post(uploadUrl,
        formData,
        progressCallback)
        // get data
        .then(x => x.data)
        // add url field
        .then(x => x.map(img => Object.assign({},
            img, { url: `/images/${img.id}` })));
}

export { upload }