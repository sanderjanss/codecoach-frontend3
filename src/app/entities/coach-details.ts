import { Topic } from './topic';

export interface CoachDetails {
  id: string,
  availableTime: string;
  coachXp: string,
  introduction: string,
  topics: Topic[];
}
