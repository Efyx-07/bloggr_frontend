export interface Article {
  id: number;
  title: string;
  imageUrl: string;
  body: string;
  creationDate: Date | string;
  lastUpdate: Date | string;
  published: boolean;
  publicationDate: Date | null;
  keywords: Keyword[];
}

export interface Keyword {
  id?: number;
  name: string;
}
