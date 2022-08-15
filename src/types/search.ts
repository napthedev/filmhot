export interface SearchResultItem {
  areas: {
    id: number;
    name: string;
  }[];
  categoryTag: {
    id: number;
    name: string;
  }[];
  coverHorizontalUrl: string;
  coverVerticalUrl: string;
  domainType: number;
  dramaType: {
    code: string;
    name: string;
  };
  duration: string;
  id: string;
  name: string;
  releaseTime: string;
  sort: string;
  upInfo: {
    enable: boolean;
    upId: number;
    upImgUrl: string;
    upName: string;
  };
}

export type TopSearches = {
  cover: string;
  domainType: number;
  id: string;
  title: string;
}[];
