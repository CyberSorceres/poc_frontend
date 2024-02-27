import type { UserStory } from "./user_story";

export interface EpicStory {
  title: string;
  descript: string;
  state: boolean;
  userStory: UserStory[];
}
