import type { EpicStory } from "./epic_story";
import type { User } from "./user";

export interface Project {
  name: string;
  _id: string;
  validation: boolean;
  startDate: Date;
  endDate?: Date;
  epicStory: EpicStory[];
  user: User;
}
