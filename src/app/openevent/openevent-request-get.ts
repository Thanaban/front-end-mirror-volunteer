export interface Event_show {
  id: number;
  activity_name: string;
  activity_details: string;
  clothes_detail: string;
  etc_detail: string;
  time_detail:string;
  timeline:string;
  travel_detail:string;
  travel_etc_detail:string;
  travel_public_detail:string;
  regised_number?: number;
  size_number: number;
  received_hours: number;
  map: string;
  start_date: string;
  end_date?: any;
  is_open: boolean;
  createdAt: string;
  updatedAt: string;
  userActivities: any[];
  picture?: string;
  priority?: number;
}