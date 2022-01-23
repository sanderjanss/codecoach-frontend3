// import { Feedback } from "./feedback";

export interface Session{

  sessionId:string,
  coachId:  string,
  coachName: string,
  coacheeId: string,
  coacheeName: string,
  topic: string,
  sessionType:string,
  date: string,
  time: string,
  remarks:string,
  sessionStatus:string,
  feedbackFromCoach: String;
  feedbackFromCoachee: String;

}
