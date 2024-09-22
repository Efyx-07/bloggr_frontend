export interface Article {
  id: number;
  title: string;
  imageUrl: string;
  body: string;
  creationDate: Date | string;
  lastUpdate: Date | string;
  keywords: Keyword[];
}

export interface Keyword {
  id?: number;
  name: string;
}
