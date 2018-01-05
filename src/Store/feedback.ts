import {Action} from "../Utils/Action";
import {combineReducers} from "redux";
import { Manager } from "../index";
import { State } from "../General";

export class ACTProposalSelect extends Action<{id: number}> {}

export class Feedback {
	selectedProposalID: number;
}

export const FeedbackReducer = combineReducers({
	selectedProposalID: (state = null, action)=> {
		if (action.Is(ACTProposalSelect)) return action.payload.id;
		return state;
	},
}) as any;