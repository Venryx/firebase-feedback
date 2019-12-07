import {observable} from "mobx";
import {Proposals} from "./main/proposals";

export class Feedback_MainState {
	@observable proposals: Proposals;
}