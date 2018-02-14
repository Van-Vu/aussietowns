import { ArticleCategory, ArticleStatus } from './enum';
import MiniProfile from './miniprofile.model';

export default class ArticleModel {
    public id: number;
    public category: ArticleCategory;
    public status: ArticleStatus;
    public authorId: number;
    public author: MiniProfile;
    public title: string;
    public content: string;
    public sanitizedContent: string;
    public imageUrl: string;
    public tags: string;
    public tagList: Array<string>;
    public isFeatured: boolean;
}