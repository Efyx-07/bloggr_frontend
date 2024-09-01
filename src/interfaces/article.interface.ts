export interface Article {
  id: number;
  title: string;
  imageUrl: string;
  body: string;
  creationDate: Date;
  lastUpdate: Date;
}

export interface ArticleData {
  article: Article;
}
