export var GlobalConfig;
(function (GlobalConfig) {
    GlobalConfig.publicKey = '-----BEGIN RSA PUBLIC KEY-----MIIBKwIBAAKCAQEA6tRJeUfhygq8R5hwVqOe780ppUAVnGH6dtIjWjL9pRHktWdF+0b6TD8n0sEmNS7N6ys1P5LhtC5gqjvRbQ8cEUsn1EfPcelf/ Z / v5131mWjsEYtEHei1k+jeqw2pbJPBjsvu4yScwIl9tChN9IwzJRvchgem1PgPUkD7oHvmBn2ox1fxif2TUSoqdLhfpHCRrtybYTh2rPFK+G / JSx / 0NTVNd7tS63QG/lo3o7iGVfBj5Q1RlsfQbUstnD57NuU4V5piScI1J1qW/OhuqOoV0zeOPfj+pyeC7BTOw4pYJLlv8FB2mUTP3O3C0zG0uWKe0CE9fiXQ9QeZDcxI17oVXwIDAQABAgMBAAECAwEAAQIDAQABAgMBAAECAwEAAQIDAQAB-----END RSA PUBLIC KEY-----';
    GlobalConfig.maxImagesPerListing = 5;
    GlobalConfig.heroImageSize = { maxWidth: 1192, maxHeight: 370 };
    GlobalConfig.profileImageSize = { maxWidth: 170, maxHeight: 170 };
    GlobalConfig.listingImageSize = { maxWidth: 640, maxHeight: 360 };
    GlobalConfig.articleImageSize = { maxWidth: 630, maxHeight: 360 };
    GlobalConfig.accessControl = { dev: "http://localhost:3000", prod: "https://www.funwithlocal.com" };
})(GlobalConfig = GlobalConfig || (GlobalConfig = {}));
//const install = (Vue, options) => {
//    Vue.prototype.$config = Vue.$config = {base: 'asdfasdfasfda'}
//} 
