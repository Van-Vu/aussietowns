import http from './http-base';
var ArticleService = /** @class */ (function () {
    function ArticleService() {
        this.baseUrl = '/api/article/';
    }
    ArticleService.prototype.fetchArticle = function (articleId) {
        return http.get("" + this.baseUrl + articleId)
            .then(function (x) { return x; });
    };
    ArticleService.prototype.fetchFeatureArticles = function () {
        return http.get(this.baseUrl + "feature")
            .then(function (x) { return x; });
    };
    ArticleService.prototype.updateArticle = function (article) {
        return http.post(this.baseUrl, article)
            .then(function (x) { return x; });
    };
    ArticleService.prototype.updateStatus = function (article) {
        return http.put(this.baseUrl + article.id, article)
            .then(function (x) { return x; });
    };
    return ArticleService;
}());
export default ArticleService;
