import {AddSchema} from "../../../Server/Server";
export class Proposal {
	constructor(initialData: Partial<Proposal>) {
		this.Extend(initialData);
	}

	_id: number;
	type: string;
	title = "";
	text = "";

	creator: string;
	createdAt: number;
	editedAt: number;
}

AddSchema({
	properties: {
		type: {type: "string"},
		title: {type: "string"},
		text: {type: "string"},
		
		creator: {type: "string"},
		createdAt: {type: "number"},
		editedAt: {type: "number"},
	},
	required: ["type", "title", "text", "creator", "createdAt"],
}, "Proposal");