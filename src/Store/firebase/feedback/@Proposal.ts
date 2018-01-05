export class Proposal {
	constructor(initialData: Partial<Proposal>) {
		this.Extend(initialData);
	}

	_id: number;
	title = "";
	text = "";

	creator: string;
	createdAt: number;
	editedAt: number;
}

AddSchema({
	properties: {
		title: {type: "string"},
		text: {type: "string"},
		
		creator: {type: "string"},
		createdAt: {type: "number"},
		editedAt: {type: "number"},
	},
	required: ["title", "text", "creator", "createdAt"],
}, "Proposal");