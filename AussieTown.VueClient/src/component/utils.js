import { ListingType, NotificationType } from '../model/enum';
import { GlobalConfig } from '../GlobalConfig';
import router from '../router';
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.formatDate = function (date) {
        var monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
        ];
        var day = this.ensureTwoDigit(date.getDate());
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
        return day + ' ' + monthNames[monthIndex] + ' ' + year;
    };
    Utils.getDate = function (datetime) {
        var date = new Date(datetime);
        return date.getFullYear() + '/' + this.ensureTwoDigit((date.getMonth()) + 1) + '/' + this.ensureTwoDigit(date.getDate());
    };
    Utils.getTime = function (datetime) {
        var date = new Date(datetime);
        return this.ensureTwoDigit(date.getHours()) + ':' + this.ensureTwoDigit(date.getMinutes());
    };
    Utils.getDateTime = function (datetime) {
        var date = new Date(datetime);
        return this.ensureTwoDigit(date.getDate()) + '/' + this.ensureTwoDigit((date.getMonth()) + 1) + '/' + date.getFullYear()
            + ' ' + this.ensureTwoDigit(date.getHours()) + ':' + this.ensureTwoDigit(date.getMinutes());
    };
    Utils.ensureTwoDigit = function (value) {
        return ("0" + (value)).slice(-2);
    };
    Utils.listingTypeConvert = function (listingType) {
        return listingType === 'offer' ? ListingType.Offer : ListingType.Request;
    };
    Utils.seorizeString = function (name) {
        var sanitizeName = name.toLowerCase().replace(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/g, "");
        return sanitizeName.split(' ').join('-');
    };
    Utils.valueCompare = function (x, y) {
        return JSON.stringify(x) === JSON.stringify(y);
    };
    Utils.removeFromArray = function (array, item) {
        var _this = this;
        return array.filter(function (x) { return !_this.valueCompare(x, item); });
    };
    Utils.spliceArray = function (array, item) {
        var index = array.indexOf(item);
        if (index >= 0) {
            array.splice(index, 1);
        }
    };
    Utils.stripHtml = function (text) {
        var regex = /(<([^>]+)>)/ig, result = text ? text.replace(regex, "") : '';
        return result;
    };
    Utils.isElementInViewport = function (el) {
        var rect = el.getBoundingClientRect();
        return (rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
            rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */);
    };
    // https://stackoverflow.com/questions/10333971/html5-pre-resize-images-before-uploading: foundation
    // https://stackoverflow.com/questions/26015497/how-to-resize-then-crop-an-image-with-canvas: understand crop
    // https://stackoverflow.com/questions/41129735/html5-canvas-todataurl-output-size-bigger-than-original-image-size: to dataURI make it big
    // bodom: potential memory leak
    Utils.resizeImage = function (settings, originaleFile) {
        var _this = this;
        var reader = new FileReader();
        var image = new Image();
        var resize = function () {
            var width = image.width;
            var height = image.height;
            if (width > settings.maxWidth || height > settings.maxHeight) {
                var canvas = document.createElement('canvas');
                canvas.width = image.width;
                canvas.height = image.height;
                canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
                var resizeScale;
                var cropScale;
                if (width > height) {
                    //if (width > maxWidth) {
                    //    width = maxWidth;
                    //    height *= maxWidth / width;
                    //    if (height > maxHeight) height = maxHeight;
                    //}
                    resizeScale = settings.maxWidth / width;
                    cropScale = resizeScale;
                    // Bodom: only crop 1/2 when it's Hero image
                    if (settings.maxWidth > GlobalConfig.listingImageSize.maxWidth) {
                        cropScale = settings.maxWidth / width / 2;
                    }
                }
                else {
                    //if (height > maxHeight) {
                    //    height = maxHeight;
                    //    width *= maxHeight / height;
                    //    if (width > maxWidth) width = maxWidth;
                    //}
                    resizeScale = settings.maxHeight / height;
                    cropScale = resizeScale;
                    // Bodom: only crop 1/2 when it's Hero image
                    if (settings.maxHeight > GlobalConfig.listingImageSize.maxHeight) {
                        cropScale = settings.maxHeight / height / 2;
                    }
                }
                var resizeCanvas = document.createElement('canvas');
                resizeCanvas = _this.scaleCanvasWithAlgorithm(canvas, resizeScale);
                var cropCanvas = document.createElement('canvas');
                cropCanvas = _this.scaleCanvasWithAlgorithm(canvas, cropScale);
                //var test = this.dataURItoBlob(resizeCanvas.toDataURL('image/jpeg', 1));
                return new Promise(function (ok, no) {
                    resizeCanvas.toBlob(function (resizeBlob) {
                        ok({
                            resizedImage: {
                                width: resizeCanvas.width,
                                height: resizeCanvas.height,
                                imageBlob: resizeBlob
                            },
                            cropImage: {
                                width: cropCanvas.width,
                                height: cropCanvas.height,
                                dataUrl: cropCanvas.toDataURL('image/jpeg', 0.7)
                            }
                        });
                    }, "image/jpeg");
                });
            }
            else {
                return new Promise(function (ok, no) {
                    ok({
                        resizedImage: {
                            width: width,
                            height: height,
                            imageBlob: originaleFile
                        }
                    });
                });
            }
        };
        return new Promise(function (ok, no) {
            if (!originaleFile.type.match(/image.*/)) {
                no(new Error("Not an image"));
                return;
            }
            reader.onload = function (readerEvent) {
                image.onload = function () { return ok(resize()); };
                image.src = readerEvent.target.result;
            };
            reader.readAsDataURL(originaleFile);
        });
    };
    ;
    Utils.scaleCanvasWithAlgorithm = function (canvas, scale) {
        var scaledCanvas = document.createElement('canvas');
        scaledCanvas.width = canvas.width * scale;
        scaledCanvas.height = canvas.height * scale;
        var srcImgData = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);
        var destImgData = scaledCanvas.getContext('2d').createImageData(scaledCanvas.width, scaledCanvas.height);
        this.applyBilinearInterpolation(srcImgData, destImgData, scale);
        scaledCanvas.getContext('2d').putImageData(destImgData, 0, 0);
        return scaledCanvas;
    };
    Utils.applyBilinearInterpolation = function (srcCanvasData, destCanvasData, scale) {
        function inner(f00, f10, f01, f11, x, y) {
            var un_x = 1.0 - x;
            var un_y = 1.0 - y;
            return (f00 * un_x * un_y + f10 * x * un_y + f01 * un_x * y + f11 * x * y);
        }
        var i, j;
        var iyv, iy0, iy1, ixv, ix0, ix1;
        var idxD, idxS00, idxS10, idxS01, idxS11;
        var dx, dy;
        var r, g, b, a;
        for (i = 0; i < destCanvasData.height; ++i) {
            iyv = i / scale;
            iy0 = Math.floor(iyv);
            // Math.ceil can go over bounds
            iy1 = (Math.ceil(iyv) > (srcCanvasData.height - 1) ? (srcCanvasData.height - 1) : Math.ceil(iyv));
            for (j = 0; j < destCanvasData.width; ++j) {
                ixv = j / scale;
                ix0 = Math.floor(ixv);
                // Math.ceil can go over bounds
                ix1 = (Math.ceil(ixv) > (srcCanvasData.width - 1) ? (srcCanvasData.width - 1) : Math.ceil(ixv));
                idxD = (j + destCanvasData.width * i) * 4;
                // matrix to vector indices
                idxS00 = (ix0 + srcCanvasData.width * iy0) * 4;
                idxS10 = (ix1 + srcCanvasData.width * iy0) * 4;
                idxS01 = (ix0 + srcCanvasData.width * iy1) * 4;
                idxS11 = (ix1 + srcCanvasData.width * iy1) * 4;
                // overall coordinates to unit square
                dx = ixv - ix0;
                dy = iyv - iy0;
                // I let the r, g, b, a on purpose for debugging
                r = inner(srcCanvasData.data[idxS00], srcCanvasData.data[idxS10], srcCanvasData.data[idxS01], srcCanvasData.data[idxS11], dx, dy);
                destCanvasData.data[idxD] = r;
                g = inner(srcCanvasData.data[idxS00 + 1], srcCanvasData.data[idxS10 + 1], srcCanvasData.data[idxS01 + 1], srcCanvasData.data[idxS11 + 1], dx, dy);
                destCanvasData.data[idxD + 1] = g;
                b = inner(srcCanvasData.data[idxS00 + 2], srcCanvasData.data[idxS10 + 2], srcCanvasData.data[idxS01 + 2], srcCanvasData.data[idxS11 + 2], dx, dy);
                destCanvasData.data[idxD + 2] = b;
                a = inner(srcCanvasData.data[idxS00 + 3], srcCanvasData.data[idxS10 + 3], srcCanvasData.data[idxS01 + 3], srcCanvasData.data[idxS11 + 3], dx, dy);
                destCanvasData.data[idxD + 3] = a;
            }
        }
    };
    Utils.cropImage = function (mainImageInfo, expectedImageInfo) {
        var canvas = document.createElement('canvas');
        var reader = new FileReader();
        var image = new Image();
        var resize = function () {
            var cropCanvas = document.createElement('canvas');
            // Bodom: have to set this otherwise it takes default size 300x150
            cropCanvas.width = expectedImageInfo.width;
            cropCanvas.height = expectedImageInfo.height;
            cropCanvas.getContext('2d').drawImage(image, 0, expectedImageInfo.top, expectedImageInfo.width, expectedImageInfo.height, 0, 0, expectedImageInfo.width, expectedImageInfo.height);
            return new Promise(function (ok, no) {
                cropCanvas.toBlob(function (cropBlob) {
                    ok(cropBlob);
                }, "image/jpeg");
            });
        };
        return new Promise(function (ok, no) {
            reader.onload = function (readerEvent) {
                image.onload = function () { return ok(resize()); };
                image.src = readerEvent.target.result;
            };
            //var theImage = this.dataURItoBlob(cropImageInfo.imageBlob);
            reader.readAsDataURL(mainImageInfo.imageBlob);
        });
    };
    Utils.dataURItoBlob = function (dataURI) {
        var bytes = dataURI.split(',')[0].indexOf('base64') >= 0 ?
            atob(dataURI.split(',')[1]) :
            unescape(dataURI.split(',')[1]);
        var mime = dataURI.split(',')[0].split(':')[1].split(';')[0];
        var max = bytes.length;
        var ia = new Uint8Array(max);
        for (var i = 0; i < max; i++)
            ia[i] = bytes.charCodeAt(i);
        return new Blob([ia], { type: mime });
    };
    ;
    Utils.handleXHRError = function (store, error) {
        // server don't need notification
        if (process.env.VUE_ENV === 'client') {
            store.dispatch("DISABLE_LOADING");
            switch (error.status) {
                case 400:
                    store.dispatch('ADD_NOTIFICATION', { title: "Submit incorrect information", type: NotificationType.Error });
                    break;
                case 401:
                    store.dispatch('ADD_NOTIFICATION', { title: "You are not authorized to view this page!", type: NotificationType.Error });
                    break;
                case 403:
                    store.dispatch('ADD_NOTIFICATION', { title: "Permission denied", text: "Please login to perform this action", type: NotificationType.Warning });
                    break;
                case 422:
                    store.dispatch('ADD_NOTIFICATION', { title: "Login error", text: "Email or Password is incorrect", type: NotificationType.Warning });
                    break;
                case 500:
                    store.dispatch('ADD_NOTIFICATION', { title: "Error occurs but no worries, we're on it!", type: NotificationType.Error });
                    break;
            }
        }
    };
    Utils.handleRouteError = function (store, route, error) {
        console.log(route);
        switch (error.status) {
            case 400:
                router.push('home');
                break;
            case 401:
                router.push("/login/?returnUrl=" + route.fullPath);
                break;
            case 403:
                if (store.getters.isLoggedIn) {
                    window.location.href = '/static/page/403.html';
                    //router.push('/static/page/403.html');
                }
                else {
                    router.push("/login/?returnUrl=" + route.fullPath);
                }
                break;
            case 404:
                window.location.href = '/static/page/404.html';
                break;
            case 500:
                window.location.href = '/static/page/500.html';
                break;
        }
    };
    Utils.getProfileImage = function (url) {
        return url ? url : '/static/images/anonymous.png';
    };
    Utils.getProfileFullName = function (user) {
        return (user.firstName && user.lastName) ? user.firstName + " " + user.lastName : user.email;
    };
    Utils.getCurrentHost = function () {
        return process.env.NODE_ENV == 'production'
            ? GlobalConfig.accessControl.prod
            : GlobalConfig.accessControl.dev;
    };
    return Utils;
}());
export { Utils };
