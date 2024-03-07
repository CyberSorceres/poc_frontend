import { Feedback } from "./feedback";
import { User } from "./user";

export interface UserStory {
  _id: string;
  title: string;
  descript: string;
  state: boolean;
  user: User[];
  feedback: Feedback[];
}
