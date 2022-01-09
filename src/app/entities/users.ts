import {Role} from "./role";
import {CoachDetails} from "./coach-details";

export interface Users{
  userId: string,
  firstName: string,
  lastName: string,
  company: string,
  email: string,
  password: string,
  imageUrl: string
  roleStatus: Role[],
  coachDetails: CoachDetails
}
