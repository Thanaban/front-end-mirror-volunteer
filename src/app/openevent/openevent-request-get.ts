export interface Event_show {
  id: number;
  activity_name: string;
  activity_details: string;
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