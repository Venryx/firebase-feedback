import {Proposal} from "./firebase/proposals/@Proposal";
import {UserData} from "./firebase/userData";

export interface FeedbackData {
	general: FeedbackData_General;
	proposals: {[key: number]: Proposal};
	userData: {[key: string]: UserData};
}
export interface FeedbackData_General {
	//data: {lastProposalID: number};
}