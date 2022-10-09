
export interface BaseUrl {
  url_code: string;
  shortened_url : string;
  long_url: string;
  count: number;
  created_at: Date;
  updated_at: Date;
}

export interface Url extends BaseUrl {
  id: number;
}