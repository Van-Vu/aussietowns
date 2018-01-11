import http from './http-base';

export default class ArticleService {
    private baseUrl = '/api/article/';

    fetchArticle(articleId) {
        return http.get(`${this.baseUrl}${articleId}`)
            .then(x => x);
    }

    fetchFeatureArticles() {
        return http.get(`${this.baseUrl}feature`)
            .then(x => x);
    }

    updateArticle(article) {
        return http.post(this.baseUrl, article)
            .then(x => x);
    }

    updateStatus(article) {
        return http.post(this.baseUrl + article.id, article)
            .then(x => x);
    }
}