import type { EpicStory } from "./epic_story";

// TODO
interface User {}

export interface Project {
  name: string;
  validation: boolean;
  startDate: Date;
  endDate?: Date;
  epicStory: EpicStory[];
  user: User;
}
