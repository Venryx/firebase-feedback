import { Proposal } from "./firebase/proposals/@Proposal";
import { UserData } from "./firebase/userData";
export interface Feedback_FirebaseDBShape {
    general: FeedbackData_General;
    proposals: {
        [key: number]: Proposal;
    };
    userData: {
        [key: string]: UserData;
    };
}
export interface FeedbackData_General {
}
