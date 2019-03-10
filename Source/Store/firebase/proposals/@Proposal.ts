import {AddSchema} from "../../../Server/Server";

export class Proposal {
	constructor(initialData: Partial<Proposal>) {
		this.Extend(initialData);
	}

	_id: number;
	type: string;
	title = "";
	text = "";
	//completed: boolean;

	creator: string;
	createdAt: number;
	editedAt: number;
	completedAt: number;
}

AddSchema({
	properties: {
		type: {type: "string"},
		title: {type: "string"},
		text: {type: "string"},
		//completed: {type: ["null", "boolean"]},
		
		creator: {type: "string"},
		createdAt: {type: "number"},
		editedAt: {type: "number"},
		completedAt: {type: ["null", "number"]},
	},
	required: ["type", "title", "text", "creator", "createdAt"],
}, "Proposal");