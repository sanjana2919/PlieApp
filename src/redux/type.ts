export type DanceStyle = {
    ds_id: number;
    ds_name: string;
};


export type EventApiItem = {
  event_id: string;
  event_name: string;
  description: string;
  event_profile_img:string,
  event_price_fro: string,
  event_price_to:string,
  readable_from_date:string,
  readable_to_date:string,
  isFavorite:boolean,
  city:string,
  country:string,
  keywords: string[];
  danceStyles: DanceStyle[]
};