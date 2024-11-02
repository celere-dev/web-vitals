export interface Attributes {
  url?: string;
  filePath: string;
}

export interface CelereReport {
  fetchTime: string;
  finalDisplayedUrl: string;
  categories: {
    performance: {
      score: number;
    };
  };
}
