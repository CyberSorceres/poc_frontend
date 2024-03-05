import { Project } from "./project";
import { UserStory } from "./user_story";

export interface User {
  name: string;
  password: string;
  role: string;
  mail: string;
  userStory: UserStory[];
  project: Project[];
}