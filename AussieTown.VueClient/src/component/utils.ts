import { ListingType, NotificationType } from '../model/enum';

declare function unescape(s: string): string;
declare function escape(s: string): string;

export interface IResizeImageOptions {
    maxWidth: number;
    maxHeight: number;
    file: File;
}

export class Utils {
    public static formatDate(date: Date) {
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
    }

    public static getDate(datetime: Date) {
        var date = new Date(datetime);
        return date.getFullYear() + '/' + this.ensureTwoDigit((date.getMonth()) + 1) + '/' + this.ensureTwoDigit(date.getDate());
    }

    public static  getTime(datetime: any) {
        var date = new Date(datetime);
        return this.ensureTwoDigit(date.getHours()) + ':' + this.ensureTwoDigit(date.getMinutes());
    }

    public static getDateTime(datetime: any) {
        var date = new Date(datetime);
        return this.ensureTwoDigit(date.getDate()) + '/' + this.ensureTwoDigit((date.getMonth()) + 1) + '/' + date.getFullYear()
            + ' ' + this.ensureTwoDigit(date.getHours()) + ':' + this.ensureTwoDigit(date.getMinutes());
    }

    public static ensureTwoDigit(value) {
        return ("0" + (value)).slice(-2);
    }

    public static listingTypeConvert(listingType: string) {
        return listingType === 'offer' ? ListingType.Offer : ListingType.Request;
    }

    public static seorizeString(name: string) {
        let sanitizeName = name.toLowerCase().replace(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/g, "");
        return sanitizeName.split(' ').join('-');
    }

    private static valueCompare(x, y) {
        return JSON.stringify(x) === JSON.stringify(y);
    }

    public static removeFromArray(array, item) {
        return array.filter(x => !this.valueCompare(x, item));
    }

    public static spliceArray(array, item) {
        var index = array.indexOf(item);
        if (index >= 0) {
            array.splice(index, 1);
        }
    }

    public static stripHtml(text) {
        var regex = /(<([^>]+)>)/ig
            , result = text ? text.replace(regex, "") : '';

        return result;
    }

    public static isElementInViewport(el) {
        var rect = el.getBoundingClientRect();

        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
            rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
        );
    }

    // https://stackoverflow.com/questions/10333971/html5-pre-resize-images-before-uploading
    public static resizeImage (settings: IResizeImageOptions) {
        const file = settings.file;
        const maxWidth = settings.maxWidth;
        const maxHeight = settings.maxHeight;
        const reader = new FileReader();
        const image = new Image();
        const canvas = document.createElement('canvas');

        const dataURItoBlob = (dataURI: string) => {
            const bytes = dataURI.split(',')[0].indexOf('base64') >= 0 ?
                atob(dataURI.split(',')[1]) :
                unescape(dataURI.split(',')[1]);
            const mime = dataURI.split(',')[0].split(':')[1].split(';')[0];
            const max = bytes.length;
            const ia = new Uint8Array(max);
            for (var i = 0; i < max; i++) ia[i] = bytes.charCodeAt(i);
            return new Blob([ia], { type: mime });
        };
        const resize = () => {
            let width = image.width;
            let height = image.height;

            var canvas = document.createElement('canvas');
            canvas.width = image.width;
            canvas.height = image.height;
            canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);

            var scale;
            if (width > height) {
                //if (width > maxWidth) {
                //    width = maxWidth;
                //    height *= maxWidth / width;
                //    if (height > maxHeight) height = maxHeight;
                //}
                scale = maxWidth / width;
            } else {
                //if (height > maxHeight) {
                //    height = maxHeight;
                //    width *= maxHeight / height;
                //    if (width > maxWidth) width = maxWidth;
                //}
                scale = maxHeight / height;
            }

            //canvas.width = width;
            //canvas.height = height;
            //canvas.getContext('2d').drawImage(image, 0, 0, width, height);
            canvas = this.scaleCanvasWithAlgorithm(canvas, scale);

            let dataUrl = canvas.toDataURL('image/jpeg', 0.9);
            return dataURItoBlob(dataUrl);
        };

        return new Promise((ok, no) => {
            if (!file.type.match(/image.*/)) {
                no(new Error("Not an image"));
                return;
            }

            reader.onload = (readerEvent: any) => {
                image.onload = () => ok(resize());
                image.src = readerEvent.target.result;
            };
            reader.readAsDataURL(file);
        });
    };

    private static scaleCanvasWithAlgorithm(canvas, scale: number) {
        var scaledCanvas = document.createElement('canvas');

        scaledCanvas.width = canvas.width * scale;
        scaledCanvas.height = canvas.height * scale;

        var srcImgData = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);
        var destImgData = scaledCanvas.getContext('2d').createImageData(scaledCanvas.width, scaledCanvas.height);

        this.applyBilinearInterpolation(srcImgData, destImgData, scale);

        scaledCanvas.getContext('2d').putImageData(destImgData, 0, 0);

        return scaledCanvas;
    }

    private static applyBilinearInterpolation(srcCanvasData, destCanvasData, scale) {
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
                r = inner(srcCanvasData.data[idxS00],
                    srcCanvasData.data[idxS10],
                    srcCanvasData.data[idxS01],
                    srcCanvasData.data[idxS11],
                    dx,
                    dy);
                destCanvasData.data[idxD] = r;

                g = inner(srcCanvasData.data[idxS00 + 1],
                    srcCanvasData.data[idxS10 + 1],
                    srcCanvasData.data[idxS01 + 1],
                    srcCanvasData.data[idxS11 + 1],
                    dx,
                    dy);
                destCanvasData.data[idxD + 1] = g;

                b = inner(srcCanvasData.data[idxS00 + 2],
                    srcCanvasData.data[idxS10 + 2],
                    srcCanvasData.data[idxS01 + 2],
                    srcCanvasData.data[idxS11 + 2],
                    dx,
                    dy);
                destCanvasData.data[idxD + 2] = b;

                a = inner(srcCanvasData.data[idxS00 + 3],
                    srcCanvasData.data[idxS10 + 3],
                    srcCanvasData.data[idxS01 + 3],
                    srcCanvasData.data[idxS11 + 3],
                    dx,
                    dy);
                destCanvasData.data[idxD + 3] = a;
            }
        }
    }

    public static handleError(store, error: any) {
        store.dispatch("DISABLE_LOADING");

        switch (error.status) {
            case 400:
                store.dispatch('ADD_NOTIFICATION', { title: "Error occurs but no worries, we're on it!", type: NotificationType.Error });
                break;
            case 403:
                store.dispatch('SHOW_LOGIN_MODAL');
                store.dispatch('ADD_NOTIFICATION', { title: "Login required", text: "Please login or register to proceed", type: NotificationType.Warning });
                break;
            case 500:
                store.dispatch('ADD_NOTIFICATION', { title: "Error occurs but no worries, we're on it!", type: NotificationType.Error });
                break;
        }

        store.dispatch('LOG_ERROR', { message: `${error.data}`, stack: error.config.data });
    }

    public static getProfileImage(url) {
        return url ? url : '/static/images/anonymous.png';    
    }

    public static getProfileFullName(user) {
        return (user.firstName && user.lastName) ? `${user.firstName} ${user.lastName}` : user.email;
    }
}