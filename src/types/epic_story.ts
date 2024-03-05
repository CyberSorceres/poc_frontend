import type { UserStory } from "./user_story";

export interface EpicStory {
  _id: string;
  title: string;
  descript: string;
  state: boolean;
  userStory: UserStory[];
}
