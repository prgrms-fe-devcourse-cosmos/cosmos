// NASA 사진 정보
export interface ApodData {
  date: string;
  explanation: string;
  title: string;
  url: string;
  hdurl?: string;
  media_type: string;
}

// 우주 뉴스 정보
export interface Article {
  id: number;
  title: string;
  url: string;
  image_url: string;
  published_at: string;
  summary: string;
}

// 천문 이벤트
export interface AstroEventItem {
  astroEvent: string;
  astroTitle: string;
  locdate: number;
  day?: string;
  events?: string[];
  astroTime: string;
}

// 로더 전체 데이터
export interface LoaderData {
  nasa: ApodData;
  news: Article[];
  todayEvents: AstroEventItem[];
  upcomingEvents: AstroEventItem[];
}
