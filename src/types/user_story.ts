import {Feedback} from "./feedback";

export interface UserStory {
  descript: string;
  state: boolean;
  user?: string;
  feedback: Feedback;
}
