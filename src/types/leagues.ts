import type { Event } from "./events";

export interface League {
  id: string;
  name: string;
  description: string;
  background_image: string;
  created_at: string;
  start_date: string;
  events: Event[];
  current_participants: number;
  max_participants: number;
}