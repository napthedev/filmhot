export interface HomeSection {
  bannerProportion?: any;
  coverType?: any;
  homeSectionId: number;
  homeSectionName: string;
  homeSectionType: string;
  recommendContentVOList: {
    contentType: string;
    id: number;
    imageUrl: string;
    jumpAddress: string;
    jumpType: string;
    needLogin: boolean;
    resourceNum?: any;
    resourceStatus?: any;
    showMark: boolean;
    title: string;
  }[];
  refId?: any;
  refRedirectUrl: string;
}

export interface TopSearched {
  cover: string;
  domainType: number;
  id: string;
  title: string;
}
