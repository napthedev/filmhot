export interface MovieDetail {
  aliasName: string;
  areaList: { id: number; name: string }[];
  areaNameList: string[];
  category: number;
  collect: boolean;
  coverHorizontalUrl: string;
  coverVerticalUrl: string;
  drameTypeVo: {
    drameName: string;
    drameType: string;
  };
  episodeCount?: any;
  episodeVo: {
    definitionList: {
      code: string;
      description: string;
      fullDescription: string;
    }[];
    id: number;
    name: string;
    resourceType: number;
    seriesNo: number;
    subtitlingList: {
      language: string;
      languageAbbr: string;
      subtitlingUrl: string;
      translateType: number;
    }[];
    vid: string;
  }[];
  id: string;
  introduction: string;
  likeList: {
    areaList: {
      id: number;
      name: string;
    }[];
    areaNameList: string[];
    category: number;
    coverHorizontalUrl: string;
    coverVerticalUrl: string;
    drameTypeVo?: any;
    id: string;
    name: string;
    score: number;
    tagList: {
      id: number;
      name: string;
    }[];
    tagNameList: string[];
    upImgUrl: string;
    upName: string;
    year: number;
  }[];
  name: string;
  refList: {
    category: number;
    coverHorizontalUrl: string;
    coverVerticalUrl: string;
    drameTypeVo?: any;
    id: string;
    name: string;
    seriesNo: number;
  }[];
  reserved: boolean;
  score: number;
  seriesNo: number;
  showSetName: boolean;
  tagList: {
    id: number;
    name: string;
  }[];
  tagNameList: string[];
  translateType: number;
  upInfo: {
    upId: number;
    upImgUrl: string;
    upName: string;
  };
  updateInfo?: any;
  year: number;
}