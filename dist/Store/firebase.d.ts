import { Proposal } from "./firebase/proposals/@Proposal";
import { UserData } from "./firebase/userData";
import { Collection } from "mobx-firelink";
export interface Feedback_FirebaseDBShape {
    proposals: Collection<Proposal>;
    userData: Collection<UserData>;
}
