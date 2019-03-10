import {Action, IsACTSetFor} from "../Utils/General/Action";
import {combineReducers} from "redux";
import { Manager, Proposal, GetProposal } from "./../index";
import { State, StorePath } from "./../General";
import { Proposals, ProposalsReducer } from "./main/proposals";
import {RootState} from "../General";

export type ACTSet_Payload = {path: string | ((state: RootState)=>any), value};
export class ACTSet extends Action<ACTSet_Payload> {
	constructor(path: string | ((state: RootState)=>any), value) {
		if (typeof path == "function") path = StorePath(path);
		super({path, value});
		this.type = "ACTSetFF_" + path; //.replace(/[^a-zA-Z0-9]/g, "_"); // add path to action-type, for easier debugging in dev-tools
	}
}
export function SimpleReducer(path: string | ((store: RootState)=>any), defaultValue = null) {
	if (typeof path == "function") path = StorePath(path);
	return (state = defaultValue, action: Action<any>)=> {
		if (IsACTSetFor(action, path)) return action.payload.value;
		return state;
	};
}

export class Feedback {
	proposals: Proposals;
}

export const FeedbackReducer = combineReducers({
	proposals: ProposalsReducer,
}) as any;