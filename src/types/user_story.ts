import { Feedback } from "./feedback";
import { User } from "./user";


export interface UserStory {
  descript: string;
  state: boolean;
  user: User[];
  feedback: Feedback;
}
