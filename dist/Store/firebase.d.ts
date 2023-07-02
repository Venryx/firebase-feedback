import { Proposal } from "./firebase/proposals/@Proposal.js";
import { UserData } from "./firebase/userData.js";
import { Collection } from "mobx-firelink";
export interface FirebaseDBShape {
    proposals: Collection<Proposal>;
    userData: Collection<UserData>;
}
